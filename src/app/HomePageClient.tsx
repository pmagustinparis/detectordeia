'use client';

import { useState, useEffect, useRef } from 'react';
import PremiumUpsellBlock from './components/PremiumUpsellBlock';
import PremiumUpsellCompact from './components/PremiumUpsellCompact';
import FeedbackBlock from './components/FeedbackBlock';
import HumanizadorPromoBanner from './components/HumanizadorPromoBanner';
import UsageLimitOverlay from './components/UsageLimitOverlay';
import { useAuth } from '@/lib/hooks/useAuth';
import { getAnonymousId } from '@/lib/tracking/anonymousId';

// Componente Barra de Confianza horizontal
const ConfidenceBar = ({ value }: { value: number }) => {
  // Colores basados en el valor
  const getColor = (value: number) => {
    if (value > 70) return '#a259f7'; // violeta
    if (value > 30) return '#f39c12'; // naranja
    return '#27ae60'; // verde
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
  titulo: '¿Querés análisis más avanzados y herramientas premium?',
  subtitulo: 'Próximamente en los planes premium:',
  bullets: [
    'Análisis por criterios (estilo, subjetividad, errores, coherencia)',
    'Explicaciones detalladas por cada frase sospechosa',
    'Subida de archivos .txt, .docx, .pdf',
    'Comparativa contra textos humanos reales',
    'Reescritura de texto IA y Humanizador (futuro)',
    'Historial de análisis',
    'Acceso vía API para automatizar análisis',
  ],
  precio: '💰 Desde $7/mes – Planes Starter y Pro',
  cta: '🔓 Desbloquear análisis avanzado',
  aviso: '📝 Te avisaremos cuando los planes estén disponibles',
};
const premiumCompactTextos = {
  titulo: '¿Querés análisis premium?',
  bullets: [
    'Análisis por criterios y explicaciones detalladas',
    'Subida de archivos y API',
    'Desde $7/mes',
  ],
  cta: '🔓 Desbloquear análisis avanzado',
  aviso: '📝 Te avisaremos cuando estén disponibles',
};

// Tooltip helper
const Tooltip = ({ text, children }: { text: string; children: React.ReactNode }) => (
  <span className="relative group cursor-pointer">
    {children}
    <span className="absolute z-10 left-1/2 -translate-x-1/2 mt-2 w-max max-w-xs px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-pre-line">
      {text}
    </span>
  </span>
);

export default function HomePageClient() { // Renombrado de Home a HomePageClient
  const { isAuthenticated, loading } = useAuth();
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
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLimitExceeded, setIsLimitExceeded] = useState(false);
  const [analyzedTextLength, setAnalyzedTextLength] = useState(0);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const detectorRef = useRef<HTMLDivElement>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [textType, setTextType] = useState('default');
  const [usageCount, setUsageCount] = useState(0);

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
      const count = parseInt(localStorage.getItem('detector_usage_count') || '0');
      setUsageCount(count);
    }
  }, [isAuthenticated]);

  // Colores del contador
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
        // Obtener anonymousId para usuarios no autenticados
        const anonymousId = !isAuthenticated ? getAnonymousId() : undefined;

        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text, textType, anonymousId }),
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
          return;
        }

        if (!response.ok) {
          throw new Error(data.error || 'Error al analizar el texto');
        }
        setResult(data);
        setAnalyzedTextLength(text.length);
        setIsLimitExceeded(false);

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

  const handleHeroCta = (e: React.MouseEvent) => {
    e.preventDefault();
    detectorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen pb-10 px-2">
      {/* Banner Promocional - Lanzamiento Humanizador */}
      <HumanizadorPromoBanner />

      {/* HERO PRODUCT BLOCK: input, button, result, trust indicators */}
      <section className="w-full flex flex-col items-center justify-center pt-8 pb-2 px-2 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-violet-300/20 rounded-full blur-3xl -z-10 animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl -z-10 animate-float" style={{animationDelay: '1s'}}></div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 mt-4 leading-tight animate-fade-in">
          <span className="gradient-text-primary">El Mejor Detector de IA</span>
          <br />
          <span className="text-gray-800">en Español</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 text-center mb-8 max-w-3xl animate-fade-in" style={{animationDelay: '0.2s'}}>
          Detecta contenido generado por IA con precisión líder. Gratis, privado y sin registro.
        </p>
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-6 md:gap-8 items-stretch justify-center animate-scale-in" style={{animationDelay: '0.3s'}}>
          {/* Input + Button (left) */}
          <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-violet-100 p-6 flex flex-col justify-between min-w-[320px] max-h-[600px] card-elevated">
            {/* Trust indicators */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
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
                <div className="relative">
                <div className={isLimitExceeded ? "filter blur-sm" : ""}>
                <>
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
                          <Tooltip text={"Cantidad de rasgos típicos de textos generados por IA detectados en el texto.\nEjemplo: frases genéricas, estructura rígida, poca variedad de conectores."}>
                            <span className="ml-1 text-gray-400">❓</span>
                          </Tooltip>
                        </span>
                        <span className={result.probability >= 50 ? 'font-bold' : 'font-normal'}>{result.scores_by_category.markersIA}/25</span>
                      </div>
                      <div className="border-dotted border-b border-gray-300 mb-1" />
                      <div className="flex justify-between text-base font-medium py-1 text-gray-800">
                        <span>
                          Marcadores Humanos
                          <Tooltip text={"Cantidad de rasgos típicos de textos escritos por humanos detectados en el texto.\nEjemplo: modismos, subjetividad, estilo informal, digresiones."}>
                            <span className="ml-1 text-gray-400">❓</span>
                          </Tooltip>
                        </span>
                        <span className={result.probability < 50 ? 'font-bold' : 'font-normal'}>{result.scores_by_category.markersHuman}/25</span>
                      </div>
                      <div className="border-dotted border-b border-gray-300" />
                    </div>
                  )}
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
                  {/* Métricas cuantitativas adicionales (mover aquí) */}
                  <div className="flex flex-wrap gap-2 mt-2 mb-2">
                    {typeof result.entropyScore === 'number' && (
                      <Tooltip text={"Entropía: mide la variedad de palabras en el texto.\nBajo (<4.5): texto muy repetitivo, típico de IA.\nAlto (>5): texto variado, típico de humanos."}>
                        <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                          Entropía: <span className="ml-1 font-bold">{result.entropyScore}</span>
                          <span className="ml-1 text-gray-400">❓</span>
                        </span>
                      </Tooltip>
                    )}
                  </div>
                  
                  {/* Próximamente: Reescribir como texto humano */}
                  <div className="bg-gray-100 text-gray-500 rounded-lg px-4 py-2 text-sm font-medium mb-2">
                    Próximamente: Reescribir como texto humano 🤖➡️👤
                  </div>
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

                  {/* Bloque de feedback */}
                  {!feedbackSent && result && !isLimitExceeded && (
                    <FeedbackBlock
                      originalText={text}
                      result={result.probability}
                      onSent={() => setFeedbackSent(true)}
                    />
                  )}
                  {result && !isLimitExceeded && (
                    <div className="mt-6 mb-2 bg-white border border-[#e9d5ff] rounded-xl shadow p-4 flex flex-col items-center text-center">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl text-[#a259f7]">🔒</span>
                        <span className="font-bold text-base text-gray-800">¿Querés análisis premium?</span>
                      </div>
                      <div className="text-xs text-gray-700 mb-2">
                        <ul className="text-left space-y-1">
                          <li>• Análisis por criterios y explicaciones detalladas</li>
                          <li>• Subida de archivos y API</li>
                          <li>• Desde $7/mes</li>
                        </ul>
                      </div>
                      <a
                        href="/pricing"
                        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 mb-2 text-center"
                      >
                        🔓 Desbloquear análisis avanzado
                      </a>
                      <p className="text-xs text-gray-500">Incluye explicaciones por frase, análisis por estilo y acceso a la API</p>
                    </div>
                  )}
                </>
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
                  {/* Bloque premium solo en empty state */}
                  <PremiumUpsellBlock textos={premiumTextos} />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS/FEATURES ROW - MOVIDO FUERA DEL GRID PRINCIPAL */}
      <section id="features" className="max-w-5xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-4 gap-6 px-2 mt-8 animate-slide-in-bottom">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all">
            <span className="text-3xl">🎯</span>
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Precisión en español</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Optimizado para textos de España y LATAM. Resultados confiables y explicados.</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all">
            <span className="text-3xl">🔒</span>
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Privacidad total</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Tus textos no se guardan ni comparten. 100% privado y seguro.</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all">
            <span className="text-3xl">⚡</span>
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Sin registro</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Analizá textos gratis, sin crear cuenta. Análisis ilimitados.</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all">
            <span className="text-3xl">📊</span>
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Reportes avanzados</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Planes premium con archivos, historial y reportes detallados.</p>
        </div>
      </section>

      {/* SECCIÓN DE BENEFICIOS */}
      <section className="max-w-5xl mx-auto mb-16 px-2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3 animate-fade-in">
          <span className="gradient-text-primary">¿Para quién es</span>
          <span className="text-gray-800"> DetectordeIA.ai?</span>
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Diseñado para profesionales, educadores, estudiantes y creadores de contenido
        </p>
        <div className="grid md:grid-cols-4 gap-6 animate-slide-in-bottom">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
              <span className="text-4xl">🎓</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Estudiantes</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Verificá la originalidad de tus trabajos y evitá problemas académicos.</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
              <span className="text-4xl">👩‍🏫</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Docentes</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Detectá IA en exámenes, ensayos y tareas. Herramienta confiable para educación.</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
              <span className="text-4xl">🏢</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Empresas</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Controlá la autenticidad de informes y comunicaciones.</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
              <span className="text-4xl">✍️</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Creadores de contenido</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Asegurá la originalidad y mejorá tu posicionamiento en buscadores.</p>
          </div>
        </div>
      </section>

      {/* SECCIÓN FAQ SEO */}
      <section id="faq" className="max-w-5xl mx-auto mb-20 px-2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3 animate-fade-in">
          <span className="gradient-text-primary">Preguntas frecuentes</span>
          <span className="text-gray-800"> sobre el detector de IA</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Todo lo que necesitás saber sobre nuestro detector
        </p>
        <div className="grid md:grid-cols-2 gap-6 animate-slide-in-bottom">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 card-elevated">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">¿Qué tan preciso es DetectordeIA.ai?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Optimizado para español, utiliza IA avanzada y validación con Perplexity. Ideal para educación, empresas y creadores.</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 card-elevated">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">¿Se guarda o comparte mi texto?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">No. Los textos analizados sin login no se almacenan ni comparten. Tu privacidad es nuestra prioridad.</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 card-elevated">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">¿Puedo analizar archivos o textos largos?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Sí, en los planes premium podés subir archivos y analizar hasta 50.000 caracteres.</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 card-elevated">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">¿Cómo funciona el plan gratuito?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Hasta 1.200 caracteres por análisis, análisis ilimitados, sin registro.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Otras Herramientas Section */}
      <section className="max-w-4xl mx-auto mb-16 px-2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">
          <span className="gradient-text-primary">Otras</span>
          <span className="text-gray-800"> herramientas</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Más herramientas para trabajar con contenido de IA
        </p>

        <div className="space-y-6">
          {/* Humanizador */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl shadow-lg border border-emerald-200 p-8 card-elevated">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-3xl">✨</span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  ¿Tu texto suena a IA? Humanízalo
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Transforma texto generado por ChatGPT, Claude o cualquier IA en contenido que suena natural y humano. Gratis, sin registro, optimizado para español.
                </p>
                <a
                  href="/humanizador"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span>Probar el Humanizador de IA</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Parafraseador */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-lg border border-purple-200 p-8 card-elevated">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-3xl">🔄</span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  ¿Necesitas reescribir tu texto? Parafraseálo
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Reescribe cualquier texto con otras palabras manteniendo el significado. Sin plagio, sin registro, optimizado para español.
                </p>
                <a
                  href="/parafraseador"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span>Probar el Parafraseador</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="text-center">
              <span className="text-4xl mb-4 block">🎉</span>
              <h3 className="text-xl font-bold text-gray-800 mb-2">¡Gracias por tu interés!</h3>
              <p className="text-gray-600 mb-6">
                Te avisaremos por email cuando los planes premium estén disponibles. Mientras tanto, podés seguir usando el análisis gratuito.
              </p>
              <button
                onClick={() => setShowWaitlistModal(false)}
                className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold py-2 px-4 rounded-xl shadow-md transition-all"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Usage Limit Overlay */}
      {rateLimitInfo && (
        <UsageLimitOverlay
          isOpen={isLimitReached}
          onClose={() => setIsLimitReached(false)}
          userType={rateLimitInfo.userType}
          limit={rateLimitInfo.limit}
          resetAt={rateLimitInfo.resetAt}
          toolName="Detector"
        />
      )}
    </div>
  );
} 