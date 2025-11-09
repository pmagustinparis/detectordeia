import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/tracking/checkRateLimit';
import { trackUsage } from '@/lib/tracking/trackUsage';
import { saveToHistory } from '@/lib/history/saveToHistory';
import { getHumanizerPrompt, HUMANIZER_MODES, type HumanizerMode } from '@/lib/prompts/humanizer';

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

    // Validar que el modo sea válido
    if (!HUMANIZER_MODES[mode as HumanizerMode]) {
      return NextResponse.json(
        { error: 'Modo de humanización inválido' },
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
    const selectedMode = mode as HumanizerMode;
    if (HUMANIZER_MODES[selectedMode].isPremium && userPlan !== 'premium') {
      return NextResponse.json(
        {
          error: 'Modo premium requerido',
          message: `El modo "${HUMANIZER_MODES[selectedMode].name}" requiere Plan Pro. Actualiza tu plan para acceder a todos los modos de humanización.`,
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
      toolType: 'humanizador',
    });

    // Si alcanzó el límite, retornar 429
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Límite diario alcanzado',
          message:
            rateLimit.userType === 'anonymous'
              ? `Usaste tus ${rateLimit.limit} humanizaciones gratis hoy. Regístrate para obtener más humanizaciones diarias.`
              : `Alcanzaste el límite de ${rateLimit.limit} humanizaciones diarias. Vuelve mañana o actualiza a Pro para humanizaciones ilimitadas.`,
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
      premium: 15000,
    };

    const charLimit = CHARACTER_LIMITS[userPlan];

    if (text.length > charLimit) {
      return NextResponse.json(
        {
          error: userPlan === 'free'
            ? 'El texto excede el límite de 600 caracteres del plan Free. Actualiza a Pro para humanizar hasta 15,000 caracteres.'
            : 'El texto excede el límite de 15,000 caracteres.',
          charLimit,
          currentLength: text.length,
        },
        { status: 400 }
      );
    }

    // Obtener prompt según el modo seleccionado
    const systemPrompt = getHumanizerPrompt(selectedMode);

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

    // ✅ TRACK USAGE - Registrar uso exitoso
    await trackUsage({
      userId: userId || undefined,
      anonymousId: anonymousId || undefined,
      toolType: 'humanizador',
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
        toolType: 'humanizador',
        inputText: text,
        outputText: humanizedText,
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
        humanizedText: humanizedText,
        mode: mode,
        rateLimit: {
          remaining: rateLimit.remaining - 1, // Decrementamos porque acabamos de usar uno
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
    console.error('Error humanizing text:', error);
    return NextResponse.json(
      { error: 'Error al humanizar el texto. Por favor, intenta nuevamente.' },
      { status: 500 }
    );
  }
}
