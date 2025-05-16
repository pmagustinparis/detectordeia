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

export async function POST(request: Request) {
  console.log("Usando GPT-4 Turbo"); // Debug temporal
  try {
    const { text } = await request.json();

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

    // Prompt profundo orientado a español
    const prompt = `Eres un sistema experto en detección de IA para textos en español (ES/LA), con especialización en registros formales e informales. Sigue este protocolo:

1. Análisis por Capas Lingüísticas:
   - Fonética: ¿El texto refleja pronunciaciones o alofonías regionales?
   - Morfosintaxis: Analiza estructuras gramaticales humanas (errores, frases no cerradas).
   - Semántica: Evalúa la riqueza del contenido y uso de sinónimos o reformulaciones.
   - Pragmática: ¿El texto expresa opiniones, ambigüedad, intención real o subjetividad?

2. Asigna puntuación (0–25) para cada capa:
{
  "scores": {
    "phonetic": number,
    "morphoSyntax": number,
    "semantic": number,
    "pragmatic": number
  },
  "probability": number (0 a 100),
  "confidenceLevel": "low" | "medium" | "high",
  "suspiciousPhrases": [{
    "phrase": string,
    "reason": string
  }]
}

Ejemplos de frases NO sospechosas:
- "voy a buscar espacio"
- "la solución no me convence"
- "ayer me pasó algo similar"

Texto a analizar:
"""${text}"""`;

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

    // Validar estructura esperada
    if (
      typeof analysis.probability !== 'number' ||
      typeof analysis.scores !== 'object' ||
      typeof analysis.scores.phonetic !== 'number' ||
      typeof analysis.scores.morphoSyntax !== 'number' ||
      typeof analysis.scores.semantic !== 'number' ||
      typeof analysis.scores.pragmatic !== 'number' ||
      !Array.isArray(analysis.suspiciousPhrases)
    ) {
      return NextResponse.json(
        { error: 'La respuesta de OpenAI no tiene el formato esperado.' },
        { status: 500 }
      );
    }

    // Filtrar frases sospechosas irrelevantes
    const filteredPhrases = filterPhrases(analysis.suspiciousPhrases);

    return NextResponse.json({
      probability: analysis.probability,
      scores: analysis.scores,
      suspiciousPhrases: filteredPhrases.map(p => p.phrase), // Mantener compatibilidad con frontend actual
      // confidenceLevel: analysis.confidenceLevel // Comentado para implementación futura
    });
  } catch (error) {
    console.error('Error analyzing text:', error);
    return NextResponse.json(
      { error: 'Error al analizar el texto' },
      { status: 500 }
    );
  }
} 