import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({
        error: 'No authenticated user',
        authenticated: false,
      });
    }

    // Buscar en la tabla users por auth_id
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', user.id)
      .single();

    // También buscar por email por si acaso
    const { data: userByEmail, error: emailError } = await supabase
      .from('users')
      .select('*')
      .eq('email', user.email)
      .single();

    return NextResponse.json({
      authenticated: true,
      authUserId: user.id,
      authUserEmail: user.email,
      searchByAuthId: {
        found: !!userData,
        data: userData,
        error: userError?.message,
      },
      searchByEmail: {
        found: !!userByEmail,
        data: userByEmail,
        error: emailError?.message,
      },
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
