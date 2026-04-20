'use client';

import { useState, useEffect } from 'react';
import { ProductIcons, Icon } from '@/lib/icons';
import EmailCaptureModal from './EmailCaptureModal';
import UsageLimitOverlay from './UsageLimitOverlay';
import FileUploadButton from './FileUploadButton';
import FileUploadUpsellModal from './FileUploadUpsellModal';
import LoadingSteps from './LoadingSteps';
import { useAuth } from '@/lib/hooks/useAuth';
import { getAnonymousId } from '@/lib/tracking/anonymousId';
import { HUMANIZER_MODES, type HumanizerMode } from '@/lib/prompts/humanizer';
import { extractTextFromFile } from '@/lib/fileParser';
import { trackEvent } from '@/lib/analytics/client';
import type { UserStatus } from '@/lib/types/user-status';
import ExpressPromoBanner from './ExpressPromoBanner';
import ExpressUnlockModal from './ExpressUnlockModal';
import ExpressPremiumComparisonCard from './ExpressPremiumComparisonCard';
import ExitIntentSurvey from './surveys/ExitIntentSurvey';
import PostUseMicroSurvey from './surveys/PostUseMicroSurvey';

// Límites de caracteres según tipo de usuario
const CHARACTER_LIMITS = {
  anonymous: 400,  // Anónimos: 400 caracteres
  free: 600,  // Free: 600 caracteres
  premium: 100000,  // Premium: ILIMITADO (100k técnicamente)
};
const MIN_CHARACTERS = 50;

