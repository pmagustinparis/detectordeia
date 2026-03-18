import { Metadata } from 'next';
import DetectorMain from '../components/DetectorMain';
import { getUserStatus } from '@/lib/user/getUserStatus';

export const metadata: Metadata = {
  title: 'Detector de IA para México – DetectordeIA.ai',
  description: 'Detecta si un texto fue escrito por inteligencia artificial en español de México. Herramienta gratuita, precisa y optimizada para México. Sin registro, ideal para estudiantes, docentes y empresas.',
  alternates: {
    canonical: 'https://detectordeia.ai/mx',
    languages: {
      'es-ES': 'https://detectordeia.ai/es',
      'es-MX': 'https://detectordeia.ai/mx',
      'es-CO': 'https://detectordeia.ai/co',
      'es-AR': 'https://detectordeia.ai/ar',
      'es-CL': 'https://detectordeia.ai/cl',
      'es-PE': 'https://detectordeia.ai/pe',
      'x-default': 'https://detectordeia.ai/',
    },
  },
  openGraph: {
    title: 'Detector de IA para México – DetectordeIA.ai',
    description: 'Herramienta gratuita para detectar IA en textos, optimizada para español de México.',
    url: 'https://detectordeia.ai/mx',
    siteName: 'DetectordeIA.ai',
    images: [
      {
        url: 'https://detectordeia.ai/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Detector de IA México - DetectordeIA.ai',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Detector de IA para México – DetectordeIA.ai',
    description: 'Herramienta gratuita para detectar IA en textos, optimizada para español de México.',
    images: ['https://detectordeia.ai/og-default.png'],
  },
};

export default async function DetectorMexico() {
  const initialUserStatus = await getUserStatus();
  return (
    <div className="min-h-screen bg-white pb-10 px-2">
      <DetectorMain
        h1="Detector de IA para México"
        subtitle="Detecta si un texto fue escrito por inteligencia artificial con precisión líder en México. Herramienta gratuita, sin registro, optimizada para español de México. Ideal para estudiantes, docentes y empresas mexicanas."
        initialUserStatus={initialUserStatus}
      />

      {/* Contexto IA en México */}
      <section className="max-w-3xl mx-auto mt-10 px-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">IA en las Universidades Mexicanas: Lo que Debes Saber</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          La <strong>UNAM</strong>, con más de 350,000 estudiantes, es la universidad más grande de México y ha emitido orientaciones sobre el uso ético de la IA en actividades académicas. El <strong>IPN, Tec de Monterrey y UAM</strong> también están desarrollando políticas específicas para el uso de herramientas como ChatGPT en trabajos universitarios.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          El uso de detectores de IA está en rápido crecimiento en México. Muchas universidades privadas ya usan Turnitin con funciones de detección de IA activadas. Las universidades públicas están incorporando estas herramientas progresivamente.
        </p>

        {/* Universidades mexicanas */}
        <h3 className="text-lg font-semibold text-slate-700 mt-6 mb-3">Detector de IA para Universidades de México</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {[
            { name: 'UNAM', slug: 'unam' },
            { name: 'Tec de Monterrey', slug: 'tecnologico-monterrey' },
            { name: 'UAM', slug: 'uam' },
            { name: 'UdeG Guadalajara', slug: 'universidad-guadalajara' },
            { name: 'BUAP Puebla', slug: 'buap' },
            { name: 'Ver todas →', slug: '' },
          ].map((uni) => (
            <a
              key={uni.slug || 'all'}
              href={uni.slug ? `/detector-de-ia-universidad/${uni.slug}` : '/universidades'}
              className="bg-green-50 hover:bg-green-100 text-green-700 rounded-lg px-3 py-2 text-sm font-medium text-center transition-colors"
            >
              {uni.name}
            </a>
          ))}
        </div>
      </section>

      {/* FAQs México */}
      <section className="max-w-3xl mx-auto px-4 mb-10">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Preguntas Frecuentes sobre IA en México</h2>
        <div className="space-y-3">
          {[
            {
              q: '¿Funciona con textos académicos y legales de México?',
              a: 'Sí. El detector está optimizado para el español mexicano e identifica patrones lingüísticos específicos del español de México. Es ideal para tareas universitarias, tesis, ensayos y documentos profesionales o legales.'
            },
            {
              q: '¿La UNAM permite usar ChatGPT en trabajos?',
              a: 'La UNAM ha emitido orientaciones que permiten el uso de IA como herramienta de apoyo al aprendizaje, con declaración explícita. Sin embargo, cada facultad y cada profesor pueden establecer reglas más restrictivas. Consulta el reglamento de tu facultad y el syllabus de cada materia.'
            },
            {
              q: '¿Las universidades mexicanas usan Turnitin para detectar IA?',
              a: 'Varias universidades privadas ya usan Turnitin con su función de detección de IA (disponible desde 2023). Las universidades públicas están incorporando estas herramientas de forma gradual. El uso va en aumento, especialmente en posgrados y TFG.'
            },
            {
              q: '¿Cómo declaro el uso de ChatGPT en mis trabajos universitarios en México?',
              a: 'Agrega una nota al final de tu trabajo especificando qué herramienta usaste y para qué propósito. Por ejemplo: "Utilicé ChatGPT para generar ideas iniciales sobre el tema. El análisis y la redacción final son de mi autoría." Verifica si tu institución tiene un formato específico de declaración.'
            },
          ].map((faq, i) => (
            <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-gray-800 text-sm">
              <strong className="block mb-1">{faq.q}</strong>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 