/**
 * API Route: Track Analytics Event
 *
 * POST /api/analytics/track
 *
 * Recibe eventos del cliente y los guarda en Supabase
 * usando service role (bypass RLS).
 */

import { NextRequest, NextResponse } from 'next/server';
import { trackAnalyticsEvent, AnalyticsEventType, ToolType } from '@/lib/analytics/trackEvent';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      eventType,
      toolType,
      metadata,
      anonymousId,
    }: {
      eventType: AnalyticsEventType;
      toolType?: ToolType;
      metadata?: Record<string, any>;
      anonymousId?: string;
    } = body;

    // Validaciones
    if (!eventType) {
      return NextResponse.json(
        { error: 'eventType is required' },
        { status: 400 }
      );
    }

    // Obtener user_id si está autenticado
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Buscar el id de la tabla users (no auth.users)
    let userId: string | null = null;
    if (user) {
      const { data: userData } = await supabase
        .from('users')
        .select('id')
        .eq('auth_id', user.id)
        .single();

      userId = userData?.id || null;
    }

    // Trackear evento
    await trackAnalyticsEvent({
      eventType,
      userId,
      anonymousId: anonymousId || null,
      toolType: toolType || 'general',
      metadata: metadata || {},
      pageUrl: request.headers.get('referer') || undefined,
      referrer: request.headers.get('referer') || undefined,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Analytics API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
