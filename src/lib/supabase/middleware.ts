// Cliente de Supabase para Middleware
// Usar solo en middleware.ts

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // IMPORTANTE: Evitar escribir lógica entre createServerClient y getUser()
  // Un simple error puede hacer que el usuario sea desloggeado aleatoriamente

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Rutas protegidas: solo usuarios autenticados
  // EXCEPCIÓN: /api/user/status debe funcionar para usuarios anónimos también
  if (
    !user &&
    (request.nextUrl.pathname.startsWith('/dashboard') ||
      (request.nextUrl.pathname.startsWith('/api/user') &&
        !request.nextUrl.pathname.startsWith('/api/user/status')))
  ) {
    // Redirect a home si no está autenticado
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
