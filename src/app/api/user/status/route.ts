import { NextResponse } from 'next/server';
import { getUserStatus } from '@/lib/user/getUserStatus';

export async function GET() {
  try {
    const status = await getUserStatus();
    return NextResponse.json(status, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error fetching user status:', error);
    return NextResponse.json(
      {
        isAuthenticated: false,
        user: null,
        plan_type: 'free',
        express: { expires_at: null, is_active: false, time_remaining_ms: null },
      },
      { status: 500 }
    );
  }
}
