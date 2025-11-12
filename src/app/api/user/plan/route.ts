import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { plan_type: 'free' },
        { status: 200 }
      );
    }

    const { data: userData } = await supabase
      .from('users')
      .select('plan_type')
      .eq('auth_id', user.id)
      .single();

    return NextResponse.json({
      plan_type: userData?.plan_type || 'free',
    });
  } catch (error) {
    console.error('Error fetching user plan:', error);
    return NextResponse.json(
      { plan_type: 'free' },
      { status: 200 }
    );
  }
}
