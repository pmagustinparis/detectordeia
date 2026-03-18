import { Metadata } from 'next';
import DetectorMain from '../components/DetectorMain';
import { getUserStatus } from '@/lib/user/getUserStatus';

export const metadata: Metadata = {
  title: 'Detector de IA para Colombia – DetectordeIA.ai',
  description: 'Detecta si un texto fue escrito por inteligencia artificial en español de Colombia. Herramienta gratuita, precisa y optimizada para Colombia. Sin registro, ideal para estudiantes, docentes y empresas colombianas.',
  alternates: {
    canonical: 'https://detectordeia.ai/co',
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
    title: 'Detector de IA para Colombia – DetectordeIA.ai',
    description: 'Herramienta gratuita para detectar IA en textos, optimizada para español de Colombia.',
    url: 'https://detectordeia.ai/co',
    siteName: 'DetectordeIA.ai',
    images: [
      {
        url: 'https://detectordeia.ai/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Detector de IA Colombia - DetectordeIA.ai',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Detector de IA para Colombia – DetectordeIA.ai',
    description: 'Herramienta gratuita para detectar IA en textos, optimizada para español de Colombia.',
    images: ['https://detectordeia.ai/og-default.png'],
  },
};

export default async function DetectorColombia() {
  const initialUserStatus = await getUserStatus();
  return (
    <div className="min-h-screen bg-white pb-10 px-2">
      <DetectorMain
        h1="Detector de IA para Colombia"
        subtitle="Detecta si un texto fue escrito por inteligencia artificial con precisión líder en Colombia. Herramienta gratuita, sin registro, optimizada para español de Colombia. Ideal para estudiantes, docentes y empresas colombianas."
        initialUserStatus={initialUserStatus}
      />

      {/* Contexto IA en Colombia */}
      <section className="max-w-3xl mx-auto mt-10 px-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">IA en las Universidades Colombianas: Lo que Debes Saber</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          La <strong>Universidad Nacional de Colombia (UNAL)</strong> y la <strong>Universidad de los Andes</strong> están a la vanguardia en la discusión institucional sobre el uso ético de la inteligencia artificial. Ambas instituciones han emitido comunicados que exigen declaración explícita cuando se use IA en trabajos académicos, y prohíben que esta reemplace el razonamiento propio del estudiante.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          En Colombia, la <strong>Javeriana, la UdeA y el Externado</strong> utilizan Turnitin como principal herramienta antiplagio, y están incorporando módulos de detección de IA. El debate sobre la integridad académica frente a la IA está muy activo en facultades de Derecho, Humanidades y Ciencias Sociales.
        </p>

        {/* Universidades colombianas */}
        <h3 className="text-lg font-semibold text-slate-700 mt-6 mb-3">Detector de IA para Universidades Colombianas</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {[
            { name: 'Uniandes', slug: 'universidad-los-andes' },
            { name: 'UNAL Colombia', slug: 'universidad-nacional-colombia' },
            { name: 'Javeriana', slug: 'universidad-javeriana' },
            { name: 'UdeA Antioquia', slug: 'universidad-antioquia' },
            { name: 'U. del Rosario', slug: 'universidad-rosario' },
            { name: 'Ver todas →', slug: '' },
          ].map((uni) => (
            <a
              key={uni.slug || 'all'}
              href={uni.slug ? `/detector-de-ia-universidad/${uni.slug}` : '/universidades'}
              className="bg-yellow-50 hover:bg-yellow-100 text-yellow-800 rounded-lg px-3 py-2 text-sm font-medium text-center transition-colors"
            >
              {uni.name}
            </a>
          ))}
        </div>
      </section>

      {/* FAQs Colombia */}
      <section className="max-w-3xl mx-auto px-4 mb-10">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Preguntas Frecuentes sobre IA en Colombia</h2>
        <div className="space-y-3">
          {[
            {
              q: '¿Funciona con textos académicos y legales de Colombia?',
              a: 'Sí. El detector reconoce el español colombiano y sus patrones lingüísticos específicos. Es especialmente eficaz con trabajos académicos universitarios, ensayos jurídicos y textos de investigación de universidades colombianas como la UNAL, Uniandes o la Javeriana.'
            },
            {
              q: '¿La UNAL y Uniandes permiten usar ChatGPT en los trabajos?',
              a: 'Ambas instituciones permiten el uso de IA como herramienta de apoyo, pero exigen transparencia: debes declarar qué herramienta usaste y con qué finalidad. Está prohibido que la IA reemplace el razonamiento o la argumentación propia del estudiante. Consulta siempre las indicaciones de tu docente.'
            },
            {
              q: '¿Qué sistemas antiplagio se usan en universidades colombianas?',
              a: 'Las principales universidades colombianas usan Turnitin (Uniandes, Javeriana, Rosario, Externado) y algunas emplean iThenticate para tesis de posgrado. La detección de textos generados por IA se está integrando como módulo adicional dentro de estas plataformas.'
            },
            {
              q: '¿Cómo puede un profesor en Colombia detectar si un texto lo escribió ChatGPT?',
              a: 'Además de usar nuestro detector gratuito, los docentes colombianos pueden observar señales como: ausencia de referencias locales específicas, vocabulario excesivamente neutro sin regionalismos, párrafos que no reflejan el nivel propio del estudiante, y falta de ejemplos concretos del contexto colombiano.'
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