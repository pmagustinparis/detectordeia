'use client';

import { useState, useEffect, useCallback } from 'react';
import { getAnonymousId } from '@/lib/analytics/trackEvent';

type ToolType = 'detector' | 'humanizador' | 'parafraseador';

interface PostUseMicroSurveyProps {
  toolType: ToolType;
  userPlan: string;
  onDismiss?: () => void;
}

const SESSION_KEY_PREFIX = 'post_use_survey_shown_';

const FOLLOW_UP_QUESTIONS: Record<string, string> = {
  low: '¿Qué salió mal?',
  mid: '¿Qué podría mejorar?',
  high: '¿Qué fue lo mejor?',
};

function getRatingBucket(r: number): 'low' | 'mid' | 'high' {
  if (r <= 2) return 'low';
  if (r === 3) return 'mid';
  return 'high';
}

export default function PostUseMicroSurvey({ toolType, userPlan, onDismiss }: PostUseMicroSurveyProps) {
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [followUpText, setFollowUpText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Aparece 2s después de montarse — usuario ya leyó el resultado
  useEffect(() => {
    const sessionKey = `${SESSION_KEY_PREFIX}${toolType}`;
    if (sessionStorage.getItem(sessionKey)) return;

    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, [toolType]);

  const handleDismiss = useCallback(() => {
    const sessionKey = `${SESSION_KEY_PREFIX}${toolType}`;
    sessionStorage.setItem(sessionKey, '1');
    setVisible(false);
    onDismiss?.();
  }, [toolType, onDismiss]);

  const handleRatingSelect = useCallback((star: number) => {
    setRating(star);
    setFollowUpText('');
  }, []);

  const handleSubmit = useCallback(async () => {
    if (rating === null) return;
    setIsSubmitting(true);

    try {
      const bucket = getRatingBucket(rating);
      await fetch('/api/surveys/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          surveyType: 'post_use',
          questionKey: `experience_${toolType}`,
          rating,
          responseText: followUpText.trim() || undefined,
          anonymousId: getAnonymousId(),
          toolType,
          pageUrl: window.location.pathname,
          context: {
            rating_bucket: bucket,
            user_plan: userPlan,
          },
        }),
      });

      setSubmitted(true);
      const sessionKey = `${SESSION_KEY_PREFIX}${toolType}`;
      sessionStorage.setItem(sessionKey, '1');
      setTimeout(() => {
        setVisible(false);
        onDismiss?.();
      }, 2200);
    } catch (err) {
      console.error('[PostUseMicroSurvey] Submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  }, [rating, followUpText, toolType, userPlan, onDismiss]);

  // Auto-dismiss after 20s si no hubo interacción
  useEffect(() => {
    if (!visible || rating !== null) return;
    const timer = setTimeout(() => handleDismiss(), 20000);
    return () => clearTimeout(timer);
  }, [visible, rating, handleDismiss]);

  if (!visible) return null;

  const bucket = rating !== null ? getRatingBucket(rating) : null;
  const followUpQuestion = bucket ? FOLLOW_UP_QUESTIONS[bucket] : null;

  return (
    <div
      className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-72 z-40 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 animate-fade-in"
      role="dialog"
      aria-label="Valorar experiencia"
    >
      {submitted ? (
        <div className="text-center py-3">
          <div className="text-3xl mb-1">🙌</div>
          <p className="text-sm font-semibold text-slate-800">¡Gracias!</p>
          <p className="text-xs text-slate-500 mt-0.5">Tu opinión mejora la herramienta.</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-slate-800">¿Cómo fue el resultado?</p>
            <button
              onClick={handleDismiss}
              className="text-slate-400 hover:text-slate-600 transition-colors ml-2 flex-shrink-0"
              aria-label="Cerrar"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Estrellas */}
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingSelect(star)}
                className={`text-2xl transition-all hover:scale-110 active:scale-95 ${
                  rating !== null && star <= rating ? 'opacity-100' : 'opacity-25 hover:opacity-60'
                }`}
                aria-label={`${star} estrella${star > 1 ? 's' : ''}`}
              >
                ⭐
              </button>
            ))}
          </div>

          {/* Follow-up contextual */}
          {rating !== null && (
            <div className="animate-fade-in">
              <p className="text-xs text-slate-500 mb-1.5">{followUpQuestion}</p>
              <textarea
                value={followUpText}
                onChange={(e) => setFollowUpText(e.target.value)}
                placeholder="Opcional — podés dejarlo en blanco"
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 placeholder:text-slate-400"
                rows={2}
                maxLength={400}
                autoFocus
              />
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="mt-2 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 text-white text-sm font-medium py-2 rounded-lg transition-colors"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
