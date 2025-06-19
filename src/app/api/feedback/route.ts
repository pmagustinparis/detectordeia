import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    // Log variables de entorno (solo existencia)
    console.log('Variables de entorno:', {
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
    });

    const body = await request.json();
    
    const {
      originalText,
      result,
      label,
      util,
      uso,
      comentario
    } = body;
    
    // Validaciones
    if (!originalText || (typeof result === 'undefined')) {
      console.log('Error: Faltan datos básicos', { originalText: !!originalText, result });
      return NextResponse.json({ error: 'Faltan datos básicos' }, { status: 400 });
    }
    if (!label && !util) {
      console.log('Error: Falta tipo de feedback', { label, util });
      return NextResponse.json({ error: 'Falta tipo de feedback' }, { status: 400 });
    }

    // Verificar Supabase
    if (!supabase) {
      console.error('Error: Cliente Supabase no inicializado');
      return NextResponse.json({ 
        error: 'Error de configuración del servidor',
        details: 'Cliente Supabase no disponible'
      }, { status: 500 });
    }

    try {
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
        console.error('Error de Supabase:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        return NextResponse.json({ 
          error: 'Error al guardar en base de datos',
          details: error.message
        }, { status: 500 });
      }

      return NextResponse.json({ status: 'ok', data });
    } catch (supabaseError) {
      console.error('Error al ejecutar query en Supabase:', supabaseError);
      return NextResponse.json({ 
        error: 'Error en operación de base de datos',
        details: supabaseError instanceof Error ? supabaseError.message : 'Error desconocido'
      }, { status: 500 });
    }
    
  } catch (err) {
    console.error('Error general en endpoint:', err);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      details: err instanceof Error ? err.message : 'Error desconocido'
    }, { status: 500 });
  }
} 