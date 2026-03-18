import { Metadata } from 'next';
import DetectorMain from '../components/DetectorMain';
import { getUserStatus } from '@/lib/user/getUserStatus';

export const metadata: Metadata = {
  title: 'Detector de IA para Argentina – DetectordeIA.ai',
  description: 'Detecta si un texto fue escrito por inteligencia artificial en español de Argentina. Herramienta gratuita, precisa y optimizada para Argentina. Sin registro, ideal para estudiantes, docentes y empresas.',
  alternates: {
    canonical: 'https://detectordeia.ai/ar',
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
    title: 'Detector de IA para Argentina – DetectordeIA.ai',
    description: 'Herramienta gratuita para detectar IA en textos, optimizada para español de Argentina.',
    url: 'https://detectordeia.ai/ar',
    siteName: 'DetectordeIA.ai',
    images: [
      {
        url: 'https://detectordeia.ai/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Detector de IA Argentina - DetectordeIA.ai',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Detector de IA para Argentina – DetectordeIA.ai',
    description: 'Herramienta gratuita para detectar IA en textos, optimizada para español de Argentina.',
    images: ['https://detectordeia.ai/og-default.png'],
  },
};

export default async function DetectorArgentina() {
  const initialUserStatus = await getUserStatus();
  return (
    <div className="min-h-screen bg-white pb-10 px-2">
      <DetectorMain
        h1="Detector de IA para Argentina"
        subtitle="Detecta si un texto fue escrito por inteligencia artificial con precisión líder en Argentina. Herramienta gratuita, sin registro, optimizada para español de Argentina. Ideal para estudiantes, docentes y empresas argentinas."
        initialUserStatus={initialUserStatus}
      />

      {/* Contexto IA en Argentina */}
      <section className="max-w-3xl mx-auto mt-10 px-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">IA en las Universidades Argentinas: Lo que Debes Saber</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          La <strong>UBA (Universidad de Buenos Aires)</strong>, con más de 280,000 estudiantes, es la mayor universidad de Argentina y ha adoptado una postura de regulación con transparencia sobre el uso de IA. Permite usos de apoyo con declaración explícita, pero prohíbe la sustitución del trabajo del estudiante por IA.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Universidades como la <strong>UNC (Córdoba), UNLP (La Plata) y UNR (Rosario)</strong> están desarrollando sus propias políticas. En Argentina, el uso de detectores de IA está creciendo especialmente en las facultades de Derecho, Ciencias Sociales y Humanidades.
        </p>

        {/* Universidades argentinas */}
        <h3 className="text-lg font-semibold text-slate-700 mt-6 mb-3">Detector de IA para Universidades Argentinas</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {[
            { name: 'UBA Buenos Aires', slug: 'universidad-buenos-aires' },
            { name: 'UNC Córdoba', slug: 'universidad-nacional-cordoba' },
            { name: 'UNLP La Plata', slug: 'unlp' },
            { name: 'UTN', slug: 'utn' },
            { name: 'UNR Rosario', slug: 'unr' },
            { name: 'Ver todas →', slug: '' },
          ].map((uni) => (
            <a
              key={uni.slug || 'all'}
              href={uni.slug ? `/detector-de-ia-universidad/${uni.slug}` : '/universidades'}
              className="bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-lg px-3 py-2 text-sm font-medium text-center transition-colors"
            >
              {uni.name}
            </a>
          ))}
        </div>
      </section>

      {/* FAQs Argentina */}
      <section className="max-w-3xl mx-auto px-4 mb-10">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Preguntas Frecuentes sobre IA en Argentina</h2>
        <div className="space-y-3">
          {[
            {
              q: '¿Funciona con textos académicos y legales de Argentina?',
              a: 'Sí. El detector reconoce el español rioplatense y los patrones lingüísticos propios de Argentina. Es especialmente efectivo con textos académicos universitarios, parciales y tesis de universidades argentinas.'
            },
            {
              q: '¿La UBA permite usar ChatGPT en los trabajos?',
              a: 'La UBA permite el uso de IA como herramienta de apoyo al aprendizaje con declaración explícita, pero prohíbe que la IA sustituya el trabajo intelectual del estudiante. Cada facultad puede tener regulaciones adicionales. La Facultad de Ciencias Exactas, por ejemplo, tiene posiciones más estrictas en programación.'
            },
            {
              q: '¿Qué sistemas antiplagio se usan en universidades argentinas?',
              a: 'Las universidades argentinas usan principalmente Turnitin (en instituciones privadas y algunas públicas), además de herramientas propias. La UBA tiene acuerdos con plataformas de verificación de originalidad. La detección de IA está siendo incorporada gradualmente.'
            },
            {
              q: '¿Tengo que declarar que usé IA en mis trabajos de la UBA?',
              a: 'Sí, si usaste IA de forma significativa. La UBA requiere transparencia sobre el uso de herramientas. Agrega una nota al final del trabajo especificando qué herramienta usaste y con qué propósito. Consulta las indicaciones específicas de tu cátedra, ya que cada profesor puede tener sus propias reglas.'
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