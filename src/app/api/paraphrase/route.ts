import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/tracking/checkRateLimit';
import { trackUsage } from '@/lib/tracking/trackUsage';
import { saveToHistory } from '@/lib/history/saveToHistory';
import { getParaphraserPrompt, PARAPHRASER_MODES, type ParaphraserMode } from '@/lib/prompts/paraphraser';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MIN_CHARACTERS = 50;
const MAX_CHARACTERS_FREE = 600;
const MAX_CHARACTERS_ABSOLUTE = 100000; // Límite absoluto ILIMITADO para PRO

export async function POST(request: Request) {
  try {
    const { text, mode = 'standard', anonymousId } = await request.json();

    // Validar que el modo sea válido
    if (!PARAPHRASER_MODES[mode as ParaphraserMode]) {
      return NextResponse.json(
        { error: 'Modo de parafraseo inválido' },
        { status: 400 }
      );
    }

    // Obtener userId si está autenticado
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id || null;

    // Obtener plan del usuario
    let userPlan: 'free' | 'premium' = 'free';
    if (userId) {
      const { data: userData } = await supabase
        .from('users')
        .select('plan_type')
        .eq('auth_id', userId)
        .single();

      if (userData && userData.plan_type === 'premium') {
        userPlan = 'premium';
      }
    }

    // 🔒 VALIDAR MODO PREMIUM
    const selectedMode = mode as ParaphraserMode;
    if (PARAPHRASER_MODES[selectedMode].isPremium && userPlan !== 'premium') {
      return NextResponse.json(
        {
          error: 'Modo premium requerido',
          message: `El modo "${PARAPHRASER_MODES[selectedMode].name}" requiere Plan Pro. Actualiza tu plan para acceder a todos los modos de parafraseo.`,
          mode: selectedMode,
          requiresPremium: true,
        },
        { status: 403 }
      );
    }

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
              ? `Usaste tus ${rateLimit.limit} paráfrasis gratis hoy. Regístrate para obtener más paráfrasis diarias.`
              : `Alcanzaste el límite de ${rateLimit.limit} paráfrasis diarias. Vuelve mañana o actualiza a Pro para paráfrasis ilimitadas.`,
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

    // Límites de caracteres según plan
    const CHARACTER_LIMITS = {
      free: 600,
      premium: 100000, // ILIMITADO para PRO
    };

    const charLimit = CHARACTER_LIMITS[userPlan];

    if (text.length > charLimit) {
      return NextResponse.json(
        {
          error: userPlan === 'free'
            ? 'El texto excede el límite de 600 caracteres del plan Free. Actualiza a Pro para textos ilimitados.'
            : 'El texto excede el límite máximo permitido.',
          charLimit,
          currentLength: text.length,
        },
        { status: 400 }
      );
    }

    // Obtener prompt según el modo seleccionado
    const systemPrompt = getParaphraserPrompt(selectedMode);

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
        userPlan,
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
          userPlan,
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
