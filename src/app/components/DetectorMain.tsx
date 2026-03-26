'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ProductIcons, Icon } from '@/lib/icons';
import PremiumUpsellBlock from './PremiumUpsellBlock';
import PremiumUpsellCompact from './PremiumUpsellCompact';
import FeedbackBlock from './FeedbackBlock';
import ExitIntentSurvey from './surveys/ExitIntentSurvey';
import PostUseMicroSurvey from './surveys/PostUseMicroSurvey';
import FileUploadButton from './FileUploadButton';
import LoadingSteps from './LoadingSteps';
import { useAuth } from '@/lib/hooks/useAuth';
import { extractTextFromFile } from '@/lib/fileParser';
import { trackEvent } from '@/lib/analytics/client';
import { getAnonymousId } from '@/lib/tracking/anonymousId';
import type { UserStatus } from '@/lib/types/user-status';
import ExpressPromoBanner from './ExpressPromoBanner';
import ExpressUnlockModal from './ExpressUnlockModal';
import ExpressPremiumComparisonCard from './ExpressPremiumComparisonCard';

// Componente Barra de Confianza horizontal
const ConfidenceBar = ({ value }: { value: number }) => {
  const getColor = (value: number) => {
    if (value > 70) return '#c1272d'; // Rojo académico - Alto % IA
    if (value > 30) return '#f39c12'; // Amarillo - Medio
    return '#27ae60'; // Verde - Bajo % IA
  };
  return (
    <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden mt-2 mb-4">
      <div
        className="h-5 rounded-full transition-all duration-300"
        style={{ width: `${value}%`, background: getColor(value) }}
      />
    </div>
  );
};

const getResultColor = (value: number) => {
  if (value > 70) return 'text-[#c1272d]'; // Rojo académico
  if (value > 30) return 'text-[#f39c12]';
  return 'text-[#27ae60]';
};

// Límites de caracteres según tipo de usuario
const CHARACTER_LIMITS = {
  anonymous: 800,  // Anónimos: 800 caracteres
  free: 1200,  // Free: 1200 caracteres
  premium: 100000,  // Premium: ILIMITADO (100k técnicamente)
};

// Textos para el upsell (pueden ser importados o centralizados por país)
const premiumTextos = {
  titulo: 'Desbloquea todo el poder del Detector',
  subtitulo: 'Incluido en Express y Premium',
  bullets: [
    'Usos ilimitados diarios en todas las herramientas',
    '✨ Caracteres ilimitados en el Detector',
    'Subida de archivos (PDF, DOCX, TXT)',
    '5 modos premium en Humanizador y Parafraseador',
    'Historial completo de todos tus análisis',
    'Soporte prioritario vía email',
  ],
  precio: 'Express $3.99/24h o $8.99/sem • Premium $12.99/mes',
  cta: 'Ver Planes y Precios',
};
const premiumCompactTextos = {
  titulo: 'Desbloquea Express o Premium',
  bullets: [
    'Usos ilimitados + Caracteres ilimitados',
    '5 modos premium + Historial completo',
    'Express $3.99/24h o $8.99/sem • Premium $12.99/mes',
  ],
  cta: 'Ver Planes',
};

