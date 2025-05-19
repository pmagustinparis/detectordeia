import { NextResponse } from 'next/server';
import OpenAI from 'openai';

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

// Texto de referencia IA para embeddings
const iaReferenceText = "La implementación de soluciones estratégicas permite optimizar los procesos de manera eficaz y escalable.";

// Función para calcular similitud semántica usando embeddings de OpenAI
async function calculateSemanticSimilarity(text1: string, text2: string): Promise<number> {
  const [res1, res2] = await Promise.all([
    openai.embeddings.create({ model: "text-embedding-ada-002", input: text1 }),
    openai.embeddings.create({ model: "text-embedding-ada-002", input: text2 }),
  ]);
  const emb1 = res1.data[0].embedding;
  const emb2 = res2.data[0].embedding;
  const dot = emb1.reduce((sum, val, i) => sum + val * emb2[i], 0);
  const mag1 = Math.sqrt(emb1.reduce((sum, val) => sum + val * val, 0));
  const mag2 = Math.sqrt(emb2.reduce((sum, val) => sum + val * val, 0));
  const similarity = dot / (mag1 * mag2);
  return parseFloat(similarity.toFixed(4));
}

function getInterpretation(prob: number, type: string) {
  if (prob >= 85) return "Muy probablemente generado por IA.";
  if (prob >= 60) return "Probablemente IA, pero podría ser humano.";
  if (prob >= 40) return "No concluyente, posible mezcla o texto reformulado.";
  if (prob >= 20) return "Probablemente humano, pero con patrones sospechosos.";
  return "Muy probablemente escrito por un humano.";
}

export async function POST(request: Request) {
  console.log("Usando GPT-4 Turbo"); // Debug temporal
  try {
    const { text, textType = "default" } = await request.json();

    // Validate input
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'El texto es requerido' },
        { status: 400 }
      );
    }

    if (text.length > 5000) {
      return NextResponse.json(
        { error: 'El texto no puede exceder los 5000 caracteres' },
        { status: 400 }
      );
    }

    // Nuevo prompt avanzado y preprocesamiento
    const prompt = `Eres un detector especializado en textos en español contemporáneo (España y LATAM). Tu tarea es determinar si un texto fue generado por IA o escrito por un humano, usando criterios lingüísticos avanzados.\n\nEvalúa lo siguiente (0 a 25 puntos cada uno):\n\n1. **Marcadores de IA**:\n   - Frases genéricas como \"optimización de procesos estratégicos\"\n   - Estructura gramatical rígida o excesivamente limpia\n   - Bajo uso de conectores variados\n   - Falta de errores o ambigüedad típica del lenguaje humano\n\n2. **Marcadores Humanos**:\n   - Uso de modismos o expresiones locales (\"che\", \"re bien\", \"vos\", etc.)\n   - Subjetividad u opiniones personales\n   - Estilo informal o mezcla de registros\n   - Digresiones o estructuras parcialmente caóticas\n\n**Retorno esperado (en JSON):**\n{\n  \"probability\": number, // 0 a 100\n  \"confidenceLevel\": \"low\" | \"medium\" | \"high\",\n  \"scores_by_category\": {\n    \"markersIA\": number,\n    \"markersHuman\": number\n  },\n  \"linguistic_footprints\": [\n    { \"phrase\": string, \"reason\": string }\n  ]\n}\n\nTexto a analizar:\n\"\"\"${enhancePreprocessing(text)}\"\"\"`;

    // Call OpenAI API to analyze the text
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "Eres un analizador de textos que responde en formato JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2048,
      response_format: { type: "json_object" }
    });

    let analysis;
    try {
      analysis = JSON.parse(completion.choices[0].message.content || '{}');
    } catch (e) {
      return NextResponse.json(
        { error: 'La respuesta de OpenAI no es un JSON válido.' },
        { status: 500 }
      );
    }

    // Validar estructura esperada del nuevo output
    if (
      typeof analysis.probability !== 'number' ||
      !['low', 'medium', 'high'].includes(analysis.confidenceLevel) ||
      typeof analysis.scores_by_category !== 'object' ||
      typeof analysis.scores_by_category.markersIA !== 'number' ||
      typeof analysis.scores_by_category.markersHuman !== 'number' ||
      !Array.isArray(analysis.linguistic_footprints)
    ) {
      return NextResponse.json(
        { error: 'La respuesta de OpenAI no tiene el formato esperado.' },
        { status: 500 }
      );
    }

    // Calcular entropía y similitud semántica
    const entropyScore = calculateEntropy(text);
    const semanticSimilarity = await calculateSemanticSimilarity(text, iaReferenceText);
    // Ajuste de probabilidad según tipo de texto
    let adjustedProbability = analysis.probability;

    // --- Validación de coherencia para evitar falsos positivos ---
    const { markersIA, markersHuman } = analysis.scores_by_category;
    if (markersHuman >= 15 && markersIA <= 10 && adjustedProbability > 40) {
      adjustedProbability = 40;
    }
    if (markersIA >= 15 && markersHuman <= 10 && adjustedProbability < 60) {
      adjustedProbability = 60;
    }
    // ------------------------------------------------------------

    if (textType === "academic" && adjustedProbability >= 60) {
      adjustedProbability += 10;
    } else if (textType === "informal" && adjustedProbability <= 40) {
      adjustedProbability -= 10;
    }
    adjustedProbability = Math.max(0, Math.min(100, adjustedProbability));

    return NextResponse.json({
      probability: adjustedProbability,
      confidenceLevel: analysis.confidenceLevel,
      scores_by_category: analysis.scores_by_category,
      linguistic_footprints: analysis.linguistic_footprints,
      entropyScore,
      semanticSimilarity,
      interpretation: getInterpretation(adjustedProbability, textType)
    });
  } catch (error) {
    console.error('Error analyzing text:', error);
    return NextResponse.json(
      { error: 'Error al analizar el texto' },
      { status: 500 }
    );
  }
} 