import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

const USER = 'Agus';
const PASS = '1908';

// Función para decodificar base64 compatible con Edge Runtime
function decodeBase64(str: string): string {
  const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  const bytes = new Uint8Array(str.length * 0.75);
  let byteIndex = 0;

  for (let i = 0; i < str.length; i += 4) {
    const encoded1 = base64Chars.indexOf(str[i]);
    const encoded2 = base64Chars.indexOf(str[i + 1]);
    const encoded3 = base64Chars.indexOf(str[i + 2]);
    const encoded4 = base64Chars.indexOf(str[i + 3]);

    bytes[byteIndex++] = (encoded1 << 2) | (encoded2 >> 4);
    if (encoded3 !== 64) bytes[byteIndex++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
    if (encoded4 !== 64) bytes[byteIndex++] = ((encoded3 & 3) << 6) | encoded4;
  }

  return new TextDecoder().decode(bytes.subarray(0, byteIndex));
}

export async function middleware(req: NextRequest) {
  // 1. Protección de /admin con Basic Auth (existente)
  if (req.nextUrl.pathname.startsWith('/admin')) {
    try {
      const basicAuth = req.headers.get('authorization');

      if (basicAuth) {
        const authValue = basicAuth.split(' ')[1];
        try {
          const decoded = decodeBase64(authValue);
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
          'WWW-Authenticate': 'Basic realm="Area Segura"',
        },
      });
    } catch (error) {
      console.error('Error en middleware:', error);
      return new NextResponse('Error interno', { status: 500 });
    }
  }

  // 2. Supabase session management para el resto de la app
  return await updateSession(req);
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/api/user/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}; 