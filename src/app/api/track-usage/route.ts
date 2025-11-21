/**
 * API Route: Track Usage
 *
 * Endpoint para trackear usos desde el cliente.
 * Inserta registros en usage_tracking table.
 */

import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import type { ToolType } from '@/lib/tracking/trackUsage';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { anonymousId, toolType, characterCount, metadata } = body;

    // Validar campos requeridos
    if (!toolType) {
      return NextResponse.json(
        { error: 'toolType es requerido' },
        { status: 400 }
      );
    }

    if (!['detector', 'humanizador', 'parafraseador'].includes(toolType)) {
      return NextResponse.json(
        { error: 'toolType inválido' },
        { status: 400 }
      );
    }

    // Crear cliente Supabase (obtiene userId si está autenticado)
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userId = user?.id || null;

    // Validar que al menos userId o anonymousId estén presentes
    if (!userId && !anonymousId) {
      return NextResponse.json(
        { error: 'userId o anonymousId requeridos' },
        { status: 400 }
      );
    }

    // Insertar registro en usage_tracking
    const { error } = await supabase.from('usage_tracking').insert({
      user_id: userId,
      anonymous_id: anonymousId || null,
      tool_type: toolType as ToolType,
      character_count: characterCount || null,
      metadata: metadata || null,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('[track-usage] Error insertando en DB:', error);
      return NextResponse.json(
        { error: 'Error guardando tracking' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[track-usage] Error:', err);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
