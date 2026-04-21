import { Metadata } from 'next';
import DetectorMain from '../components/DetectorMain';
import { getUserStatus } from '@/lib/user/getUserStatus';

export const metadata: Metadata = {
  title: 'Detector de IA para España – DetectordeIA.ai',
  description: 'Detecta si un texto fue escrito por inteligencia artificial en español de España. Herramienta gratuita, precisa y optimizada para España. Sin registro, ideal para estudiantes, docentes y empresas.',
  alternates: {
    canonical: 'https://detectordeia.ai/es',
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
    title: 'Detector de IA para España – DetectordeIA.ai',
    description: 'Herramienta gratuita para detectar IA en textos, optimizada para español de España.',
    url: 'https://detectordeia.ai/es',
    siteName: 'DetectordeIA.ai',
    images: [
      {
        url: 'https://detectordeia.ai/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Detector de IA España - DetectordeIA.ai',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Detector de IA para España – DetectordeIA.ai',
    description: 'Herramienta gratuita para detectar IA en textos, optimizada para español de España.',
    images: ['https://detectordeia.ai/og-default.png'],
  },
};

export default async function DetectorEspana() {
  const initialUserStatus = await getUserStatus();
  return (
    <div className="min-h-screen bg-white pb-10 px-2">
      <DetectorMain
        h1="Detector de IA para España"
        subtitle="Detecta si un texto fue escrito por inteligencia artificial con precisión líder en España. Herramienta gratuita, sin registro, optimizada para español de España. Ideal para estudiantes, docentes y empresas españolas."
        initialUserStatus={initialUserStatus}
      />

      {/* Contexto IA en España */}
      <section className="max-w-3xl mx-auto mt-10 px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">IA en la Universidad Española: Lo que Debes Saber</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Las universidades españolas están entre las más avanzadas de Europa en regular el uso de inteligencia artificial. La <strong>CRUE (Conferencia de Rectores de Universidades Españolas)</strong> emitió orientaciones en 2023 que permiten el uso de IA con declaración explícita. Universidades como la <strong>UCM, UAB, UPV y UAM</strong> ya tienen políticas propias actualizadas.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          El uso de detectores de IA se ha extendido en instituciones españolas. Turnitin, el sistema antiplagio más usado en España, incorporó funciones de detección de IA en 2023. Muchos profesores combinan Turnitin con herramientas adicionales para verificar la autenticidad de los trabajos.
        </p>

        {/* Universidades españolas */}
        <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Detector de IA para Universidades Españolas</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {[
            { name: 'UCM Madrid', slug: 'universidad-complutense-madrid' },
            { name: 'UAB Barcelona', slug: 'universidad-autonoma-barcelona' },
            { name: 'UPV Valencia', slug: 'universitat-politecnica-valencia' },
            { name: 'US Sevilla', slug: 'universidad-sevilla' },
            { name: 'UGR Granada', slug: 'universidad-granada' },
            { name: 'Ver todas →', slug: '' },
          ].map((uni) => (
            <a
              key={uni.slug || 'all'}
              href={uni.slug ? `/detector-de-ia-universidad/${uni.slug}` : '/universidades'}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg px-3 py-2 text-sm font-medium text-center transition-colors"
            >
              {uni.name}
            </a>
          ))}
        </div>
      </section>

      {/* FAQs España */}
      <section className="max-w-3xl mx-auto px-4 mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Preguntas Frecuentes sobre IA en España</h2>
        <div className="space-y-3">
          {[
            {
              q: '¿Funciona con textos académicos y legales de España?',
              a: 'Sí. El detector está optimizado para el español peninsular y reconoce patrones lingüísticos específicos del español de España. Es ideal para trabajos académicos universitarios, TFG, TFM, y documentos legales o profesionales.'
            },
            {
              q: '¿Qué política de IA tienen las universidades españolas?',
              a: 'La mayoría de universidades españolas permiten el uso de IA como herramienta de apoyo con declaración explícita, siguiendo las orientaciones de la CRUE (2023). Sin embargo, muchos TFG y TFM tienen restricciones adicionales. Consulta siempre el reglamento específico de tu facultad.'
            },
            {
              q: '¿Turnitin detecta texto de ChatGPT en España?',
              a: 'Sí. Turnitin, que es el sistema más extendido en universidades españolas, tiene una función de detección de IA activa desde 2023. La mayoría de instituciones españolas con Turnitin ya tienen activada esta función. Por eso es importante verificar tu trabajo antes de entregarlo.'
            },
            {
              q: '¿Es necesario declarar el uso de IA en trabajos universitarios en España?',
              a: 'En la mayoría de universidades españolas, sí. La declaración de uso de IA es ya una práctica estándar requerida por muchas instituciones. El formato varía por universidad, pero generalmente incluye especificar qué herramienta usaste y para qué.'
            },
          ].map((faq, i) => (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 text-sm">
              <strong className="block mb-1">{faq.q}</strong>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 