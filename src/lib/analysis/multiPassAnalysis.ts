/**
 * Sistema de análisis multi-pasada para mejorar precisión
 */

import OpenAI from 'openai';
import { calculateAdvancedMetrics, getMetricsAdjustment, interpretMetrics } from './advancedMetrics';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface AnalysisResult {
  probability: number;
  confidenceLevel: 'low' | 'medium' | 'high';
  scores_by_category: {
    markersIA: number;
    markersHuman: number;
  };
  linguistic_footprints: Array<{ phrase: string; reason: string }>;
  model: 'gpt-3.5-turbo' | 'gpt-4o-mini';
}

/**
 * Prompt principal para detección de IA (optimizado)
 */
function getMainAnalysisPrompt(text: string): string {
  return `Eres un detector especializado en textos en español (España y LATAM). Determina si fue generado por IA o escrito por un humano.

PATRONES IA ESPECÍFICOS (0-25 puntos):
1. Frases cliché:
   - "cabe destacar que", "es importante mencionar", "en conclusión"
   - "a continuación", "sin lugar a dudas", "en este sentido"
   - "por lo tanto", "en primer lugar", "resulta evidente"
2. Estructura mecánica:
   - Introducción → desarrollo → conclusión perfecta
   - Transiciones predecibles: "por otro lado", "finalmente"
   - Párrafos de longitud muy uniforme
3. Gramática perfecta:
   - Cero errores tipográficos o gramaticales
   - Puntuación impecable y consistente
   - Uso formal excesivo sin variación
4. Genericidad:
   - Ideas abstractas sin ejemplos concretos
   - Vocabulario técnico sin personalidad
   - Falta de opiniones subjetivas

PATRONES HUMANOS ESPECÍFICOS (0-25 puntos):
1. Imperfecciones naturales:
   - Errores tipográficos ocasionales
   - Faltas gramaticales menores
   - Cambios de tema abruptos
2. Expresividad:
   - Modismos regionales: "che", "vos", "pibe", "re", "boludo", "tío", "flipar"
   - Opiniones personales sin justificar
   - Emociones explícitas (enojo, alegría, frustración)
3. Estilo informal:
   - Mezcla de registros (formal/informal)
   - Digresiones y paréntesis
   - Preguntas retóricas
4. Variación:
   - Longitud de oraciones muy variada
   - Cambios de ritmo narrativo
   - Puntuación irregular

EJEMPLOS:

Texto IA (alta probabilidad):
"Es importante mencionar que la inteligencia artificial representa un avance significativo. En este sentido, cabe destacar que sus aplicaciones son diversas. Por lo tanto, resulta evidente que su impacto será considerable."

Texto Humano (baja probabilidad):
"Mira, la IA está re copada pero tampoco es que vaya a resolver todo. Hay gente que flashea demasiado con esto. A ver, sí, es útil... pero bueno, ya vamos a ver qué pasa."

TEXTO A ANALIZAR:
"""${text}"""

Responde en formato JSON:
{
  "probability": number,
  "confidenceLevel": "low" | "medium" | "high",
  "scores_by_category": {
    "markersIA": number,
    "markersHuman": number
  },
  "linguistic_footprints": [
    { "phrase": string, "reason": string }
  ]
}

IMPORTANTE: En "linguistic_footprints", SOLO incluye frases que aparecen LITERALMENTE en el texto analizado arriba. NO inventes frases ni parafrasees. Copia EXACTAMENTE las frases sospechosas del texto original. Si no hay frases específicas sospechosas, devuelve un array vacío [].`;
}

/**
 * Prompt de validación (enfoque diferente)
 */
function getValidationPrompt(text: string): string {
  return `Eres un validador de análisis de texto. Tu trabajo es evaluar si este texto fue escrito por humano o IA usando un enfoque diferente.

ENFOQUE DE VALIDACIÓN:
Enfócate en lo que la IA NO PUEDE hacer bien:

1. Errores humanos naturales:
   - ¿Hay inconsistencias lógicas menores?
   - ¿Hay repeticiones innecesarias?
   - ¿Cambios de tiempo verbal inesperados?

2. Contexto cultural:
   - ¿Usa referencias culturales específicas?
   - ¿Menciona experiencias personales concretas?
   - ¿Hay jerga muy específica de una región?

3. Emocionalidad:
   - ¿Expresa frustración, alegría, enojo genuino?
   - ¿Usa exageraciones o hipérboles?
   - ¿Hay sarcasmo o ironía?

4. Estilo caótico:
   - ¿Oraciones incompletas o fragmentadas?
   - ¿Ideas que no siguen un orden perfecto?
   - ¿Puntuación irregular o creativa?

Si el texto tiene MUCHAS de estas características → Probable humano (baja probabilidad IA)
Si el texto es perfecto, formal, estructurado → Probable IA (alta probabilidad)

TEXTO:
"""${text}"""

Responde en JSON:
{
  "probability": number,
  "confidenceLevel": "low" | "medium" | "high",
  "scores_by_category": {
    "markersIA": number,
    "markersHuman": number
  },
  "linguistic_footprints": [
    { "phrase": string, "reason": string }
  ]
}

IMPORTANTE: En "linguistic_footprints", SOLO incluye frases que aparecen LITERALMENTE en el texto analizado arriba. NO inventes frases ni parafrasees. Copia EXACTAMENTE las frases del texto original. Si no hay frases específicas sospechosas, devuelve un array vacío [].`;
}

