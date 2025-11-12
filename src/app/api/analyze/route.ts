import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { improvedFreeAnalysis } from '@/lib/analysis/multiPassAnalysis';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Nueva función de filtrado de frases sospechosas
function filterPhrases(phrases: Array<{ phrase: string; reason: string }>) {
  const blacklist = ["solución", "eficaz", "optimizar"];
  return phrases.filter(p =>
    p.phrase.split(" ").length >= 4 &&
    !blacklist.some(b => p.phrase.toLowerCase().includes(b))
  );
}

// Preprocesamiento avanzado antes del análisis
function enhancePreprocessing(text: string): string {
  // Modismos comunes que suelen ser ignorados por GPT
  const regionalisms = [
    "che", "laburo", "pibe", "re bien", "posta", "chau", "dale", "vale", "tío", "currar", "flipar"
  ];
  regionalisms.forEach(word => {
    text = text.replace(new RegExp(`\\b${word}\\b`, "gi"), `«${word}»`);
  });
  // Limpieza de muletillas que inducen error
  text = text.replace(/\b(aquí|eso|este)\b/gi, "");
  return text;
}

// Función para calcular la entropía del texto
function calculateEntropy(text: string): number {
  const tokens = text.split(/\s+/).filter(Boolean);
  const freq: Record<string, number> = {};
  tokens.forEach(token => {
    freq[token] = (freq[token] || 0) + 1;
  });
  const total = tokens.length;
  const probabilities = Object.values(freq).map(f => f / total);
  const entropy = -probabilities.reduce((sum, p) => sum + p * Math.log2(p), 0);
  return parseFloat(entropy.toFixed(2));
}

function getInterpretation(prob: number, type: string, entropyScore?: number) {
  // Interpretaciones basadas en métricas cuantitativas
  let quantitativeNote = "";
  if (entropyScore !== undefined) {
    if (entropyScore < 3.5) {
      quantitativeNote = " El texto es extremadamente repetitivo (entropía baja), lo que es típico de IA.";
    } else if (entropyScore > 5.5) {
      quantitativeNote = " El texto muestra alta variabilidad, indicando autoría humana.";
    }
  }

  if (type === "academic") {
    if (prob >= 85) return "Muy probablemente generado por IA. El texto muestra patrones típicos de IA incluso para contenido académico." + quantitativeNote;
    if (prob >= 60) return "Probablemente IA, pero la estructura formal académica puede confundir el análisis." + quantitativeNote;
    if (prob >= 40) return "No concluyente. Los textos académicos suelen tener estructura rígida que puede parecer IA." + quantitativeNote;
    if (prob >= 20) return "Probablemente humano, con estilo académico natural." + quantitativeNote;
    return "Muy probablemente escrito por un humano con estilo académico formal." + quantitativeNote;
  } else if (type === "informal") {
    if (prob >= 85) return "Muy probablemente generado por IA. El texto es demasiado perfecto para ser conversacional." + quantitativeNote;
    if (prob >= 60) return "Probablemente IA, aunque algunos patrones informales están presentes." + quantitativeNote;
    if (prob >= 40) return "No concluyente. Mezcla de elementos informales y patrones sospechosos." + quantitativeNote;
    if (prob >= 20) return "Probablemente humano, con estilo conversacional natural." + quantitativeNote;
    return "Muy probablemente escrito por un humano con lenguaje informal y espontáneo." + quantitativeNote;
  } else {
    // Tipo por defecto
    if (prob >= 85) return "Muy probablemente generado por IA." + quantitativeNote;
    if (prob >= 60) return "Probablemente IA, pero podría ser humano." + quantitativeNote;
    if (prob >= 40) return "No concluyente, posible mezcla o texto reformulado." + quantitativeNote;
    if (prob >= 20) return "Probablemente humano, pero con patrones sospechosos." + quantitativeNote;
    return "Muy probablemente escrito por un humano." + quantitativeNote;
  }
}

