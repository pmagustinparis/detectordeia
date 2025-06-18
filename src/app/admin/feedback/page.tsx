import { supabase } from '@/lib/supabase';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'feedback.json');

interface Feedback {
  id?: number;
  created_at?: string;
  timestamp?: string;
  original_text?: string;
  originalText?: string;
  result: number;
  label?: string | null;
  util?: string | null;
  uso?: string | null;
  comentario?: string | null;
}

function truncate(text: string, max: number) {
  return text.length > max ? text.slice(0, max) + '…' : text;
}

async function getFeedbacks(): Promise<Feedback[]> {
  try {
    // Si Supabase está configurado, usarlo
    if (supabase) {
      const { data, error } = await supabase
        .from('feedbacks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching feedbacks:', error);
        return [];
      }

      return data || [];
    } else {
      // Fallback al archivo JSON si Supabase no está configurado
      try {
        const fileData = await fs.readFile(dataFilePath, 'utf-8');
        return JSON.parse(fileData).reverse(); // más reciente primero
      } catch (error: any) {
        if (error.code !== 'ENOENT') {
          console.error('Error leyendo feedback.json:', error);
        }
        return [];
      }
    }
  } catch (error) {
    console.error('Error in getFeedbacks:', error);
    return [];
  }
}

export default async function AdminFeedbackPage() {
  const feedbacks = await getFeedbacks();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Feedbacks de Usuarios</h1>
      {feedbacks.length === 0 ? (
        <p className="text-gray-700">No hay feedbacks todavía.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 text-xs md:text-sm">
          <thead>
            <tr>
              <th className="py-2 px-2 border-b text-left text-gray-700">Fecha</th>
              <th className="py-2 px-2 border-b text-left text-gray-700">¿Útil?</th>
              <th className="py-2 px-2 border-b text-left text-gray-700">Uso</th>
              <th className="py-2 px-2 border-b text-left text-gray-700">Comentario</th>
              <th className="py-2 px-2 border-b text-left text-gray-700">Resultado</th>
              <th className="py-2 px-2 border-b text-left text-gray-700">Texto analizado</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((fb, index) => (
              <tr key={fb.id || index}>
                <td className="py-2 px-2 border-b text-gray-800">
                  {new Date(fb.created_at || fb.timestamp || '').toLocaleString()}
                </td>
                <td className="py-2 px-2 border-b text-gray-800">{fb.util ?? fb.label ?? '-'}</td>
                <td className="py-2 px-2 border-b text-gray-800">{fb.uso ?? '-'}</td>
                <td className="py-2 px-2 border-b text-gray-800">{fb.comentario ?? '-'}</td>
                <td className="py-2 px-2 border-b text-gray-800">{typeof fb.result === 'number' ? fb.result + '%' : '-'}</td>
                <td className="py-2 px-2 border-b text-gray-800 max-w-xs">
                  {truncate(fb.original_text || fb.originalText || '', 80)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 