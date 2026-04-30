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
import { PARAPHRASER_MODES, type ParaphraserMode } from '@/lib/prompts/paraphraser';
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
  free: 2000,  // Free: 2,000 caracteres
  premium: 100000,  // Premium: ILIMITADO (100k técnicamente)
};
const MIN_CHARACTERS = 50;

export default function ParafraseadorMain({
  initialUserStatus,
  h1 = 'Parafraseador de IA en Español',
  subtitle = 'Reescribe cualquier texto con otras palabras manteniendo el significado. Sin plagio.',
}: {
  initialUserStatus?: UserStatus;
  h1?: string;
  subtitle?: string;
} = {}) {
  const [text, setText] = useState('');
  const [isParaphrasing, setIsParaphrasing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLimitExceeded, setIsLimitExceeded] = useState(false);
  const [analyzedTextLength, setAnalyzedTextLength] = useState(0);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailModalSource, setEmailModalSource] = useState('');
  const [usageCount, setUsageCount] = useState(0);
  const [selectedMode, setSelectedMode] = useState<ParaphraserMode>('standard');
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

  // DEBUG: Log estado inicial en primera renderización

  // Validation state (Fase 4: Validación de similitud post-parafraseo)
  const [similarityScore, setSimilarityScore] = useState<number | null>(null);
  const [changePercentage, setChangePercentage] = useState<number | null>(null);
  const [isCalculatingSimilarity, setIsCalculatingSimilarity] = useState(false);

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

  // File upload upsell modal state (para drag & drop)
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);

  // Track usage count for anonymous users
  useEffect(() => {
    if (!userStatus.isAuthenticated) {
      const count = parseInt(localStorage.getItem('parafraseador_usage_count') || '0');
      setUsageCount(count);
    }
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
    fetchUserStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // DEBUG: Monitor userStatus changes
  useEffect(() => {
  }, [userStatus]);

  // Colores del contador dinámico
  const getCounterColor = () => {
    if (text.length > CHARACTER_LIMIT) return 'text-red-600';
    if (text.length > CHARACTER_LIMIT * 0.9) return 'text-yellow-600';
    return 'text-gray-500';
  };

  // Validar si el botón debe estar habilitado
  const isButtonEnabled = () => {
    return text.length >= MIN_CHARACTERS;
  };

  const handleParaphrase = async () => {
    // Validación mínima
    if (text.length < MIN_CHARACTERS) {
      setError(`El texto debe tener al menos ${MIN_CHARACTERS} caracteres`);
      return;
    }

    const exceededLimit = text.length > CHARACTER_LIMIT;

    setIsParaphrasing(true);
    setLoadingStep(1); // Step 1: Análisis
    setError(null);

    try {
      if (exceededLimit) {
        // Progresión de steps durante análisis simulado
        setTimeout(() => setLoadingStep(2), 500);
        setTimeout(() => setLoadingStep(3), 1000);

        // Mostrar resultado simulado cuando se excede el límite
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simular delay
        setResult("Este es un ejemplo de texto parafraseado. Actualiza a Premium para procesar textos ilimitados y acceder a todos los modos de parafraseo.");
        setAnalyzedTextLength(text.length);
        setIsLimitExceeded(true);

        // Track límite de caracteres excedido
        trackEvent({
          eventType: 'hit_character_limit',
          toolType: 'parafraseador',
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

        // Step 2: Parafraseo (after 1 second)
        setTimeout(() => setLoadingStep(2), 1000);

        // Llamada a API de parafraseo
        const response = await fetch('/api/paraphrase', {
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

        // Step 3: Análisis de similitud (when API responds)
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
            toolType: 'parafraseador',
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
            toolType: 'parafraseador',
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
          throw new Error(data.error || 'Error al parafrasear el texto');
        }

        // Mostrar resultado parafraseado
        setResult(data.paraphrasedText);
        setAnalyzedTextLength(text.length);
        setIsLimitExceeded(false);

        // Incrementar contador de uso para usuarios anónimos
        if (!userStatus.isAuthenticated) {
          const newCount = usageCount + 1;
          setUsageCount(newCount);
          localStorage.setItem('parafraseador_usage_count', newCount.toString());
        }

        // Track parafraseo exitoso
        trackEvent({
          eventType: 'completed_paraphrase',
          toolType: 'parafraseador',
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

        // Calcular similitud automáticamente (Fase 4)
        calculateSimilarity(text, data.paraphrasedText);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al parafrasear el texto');
    } finally {
      setIsParaphrasing(false);
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
    setSimilarityScore(null);
    setChangePercentage(null);
  };

  // Función para calcular similitud y % de cambio (Fase 4)
  const calculateSimilarity = (originalText: string, paraphrasedText: string) => {
    setIsCalculatingSimilarity(true);

    try {
      // Normalizar textos: minúsculas, sin puntuación, palabras únicas
      const normalize = (text: string): Set<string> => {
        return new Set(
          text
            .toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()¿?¡!"""'']/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 2) // Filtrar palabras muy cortas
        );
      };

      const originalWords = normalize(originalText);
      const paraphrasedWords = normalize(paraphrasedText);

      // Calcular intersección (palabras comunes)
      const commonWords = new Set(
        [...originalWords].filter(word => paraphrasedWords.has(word))
      );

      // Calcular similitud (Jaccard similarity)
      const allWords = new Set([...originalWords, ...paraphrasedWords]);
      const similarity = (commonWords.size / allWords.size) * 100;
      const change = 100 - similarity;

      setSimilarityScore(Math.round(similarity));
      setChangePercentage(Math.round(change));

      // Track validación de similitud
      trackEvent({
        eventType: 'validation_completed',
        toolType: 'parafraseador',
        metadata: {
          similarity_score: Math.round(similarity),
          change_percentage: Math.round(change),
          passed_threshold: change >= 60,
          mode: selectedMode,
          plan: userStatus.plan_type,
          is_authenticated: userStatus.isAuthenticated,
        }
      });

    } catch (err) {
      console.error('Error calculando similitud:', err);
    } finally {
      setIsCalculatingSimilarity(false);
    }
  };

  const handleCopy = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result);
        trackEvent({ eventType: 'copied_result', metadata: { tool: 'parafraseador' } });
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
        toolType: 'parafraseador',
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
      a.download = 'texto-parafraseado.txt';
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
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-6 min-w-[320px]" style={{minHeight: '560px'}}>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-6 min-w-[320px]" style={{minHeight: '560px'}}>
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
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 leading-tight text-blue-900">
        {h1}
      </h1>
      <p className="text-base md:text-lg text-gray-600 text-center mb-6 max-w-2xl" style={{animationDelay: '0.2s'}}>
        {subtitle}
      </p>
      <ExpressPromoBanner />
      <div className="max-w-5xl w-full flex flex-col md:flex-row gap-6 md:gap-8 items-stretch justify-center animate-scale-in" style={{animationDelay: '0.3s'}}>

      {/* COLUMNA IZQUIERDA - INPUT */}
      <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between min-w-[320px]" style={{minHeight: '560px'}}>

        {/* Trust indicators (badges superiores) */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-700 font-semibold rounded-full px-3 py-1.5 text-xs">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Sin plagio
          </span>
          <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-700 font-semibold rounded-full px-3 py-1.5 text-xs">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
            </svg>
            Usos ilimitados
          </span>
          <span className="inline-flex items-center gap-1 bg-red-100 text-red-900 font-semibold rounded-full px-3 py-1.5 text-xs">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
            </svg>
            En español
          </span>
          {!userStatus.isAuthenticated ? (
              <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-700 font-semibold rounded-full px-3 py-1.5 text-xs">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
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
            )
          }
        </div>

        <label htmlFor="parafraseador-textarea" className="block text-base font-semibold text-gray-800 mb-2">
          Pega tu texto para parafrasear
        </label>

        {/* File Upload Button */}
        <FileUploadButton
          onTextExtracted={handleFileTextExtracted}
          maxChars={CHARACTER_LIMIT}
          disabled={isParaphrasing}
          userPlan={userStatus.plan_type}
          isExpressActive={userStatus.express?.is_active}
          toolName="Parafraseador"
          className="mb-3"
        />

        <div className="flex flex-col" style={{flexGrow: 1}}>
          <textarea
            id="parafraseador-textarea"
            className="w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 p-4 text-base text-gray-800 placeholder-gray-400 transition-all outline-none resize-none mb-1 hover:border-gray-400 leading-relaxed"
            style={{minHeight: '220px', flexGrow: 1}}
            placeholder="Pega aquí el texto que quieres reescribir con otras palabras. Funciona con textos académicos, artículos, ensayos y más..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
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
            aria-label="Texto a parafrasear"
          />
        </div>

        {/* Contador de caracteres y botón limpiar */}
        <div className="flex justify-between items-center text-sm text-gray-600 mt-0 mb-2 gap-2">
          <span className={getCounterColor() + ' font-medium'}>
            {text.length}/{CHARACTER_LIMIT}
          </span>
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
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Modo de parafraseo</label>
          <div className="space-y-2">
            {Object.entries(PARAPHRASER_MODES).map(([key, mode]) => {
              const modeKey = key as ParaphraserMode;
              const isLocked = mode.isPremium && userStatus.plan_type !== 'premium' && !userStatus.express.is_active;
              const isSelected = selectedMode === modeKey;

              return (
                <div key={modeKey} className="relative group">
                  <label
                    className={`flex items-center p-2.5 border-2 rounded-xl transition-all ${
                      isLocked
                        ? 'border-amber-200 bg-amber-50/50 cursor-pointer hover:border-amber-400 hover:bg-amber-50'
                        : isSelected
                        ? 'border-gray-200 bg-gray-50 cursor-pointer'
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
                              : 'bg-gray-50 text-gray-700'
                          }`}
                        >
                          {mode.isPremium ? 'PREMIUM' : 'FREE'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{mode.description}</p>
                    </div>
                  </label>

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
          onClick={handleParaphrase}
          disabled={isParaphrasing || !isButtonEnabled()}
          className={`mt-2 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${isParaphrasing ? 'animate-pulse-glow' : ''}`}
          aria-label="Parafrasear texto"
        >
          {isParaphrasing ? 'Parafraseando...' : 'Parafrasear Texto'}
        </button>

        {/* DISCLAIMER */}
        <p className="text-center text-sm text-gray-600 mt-2 font-medium">
          Sin registro. No almacenamos tu texto.
        </p>
      </div>

      {/* COLUMNA DERECHA - OUTPUT */}
      <div className="flex-1 flex flex-col gap-4 min-w-[320px]">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between relative" style={{minHeight: '560px'}}>

          {/* Header con icono */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600 shadow-sm">
              <span className="text-white text-lg"><Icon icon={ProductIcons.Humanizer} size="sm" className="inline" /></span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-800 text-base">Texto parafraseado</span>
              <span className="text-xs text-gray-500">El resultado aparecerá aquí</span>
            </div>
          </div>

          {result ? (
            <div className="relative" style={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
              <div className={isLimitExceeded ? "filter blur-sm" : ""} style={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
                {/* Área de resultado mejorada */}
                <div className="w-full border border-gray-200 rounded-lg bg-gray-50 p-5 text-base text-gray-800 mb-4 whitespace-pre-wrap leading-relaxed overflow-y-auto shadow-sm" style={{minHeight: '280px', maxHeight: '320px'}}>
                  {result}
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3 mb-3">
                  <button
                    id="copy-button"
                    onClick={handleCopy}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-sm transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>📋</span>
                    Copiar todo
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-sm transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>⬇️</span>
                    Descargar .txt
                  </button>
                </div>

                {/* VALIDACIÓN DE SIMILITUD - Datos reales (Fase 4) */}
                {isCalculatingSimilarity ? (
                  <div className="mb-4 p-5 bg-gray-50 border-2 border-green-200 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                      <p className="text-base font-semibold text-green-900">Calculando similitud...</p>
                    </div>
                  </div>
                ) : changePercentage !== null && similarityScore !== null ? (
                  <div className="mb-5 p-5 bg-gray-50 border-2 border-green-200 rounded-xl shadow-md" style={{animationDelay: '0.2s'}}>
                    <div className="flex items-center gap-2 mb-4">
                      <Icon icon={ProductIcons.Analytics} size="lg" className="text-green-700" />
                      <h3 className="text-base font-bold text-green-900">Análisis de similitud</h3>
                    </div>

                    {/* Métricas REALES de similitud mejoradas */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {/* SIMILITUD */}
                      <div className="text-center bg-blue-50 p-4 rounded-xl border-2 border-green-200 shadow-sm">
                        <p className="text-xs text-gray-600 mb-2 font-semibold uppercase tracking-wide">Similitud</p>
                        <p className="text-5xl font-black text-green-600 mb-2">{similarityScore}%</p>
                        <p className="text-xs text-green-700 font-bold">Palabras en común</p>
                      </div>

                      {/* CAMBIO */}
                      <div className={`text-center p-4 rounded-xl border-2 shadow-sm ${
                        changePercentage >= 60
                          ? 'bg-green-100 border-green-300'
                          : changePercentage >= 40
                          ? 'bg-yellow-100 border-yellow-300'
                          : 'bg-red-100 border-red-300'
                      }`}>
                        <p className="text-xs text-gray-600 mb-2 font-semibold uppercase tracking-wide">Cambio</p>
                        <p className={`text-5xl font-black mb-2 ${
                          changePercentage >= 60 ? 'text-green-600' : changePercentage >= 40 ? 'text-yellow-600' : 'text-red-600'
                        }`}>{changePercentage}%</p>
                        <p className={`text-xs font-semibold ${
                          changePercentage >= 60 ? 'text-green-700' : changePercentage >= 40 ? 'text-yellow-700' : 'text-red-700'
                        }`}>
                          {changePercentage >= 60 ? (
                            <><Icon icon={ProductIcons.Success} size="xs" className="inline text-green-600" /> Muy diferente</>
                          ) : changePercentage >= 40 ? (
                            <><Icon icon={ProductIcons.Warning} size="xs" className="inline text-yellow-600" /> Moderado</>
                          ) : (
                            <><Icon icon={ProductIcons.Warning} size="xs" className="inline text-red-600" /> Muy similar</>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Badge de resultado principal */}
                    {changePercentage >= 60 ? (
                      <div className="bg-green-600 text-white p-3 rounded-xl text-center mb-2">
                        <p className="text-sm font-bold mb-1">
                          <Icon icon={ProductIcons.Success} size="md" className="inline" /> ¡Sin riesgo de plagio!
                        </p>
                        <p className="text-xs">
                          Tu texto cambió <strong>{changePercentage}%</strong> del original.
                          Es lo suficientemente diferente para usarlo sin problemas.
                        </p>
                      </div>
                    ) : changePercentage >= 40 ? (
                      <div className="bg-yellow-600 text-white p-3 rounded-xl text-center mb-2">
                        <p className="text-sm font-bold mb-1">
                          <Icon icon={ProductIcons.Warning} size="md" className="inline" /> Cambio moderado
                        </p>
                        <p className="text-xs">
                          Tu texto cambió <strong>{changePercentage}%</strong>.
                          {userStatus.plan_type !== 'premium' && !userStatus.express.is_active ? ' Probá un modo premium para más cambios.' : ' Intenta parafrasear nuevamente.'}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-orange-600 text-white p-3 rounded-xl text-center mb-2">
                        <p className="text-sm font-bold mb-1">
                          <Icon icon={ProductIcons.Warning} size="md" className="inline" /> Muy similar al original
                        </p>
                        <p className="text-xs">
                          Solo cambió <strong>{changePercentage}%</strong>. Riesgo de plagio.
                          {userStatus.plan_type !== 'premium' && !userStatus.express.is_active ? ' Probá modos premium para mejores resultados.' : ' Intenta parafrasear nuevamente.'}
                        </p>
                      </div>
                    )}

                    <p className="text-xs text-gray-600 text-center italic">
                      <Icon icon={ProductIcons.Info} size="xs" className="inline" /> Análisis basado en comparación de vocabulario único
                    </p>
                  </div>
                ) : null}

                {/* Comparación Express vs Premium - Solo para usuarios Free */}
                {userStatus.plan_type !== 'premium' && !userStatus.express.is_active && !isLimitExceeded && (
                  <ExpressPremiumComparisonCard
                    isAuthenticated={userStatus.isAuthenticated}
                    toolName="parafraseador"
                    source="free_vs_pro_comparison"
                  />
                )}

                {/* Incentivo progresivo: Tip suave después de 2-4 usos */}
                {!userStatus.isAuthenticated && usageCount >= 2 && usageCount < 5 && (
                  <div className="mt-3 p-3 bg-gray-50 border border-gray-300 rounded-xl">
                    <p className="text-sm font-semibold text-amber-800 mb-1">
                      <Icon icon={ProductIcons.Info} size="xs" className="inline" /> ¿Usás seguido las herramientas?
                    </p>
                    <p className="text-xs text-blue-900 mb-2">
                      Registrándote gratis podés guardar tu historial y acceder a todas tus paráfrasis desde cualquier dispositivo.
                    </p>
                    <a
                      href="/dashboard"
                      className="inline-block text-xs font-bold text-blue-900 hover:text-blue-900 hover:underline"
                    >
                      Crear cuenta gratis →
                    </a>
                  </div>
                )}

                {/* Incentivo progresivo: CTA fuerte después de 5+ usos */}
                {!userStatus.isAuthenticated && usageCount >= 5 && (
                  <div className="mt-3 p-4 bg-gray-50 border-2 border-green-200 rounded-xl shadow-sm">
                    <p className="text-sm font-bold text-cyan-900 mb-2">
                      <Icon icon={ProductIcons.Upgrade} size="sm" className="inline" /> ¡Ya usaste el Parafraseador {usageCount} veces!
                    </p>
                    <p className="text-xs text-cyan-800 mb-3 leading-relaxed">
                      Registrándote gratis obtenés:<br/>
                      • <strong>Historial</strong> de tus últimos usos<br/>
                      • <strong>10 paráfrasis diarias</strong> con la cuenta gratis<br/>
                      • <strong>Acceso a futuras features</strong> antes que nadie
                    </p>
                    <a
                      href="/dashboard"
                      className="inline-block w-full text-center bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm py-2.5 px-4 rounded-lg shadow-md hover:shadow-sm transition-all"
                    >
                      Crear cuenta gratis en 10 segundos
                    </a>
                  </div>
                )}
              </div>

              {/* Overlay inline cuando se excede el límite */}
              <ExpressUnlockModal
                isOpen={isLimitExceeded && userStatus.plan_type !== 'premium' && !userStatus.express.is_active}
                onClose={() => { setIsLimitExceeded(false); setResult(null); }}
                isAuthenticated={userStatus.isAuthenticated}
                trigger="character_limit"
                toolName="parafraseador"
                excessChars={analyzedTextLength - CHARACTER_LIMIT}
                charLimit={CHARACTER_LIMIT}
              />
              <ExpressUnlockModal
                isOpen={isPremiumModeModalOpen}
                onClose={() => setIsPremiumModeModalOpen(false)}
                isAuthenticated={userStatus.isAuthenticated}
                trigger="premium_mode"
                toolName="parafraseador"
                modeName={lockedModeName}
              />

            </div>
          ) : isParaphrasing ? (
            // Show loading steps when paraphrasing
            <LoadingSteps
              steps={[
                { id: 1, label: 'Análisis de texto', icon: ProductIcons.Brain },
                { id: 2, label: 'Parafraseo', icon: ProductIcons.Paraphraser },
                { id: 3, label: 'Cálculo de similitud', icon: ProductIcons.Analytics }
              ]}
              currentStep={loadingStep}
              title="Parafraseando tu texto..."
              estimatedTime={12}
            />
          ) : (
            <>
              {/* Estado vacío mejorado */}
              <div className="flex flex-col items-center justify-center text-center px-6 py-8" style={{flexGrow: 1}}>
                <div className="w-20 h-20 rounded-xl bg-gray-50 flex items-center justify-center mb-6 shadow-sm animate-pulse">
                  <span className="text-white text-4xl"><Icon icon={ProductIcons.Humanizer} size="sm" className="inline" /></span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Esperando tu texto
                </h3>
                <p className="text-gray-600 text-sm mb-4 max-w-xs">
                  Pega el texto que quieres reescribir con otras palabras y haz clic en el botón
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
                <div className="text-center text-sm bg-gray-50 rounded-xl p-4 border border-orange-200">
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
                <div className="text-center text-sm bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <svg className="w-5 h-5 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-bold text-blue-900">
                      {userStatus.isAuthenticated ? '10 usos diarios gratis' : '3 usos diarios'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    {userStatus.isAuthenticated
                      ? 'Hasta 2,000 caracteres por uso'
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
          toolName="Parafraseador"
        />
      )}

      {/* File Upload Upsell Modal (para drag & drop) */}
      <FileUploadUpsellModal
        isOpen={showFileUploadModal}
        onClose={() => setShowFileUploadModal(false)}
        toolName="Parafraseador"
      />

    </div>
    <ExitIntentSurvey
      userPlan={userStatus.plan_type}
      hasCompletedAction={result !== null}
      toolType="parafraseador"
    />
    {result !== null && (
      <PostUseMicroSurvey
        toolType="parafraseador"
        userPlan={userStatus.plan_type}
      />
    )}
    </>
  );
}
