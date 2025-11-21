/**
 * Usage Tracking System
 *
 * Inserta registros de uso en la tabla usage_tracking para:
 * - Rate limiting (contar usos por día)
 * - Analytics (qué herramientas se usan más)
 * - User insights (comportamiento de usuarios)
 */

import { createClient } from '@/lib/supabase/server';

export type ToolType = 'detector' | 'humanizador' | 'parafraseador';

export interface TrackUsageParams {
  userId?: string; // UUID del usuario (si está autenticado)
  anonymousId?: string; // UUID anónimo (si NO está autenticado)
  toolType: ToolType;
  characterCount?: number; // Cantidad de caracteres procesados
  metadata?: Record<string, any>; // Datos adicionales (ej: modo, idioma, etc)
}

export interface TrackUsageResult {
  success: boolean;
  error?: string;
}

/**
 * Registra un uso de herramienta en la base de datos
 *
 * @param params - Parámetros del tracking
 * @returns Resultado de la operación
 */
export async function trackUsage(
  params: TrackUsageParams
): Promise<TrackUsageResult> {
  try {
    const { userId, anonymousId, toolType, characterCount, metadata } = params;

    // Validar que al menos userId o anonymousId estén presentes
    if (!userId && !anonymousId) {
      console.error('[trackUsage] Error: userId o anonymousId requeridos');
      return {
        success: false,
        error: 'userId o anonymousId requeridos',
      };
    }

    // Crear cliente Supabase
    const supabase = await createClient();

    // Si userId está presente (auth_id), obtener el users.id correspondiente
    let internalUserId: string | null = null;
    if (userId) {
      const { data: userData } = await supabase
        .from('users')
        .select('id')
        .eq('auth_id', userId)
        .single();

      if (userData) {
        internalUserId = userData.id;
      } else {
        console.error('[trackUsage] Usuario no encontrado en tabla users para auth_id:', userId);
      }
    }

    // Insertar registro en usage_tracking
    const { error } = await supabase.from('usage_tracking').insert({
      user_id: internalUserId,
      anonymous_id: anonymousId || null,
      tool_type: toolType,
      input_length: characterCount || 0,
      output_length: null,
      success: true,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('[trackUsage] Error insertando en DB:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    return { success: true };
  } catch (err) {
    console.error('[trackUsage] Error inesperado:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Error desconocido',
    };
  }
}

/**
 * Versión client-side que llama a una API route
 * (Usar cuando no tenemos acceso a createClient server-side)
 */
export async function trackUsageClient(
  params: Omit<TrackUsageParams, 'userId'>
): Promise<TrackUsageResult> {
  try {
    const response = await fetch('/api/track-usage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Error en tracking',
      };
    }

    return { success: true };
  } catch (err) {
    console.error('[trackUsageClient] Error:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Error desconocido',
    };
  }
}
