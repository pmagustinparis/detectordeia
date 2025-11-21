import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit } from '@/lib/tracking/checkRateLimit';
import type { ToolType } from '@/lib/tracking/trackUsage';

export async function POST(request: Request) {
  try {
    const { anonymousId, toolType } = await request.json();

    if (!toolType || !['detector', 'humanizador', 'parafraseador'].includes(toolType)) {
      return NextResponse.json(
        { error: 'toolType inválido' },
        { status: 400 }
      );
    }

    // Obtener userId si está autenticado
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id || null;

    // Verificar rate limit
    const rateLimit = await checkRateLimit({
      userId: userId || undefined,
      anonymousId: anonymousId || undefined,
      toolType: toolType as ToolType,
    });

    return NextResponse.json({
      allowed: rateLimit.allowed,
      remaining: rateLimit.remaining,
      limit: rateLimit.limit,
      usedToday: rateLimit.usedToday,
      resetAt: rateLimit.resetAt,
      userType: rateLimit.userType,
    });

  } catch (error) {
    console.error('Error checking rate limit status:', error);
    return NextResponse.json(
      { error: 'Error al verificar límite de uso' },
      { status: 500 }
    );
  }
}