// Nueva función para ajustar probabilidad según tipo de texto
function adjustProbabilityByTextType(
  probability: number,
  textType: string,
  scores: { markersIA: number; markersHuman: number },
  entropyScore: number
): number {
  let adjustedProbability = probability;

  // Ajustes basados en entropía (independiente del tipo de texto)
  if (entropyScore < 3.5) {
    // Texto extremadamente repetitivo - muy probable IA
    adjustedProbability = Math.max(adjustedProbability, 80);
  } else if (entropyScore < 4.0) {
    // Texto muy repetitivo - probable IA
    adjustedProbability = Math.max(adjustedProbability, 70);
  } else if (entropyScore > 5.5) {
    // Texto muy variado - probable humano
    adjustedProbability = Math.min(adjustedProbability, 35);
  }

  // Ajustes específicos por tipo de texto
  if (textType === "academic") {
    // Para textos académicos, ser más permisivo con estructura rígida
    // pero más estricto con frases genéricas
    if (scores.markersIA >= 15 && scores.markersHuman >= 10) {
      // Si tiene muchos marcadores de ambos tipos, probablemente es humano
      adjustedProbability = Math.min(adjustedProbability, 45);
    } else if (scores.markersIA >= 18 && scores.markersHuman <= 8) {
      // Si tiene muchos marcadores IA y pocos humanos, mantener alto
      adjustedProbability = Math.max(adjustedProbability, 70);
    } else if (entropyScore < 4.0) {
      // Texto muy repetitivo
      adjustedProbability = Math.max(adjustedProbability, 70);
    } else {
      // Ajuste general para académicos: reducir falsos positivos
      adjustedProbability = Math.max(0, adjustedProbability - 8);
    }
  } else if (textType === "informal") {
    // Para textos informales, ser más permisivo con modismos y errores
    // pero más estricto con estructura perfecta
    if (scores.markersHuman >= 15 && scores.markersIA <= 12) {
      // Si tiene muchos marcadores humanos y pocos IA, es muy probable humano
      adjustedProbability = Math.min(adjustedProbability, 30);
    } else if (scores.markersIA >= 16 && scores.markersHuman <= 8) {
      // Si tiene muchos marcadores IA y pocos humanos, mantener alto
      adjustedProbability = Math.max(adjustedProbability, 65);
    } else if (entropyScore > 5.0) {
      // Texto muy variado
      adjustedProbability = Math.min(adjustedProbability, 35);
    } else {
      // Ajuste general para informales: reducir falsos negativos
      adjustedProbability = Math.min(100, adjustedProbability + 5);
    }
  }

  return Math.max(0, Math.min(100, adjustedProbability));
}

export async function POST(request: Request) {
  console.log("Usando GPT-3.5 Turbo"); // Debug temporal
  try {
    const { text, textType = "default" } = await request.json();

    // Validate input
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'El texto es requerido' },
        { status: 400 }
      );
    }

    if (text.length > 1200) {
      return NextResponse.json(
        { error: 'El texto no puede exceder los 1200 caracteres' },
        { status: 400 }
      );
    }

    // 🚀 NUEVO SISTEMA: Análisis mejorado con múltiples pasadas
    console.log('🔍 Iniciando análisis mejorado multi-pasada...');

    const isRegisteredUser = false; // En esta rama no hay auth todavía

    const analysis = await improvedFreeAnalysis(text, textType, isRegisteredUser);

    console.log(`✅ Análisis completado usando: ${analysis.usedModels.join(', ')}`);
    console.log(`📊 Detalles: Pass1=${analysis.analysisDetails.pass1Probability}%, Pass2=${analysis.analysisDetails.pass2Probability}%${analysis.analysisDetails.pass3Probability ? `, Pass3=${analysis.analysisDetails.pass3Probability}%` : ''}, Ajuste métricas=${analysis.analysisDetails.metricsAdjustment}`);

    const adjustedProbability = analysis.probability;
    const entropyScore = analysis.advancedMetrics.entropy || calculateEntropy(text);

    return NextResponse.json({
      probability: adjustedProbability,
      confidenceLevel: analysis.confidenceLevel,
      scores_by_category: analysis.scores_by_category,
      linguistic_footprints: analysis.linguistic_footprints,
      entropyScore,
      interpretation: getInterpretation(adjustedProbability, textType, entropyScore),
      // 🆕 Nueva información del análisis mejorado
      advancedMetrics: {
        perplexity: analysis.advancedMetrics.perplexity,
        lexicalDiversity: analysis.advancedMetrics.lexicalDiversity,
        ngramRepetition: analysis.advancedMetrics.ngramRepetition,
        sentenceVariance: analysis.advancedMetrics.sentenceVariance,
        punctuationConsistency: analysis.advancedMetrics.punctuationConsistency,
      },
      metricsInsights: analysis.metricsInsights,
      analysisQuality: {
        modelsUsed: analysis.usedModels,
        numberOfPasses: analysis.usedModels.length,
        usedPremiumModel: analysis.usedModels.includes('gpt-4o-mini'),
      },
    });
  } catch (error) {
    console.error('Error analyzing text:', error);
    return NextResponse.json(
      { error: 'Error al analizar el texto' },
      { status: 500 }
    );
  }
} 