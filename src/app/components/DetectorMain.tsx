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
  const [isLimitExceeded, setIsLimitExceeded] = useState(false);
  const detectorRef = useRef<HTMLDivElement>(null);
  const [textType, setTextType] = useState('default');
  const [feedbackSent, setFeedbackSent] = useState(false);

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
        setIsLimitExceeded(false);
        setFeedbackSent(false);
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
              aria-label="Texto a analizar"
            />
          </div>
          <div className="flex justify-between items-center text-base text-gray-800 mt-0 mb-1 gap-2">
            <span className={getCounterColor()}>{text.length}/{CHARACTER_LIMIT}</span>
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
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || text.length < 250}
            className={`mt-1 w-full bg-[#7c3aed] hover:bg-[#5b21b6] text-white py-2 rounded-xl font-bold text-base shadow-md transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
            aria-label="Detectar contenido de IA"
          >
            <span className="mr-2">🤖</span>
            {isAnalyzing ? 'Analizando...' : 'Analizar texto'}
          </button>
          <p className="text-center text-sm text-gray-800 mt-1">Sin registro. 100% privado. Precisión líder en español.</p>
        </div>
        {/* Result block (right) */}
        <div className="flex-1 flex flex-col gap-4 min-w-[320px]">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col min-h-[260px] justify-between relative">
            {/* Overlay premium cuando se excede el límite */}
            {isLimitExceeded && result && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10 p-6">
                <div className="text-center max-w-md">
                  <p className="text-red-600 font-semibold mb-3 text-sm flex items-center justify-center gap-2">
                    <span>⚠️</span> {text.length}/{CHARACTER_LIMIT} caracteres. Límite superado.
                  </p>
                  <p className="text-gray-700 mb-4 text-sm">
                    Para ver tu análisis completo y analizar sin límites, actualiza a Premium.
                  </p>
                  <a
                    href="/pricing"
                    className="inline-block w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all mb-3"
                  >
                    🔓 Actualizar ahora
                  </a>
                  <p className="text-xs text-gray-500">
                    📝 Te avisaremos cuando los planes estén disponibles
                  </p>
                </div>
              </div>
            )}

            <div className={isLimitExceeded && result ? "blur-sm pointer-events-none" : ""}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#7c3aed] text-xl">🛡️</span>
                <span className="font-bold text-gray-800 text-base">Resultado del análisis</span>
              </div>
              <span className="text-xs text-gray-600 mb-2">Análisis validado con tecnología avanzada para español</span>
            </div>
            {result ? (
              <div className={isLimitExceeded ? "blur-sm pointer-events-none" : ""}>
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
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 mb-2 text-center"
                  >
                    🔓 Desbloquear análisis avanzado
                  </a>
                  <p className="text-xs text-gray-500">Incluye explicaciones por frase, análisis por estilo y acceso a la API</p>
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
  );
} 