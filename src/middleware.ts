import { NextRequest, NextResponse } from 'next/server';

const USER = 'Boedo1908';
const PASS = '1908';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    // Buffer.from está disponible en Edge Runtime
    const [user, pass] = Buffer.from(authValue, 'base64').toString().split(':');

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
  matcher: '/admin',
}; 