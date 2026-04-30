'use client';

import { useState, useEffect } from 'react';
import { trackEvent } from '@/lib/analytics/client';

interface ExpressUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  trigger: 'character_limit' | 'daily_limit' | 'premium_mode';
  toolName: 'detector' | 'humanizador' | 'parafraseador';
  // Para character_limit
  excessChars?: number;
  charLimit?: number;
  // Para daily_limit
  usageLimit?: number;
  hoursUntilReset?: number;
  // Para premium_mode
  modeName?: string;
}

const PRICES = {
  express: { '24h': 3.99, '7d': 8.99 },
};

export default function ExpressUnlockModal({
  isOpen,
  onClose,
  isAuthenticated,
  trigger,
  toolName,
  excessChars,
  charLimit,
  usageLimit,
  hoursUntilReset,
  modeName,
}: ExpressUnlockModalProps) {
  const [duration, setDuration] = useState<'24h' | '7d'>('24h');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      trackEvent({
        eventType: 'upsell_modal_shown',
        metadata: { trigger, tool: toolName, is_authenticated: isAuthenticated },
      });
    }
  }, [isOpen, trigger, toolName, isAuthenticated]);

  if (!isOpen) return null;

  const handleDismiss = () => {
    trackEvent({
      eventType: 'upsell_modal_dismissed',
      metadata: { trigger, tool: toolName, is_authenticated: isAuthenticated },
    });
    onClose();
  };

  const handleExpressCheckout = async () => {
    setLoading(true);

    trackEvent({
      eventType: 'upsell_modal_clicked',
      metadata: { trigger, tool: toolName, duration, is_authenticated: isAuthenticated },
    });

    trackEvent({
      eventType: 'checkout_started',
      metadata: {
        plan_type: 'express',
        duration,
        price: PRICES.express[duration],
        is_authenticated: isAuthenticated,
        source: trigger,
        tool: toolName,
      },
    });

    if (!isAuthenticated) {
      localStorage.setItem('pending_plan_type', 'express');
      localStorage.setItem('pending_express_duration', duration);
      window.location.href = '/auth/signup';
      return;
    }

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan_type: 'express', duration }),
      });
      const { url, error } = await response.json();
      if (error) {
        alert('Error al crear la sesión de pago. Por favor, intentá de nuevo.');
        setLoading(false);
        return;
      }
      if (url) window.location.href = url;
    } catch {
      alert('Error al procesar tu solicitud. Por favor, intentá de nuevo.');
      setLoading(false);
    }
  };

  const getTitle = () => {
    if (trigger === 'character_limit') return 'Texto Demasiado Largo';
    if (trigger === 'daily_limit') return 'Límite Diario Alcanzado';
    return `Modo ${modeName || 'Premium'} Bloqueado`;
  };

  const getIconSvg = () => {
    if (trigger === 'character_limit') return <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
    if (trigger === 'daily_limit') return <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    return <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
  };

  const getSubtitle = () => {
    if (trigger === 'character_limit' && excessChars && charLimit) {
      return `Tu texto tiene ${excessChars.toLocaleString()} caracteres de más. Plan Free: hasta ${charLimit.toLocaleString()} caracteres por vez.`;
    }
    if (trigger === 'daily_limit' && usageLimit) {
      return `Alcanzaste tu límite de ${usageLimit} usos diarios.${hoursUntilReset ? ` Se restablece en ${hoursUntilReset}h.` : ''}`;
    }
    if (trigger === 'premium_mode' && modeName) {
      return `El modo ${modeName} está disponible con Express Pass o Plan Premium.`;
    }
    return 'Desbloqueá el acceso completo para continuar.';
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-50"
        onClick={handleDismiss}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Icon + Title */}
          <div className="text-center mb-4">
            <div className="w-14 h-14 rounded-xl bg-amber-50 flex items-center justify-center mx-auto mb-3">
              {getIconSvg()}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{getTitle()}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{getSubtitle()}</p>
          </div>

          {/* Express Pass - Opción principal */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-3">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">⚡</span>
              <div>
                <p className="font-bold text-amber-900 text-sm">DESBLOQUEÁ AHORA</p>
                <p className="text-xs text-amber-700">Acceso completo · Sin suscripción</p>
              </div>
            </div>

            {/* Selector 24h / 7 días */}
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setDuration('24h')}
                className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-sm transition-colors ${
                  duration === '24h'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-white text-amber-800 border border-amber-200 hover:bg-amber-50'
                }`}
              >
                24 horas · $3.99
              </button>
              <button
                onClick={() => setDuration('7d')}
                className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-sm transition-colors ${
                  duration === '7d'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-white text-amber-800 border border-amber-200 hover:bg-amber-50'
                }`}
              >
                7 días · $8.99
              </button>
            </div>

            {duration === '7d' && (
              <p className="text-xs text-amber-700 font-semibold text-center mb-2">
                💰 Ahorra 68% vs 7 días individuales
              </p>
            )}

            <ul className="text-xs text-amber-900 space-y-1 mb-3">
              <li>✓ <strong>Modos premium</strong> · sin límite de caracteres</li>
              <li>✓ <strong>Subida de archivos</strong> · usos ilimitados</li>
              <li>✓ <strong>Pago único</strong> · sin renovación automática</li>
            </ul>

            <button
              onClick={handleExpressCheckout}
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-60 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 text-sm"
            >
              {loading
                ? 'Procesando...'
                : isAuthenticated
                  ? `⚡ Activar Express Pass · $${PRICES.express[duration]}`
                  : `⚡ Crear cuenta y activar · $${PRICES.express[duration]}`
              }
            </button>
            {!isAuthenticated && (
              <p className="text-xs text-amber-700 text-center mt-1.5">
                Registro gratuito · 10 segundos · activación inmediata
              </p>
            )}
          </div>

          {/* Premium - Opción secundaria */}
          <div className="border border-gray-200 rounded-xl p-3 mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-gray-700">Plan Premium · $12.99/mes</p>
              <p className="text-xs text-gray-500">Para uso frecuente · Cancela cuando quieras</p>
            </div>
            <a
              href="/pricing"
              className="shrink-0 text-xs font-semibold text-blue-900 border border-blue-900/30 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              Ver →
            </a>
          </div>

          {/* Close */}
          <button
            onClick={handleDismiss}
            className="w-full text-center text-gray-500 hover:text-gray-700 text-sm py-1 transition-colors"
          >
            {trigger === 'character_limit' ? 'Volver y reducir mi texto' : 'Volver'}
          </button>
        </div>
      </div>
    </>
  );
}
