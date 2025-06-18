import { writeFile, readFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

const FEEDBACK_PATH = path.resolve(process.cwd(), 'feedback.json');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Compatibilidad: aceptar tanto el feedback viejo como el nuevo
    const {
      originalText,
      result,
      label, // feedback viejo
      util,  // feedback nuevo
      uso,   // feedback nuevo
      comentario // feedback nuevo
    } = body;
    if (!originalText || (typeof result === 'undefined')) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }
    // Al menos uno de los dos tipos de feedback debe estar
    if (!label && !util) {
      return NextResponse.json({ error: 'Falta el tipo de feedback' }, { status: 400 });
    }

    let currentData: any[] = [];
    try {
      const raw = await readFile(FEEDBACK_PATH, 'utf-8');
      currentData = JSON.parse(raw);
    } catch (e) {
      // No existe el archivo aún
    }

    currentData.push({
      timestamp: new Date().toISOString(),
      originalText,
      result,
      label: label || null,
      util: util || null,
      uso: uso || null,
      comentario: comentario || null
    });

    await writeFile(FEEDBACK_PATH, JSON.stringify(currentData, null, 2), 'utf-8');

    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
} 