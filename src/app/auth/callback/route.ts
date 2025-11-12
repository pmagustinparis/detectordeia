// Auth callback route para Google OAuth
// Google redirige aquí después de que el usuario autoriza la app

import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Construir URL de redirect correcta
      const forwardedHost = request.headers.get('x-forwarded-host');
      const protocol = request.headers.get('x-forwarded-proto') || 'https';

      // Detectar el host correcto
      let redirectHost = forwardedHost || requestUrl.host;

      // En producción, asegurarnos de usar detectordeia.ai o www.detectordeia.ai
      if (redirectHost.includes('vercel.app') || redirectHost.includes('localhost')) {
        // Si estamos en Vercel o localhost, verificar si hay un dominio custom
        const isProduction = process.env.VERCEL_ENV === 'production';
        if (isProduction) {
          redirectHost = 'detectordeia.ai';
        }
      }

      const redirectUrl = `${protocol}://${redirectHost}${next}`;
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Error en el auth: redirect a home con error
  const forwardedHost = request.headers.get('x-forwarded-host');
  const protocol = request.headers.get('x-forwarded-proto') || 'https';
  const redirectHost = forwardedHost || requestUrl.host;

  return NextResponse.redirect(`${protocol}://${redirectHost}/auth/auth-code-error`);
}
