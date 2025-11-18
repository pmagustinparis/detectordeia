import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// POST: Crear/actualizar perfil de usuario
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    // Obtener datos del body
    const body = await request.json();
    const { role, primary_use, discovery_source } = body;

    // Validar que al menos uno de los campos esté presente
    if (!role && !primary_use && !discovery_source) {
      return NextResponse.json(
        { error: 'Debe proporcionar al menos un campo' },
        { status: 400 }
      );
    }

    // Intentar insertar o actualizar el perfil
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert(
        {
          user_id: user.id,
          role: role || null,
          primary_use: primary_use || null,
          discovery_source: discovery_source || null,
          completed_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id',
        }
      )
      .select()
      .single();

    if (error) {
      console.error('[Profile API] Error saving profile:', error);
      return NextResponse.json(
        { error: 'Error al guardar perfil' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, profile: data });

  } catch (error) {
    console.error('[Profile API] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// GET: Obtener perfil del usuario actual
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    // Obtener perfil
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      // Si no existe el perfil, devolver null
      if (error.code === 'PGRST116') {
        return NextResponse.json({ profile: null });
      }

      console.error('[Profile API] Error fetching profile:', error);
      return NextResponse.json(
        { error: 'Error al obtener perfil' },
        { status: 500 }
      );
    }

    return NextResponse.json({ profile });

  } catch (error) {
    console.error('[Profile API] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
