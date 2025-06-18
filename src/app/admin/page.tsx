import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'subscribers.json');

interface Subscriber {
  date: string;
  email: string;
  plan: string;
}

async function getSubscribers(): Promise<Subscriber[]> {
  try {
    const fileData = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (error: any) {
    // Si el archivo no existe o hay error, devuelve array vacío
    if (error.code !== 'ENOENT') {
      console.error("Error leyendo archivo de suscriptores:", error);
    }
    return [];
  }
}

export default async function AdminPage() {
  const subscribers = await getSubscribers();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Lista de Suscriptores</h1>
      <div className="mb-4">
        <a
          href="/admin/feedback"
          className="inline-block bg-[#a259f7] hover:bg-[#7c3aed] text-white font-bold py-2 px-4 rounded-xl shadow-md transition-all text-sm"
        >
          Ver feedbacks de usuarios
        </a>
      </div>
      {subscribers.length === 0 ? (
        <p className="text-gray-700">No hay suscriptores todavía.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left text-gray-700">Fecha</th>
              <th className="py-2 px-4 border-b text-left text-gray-700">Email</th>
              <th className="py-2 px-4 border-b text-left text-gray-700">Plan Interesado</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-gray-800">{new Date(sub.date).toLocaleString()}</td>
                <td className="py-2 px-4 border-b text-gray-800">{sub.email}</td>
                <td className="py-2 px-4 border-b text-gray-800">{sub.plan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 