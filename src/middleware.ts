import { NextRequest, NextResponse } from 'next/server';

const USER = 'Agus';
const PASS = '1908';

// Decodificador base64 compatible con Edge Runtime
function atobEdge(input: string) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let str = input.replace(/=+$/, '');
  let output = '';
  if (str.length % 4 === 1) throw new Error('Invalid base64');
  for (
    let bc = 0, bs = 0, buffer, i = 0;
    (buffer = str.charAt(i++));
    ~buffer &&
    ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
      ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
      : 0
  ) {
    buffer = chars.indexOf(buffer);
  }
  return output;
}

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    try {
      const decoded = atobEdge(authValue);
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