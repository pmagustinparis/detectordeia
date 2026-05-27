import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, source, tool_type, result_probability, result_confidence, text_length, anonymous_id } = body;

    // Validaciones
    if (!email) {
      return NextResponse.json({ error: 'Email requerido' }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // Insertar — en conflicto (mismo email + source) actualiza timestamp para refrescar
    const { error } = await supabase
      .from('email_waitlist')
      .upsert(
        {
          email: email.toLowerCase().trim(),
          source: source || 'unknown',
          tool_type: tool_type || 'general',
          result_probability: result_probability ?? null,
          result_confidence: result_confidence ?? null,
          text_length: text_length ?? null,
          anonymous_id: anonymous_id ?? null,
        },
        { onConflict: 'email,source', ignoreDuplicates: false }
      );

    if (error) {
      // Si el error es de constraint único (ya existe), tratarlo como éxito silencioso
      if (error.code === '23505') {
        return NextResponse.json({ success: true, message: 'Email ya registrado' });
      }
      console.error('[subscribe] Error guardando email:', error);
      return NextResponse.json({ error: 'Error al guardar el email' }, { status: 500 });
    }

    console.log(`[subscribe] ✅ Email capturado: ${email} (source: ${source}, probability: ${result_probability})`);
    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('[subscribe] Excepción:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
