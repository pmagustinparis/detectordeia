import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// La ruta al archivo JSON. Asumimos que la raíz del proyecto es donde está la carpeta 'app'.
// Dentro de la carpeta 'app' estará nuestro subscribers.json
const dataFilePath = path.join(process.cwd(), 'subscribers.json');

interface Subscriber {
  date: string;
  email: string;
  plan: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, plan } = body;

    if (!email || !plan) {
      return NextResponse.json({ message: 'Email y plan son requeridos' }, { status: 400 });
    }

    let subscribers: Subscriber[] = [];
    try {
      const fileData = await fs.readFile(dataFilePath, 'utf-8');
      subscribers = JSON.parse(fileData);
    } catch (error: any) {
      // Si el archivo no existe o hay error al parsear, empezamos con una lista vacía
      if (error.code !== 'ENOENT') {
        console.error('Error al leer subscribers.json:', error);
        // No relanzamos el error, simplemente empezamos con una lista vacía
      }
    }

    const newSubscriber: Subscriber = {
      date: new Date().toISOString(),
      email,
      plan,
    };

    subscribers.push(newSubscriber);

    await fs.writeFile(dataFilePath, JSON.stringify(subscribers, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Suscripción exitosa' }, { status: 200 });
  } catch (error) {
    console.error('Error en /api/subscribe:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
} 