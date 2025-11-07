/**
 * Rate Limiting System
 *
 * Verifica si un usuario ha alcanzado su límite de usos diarios.
 *
 * Límites:
 * - Anónimo: 10 usos/día
 * - Free: 50 usos/día
 * - Premium: ilimitado (Fase 1)
 */

import { createClient } from '@/lib/supabase/server';
import type { ToolType } from './trackUsage';

// Límites por tipo de usuario
const RATE_LIMITS = {
  anonymous: 10,
  free: 50,
  premium: Infinity, // Sin límite (Fase 1)
};

export interface RateLimitResult {
  allowed: boolean; // ¿Puede hacer la request?
  remaining: number; // Usos restantes hoy
  limit: number; // Límite total
  usedToday: number; // Usos consumidos hoy
  resetAt: Date; // Cuándo resetea el límite (medianoche UTC)
  userType: 'anonymous' | 'free' | 'premium';
}

export interface CheckRateLimitParams {
  userId?: string; // UUID del usuario autenticado
  anonymousId?: string; // UUID del usuario anónimo
  toolType?: ToolType; // Opcional: verificar límite por herramienta específica
}

/**
 * Verifica si un usuario puede hacer otra request según su límite diario
 *
 * @param params - Parámetros de verificación
 * @returns Resultado del rate limit check
 */
export async function checkRateLimit(
  params: CheckRateLimitParams
): Promise<RateLimitResult> {
  try {
    const { userId, anonymousId, toolType } = params;

    // Validar que al menos userId o anonymousId estén presentes
    if (!userId && !anonymousId) {
      throw new Error('userId o anonymousId requeridos');
    }

    // Crear cliente Supabase
    const supabase = await createClient();

    // Determinar tipo de usuario y límite
    let userType: 'anonymous' | 'free' | 'premium' = 'anonymous';
    let limit = RATE_LIMITS.anonymous;

    if (userId) {
      // Usuario autenticado: verificar su plan
      const { data: user } = await supabase
        .from('users')
        .select('plan_type')
        .eq('auth_id', userId)
        .single();

      if (user) {
        userType = user.plan_type === 'premium' ? 'premium' : 'free';
        limit = RATE_LIMITS[userType];
      }
    }

    // Calcular inicio del día actual (00:00 UTC)
    const startOfToday = new Date();
    startOfToday.setUTCHours(0, 0, 0, 0);

    // Calcular inicio del día siguiente (para resetAt)
    const startOfTomorrow = new Date(startOfToday);
    startOfTomorrow.setUTCDate(startOfTomorrow.getUTCDate() + 1);

    // Construir query base
    let query = supabase
      .from('usage_tracking')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', startOfToday.toISOString());

    // Filtrar por userId o anonymousId
    if (userId) {
      query = query.eq('user_id', userId);
    } else if (anonymousId) {
      query = query.eq('anonymous_id', anonymousId);
    }

    // Opcional: filtrar por herramienta específica
    if (toolType) {
      query = query.eq('tool_type', toolType);
    }

    // Ejecutar query
    const { count, error } = await query;

    if (error) {
      console.error('[checkRateLimit] Error consultando DB:', error);
      throw error;
    }

    const usedToday = count || 0;
    const remaining = Math.max(0, limit - usedToday);
    const allowed = usedToday < limit;

    return {
      allowed,
      remaining,
      limit,
      usedToday,
      resetAt: startOfTomorrow,
      userType,
    };
  } catch (err) {
    console.error('[checkRateLimit] Error:', err);

    // En caso de error, permitir la request para no bloquear el servicio
    // pero loggear el error
    return {
      allowed: true,
      remaining: 0,
      limit: 0,
      usedToday: 0,
      resetAt: new Date(),
      userType: 'anonymous',
    };
  }
}

/**
 * Obtiene los headers HTTP estándar de rate limiting
 * Para incluir en las responses de las APIs
 *
 * @param result - Resultado del checkRateLimit
 * @returns Headers para la response
 */
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': Math.floor(result.resetAt.getTime() / 1000).toString(), // Unix timestamp
  };
}
