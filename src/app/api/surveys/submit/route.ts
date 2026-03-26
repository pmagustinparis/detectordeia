/**
 * API Route: Submit Survey Response
 *
 * POST /api/surveys/submit
 *
 * Endpoint unificado para todos los tipos de survey:
 * - exit_intent: cuando el usuario está por irse
 * - post_use: micro-survey después de usar una herramienta
 * - churn: cuando cancela su suscripción
 * - passive_feedback: widget siempre disponible "¿Falta algo?"
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';

type SurveyType = 'exit_intent' | 'post_use' | 'churn' | 'passive_feedback';
type ToolType = 'detector' | 'humanizador' | 'parafraseador' | null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      surveyType,
      questionKey,
      responseText,
      responseOption,
      rating,
      anonymousId,
      toolType,
      pageUrl,
      context,
    }: {
      surveyType: SurveyType;
      questionKey: string;
      responseText?: string;
      responseOption?: string;
      rating?: number;
      anonymousId?: string;
      toolType?: ToolType;
      pageUrl?: string;
      context?: Record<string, unknown>;
    } = body;

    // Validaciones básicas
    if (!surveyType || !questionKey) {
      return NextResponse.json(
        { error: 'surveyType and questionKey are required' },
        { status: 400 }
      );
    }

    const validSurveyTypes: SurveyType[] = ['exit_intent', 'post_use', 'churn', 'passive_feedback'];
    if (!validSurveyTypes.includes(surveyType)) {
      return NextResponse.json(
        { error: 'Invalid surveyType' },
        { status: 400 }
      );
    }

    // Al menos una respuesta debe estar presente
    if (!responseText && !responseOption && rating === undefined) {
      return NextResponse.json(
        { error: 'At least one of responseText, responseOption or rating is required' },
        { status: 400 }
      );
    }

    // Resolver user_id si está autenticado
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let userId: string | null = null;
    if (user) {
      const { data: userData } = await supabase
        .from('users')
        .select('id')
        .eq('auth_id', user.id)
        .single();

      userId = userData?.id || null;
    }

    // Requiere al menos un identificador
    if (!userId && !anonymousId) {
      return NextResponse.json(
        { error: 'User identification required' },
        { status: 400 }
      );
    }

    // Insertar en Supabase con service role (bypass RLS)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const serviceClient = createServiceClient(supabaseUrl, supabaseServiceKey);

    const { error } = await serviceClient
      .from('surveys')
      .insert({
        survey_type: surveyType,
        question_key: questionKey,
        response_text: responseText || null,
        response_option: responseOption || null,
        rating: rating ?? null,
        user_id: userId,
        anonymous_id: anonymousId || null,
        page_url: pageUrl || request.headers.get('referer') || null,
        tool_type: toolType || null,
        context: context || {},
      });

    if (error) {
      console.error('[Surveys API] Error inserting survey:', error);
      return NextResponse.json(
        { error: 'Failed to save survey' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Surveys API] Exception:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