/**
 * Realiza análisis con GPT-3.5-turbo
 */
async function analyzeWithGPT35(prompt: string): Promise<AnalysisResult> {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'Eres un analizador de textos que responde en formato JSON.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.3,
    max_tokens: 2048,
    response_format: { type: 'json_object' },
  });

  const result = JSON.parse(completion.choices[0].message.content || '{}');
  return {
    ...result,
    model: 'gpt-3.5-turbo',
  };
}

/**
 * Realiza análisis con GPT-4o-mini (modelo superior)
 */
async function analyzeWithGPT4oMini(prompt: string): Promise<AnalysisResult> {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'Eres un analizador experto de textos que responde en formato JSON.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.2,
    max_tokens: 3000,
    response_format: { type: 'json_object' },
  });

  const result = JSON.parse(completion.choices[0].message.content || '{}');
  return {
    ...result,
    model: 'gpt-4o-mini',
  };
}

/**
 * Combina múltiples análisis con pesos inteligentes (FASE 2 - actualizado para 4 passes)
 */
function combineAnalysisResults(
  analysis1: AnalysisResult,
  analysis2: AnalysisResult,
  analysis3: AnalysisResult,
  analysis4: AnalysisResult | null,
  metricsAdjustment: number
): {
  probability: number;
  confidenceLevel: 'low' | 'medium' | 'high';
  usedModels: string[];
} {
  const results = [analysis1, analysis2, analysis3];
  if (analysis4) results.push(analysis4);

  // Calcular probabilidad promedio con pesos
  let totalWeight = 0;
  let weightedSum = 0;

  results.forEach((result, index) => {
    // FASE 2: Todos son GPT-4o-mini ahora, peso base igual
    const baseWeight = 1.0;
    // Primera análisis tiene ligeramente más peso (prompt principal)
    const indexWeight = index === 0 ? 1.2 : 1.0;
    // Cuarto análisis (desempate) tiene peso extra
    const tiebreakWeight = index === 3 ? 1.3 : 1.0;
    const finalWeight = baseWeight * indexWeight * tiebreakWeight;

    weightedSum += result.probability * finalWeight;
    totalWeight += finalWeight;
  });

  let probability = weightedSum / totalWeight;

  // Aplicar ajuste de métricas
  probability = Math.max(0, Math.min(100, probability + metricsAdjustment));

  // Calcular nivel de confianza basado en dispersión
  const probabilities = results.map(r => r.probability);
  const mean = probabilities.reduce((a, b) => a + b, 0) / probabilities.length;
  const variance = probabilities.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / probabilities.length;
  const stdDev = Math.sqrt(variance);

  let confidenceLevel: 'low' | 'medium' | 'high';
  if (stdDev < 8) {
    confidenceLevel = 'high'; // Los análisis coinciden mucho
  } else if (stdDev < 15) {
    confidenceLevel = 'medium';
  } else {
    confidenceLevel = 'low'; // Los análisis difieren mucho
  }

  const usedModels = results.map(r => r.model);

  return {
    probability: Math.round(probability),
    confidenceLevel,
    usedModels,
  };
}

/**
 * Sistema de análisis mejorado FREE (FASE 2)
 * - Triple validación con GPT-4o-mini SIEMPRE (100% de análisis)
 * - 4to pass automático si divergencia > 25 puntos
 * - Métricas avanzadas
 * - Scoring ponderado por importancia de footprints
 */
