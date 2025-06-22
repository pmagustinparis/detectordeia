import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// No usamos el cliente público de @/lib/supabase para escribir.
// En su lugar, creamos un cliente de servidor con privilegios de admin
// usando las variables de entorno del servidor. Esto es más seguro.

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Error: Faltan variables de Supabase en el servidor.');
      return NextResponse.json({ 
        error: 'Error de configuración del servidor',
        details: 'El servicio de feedback no está configurado.'
      }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    
    const body = await request.json();
    console.log('=== FEEDBACK API DEBUG ===');
    console.log('Recibiendo feedback:', JSON.stringify(body, null, 2));
    
    if (!body.originalText || body.result === undefined) {
      console.error('Error: Datos requeridos faltantes');
      return NextResponse.json({ 
        error: 'Datos requeridos faltantes',
        details: 'originalText y result son obligatorios'
      }, { status: 400 });
    }

    // Preparar datos para inserción
    const feedbackData = {
      original_text: body.originalText,
      result: body.result,
      util: body.util || null,
      uso: body.uso || null,
      comentario: body.comentario || null
    };

    console.log('Datos a insertar:', JSON.stringify(feedbackData, null, 2));

    // Intentar insertar con el cliente de admin
    const { data, error } = await supabaseAdmin
      .from('feedbacks')
      .insert(feedbackData)
      .select();

    if (error) {
      console.error('Error al insertar en Supabase:', error);
      return NextResponse.json({ 
        error: 'Error al guardar feedback',
        details: error.message,
        code: error.code,
        hint: error.hint
      }, { status: 500 });
    }

    console.log('Feedback guardado exitosamente:', data);
    return NextResponse.json({ 
      success: true,
      message: 'Feedback guardado correctamente',
      data 
    });
    
  } catch (err) {
    console.error('Error inesperado en endpoint:', err);
    return NextResponse.json({ 
      error: 'Error interno',
      details: err instanceof Error ? err.message : 'Error desconocido'
    }, { status: 500 });
  }
} 