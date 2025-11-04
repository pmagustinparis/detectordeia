import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function POST(request: Request) {
  try {
    // Verificar variables de entorno
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!spreadsheetId || !clientEmail || !privateKey) {
      console.error('Error: Faltan variables de Google Sheets en el servidor.');
      return NextResponse.json({
        error: 'Error de configuración del servidor',
        details: 'El servicio de suscripción no está configurado.'
      }, { status: 500 });
    }

    const body = await request.json();

    if (!body.email) {
      console.error('Error: Email requerido');
      return NextResponse.json({
        error: 'Email requerido',
        details: 'El campo email es obligatorio'
      }, { status: 400 });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({
        error: 'Email inválido',
        details: 'El formato del email no es válido'
      }, { status: 400 });
    }

    // Configurar autenticación con Google
    const serviceAccountAuth = new JWT({
      email: clientEmail,
      key: privateKey.replace(/\\n/g, '\n'), // Convertir \n literales a saltos de línea
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Conectar a la hoja de cálculo
    const doc = new GoogleSpreadsheet(spreadsheetId, serviceAccountAuth);
    await doc.loadInfo();

    // Buscar o crear la hoja "Premium Subscriptions"
    let sheet = doc.sheetsByTitle['Premium Subscriptions'];
    if (!sheet) {
      sheet = await doc.addSheet({
        title: 'Premium Subscriptions',
        headerValues: ['Fecha', 'Email', 'Origen', 'IP', 'User Agent']
      });
    }

    // Obtener IP y User Agent del request
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Preparar fila
    const now = new Date().toISOString();
    const rowData = {
      'Fecha': now,
      'Email': body.email,
      'Origen': body.source || 'unknown',
      'IP': ip,
      'User Agent': userAgent
    };

    // Agregar fila
    await sheet.addRow(rowData);
    return NextResponse.json({
      success: true,
      message: 'Email guardado correctamente'
    });

  } catch (err) {
    console.error('Error inesperado en endpoint:', err);
    return NextResponse.json({
      error: 'Error interno',
      details: err instanceof Error ? err.message : 'Error desconocido'
    }, { status: 500 });
  }
}
