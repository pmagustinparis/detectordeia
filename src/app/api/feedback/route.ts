import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Recibiendo feedback:', body);
    
    if (!supabase) {
      return NextResponse.json({ 
        error: 'Error de configuración',
        details: 'Cliente Supabase no disponible'
      }, { status: 500 });
    }

    // Intentar insertar con estructura simplificada
    const { data, error } = await supabase
      .from('feedbacks')
      .insert({
        original_text: body.originalText || '',
        result: body.result || 0,
        util: body.util || null,
        uso: body.uso || null,
        comentario: body.comentario || null
      })
      .select();

    if (error) {
      console.error('Error al insertar:', error);
      return NextResponse.json({ 
        error: 'Error al guardar feedback',
        details: error.message,
        code: error.code
      }, { status: 500 });
    }

    console.log('Feedback guardado:', data);
    return NextResponse.json({ 
      success: true,
      message: 'Feedback guardado correctamente',
      data 
    });
    
  } catch (err) {
    console.error('Error en endpoint:', err);
    return NextResponse.json({ 
      error: 'Error interno',
      details: err instanceof Error ? err.message : 'Error desconocido'
    }, { status: 500 });
  }
} 