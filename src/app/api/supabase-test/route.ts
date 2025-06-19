import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Log de variables de entorno (solo existencia)
    const envStatus = {
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      supabaseUrl: process.env.SUPABASE_URL?.substring(0, 10) + '...',
      supabaseClientCreated: !!supabase
    };
    
    console.log('Estado de configuración:', envStatus);

    if (!supabase) {
      return NextResponse.json({
        error: 'Supabase client no inicializado',
        envStatus
      }, { status: 500 });
    }

    // Intentar una consulta simple
    const { data, error } = await supabase
      .from('feedbacks')
      .select('count')
      .limit(1);

    if (error) {
      console.error('Error al consultar Supabase:', error);
      return NextResponse.json({
        error: 'Error al consultar Supabase',
        details: error.message,
        code: error.code,
        hint: error.hint,
        envStatus
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Conexión exitosa con Supabase',
      data,
      envStatus
    });

  } catch (err) {
    console.error('Error en test endpoint:', err);
    return NextResponse.json({
      error: 'Error general',
      details: err instanceof Error ? err.message : 'Error desconocido'
    }, { status: 500 });
  }
} 