export default function HumanizadorMain({
  initialUserStatus,
  h1 = 'Humanizador de IA en Español',
  subtitle = 'Transforma texto generado por IA en contenido natural y humano',
}: {
  initialUserStatus?: UserStatus;
  h1?: string;
  subtitle?: string;
} = {}) {
  const [text, setText] = useState('');
  const [isHumanizing, setIsHumanizing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLimitExceeded, setIsLimitExceeded] = useState(false);
  const [analyzedTextLength, setAnalyzedTextLength] = useState(0);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailModalSource, setEmailModalSource] = useState('');
  const [usageCount, setUsageCount] = useState(0);
  const [selectedMode, setSelectedMode] = useState<HumanizerMode>('standard');
  const [isPremiumModeModalOpen, setIsPremiumModeModalOpen] = useState(false);
  const [lockedModeName, setLockedModeName] = useState<string>('');

  // Consolidated user status (replaces userPlan, expressExpiresAt, isExpressActive)
  const [userStatus, setUserStatus] = useState<UserStatus>(
    initialUserStatus ?? {
      isAuthenticated: false,
      user: null,
      plan_type: 'free',
      express: { expires_at: null, is_active: false, time_remaining_ms: null },
    }
  );

  // If initialUserStatus was provided server-side, no need to show loading skeleton
  const [isLoadingUserStatus, setIsLoadingUserStatus] = useState(!initialUserStatus);

  // Prefill desde el detector (flujo detector → humanizador)
  useEffect(() => {
    const prefill = localStorage.getItem('humanizer_prefill_text');
    if (prefill) {
      setText(prefill);
      localStorage.removeItem('humanizer_prefill_text');
    }
  }, []);

  // Validation state (Fase 3: Validación post-humanización)
  const [originalScore, setOriginalScore] = useState<number | null>(null);
  const [humanizedScore, setHumanizedScore] = useState<number | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Límite de caracteres dinámico basado en autenticación y plan
  const CHARACTER_LIMIT = !userStatus.isAuthenticated
    ? CHARACTER_LIMITS.anonymous
    : userStatus.plan_type === 'premium' || userStatus.express.is_active
      ? CHARACTER_LIMITS.premium
      : CHARACTER_LIMITS.free;

  // Rate limit overlay state
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState<{
    userType: 'anonymous' | 'free' | 'premium';
    limit: number;
    resetAt: Date;
  } | null>(null);

  // Rate limit status (para mostrar usos restantes)
  const [rateLimitStatus, setRateLimitStatus] = useState<{
    remaining: number;
    limit: number;
    usedToday: number;
  } | null>(null);

  // File upload upsell modal state (para drag & drop)
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);

  // Track usage count for anonymous users
  useEffect(() => {
    if (!userStatus.isAuthenticated) {
      const count = parseInt(localStorage.getItem('humanizador_usage_count') || '0');
      setUsageCount(count);
    }
  }, [userStatus.isAuthenticated]);

  // Fetch rate limit status on mount and when auth changes
  useEffect(() => {
    async function fetchRateLimitStatus() {
      try {
        const anonymousId = !userStatus.isAuthenticated ? getAnonymousId() : undefined;
        const response = await fetch('/api/rate-limit-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            anonymousId,
            toolType: 'humanizador',
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setRateLimitStatus({
            remaining: data.remaining,
            limit: data.limit,
            usedToday: data.usedToday,
          });
        }
      } catch (error) {
        console.error('Error fetching rate limit status:', error);
      }
    }

    fetchRateLimitStatus();
  }, [userStatus.isAuthenticated]);

  // Fetch consolidated user status (auth + plan + express) in a single request
  // This eliminates cascading fetches and prevents UI flickering
  useEffect(() => {
    async function fetchUserStatus() {
      try {
        const response = await fetch('/api/user/status');
        if (response.ok) {
          const data = await response.json();
          setUserStatus(data);
        }
      } catch {
        // Keep default free state on error
      } finally {
        setIsLoadingUserStatus(false);
      }
    }
    // If initial status was provided server-side, skip the fetch entirely
    if (!initialUserStatus) {
      fetchUserStatus();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Colores del contador dinámico
  const getCounterColor = () => {
    if (text.length > CHARACTER_LIMIT) return 'text-red-600';
    if (text.length > CHARACTER_LIMIT * 0.9) return 'text-yellow-600';
    return 'text-gray-500';
  };

  // Validar si el botón debe estar habilitado (solo mínimo, no máximo)
  const isButtonEnabled = () => {
    return text.length >= MIN_CHARACTERS;
  };

  const handleHumanize = async () => {
    // Validación mínima
    if (text.length < MIN_CHARACTERS) {
      setError(`El texto debe tener al menos ${MIN_CHARACTERS} caracteres`);
      return;
    }

    const exceededLimit = text.length > CHARACTER_LIMIT;

    setIsHumanizing(true);
    setLoadingStep(1); // Step 1: Análisis
    setError(null);

    try {
      if (exceededLimit) {
        // Progresión de steps durante análisis simulado
        setTimeout(() => setLoadingStep(2), 500);
        setTimeout(() => setLoadingStep(3), 1000);

        // Mostrar resultado simulado cuando se excede el límite
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simular delay
        setResult("Este es un ejemplo de texto humanizado. Actualiza a Premium para procesar textos ilimitados y acceder a todos los modos de humanización.");
        setAnalyzedTextLength(text.length);
        setIsLimitExceeded(true);

        // Track límite de caracteres excedido
        trackEvent({
          eventType: 'hit_character_limit',
          toolType: 'humanizador',
          metadata: {
            limit_type: 'characters',
            text_length: text.length,
            character_limit: CHARACTER_LIMIT,
            exceeded_by: text.length - CHARACTER_LIMIT,
            plan: userStatus.plan_type,
            is_authenticated: userStatus.isAuthenticated,
            hour_of_day: new Date().getHours(),
            day_of_week: new Date().getDay(),
          }
        });
      } else {
        // Obtener anonymousId para usuarios no autenticados
        const anonymousId = !userStatus.isAuthenticated ? getAnonymousId() : undefined;

        // Step 2: Humanización (after 1 second)
        setTimeout(() => setLoadingStep(2), 1000);

        // Llamada a API de humanización
        const response = await fetch('/api/humanize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: text,
            mode: selectedMode,
            anonymousId,
          }),
        });

        // Step 3: Validación (when API responds)
        setLoadingStep(3);

        const data = await response.json();

        // 🚨 RATE LIMIT REACHED (429)
        if (response.status === 429) {
          setRateLimitInfo({
            userType: data.userType || 'anonymous',
            limit: data.limit || 10,
            resetAt: new Date(data.resetAt),
          });
          setIsLimitReached(true);

          // Track límite diario alcanzado
          trackEvent({
            eventType: 'hit_daily_limit',
            toolType: 'humanizador',
            metadata: {
              limit_type: 'daily_uses',
              user_type: data.userType || 'anonymous',
              limit: data.limit || 10,
              plan: userStatus.plan_type,
              is_authenticated: userStatus.isAuthenticated,
              hour_of_day: new Date().getHours(),
              day_of_week: new Date().getDay(), // 0=domingo, 1=lunes, etc
              usage_count: userStatus.isAuthenticated ? undefined : usageCount,
            }
          });

          return;
        }

        // <Icon icon={ProductIcons.Locked} size="sm" className="inline" /> MODO PREMIUM REQUERIDO (403)
        if (response.status === 403 && data.requiresPremium) {
          setError(data.message || 'Este modo requiere Plan Premium');

          // Track modo premium bloqueado
          trackEvent({
            eventType: 'premium_mode_blocked',
            toolType: 'humanizador',
            metadata: {
              mode: selectedMode,
              plan: userStatus.plan_type,
              is_authenticated: userStatus.isAuthenticated,
              hour_of_day: new Date().getHours(),
              day_of_week: new Date().getDay(),
              usage_count: userStatus.isAuthenticated ? undefined : usageCount,
            }
          });

          return;
        }

        if (!response.ok) {
          throw new Error(data.error || 'Error al humanizar el texto');
        }

        // Mostrar resultado humanizado
        setResult(data.humanizedText);
        setAnalyzedTextLength(text.length);
        setIsLimitExceeded(false);

        // Actualizar rate limit status con la info de la respuesta
        if (data.rateLimit) {
          setRateLimitStatus({
            remaining: data.rateLimit.remaining,
            limit: data.rateLimit.limit,
            usedToday: data.rateLimit.usedToday ?? (data.rateLimit.limit - data.rateLimit.remaining),
          });
        }

        // Incrementar contador de uso para usuarios anónimos
        if (!userStatus.isAuthenticated) {
          const newCount = usageCount + 1;
          setUsageCount(newCount);
          localStorage.setItem('humanizador_usage_count', newCount.toString());
        }

        // Track humanización exitosa
        trackEvent({
          eventType: 'completed_humanization',
          toolType: 'humanizador',
          metadata: {
            text_length: text.length,
            mode: selectedMode,
            plan: userStatus.plan_type,
            is_authenticated: userStatus.isAuthenticated,
            exceeded_limit: false,
            hour_of_day: new Date().getHours(),
            day_of_week: new Date().getDay(),
            usage_count: userStatus.isAuthenticated ? undefined : usageCount + 1, // Para anónimos, su uso #N
          }
        });

        // Validación automática del texto humanizado (Fase 3)
        // Solo validar si es un análisis real (no límite excedido)
        validateHumanizedText(text, data.humanizedText);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al humanizar el texto');
    } finally {
      setIsHumanizing(false);
      setLoadingStep(0);
    }
  };

  const handleClear = () => {
    setText('');
    setResult(null);
    setError(null);
    setIsLimitExceeded(false);
    setAnalyzedTextLength(0);
    // Limpiar validación
    setOriginalScore(null);
    setHumanizedScore(null);
    setValidationError(null);
  };

  // Función de validación automática (Fase 3) - OPTIMIZADA CON PARALELO
  const validateHumanizedText = async (originalText: string, humanizedText: string) => {
    setIsValidating(true);
    setValidationError(null);

    try {
      // Ejecutar ambas validaciones EN PARALELO para reducir tiempo a la mitad
      const [originalResponse, humanizedResponse] = await Promise.all([
        fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: originalText, textType: 'default' }),
        }),
        fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: humanizedText, textType: 'default' }),
        }),
      ]);

      if (!originalResponse.ok) {
        throw new Error('Error al validar texto original');
      }

      if (!humanizedResponse.ok) {
        throw new Error('Error al validar texto humanizado');
      }

      // Parsear ambas respuestas en paralelo
      const [originalData, humanizedData] = await Promise.all([
        originalResponse.json(),
        humanizedResponse.json(),
      ]);

      setOriginalScore(originalData.probability);
      setHumanizedScore(humanizedData.probability);

      // Track validación exitosa
      trackEvent({
        eventType: 'validation_completed',
        toolType: 'humanizador',
        metadata: {
          original_score: originalData.probability,
          humanized_score: humanizedData.probability,
          improvement: originalData.probability - humanizedData.probability,
          mode: selectedMode,
          passed_detector: humanizedData.probability < 30,
          plan: userStatus.plan_type,
          is_authenticated: userStatus.isAuthenticated,
        }
      });

    } catch (err) {
      console.error('Error en validación:', err);
      setValidationError('No se pudo validar el texto humanizado');
    } finally {
      setIsValidating(false);
    }
  };

  const handleCopy = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result);
        trackEvent({ eventType: 'copied_result', metadata: { tool: 'humanizador' } });
        // Cambiar temporalmente el texto del botón para dar feedback
        const button = document.getElementById('copy-button');
        if (button) {
          const originalText = button.innerHTML;
          button.innerHTML = '<span>✅</span> ¡Copiado!';
          setTimeout(() => {
            button.innerHTML = originalText;
          }, 2000);
        }
      } catch (err) {
        console.error('Error al copiar:', err);
        setError('No se pudo copiar el texto');
      }
    }
  };

  const handleFileTextExtracted = (extractedText: string, wasTruncated: boolean) => {
    setText(extractedText);
    setResult(null);
    setIsLimitExceeded(false);
    setAnalyzedTextLength(0);

    if (wasTruncated) {
      setError(`✂️ Archivo procesado. Se mostraron los primeros ${CHARACTER_LIMIT.toLocaleString()} caracteres.`);
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');

    if (userStatus.plan_type !== 'premium' && !userStatus.express.is_active) {
      // Track intento de subir archivo bloqueado
      trackEvent({
        eventType: 'file_upload_blocked',
        toolType: 'humanizador',
        metadata: {
          plan: userStatus.plan_type,
          is_authenticated: userStatus.isAuthenticated,
          hour_of_day: new Date().getHours(),
          day_of_week: new Date().getDay(),
        }
      });

      setShowFileUploadModal(true);
      return;
    }

    const file = e.dataTransfer.files[0];
    if (!file) return;

    try {
      const result = await extractTextFromFile(file, CHARACTER_LIMIT);
      handleFileTextExtracted(result.text, result.wasTruncated);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al procesar el archivo';
      setError(errorMessage);
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleDownload = () => {
    if (result) {
      const blob = new Blob([result], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'texto-humanizado.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const openEmailModal = (source: string) => {
    setEmailModalSource(source);
    setIsEmailModalOpen(true);
  };

  // Show minimal loading skeleton while fetching user status - prevents flickering
  if (isLoadingUserStatus) {
    return (
      <div className="max-w-5xl w-full flex flex-col md:flex-row gap-6 md:gap-8 items-stretch justify-center">
        {/* Loading skeleton */}
        <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 p-6 min-w-[320px]" style={{minHeight: '560px'}}>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 p-6 min-w-[320px]" style={{minHeight: '560px'}}>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 leading-tight text-blue-900">
        {h1}
      </h1>
      <p className="text-base md:text-lg text-gray-600 text-center mb-6 max-w-2xl animate-fade-in" style={{animationDelay: '0.2s'}}>
        {subtitle}
      </p>
      <ExpressPromoBanner />
      <div className="max-w-5xl w-full flex flex-col md:flex-row gap-6 md:gap-8 items-stretch justify-center animate-scale-in" style={{animationDelay: '0.3s'}}>

      {/* COLUMNA IZQUIERDA - INPUT */}
      <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 p-6 flex flex-col justify-between min-w-[320px] card-elevated" style={{minHeight: '560px'}}>

        {/* Trust indicators (badges superiores) */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {!userStatus.isAuthenticated ? (
            <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 font-semibold rounded-full px-3 py-1.5 text-xs">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Sin registro
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-red-100 text-red-900 font-semibold rounded-full px-3 py-1.5 text-xs">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Cuenta activa
            </span>
          )}
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 font-semibold rounded-full px-3 py-1.5 text-xs">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            100% privado
          </span>
          <span className="inline-flex items-center gap-1 bg-red-100 text-red-900 font-semibold rounded-full px-3 py-1.5 text-xs">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
            </svg>
            En español
          </span>
        </div>

        <label htmlFor="humanizador-textarea" className="block text-base font-semibold text-gray-800 mb-2">
          Pega tu texto para humanizar
        </label>

        {/* File Upload Button */}
        <FileUploadButton
          onTextExtracted={handleFileTextExtracted}
          maxChars={CHARACTER_LIMIT}
          disabled={isHumanizing}
          userPlan={userStatus.plan_type}
          isExpressActive={userStatus.express?.is_active}
          toolName="Humanizador"
          className="mb-3"
        />

        <div className="flex flex-col" style={{flexGrow: 1}}>
          <textarea
            id="humanizador-textarea"
            className="w-full border-2 border-gray-300 rounded-2xl shadow-inner focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 p-4 text-base text-gray-800 placeholder-gray-400 transition-all outline-none resize-none mb-1 hover:border-gray-400 leading-relaxed"
            style={{minHeight: '220px', flexGrow: 1}}
            placeholder="Pega aquí tu texto generado por ChatGPT, Claude, Gemini u otra IA..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              // Limpiar resultado cuando el usuario edita el texto
              if (result) {
                setResult(null);
                setError(null);
                setIsLimitExceeded(false);
                setAnalyzedTextLength(0);
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              if (userStatus.plan_type === 'premium' || userStatus.express.is_active) {
                e.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
              }
            }}
            onDragLeave={(e) => {
              e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
            }}
            onDrop={handleDrop}
            aria-label="Texto a humanizar"
          />
        </div>

        {/* Contador de caracteres, usos restantes y botón limpiar */}
        <div className="flex justify-between items-center text-sm text-gray-600 mt-0 mb-2 gap-2">
          <div className="flex items-center gap-3">
            <span className={getCounterColor() + ' font-medium'}>
              {text.length}/{CHARACTER_LIMIT}
            </span>
            {/* Badge de usos restantes - Solo para Free sin Express */}
            {rateLimitStatus && userStatus.plan_type !== 'premium' && !userStatus.express.is_active && (
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                rateLimitStatus.remaining === 0
                  ? 'bg-red-100 text-red-700'
                  : rateLimitStatus.remaining <= 1
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-blue-100 text-blue-900'
              }`}>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {userStatus.isAuthenticated
                  ? `${rateLimitStatus.usedToday || 0}/${rateLimitStatus.limit || 0} usados hoy`
                  : `${rateLimitStatus.usedToday || 0}/${rateLimitStatus.limit || 0} invitado • Registrate: 3/día`
                }
              </span>
            )}
            {/* Badge ilimitado para Express */}
            {userStatus.express.is_active && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900">
                <span>⚡</span>
                Express Activo - Ilimitado
              </span>
            )}
            {/* Badge ilimitado para PRO */}
            {userStatus.plan_type === 'premium' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Pro - Usos ilimitados
              </span>
            )}
          </div>
          <button
            onClick={handleClear}
            className="text-blue-900 font-semibold ml-2 hover:text-blue-900 hover:underline transition-all disabled:opacity-40"
            type="button"
            disabled={text.length === 0 && !result}
            aria-label="Limpiar texto"
          >
            Limpiar
          </button>
        </div>

        {/* SELECTOR DE MODO - 5 Modos Dinámicos */}
        <div className="mb-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Modo de humanización</label>
          <div className="space-y-2">
            {Object.entries(HUMANIZER_MODES).map(([key, mode]) => {
              const modeKey = key as HumanizerMode;
              const isLocked = mode.isPremium && userStatus.plan_type !== 'premium' && !userStatus.express.is_active;
              const isSelected = selectedMode === modeKey;

              return (
                <div key={modeKey} className="relative group">
                  <label
                    className={`flex items-center p-2.5 border-2 rounded-xl transition-all ${
                      isLocked
                        ? 'border-amber-200 bg-amber-50/50 cursor-pointer hover:border-amber-400 hover:bg-amber-50'
                        : isSelected
                        ? 'border-slate-800 bg-slate-50 cursor-pointer'
                        : 'border-gray-300 bg-white hover:border-gray-400 cursor-pointer'
                    }`}
                    onClick={isLocked ? () => { setLockedModeName(mode.name); setIsPremiumModeModalOpen(true); } : undefined}
                  >
                    <input
                      type="radio"
                      name="mode"
                      value={modeKey}
                      checked={isSelected}
                      disabled={isLocked}
                      onChange={() => !isLocked && setSelectedMode(modeKey)}
                      className={`w-4 h-4 ${isLocked ? 'text-amber-400' : 'text-blue-900 focus:ring-blue-500'}`}
                    />
                    <div className="ml-2 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-gray-800">
                          {mode.icon} {mode.name}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            mode.isPremium
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {mode.isPremium ? 'PREMIUM' : 'FREE'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{mode.description}</p>
                    </div>
                  </label>

                  {/* Tooltip para modos bloqueados */}
                  {isLocked && (
                    <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 text-white text-xs rounded-xl p-4 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 border border-slate-700">
                      <p className="font-bold text-sm mb-2">🔒 Modo {mode.name}</p>
                      <p className="text-slate-300 mb-3 leading-relaxed">
                        Disponible con Express Pass o Premium. Mejor calidad para textos académicos y formales.
                      </p>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between bg-amber-500/20 rounded-lg px-2.5 py-1.5">
                          <span className="text-amber-300 font-semibold">⚡ Express 24h</span>
                          <span className="font-bold text-amber-200">$3.99</span>
                        </div>
                        <div className="flex items-center justify-between bg-amber-500/10 rounded-lg px-2.5 py-1.5">
                          <span className="text-amber-300 font-semibold">⚡ Express 7 días</span>
                          <span className="font-bold text-amber-200">$8.99</span>
                        </div>
                        <div className="flex items-center justify-between bg-violet-500/20 rounded-lg px-2.5 py-1.5">
                          <span className="text-violet-300 font-semibold">🚀 Premium</span>
                          <span className="font-bold text-violet-200">$12.99/mes</span>
                        </div>
                      </div>
                      <a href="/pricing" className="block text-center text-slate-400 hover:text-white mt-2 underline text-xs">
                        Ver planes →
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="mt-1 mb-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium">
            {error}
          </div>
        )}

        {/* BOTÓN PRINCIPAL */}
        <button
          onClick={handleHumanize}
          disabled={isHumanizing || !isButtonEnabled()}
          className={`mt-2 w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${isHumanizing ? 'animate-pulse-glow' : ''}`}
          aria-label="Humanizar texto"
        >
          {isHumanizing ? 'Humanizando...' : 'Humanizar Texto'}
        </button>

        {/* DISCLAIMER */}
        <p className="text-center text-sm text-gray-600 mt-2 font-medium">
          Sin registro. 100% privado. No almacenamos tu texto.
        </p>
      </div>

      {/* COLUMNA DERECHA - OUTPUT */}
      <div className="flex-1 flex flex-col gap-4 min-w-[320px]">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 p-6 flex flex-col justify-between relative card-elevated" style={{minHeight: '560px'}}>

          {/* Header con icono */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
              <span className="text-white text-lg"><Icon icon={ProductIcons.Humanizer} size="sm" className="inline" /></span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-800 text-base">Texto humanizado</span>
              <span className="text-xs text-gray-500">El resultado aparecerá aquí</span>
            </div>
          </div>

          {result ? (
            <div className="relative" style={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
              <div className={isLimitExceeded ? "filter blur-sm" : ""} style={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
                {/* Área de resultado mejorada */}
                <div className="w-full border-2 border-emerald-300 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-5 text-base text-gray-800 mb-4 whitespace-pre-wrap leading-relaxed overflow-y-auto shadow-sm animate-fade-in" style={{minHeight: '280px', maxHeight: '320px'}}>
                  {result}
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3 mb-3">
                  <button
                    id="copy-button"
                    onClick={handleCopy}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>📋</span>
                    Copiar todo
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>⬇️</span>
                    Descargar .txt
                  </button>
                </div>

                {/* VALIDACIÓN AUTOMÁTICA - Resultados con datos reales del detector (Fase 3) */}
                {isValidating ? (
                  <div className="mb-4 p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                      <p className="text-base font-semibold text-green-900">Validando con el detector...</p>
                    </div>
                  </div>
                ) : validationError ? (
                  <div className="mb-4 p-5 bg-yellow-50 border-2 border-yellow-200 rounded-xl shadow-sm">
                    <p className="text-sm text-yellow-800 text-center font-medium">
                      <Icon icon={ProductIcons.Warning} size="sm" className="inline" /> {validationError}
                    </p>
                  </div>
                ) : originalScore !== null && humanizedScore !== null ? (
                  <div className="mb-5 p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl shadow-md animate-fade-in" style={{animationDelay: '0.2s'}}>
                    <div className="flex items-center gap-2 mb-4">
                      <Icon icon={ProductIcons.Detector} size="lg" className="text-green-700" />
                      <h3 className="text-base font-bold text-green-900">Validación con nuestro detector</h3>
                    </div>

                    {/* Comparación de scores REALES mejorada */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {/* ANTES */}
                      <div className="text-center bg-red-50 p-4 rounded-xl border-2 border-red-200 shadow-sm">
                        <p className="text-xs text-gray-600 mb-2 font-semibold uppercase tracking-wide">Texto Original</p>
                        <p className="text-5xl font-black text-red-600 mb-2">{originalScore}%</p>
                        <p className="text-xs text-red-700 font-bold">
                          <Icon icon={ProductIcons.AI} size="sm" className="inline text-red-600" /> Detectado como IA
                        </p>
                      </div>

                      {/* DESPUÉS */}
                      <div className={`text-center p-4 rounded-xl border-2 shadow-sm ${
                        humanizedScore < 30
                          ? 'bg-green-100 border-green-300'
                          : humanizedScore < 70
                          ? 'bg-yellow-100 border-yellow-300'
                          : 'bg-red-100 border-red-300'
                      }`}>
                        <p className="text-xs text-gray-600 mb-2 font-semibold uppercase tracking-wide">Texto Humanizado</p>
                        <p className={`text-5xl font-black mb-2 ${
                          humanizedScore < 30 ? 'text-green-600' : humanizedScore < 70 ? 'text-yellow-600' : 'text-red-600'
                        }`}>{humanizedScore}%</p>
                        <p className={`text-xs font-semibold ${
                          humanizedScore < 30 ? 'text-green-700' : humanizedScore < 70 ? 'text-yellow-700' : 'text-red-700'
                        }`}>
                          {humanizedScore < 30 ? (
                            <><Icon icon={ProductIcons.Success} size="xs" className="inline text-green-600" /> Pasa como humano</>
                          ) : humanizedScore < 70 ? (
                            <><Icon icon={ProductIcons.Warning} size="xs" className="inline text-yellow-600" /> Ambiguo</>
                          ) : (
                            <><Icon icon={ProductIcons.AI} size="xs" className="inline text-red-600" /> Aún detectado</>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Badge de resultado principal */}
                    {humanizedScore < 30 ? (
                      <div className="bg-green-600 text-white p-3 rounded-xl text-center mb-2">
                        <p className="text-sm font-bold mb-1">
                          <Icon icon={ProductIcons.Success} size="md" className="inline" /> ¡Texto humanizado exitosamente!
                        </p>
                        <p className="text-xs">
                          Mejora de <strong>{Math.abs(originalScore - humanizedScore)} puntos</strong>.
                          Tu texto ahora pasa como escrito por humano.
                        </p>
                      </div>
                    ) : humanizedScore < 70 ? (
                      <div className="bg-yellow-600 text-white p-3 rounded-xl text-center mb-2">
                        <p className="text-sm font-bold mb-1">
                          <Icon icon={ProductIcons.Warning} size="md" className="inline" /> Resultado ambiguo
                        </p>
                        <p className="text-xs">
                          Mejora de <strong>{Math.abs(originalScore - humanizedScore)} puntos</strong>.
                          {userStatus.plan_type !== 'premium' && !userStatus.express.is_active ? ' Probá un modo premium para mejores resultados.' : ' Intenta humanizar nuevamente.'}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-orange-600 text-white p-3 rounded-xl text-center mb-2">
                        <p className="text-sm font-bold mb-1">
                          <Icon icon={ProductIcons.Info} size="md" className="inline" /> Aún detectado como IA
                        </p>
                        <p className="text-xs">
                          {originalScore - humanizedScore > 0
                            ? `Mejora de ${Math.abs(originalScore - humanizedScore)} puntos, pero aún detectado. `
                            : 'No hubo mejora. '
                          }
                          {userStatus.plan_type !== 'premium' && !userStatus.express.is_active ? 'Probá un modo premium para mejores resultados.' : 'Intenta humanizar nuevamente o usa otro modo.'}
                        </p>
                      </div>
                    )}

                    <p className="text-xs text-gray-600 text-center italic">
                      <Icon icon={ProductIcons.Info} size="xs" className="inline" /> Validación automática con nuestro detector de IA
                    </p>

                    {/* Micro-prompt post-resultado insuficiente: score >= 70, usuario free */}
                    {humanizedScore !== null && humanizedScore >= 70 && userStatus.plan_type !== 'premium' && !userStatus.express.is_active && (
                      <div className="mt-3 bg-amber-50 border border-amber-300 rounded-xl p-3">
                        <p className="text-xs font-bold text-amber-900 mb-1">
                          ⚡ El modo Académico tiene mayor efectividad para textos con patrones de IA marcados
                        </p>
                        <p className="text-xs text-amber-800 mb-2">
                          Disponible ahora con Express Pass — acceso completo por 24h, sin suscripción.
                        </p>
                        <a
                          href="/pricing"
                          className="inline-block text-xs font-bold text-amber-700 border border-amber-400 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Activar Express $3.99 →
                        </a>
                      </div>
                    )}
                  </div>
                ) : null}

                {/* Comparación Express vs Premium - Solo para usuarios Free */}
                {userStatus.plan_type !== 'premium' && !userStatus.express.is_active && !isLimitExceeded && (
                  <ExpressPremiumComparisonCard
                    isAuthenticated={userStatus.isAuthenticated}
                    toolName="humanizador"
                    source="free_vs_pro_comparison"
                  />
                )}

                {/* Incentivo progresivo para registro (solo usuarios anónimos) */}
                {!userStatus.isAuthenticated && usageCount >= 2 && usageCount < 5 && (
                  <div className="p-3 bg-gradient-to-r from-violet-50 to-purple-50 border border-gray-300 rounded-xl">
                    <div className="flex items-start gap-2">
                      <span className="text-lg"><Icon icon={ProductIcons.Info} size="xs" className="inline" /></span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-amber-900 mb-1">
                          ¿Usás seguido las herramientas?
                        </p>
                        <p className="text-xs text-blue-900 mb-2">
                          Registrándote gratis podés guardar tu historial y obtener más usos diarios.
                        </p>
                        <a
                          href="/dashboard"
                          className="inline-block text-xs font-semibold text-blue-900 hover:text-blue-900 underline"
                        >
                          Crear cuenta gratis →
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {!userStatus.isAuthenticated && usageCount >= 5 && (
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl"><Icon icon={ProductIcons.Upgrade} size="sm" className="inline" /></span>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-cyan-900 mb-1">
                          ¡Ya usaste el Humanizador {usageCount} veces!
                        </p>
                        <p className="text-xs text-green-700 mb-3">
                          Registrándote gratis obtenés:<br/>
                          • Historial de tus últimos usos<br/>
                          • 3 humanizaciones diarias con la cuenta gratis<br/>
                          • Acceso a futuras features
                        </p>
                        <a
                          href="/dashboard"
                          className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold py-2 px-4 rounded-lg transition-all"
                        >
                          Crear cuenta gratis en 10 segundos
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Overlay inline cuando se excede el límite */}
              <ExpressUnlockModal
                isOpen={isLimitExceeded && userStatus.plan_type !== 'premium' && !userStatus.express.is_active}
                onClose={() => { setIsLimitExceeded(false); setResult(null); }}
                isAuthenticated={userStatus.isAuthenticated}
                trigger="character_limit"
                toolName="humanizador"
                excessChars={analyzedTextLength - CHARACTER_LIMIT}
                charLimit={CHARACTER_LIMIT}
              />
              <ExpressUnlockModal
                isOpen={isPremiumModeModalOpen}
                onClose={() => setIsPremiumModeModalOpen(false)}
                isAuthenticated={userStatus.isAuthenticated}
                trigger="premium_mode"
                toolName="humanizador"
                modeName={lockedModeName}
              />

            </div>
          ) : isHumanizing ? (
            // Show loading steps when humanizing
            <LoadingSteps
              steps={[
                { id: 1, label: 'Análisis de texto', icon: ProductIcons.Brain },
                { id: 2, label: 'Humanización', icon: ProductIcons.Humanizer },
                { id: 3, label: 'Validación automática', icon: ProductIcons.Detector }
              ]}
              currentStep={loadingStep}
              title="Humanizando tu texto..."
              estimatedTime={15}
            />
          ) : (
            <>
              {/* Estado vacío mejorado */}
              <div className="flex flex-col items-center justify-center text-center px-6 py-8" style={{flexGrow: 1}}>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6 shadow-lg animate-pulse">
                  <span className="text-white text-4xl"><Icon icon={ProductIcons.Humanizer} size="sm" className="inline" /></span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Esperando tu texto
                </h3>
                <p className="text-gray-600 text-sm mb-4 max-w-xs">
                  Pega el texto generado por IA que quieres humanizar y haz clic en el botón
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Resultado instantáneo</span>
                </div>
              </div>

              {/* Hint dinámico según plan */}
              {userStatus.express.is_active && (
                <div className="text-center text-sm bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span>⚡</span>
                    <span className="font-bold text-orange-700">
                      Express Activo - Acceso Ilimitado
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Usos y caracteres ilimitados por 24h
                  </p>
                </div>
              )}
              {!userStatus.express.is_active && userStatus.plan_type !== 'premium' && (
                <div className="text-center text-sm bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <svg className="w-5 h-5 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-bold text-blue-900">
                      {userStatus.isAuthenticated ? '3 usos diarios gratis' : '1 uso diario'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    {userStatus.isAuthenticated
                      ? 'Hasta 600 caracteres por uso'
                      : 'Hasta 400 caracteres por uso • Registrate gratis para más'}
                  </p>
                </div>
              )}
            </>
          )}

        </div>
      </div>

      {/* Modal de captura de email */}
      <EmailCaptureModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        source={emailModalSource}
      />

      {/* Usage Limit Overlay */}
      {rateLimitInfo && (
        <UsageLimitOverlay
          isOpen={isLimitReached}
          onClose={() => setIsLimitReached(false)}
          userType={rateLimitInfo.userType}
          limit={rateLimitInfo.limit}
          resetAt={rateLimitInfo.resetAt}
          toolName="Humanizador"
        />
      )}

      {/* File Upload Upsell Modal (para drag & drop) */}
      <FileUploadUpsellModal
        isOpen={showFileUploadModal}
        onClose={() => setShowFileUploadModal(false)}
        toolName="Humanizador"
      />

    </div>
    <ExitIntentSurvey
      userPlan={userStatus.plan_type}
      hasCompletedAction={result !== null}
      toolType="humanizador"
    />
    {result !== null && (
      <PostUseMicroSurvey
        toolType="humanizador"
        userPlan={userStatus.plan_type}
      />
    )}
    </>
  );
}
