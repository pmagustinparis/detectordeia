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

    // Prompt robusto para detección de IA con awareness de ediciones mínimas y tipo de texto
    const prompt = `Sos un sistema experto en detección de textos generados por inteligencia artificial en español (ES y LATAM). Tu tarea es identificar si un texto fue generado por IA, **incluso si ha sido mínimamente modificado por un humano** (cambios de puntuación, saltos de línea, emojis, etc.).

Antes de evaluar el texto, considera esta declaración del usuario:
**Tipo de texto esperado:** Redacción formal / académica / ensayo / mensaje personal / artículo / otro. (En este MVP lo asumís como "general").

Tené en cuenta que:
- Los usuarios pueden intentar "disfrazar" textos generados por IA mediante ediciones mínimas.
- No debés penalizar un texto simplemente por estar bien escrito si eso es coherente con el estilo humano declarado.
- Muchos textos humanos pueden tener estructura limpia, conectores claros o buena ortografía, sin ser generados por IA.

### Análisis por Capas Lingüísticas:
1. **Variación Estilística (0–25):** ¿El texto muestra riqueza expresiva, cambios de ritmo, conectores variados?
2. **Subjetividad / Opinión (0–25):** ¿Incluye emociones, opiniones personales, perspectivas únicas?
3. **Errores Humanos Naturales (0–25):** ¿Hay erratas menores, construcciones imperfectas, frases truncadas?
4. **Coherencia Contextual (0–25):** ¿El texto fluye como una narración humana, con ideas no lineales o digresiones?

### Formato de respuesta en JSON (obligatorio):
{
  "probability": number (de 0 a 100),
  "scores": {
    "styleVariation": number,
    "subjectivity": number,
    "humanErrors": number,
    "contextualCoherence": number
  },
  "suspiciousPhrases": [{
    "phrase": string,
    "reason": string (explicación corta de por qué puede ser IA)
  }],
  "confidenceLevel": "low" | "medium" | "high"
}

### Ejemplos de frases que **NO** deberían considerarse sospechosas:
- "La solución fue bastante efectiva para todos"
- "Me pasó lo mismo la semana pasada"
- "Es un tema complejo, pero lo intento entender"

Analizá este texto considerando todo lo anterior:

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
      typeof analysis.scores.styleVariation !== 'number' ||
      typeof analysis.scores.subjectivity !== 'number' ||
      typeof analysis.scores.humanErrors !== 'number' ||
      typeof analysis.scores.contextualCoherence !== 'number' ||
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