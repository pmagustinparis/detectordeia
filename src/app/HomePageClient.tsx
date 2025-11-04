'use client';

import { useState, useEffect, useRef } from 'react';
import PremiumUpsellBlock from './components/PremiumUpsellBlock';
import PremiumUpsellCompact from './components/PremiumUpsellCompact';
import FeedbackBlock from './components/FeedbackBlock';

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
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const detectorRef = useRef<HTMLDivElement>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [textType, setTextType] = useState('default');

  // Colores del contador
  const getCounterColor = () => {
    if (text.length > CHARACTER_LIMIT) return 'text-red-600';
    if (text.length > CHARACTER_LIMIT * 0.9) return 'text-yellow-600';
    return 'text-gray-500';
  };

  const handleAnalyze = async () => {
    if (text.length < 250) {
      setError('El texto debe tener al menos 250 caracteres');
      return;
    }
    if (text.length > CHARACTER_LIMIT) {
      setShowPremiumModal(true);
      return;
    }
    setIsAnalyzing(true);
    setError(null);
    try {
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
  };

  const handleHeroCta = (e: React.MouseEvent) => {
    e.preventDefault();
    detectorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-10 px-2">
      {/* HERO PRODUCT BLOCK: input, button, result, trust indicators */}
      <section className="w-full bg-transparent flex flex-col items-center justify-center pt-6 pb-2 px-2">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-6 mt-4 leading-tight">El Mejor Detector de IA en Español</h1>
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-6 md:gap-8 items-stretch justify-center">
          {/* Input + Button (left) */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between min-w-[320px] max-h-[600px]">
            {/* Trust indicators */}
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block bg-[#e9d5ff] text-[#7c3aed] font-bold rounded-lg px-3 py-1 text-xs">No login</span>
              <span className="inline-block bg-[#e9d5ff] text-[#7c3aed] font-bold rounded-lg px-3 py-1 text-xs">100% privado</span>
              <span className="inline-block bg-[#e9d5ff] text-[#7c3aed] font-bold rounded-lg px-3 py-1 text-xs">En español</span>
            </div>
            <label htmlFor="detector-textarea" className="block text-base font-bold text-gray-800 mb-1">Pega tu texto para analizar</label>
            <div className="flex flex-col flex-grow">
              <textarea
                id="detector-textarea"
                className="flex-grow w-full min-h-[180px] md:min-h-[260px] border-4 border-[#a259f7] rounded-2xl shadow-2xl focus:ring-4 focus:ring-[#a259f7]/50 focus:border-[#a259f7] p-6 text-lg text-gray-800 placeholder-gray-400 transition outline-none resize-none mb-1"
                placeholder="Pega aquí el texto que quieras analizar (mínimo 250 caracteres)"
                value={text}
                onChange={(e) => setText(e.target.value)}
                aria-label="Texto a analizar"
              />
            </div>
            <div className="flex justify-between items-center text-base text-gray-800 mt-0 mb-1 gap-2">
              <span className={getCounterColor()}>{text.length}/{CHARACTER_LIMIT}</span>
              <button
                onClick={handleClear}
                className="text-[#5b21b6] font-bold ml-2 hover:underline transition-all disabled:opacity-40"
                type="button"
                disabled={text.length === 0 && !result}
                aria-label="Limpiar texto"
              >
                Limpiar
              </button>
            </div>
            {/* Selector de tipo de texto dentro de la tarjeta blanca */}
            <div className="mt-2 mb-2">
              <label className="block text-sm font-bold text-gray-800 mb-1">Tipo de texto</label>
              <select
                value={textType}
                onChange={(e) => setTextType(e.target.value)}
                className="w-full border-2 border-[#a259f7] rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#a259f7]/50 transition text-black"
              >
                <option value="default" className="text-black">Sin especificar</option>
                <option value="academic" className="text-black">Académico / formal</option>
                <option value="informal" className="text-black">Conversación / informal</option>
              </select>
            </div>
            {error && (
              <div className="mt-1 p-2 bg-red-50 text-red-700 rounded-lg text-xs font-medium">
                {error}
              </div>
            )}
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || text.length < 250}
              className={`mt-1 w-full bg-[#7c3aed] hover:bg-[#5b21b6] text-white py-2 rounded-xl font-bold text-base shadow-md transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
              aria-label="Detectar contenido de IA"
            >
              <span className="mr-2">🤖</span>
              {isAnalyzing ? 'Analizando...' : 'Analizar texto gratis'}
            </button>
            <p className="text-center text-sm text-gray-800 mt-1">Sin registro. 100% privado. Precisión líder en español.</p>
          </div>
          {/* Result block (right) */}
          <div className="flex-1 flex flex-col gap-4 min-w-[320px]">
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col min-h-[260px] justify-between">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#7c3aed] text-xl">🛡️</span>
                <span className="font-bold text-gray-800 text-base">Resultado del análisis</span>
              </div>
              <span className="text-xs text-gray-600 mb-2">Análisis validado con tecnología avanzada para español</span>
              {result ? (
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
                  {/* Bloque de feedback */}
                  {!feedbackSent && result && (
                    <FeedbackBlock
                      originalText={text}
                      result={result.probability}
                      onSent={() => setFeedbackSent(true)}
                    />
                  )}
                  {result && (
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
      <section className="max-w-5xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-4 gap-6 px-2 mt-0">
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
          <span className="text-3xl mb-2">🎯</span>
          <h3 className="font-bold text-lg mb-1 text-gray-800">Precisión en español</h3>
          <p className="text-gray-700 text-sm">Optimizado para textos de España y LATAM. Resultados confiables y explicados.</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
          <span className="text-3xl mb-2">🔒</span>
          <h3 className="font-bold text-lg mb-1 text-gray-800">Privacidad total</h3>
          <p className="text-gray-700 text-sm">Tus textos no se guardan ni comparten. 100% privado y seguro.</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
          <span className="text-3xl mb-2">⚡</span>
          <h3 className="font-bold text-lg mb-1 text-gray-800">Sin registro</h3>
          <p className="text-gray-700 text-sm">Analizá textos gratis, sin crear cuenta. Análisis ilimitados.</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
          <span className="text-3xl mb-2">📊</span>
          <h3 className="font-bold text-lg mb-1 text-gray-800">Reportes avanzados</h3>
          <p className="text-gray-700 text-sm">Planes premium con archivos, historial y reportes detallados.</p>
        </div>
      </section>

      {/* SECCIÓN DE BENEFICIOS */}
      <section className="max-w-5xl mx-auto mb-12 px-2">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-[#7c3aed] mb-8">¿Para quién es DetectordeIA.ai?</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
            <span className="text-3xl mb-2">🎓</span>
            <h3 className="font-bold text-lg mb-1 text-gray-800">Estudiantes</h3>
            <p className="text-gray-700 text-sm">Verificá la originalidad de tus trabajos y evitá problemas académicos.</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
            <span className="text-3xl mb-2">👩‍🏫</span>
            <h3 className="font-bold text-lg mb-1 text-gray-800">Docentes</h3>
            <p className="text-gray-700 text-sm">Detectá IA en exámenes, ensayos y tareas. Herramienta confiable para educación.</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
            <span className="text-3xl mb-2">🏢</span>
            <h3 className="font-bold text-lg mb-1 text-gray-800">Empresas</h3>
            <p className="text-gray-700 text-sm">Controlá la autenticidad de informes y comunicaciones.</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
            <span className="text-3xl mb-2">✍️</span>
            <h3 className="font-bold text-lg mb-1 text-gray-800">Creadores de contenido</h3>
            <p className="text-gray-700 text-sm">Asegurá la originalidad y mejorá tu posicionamiento en buscadores.</p>
          </div>
        </div>
      </section>

      {/* SECCIÓN FAQ SEO */}
      <section className="max-w-5xl mx-auto mb-20 px-2">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-[#7c3aed] mb-8">Preguntas frecuentes sobre el detector de IA</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">¿Qué tan preciso es DetectordeIA.ai?</h3>
            <p className="text-gray-700 text-sm mb-4">Optimizado para español, utiliza IA avanzada y validación con Perplexity. Ideal para educación, empresas y creadores.</p>
            <h3 className="font-bold text-lg mb-2 text-gray-800">¿Se guarda o comparte mi texto?</h3>
            <p className="text-gray-700 text-sm mb-4">No. Los textos analizados sin login no se almacenan ni comparten.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">¿Puedo analizar archivos o textos largos?</h3>
            <p className="text-gray-700 text-sm mb-4">Sí, en los planes premium podés subir archivos y analizar hasta 50.000 caracteres.</p>
            <h3 className="font-bold text-lg mb-2 text-gray-800">¿Cómo funciona el plan gratuito?</h3>
            <p className="text-gray-700 text-sm mb-4">Hasta 1.200 caracteres por análisis, análisis ilimitados, sin registro.</p>
          </div>
        </div>
      </section>

      {/* Modal Premium para límite de caracteres excedido */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowPremiumModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Límite alcanzado</h3>
              <button
                onClick={() => setShowPremiumModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                aria-label="Cerrar modal"
              >
                ×
              </button>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 mb-3">
                El plan gratuito permite analizar hasta <strong>{CHARACTER_LIMIT} caracteres</strong> por análisis.
              </p>
              <p className="text-gray-700 mb-4">
                Tu texto tiene <strong className="text-red-600">{text.length} caracteres</strong>.
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <span>🔓</span> Con el plan Premium:
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Análisis sin límite de caracteres</li>
                  <li>• Análisis por criterios y explicaciones detalladas</li>
                  <li>• Subida de archivos .txt, .docx, .pdf</li>
                  <li>• Acceso vía API</li>
                  <li>• Desde $7/mes</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="/pricing"
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all text-center"
              >
                🔓 Actualizar a Premium
              </a>
              <button
                onClick={() => setShowPremiumModal(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-xl transition-all"
              >
                Cerrar
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-3">📝 Te avisaremos cuando los planes estén disponibles</p>
          </div>
        </div>
      )}

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
    </div>
  );
} 