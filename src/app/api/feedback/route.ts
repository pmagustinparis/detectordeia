import { writeFile, readFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

const FEEDBACK_PATH = path.resolve(process.cwd(), 'feedback.json');

export async function POST(request: Request) {
  try {
    const { originalText, result, label } = await request.json();
    if (!originalText || !label) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
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
      label
    });

    await writeFile(FEEDBACK_PATH, JSON.stringify(currentData, null, 2), 'utf-8');

    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
} 