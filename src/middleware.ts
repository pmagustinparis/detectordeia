import { NextRequest, NextResponse } from 'next/server';

const USER = 'Agus';
const PASS = '1908';

// Polyfill seguro para atob en Edge Runtime
function safeAtob(str: string) {
  if (typeof atob === 'function') return atob(str);
  // Node.js fallback
  return Buffer.from(str, 'base64').toString('binary');
}

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    try {
      const decoded = safeAtob(authValue);
      const [user, pass] = decoded.split(':');
      if (user === USER && pass === PASS) {
        return NextResponse.next();
      }
    } catch (e) {
      // Si falla la decodificación, sigue abajo y pide auth
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
  matcher: ['/admin', '/admin/(.*)'],
}; 