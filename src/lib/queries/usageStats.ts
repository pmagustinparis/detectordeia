/**
 * Usage Stats Queries
 *
 * Queries para obtener estadísticas de uso de usuarios autenticados.
 */

import { createClient } from '@/lib/supabase/server';
import type { ToolType } from '../tracking/trackUsage';

export interface UsageStats {
  usesToday: number;
  usesThisMonth: number;
  usesTodayByTool: {
    detector: number;
    humanizador: number;
    parafraseador: number;
  };
  limit: number;
  remaining: number;
  resetAt: Date;
  planType: 'free' | 'premium';
}

/**
 * Obtiene estadísticas de uso de un usuario
 *
 * @param userId - UUID del usuario autenticado
 * @returns Estadísticas de uso
 */
export async function getUserUsageStats(userId: string): Promise<UsageStats | null> {
  try {
    const supabase = await createClient();

    // Obtener plan del usuario
    const { data: user } = await supabase
      .from('users')
      .select('plan_type')
      .eq('auth_id', userId)
      .single();

    if (!user) {
      console.error('[getUserUsageStats] Usuario no encontrado');
      return null;
    }

    const planType = user.plan_type === 'premium' ? 'premium' : 'free';
    const limit = planType === 'premium' ? Infinity : 50;

    // Calcular inicio del día actual (00:00 UTC)
    const startOfToday = new Date();
    startOfToday.setUTCHours(0, 0, 0, 0);

    // Calcular inicio del mes actual
    const startOfMonth = new Date();
    startOfMonth.setUTCDate(1);
    startOfMonth.setUTCHours(0, 0, 0, 0);

    // Calcular inicio del día siguiente (para resetAt)
    const startOfTomorrow = new Date(startOfToday);
    startOfTomorrow.setUTCDate(startOfTomorrow.getUTCDate() + 1);

    // Query: Usos de hoy
    const { count: usesToday } = await supabase
      .from('usage_tracking')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', startOfToday.toISOString());

    // Query: Usos de este mes
    const { count: usesThisMonth } = await supabase
      .from('usage_tracking')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', startOfMonth.toISOString());

    // Query: Usos de hoy por herramienta
    const { data: usesTodayData } = await supabase
      .from('usage_tracking')
      .select('tool_type')
      .eq('user_id', userId)
      .gte('created_at', startOfToday.toISOString());

    const usesTodayByTool = {
      detector: 0,
      humanizador: 0,
      parafraseador: 0,
    };

    if (usesTodayData) {
      usesTodayData.forEach((record) => {
        if (record.tool_type in usesTodayByTool) {
          usesTodayByTool[record.tool_type as ToolType]++;
        }
      });
    }

    return {
      usesToday: usesToday || 0,
      usesThisMonth: usesThisMonth || 0,
      usesTodayByTool,
      limit,
      remaining: Math.max(0, limit - (usesToday || 0)),
      resetAt: startOfTomorrow,
      planType,
    };
  } catch (err) {
    console.error('[getUserUsageStats] Error:', err);
    return null;
  }
}

/**
 * Obtiene el historial de un usuario
 * Límites: últimos 10 usos + 7 días (Free), 100 usos + 30 días (Premium)
 *
 * @param userId - UUID del usuario autenticado
 * @returns Array de registros de historial
 */
export async function getUserHistory(userId: string) {
  try {
    const supabase = await createClient();

    // Obtener plan del usuario
    const { data: user } = await supabase
      .from('users')
      .select('plan_type')
      .eq('auth_id', userId)
      .single();

    if (!user) {
      console.error('[getUserHistory] Usuario no encontrado');
      return [];
    }

    const planType = user.plan_type === 'premium' ? 'premium' : 'free';
    const limits = planType === 'premium'
      ? { maxRecords: 100, maxDays: 30 }
      : { maxRecords: 10, maxDays: 7 };

    // Calcular fecha límite
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - limits.maxDays);

    // Query: Últimos N registros dentro de los últimos X días
    const { data: history, error } = await supabase
      .from('history')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', cutoffDate.toISOString())
      .order('created_at', { ascending: false })
      .limit(limits.maxRecords);

    if (error) {
      console.error('[getUserHistory] Error:', error);
      return [];
    }

    return history || [];
  } catch (err) {
    console.error('[getUserHistory] Error:', err);
    return [];
  }
}
