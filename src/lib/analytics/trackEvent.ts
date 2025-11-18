/**
 * Analytics Event Tracking
 *
 * Función para trackear eventos de comportamiento de usuario
 * para el dashboard de analytics.
 *
 * Eventos se guardan en la tabla `analytics_events` de Supabase.
 */

import { createClient } from '@supabase/supabase-js';

// Tipos de eventos que podemos trackear
export type AnalyticsEventType =
  // Límites alcanzados
  | 'hit_daily_limit'
  | 'hit_character_limit'
  | 'approaching_daily_limit' // Cuando está cerca del límite (ej: 4/5 usos)

  // Features bloqueadas (intentos de usar Pro en Free)
  | 'file_upload_blocked'
  | 'premium_mode_blocked'
  | 'advanced_metrics_blocked'

  // Conversión
  | 'viewed_pricing'
  | 'clicked_upgrade'
  | 'clicked_pricing_cta'

  // Uso exitoso
  | 'completed_analysis'
  | 'completed_humanization'
  | 'completed_paraphrase'

  // Autenticación
  | 'signup'
  | 'login'
  | 'logout';

export type ToolType = 'detector' | 'humanizador' | 'parafraseador' | 'general';

interface TrackEventParams {
  eventType: AnalyticsEventType;
  userId?: string | null;
  anonymousId?: string | null;
  toolType?: ToolType;
  metadata?: Record<string, any>;
  pageUrl?: string;
  referrer?: string;
}

/**
 * Trackea un evento de analytics
 *
 * Esta función se ejecuta en el servidor (API routes) para garantizar
 * que se use el service role de Supabase (bypassing RLS).
 *
 * NO llamar directamente desde el cliente.
 * Usar vía API route: POST /api/analytics/track
 */
export async function trackAnalyticsEvent(params: TrackEventParams): Promise<void> {
  try {
    const {
      eventType,
      userId = null,
      anonymousId = null,
      toolType = 'general',
      metadata = {},
      pageUrl,
      referrer,
    } = params;

    // Validación básica
    if (!userId && !anonymousId) {
      console.warn('[Analytics] No userId ni anonymousId provided, skipping tracking');
      return;
    }

    // Cliente Supabase con service role (para bypass RLS)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('[Analytics] Missing Supabase credentials');
      return;
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insertar evento
    const { error } = await supabase
      .from('analytics_events')
      .insert({
        event_type: eventType,
        user_id: userId,
        anonymous_id: anonymousId,
        tool_type: toolType,
        metadata,
        page_url: pageUrl,
        referrer: referrer,
      });

    if (error) {
      console.error('[Analytics] Error tracking event:', error);
    } else {
      console.log(`[Analytics] ✅ Tracked: ${eventType} (${toolType})`);
    }
  } catch (error) {
    console.error('[Analytics] Exception tracking event:', error);
    // No lanzamos error para no romper el flujo de la app
  }
}

/**
 * Helper para obtener anonymousId del cliente
 * Usa localStorage para persistir ID entre sesiones
 */
export function getAnonymousId(): string {
  if (typeof window === 'undefined') return '';

  const key = 'detectordeia_anonymous_id';
  let anonymousId = localStorage.getItem(key);

  if (!anonymousId) {
    // Generar ID único simple (timestamp + random)
    anonymousId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(key, anonymousId);
  }

  return anonymousId;
}
