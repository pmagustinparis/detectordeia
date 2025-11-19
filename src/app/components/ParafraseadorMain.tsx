'use client';

import { useState, useEffect } from 'react';
import EmailCaptureModal from './EmailCaptureModal';
import UsageLimitOverlay from './UsageLimitOverlay';
import CharacterLimitModal from './CharacterLimitModal';
import FileUploadButton from './FileUploadButton';
import { useAuth } from '@/lib/hooks/useAuth';
import { getAnonymousId } from '@/lib/tracking/anonymousId';
import { PARAPHRASER_MODES, type ParaphraserMode } from '@/lib/prompts/paraphraser';
import { extractTextFromFile } from '@/lib/fileParser';
import { trackEvent } from '@/lib/analytics/client';

// Límites de caracteres según tipo de usuario
const CHARACTER_LIMITS = {
  anonymous: 400,  // Anónimos: 400 caracteres
  free: 600,  // Free: 600 caracteres
  premium: 15000,  // Premium: 15000 caracteres
};
const MIN_CHARACTERS = 50;

export default function ParafraseadorMain() {
  const { isAuthenticated, loading, user } = useAuth();
  const [text, setText] = useState('');
  const [isParaphrasing, setIsParaphrasing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLimitExceeded, setIsLimitExceeded] = useState(false);
  const [analyzedTextLength, setAnalyzedTextLength] = useState(0);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailModalSource, setEmailModalSource] = useState('');
  const [usageCount, setUsageCount] = useState(0);
  const [selectedMode, setSelectedMode] = useState<ParaphraserMode>('standard');
  const [userPlan, setUserPlan] = useState<'free' | 'premium'>('free');

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
      const count = parseInt(localStorage.getItem('parafraseador_usage_count') || '0');
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
    setError(null);

    try {
      // Obtener anonymousId para usuarios no autenticados
      const anonymousId = !isAuthenticated ? getAnonymousId() : undefined;

      // Llamada a API de parafraseo (SIEMPRE se ejecuta, aunque exceda el límite)
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
            plan: userPlan,
            is_authenticated: isAuthenticated,
            hour_of_day: new Date().getHours(),
            day_of_week: new Date().getDay(), // 0=domingo, 1=lunes, etc
            usage_count: isAuthenticated ? undefined : usageCount,
          }
        });

        return;
      }

      // 🔒 MODO PREMIUM REQUERIDO (403)
      if (response.status === 403 && data.requiresPremium) {
        setError(data.message || 'Este modo requiere Plan Pro');

        // Track modo premium bloqueado
        trackEvent({
          eventType: 'premium_mode_blocked',
          toolType: 'parafraseador',
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
        throw new Error(data.error || 'Error al parafrasear el texto');
      }

      // Mostrar resultado parafraseado
      setResult(data.paraphrasedText);
      setAnalyzedTextLength(text.length);
      setIsLimitExceeded(exceededLimit);

      // Incrementar contador de uso para usuarios anónimos
      if (!isAuthenticated) {
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
          plan: userPlan,
          is_authenticated: isAuthenticated,
          exceeded_limit: exceededLimit,
          hour_of_day: new Date().getHours(),
          day_of_week: new Date().getDay(),
          usage_count: isAuthenticated ? undefined : usageCount + 1, // Para anónimos, su uso #N
        }
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al parafrasear el texto');
    } finally {
      setIsParaphrasing(false);
    }
  };

  const handleClear = () => {
    setText('');
    setResult(null);
    setError(null);
    setIsLimitExceeded(false);
    setAnalyzedTextLength(0);
  };

  const handleCopy = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result);
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
        toolType: 'parafraseador',
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

  return (
    <div className="max-w-5xl w-full flex flex-col md:flex-row gap-6 md:gap-8 items-stretch justify-center animate-scale-in" style={{animationDelay: '0.3s'}}>

      {/* COLUMNA IZQUIERDA - INPUT */}
      <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-violet-100 p-6 flex flex-col justify-between min-w-[320px] card-elevated" style={{minHeight: '560px'}}>

        {/* Trust indicators (badges superiores) */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 font-semibold rounded-full px-3 py-1.5 text-xs">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Sin plagio
          </span>
          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 font-semibold rounded-full px-3 py-1.5 text-xs">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
            </svg>
            Usos ilimitados
          </span>
          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 font-semibold rounded-full px-3 py-1.5 text-xs">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
            </svg>
            En español
          </span>
          {!loading && (
            !isAuthenticated ? (
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 font-semibold rounded-full px-3 py-1.5 text-xs">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
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
        </div>

        <label htmlFor="parafraseador-textarea" className="block text-base font-semibold text-gray-800 mb-2">
          Pega tu texto para parafrasear
        </label>

        {/* File Upload Button */}
        <FileUploadButton
          onTextExtracted={handleFileTextExtracted}
          maxChars={CHARACTER_LIMIT}
          disabled={isParaphrasing}
          userPlan={userPlan}
          className="mb-3"
        />

        <div className="flex flex-col" style={{flexGrow: 1}}>
          <textarea
            id="parafraseador-textarea"
            className="w-full border-2 border-violet-200 rounded-2xl shadow-inner focus:ring-4 focus:ring-violet-300/50 focus:border-violet-400 p-4 text-base text-gray-800 placeholder-gray-400 transition-all outline-none resize-none mb-1 hover:border-violet-300 leading-relaxed"
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
              if (userPlan === 'premium') {
                e.currentTarget.classList.add('border-violet-400', 'bg-violet-50');
              }
            }}
            onDragLeave={(e) => {
              e.currentTarget.classList.remove('border-violet-400', 'bg-violet-50');
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
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Modo de parafraseo</label>
          <div className="space-y-2">
            {Object.entries(PARAPHRASER_MODES).map(([key, mode]) => {
              const modeKey = key as ParaphraserMode;
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
                        <span className="text-xl">🔒</span>
                        <div>
                          <p className="font-bold text-sm mb-1">Modo {mode.name} - Plan Pro</p>
                          <p className="text-violet-100 leading-relaxed">
                            Parafrasea tu texto con estilo <strong>{mode.name.toLowerCase()}</strong> profesional.
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
          onClick={handleParaphrase}
          disabled={isParaphrasing || !isButtonEnabled()}
          className={`mt-2 w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-3 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 btn-glow ${isParaphrasing ? 'animate-pulse-glow' : ''}`}
          aria-label="Parafrasear texto"
        >
          <span className="text-xl">🔄</span>
          {isParaphrasing ? 'Parafraseando...' : 'Parafrasear Texto'}
        </button>

        {/* DISCLAIMER */}
        <p className="text-center text-sm text-gray-600 mt-2 font-medium">
          Sin registro. No almacenamos tu texto.
        </p>
      </div>

      {/* COLUMNA DERECHA - OUTPUT */}
      <div className="flex-1 flex flex-col gap-4 min-w-[320px]">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-violet-100 p-6 flex flex-col justify-between relative card-elevated" style={{minHeight: '560px'}}>

          {/* Header con icono */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
              <span className="text-white text-lg">✨</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-800 text-base">Texto parafraseado</span>
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

                {/* Mensaje de éxito */}
                <div className="p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2">
                  <span className="text-green-600 text-xl">✅</span>
                  <span className="text-sm font-medium text-green-800">
                    Tu texto ha sido parafraseado correctamente
                  </span>
                </div>

                {/* Incentivo progresivo: Tip suave después de 2-4 usos */}
                {!isAuthenticated && usageCount >= 2 && usageCount < 5 && (
                  <div className="mt-3 p-3 bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-xl">
                    <p className="text-sm font-semibold text-violet-800 mb-1">
                      💡 ¿Usás seguido las herramientas?
                    </p>
                    <p className="text-xs text-violet-700 mb-2">
                      Registrándote gratis podés guardar tu historial y acceder a todas tus paráfrasis desde cualquier dispositivo.
                    </p>
                    <a
                      href="/dashboard"
                      className="inline-block text-xs font-bold text-violet-600 hover:text-violet-700 hover:underline"
                    >
                      Crear cuenta gratis →
                    </a>
                  </div>
                )}

                {/* Incentivo progresivo: CTA fuerte después de 5+ usos */}
                {!isAuthenticated && usageCount >= 5 && (
                  <div className="mt-3 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl shadow-sm">
                    <p className="text-sm font-bold text-cyan-900 mb-2">
                      🚀 ¡Ya usaste el Parafraseador {usageCount} veces!
                    </p>
                    <p className="text-xs text-cyan-800 mb-3 leading-relaxed">
                      Registrándote gratis obtenés:<br/>
                      • <strong>Historial</strong> de tus últimos usos<br/>
                      • <strong>Más usos diarios</strong> (hasta 50 usos/día)<br/>
                      • <strong>Acceso a futuras features</strong> antes que nadie
                    </p>
                    <a
                      href="/dashboard"
                      className="inline-block w-full text-center bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                      Crear cuenta gratis en 10 segundos
                    </a>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Estado vacío mejorado */}
              <div className="flex flex-col items-center justify-center text-center px-6 py-8" style={{flexGrow: 1}}>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6 shadow-lg animate-pulse">
                  <span className="text-white text-4xl">✨</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Esperando tu texto
                </h3>
                <p className="text-gray-600 text-sm mb-4 max-w-xs">
                  Pega el texto que quieres reescribir con otras palabras y haz clic en el botón
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <svg className="w-4 h-4 text-violet-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Resultado instantáneo</span>
                </div>
              </div>

              {/* Hint de usos ilimitados - SOLO para usuarios FREE */}
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
          toolName="Parafraseador"
        />
      )}

      {/* Character Limit Modal */}
      <CharacterLimitModal
        isOpen={isLimitExceeded && userPlan !== 'premium'}
        onClose={() => {
          setIsLimitExceeded(false);
          setResult(null);
        }}
        toolName="Parafraseador"
        currentChars={analyzedTextLength}
        maxChars={CHARACTER_LIMIT}
        premiumMaxChars={CHARACTER_LIMITS.premium}
        userType={!isAuthenticated ? 'anonymous' : userPlan === 'premium' ? 'premium' : 'free'}
        freeMaxChars={CHARACTER_LIMITS.free}
      />

    </div>
  );
}
