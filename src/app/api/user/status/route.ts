import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { UserStatus } from '@/lib/types/user-status';

/**
 * GET /api/user/status
 *
 * Consolidates all user-related data in a single response:
 * - Authentication status
 * - User data (id, email)
 * - Plan type (free/premium)
 * - Express Pass status (pre-calculated)
 *
 * This eliminates cascading fetches and prevents UI flickering
 * by returning everything in one request.
 */
export async function GET() {
  try {
    const supabase = await createClient();

    // 1. Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 2. If no user → return free anonymous response
    if (!user) {
      const response: UserStatus = {
        isAuthenticated: false,
        user: null,
        plan_type: 'free',
        express: {
          expires_at: null,
          is_active: false,
          time_remaining_ms: null,
        },
      };
      return NextResponse.json(response);
    }

    // 3. Fetch user data from database (single query)
    const { data: userData } = await supabase
      .from('users')
      .select('plan_type, express_expires_at')
      .eq('auth_id', user.id)
      .single();

    // 4. Calculate Express Pass status on server (not client-side)
    const now = new Date();
    const expiresAt = userData?.express_expires_at
      ? new Date(userData.express_expires_at)
      : null;
    const isExpressActive = expiresAt ? expiresAt > now : false;
    const timeRemainingMs = expiresAt
      ? Math.max(0, expiresAt.getTime() - now.getTime())
      : null;

    // 5. Return consolidated response
    const response: UserStatus = {
      isAuthenticated: true,
      user: {
        id: user.id,
        email: user.email,
      },
      plan_type: userData?.plan_type || 'free',
      express: {
        expires_at: userData?.express_expires_at || null,
        is_active: isExpressActive,
        time_remaining_ms: timeRemainingMs,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching user status:', error);

    // Return safe default on error
    const errorResponse: UserStatus = {
      isAuthenticated: false,
      user: null,
      plan_type: 'free',
      express: {
        expires_at: null,
        is_active: false,
        time_remaining_ms: null,
      },
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
