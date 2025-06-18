import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Compatibilidad: aceptar tanto el feedback viejo como el nuevo
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
      console.error('Error inserting feedback:', error);
      return NextResponse.json({ error: 'Error al guardar feedback' }, { status: 500 });
    }

    return NextResponse.json({ status: 'ok', data });
  } catch (err) {
    console.error('Error in feedback endpoint:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
} 