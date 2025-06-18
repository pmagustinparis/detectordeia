'use client';

import { useState, useEffect, useRef } from 'react';
import PremiumUpsellBlock from './PremiumUpsellBlock';
import PremiumUpsellCompact from './PremiumUpsellCompact';
import FeedbackBlock from './FeedbackBlock';

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

const DAILY_LIMIT = 10;
const STORAGE_KEY = 'analyze-usage';

function getTodayKey() {
  const today = new Date();
  return today.toISOString().slice(0, 10);
}

function getUsage() {
  if (typeof window === 'undefined') return 0;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return 0;
  try {
    const data = JSON.parse(raw);
    return data[getTodayKey()] || 0;
  } catch {
    return 0;
  }
}

function incrementUsage() {
  if (typeof window === 'undefined') return;
  const raw = localStorage.getItem(STORAGE_KEY);
  let data: Record<string, number> = {};
  if (raw) {
    try {
      data = JSON.parse(raw) as Record<string, number>;
    } catch {
      data = {};
    }
  }
  const today = getTodayKey();
  data[today] = (data[today] || 0) + 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

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
  cta: 'Ver Planes',
  aviso: '📝 Te avisaremos cuando los planes estén disponibles',
};
const premiumCompactTextos = {
  titulo: '¿Querés análisis premium?',
  bullets: [
    'Análisis por criterios y explicaciones detalladas',
    'Subida de archivos y API',
    'Desde $7/mes',
  ],
  cta: 'Ver Planes',
  aviso: '📝 Te avisaremos cuando estén disponibles',
};

export default function DetectorMain({
  h1 = 'Detector de IA en Español',
  subtitle = 'Detecta si un texto fue escrito por inteligencia artificial con precisión líder en español. Analiza, sube archivos y obtén resultados confiables en segundos. Sin registro, sin fricción, 100% privado.'
}: {
  h1?: string;
  subtitle?: string;
}) {
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
  const [usage, setUsage] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  const detectorRef = useRef<HTMLDivElement>(null);
  const [textType, setTextType] = useState('default');
  const [feedbackSent, setFeedbackSent] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const current = getUsage();
      setUsage(current);
      setLimitReached(current >= DAILY_LIMIT);
    }
  }, []);

  const getCounterColor = () => {
    if (text.length > 5000) return 'text-red-600';
    if (text.length > 4800) return 'text-yellow-600';
    return 'text-gray-500';
  };

  const handleAnalyze = async () => {
    if (limitReached) return;
    if (text.length < 250) {
      setError('El texto debe tener al menos 250 caracteres');
      return;
    }
    if (text.length > 5000) {
      setError('El texto no puede exceder los 5000 caracteres');
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
      incrementUsage();
      const current = getUsage();
      setUsage(current);
      setLimitReached(current >= DAILY_LIMIT);
      setFeedbackSent(false);
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

  return (
    <section className="w-full bg-transparent flex flex-col items-center justify-center pt-6 pb-2 px-2">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#7c3aed] mb-2 tracking-tight leading-tight">{h1}</h1>
      <p className="text-base md:text-lg text-gray-800 mb-3 max-w-2xl mx-auto">{subtitle}</p>
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
              maxLength={5000}
              aria-label="Texto a analizar"
            />
          </div>
          <div className="flex justify-between items-center text-base text-gray-800 mt-0 mb-1 gap-2">
            <span>{text.length}/5000</span>
            <span>Usos: {usage} / 10</span>
            <button
              onClick={handleClear}
              className="text-[#7c3aed] ml-2 hover:underline transition-all disabled:opacity-40"
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
          {limitReached && (
            <div className="flex flex-col items-center gap-2 p-2 bg-red-50 rounded-lg border border-red-200 mt-1">
              <span className="text-red-700 font-semibold flex items-center gap-2 text-xs"><span>🚫</span>Has alcanzado el límite de {DAILY_LIMIT} análisis gratuitos hoy.</span>
              <a href="/pricing" className="mt-1 bg-[#7c3aed] hover:bg-[#5b21b6] text-white font-bold py-1 px-3 rounded-xl shadow-md transition-all text-xs">Ver Planes</a>
            </div>
          )}
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || text.length < 250 || text.length > 5000 || limitReached}
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
                  {typeof result.semanticSimilarity === 'number' && (
                    <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold" title="Similitud IA: compara tu texto con una plantilla típica de IA usando IA avanzada.\nAlto (>0.85): posible paráfrasis de IA.\nBajo (<0.8): texto más original o humano.">
                      Similitud IA: <span className="ml-1 font-bold">{result.semanticSimilarity}</span>
                      <span className="ml-1 text-gray-400">❓</span>
                    </span>
                  )}
                </div>
                {/* Próximamente: Reescribir como texto humano */}
                <div className="bg-gray-100 text-gray-500 rounded-lg px-4 py-2 text-sm font-medium mb-2">
                  Próximamente: Reescribir como texto humano 🤖➡️👤
                </div>
                <div className="text-xs text-gray-500 mt-2 mb-1">Ningún detector es 100% infalible. Usa el resultado como orientación.</div>
                {/* Bloque premium compacto al final cuando hay resultado */}
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
                    className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold py-2 px-4 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 mb-1 text-center"
                  >
                    <span>✨</span> Ver Planes
                  </a>
                </div>
                {/* Bloque de feedback */}
                {!feedbackSent && result && (
                  <FeedbackBlock
                    originalText={text}
                    result={result.probability}
                    onSent={() => setFeedbackSent(true)}
                  />
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
  );
} 