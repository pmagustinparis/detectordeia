import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MIN_CHARACTERS = 50;
const MAX_CHARACTERS_FREE = 600;
const MAX_CHARACTERS_ABSOLUTE = 15000; // Límite absoluto (premium futuro)

export async function POST(request: Request) {
  try {
    const { text, mode = 'standard' } = await request.json();

    // Validaciones
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'El texto es requerido' },
        { status: 400 }
      );
    }

    if (text.length < MIN_CHARACTERS) {
      return NextResponse.json(
        { error: `El texto debe tener al menos ${MIN_CHARACTERS} caracteres` },
        { status: 400 }
      );
    }

    if (text.length > MAX_CHARACTERS_ABSOLUTE) {
      return NextResponse.json(
        { error: `El texto no puede exceder los ${MAX_CHARACTERS_ABSOLUTE} caracteres` },
        { status: 400 }
      );
    }

    // Detectar si excede el límite free (pero NO rechazar)
    const exceededFreeLimit = text.length > MAX_CHARACTERS_FREE;

    // Prompt de humanización (Modo Estándar)
    const systemPrompt = `Eres un experto en reescritura de textos especialmente diseñado para humanizar contenido generado por inteligencia artificial en español. Tu objetivo es transformar texto que suena robótico o artificial en contenido que suena natural y humano, manteniendo EXACTAMENTE el mismo significado, mensaje e ideas del texto original.

REGLAS ESTRICTAS:
1. NUNCA cambies el significado, mensaje o ideas del texto original
2. NUNCA añadas información que no esté en el texto original
3. NUNCA elimines información importante del texto original
4. Mantén el mismo tono general (formal, informal, técnico, etc.)
5. Mantén aproximadamente la misma longitud (±10%)

TÉCNICAS DE HUMANIZACIÓN:
1. Elimina frases cliché típicas de IA:
   - "Cabe destacar que..."
   - "Es importante mencionar..."
   - "En conclusión..."
   - "A continuación..."
   - "Cabe señalar..."
   - "Es fundamental..."
   - "Sin lugar a dudas..."
   - "En este sentido..."

2. Varía la longitud de las oraciones:
   - Las IA tienden a usar oraciones de longitud similar
   - Alterna entre oraciones cortas y largas
   - Crea ritmo en la lectura

3. Reduce estructuras repetitivas:
   - Si el texto usa "Primero... Segundo... Tercero...", varía la estructura
   - Evita patrones predecibles

4. Añade naturalidad:
   - Usa contracciones cuando sea natural
   - Varía los conectores (además, también, asimismo → mezcla)
   - Usa sinónimos apropiados para evitar repetición

5. Mantén un español neutro:
   - Comprensible en toda Latinoamérica y España
   - Evita modismos muy específicos de un país
   - Usa vocabulario estándar

FORMATO DE RESPUESTA:
Responde ÚNICAMENTE con el texto humanizado, sin explicaciones, sin comentarios adicionales, sin encabezados. Solo el texto transformado.`;

    const userPrompt = `TEXTO A HUMANIZAR:
${text}

TEXTO HUMANIZADO:`;

    // Llamada a OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2048,
    });

    const humanizedText = completion.choices[0].message.content?.trim();

    if (!humanizedText) {
      return NextResponse.json(
        { error: 'No se pudo generar el texto humanizado' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      humanizedText: humanizedText,
      mode: mode
    });

  } catch (error) {
    console.error('Error humanizing text:', error);
    return NextResponse.json(
      { error: 'Error al humanizar el texto. Por favor, intenta nuevamente.' },
      { status: 500 }
    );
  }
}
