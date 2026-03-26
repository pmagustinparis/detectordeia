'use client';

import { useState, useCallback } from 'react';
import { getAnonymousId } from '@/lib/analytics/trackEvent';

const COOLDOWN_KEY = 'passive_feedback_cooldown';
const COOLDOWN_DAYS = 7;

function getCooldownExpiry(): number | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(COOLDOWN_KEY);
  return stored ? parseInt(stored, 10) : null;
}

function isInCooldown(): boolean {
  const expiry = getCooldownExpiry();
  if (!expiry) return false;
  return Date.now() < expiry;
}

function setCooldown() {
  const expiry = Date.now() + COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
  localStorage.setItem(COOLDOWN_KEY, String(expiry));
}

function getToolTypeFromPath(pathname: string): string | null {
  if (pathname.includes('humanizador')) return 'humanizador';
  if (pathname.includes('parafraseador')) return 'parafraseador';
  if (pathname === '/' || pathname.includes('detector')) return 'detector';
  return null;
}

export default function PassiveFeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hidden, setHidden] = useState(() => isInCooldown());

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!feedbackText.trim() && rating === null) return;
    setIsSubmitting(true);

    try {
      const pathname = window.location.pathname;
      await fetch('/api/surveys/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          surveyType: 'passive_feedback',
          questionKey: 'que_falta_o_mejorarias',
          responseText: feedbackText.trim() || undefined,
          rating: rating ?? undefined,
          anonymousId: getAnonymousId(),
          toolType: getToolTypeFromPath(pathname),
          pageUrl: pathname,
          context: {
            referrer: document.referrer || null,
          },
        }),
      });

      setSubmitted(true);
      setCooldown();
      setTimeout(() => {
        setIsOpen(false);
        setHidden(true);
      }, 2500);
    } catch (err) {
      console.error('[PassiveFeedbackWidget] Submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  }, [feedbackText, rating]);

  if (hidden) return null;

  return (
    <>
      {/* Botón flotante */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 bg-white border border-slate-200 text-slate-600 text-xs font-medium px-3 py-2 rounded-full shadow-md hover:shadow-lg hover:border-slate-300 hover:text-slate-800 transition-all flex items-center gap-1.5"
          aria-label="Dar feedback"
        >
          <span className="text-base leading-none">💬</span>
          <span>¿Falta algo?</span>
        </button>
      )}

      {/* Panel de feedback */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 bg-white border border-slate-200 rounded-2xl shadow-xl w-72 p-4 animate-fade-in">
          {submitted ? (
            <div className="text-center py-4">
              <div className="text-3xl mb-2">🙌</div>
              <p className="text-sm font-semibold text-slate-800">¡Gracias!</p>
              <p className="text-xs text-slate-500 mt-1">Tu feedback nos ayuda a mejorar.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-slate-800">¿Qué falta o qué mejorarías?</p>
                <button
                  onClick={handleClose}
                  className="text-slate-400 hover:text-slate-600 transition-colors ml-2 flex-shrink-0"
                  aria-label="Cerrar"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-xl transition-transform hover:scale-110 ${
                      rating !== null && star <= rating ? 'opacity-100' : 'opacity-30'
                    }`}
                    aria-label={`${star} estrella${star > 1 ? 's' : ''}`}
                  >
                    ⭐
                  </button>
                ))}
                {rating !== null && (
                  <span className="text-xs text-slate-400 ml-1">
                    {rating <= 2 ? 'Mejorable' : rating === 3 ? 'Regular' : rating === 4 ? 'Bueno' : 'Excelente'}
                  </span>
                )}
              </div>

              {/* Textarea */}
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Cuéntanos qué te faltó o qué mejorarías..."
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 placeholder:text-slate-400"
                rows={3}
                maxLength={500}
              />

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || (!feedbackText.trim() && rating === null)}
                className="mt-2 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-medium py-2 rounded-lg transition-colors"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
