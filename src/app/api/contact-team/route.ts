import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { name, email, company, teamSize, message } = await request.json();

    // Validar campos requeridos
    if (!name || !email || !teamSize) {
      return NextResponse.json(
        { error: 'Nombre, email y tamaño del equipo son requeridos' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Crear cliente de Supabase
    const supabase = await createClient();

    // Insertar en la base de datos
    const { data, error } = await supabase
      .from('team_inquiries')
      .insert({
        name,
        email,
        company: company || null,
        team_size: teamSize,
        message: message || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Error insertando team inquiry:', error);
      return NextResponse.json(
        { error: 'Error al guardar la consulta' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Consulta enviada exitosamente',
        data
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Error en /api/contact-team:', error);
    return NextResponse.json(
      { error: error.message || 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
