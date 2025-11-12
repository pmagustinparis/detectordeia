/**
 * History Saving System
 *
 * Guarda automáticamente el historial de usos para usuarios autenticados.
 *
 * Límites:
 * - Free: Últimos 5 usos + 3 días
 * - Premium: 100 usos + 30 días
 */

import { createClient } from '@/lib/supabase/server';
import type { ToolType } from '../tracking/trackUsage';

export interface SaveToHistoryParams {
  userId: string; // UUID del usuario autenticado (requerido)
  toolType: ToolType;
  inputText: string;
  outputText: string;
  characterCount: number;
  metadata?: Record<string, any>; // Datos adicionales (ej: probability, mode, etc)
}

export interface SaveToHistoryResult {
  success: boolean;
  historyId?: string;
  error?: string;
}

/**
 * Guarda un uso en el historial del usuario
 * Solo funciona para usuarios autenticados
 *
 * @param params - Parámetros del historial
 * @returns Resultado de la operación
 */
export async function saveToHistory(
  params: SaveToHistoryParams
): Promise<SaveToHistoryResult> {
  try {
    const { userId, toolType, inputText, outputText, characterCount, metadata } = params;

    // Validar userId
    if (!userId) {
      console.error('[saveToHistory] Error: userId es requerido');
      return {
        success: false,
        error: 'userId es requerido',
      };
    }

    // Crear cliente Supabase
    const supabase = await createClient();

    // Obtener info del usuario (id interno y plan)
    const { data: user } = await supabase
      .from('users')
      .select('id, plan_type')
      .eq('auth_id', userId)
      .single();

    if (!user) {
      console.error('[saveToHistory] Usuario no encontrado para auth_id:', userId);
      return {
        success: false,
        error: 'Usuario no encontrado',
      };
    }

    // Insertar en history (usando users.id, no auth_id)
    const { data: history, error: insertError } = await supabase
      .from('history')
      .insert({
        user_id: user.id,
        tool_type: toolType,
        input_text: inputText,
        output_text: outputText,
        input_length: inputText.length,
        output_length: outputText.length,
        created_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (insertError) {
      console.error('[saveToHistory] Error insertando en DB:', insertError);
      return {
        success: false,
        error: insertError.message,
      };
    }

    // 🧹 CLEANUP - Mantener solo últimos N usos + X días
    const limits = user.plan_type === 'premium'
      ? { maxRecords: 100, maxDays: 30 }
      : { maxRecords: 5, maxDays: 3 };

    await cleanupOldHistory(user.id, limits.maxRecords, limits.maxDays);

    return {
      success: true,
      historyId: history.id,
    };
  } catch (err) {
    console.error('[saveToHistory] Error inesperado:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Error desconocido',
    };
  }
}

/**
 * Limpia el historial viejo del usuario
 * Mantiene solo los últimos N registros y registros de los últimos X días
 *
 * @param userId - UUID del usuario
 * @param maxRecords - Máximo de registros a mantener
 * @param maxDays - Máximo de días hacia atrás
 */
async function cleanupOldHistory(
  userId: string,
  maxRecords: number,
  maxDays: number
): Promise<void> {
  try {
    const supabase = await createClient();

    // 1. Eliminar registros más viejos que maxDays
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - maxDays);

    await supabase
      .from('history')
      .delete()
      .eq('user_id', userId)
      .lt('created_at', cutoffDate.toISOString());

    // 2. Mantener solo los últimos maxRecords
    // Obtener todos los registros ordenados por fecha (más recientes primero)
    const { data: allRecords } = await supabase
      .from('history')
      .select('id, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (allRecords && allRecords.length > maxRecords) {
      // Obtener IDs de registros a eliminar (los que excedan maxRecords)
      const idsToDelete = allRecords.slice(maxRecords).map((r) => r.id);

      if (idsToDelete.length > 0) {
        await supabase
          .from('history')
          .delete()
          .in('id', idsToDelete);
      }
    }
  } catch (err) {
    console.error('[cleanupOldHistory] Error:', err);
    // No propagar el error, el cleanup es secundario
  }
}
