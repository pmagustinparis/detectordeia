import { createClient } from '@/lib/supabase/server';
import type { UserStatus } from '@/lib/types/user-status';

const DEFAULT_STATUS: UserStatus = {
  isAuthenticated: false,
  user: null,
  plan_type: 'free',
  express: { expires_at: null, is_active: false, time_remaining_ms: null },
};

export async function getUserStatus(): Promise<UserStatus> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return DEFAULT_STATUS;

    const { data: userData } = await supabase
      .from('users')
      .select('plan_type, express_expires_at')
      .eq('auth_id', user.id)
      .single();

    const now = new Date();
    const expiresAt = userData?.express_expires_at
      ? new Date(userData.express_expires_at)
      : null;
    const isExpressActive = expiresAt ? expiresAt > now : false;
    const timeRemainingMs = expiresAt
      ? Math.max(0, expiresAt.getTime() - now.getTime())
      : null;

    return {
      isAuthenticated: true,
      user: { id: user.id, email: user.email },
      plan_type: userData?.plan_type || 'free',
      express: {
        expires_at: userData?.express_expires_at || null,
        is_active: isExpressActive,
        time_remaining_ms: timeRemainingMs,
      },
    };
  } catch {
    return DEFAULT_STATUS;
  }
}
