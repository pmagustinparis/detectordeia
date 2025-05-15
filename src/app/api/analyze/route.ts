import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Función para filtrar frases sospechosas irrelevantes
function filterPhrases(phrases: Array<{ phrase: string; reason: string }>) {
  return phrases.filter(p =>
    p.phrase.split(" ").length > 2 &&
    !["solución", "eficaz", "buscar espacio"].some(word => p.phrase.toLowerCase().includes(word))
  );
}

export async function POST(request: Request) {
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

    // Prompt mejorado para análisis de texto
    const prompt = `Eres un experto en lingüística computacional especializado en español (España y LATAM). Tu objetivo es detectar si un texto fue generado por inteligencia artificial (como ChatGPT) o por una persona humana.

🔍 Evalúa el texto en base a estos 4 niveles de análisis, asignando una puntuación de 0 a 25 para cada uno (máximo total: 100):

1. **Léxico y estilo informal**  
   - Humanos: presencia de modismos regionales, expresiones coloquiales, abreviaciones, emojis.  
   - IA: uso excesivamente correcto, palabras genéricas, estructura neutra.

2. **Estructura y ritmo sintáctico**  
   - Humanos: variación de longitud entre frases, errores de puntuación, estilo conversacional.  
   - IA: frases de longitud constante, puntuación perfecta, patrones repetitivos.

3. **Errores humanos naturales**  
   - Humanos: erratas, muletillas, autocorrecciones, cambios de tono.  
   - IA: lenguaje consistentemente estructurado, sin errores ni cambios inesperados.

4. **Subjetividad y autenticidad**  
   - Humanos: opiniones, emociones, uso de primera persona o referencias personales.  
   - IA: neutralidad excesiva, enfoque enciclopédico o demasiado factual.

⚠️ No marques como sospechosa una palabra aislada. Marca solo **frases de al menos 3 palabras**. Prioriza las que presenten rigidez estructural o neutralidad extrema.

IMPORTANTE: Responde SOLO con el siguiente JSON, sin texto adicional:

{
  "probability": number,
  "scores": {
    "lexical": number,
    "syntax": number,
    "humanErrors": number,
    "subjectivity": number
  },
  "suspiciousPhrases": [
    {
      "phrase": string,
      "reason": string
    }
  ],
  "confidenceLevel": "low" | "medium" | "high"
}

🧠 Ejemplos de frases que NO deben marcarse como sospechosas:
- "La solución es esta" (común en humanos)
- "Estoy viendo si puedo" (registro informal)
- "Me pasa siempre igual" (autenticidad)

✍️ Texto a analizar:
"""${text}"""`;

    // Call OpenAI API to analyze the text
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
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
      typeof analysis.scores.lexical !== 'number' ||
      typeof analysis.scores.syntax !== 'number' ||
      typeof analysis.scores.humanErrors !== 'number' ||
      typeof analysis.scores.subjectivity !== 'number' ||
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