export async function improvedFreeAnalysis(
  text: string,
  textType: string = 'default',
  isRegisteredUser: boolean = false
): Promise<{
  probability: number;
  confidenceLevel: 'low' | 'medium' | 'high';
  scores_by_category: {
    markersIA: number;
    markersHuman: number;
  };
  linguistic_footprints: Array<{ phrase: string; reason: string }>;
  advancedMetrics: any;
  metricsInsights: string[];
  usedModels: string[];
  analysisDetails: {
    pass1Probability: number;
    pass2Probability: number;
    pass3Probability: number;
    pass4Probability?: number;
    metricsAdjustment: number;
  };
}> {
  // PASO 1: Análisis principal con GPT-4o-mini (MEJORADO - antes GPT-3.5)
  const mainPrompt = getMainAnalysisPrompt(text);
  const analysis1 = await analyzeWithGPT4oMini(mainPrompt);

  // PASO 2: Validación cruzada con GPT-4o-mini (MEJORADO - antes GPT-3.5)
  const validationPrompt = getValidationPrompt(text);
  const analysis2 = await analyzeWithGPT4oMini(validationPrompt);

  // PASO 3: Tercer análisis SIEMPRE con GPT-4o-mini (MEJORADO - antes condicional)
  const analysis3 = await analyzeWithGPT4oMini(mainPrompt);

  // PASO 4: Calcular métricas avanzadas
  const advancedMetrics = calculateAdvancedMetrics(text);
  const metricsAdjustment = getMetricsAdjustment(advancedMetrics);
  const metricsInsights = interpretMetrics(advancedMetrics);

  // PASO 5: Verificar si necesitamos 4to pass por alta divergencia
  const probabilities = [analysis1.probability, analysis2.probability, analysis3.probability];
  const maxProb = Math.max(...probabilities);
  const minProb = Math.min(...probabilities);
  const divergence = maxProb - minProb;

  let analysis4: AnalysisResult | null = null;

  // NUEVO: 4to pass de desempate si divergencia > 25 puntos
  if (divergence > 25) {
    // Usar prompt de validación para tener perspectiva diferente
    analysis4 = await analyzeWithGPT4oMini(validationPrompt);
  }

  // PASO 6: Combinar resultados
  const combined = combineAnalysisResults(analysis1, analysis2, analysis3, analysis4, metricsAdjustment);

  // PASO 7: Combinar scores y footprints (ACTUALIZADO para incluir 4to pass)
  const allResults = [analysis1, analysis2, analysis3];
  if (analysis4) allResults.push(analysis4);

  const avgMarkersIA = Math.round(
    allResults.reduce((sum, r) => sum + r.scores_by_category.markersIA, 0) / allResults.length
  );
  const avgMarkersHuman = Math.round(
    allResults.reduce((sum, r) => sum + r.scores_by_category.markersHuman, 0) / allResults.length
  );

  // FASE 2: Combinar footprints con SCORING PONDERADO por importancia
  interface WeightedFootprint {
    phrase: string;
    reason: string;
    weight: number;
    occurrences: number;
  }

  const footprintMap = new Map<string, WeightedFootprint>();

  allResults.forEach((result, analysisIndex) => {
    result.linguistic_footprints.forEach((fp, fpIndex) => {
      const existing = footprintMap.get(fp.phrase);

      // Calcular peso basado en:
      // 1. Posición en la lista (primeros son más relevantes): peso 3.0 a 1.0
      const positionWeight = fpIndex === 0 ? 3.0 : fpIndex === 1 ? 2.5 : fpIndex === 2 ? 2.0 : 1.5;

      // 2. Número de análisis que lo detectaron (consenso): +0.5 por cada aparición adicional
      const occurrenceBonus = existing ? 0.5 : 0;

      // 3. Análisis principal tiene más peso: 1.2x
      const analysisWeight = analysisIndex === 0 ? 1.2 : 1.0;

      const totalWeight = (positionWeight + occurrenceBonus) * analysisWeight;

      if (existing) {
        // Ya existe, incrementar occurrences y actualizar peso si es mayor
        existing.occurrences += 1;
        existing.weight = Math.max(existing.weight, totalWeight);
      } else {
        // Nuevo footprint
        footprintMap.set(fp.phrase, {
          phrase: fp.phrase,
          reason: fp.reason,
          weight: totalWeight,
          occurrences: 1,
        });
      }
    });
  });

  // Convertir a array y ordenar por peso (más peso = más importante)
  const weightedFootprints = Array.from(footprintMap.values()).sort((a, b) => b.weight - a.weight);

  // 🚨 VALIDACIÓN CRÍTICA: Filtrar footprints que NO aparecen en el texto original
  // Esto previene alucinaciones donde GPT inventa frases o incluye contenido del prompt
  const validatedFootprints = weightedFootprints.filter(fp => {
    if (!fp.phrase || fp.phrase.trim().length === 0) {
      return false; // Eliminar frases vacías
    }

    // Normalizar para comparación: minúsculas y sin espacios extra
    const normalizedText = text.toLowerCase().trim();
    const normalizedPhrase = fp.phrase.toLowerCase().trim();

    // Verificar que la frase aparece LITERALMENTE en el texto original
    const existsInText = normalizedText.includes(normalizedPhrase);

    // Log para debugging (solo en desarrollo)
    if (!existsInText && process.env.NODE_ENV === 'development') {
      console.warn(`⚠️ Footprint filtrado (no existe en texto): "${fp.phrase}"`);
    }

    return existsInText;
  });

  // Convertir de vuelta al formato esperado (sin el peso)
  const finalFootprints = validatedFootprints.slice(0, 8).map(wf => ({
    phrase: wf.phrase,
    reason: wf.reason,
  }));

  return {
    probability: combined.probability,
    confidenceLevel: combined.confidenceLevel,
    scores_by_category: {
      markersIA: avgMarkersIA,
      markersHuman: avgMarkersHuman,
    },
    linguistic_footprints: finalFootprints, // Ahora ordenados por importancia ponderada
    advancedMetrics,
    metricsInsights,
    usedModels: combined.usedModels,
    analysisDetails: {
      pass1Probability: analysis1.probability,
      pass2Probability: analysis2.probability,
      pass3Probability: analysis3.probability,
      pass4Probability: analysis4?.probability,
      metricsAdjustment,
    },
  };
}
