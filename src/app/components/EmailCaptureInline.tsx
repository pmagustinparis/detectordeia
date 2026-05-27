'use client';

import { useState } from 'react';

interface EmailCaptureInlineProps {
  probability: number;
  confidence?: string;
  toolType?: 'detector' | 'humanizador' | 'parafraseador';
  anonymousId?: string;
  textLength?: number;
}

export default function EmailCaptureInline({
  probability,
  confidence,
  toolType = 'detector',
  anonymousId,
  textLength,
}: EmailCaptureInlineProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const isHighRisk = probability >= 70;

  const copy = isHighRisk
    ? {
        headline: `Tu texto tiene ${probability}% de IA — te explicamos cómo bajarlo`,
        sub: 'Dejá tu email y te mandamos el análisis completo con los pasos concretos.',
        cta: 'Recibir análisis →',
      }
    : {
        headline: 'Guardá este resultado en tu email',
        sub: 'Te enviamos el resultado y consejos para mejorar tu texto.',
        cta: 'Guardar resultado →',
      };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: `${toolType}_post_result`,
          tool_type: toolType,
          result_probability: probability,
          result_confidence: confidence,
          text_length: textLength,
          anonymous_id: anonymousId,
        }),
      });
      if (res.ok) {
        setStatus('done');
        // Marcar en localStorage para no volver a mostrar en esta sesión
        try { localStorage.setItem('email_capture_done', '1'); } catch {}
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <div className="w-full my-4 p-4 bg-verde-050 border border-verde-soft rounded-xl flex items-center gap-3">
        <span className="text-verde text-lg">✓</span>
        <div>
          <p className="text-sm font-semibold text-verde">¡Listo! Revisá tu email.</p>
          <p className="text-xs text-tinta-soft mt-0.5">
            Si querés usar el humanizador ahora,{' '}
            <a href="/pricing" className="underline text-tinta hover:text-tinta-soft">
              Express Pass desde $3.99
            </a>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full my-4 p-4 rounded-xl border ${
      isHighRisk
        ? 'bg-red-50 border-red-200'
        : 'bg-papel-2 border-line'
    }`}>
      <p className={`text-sm font-semibold mb-0.5 ${isHighRisk ? 'text-red-800' : 'text-tinta'}`}>
        {copy.headline}
      </p>
      <p className={`text-xs mb-3 ${isHighRisk ? 'text-red-700' : 'text-tinta-soft'}`}>
        {copy.sub}
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          disabled={status === 'loading'}
          className="flex-1 min-w-0 text-sm px-3 py-2 border border-line rounded-lg bg-papel focus:outline-none focus:ring-1 focus:ring-tinta placeholder:text-mute"
        />
        <button
          type="submit"
          disabled={status === 'loading' || !email}
          className={`shrink-0 text-xs font-semibold px-4 py-2 rounded-lg transition-all disabled:opacity-50 ${
            isHighRisk
              ? 'bg-red-700 hover:bg-red-800 text-white'
              : 'bg-tinta hover:bg-tinta-soft text-papel'
          }`}
        >
          {status === 'loading' ? '...' : copy.cta}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-xs text-red-600 mt-1">Error al guardar. Intentá de nuevo.</p>
      )}
      <p className="text-xs text-mute mt-1.5">Sin spam · Podés cancelar cuando quieras</p>
    </div>
  );
}
