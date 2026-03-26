'use client';

import { useState, useCallback } from 'react';
import { getAnonymousId } from '@/lib/analytics/trackEvent';

interface ChurnSurveyProps {
  onClose: () => void;
  onRetain?: () => void;
}

const CHURN_REASONS = [
  { key: 'too_expensive', label: 'Es muy caro' },
  { key: 'no_longer_needed', label: 'Ya no lo necesito' },
  { key: 'missing_feature', label: 'Le falta una función importante' },
  { key: 'found_alternative', label: 'Encontré una alternativa mejor' },
  { key: 'temporary_need', label: 'Solo lo necesitaba temporalmente' },
  { key: 'technical_issues', label: 'Tuve problemas técnicos' },
  { key: 'other', label: 'Otro motivo' },
] as const;

type ChurnReasonKey = (typeof CHURN_REASONS)[number]['key'];

export default function ChurnSurvey({ onClose, onRetain }: ChurnSurveyProps) {
  const [selectedReason, setSelectedReason] = useState<ChurnReasonKey | null>(null);
  const [followUpText, setFollowUpText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const needsFollowUp = selectedReason === 'missing_feature' || selectedReason === 'found_alternative';

  const followUpPlaceholder = selectedReason === 'missing_feature'
    ? '¿Qué función te faltó?'
    : selectedReason === 'found_alternative'
    ? '¿Qué alternativa encontraste?'
    : '';

  const handleSubmit = useCallback(async () => {
    if (!selectedReason) return;
    setIsSubmitting(true);

    try {
      await fetch('/api/surveys/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          surveyType: 'churn',
          questionKey: 'por_que_cancelas',
          responseOption: selectedReason,
          responseText: followUpText.trim() || undefined,
          anonymousId: getAnonymousId(),
          pageUrl: window.location.pathname,
          context: {
            reason_label: CHURN_REASONS.find(r => r.key === selectedReason)?.label,
          },
        }),
      });

      setSubmitted(true);
      setTimeout(() => onClose(), 3000);
    } catch (err) {
      console.error('[ChurnSurvey] Submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedReason, followUpText, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">

        {submitted ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">💙</div>
            <p className="text-lg font-semibold text-slate-800">Gracias por tu tiempo</p>
            <p className="text-sm text-slate-500 mt-2">
              Tu feedback nos ayuda a mejorar para todos los usuarios.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Antes de irte</p>
              <p className="text-lg font-semibold text-slate-800">
                ¿Por qué cancelás tu suscripción?
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Tu respuesta nos ayuda a mejorar el producto.
              </p>
            </div>

            {/* Opciones */}
            <div className="flex flex-col gap-2 mb-4">
              {CHURN_REASONS.map((reason) => (
                <button
                  key={reason.key}
                  onClick={() => {
                    setSelectedReason(reason.key);
                    setFollowUpText('');
                  }}
                  className={`text-left text-sm px-4 py-3 rounded-xl border transition-all ${
                    selectedReason === reason.key
                      ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {reason.label}
                </button>
              ))}
            </div>

            {/* Follow-up condicional */}
            {needsFollowUp && (
              <textarea
                value={followUpText}
                onChange={(e) => setFollowUpText(e.target.value)}
                placeholder={followUpPlaceholder}
                className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 placeholder:text-slate-400 mb-4"
                rows={2}
                maxLength={300}
                autoFocus
              />
            )}

            {/* Botones */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !selectedReason}
                className="w-full bg-slate-700 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
              >
                {isSubmitting ? 'Enviando...' : 'Cancelar de todas formas'}
              </button>
              {onRetain && (
                <button
                  onClick={onRetain}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
                >
                  Mantener mi suscripción
                </button>
              )}
              <button
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-slate-600 py-1 transition-colors"
              >
                Cerrar sin responder
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
