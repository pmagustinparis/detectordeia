'use client';

import { useState, useEffect } from 'react';
import { ProductIcons, Icon } from '@/lib/icons';
import EmailCaptureModal from './EmailCaptureModal';
import UsageLimitOverlay from './UsageLimitOverlay';
import FileUploadButton from './FileUploadButton';
import { useAuth } from '@/lib/hooks/useAuth';
import { getAnonymousId } from '@/lib/tracking/anonymousId';
import { HUMANIZER_MODES, type HumanizerMode } from '@/lib/prompts/humanizer';
import { extractTextFromFile } from '@/lib/fileParser';
import { trackEvent } from '@/lib/analytics/client';

// Límites de caracteres según tipo de usuario
const CHARACTER_LIMITS = {
  anonymous: 400,  // Anónimos: 400 caracteres
  free: 600,  // Free: 600 caracteres
  premium: 15000,  // Premium: 15000 caracteres
};
const MIN_CHARACTERS = 50;

export default function HumanizadorMain() {
  const { isAuthenticated, loading, user } = useAuth();
  const [text, setText] = useState('');
  const [isHumanizing, setIsHumanizing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLimitExceeded, setIsLimitExceeded] = useState(false);
  const [analyzedTextLength, setAnalyzedTextLength] = useState(0);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailModalSource, setEmailModalSource] = useState('');
  const [usageCount, setUsageCount] = useState(0);
  const [selectedMode, setSelectedMode] = useState<HumanizerMode>('standard');
  const [userPlan, setUserPlan] = useState<'free' | 'premium'>('free');

  // Validation state (Fase 3: Validación post-humanización)
  const [originalScore, setOriginalScore] = useState<number | null>(null);
  const [humanizedScore, setHumanizedScore] = useState<number | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Límite de caracteres dinámico basado en autenticación y plan
  const CHARACTER_LIMIT = !isAuthenticated
    ? CHARACTER_LIMITS.anonymous
    : userPlan === 'premium'
      ? CHARACTER_LIMITS.premium
      : CHARACTER_LIMITS.free;

  // Rate limit overlay state
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState<{
    userType: 'anonymous' | 'free' | 'premium';
    limit: number;
    resetAt: Date;
  } | null>(null);

  // Track usage count for anonymous users
  useEffect(() => {
    if (!isAuthenticated) {
      const count = parseInt(localStorage.getItem('humanizador_usage_count') || '0');
      setUsageCount(count);
    }
  }, [isAuthenticated]);

  // Obtener plan del usuario
  useEffect(() => {
    async function fetchUserPlan() {
      if (!isAuthenticated || !user) {
        setUserPlan('free');
        return;
      }

      try {
        const response = await fetch('/api/user/plan');
        if (response.ok) {
          const data = await response.json();
          setUserPlan(data.plan_type || 'free');
        }
      } catch (error) {
        console.error('Error fetching user plan:', error);
        setUserPlan('free');
      }
    }

    fetchUserPlan();
  }, [isAuthenticated, user]);

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
    setError(null);

    try {
      if (exceededLimit) {
        // Mostrar resultado simulado cuando se excede el límite
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simular delay
        setResult("Este es un ejemplo de texto humanizado. Actualiza a Premium para procesar textos de hasta 15,000 caracteres y acceder a todos los modos de humanización.");
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
            plan: userPlan,
            is_authenticated: isAuthenticated,
            hour_of_day: new Date().getHours(),
            day_of_week: new Date().getDay(),
          }
        });
      } else {
        // Obtener anonymousId para usuarios no autenticados
        const anonymousId = !isAuthenticated ? getAnonymousId() : undefined;

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
              plan: userPlan,
              is_authenticated: isAuthenticated,
              hour_of_day: new Date().getHours(),
              day_of_week: new Date().getDay(), // 0=domingo, 1=lunes, etc
              usage_count: isAuthenticated ? undefined : usageCount,
            }
          });

          return;
        }

        // <Icon icon={ProductIcons.Locked} size="sm" className="inline" /> MODO PREMIUM REQUERIDO (403)
        if (response.status === 403 && data.requiresPremium) {
          setError(data.message || 'Este modo requiere Plan Pro');

          // Track modo premium bloqueado
          trackEvent({
            eventType: 'premium_mode_blocked',
            toolType: 'humanizador',
            metadata: {
              mode: selectedMode,
              plan: userPlan,
              is_authenticated: isAuthenticated,
              hour_of_day: new Date().getHours(),
              day_of_week: new Date().getDay(),
              usage_count: isAuthenticated ? undefined : usageCount,
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

        // Incrementar contador de uso para usuarios anónimos
        if (!isAuthenticated) {
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
            plan: userPlan,
            is_authenticated: isAuthenticated,
            exceeded_limit: false,
            hour_of_day: new Date().getHours(),
            day_of_week: new Date().getDay(),
            usage_count: isAuthenticated ? undefined : usageCount + 1, // Para anónimos, su uso #N
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
          plan: userPlan,
          is_authenticated: isAuthenticated,
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
    e.currentTarget.classList.remove('border-violet-400', 'bg-violet-50');

    if (userPlan !== 'premium') {
      // Track intento de subir archivo bloqueado
      trackEvent({
        eventType: 'file_upload_blocked',
        toolType: 'humanizador',
        metadata: {
          plan: userPlan,
          is_authenticated: isAuthenticated,
          hour_of_day: new Date().getHours(),
          day_of_week: new Date().getDay(),
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

  return (
    <div className="max-w-5xl w-full flex flex-col md:flex-row gap-6 md:gap-8 items-stretch justify-center animate-scale-in" style={{animationDelay: '0.3s'}}>

      {/* COLUMNA IZQUIERDA - INPUT */}
      <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-violet-100 p-6 flex flex-col justify-between min-w-[320px] card-elevated" style={{minHeight: '560px'}}>

        {/* Trust indicators (badges superiores) */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {!loading && (
            !isAuthenticated ? (
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 font-semibold rounded-full px-3 py-1.5 text-xs">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Sin registro
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 font-semibold rounded-full px-3 py-1.5 text-xs">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Cuenta activa
              </span>
            )
          )}
          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 font-semibold rounded-full px-3 py-1.5 text-xs">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            100% privado
          </span>
          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 font-semibold rounded-full px-3 py-1.5 text-xs">
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
          userPlan={userPlan}
          className="mb-3"
        />

        <div className="flex flex-col" style={{flexGrow: 1}}>
          <textarea
            id="humanizador-textarea"
            className="w-full border-2 border-violet-200 rounded-2xl shadow-inner focus:ring-4 focus:ring-violet-300/50 focus:border-violet-400 p-4 text-base text-gray-800 placeholder-gray-400 transition-all outline-none resize-none mb-1 hover:border-violet-300 leading-relaxed"
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
              if (userPlan === 'premium') {
                e.currentTarget.classList.add('border-violet-400', 'bg-violet-50');
              }
            }}
            onDragLeave={(e) => {
              e.currentTarget.classList.remove('border-violet-400', 'bg-violet-50');
            }}
            onDrop={handleDrop}
            aria-label="Texto a humanizar"
          />
        </div>

        {/* Contador de caracteres y botón limpiar */}
        <div className="flex justify-between items-center text-sm text-gray-600 mt-0 mb-2 gap-2">
          <span className={getCounterColor() + ' font-medium'}>
            {text.length}/{CHARACTER_LIMIT}
          </span>
          <button
            onClick={handleClear}
            className="text-violet-600 font-semibold ml-2 hover:text-violet-700 hover:underline transition-all disabled:opacity-40"
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
              const isLocked = mode.isPremium && userPlan !== 'premium';
              const isSelected = selectedMode === modeKey;

              return (
                <div key={modeKey} className="relative group">
                  <label
                    className={`flex items-center p-2.5 border-2 rounded-xl transition-all ${
                      isLocked
                        ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'border-violet-400 bg-violet-50 cursor-pointer'
                        : 'border-violet-200 bg-white hover:border-violet-300 cursor-pointer'
                    }`}
                  >
                    <input
                      type="radio"
                      name="mode"
                      value={modeKey}
                      checked={isSelected}
                      disabled={isLocked}
                      onChange={() => !isLocked && setSelectedMode(modeKey)}
                      className={`w-4 h-4 ${isLocked ? 'text-gray-400' : 'text-violet-600 focus:ring-violet-500'}`}
                    />
                    <div className="ml-2 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-gray-800">
                          {mode.icon} {mode.name}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            mode.isPremium
                              ? 'bg-violet-100 text-violet-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {mode.isPremium ? 'PRO' : 'FREE'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{mode.description}</p>
                    </div>
                  </label>

                  {/* Tooltip para modos bloqueados */}
                  {isLocked && (
                    <div className="absolute left-0 right-0 top-full mt-2 bg-gradient-to-br from-violet-600 to-purple-600 text-white text-xs rounded-xl p-4 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 border-2 border-violet-400">
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-xl"><Icon icon={ProductIcons.Locked} size="sm" className="inline" /></span>
                        <div>
                          <p className="font-bold text-sm mb-1">Modo {mode.name} - Plan Pro</p>
                          <p className="text-violet-100 leading-relaxed">
                            Humaniza tu texto con <strong>{mode.name.toLowerCase()}</strong> profesional.
                            Con Plan Pro obtenés <strong>5 modos premium</strong> + <strong>usos ilimitados</strong> + hasta <strong>15,000 caracteres</strong>.
                          </p>
                        </div>
                      </div>
                      <div className="text-center mt-2 pt-2 border-t border-violet-400/50">
                        <p className="text-violet-100 font-semibold">
                          Desde $10/mes • <a href="/pricing" className="underline hover:text-white">Ver planes</a>
                        </p>
                      </div>
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
          className={`mt-2 w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-3 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 btn-glow ${isHumanizing ? 'animate-pulse-glow' : ''}`}
          aria-label="Humanizar texto"
        >
          <span className="text-xl"><Icon icon={ProductIcons.AI} size="sm" className="inline text-red-600" />→<Icon icon={ProductIcons.Human} size="sm" className="inline text-green-600" /></span>
          {isHumanizing ? 'Humanizando...' : 'Humanizar Texto'}
        </button>

        {/* DISCLAIMER */}
        <p className="text-center text-sm text-gray-600 mt-2 font-medium">
          Sin registro. 100% privado. No almacenamos tu texto.
        </p>
      </div>

      {/* COLUMNA DERECHA - OUTPUT */}
      <div className="flex-1 flex flex-col gap-4 min-w-[320px]">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-violet-100 p-6 flex flex-col justify-between relative card-elevated" style={{minHeight: '560px'}}>

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
                {/* Área de resultado */}
                <div className="w-full border-2 border-emerald-200 rounded-2xl bg-emerald-50/30 p-4 text-base text-gray-800 mb-3 whitespace-pre-wrap leading-relaxed overflow-y-auto" style={{minHeight: '280px', maxHeight: '320px'}}>
                  {result}
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3 mb-3">
                  <button
                    id="copy-button"
                    onClick={handleCopy}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>📋</span>
                    Copiar todo
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>⬇️</span>
                    Descargar .txt
                  </button>
                </div>

                {/* VALIDACIÓN AUTOMÁTICA - Resultados con datos reales del detector (Fase 3) */}
                {isValidating ? (
                  <div className="mb-3 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                      <p className="text-sm font-semibold text-blue-900">Validando con el detector...</p>
                    </div>
                  </div>
                ) : validationError ? (
                  <div className="mb-3 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                    <p className="text-xs text-yellow-800 text-center">
                      <Icon icon={ProductIcons.Warning} size="xs" className="inline" /> {validationError}
                    </p>
                  </div>
                ) : originalScore !== null && humanizedScore !== null ? (
                  <div className="mb-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon icon={ProductIcons.Detector} size="md" className="text-green-700" />
                      <h3 className="text-sm font-bold text-green-900">Validación con nuestro detector</h3>
                    </div>

                    {/* Comparación de scores REALES */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {/* ANTES */}
                      <div className="text-center bg-red-50 p-3 rounded-lg border-2 border-red-200">
                        <p className="text-xs text-gray-600 mb-1 font-medium">Texto Original</p>
                        <p className="text-3xl font-extrabold text-red-600 mb-1">{originalScore}%</p>
                        <p className="text-xs text-red-700 font-semibold">
                          <Icon icon={ProductIcons.AI} size="xs" className="inline text-red-600" /> Detectado como IA
                        </p>
                      </div>

                      {/* DESPUÉS */}
                      <div className={`text-center p-3 rounded-lg border-2 ${
                        humanizedScore < 30
                          ? 'bg-green-100 border-green-300'
                          : humanizedScore < 70
                          ? 'bg-yellow-100 border-yellow-300'
                          : 'bg-red-100 border-red-300'
                      }`}>
                        <p className="text-xs text-gray-600 mb-1 font-medium">Texto Humanizado</p>
                        <p className={`text-3xl font-extrabold mb-1 ${
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
                          {userPlan !== 'premium' ? ' Probá un modo premium para mejores resultados.' : ' Intenta humanizar nuevamente.'}
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
                          {userPlan !== 'premium' ? 'Probá un modo premium para mejores resultados.' : 'Intenta humanizar nuevamente o usa otro modo.'}
                        </p>
                      </div>
                    )}

                    <p className="text-xs text-gray-600 text-center italic">
                      <Icon icon={ProductIcons.Info} size="xs" className="inline" /> Validación automática con nuestro detector de IA
                    </p>
                  </div>
                ) : null}

                {/* FASE 5: Comparación visual Free vs Pro - Solo para usuarios Free */}
                {userPlan !== 'premium' && !isLimitExceeded && (
                  <div className="mt-3 p-4 bg-gradient-to-br from-purple-50 via-violet-50 to-blue-50 border-2 border-purple-200 rounded-xl shadow-md">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon icon={ProductIcons.Upgrade} size="lg" className="text-purple-600" />
                      <h3 className="text-sm font-bold text-purple-900">Comparación: Free vs Pro</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                      {/* LO QUE TIENES (FREE) */}
                      <div className="bg-white p-3 rounded-lg border-2 border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-bold">
                            {isAuthenticated ? 'TU PLAN: FREE' : 'SIN CUENTA'}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-gray-800 mb-2">Lo que acabas de usar:</p>
                        <ul className="text-xs text-gray-700 space-y-1.5">
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span>Modo Standard gratis</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span>Hasta {isAuthenticated ? '600' : '400'} caracteres</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span>Validación automática</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-gray-400 font-bold">✗</span>
                            <span className="text-gray-400">Sin modos premium</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-gray-400 font-bold">✗</span>
                            <span className="text-gray-400">Sin subida de archivos</span>
                          </li>
                        </ul>
                      </div>

                      {/* LO QUE OBTENDRÍAS (PRO) */}
                      <div className="bg-gradient-to-br from-purple-100 to-violet-100 p-3 rounded-lg border-2 border-purple-300 relative">
                        <div className="absolute -top-2 -right-2">
                          <span className="bg-gradient-to-r from-purple-600 to-violet-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                            PREMIUM
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Icon icon={ProductIcons.Star} size="sm" className="text-purple-600" />
                          <span className="text-xs font-bold text-purple-900">CON PLAN PRO</span>
                        </div>
                        <p className="text-xs font-bold text-purple-900 mb-2">Todo lo anterior PLUS:</p>
                        <ul className="text-xs text-purple-900 space-y-1.5">
                          <li className="flex items-start gap-2">
                            <Icon icon={ProductIcons.Success} size="xs" className="text-purple-600 mt-0.5" />
                            <span><strong>5 modos premium</strong> (Académico, Creativo, etc.)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon icon={ProductIcons.Success} size="xs" className="text-purple-600 mt-0.5" />
                            <span><strong>Hasta 15,000 caracteres</strong> por texto</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon icon={ProductIcons.Success} size="xs" className="text-purple-600 mt-0.5" />
                            <span><strong>Subida de archivos</strong> (PDF, DOCX, TXT)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon icon={ProductIcons.Success} size="xs" className="text-purple-600 mt-0.5" />
                            <span><strong>Usos ilimitados</strong> diarios</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon icon={ProductIcons.Success} size="xs" className="text-purple-600 mt-0.5" />
                            <span><strong>Mejor calidad</strong> de humanización</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                      <a
                        href="/pricing"
                        onClick={() => trackEvent({ eventType: 'clicked_pricing_cta', toolType: 'humanizador', metadata: { source: 'free_vs_pro_comparison' }})}
                        className="inline-block w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <Icon icon={ProductIcons.Upgrade} size="md" />
                          Ver Planes y Precios
                        </span>
                      </a>
                      <p className="text-xs text-gray-600 mt-2">Desde $10/mes • Cancela cuando quieras</p>
                    </div>
                  </div>
                )}

                {/* Incentivo progresivo para registro (solo usuarios anónimos) */}
                {!isAuthenticated && usageCount >= 2 && usageCount < 5 && (
                  <div className="p-3 bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-xl">
                    <div className="flex items-start gap-2">
                      <span className="text-lg"><Icon icon={ProductIcons.Info} size="xs" className="inline" /></span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-violet-900 mb-1">
                          ¿Usás seguido las herramientas?
                        </p>
                        <p className="text-xs text-violet-700 mb-2">
                          Registrándote gratis podés guardar tu historial y obtener más usos diarios.
                        </p>
                        <a
                          href="/dashboard"
                          className="inline-block text-xs font-semibold text-violet-600 hover:text-violet-700 underline"
                        >
                          Crear cuenta gratis →
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {!isAuthenticated && usageCount >= 5 && (
                  <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl"><Icon icon={ProductIcons.Upgrade} size="sm" className="inline" /></span>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-cyan-900 mb-1">
                          ¡Ya usaste el Humanizador {usageCount} veces!
                        </p>
                        <p className="text-xs text-cyan-700 mb-3">
                          Registrándote gratis obtenés:<br/>
                          • Historial de tus últimos usos<br/>
                          • Más usos diarios (hasta 50/día)<br/>
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
              {isLimitExceeded && userPlan !== 'premium' && (
                <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none z-10">
                  <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 pointer-events-auto animate-scale-in">
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                        <span className="text-4xl">📏</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-extrabold text-center text-gray-900 mb-2">
                      Texto Demasiado Largo
                    </h2>

                    {/* Current usage */}
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="text-sm font-medium text-gray-600">Caracteres:</span>
                      <span className="text-lg font-bold text-red-600">{analyzedTextLength.toLocaleString()}</span>
                      <span className="text-sm text-gray-400">/</span>
                      <span className="text-sm text-gray-500">{CHARACTER_LIMIT.toLocaleString()}</span>
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full font-medium">
                        +{(analyzedTextLength - CHARACTER_LIMIT).toLocaleString()} extra
                      </span>
                    </div>

                    {/* Copy dinámico según tipo de usuario */}
                    {!isAuthenticated ? (
                      <>
                        <p className="text-center text-gray-700 mb-4 leading-relaxed text-sm">
                          Tu texto tiene <strong>{(analyzedTextLength - CHARACTER_LIMIT).toLocaleString()} caracteres de más</strong>.
                          Sin registro podés procesar hasta <strong>{CHARACTER_LIMIT.toLocaleString()} caracteres</strong> por vez.
                        </p>

                        {/* Free Benefits */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 mb-3">
                          <p className="text-sm font-bold text-green-900 mb-2">
                            🎁 Registrándote GRATIS obtenés:
                          </p>
                          <ul className="space-y-1.5 text-xs text-green-800">
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 font-bold"><Icon icon={ProductIcons.Success} size="xs" className="inline text-green-600" /></span>
                              <span><strong>Hasta {CHARACTER_LIMITS.free.toLocaleString()} caracteres</strong> ({Math.round(CHARACTER_LIMITS.free / CHARACTER_LIMIT)}x más)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 font-bold"><Icon icon={ProductIcons.Success} size="xs" className="inline text-green-600" /></span>
                              <span><strong>15 usos diarios</strong> (vs 3 actual)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 font-bold"><Icon icon={ProductIcons.Success} size="xs" className="inline text-green-600" /></span>
                              <span><strong>Historial</strong> de tus análisis</span>
                            </li>
                          </ul>
                        </div>

                        {/* Pro Benefits */}
                        <div className="bg-gradient-to-r from-violet-50 to-purple-50 border-2 border-violet-200 rounded-xl p-4 mb-4">
                          <p className="text-sm font-bold text-violet-900 mb-2">
                            <Icon icon={ProductIcons.Upgrade} size="sm" className="inline" /> Con Plan Pro obtenés:
                          </p>
                          <ul className="space-y-1.5 text-xs text-violet-800">
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 font-bold"><Icon icon={ProductIcons.Success} size="xs" className="inline text-green-600" /></span>
                              <span><strong>Hasta {CHARACTER_LIMITS.premium.toLocaleString()} caracteres</strong> ({Math.round(CHARACTER_LIMITS.premium / CHARACTER_LIMIT)}x más)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 font-bold"><Icon icon={ProductIcons.Success} size="xs" className="inline text-green-600" /></span>
                              <span><strong>Usos ilimitados</strong></span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 font-bold"><Icon icon={ProductIcons.Success} size="xs" className="inline text-green-600" /></span>
                              <span><strong>5 modos premium</strong> + archivos</span>
                            </li>
                          </ul>
                          <p className="text-xs text-violet-700 mt-2 font-medium">
                            Desde $10/mes • Ahorra 20% anual
                          </p>
                        </div>

                        {/* CTA - Registro gratis primero */}
                        <a
                          href="/auth/signup"
                          className="block w-full text-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-2"
                        >
                          Registrarme Gratis
                        </a>

                        {/* Secondary CTA - Ver Pro */}
                        <a
                          href="/pricing"
                          className="block w-full text-center text-violet-600 hover:text-violet-700 font-semibold py-2 transition-colors text-sm"
                        >
                          O ver Plan Pro →
                        </a>
                      </>
                    ) : (
                      <>
                        <p className="text-center text-gray-700 mb-4 leading-relaxed text-sm">
                          Tu texto tiene <strong>{(analyzedTextLength - CHARACTER_LIMIT).toLocaleString()} caracteres de más</strong>.
                          Con el Plan Free podés procesar hasta <strong>{CHARACTER_LIMIT.toLocaleString()} caracteres</strong> por vez.
                        </p>

                        {/* Premium Benefits */}
                        <div className="bg-gradient-to-r from-violet-50 to-purple-50 border-2 border-violet-200 rounded-xl p-4 mb-4">
                          <p className="text-sm font-bold text-violet-900 mb-2">
                            <Icon icon={ProductIcons.Upgrade} size="sm" className="inline" /> Con Plan Pro obtenés:
                          </p>
                          <ul className="space-y-1.5 text-xs text-violet-800">
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 font-bold"><Icon icon={ProductIcons.Success} size="xs" className="inline text-green-600" /></span>
                              <span><strong>Hasta {CHARACTER_LIMITS.premium.toLocaleString()} caracteres</strong> ({Math.round(CHARACTER_LIMITS.premium / CHARACTER_LIMIT)}x más)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 font-bold"><Icon icon={ProductIcons.Success} size="xs" className="inline text-green-600" /></span>
                              <span><strong>Usos ilimitados</strong></span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 font-bold"><Icon icon={ProductIcons.Success} size="xs" className="inline text-green-600" /></span>
                              <span><strong>5 modos premium</strong> + archivos</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 font-bold"><Icon icon={ProductIcons.Success} size="xs" className="inline text-green-600" /></span>
                              <span><strong>Historial completo</strong></span>
                            </li>
                          </ul>
                          <p className="text-xs text-violet-700 mt-2 font-medium">
                            Desde $10/mes • Ahorra 20% anual
                          </p>
                        </div>

                        {/* CTA - Upgrade to Pro */}
                        <a
                          href="/pricing"
                          className="block w-full text-center bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-2"
                        >
                          Ver Planes y Precios
                        </a>
                      </>
                    )}

                    {/* Close button */}
                    <button
                      onClick={() => {
                        setIsLimitExceeded(false);
                        setResult(null);
                      }}
                      className="w-full text-center text-gray-600 hover:text-gray-800 font-medium py-2 transition-colors text-sm"
                    >
                      Volver y reducir mi texto
                    </button>
                  </div>
                </div>
              )}

            </div>
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
                  <svg className="w-4 h-4 text-violet-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Resultado instantáneo</span>
                </div>
              </div>

              {/* Hint de usos ilimitados - SOLO para usuarios FREE y Anónimos */}
              {userPlan !== 'premium' && (
                <div className="text-center text-sm bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-100">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <svg className="w-5 h-5 text-violet-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-bold text-violet-700">
                      {isAuthenticated ? '15 usos diarios gratis' : '3 usos diarios'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    {isAuthenticated
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

    </div>
  );
}
