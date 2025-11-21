/**
 * Analytics Client
 *
 * Helper para trackear eventos desde componentes del cliente.
 * Llama a /api/analytics/track internamente.
 */

import { AnalyticsEventType, ToolType, getAnonymousId } from './trackEvent';

interface TrackEventClientParams {
  eventType: AnalyticsEventType;
  toolType?: ToolType;
  metadata?: Record<string, any>;
}

/**
 * Trackea un evento desde el cliente
 *
 * Uso:
 * ```tsx
 * import { trackEvent } from '@/lib/analytics/client';
 *
 * // En un componente
 * await trackEvent({
 *   eventType: 'hit_daily_limit',
 *   toolType: 'detector',
 *   metadata: { limit: 15, current: 15 }
 * });
 * ```
 */
export async function trackEvent(params: TrackEventClientParams): Promise<void> {
  try {
    const { eventType, toolType = 'general', metadata = {} } = params;

    // Obtener anonymousId del localStorage
    const anonymousId = getAnonymousId();

    // Llamar a API route
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventType,
        toolType,
        metadata,
        anonymousId,
      }),
    });

    // No esperamos respuesta ni manejamos errores para no bloquear UX
  } catch (error) {
    // Silencioso - no queremos que falle el tracking rompa la app
    console.debug('[Analytics] Error tracking event:', error);
  }
}
