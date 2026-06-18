'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics/client';

interface ExpressPremiumComparisonCardProps {
  isAuthenticated: boolean;
  toolName: 'detector' | 'humanizador' | 'parafraseador';
  source: string;
  context?: 'post_result' | 'post_insufficient' | 'default';
}

const PRICES = {
  express: { '24h': 5.99, '7d': 8.99 },
};

const TOOL_COPY: Record<string, { expressTag: string; weeklyPitch: string }> = {
  humanizador: {
    expressTag: 'Para entregas urgentes',
    weeklyPitch: 'Semana de exámenes? Con 7 días ($8.99) procesás todo sin límites.',
  },
  parafraseador: {
    expressTag: 'Para sesiones intensivas',
    weeklyPitch: '¿Varios párrafos hoy? Con 7 días ($8.99) procesás todo sin límites.',
  },
  detector: {
    expressTag: 'Para documentos largos',
    weeklyPitch: '¿Varios documentos? Con 7 días ($8.99) procesás todo sin límites.',
  },
};

export default function ExpressPremiumComparisonCard({
  isAuthenticated,
  toolName,
  source,
  context = 'default',
}: ExpressPremiumComparisonCardProps) {
  const [duration, setDuration] = useState<'24h' | '7d'>('24h');
  const [loading, setLoading] = useState(false);

  const toolCopy = TOOL_COPY[toolName];

  const handleExpressCheckout = async () => {
    setLoading(true);
    trackEvent({
      eventType: 'checkout_started',
      metadata: { plan_type: 'express', duration, price: PRICES.express[duration], is_authenticated: isAuthenticated, source, tool: toolName },
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
      if (error) { alert('Error al crear la sesión de pago. Por favor, intentá de nuevo.'); setLoading(false); return; }
      if (url) window.location.href = url;
    } catch {
      alert('Error al procesar tu solicitud. Por favor, intentá de nuevo.');
      setLoading(false);
    }
  };

  const title = context === 'post_insufficient'
    ? 'El modo Académico mejora los resultados'
    : 'Desbloqueá todo con Express Pass';

  return (
    <div className="mt-3 p-4 bg-papel-2 border border-line rounded-xl">
      <p className="text-sm font-medium text-tinta mb-3 font-sans">{title}</p>

      <div className="mb-3">
        {/* Express — opción única */}
        <div className="border-2 border-amber-300 bg-amber-50 rounded-xl p-4 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full">SIN SUSCRIPCIÓN</span>
            <span className="text-xs text-amber-600 line-through">antes Semestral $24.99</span>
          </div>
          <p className="text-sm font-bold text-amber-900 mb-1">Express Pass</p>
          <p className="text-xs text-amber-700 mb-2">{toolCopy.expressTag}</p>
          <div className="flex gap-1 mb-2">
            <button onClick={() => setDuration('24h')} className={`flex-1 text-xs py-1.5 rounded-lg font-semibold transition-colors ${duration === '24h' ? 'bg-amber-500 text-white' : 'bg-white text-amber-800 border border-amber-300'}`}>
              24h · $5.99
            </button>
            <button onClick={() => setDuration('7d')} className={`flex-1 text-xs py-1.5 rounded-lg font-semibold transition-colors ${duration === '7d' ? 'bg-amber-500 text-white' : 'bg-white text-amber-800 border border-amber-300'}`}>
              7d · $8.99
            </button>
          </div>
          <ul className="text-xs text-amber-800 space-y-0.5 mb-3 flex-1">
            <li>✓ Modos avanzados hoy</li>
            <li>✓ Sin límite de caracteres</li>
            <li>✓ Subida de archivos · sin renovación</li>
          </ul>
          <button onClick={handleExpressCheckout} disabled={loading} className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-bold py-2.5 px-3 rounded-lg transition-colors text-sm">
            {loading ? 'Procesando...' : `Activar Express · $${PRICES.express[duration]}`}
          </button>
        </div>
      </div>

      {duration === '7d' && (
        <p className="text-xs text-amber-700 text-center font-medium">{toolCopy.weeklyPitch}</p>
      )}
    </div>
  );
}