export default function DetectorMain({
  h1 = 'Detector de IA en Español',
  subtitle = 'Detecta si un texto fue escrito por inteligencia artificial con precisión líder en español. Analiza, sube archivos y obtén resultados confiables en segundos. Sin registro, sin fricción, 100% privado.',
  initialUserStatus,
}: {
  h1?: string;
  subtitle?: string;
  initialUserStatus?: UserStatus;
}) {
  const router = useRouter();
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<{
    probability: number;
    confidenceLevel: 'low' | 'medium' | 'high';
    scores_by_category: {
      markersIA: number;
      markersHuman: number;
    };
    linguistic_footprints: { phrase: string; reason: string }[];
    entropyScore?: number;
    semanticSimilarity?: number;
    interpretation?: string;
    advancedMetrics?: {
      perplexity: number;
      lexicalDiversity: number;
      ngramRepetition: number;
      sentenceVariance: number;
      punctuationConsistency: number;
    };
    metricsInsights?: string[];
    analysisQuality?: {
      modelsUsed: string[];
      numberOfPasses: number;
      usedPremiumModel: boolean;
    };
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLimitExceeded, setIsLimitExceeded] = useState(false);
  const [analyzedTextLength, setAnalyzedTextLength] = useState(0);
  const detectorRef = useRef<HTMLDivElement>(null);
  const [textType, setTextType] = useState('default');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  // Consolidated user status (replaces userPlan, no Express needed for Detector)
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

  // Límite de caracteres dinámico basado en autenticación y plan
  const CHARACTER_LIMIT = !userStatus.isAuthenticated
    ? CHARACTER_LIMITS.anonymous
    : userStatus.plan_type === 'premium' || userStatus.express.is_active
      ? CHARACTER_LIMITS.premium
      : CHARACTER_LIMITS.free;

  // Track usage count for anonymous users
  useEffect(() => {
    if (!userStatus.isAuthenticated) {
      const count = parseInt(localStorage.getItem('detector_usage_count') || '0');
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
    // If initial status was provided server-side, skip the fetch entirely
    if (!initialUserStatus) {
      fetchUserStatus();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCounterColor = () => {
    if (text.length > CHARACTER_LIMIT) return 'text-red-600';
    if (text.length > CHARACTER_LIMIT * 0.9) return 'text-yellow-600';
    return 'text-gray-500';
  };

  const handleAnalyze = async () => {
    if (text.length < 80) {
      setError('El texto debe tener al menos 80 caracteres');
      return;
    }

    const exceededLimit = text.length > CHARACTER_LIMIT;

    setIsAnalyzing(true);
    setLoadingStep(1); // Step 1: Análisis lingüístico
    setError(null);

    try {
      if (exceededLimit) {
        // Progresión de steps durante análisis simulado
        setTimeout(() => setLoadingStep(2), 500);
        setTimeout(() => setLoadingStep(3), 1000);

        // Mostrar resultado simulado cuando se excede el límite
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simular delay
        setResult({
          probability: 65,
          confidenceLevel: 'medium',
          scores_by_category: {
            markersIA: 15,
            markersHuman: 10
          },
          linguistic_footprints: [
            { phrase: "Análisis completo disponible", reason: "Actualiza a Premium para ver detalles" }
          ],
          entropyScore: 4.5,
          interpretation: "Actualiza a Premium para ver el análisis completo"
        });
        setAnalyzedTextLength(text.length);
        setIsLimitExceeded(true);
        setHasAnalyzed(true);

        // Track límite de caracteres excedido
        trackEvent({
          eventType: 'hit_character_limit',
          toolType: 'detector',
          metadata: {
            limit_type: 'characters',
            text_length: text.length,
            character_limit: CHARACTER_LIMIT,
            exceeded_by: text.length - CHARACTER_LIMIT,
            plan: userStatus.plan_type,
            is_authenticated: userStatus.isAuthenticated,
            hour_of_day: new Date().getHours(),
            day_of_week: new Date().getDay(), // 0=domingo, 1=lunes, etc
          }
        });
      } else {
        // Análisis normal
        // Step 2: Detección de patrones (after 2 seconds)
        setTimeout(() => setLoadingStep(2), 2000);

        const anonymousId = !userStatus.isAuthenticated ? getAnonymousId() : undefined;

        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text, textType, anonymousId }),
        });

        // Step 3: Validación final (when API responds)
        setLoadingStep(3);

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Error al analizar el texto');
        }
        setResult(data);
        setAnalyzedTextLength(text.length);
        setIsLimitExceeded(false);
        setHasAnalyzed(true);
        setFeedbackSent(false);

        // Incrementar contador de uso para usuarios anónimos (solo análisis reales)
        if (!userStatus.isAuthenticated) {
          const newCount = usageCount + 1;
          setUsageCount(newCount);
          localStorage.setItem('detector_usage_count', newCount.toString());
        }

        // Track análisis exitoso
        trackEvent({
          eventType: 'completed_analysis',
          toolType: 'detector',
          metadata: {
            text_length: text.length,
            plan: userStatus.plan_type,
            is_authenticated: userStatus.isAuthenticated,
            probability: data.probability,
            confidence_level: data.confidenceLevel,
            hour_of_day: new Date().getHours(),
            day_of_week: new Date().getDay(),
            usage_count: userStatus.isAuthenticated ? undefined : usageCount + 1, // Para anónimos, su uso #N
          }
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al analizar el texto');
    } finally {
      setIsAnalyzing(false);
      setLoadingStep(0);
    }
  };

  const handleClear = () => {
    setText('');
    setResult(null);
    setError(null);
    setIsLimitExceeded(false);
    setAnalyzedTextLength(0);
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
    e.currentTarget.classList.remove('border-violet-400', 'bg-violet-50');

    if (userStatus.plan_type !== 'premium' && !userStatus.express.is_active) {
      // Track intento de subir archivo bloqueado
      trackEvent({
        eventType: 'file_upload_blocked',
        toolType: 'detector',
        metadata: {
          plan: userStatus.plan_type,
          is_authenticated: userStatus.isAuthenticated,
        }
      });

      window.location.href = '/pricing';
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

  // Show minimal loading skeleton while fetching user status - prevents flickering
  if (isLoadingUserStatus) {
    return (
      <section className="w-full flex flex-col items-center justify-center pt-8 pb-2 px-2 relative overflow-hidden">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 leading-tight text-blue-900" style={{fontFamily: "'Georgia', serif"}}>
          {h1}
        </h1>
        <p className="text-base md:text-lg text-gray-600 text-center mb-6 max-w-3xl mx-auto">{subtitle}</p>
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-6 md:gap-8 items-stretch justify-center">
          {/* Loading skeleton */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-200 p-6 min-w-[320px] max-h-[600px]">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
    <section className="w-full flex flex-col items-center justify-center pt-8 pb-2 px-2 relative overflow-hidden">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 leading-tight animate-fade-in text-blue-900" style={{fontFamily: "'Georgia', serif"}}>
        {h1}
      </h1>
      <p className="text-base md:text-lg text-gray-600 text-center mb-6 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>{subtitle}</p>
      <ExpressPromoBanner />
      <div className="max-w-5xl w-full flex flex-col md:flex-row gap-6 md:gap-8 items-stretch justify-center animate-scale-in" style={{animationDelay: '0.3s'}}>
        {/* Input + Button (left) */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-blue-900/20 p-6 flex flex-col justify-between min-w-[320px]">
          {/* Trust indicators */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {!userStatus.isAuthenticated ? (
              <span className="inline-flex items-center gap-1 bg-blue-50 border border-blue-900/25 text-blue-900 font-semibold rounded-full px-3 py-1.5 text-xs">
                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Sin registro
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-blue-50 border border-blue-900/25 text-blue-900 font-semibold rounded-full px-3 py-1.5 text-xs">
                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Cuenta activa
              </span>
            )}
            <span className="inline-flex items-center gap-1 bg-blue-50 border border-blue-900/25 text-blue-900 font-semibold rounded-full px-3 py-1.5 text-xs">
              <svg className="w-4 h-4 text-blue-900/60" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              100% privado
            </span>
            <span className="inline-flex items-center gap-1 bg-blue-50 border border-blue-900/25 text-blue-900 font-semibold rounded-full px-3 py-1.5 text-xs">
              <svg className="w-4 h-4 text-blue-900/60" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
              </svg>
              En español
            </span>
          </div>
          <label htmlFor="detector-textarea" className="block text-base font-semibold text-gray-800 mb-2">Pega tu texto para analizar</label>

          {/* File Upload Button */}
          <FileUploadButton
            onTextExtracted={handleFileTextExtracted}
            maxChars={CHARACTER_LIMIT}
            disabled={isAnalyzing}
            userPlan={userStatus.plan_type}
            isExpressActive={userStatus.express?.is_active}
            toolName="Detector"
            className="mb-3"
          />

          <div className="flex flex-col flex-grow">
            <textarea
              id="detector-textarea"
              className="flex-grow w-full min-h-[180px] md:min-h-[260px] border-2 border-blue-900/25 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 p-4 text-base text-gray-800 placeholder-gray-500 transition-all outline-none resize-none mb-1 hover:border-blue-900/50"
              placeholder="Pega aquí el texto que quieras analizar (mínimo 80 caracteres)"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                // Limpiar resultado cuando usuario edita el texto
                if (result) {
                  setResult(null);
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
              aria-label="Texto a analizar"
            />
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600 mt-0 mb-1 gap-2">
            <span className={getCounterColor() + ' font-medium'}>{text.length}/{CHARACTER_LIMIT}</span>
            <button
              onClick={handleClear}
              className="text-blue-900 font-semibold ml-2 hover:text-blue-700 hover:underline transition-all disabled:opacity-40"
              type="button"
              disabled={text.length === 0 && !result}
              aria-label="Limpiar texto"
            >
              Limpiar
            </button>
          </div>
          {/* Selector de tipo de texto dentro de la tarjeta blanca */}
          <div className="mt-2 mb-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tipo de texto</label>
            <select
              value={textType}
              onChange={(e) => setTextType(e.target.value)}
              className="w-full border-2 border-blue-900/25 rounded-lg px-3 py-2.5 text-sm bg-white hover:border-blue-900/50 focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 transition-all text-gray-700"
            >
              <option value="default" className="text-gray-700">Sin especificar</option>
              <option value="academic" className="text-gray-700">Académico / formal</option>
              <option value="informal" className="text-gray-700">Conversación / informal</option>
            </select>
          </div>
          {error && (
            <div className="mt-1 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium">
              {error}
            </div>
          )}
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || text.length < 80}
            className={`mt-2 w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label="Detectar contenido de IA"
          >
            {isAnalyzing ? 'Analizando...' : 'Analizar texto'}
          </button>
          <p className="text-center text-sm text-gray-600 mt-2 font-medium">Sin registro. 100% privado. Precisión líder en español.</p>
        </div>
        {/* Result block (right) */}
        <div className="flex-1 flex flex-col gap-4 min-w-[320px]">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-blue-900/20 p-6 flex flex-col min-h-[260px] justify-between relative card-elevated">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-900 shadow-md">
                <span className="text-white text-lg">🛡️</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-800 text-base">Resultado del análisis</span>
                <span className="text-xs text-gray-500">Tecnología avanzada para español</span>
              </div>
            </div>
            {result ? (
              <div className="relative" style={{maxHeight: '500px', overflow: 'hidden'}}>
              <div className={isLimitExceeded ? "filter blur-sm overflow-y-auto" : "overflow-y-auto"} style={{maxHeight: '500px'}}>
                {/* HERO CARD - Score Principal con diseño mejorado */}
                <div className="mb-6 p-6 bg-gradient-to-br from-white via-blue-50/30 to-blue-50/50 rounded-2xl border-2 border-blue-900/15 shadow-xl animate-fade-in">
                  {/* Score gigante centrado */}
                  <div className="text-center mb-4">
                    <div className={`text-7xl md:text-8xl font-black leading-none mb-3 ${getResultColor(result.probability)} animate-scale-in`}>
                      {result.probability > 50 ? result.probability : 100 - result.probability}%
                    </div>

                    {/* Badge semántico más grande */}
                    {result.probability >= 80 && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-bold mb-2">
                        <Icon icon={ProductIcons.AI} size="sm" className="text-red-600" />
                        Muy probable que sea IA
                      </div>
                    )}
                    {result.probability >= 50 && result.probability < 80 && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold mb-2">
                        <Icon icon={ProductIcons.Warning} size="sm" className="text-yellow-600" />
                        Posible mezcla
                      </div>
                    )}
                    {result.probability < 50 && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold mb-2">
                        <Icon icon={ProductIcons.Human} size="sm" className="text-green-600" />
                        Probablemente humano
                      </div>
                    )}

                    {/* Título descriptivo */}
                    <p className={`text-xl md:text-2xl font-bold ${getResultColor(result.probability)} mt-2`}>
                      {result.probability > 50
                        ? 'Texto generado por IA'
                        : result.probability < 50
                          ? 'Texto escrito por humano'
                          : 'El origen del texto no es concluyente'
                      }
                    </p>
                  </div>

                  {/* Barra de confianza mejorada */}
                  <div className="mt-4">
                    <ConfidenceBar value={result.probability} />
                  </div>
                </div>

                {/* CTA Detector → Humanizador: aparece cuando el texto tiene alta probabilidad de IA */}
                {result.probability >= 60 && !isLimitExceeded && (
                  <div className="mb-5 p-4 bg-violet-50 border border-violet-200 rounded-xl animate-fade-in">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center shrink-0">
                        <Icon icon={ProductIcons.Humanizer} size="md" className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-violet-900 mb-0.5">
                          Tu texto fue detectado como IA
                        </p>
                        <p className="text-xs text-violet-700 mb-3">
                          Humanizalo en 1 clic para que suene natural y pase la detección.
                        </p>
                        <button
                          onClick={() => {
                            localStorage.setItem('humanizer_prefill_text', text);
                            router.push('/humanizador');
                          }}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-lg transition-all"
                        >
                          <Icon icon={ProductIcons.Humanizer} size="sm" className="text-white" />
                          Humanizar este texto →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Interpretación específica del resultado */}
                <div className="mb-6 p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-xl shadow-sm animate-fade-in" style={{animationDelay: '0.1s'}}>
                  <h3 className="text-base font-bold text-green-900 mb-3 flex items-center gap-2">
                    <Icon icon={ProductIcons.Brain} size="lg" className="text-green-700" />
                    ¿Por qué detectamos esto como {result.probability >= 50 ? 'IA' : 'humano'}?
                  </h3>

                  <div className="space-y-2 text-sm text-green-800">
                    {result.probability >= 80 && (
                      <>
                        <p className="font-medium">Tu texto tiene ALTA probabilidad de ser IA porque:</p>
                        <ul className="list-none space-y-1.5 ml-4">
                          {result.linguistic_footprints && result.linguistic_footprints.length > 0 && (
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 mt-0.5 font-bold">1.</span>
                              <span>Usa <strong>{result.linguistic_footprints.length} frases cliché</strong> típicas de ChatGPT como {result.linguistic_footprints.slice(0, 2).map(f => `"${f.phrase}"`).join(' y ')}.</span>
                            </li>
                          )}
                          {result.advancedMetrics && result.advancedMetrics.sentenceVariance < 3 && (
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 mt-0.5 font-bold">{result.linguistic_footprints?.length ? '2' : '1'}.</span>
                              <span>Longitud de oraciones <strong>muy uniforme</strong> ({result.advancedMetrics.sentenceVariance.toFixed(1)} de variación). Los humanos varían más.</span>
                            </li>
                          )}
                          {result.advancedMetrics && result.advancedMetrics.lexicalDiversity < 0.45 && (
                            <li className="flex items-start gap-2">
                              <span className="text-blue-600 mt-0.5 font-bold">{result.linguistic_footprints?.length && result.advancedMetrics?.sentenceVariance < 3 ? '3' : result.linguistic_footprints?.length || result.advancedMetrics?.sentenceVariance < 3 ? '2' : '1'}.</span>
                              <span>Vocabulario <strong>muy repetitivo</strong> (solo {(result.advancedMetrics.lexicalDiversity * 100).toFixed(0)}% de palabras únicas).</span>
                            </li>
                          )}
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-0.5 font-bold">•</span>
                            <span>Estructura perfecta y puntuación impecable. Los humanos cometen pequeños errores naturales.</span>
                          </li>
                        </ul>
                      </>
                    )}

                    {result.probability >= 50 && result.probability < 80 && (
                      <>
                        <p className="font-medium">Tu texto tiene características mixtas:</p>
                        <div className="grid md:grid-cols-2 gap-2 mt-2">
                          <div className="bg-red-50 p-2 rounded border border-red-200">
                            <p className="text-xs font-bold text-red-800 mb-1"><span className="flex items-center gap-1"><Icon icon={ProductIcons.AI} size="xs" />Señales de IA:</span></p>
                            <ul className="text-xs text-red-700 space-y-0.5">
                              {result.linguistic_footprints && result.linguistic_footprints.length > 0 && (
                                <li>• {result.linguistic_footprints.length} frases cliché detectadas</li>
                              )}
                              {result.scores_by_category && result.scores_by_category.markersIA >= 10 && (
                                <li>• Estructura muy organizada ({result.scores_by_category.markersIA}/25 patrones)</li>
                              )}
                              {result.advancedMetrics && result.advancedMetrics.perplexity < 4 && (
                                <li>• Texto muy predecible</li>
                              )}
                            </ul>
                          </div>
                          <div className="bg-green-50 p-2 rounded border border-green-200">
                            <p className="text-xs font-bold text-green-800 mb-1"><span className="flex items-center gap-1"><Icon icon={ProductIcons.Human} size="xs" />Señales humanas:</span></p>
                            <ul className="text-xs text-green-700 space-y-0.5">
                              {result.scores_by_category && result.scores_by_category.markersHuman >= 8 && (
                                <li>• {result.scores_by_category.markersHuman} patrones naturales</li>
                              )}
                              {result.advancedMetrics && result.advancedMetrics.sentenceVariance >= 3 && (
                                <li>• Variación en longitud de oraciones</li>
                              )}
                              {result.advancedMetrics && result.advancedMetrics.lexicalDiversity >= 0.5 && (
                                <li>• Vocabulario diverso</li>
                              )}
                            </ul>
                          </div>
                        </div>
                        <p className="mt-2 text-xs italic text-green-700">
                          Esto puede significar: texto de IA editado por humano, texto humano con ayuda de IA, o estilo formal muy estructurado.
                        </p>
                      </>
                    )}

                    {result.probability < 50 && (
                      <>
                        <p className="font-medium">Tu texto tiene BAJA probabilidad de ser IA porque:</p>
                        <ul className="list-none space-y-1.5 ml-4">
                          {result.scores_by_category && result.scores_by_category.markersHuman >= 10 && (
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 mt-0.5 font-bold">1.</span>
                              <span>Detectamos <strong>muchas señales humanas</strong> ({result.scores_by_category.markersHuman}/25 patrones).</span>
                            </li>
                          )}
                          {result.advancedMetrics && result.advancedMetrics.sentenceVariance > 4 && (
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 mt-0.5 font-bold">{result.scores_by_category?.markersHuman >= 10 ? '2' : '1'}.</span>
                              <span>Longitud de oraciones <strong>muy variada</strong> ({result.advancedMetrics.sentenceVariance.toFixed(1)} de desviación estándar).</span>
                            </li>
                          )}
                          {result.advancedMetrics && result.advancedMetrics.lexicalDiversity > 0.55 && (
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 mt-0.5 font-bold">{(result.scores_by_category?.markersHuman >= 10 ? 1 : 0) + (result.advancedMetrics?.sentenceVariance > 4 ? 1 : 0) + 1}.</span>
                              <span>Vocabulario <strong>diverso</strong> ({(result.advancedMetrics.lexicalDiversity * 100).toFixed(0)}% de palabras únicas).</span>
                            </li>
                          )}
                          {(!result.linguistic_footprints || result.linguistic_footprints.length === 0) && (
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 mt-0.5 font-bold">•</span>
                              <span><strong>Sin frases cliché</strong> típicas de IA detectadas.</span>
                            </li>
                          )}
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-0.5 font-bold">•</span>
                            <span>Estilo natural con variaciones propias de escritura humana.</span>
                          </li>
                        </ul>
                      </>
                    )}
                  </div>
                </div>

                {/* Confidence Indicator mejorado */}
                <div className="w-full mb-6 p-5 bg-white border-2 border-gray-200 rounded-xl shadow-sm animate-fade-in" style={{animationDelay: '0.2s'}}>
                  <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Icon icon={ProductIcons.Confidence} size="lg" className="text-gray-700" /> Confianza del análisis
                  </h3>

                  {result.confidenceLevel === 'high' && (
                    <>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-1 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
                        <span className="text-green-700 font-bold text-sm">Alta</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        ✅ Los 3 análisis independientes coinciden. Puedes confiar en este resultado con alta certeza.
                      </p>
                      <details className="mt-2">
                        <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700 font-medium">
                          ¿Qué significa "3 análisis"? 👆
                        </summary>
                        <p className="text-xs text-gray-600 mt-2 p-3 bg-gray-50 rounded leading-relaxed">
                          Analizamos tu texto 3 veces usando diferentes enfoques y modelos de IA para mayor precisión.
                          Cuando los 3 resultados coinciden (±8%), tenemos alta confianza en la detección.
                        </p>
                      </details>
                    </>
                  )}

                  {result.confidenceLevel === 'medium' && (
                    <>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-1 h-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full" style={{width: '70%'}}></div>
                        <span className="text-yellow-700 font-bold text-sm">Media</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        ⚠️ Los análisis muestran algunas diferencias. El resultado es confiable pero podría tener un margen de error del 10-15%.
                      </p>
                    </>
                  )}

                  {result.confidenceLevel === 'low' && (
                    <>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-1 h-3 bg-gradient-to-r from-red-400 to-red-600 rounded-full" style={{width: '50%'}}></div>
                        <span className="text-red-700 font-bold text-sm">Baja</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed mb-2">
                        ⚠️ Los análisis muestran resultados muy diferentes. Este texto es ambiguo.
                        <strong> Recomendamos una revisión manual.</strong>
                      </p>
                      <div className="p-2 bg-red-50 rounded border border-red-200">
                        <p className="text-xs text-red-800 leading-relaxed">
                          <strong>Tip:</strong> Textos muy cortos o con mezcla de estilos (ej: IA editada por humano) pueden dar resultados ambiguos.
                        </p>
                      </div>
                    </>
                  )}
                </div>
                
                {/* CTA premium compacto — solo si no hay flujo humanizador activo */}
                {result.probability < 60 && (
                  <div className="w-full flex flex-col items-center my-3">
                    <a
                      href="/pricing"
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 rounded-xl shadow-md transition-all text-base text-center"
                    >
                      <span className="flex items-center justify-center gap-2"><Icon icon={ProductIcons.Premium} size="md" />Desbloquear análisis avanzado</span>
                    </a>
                    <p className="text-xs text-gray-500 mt-1">Usos ilimitados + Caracteres ilimitados + subida de archivos</p>
                  </div>
                )}
                
                {/* Interpretación explicativa */}
                {result.interpretation && (
                  <div className="mt-2 text-sm text-gray-600 italic">
                    {result.interpretation}
                  </div>
                )}
                {/* Indicador de ajuste por tipo de texto */}
                {textType !== 'default' && (
                  <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 text-xs text-blue-800">
                      <span className="text-blue-600">⚙️</span>
                      <span className="font-medium">
                        {textType === 'academic' 
                          ? 'Ajuste aplicado para texto académico: más permisivo con estructura formal'
                          : 'Ajuste aplicado para texto informal: más permisivo con modismos y errores'
                        }
                      </span>
                    </div>
                  </div>
                )}
                {/* Análisis de patrones detectados */}
                {result.scores_by_category && (
                  <div className="w-full mb-6 p-5 bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-200 rounded-xl shadow-sm animate-fade-in" style={{animationDelay: '0.3s'}}>
                    <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Icon icon={ProductIcons.Analytics} size="lg" className="text-gray-700" /> Análisis de patrones detectados
                    </h3>

                    {/* Señales de IA */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">
                          <span className="flex items-center gap-1.5"><Icon icon={ProductIcons.AI} size="sm" className="text-red-600" />Señales de IA encontradas</span>
                        </span>
                        <span className="text-sm font-bold text-red-600">
                          {result.scores_by_category.markersIA} patrones
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-red-500 h-2 rounded-full transition-all"
                          style={{width: `${(result.scores_by_category.markersIA / 25) * 100}%`}}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {result.scores_by_category.markersIA >= 15 &&
                          "Detectamos muchos patrones típicos de IA: frases cliché, estructura muy uniforme, puntuación perfecta."}
                        {result.scores_by_category.markersIA >= 8 && result.scores_by_category.markersIA < 15 &&
                          "Detectamos varios patrones típicos de IA: algunas frases genéricas y estructura organizada."}
                        {result.scores_by_category.markersIA < 8 &&
                          "Detectamos pocos patrones típicos de IA."}
                      </p>
                    </div>

                    {/* Señales Humanas */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">
                          <span className="flex items-center gap-1.5"><Icon icon={ProductIcons.Human} size="sm" className="text-green-600" />Señales humanas encontradas</span>
                        </span>
                        <span className="text-sm font-bold text-green-600">
                          {result.scores_by_category.markersHuman} patrones
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{width: `${(result.scores_by_category.markersHuman / 25) * 100}%`}}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {result.scores_by_category.markersHuman >= 15 &&
                          "Detectamos muchas señales humanas: modismos naturales, variación de estilo, expresiones espontáneas."}
                        {result.scores_by_category.markersHuman >= 8 && result.scores_by_category.markersHuman < 15 &&
                          "Detectamos algunas señales humanas: cierta variación y elementos naturales."}
                        {result.scores_by_category.markersHuman < 8 &&
                          "Detectamos pocas señales humanas en el texto."}
                      </p>
                    </div>

                    {/* Expandible: ¿Cómo interpretarlo? */}
                    <details className="mt-3">
                      <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700 font-medium">
                        ¿Cómo interpretar estos patrones? 👆
                      </summary>
                      <div className="text-xs text-gray-600 mt-2 p-3 bg-white rounded-lg border border-gray-200 leading-relaxed">
                        <p className="mb-2">
                          Analizamos <strong>25 patrones diferentes</strong> en tu texto:
                        </p>
                        <ul className="space-y-1 ml-4">
                          <li>• <strong>Patrones de IA:</strong> frases cliché ("es importante mencionar"), estructura perfecta, vocabulario muy técnico, puntuación impecable.</li>
                          <li>• <strong>Patrones humanos:</strong> modismos regionales, errores naturales, variación de estilo, opiniones subjetivas.</li>
                        </ul>
                        <p className="mt-2 text-gray-700">
                          Cuantos más patrones de IA encontremos, mayor es la probabilidad de que el texto haya sido generado automáticamente.
                        </p>
                      </div>
                    </details>
                  </div>
                )}
                {/* Mostrar huellas lingüísticas solo si existen */}
                {result.linguistic_footprints && result.linguistic_footprints.length > 0 && (
                  <div className="w-full mb-6 animate-fade-in" style={{animationDelay: '0.4s'}}>
                    <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Icon icon={ProductIcons.Detector} size="lg" className="text-gray-700" /> Frases sospechosas encontradas en tu texto
                    </h3>
                    <div className="space-y-3">
                      {result.linguistic_footprints.map((item, index) => {
                        // Calcular relevancia basado en el índice (primeras son más relevantes)
                        const relevance = index === 0 ? 3 : index <= 2 ? 2 : 1;
                        // Stars now rendered with Icon component
                        const relevanceText = relevance === 3 ? 'Alta' : relevance === 2 ? 'Media' : 'Baja';

                        return (
                          <div key={index} className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-bold text-yellow-900 text-sm">"{item.phrase}"</span>
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-yellow-700">Relevancia:</span>
                                <div className="flex">{Array.from({ length: relevance }).map((_, i) => <Icon key={i} icon={ProductIcons.Star} size="xs" className="text-yellow-500 fill-yellow-500" />)}</div>
                              </div>
                            </div>

                            <p className="text-sm text-yellow-800 mb-2 leading-relaxed">
                              <span className="flex items-center gap-1"><Icon icon={ProductIcons.AI} size="xs" className="text-yellow-800" />{item.reason}</span>
                            </p>

                            {/* Contexto del texto */}
                            <div className="text-xs bg-white p-2 rounded border border-yellow-200">
                              <span className="text-gray-500 font-medium">En tu texto:</span>
                              <p className="mt-1 text-gray-700 italic">
                                "...{item.phrase}..."
                              </p>
                            </div>

                            {/* Expandible: Por qué es sospechoso */}
                            {index < 2 && ( // Solo para los 2 primeros (más relevantes)
                              <details className="mt-2">
                                <summary className="text-xs text-yellow-700 cursor-pointer hover:underline font-medium">
                                  ¿Por qué es sospechoso? 👆
                                </summary>
                                <p className="text-xs text-gray-600 mt-2 pl-4 border-l-2 border-yellow-300 leading-relaxed">
                                  {item.phrase.toLowerCase().includes('importante mencionar') &&
                                    "Los humanos rara vez usan esta frase en español natural. Es un patrón de traducción directa del inglés 'it's important to mention' muy común en modelos de IA."}
                                  {item.phrase.toLowerCase().includes('cabe destacar') &&
                                    "Esta expresión formal es muy frecuente en textos generados por IA. Los humanos tienden a usar construcciones más variadas y menos predecibles."}
                                  {item.phrase.toLowerCase().includes('en conclusión') &&
                                    "Frase de cierre típica de IA. Los humanos suelen terminar textos de formas más variadas y naturales."}
                                  {!item.phrase.toLowerCase().includes('importante mencionar') &&
                                   !item.phrase.toLowerCase().includes('cabe destacar') &&
                                   !item.phrase.toLowerCase().includes('en conclusión') &&
                                    "Esta frase aparece con mucha más frecuencia en textos generados por IA que en textos escritos por humanos, según nuestro análisis de millones de textos."}
                                </p>
                              </details>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {/* Métricas lingüísticas avanzadas (colapsables) */}
                {result.advancedMetrics && (
                  <details className="w-full mb-4 mt-4">
                    <summary className="cursor-pointer list-none">
                      <div className="p-4 bg-gradient-to-br from-amber-50 to-green-50 border-2 border-amber-200 rounded-xl hover:border-amber-300 transition-colors">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                            <Icon icon={ProductIcons.Analytics} size="md" className="text-gray-700" />
                            <span>Métricas lingüísticas avanzadas</span>
                            {result.analysisQuality?.usedPremiumModel && (
                              <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-amber-600 to-green-700 text-white rounded-full font-semibold">
                                <span className="flex items-center gap-1"><Icon icon={ProductIcons.Fast} size="xs" />Análisis Mejorado</span>
                              </span>
                            )}
                          </h3>
                          <span className="text-sm text-gray-500">Ver detalles ▼</span>
                        </div>
                      </div>
                    </summary>

                    <div className="mt-3 p-3 bg-white border-2 border-amber-100 rounded-xl">
                      <div className="grid grid-cols-2 gap-2.5">
                        {/* Variedad de vocabulario */}
                        <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-2.5 border border-gray-200">
                          <div className="text-xs text-gray-600 mb-1 font-medium">Variedad de vocabulario</div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-2xl font-bold ${result.advancedMetrics.lexicalDiversity < 0.4 ? 'text-red-600' : result.advancedMetrics.lexicalDiversity > 0.6 ? 'text-green-600' : 'text-yellow-600'}`}>
                              {(result.advancedMetrics.lexicalDiversity * 100).toFixed(0)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div
                              className={`h-2 rounded-full ${result.advancedMetrics.lexicalDiversity < 0.4 ? 'bg-red-500' : result.advancedMetrics.lexicalDiversity > 0.6 ? 'bg-green-500' : 'bg-yellow-500'}`}
                              style={{width: `${result.advancedMetrics.lexicalDiversity * 100}%`}}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {result.advancedMetrics.lexicalDiversity < 0.4 &&
                              "⚠️ Vocabulario repetitivo (normal: 60-80%). Típico de IA que reutiliza las mismas palabras."}
                            {result.advancedMetrics.lexicalDiversity >= 0.4 && result.advancedMetrics.lexicalDiversity < 0.6 &&
                              "✓ Vocabulario normal. Diversidad estándar."}
                            {result.advancedMetrics.lexicalDiversity >= 0.6 && result.probability >= 60 &&
                              "Vocabulario diverso. Sin embargo, otras señales (frases cliché, estructura) indican IA."}
                            {result.advancedMetrics.lexicalDiversity >= 0.6 && result.probability < 60 &&
                              "✓ Vocabulario muy diverso. Típico de escritura humana creativa."}
                          </p>
                        </div>

                        {/* Variación de oraciones */}
                        <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-2.5 border border-gray-200">
                          <div className="text-xs text-gray-600 mb-1 font-medium">Variación de oraciones</div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-2xl font-bold ${result.advancedMetrics.sentenceVariance < 2 ? 'text-red-600' : result.advancedMetrics.sentenceVariance > 5 ? 'text-green-600' : 'text-yellow-600'}`}>
                              {result.advancedMetrics.sentenceVariance.toFixed(1)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div
                              className={`h-2 rounded-full ${result.advancedMetrics.sentenceVariance < 2 ? 'bg-red-500' : result.advancedMetrics.sentenceVariance > 5 ? 'bg-green-500' : 'bg-yellow-500'}`}
                              style={{width: `${Math.min(result.advancedMetrics.sentenceVariance / 10 * 100, 100)}%`}}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {result.advancedMetrics.sentenceVariance < 2 &&
                              "⚠️ Longitud muy uniforme (normal: 4-7). Las IA tienden a generar oraciones de longitud similar."}
                            {result.advancedMetrics.sentenceVariance >= 2 && result.advancedMetrics.sentenceVariance < 5 &&
                              "✓ Variación normal de longitud de oraciones."}
                            {result.advancedMetrics.sentenceVariance >= 5 && result.probability >= 60 &&
                              "Buena variación de oraciones. Aun así, el contenido y las frases sugieren IA."}
                            {result.advancedMetrics.sentenceVariance >= 5 && result.probability < 60 &&
                              "✓ Gran variación. Los humanos alternan entre oraciones cortas y largas naturalmente."}
                          </p>
                        </div>

                        {/* Predictibilidad del texto */}
                        <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-2.5 border border-gray-200">
                          <div className="text-xs text-gray-600 mb-1 font-medium">Predictibilidad del texto</div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-2xl font-bold ${result.advancedMetrics.perplexity < 3 ? 'text-red-600' : result.advancedMetrics.perplexity > 7 ? 'text-green-600' : 'text-yellow-600'}`}>
                              {result.advancedMetrics.perplexity.toFixed(1)}
                            </span>
                            <span className="text-sm text-gray-500">/10</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div
                              className={`h-2 rounded-full ${result.advancedMetrics.perplexity < 3 ? 'bg-red-500' : result.advancedMetrics.perplexity > 7 ? 'bg-green-500' : 'bg-yellow-500'}`}
                              style={{width: `${(result.advancedMetrics.perplexity / 10) * 100}%`}}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {result.advancedMetrics.perplexity < 3 &&
                              "⚠️ Texto muy predecible (normal: 5-8). La IA sigue patrones predecibles."}
                            {result.advancedMetrics.perplexity >= 3 && result.advancedMetrics.perplexity < 7 &&
                              "✓ Predictibilidad normal."}
                            {result.advancedMetrics.perplexity >= 7 && result.probability >= 60 &&
                              "Combinaciones de palabras variadas. Sin embargo, el análisis general indica IA."}
                            {result.advancedMetrics.perplexity >= 7 && result.probability < 60 &&
                              "✓ Texto impredecible. Los humanos usan combinaciones de palabras más variadas."}
                          </p>
                        </div>

                        {/* Patrones repetitivos */}
                        <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-2.5 border border-gray-200">
                          <div className="text-xs text-gray-600 mb-1 font-medium">Patrones repetitivos</div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-2xl font-bold ${result.advancedMetrics.ngramRepetition > 6 ? 'text-red-600' : result.advancedMetrics.ngramRepetition > 3 ? 'text-yellow-600' : 'text-green-600'}`}>
                              {result.advancedMetrics.ngramRepetition.toFixed(1)}
                            </span>
                            <span className="text-sm text-gray-500">/10</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div
                              className={`h-2 rounded-full ${result.advancedMetrics.ngramRepetition > 6 ? 'bg-red-500' : result.advancedMetrics.ngramRepetition > 3 ? 'bg-yellow-500' : 'bg-green-500'}`}
                              style={{width: `${(result.advancedMetrics.ngramRepetition / 10) * 100}%`}}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {result.advancedMetrics.ngramRepetition > 6 &&
                              "⚠️ Muchas frases repetidas. Típico de IA que reutiliza construcciones."}
                            {result.advancedMetrics.ngramRepetition > 3 && result.advancedMetrics.ngramRepetition <= 6 &&
                              "Repetición moderada."}
                            {result.advancedMetrics.ngramRepetition <= 3 &&
                              "✓ Baja repetición. Los humanos evitan naturalmente repetir las mismas frases."}
                          </p>
                        </div>
                      </div>

                      {/* Información de calidad del análisis */}
                      {result.analysisQuality && (
                        <div className="pt-2.5 mt-2.5 border-t border-gray-200">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600 font-medium">Calidad del análisis:</span>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-amber-700">
                                {result.analysisQuality.numberOfPasses} pasada{result.analysisQuality.numberOfPasses > 1 ? 's' : ''}
                              </span>
                              {result.analysisQuality.usedPremiumModel && (
                                <span className="px-2 py-0.5 bg-gradient-to-r from-amber-600 to-green-700 text-white rounded-full text-xs font-semibold">
                                  GPT-4o-mini
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </details>
                )}
                <div className="text-xs text-gray-500 mt-2 mb-1">Ningún detector es 100% infalible. Usa el resultado como orientación.</div>

                {/* FASE 5: Comparación visual Free vs Premium - Solo para usuarios Free */}
                {userStatus.plan_type !== 'premium' && !userStatus.express.is_active && !isLimitExceeded && (
                  <div className="mt-4 p-4 bg-slate-50 border-2 border-slate-200 rounded-xl shadow-md">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon icon={ProductIcons.Upgrade} size="lg" className="text-slate-800" />
                      <h3 className="text-sm font-bold text-slate-800">Comparación: Free vs Premium</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                      {/* LO QUE TIENES (FREE) */}
                      <div className="bg-white p-3 rounded-lg border-2 border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-bold">
                            {userStatus.isAuthenticated ? 'TU PLAN: FREE' : 'SIN CUENTA'}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-gray-800 mb-2">Lo que acabas de recibir:</p>
                        <ul className="text-xs text-gray-700 space-y-1.5">
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span>Análisis básico de IA</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span>Score de probabilidad</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span>Hasta {userStatus.isAuthenticated ? '1,200' : '800'} caracteres</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-gray-400 font-bold">✗</span>
                            <span className="text-gray-400">Sin subida de archivos</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-gray-400 font-bold">✗</span>
                            <span className="text-gray-400">Sin historial guardado</span>
                          </li>
                        </ul>
                      </div>

                      {/* LO QUE OBTENDRÍAS (PRO) */}
                      <div className="bg-slate-50 p-3 rounded-lg border-2 border-slate-200 relative">
                        <div className="absolute -top-2 -right-2">
                          <span className="bg-slate-800 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                            PREMIUM
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Icon icon={ProductIcons.Star} size="sm" className="text-slate-600" />
                          <span className="text-xs font-bold text-slate-800">CON PLAN PREMIUM</span>
                        </div>
                        <p className="text-xs font-bold text-slate-800 mb-2">Todo lo anterior PLUS:</p>
                        <ul className="text-xs text-slate-700 space-y-1.5">
                          <li className="flex items-start gap-2">
                            <Icon icon={ProductIcons.Success} size="xs" className="text-emerald-600 mt-0.5" />
                            <span><strong>Caracteres ilimitados</strong> por análisis</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon icon={ProductIcons.Success} size="xs" className="text-emerald-600 mt-0.5" />
                            <span><strong>Subida de archivos</strong> (PDF, DOCX, TXT)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon icon={ProductIcons.Success} size="xs" className="text-emerald-600 mt-0.5" />
                            <span><strong>Usos ilimitados</strong> en todas las herramientas</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon icon={ProductIcons.Success} size="xs" className="text-emerald-600 mt-0.5" />
                            <span><strong>Historial completo</strong> de análisis</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon icon={ProductIcons.Success} size="xs" className="text-emerald-600 mt-0.5" />
                            <span><strong>5 modos premium</strong> en Humanizador/Parafraseador</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                      <a
                        href="/pricing"
                        onClick={() => trackEvent({ eventType: 'clicked_pricing_cta', toolType: 'detector', metadata: { source: 'free_vs_pro_comparison' }})}
                        className="inline-block w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <Icon icon={ProductIcons.Upgrade} size="md" />
                          Ver Planes y Precios
                        </span>
                      </a>
                      <p className="text-xs text-gray-600 mt-2">Express $3.99/24h • Premium $12.99/mes • Cancela cuando quieras</p>
                    </div>
                  </div>
                )}

                {/* Incentivo progresivo: Tip suave después de 2-4 usos */}
                {!userStatus.isAuthenticated && usageCount >= 2 && usageCount < 5 && (
                  <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <p className="text-sm font-semibold text-slate-800 mb-1">
                      <span className="flex items-center gap-1.5"><Icon icon={ProductIcons.Info} size="sm" className="text-slate-400" />¿Usás seguido las herramientas?</span>
                    </p>
                    <p className="text-xs text-slate-500 mb-2">
                      Registrándote gratis podés guardar tu historial y acceder a todos tus análisis desde cualquier dispositivo.
                    </p>
                    <a
                      href="/dashboard"
                      className="inline-block text-xs font-bold text-slate-700 hover:text-slate-900 hover:underline"
                    >
                      Crear cuenta gratis →
                    </a>
                  </div>
                )}

                {/* Incentivo progresivo: CTA fuerte después de 5+ usos */}
                {!userStatus.isAuthenticated && usageCount >= 5 && (
                  <div className="mt-4 p-4 bg-slate-50 border-2 border-slate-200 rounded-xl shadow-sm">
                    <p className="text-sm font-bold text-slate-800 mb-2">
                      <span className="flex items-center gap-1.5"><Icon icon={ProductIcons.Upgrade} size="sm" className="text-slate-400" />¡Ya usaste el Detector {usageCount} veces!</span>
                    </p>
                    <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                      Registrándote gratis obtenés:<br/>
                      • <strong>Historial</strong> de tus últimos análisis<br/>
                      • <strong>Más usos diarios</strong> (hasta 50 usos/día)<br/>
                      • <strong>Acceso a futuras features</strong> antes que nadie
                    </p>
                    <a
                      href="/dashboard"
                      className="inline-block w-full text-center bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                      Crear cuenta gratis en 10 segundos
                    </a>
                  </div>
                )}

                {/* Bloque premium compacto al final cuando hay resultado */}
                <div className="mt-6 mb-2 bg-white border border-gray-200 rounded-xl shadow p-4 flex flex-col items-center text-center">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon icon={ProductIcons.Locked} size="xl" className="text-slate-400" />
                    <span className="font-bold text-base text-gray-800">¿Querés análisis premium?</span>
                  </div>
                  <div className="text-xs text-gray-700 mb-2">
                    <ul className="text-left space-y-1">
                      <li>• Usos ilimitados en todas las herramientas</li>
                      <li>• Hasta 15,000 caracteres por análisis</li>
                      <li>• Subida de archivos (PDF, DOCX, TXT)</li>
                      <li>• 5 modos premium en Humanizador y Parafraseador</li>
                      <li>• Historial completo de análisis</li>
                      <li>• Desde $12.99/mes o $124.68/año</li>
                    </ul>
                  </div>
                  <a
                    href="/pricing"
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 mb-2 text-center"
                  >
                    <span className="flex items-center gap-2"><Icon icon={ProductIcons.Premium} size="md" />Ver Planes y Precios</span>
                  </a>
                  <p className="text-xs text-gray-500">Soporte prioritario vía email incluido</p>
                </div>
                {/* Bloque de feedback */}
                {!feedbackSent && result && !isLimitExceeded && (
                  <FeedbackBlock
                    originalText={text}
                    result={result.probability}
                    onSent={() => setFeedbackSent(true)}
                  />
                )}
              </div>

              {/* Overlay inline cuando se excede el límite */}
              <ExpressUnlockModal
                isOpen={isLimitExceeded && userStatus.plan_type !== 'premium' && !userStatus.express.is_active}
                onClose={() => { setIsLimitExceeded(false); setResult(null); }}
                isAuthenticated={userStatus.isAuthenticated}
                trigger="character_limit"
                toolName="detector"
                excessChars={analyzedTextLength - CHARACTER_LIMIT}
                charLimit={CHARACTER_LIMIT}
              />

              </div>
            ) : isAnalyzing ? (
              // Show loading steps when analyzing
              <LoadingSteps
                steps={[
                  { id: 1, label: 'Análisis lingüístico', icon: ProductIcons.Brain },
                  { id: 2, label: 'Detección de patrones', icon: ProductIcons.Analytics },
                  { id: 3, label: 'Validación final', icon: ProductIcons.Success }
                ]}
                currentStep={loadingStep}
                title="Analizando tu texto..."
                estimatedTime={10}
              />
            ) : (
              <>
                <div className="flex items-end gap-3 mb-1">
                  <span className="text-4xl font-extrabold text-gray-800 leading-none">0%</span>
                  <span className="text-base font-bold text-gray-800">El resultado aparecerá aquí</span>
                </div>
                <ConfidenceBar value={0} />
                <div className="w-full max-w-xs mx-auto mb-2 mt-2">
                  <div className="flex justify-between text-base font-medium py-1 text-gray-800">
                    <span>IA – Generado</span>
                    <span>0%</span>
                  </div>
                  <div className="border-dotted border-b border-gray-300 mb-1" />
                  <div className="flex justify-between text-base font-medium py-1 text-gray-800">
                    <span>Humano – Escrito</span>
                    <span>0%</span>
                  </div>
                  <div className="border-dotted border-b border-gray-300" />
                </div>
                {/* Bloque premium: solo tras primer análisis, SOLO para usuarios FREE */}
                {hasAnalyzed && userStatus.plan_type !== 'premium' && !userStatus.express.is_active && (
                  <PremiumUpsellBlock textos={premiumTextos} />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Banner de incentivo para registro - Anónimos que ya usaron 2+ veces */}
      {!userStatus.isAuthenticated && usageCount >= 2 && (
        <div className="max-w-5xl mx-auto mt-8 px-2 animate-slide-in-bottom">
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl shadow-xl p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  ¿Te está gustando el Detector? Registrate gratis y obtené más
                </h3>
                <div className="grid md:grid-cols-2 gap-2 text-sm text-slate-700 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>15 usos diarios</strong> (vs 3 ahora)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>1200 caracteres</strong> en Detector (vs 800 ahora)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>600 caracteres</strong> en Humanizador y Parafraseador (vs 400 ahora)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Historial</strong> de tus últimos 20 análisis</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1.5"><Icon icon={ProductIcons.Secure} size="sm" className="text-slate-400" />100% gratis · Sin tarjeta · Registro en 30 segundos</span>
                </p>
                <a
                  href="/auth/signup"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                  </svg>
                  Registrarse Gratis
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>

    <ExitIntentSurvey
      userPlan={userStatus.plan_type}
      hasCompletedAction={hasAnalyzed}
      toolType="detector"
    />
    {hasAnalyzed && (
      <PostUseMicroSurvey
        toolType="detector"
        userPlan={userStatus.plan_type}
      />
    )}
    </>
  );
}