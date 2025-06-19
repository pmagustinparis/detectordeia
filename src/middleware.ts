import { NextRequest, NextResponse } from 'next/server';

const USER = 'Agus';
const PASS = '1908';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    try {
      // Usar Buffer para decodificar base64
      const decoded = Buffer.from(authValue, 'base64').toString();
      const [user, pass] = decoded.split(':');
      
      if (user === USER && pass === PASS) {
        return NextResponse.next();
      }
    } catch (e) {
      console.error('Error decodificando auth:', e);
    }
  }

  return new NextResponse('Autenticación requerida', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Área Segura"',
    },
  });
}

export const config = {
  matcher: ['/admin', '/admin/(.*)'],
}; 