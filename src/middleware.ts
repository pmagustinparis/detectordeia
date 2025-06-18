import { NextRequest, NextResponse } from 'next/server';

const USER = 'Agus';
const PASS = '1908';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    // Edge Runtime: usar atob en vez de Buffer.from
    const [user, pass] = atob(authValue).split(':');

    if (user === USER && pass === PASS) {
      return NextResponse.next();
    }
  }

  // Si no hay autenticación o es incorrecta, solicitarla
  const response = new NextResponse('Autenticación requerida', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Área Segura"',
    },
  });
  return response;
}

export const config = {
  matcher: '/admin$',
}; 