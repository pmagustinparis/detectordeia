'use client';

import { useState, useEffect, useRef } from 'react';
import PremiumUpsellBlock from './PremiumUpsellBlock';
import PremiumUpsellCompact from './PremiumUpsellCompact';
import FeedbackBlock from './FeedbackBlock';
import { useAuth } from '@/lib/hooks/useAuth';

// Componente Barra de Confianza horizontal
const ConfidenceBar = ({ value }: { value: number }) => {
  const getColor = (value: number) => {
    if (value > 70) return '#a259f7';
    if (value > 30) return '#f39c12';
    return '#27ae60';
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
  if (value > 70) return 'text-[#a259f7]';
  if (value > 30) return 'text-[#f39c12]';
  return 'text-[#27ae60]';
};

const CHARACTER_LIMIT = 1200;

// Textos para el upsell (pueden ser importados o centralizados por país)
const premiumTextos = {
  titulo: 'Desbloquea todo el poder del Detector',
  subtitulo: 'Incluido en Plan Pro',
  bullets: [
    'Usos ilimitados diarios en todas las herramientas',
    'Hasta 25,000 caracteres por análisis en el Detector',
    '5 modos premium en Humanizador y Parafraseador',
    'Historial completo de todos tus análisis',
    'Soporte prioritario vía email',
  ],
  precio: 'Desde $10/mes o $96/año',
  cta: 'Ver Planes y Precios',
};
const premiumCompactTextos = {
  titulo: 'Desbloquea Plan Pro',
  bullets: [
    'Usos ilimitados + 25K caracteres',
    '5 modos premium + Historial completo',
    'Desde $10/mes o $96/año',
  ],
  cta: 'Ver Planes',
};

export default function DetectorMain({
  h1 = 'Detector de IA en Español',
  subtitle = 'Detecta si un texto fue escrito por inteligencia artificial con precisión líder en español. Analiza, sube archivos y obtén resultados confiables en segundos. Sin registro, sin fricción, 100% privado.'
}: {
  h1?: string;
  subtitle?: string;
}) {
  const { isAuthenticated, user } = useAuth();
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
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
  const [userPlan, setUserPlan] = useState<'free' | 'premium'>('free');

  // Track usage count for anonymous users
  useEffect(() => {
    if (!isAuthenticated) {
      const count = parseInt(localStorage.getItem('detector_usage_count') || '0');
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
    setError(null);

    try {
      if (exceededLimit) {
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
      } else {
        // Análisis normal
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text, textType }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Error al analizar el texto');
        }
        setResult(data);
        setAnalyzedTextLength(text.length);
        setIsLimitExceeded(false);
        setFeedbackSent(false);

        // Incrementar contador de uso para usuarios anónimos (solo análisis reales)
        if (!isAuthenticated) {
          const newCount = usageCount + 1;
          setUsageCount(newCount);
          localStorage.setItem('detector_usage_count', newCount.toString());
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al analizar el texto');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setText('');
    setResult(null);
    setError(null);
    setIsLimitExceeded(false);
    setAnalyzedTextLength(0);
  };

  return (
    <section className="w-full flex flex-col items-center justify-center pt-8 pb-2 px-2 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-violet-300/20 rounded-full blur-3xl -z-10 animate-float"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl -z-10 animate-float" style={{animationDelay: '1s'}}></div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 leading-tight animate-fade-in">
        <span className="gradient-text-primary">{h1}</span>
      </h1>
      <p className="text-base md:text-lg text-gray-600 text-center mb-6 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>{subtitle}</p>
      <div className="max-w-5xl w-full flex flex-col md:flex-row gap-6 md:gap-8 items-stretch justify-center animate-scale-in" style={{animationDelay: '0.3s'}}>
        {/* Input + Button (left) */}
        <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-violet-100 p-6 flex flex-col justify-between min-w-[320px] max-h-[600px] card-elevated">
          {/* Trust indicators */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {!isAuthenticated ? (
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
          <label htmlFor="detector-textarea" className="block text-base font-semibold text-gray-800 mb-2">Pega tu texto para analizar</label>
          <div className="flex flex-col flex-grow">
            <textarea
              id="detector-textarea"
              className="flex-grow w-full min-h-[180px] md:min-h-[260px] border-2 border-violet-200 rounded-2xl shadow-inner focus:ring-4 focus:ring-violet-300/50 focus:border-violet-400 p-5 text-base text-gray-800 placeholder-gray-400 transition-all outline-none resize-none mb-1 hover:border-violet-300"
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
              aria-label="Texto a analizar"
            />
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600 mt-0 mb-1 gap-2">
            <span className={getCounterColor() + ' font-medium'}>{text.length}/{CHARACTER_LIMIT}</span>
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
          {/* Selector de tipo de texto dentro de la tarjeta blanca */}
          <div className="mt-2 mb-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tipo de texto</label>
            <select
              value={textType}
              onChange={(e) => setTextType(e.target.value)}
              className="w-full border-2 border-violet-200 rounded-xl px-3 py-2.5 text-sm bg-white hover:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-300/50 focus:border-violet-400 transition-all text-gray-700"
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
            className={`mt-2 w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-3 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 btn-glow ${isAnalyzing ? 'animate-pulse-glow' : ''}`}
            aria-label="Detectar contenido de IA"
          >
            <span className="text-xl">🤖</span>
            {isAnalyzing ? 'Analizando...' : 'Analizar texto'}
          </button>
          <p className="text-center text-sm text-gray-600 mt-2 font-medium">Sin registro. 100% privado. Precisión líder en español.</p>
        </div>
        {/* Result block (right) */}
        <div className="flex-1 flex flex-col gap-4 min-w-[320px]">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-violet-100 p-6 flex flex-col min-h-[260px] justify-between relative card-elevated">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 shadow-md">
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
                <div className="flex items-end gap-3 mb-1">
                  <span className={`text-4xl font-extrabold leading-none ${getResultColor(result.probability)}`}>{result.probability > 50 ? result.probability : 100 - result.probability}%</span>
                  {/* Badge semántico */}
                  {result.probability >= 80 && (
                    <span className="ml-2 text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">Muy probable que sea IA</span>
                  )}
                  {result.probability >= 50 && result.probability < 80 && (
                    <span className="ml-2 text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">Posible mezcla</span>
                  )}
                  {result.probability < 50 && (
                    <span className="ml-2 text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Probablemente humano</span>
                  )}
                  <span className={`text-base font-bold ${getResultColor(result.probability)}`}>{
                    result.probability > 50
                      ? 'Texto generado por IA'
                      : result.probability < 50
                        ? 'Texto escrito por humano'
                        : 'El origen del texto no es concluyente'
                  }</span>
                </div>
                {/* Mini insight dinámico */}
                <div className="mt-2 text-sm text-gray-700">
                  🧠 <strong>¿Por qué este resultado?</strong><br />
                  {result.probability >= 80 && 
                    "El texto muestra patrones muy uniformes, repetición de estructuras y un estilo demasiado consistente, características típicas de contenido generado automáticamente."}
                  {result.probability >= 50 && result.probability < 80 && 
                    "El texto presenta una mezcla de características: algunas secciones muestran patrones repetitivos mientras que otras tienen elementos más naturales y variados."}
                  {result.probability < 50 && 
                    "El texto muestra variación natural en el estilo, uso de lenguaje coloquial y elementos subjetivos, características típicas de contenido escrito por humanos."}
                </div>
                <ConfidenceBar value={result.probability} />
                
                {/* CTA premium compacto inmediatamente después del resultado principal */}
                <div className="w-full flex flex-col items-center my-3">
                  <a
                    href="/pricing"
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 rounded-xl shadow-md transition-all text-base text-center"
                  >
                    🔓 Desbloquear análisis avanzado
                  </a>
                  <p className="text-xs text-gray-500 mt-1">Incluye explicaciones por frase, análisis por estilo y acceso a la API</p>
                </div>
                
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
                {/* Marcadores IA y Humanos con tooltips */}
                {result.scores_by_category && (
                  <div className="w-full max-w-xs mx-auto mb-2 mt-2">
                    <div className="flex justify-between text-base font-medium py-1 text-gray-800">
                      <span>
                        Marcadores IA
                        <span className="ml-1 text-gray-400" title="Cantidad de rasgos típicos de textos generados por IA detectados en el texto.\nEjemplo: frases genéricas, estructura rígida, poca variedad de conectores.">❓</span>
                      </span>
                      <span className={result.probability >= 50 ? 'font-bold' : 'font-normal'}>{result.scores_by_category.markersIA}/25</span>
                    </div>
                    <div className="border-dotted border-b border-gray-300 mb-1" />
                    <div className="flex justify-between text-base font-medium py-1 text-gray-800">
                      <span>
                        Marcadores Humanos
                        <span className="ml-1 text-gray-400" title="Cantidad de rasgos típicos de textos escritos por humanos detectados en el texto.\nEjemplo: modismos, subjetividad, estilo informal, digresiones.">❓</span>
                      </span>
                      <span className={result.probability < 50 ? 'font-bold' : 'font-normal'}>{result.scores_by_category.markersHuman}/25</span>
                    </div>
                    <div className="border-dotted border-b border-gray-300" />
                  </div>
                )}
                {/* Mostrar huellas lingüísticas solo si existen */}
                {result.linguistic_footprints && result.linguistic_footprints.length > 0 && (
                  <div className="w-full max-w-xl mb-2">
                    <h3 className="text-base font-semibold mb-1 flex items-center gap-2 text-gray-800"><span>⚠️</span>Huellas lingüísticas detectadas:</h3>
                    <ul className="space-y-1">
                      {result.linguistic_footprints.map((item, index) => (
                        <li key={index} className="p-2 bg-yellow-50 text-yellow-900 rounded-lg text-xs">
                          <span className="font-bold">{item.phrase}:</span> {item.reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* Métricas cuantitativas adicionales */}
                <div className="flex flex-wrap gap-2 mt-2 mb-2">
                  {typeof result.entropyScore === 'number' && (
                    <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold" title="Entropía: mide la variedad de palabras en el texto.\nBajo (<4.5): texto muy repetitivo, típico de IA.\nAlto (>5): texto variado, típico de humanos.">
                      Entropía: <span className="ml-1 font-bold">{result.entropyScore}</span>
                      <span className="ml-1 text-gray-400">❓</span>
                    </span>
                  )}
                </div>

                {/* 🆕 MÉTRICAS AVANZADAS */}
                {result.advancedMetrics && (
                  <div className="mt-4 p-4 bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">📊</span>
                      <h3 className="text-sm font-bold text-gray-800">Análisis Lingüístico Avanzado</h3>
                      {result.analysisQuality?.usedPremiumModel && (
                        <span className="ml-auto text-xs px-2 py-0.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full font-semibold">
                          ⚡ Análisis Mejorado
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {/* Perplejidad */}
                      <div className="bg-white/70 rounded-lg p-2 border border-violet-100">
                        <div className="text-xs text-gray-600 mb-0.5">Perplejidad</div>
                        <div className="flex items-center gap-1">
                          <span className={`text-lg font-bold ${result.advancedMetrics.perplexity < 3 ? 'text-red-600' : result.advancedMetrics.perplexity > 7 ? 'text-green-600' : 'text-yellow-600'}`}>
                            {result.advancedMetrics.perplexity.toFixed(1)}
                          </span>
                          <span className="text-xs text-gray-500">/10</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {result.advancedMetrics.perplexity < 3 && '⚠️ Muy predecible'}
                          {result.advancedMetrics.perplexity >= 3 && result.advancedMetrics.perplexity < 7 && '✓ Normal'}
                          {result.advancedMetrics.perplexity >= 7 && '✓ Muy variado'}
                        </div>
                      </div>

                      {/* Diversidad Léxica */}
                      <div className="bg-white/70 rounded-lg p-2 border border-violet-100">
                        <div className="text-xs text-gray-600 mb-0.5">Diversidad Léxica</div>
                        <div className="flex items-center gap-1">
                          <span className={`text-lg font-bold ${result.advancedMetrics.lexicalDiversity < 0.4 ? 'text-red-600' : result.advancedMetrics.lexicalDiversity > 0.6 ? 'text-green-600' : 'text-yellow-600'}`}>
                            {result.advancedMetrics.lexicalDiversity.toFixed(2)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {result.advancedMetrics.lexicalDiversity < 0.4 && '⚠️ Repetitivo'}
                          {result.advancedMetrics.lexicalDiversity >= 0.4 && result.advancedMetrics.lexicalDiversity < 0.6 && '✓ Normal'}
                          {result.advancedMetrics.lexicalDiversity >= 0.6 && '✓ Muy diverso'}
                        </div>
                      </div>

                      {/* N-gramas Repetitivos */}
                      <div className="bg-white/70 rounded-lg p-2 border border-violet-100">
                        <div className="text-xs text-gray-600 mb-0.5">Patrones Repetitivos</div>
                        <div className="flex items-center gap-1">
                          <span className={`text-lg font-bold ${result.advancedMetrics.ngramRepetition > 6 ? 'text-red-600' : result.advancedMetrics.ngramRepetition > 3 ? 'text-yellow-600' : 'text-green-600'}`}>
                            {result.advancedMetrics.ngramRepetition.toFixed(1)}
                          </span>
                          <span className="text-xs text-gray-500">/10</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {result.advancedMetrics.ngramRepetition > 6 && '⚠️ Muy repetitivo'}
                          {result.advancedMetrics.ngramRepetition > 3 && result.advancedMetrics.ngramRepetition <= 6 && '⚡ Moderado'}
                          {result.advancedMetrics.ngramRepetition <= 3 && '✓ Bajo'}
                        </div>
                      </div>

                      {/* Varianza de Oraciones */}
                      <div className="bg-white/70 rounded-lg p-2 border border-violet-100">
                        <div className="text-xs text-gray-600 mb-0.5">Variación Oraciones</div>
                        <div className="flex items-center gap-1">
                          <span className={`text-lg font-bold ${result.advancedMetrics.sentenceVariance < 2 ? 'text-red-600' : result.advancedMetrics.sentenceVariance > 5 ? 'text-green-600' : 'text-yellow-600'}`}>
                            {result.advancedMetrics.sentenceVariance.toFixed(1)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {result.advancedMetrics.sentenceVariance < 2 && '⚠️ Muy uniforme'}
                          {result.advancedMetrics.sentenceVariance >= 2 && result.advancedMetrics.sentenceVariance < 5 && '✓ Normal'}
                          {result.advancedMetrics.sentenceVariance >= 5 && '✓ Muy variado'}
                        </div>
                      </div>
                    </div>

                    {/* Insights de métricas */}
                    {result.metricsInsights && result.metricsInsights.length > 0 && (
                      <div className="space-y-1">
                        {result.metricsInsights.slice(0, 3).map((insight, index) => (
                          <div key={index} className="flex items-start gap-1 text-xs text-violet-800 bg-white/70 rounded-lg p-2 border border-violet-100">
                            <span className="text-violet-600">•</span>
                            <span>{insight}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Información de calidad del análisis */}
                    {result.analysisQuality && (
                      <div className="mt-3 pt-3 border-t border-violet-200">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Calidad del análisis:</span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-violet-700">
                              {result.analysisQuality.numberOfPasses} pasada{result.analysisQuality.numberOfPasses > 1 ? 's' : ''}
                            </span>
                            {result.analysisQuality.usedPremiumModel && (
                              <span className="px-2 py-0.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full text-xs font-semibold">
                                GPT-4o-mini
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="text-xs text-gray-500 mt-2 mb-1">Ningún detector es 100% infalible. Usa el resultado como orientación.</div>

                {/* Incentivo progresivo: Tip suave después de 2-4 usos */}
                {!isAuthenticated && usageCount >= 2 && usageCount < 5 && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-xl">
                    <p className="text-sm font-semibold text-violet-800 mb-1">
                      💡 ¿Usás seguido las herramientas?
                    </p>
                    <p className="text-xs text-violet-700 mb-2">
                      Registrándote gratis podés guardar tu historial y acceder a todos tus análisis desde cualquier dispositivo.
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
                  <div className="mt-4 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl shadow-sm">
                    <p className="text-sm font-bold text-cyan-900 mb-2">
                      🚀 ¡Ya usaste el Detector {usageCount} veces!
                    </p>
                    <p className="text-xs text-cyan-800 mb-3 leading-relaxed">
                      Registrándote gratis obtenés:<br/>
                      • <strong>Historial</strong> de tus últimos análisis<br/>
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

                {/* Bloque premium compacto al final cuando hay resultado */}
                <div className="mt-6 mb-2 bg-white border border-[#e9d5ff] rounded-xl shadow p-4 flex flex-col items-center text-center">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl text-[#a259f7]">🔒</span>
                    <span className="font-bold text-base text-gray-800">¿Querés análisis premium?</span>
                  </div>
                  <div className="text-xs text-gray-700 mb-2">
                    <ul className="text-left space-y-1">
                      <li>• Usos ilimitados en todas las herramientas</li>
                      <li>• Hasta 25,000 caracteres por análisis</li>
                      <li>• 5 modos premium en Humanizador y Parafraseador</li>
                      <li>• Historial completo de análisis</li>
                      <li>• Desde $10/mes o $96/año</li>
                    </ul>
                  </div>
                  <a
                    href="/pricing"
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 mb-2 text-center"
                  >
                    🔓 Ver Planes y Precios
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

              {/* Overlay premium cuando se excede el límite */}
              {isLimitExceeded && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white/90 flex items-center justify-center p-6 pointer-events-none">
                  <div className="text-center max-w-sm bg-white rounded-2xl shadow-xl p-6 pointer-events-auto">
                    <p className="text-red-600 font-bold mb-2 text-sm flex items-center justify-center gap-2">
                      ⚠️ {analyzedTextLength}/{CHARACTER_LIMIT} caracteres. Límite superado.
                    </p>
                    <p className="text-gray-700 mb-4 text-sm">
                      Para ver tu análisis completo y analizar sin límites, actualiza a Premium.
                    </p>
                    <a
                      href="/pricing"
                      className="block w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all mb-2"
                    >
                      🔓 Actualizar ahora
                    </a>
                    <p className="text-xs text-gray-500">
                      📝 Te avisaremos cuando los planes estén disponibles
                    </p>
                  </div>
                </div>
              )}
              </div>
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
                {/* Bloque premium solo en empty state - SOLO para usuarios FREE */}
                {userPlan !== 'premium' && (
                  <PremiumUpsellBlock textos={premiumTextos} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 