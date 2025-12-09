/**
 * Rate Limiting System
 *
 * Verifica si un usuario ha alcanzado su límite de usos diarios.
 *
 * Límites por herramienta:
 * - Anónimo: 1 uso/día (total entre las 3 herramientas)
 * - Free:
 *   - Detector: 15 análisis/día
 *   - Humanizador: 3 usos/día (REDUCIDO para impulsar conversión a PRO)
 *   - Parafraseador: 10 usos/día
 * - Express: ilimitado por 24 horas ($3.99)
 * - Premium: ilimitado permanente ($12.99/mes)
 */

import { createClient } from '@/lib/supabase/server';
import type { ToolType } from './trackUsage';

// Límites por tipo de usuario y herramienta
const RATE_LIMITS = {
  anonymous: {
    total: 1, // Límite global para anónimos (reducido para impulsar registro)
  },
  free: {
    detector: 15,
    humanizador: 3, // REDUCIDO: impulsa conversión a PRO
    parafraseador: 10,
  },
  premium: {
    detector: Infinity,
    humanizador: Infinity,
    parafraseador: Infinity,
  },
};

export interface RateLimitResult {
  allowed: boolean; // ¿Puede hacer la request?
  remaining: number; // Usos restantes hoy
  limit: number; // Límite total
  usedToday: number; // Usos consumidos hoy
  resetAt: Date; // Cuándo resetea el límite (medianoche UTC o expiración Express)
  userType: 'anonymous' | 'free' | 'express' | 'premium';
  expressExpiresAt?: Date; // Si tiene Express activo, cuándo expira
}

export interface CheckRateLimitParams {
  userId?: string; // UUID del usuario autenticado
  anonymousId?: string; // UUID del usuario anónimo
  toolType: ToolType; // Requerido: verificar límite por herramienta específica
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
    let userType: 'anonymous' | 'free' | 'express' | 'premium' = 'anonymous';
    let limit: number;
    let internalUserId: string | null = null;
    let expressExpiresAt: Date | undefined;

    if (userId) {
      // Usuario autenticado: obtener id interno, plan y Express
      const { data: user } = await supabase
        .from('users')
        .select('id, plan_type, express_expires_at')
        .eq('auth_id', userId)
        .single();

      if (user) {
        internalUserId = user.id;

        // Verificar si tiene Express activo (primero que Premium)
        const hasActiveExpress = user.express_expires_at &&
          new Date(user.express_expires_at) > new Date();

        if (hasActiveExpress) {
          userType = 'express';
          limit = Infinity; // Sin límite durante Express
          expressExpiresAt = new Date(user.express_expires_at);
        } else if (user.plan_type === 'premium') {
          userType = 'premium';
          limit = Infinity; // Sin límite para premium
        } else {
          userType = 'free';
          limit = RATE_LIMITS.free[toolType];
        }
      } else {
        // Usuario no encontrado, tratar como anónimo
        limit = RATE_LIMITS.anonymous.total;
      }
    } else {
      // Usuario anónimo: límite total (no por herramienta)
      limit = RATE_LIMITS.anonymous.total;
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
    if (internalUserId) {
      query = query.eq('user_id', internalUserId);
      // Para usuarios autenticados, filtrar por herramienta específica
      query = query.eq('tool_type', toolType);
    } else if (anonymousId) {
      query = query.eq('anonymous_id', anonymousId);
      // Para anónimos, NO filtrar por herramienta (límite total)
      // Contar todos los usos del día sin importar la herramienta
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

    // Para Express, resetAt es cuando expira el pase
    const resetAt = userType === 'express' && expressExpiresAt
      ? expressExpiresAt
      : startOfTomorrow;

    return {
      allowed,
      remaining,
      limit,
      usedToday,
      resetAt,
      userType,
      ...(expressExpiresAt && { expressExpiresAt }),
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
