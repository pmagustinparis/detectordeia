'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getAnonymousId } from '@/lib/analytics/trackEvent';

type ToolType = 'detector' | 'humanizador' | 'parafraseador';

interface ExitIntentSurveyProps {
  userPlan: string;
  hasCompletedAction: boolean;
  toolType: ToolType;
}

// Pool de preguntas — rota cada día para evitar fatiga
const QUESTIONS = [
  {
    key: 'que_te_falto',
    text: '¿Qué te faltó hoy?',
    type: 'text' as const,
    placeholder: 'Contanos qué necesitabas y no encontraste...',
  },
  {
    key: 'por_que_no_registraste',
    text: '¿Por qué no te registraste?',
    type: 'options' as const,
    options: [
      'No lo necesito ahora',
      'No confío en el sitio aún',
      'No quiero crear otra cuenta',
      'Ya tengo otra herramienta',
      'Otro motivo',
    ],
  },
  {
    key: 'que_mejorarias',
    text: '¿Qué mejorarías del sitio?',
    type: 'text' as const,
    placeholder: 'Cualquier cosa que hayas notado...',
  },
  {
    key: 'como_fue_experiencia',
    text: '¿Cómo fue tu experiencia hoy?',
    type: 'rating' as const,
  },
] as const;

const SESSION_SHOWN_KEY = 'exit_survey_shown_session';
const DAILY_SHOWN_KEY = 'exit_survey_shown_date';

function getTodayQuestion() {
  const dayIndex = Math.floor(Date.now() / 86400000) % QUESTIONS.length;
  return QUESTIONS[dayIndex];
}

function wasShownToday(): boolean {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem(DAILY_SHOWN_KEY);
  if (!stored) return false;
  const storedDate = new Date(stored).toDateString();
  return storedDate === new Date().toDateString();
}

function markShownToday() {
  localStorage.setItem(DAILY_SHOWN_KEY, new Date().toISOString());
}

export default function ExitIntentSurvey({ userPlan, hasCompletedAction, toolType }: ExitIntentSurveyProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [question] = useState(getTodayQuestion);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textValue, setTextValue] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timeOnPageRef = useRef(Date.now());
  const triggeredRef = useRef(false);

  const shouldShow = useCallback(() => {
    // No mostrar a usuarios premium
    if (userPlan === 'premium') return false;
    // Ya mostrado hoy
    if (wasShownToday()) return false;
    // Ya mostrado en esta sesión
    if (sessionStorage.getItem(SESSION_SHOWN_KEY)) return false;
    return true;
  }, [userPlan]);

  const triggerSurvey = useCallback(() => {
    if (triggeredRef.current) return;
    if (!shouldShow()) return;
    triggeredRef.current = true;
    setIsVisible(true);
    markShownToday();
    sessionStorage.setItem(SESSION_SHOWN_KEY, '1');
  }, [shouldShow]);

  useEffect(() => {
    if (!shouldShow()) return;

    // Trigger 1: Mouse sale por arriba (desktop)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10) {
        triggerSurvey();
      }
    };

    // Trigger 2: Tab/ventana pierde foco (mobile + desktop)
    const handleVisibilityChange = () => {
      if (document.hidden && hasCompletedAction) {
        triggerSurvey();
      }
    };

    // Trigger 3: 60 segundos en página + acción completada
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (hasCompletedAction) {
      timer = setTimeout(() => {
        triggerSurvey();
      }, 60000);
    }

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (timer) clearTimeout(timer);
    };
  }, [shouldShow, triggerSurvey, hasCompletedAction]);

  const handleSubmit = useCallback(async () => {
    const hasResponse = selectedOption || textValue.trim() || rating !== null;
    if (!hasResponse) return;
    setIsSubmitting(true);

    try {
      const timeOnPage = Math.floor((Date.now() - timeOnPageRef.current) / 1000);
      await fetch('/api/surveys/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          surveyType: 'exit_intent',
          questionKey: question.key,
          responseText: textValue.trim() || undefined,
          responseOption: selectedOption || undefined,
          rating: rating ?? undefined,
          anonymousId: getAnonymousId(),
          toolType,
          pageUrl: window.location.pathname,
          context: {
            time_on_page_seconds: timeOnPage,
            has_completed_action: hasCompletedAction,
            user_plan: userPlan,
          },
        }),
      });

      setSubmitted(true);
      setTimeout(() => setIsVisible(false), 2500);
    } catch (err) {
      console.error('[ExitIntentSurvey] Submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedOption, textValue, rating, question.key, toolType, hasCompletedAction, userPlan]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-5 relative">
        {/* Cerrar */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Cerrar"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-3">🙌</div>
            <p className="font-semibold text-slate-800">¡Gracias por el feedback!</p>
            <p className="text-sm text-slate-500 mt-1">Nos ayuda a mejorar cada día.</p>
          </div>
        ) : (
          <>
            <p className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-1">Una pregunta rápida</p>
            <p className="text-base font-semibold text-slate-800 mb-4">{question.text}</p>

            {/* Tipo: opciones */}
            {question.type === 'options' && (
              <div className="flex flex-col gap-2">
                {question.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedOption(opt)}
                    className={`text-left text-sm px-3 py-2.5 rounded-lg border transition-all ${
                      selectedOption === opt
                        ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Tipo: texto libre */}
            {question.type === 'text' && (
              <textarea
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                placeholder={question.placeholder}
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 placeholder:text-slate-400"
                rows={4}
                maxLength={600}
              />
            )}

            {/* Tipo: rating */}
            {question.type === 'rating' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-3xl transition-all hover:scale-110 ${
                        rating !== null && star <= rating ? 'opacity-100' : 'opacity-25'
                      }`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
                {rating !== null && (
                  <p className="text-xs text-center text-slate-500">
                    {rating === 1 ? 'Muy mala' : rating === 2 ? 'Mala' : rating === 3 ? 'Regular' : rating === 4 ? 'Buena' : 'Excelente'}
                  </p>
                )}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={
                isSubmitting ||
                (question.type === 'options' && !selectedOption) ||
                (question.type === 'text' && !textValue.trim()) ||
                (question.type === 'rating' && rating === null)
              }
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar respuesta'}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="mt-2 w-full text-xs text-slate-400 hover:text-slate-600 py-1 transition-colors"
            >
              Ahora no
            </button>
          </>
        )}
      </div>
    </div>
  );
}
