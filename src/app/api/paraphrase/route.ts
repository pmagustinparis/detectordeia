import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/tracking/checkRateLimit';
import { trackUsage } from '@/lib/tracking/trackUsage';
import { saveToHistory } from '@/lib/history/saveToHistory';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MIN_CHARACTERS = 50;
const MAX_CHARACTERS_FREE = 600;
const MAX_CHARACTERS_ABSOLUTE = 15000; // Límite absoluto (premium futuro)

export async function POST(request: Request) {
  try {
    const { text, mode = 'standard', anonymousId } = await request.json();

    // Obtener userId si está autenticado
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id || null;

    // 🚨 RATE LIMITING CHECK
    const rateLimit = await checkRateLimit({
      userId: userId || undefined,
      anonymousId: anonymousId || undefined,
      toolType: 'parafraseador',
    });

    // Si alcanzó el límite, retornar 429
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Límite diario alcanzado',
          message:
            rateLimit.userType === 'anonymous'
              ? `Usaste tus ${rateLimit.limit} paráfrasis gratis hoy. Regístrate para obtener ${50} paráfrasis diarias.`
              : `Alcanzaste el límite de ${rateLimit.limit} paráfrasis diarias. Vuelve mañana o actualiza a Premium.`,
          limit: rateLimit.limit,
          remaining: rateLimit.remaining,
          resetAt: rateLimit.resetAt,
          userType: rateLimit.userType,
        },
        {
          status: 429,
          headers: getRateLimitHeaders(rateLimit),
        }
      );
    }

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

    // Prompt de parafraseo (Modo Estándar)
    const systemPrompt = `Eres un experto parafraseador de textos en español. Tu objetivo es reescribir textos usando sinónimos apropiados y reestructurando oraciones, manteniendo EXACTAMENTE el mismo significado original.

REGLAS ESTRICTAS:
1. NUNCA cambies el significado del texto
2. NUNCA añadas información que no esté en el original
3. NUNCA elimines información importante
4. Mantén el mismo tono general (formal, informal, técnico)
5. Mantén aproximadamente la misma longitud (±10%)

TÉCNICAS DE PARAFRASEO:

1. Sustitución de sinónimos:
   - Usa sinónimos contextuales apropiados
   - Respeta el nivel de formalidad
   - NO uses sinónimos forzados que suenen raros
   - Ejemplo: "importante" → "relevante", "significativo", "crucial"

2. Reestructuración de oraciones:
   - Cambia voz activa ↔ pasiva cuando sea natural
   - Reorganiza cláusulas sin alterar el sentido
   - Ejemplo: "El autor escribió el libro" → "El libro fue escrito por el autor"

3. Cambio de estructuras gramaticales:
   - Varía conectores (sin embargo, no obstante, aunque)
   - Alterna construcciones (gerundios, infinitivos, cláusulas)
   - Mantén coherencia y fluidez

4. Mantén elementos clave:
   - NO cambies nombres propios
   - NO cambies fechas, números o datos específicos
   - NO cambies términos técnicos sin sinónimos equivalentes

5. Español neutro:
   - Comprensible en toda Hispanoamérica y España
   - Evita modismos muy regionales
   - Vocabulario estándar

NIVEL DE CAMBIO:
Moderado - Cambia entre 40-60% del texto. El resultado debe ser claramente diferente del original, pero reconocible como el mismo contenido.

FORMATO DE RESPUESTA:
Responde ÚNICAMENTE con el texto parafraseado, sin explicaciones, sin comentarios adicionales, sin encabezados. Solo el texto transformado.`;

    const userPrompt = `TEXTO A PARAFRASEAR:
${text}

TEXTO PARAFRASEADO:`;

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
      temperature: 0.45, // Ligeramente más alto que humanizador para más variación
      max_tokens: 2048,
    });

    const paraphrasedText = completion.choices[0].message.content?.trim();

    if (!paraphrasedText) {
      return NextResponse.json(
        { error: 'No se pudo generar el texto parafraseado' },
        { status: 500 }
      );
    }

    // ✅ TRACK USAGE - Registrar uso exitoso
    await trackUsage({
      userId: userId || undefined,
      anonymousId: anonymousId || undefined,
      toolType: 'parafraseador',
      characterCount: text.length,
      metadata: {
        mode,
        exceededFreeLimit,
      },
    });

    // 💾 SAVE TO HISTORY - Guardar en historial (solo usuarios autenticados)
    if (userId) {
      await saveToHistory({
        userId,
        toolType: 'parafraseador',
        inputText: text,
        outputText: paraphrasedText,
        characterCount: text.length,
        metadata: {
          mode,
          exceededFreeLimit,
        },
      });
    }

    // Retornar con headers de rate limit
    return NextResponse.json(
      {
        success: true,
        paraphrasedText: paraphrasedText,
        mode: mode,
        rateLimit: {
          remaining: rateLimit.remaining - 1,
          limit: rateLimit.limit,
          resetAt: rateLimit.resetAt,
        },
      },
      {
        headers: getRateLimitHeaders({
          ...rateLimit,
          remaining: rateLimit.remaining - 1,
        }),
      }
    );

  } catch (error) {
    console.error('Error paraphrasing text:', error);
    return NextResponse.json(
      { error: 'Error al parafrasear el texto. Por favor, intenta nuevamente.' },
      { status: 500 }
    );
  }
}
