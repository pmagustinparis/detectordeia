import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('=== FEEDBACK API DEBUG ===');
    console.log('Recibiendo feedback:', JSON.stringify(body, null, 2));
    
    if (!supabase) {
      console.error('Error: Cliente Supabase no disponible');
      return NextResponse.json({ 
        error: 'Error de configuración',
        details: 'Cliente Supabase no disponible'
      }, { status: 500 });
    }

    // Validar datos requeridos
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

    // Intentar insertar
    const { data, error } = await supabase
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