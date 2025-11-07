// Auth callback route para Google OAuth
// Google redirige aquí después de que el usuario autoriza la app

import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Redirect exitoso al dashboard (o a donde venía)
      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';

      if (isLocalEnv) {
        // Desarrollo local
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        // Producción con Vercel
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        // Fallback
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // Error en el auth: redirect a home con error
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
