'use client';

import { useState } from 'react';
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

  if (!isOpen) return null;

  const handleExpressCheckout = async () => {
    setLoading(true);

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

  const getIcon = () => {
    if (trigger === 'character_limit') return '📏';
    if (trigger === 'daily_limit') return '⏱️';
    return '🔒';
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
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Icon + Title */}
          <div className="text-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mx-auto mb-3">
              <span className="text-4xl">{getIcon()}</span>
            </div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-1">{getTitle()}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{getSubtitle()}</p>
          </div>

          {/* Express Pass - Opción principal */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-4 mb-3">
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
                    : 'bg-white text-amber-800 border-2 border-amber-300 hover:bg-amber-50'
                }`}
              >
                24 horas · $3.99
              </button>
              <button
                onClick={() => setDuration('7d')}
                className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-sm transition-colors ${
                  duration === '7d'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-white text-amber-800 border-2 border-amber-300 hover:bg-amber-50'
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
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-colors text-sm"
            >
              {loading ? 'Procesando...' : `Activar Express Pass · $${PRICES.express[duration]}`}
            </button>
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
            onClick={onClose}
            className="w-full text-center text-gray-500 hover:text-gray-700 text-sm py-1 transition-colors"
          >
            {trigger === 'character_limit' ? 'Volver y reducir mi texto' : 'Volver'}
          </button>
        </div>
      </div>
    </>
  );
}
