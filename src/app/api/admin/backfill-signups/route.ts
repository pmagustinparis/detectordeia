/**
 * API Route: Auto-Backfill Signup Events
 * POST /api/admin/backfill-signups
 *
 * Auto-backfills missing signup events for users
 * Requires basic authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { backfillSignupEvents, checkBackfillStatus } from '@/lib/analytics/backfill';

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticación
    const authHeader = request.headers.get('authorization');
    if (authHeader !== 'Basic ' + Buffer.from('Agus:1908').toString('base64')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Cliente Supabase con service role
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createSupabaseClient(supabaseUrl, supabaseServiceKey);

    // Check status only
    const status = await checkBackfillStatus(supabase);

    return NextResponse.json({
      status,
      message: status.usersMissingSignupEvent > 0
        ? `${status.usersMissingSignupEvent} users need signup events backfilled`
        : 'All users have signup events',
    });
  } catch (error) {
    console.error('Error checking backfill status:', error);
    return NextResponse.json(
      {
        error: 'Error checking backfill status',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const authHeader = request.headers.get('authorization');
    if (authHeader !== 'Basic ' + Buffer.from('Agus:1908').toString('base64')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Cliente Supabase con service role
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createSupabaseClient(supabaseUrl, supabaseServiceKey);

    // Execute backfill
    const result = await backfillSignupEvents(supabase);

    return NextResponse.json({
      ...result,
      message: result.success
        ? `Successfully backfilled ${result.createdEvents} signup events for ${result.processedUsers} users`
        : 'Backfill completed with errors',
    });
  } catch (error) {
    console.error('Error executing backfill:', error);
    return NextResponse.json(
      {
        error: 'Error executing backfill',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
