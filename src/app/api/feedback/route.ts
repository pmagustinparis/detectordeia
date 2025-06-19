import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    console.log('Recibiendo request de feedback');
    const body = await request.json();
    console.log('Body recibido:', body);
    
    const {
      originalText,
      result,
      label, // feedback viejo
      util,  // feedback nuevo
      uso,   // feedback nuevo
      comentario // feedback nuevo
    } = body;
    
    if (!originalText || (typeof result === 'undefined')) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }
    // Al menos uno de los dos tipos de feedback debe estar
    if (!label && !util) {
      return NextResponse.json({ error: 'Falta el tipo de feedback' }, { status: 400 });
    }

    console.log('Supabase disponible:', !!supabase);
    
    if (supabase) {
      console.log('Intentando insertar en Supabase...');
      const { data, error } = await supabase
        .from('feedbacks')
        .insert([
          {
            original_text: originalText,
            result: result,
            label: label || null,
            util: util || null,
            uso: uso || null,
            comentario: comentario || null
          }
        ])
        .select();

      if (error) {
        console.error('Error detallado de Supabase:', {
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        return NextResponse.json({ error: 'Error al guardar feedback' }, { status: 500 });
      }

      console.log('Feedback guardado exitosamente:', data);
      return NextResponse.json({ status: 'ok', data });
    }

    // Si no hay Supabase, devolver éxito de todos modos para no romper la UX
    // pero logear para que sepamos que necesitamos configurar la DB
    console.warn('Supabase no está configurado. El feedback no se guardará.');
    return NextResponse.json({ 
      status: 'ok',
      warning: 'Feedback registrado en modo desarrollo'
    });
    
  } catch (err) {
    console.error('Error detallado en endpoint:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
} 