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
        details: 'El servicio de feedback no está configurado.'
      }, { status: 500 });
    }

    const body = await request.json();
    console.log('=== FEEDBACK API DEBUG ===');
    console.log('Recibiendo feedback:', JSON.stringify(body, null, 2));

    if (!body.originalText || body.result === undefined) {
      console.error('Error: Datos requeridos faltantes');
      return NextResponse.json({
        error: 'Datos requeridos faltantes',
        details: 'originalText y result son obligatorios'
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

    // Obtener la primera hoja (o crear si no existe)
    let sheet = doc.sheetsByIndex[0];
    if (!sheet) {
      sheet = await doc.addSheet({
        headerValues: ['Fecha', 'Texto Original', 'Resultado', 'Útil', 'Uso', 'Comentario']
      });
    } else {
      // Asegurar que tenga los headers correctos
      await sheet.setHeaderRow(['Fecha', 'Texto Original', 'Resultado', 'Útil', 'Uso', 'Comentario']);
    }

    // Preparar fila
    const now = new Date().toISOString();
    const utilLabel = body.util === 1 ? 'Sí' : body.util === 5 ? 'No' : '-';

    const rowData = {
      'Fecha': now,
      'Texto Original': body.originalText,
      'Resultado': body.result,
      'Útil': utilLabel,
      'Uso': body.uso || '-',
      'Comentario': body.comentario || '-'
    };

    console.log('Datos a insertar:', JSON.stringify(rowData, null, 2));

    // Agregar fila
    await sheet.addRow(rowData);

    console.log('Feedback guardado exitosamente en Google Sheets');
    return NextResponse.json({
      success: true,
      message: 'Feedback guardado correctamente'
    });

  } catch (err) {
    console.error('Error inesperado en endpoint:', err);
    return NextResponse.json({
      error: 'Error interno',
      details: err instanceof Error ? err.message : 'Error desconocido'
    }, { status: 500 });
  }
}

// Endpoint GET para leer feedbacks desde el panel admin
export async function GET() {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!spreadsheetId || !clientEmail || !privateKey) {
      return NextResponse.json({
        error: 'Error de configuración del servidor'
      }, { status: 500 });
    }

    const serviceAccountAuth = new JWT({
      email: clientEmail,
      key: privateKey.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(spreadsheetId, serviceAccountAuth);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    if (!sheet) {
      return NextResponse.json({ feedbacks: [] });
    }

    const rows = await sheet.getRows();

    const feedbacks = rows.map((row, index) => ({
      id: index + 1,
      created_at: row.get('Fecha') || '',
      original_text: row.get('Texto Original') || '',
      result: parseInt(row.get('Resultado') || '0'),
      util: row.get('Útil') === 'Sí' ? 1 : row.get('Útil') === 'No' ? 5 : null,
      uso: row.get('Uso') || null,
      comentario: row.get('Comentario') || null
    }));

    return NextResponse.json({ feedbacks });

  } catch (err) {
    console.error('Error al leer feedbacks:', err);
    return NextResponse.json({
      error: 'Error al leer feedbacks',
      details: err instanceof Error ? err.message : 'Error desconocido'
    }, { status: 500 });
  }
} 