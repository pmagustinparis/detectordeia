import { Metadata } from 'next';
import DetectorMain from '../components/DetectorMain';
import { getUserStatus } from '@/lib/user/getUserStatus';

export const metadata: Metadata = {
  title: 'Detector de IA para Chile – DetectordeIA.ai',
  description: 'Detecta si un texto fue escrito por inteligencia artificial en español de Chile. Herramienta gratuita, precisa y optimizada para Chile. Sin registro, ideal para estudiantes, docentes y empresas chilenas.',
  alternates: {
    canonical: 'https://detectordeia.ai/cl',
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
    title: 'Detector de IA para Chile – DetectordeIA.ai',
    description: 'Herramienta gratuita para detectar IA en textos, optimizada para español de Chile.',
    url: 'https://detectordeia.ai/cl',
    siteName: 'DetectordeIA.ai',
    images: [
      {
        url: 'https://detectordeia.ai/og-default.png', // Assuming a general logo, or replace if country-specific
        width: 1200,
        height: 630,
        alt: 'Detector de IA Chile - DetectordeIA.ai',
      },
    ],
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Detector de IA para Chile – DetectordeIA.ai',
    description: 'Herramienta gratuita para detectar IA en textos, optimizada para español de Chile.',
    images: ['https://detectordeia.ai/og-default.png'], // Assuming a general logo
  },
};

export default async function DetectorChile() {
  const initialUserStatus = await getUserStatus();
  return (
    <div className="min-h-screen bg-white pb-10 px-2">
      <DetectorMain
        h1="Detector de IA para Chile"
        subtitle="Detecta si un texto fue escrito por inteligencia artificial con precisión líder en Chile. Herramienta gratuita, sin registro, optimizada para español de Chile. Ideal para estudiantes, docentes y empresas chilenas."
        initialUserStatus={initialUserStatus}
      />

      {/* Contexto IA en Chile */}
      <section className="max-w-3xl mx-auto mt-10 px-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">IA en las Universidades Chilenas: Lo que Debes Saber</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          La <strong>Universidad de Chile</strong> y la <strong>Pontificia Universidad Católica de Chile (UC)</strong> son las instituciones que lideran el debate sobre integridad académica y uso de IA en el país. Ambas han publicado lineamientos que exigen transparencia: si utilizas herramientas de IA generativa en un trabajo académico, debes declararlo explícitamente y describir de qué manera la empleaste.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          El <strong>CRUCH (Consejo de Rectores de Universidades Chilenas)</strong>, que agrupa a las 30 universidades estatales y tradicionales, está desarrollando un marco común de política de IA para la educación superior. Hasta que ese marco esté vigente, cada universidad aplica sus propias normas. Turnitin con detección de IA ya está activo en varias instituciones chilenas.
        </p>

        {/* Universidades chilenas */}
        <h3 className="text-lg font-semibold text-slate-700 mt-6 mb-3">Detector de IA para Universidades Chilenas</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {[
            { name: 'U. de Chile', slug: 'universidad-chile' },
            { name: 'UC Chile', slug: 'pontificia-universidad-catolica-chile' },
            { name: 'Ver todas →', slug: '' },
          ].map((uni) => (
            <a
              key={uni.slug || 'all'}
              href={uni.slug ? `/detector-de-ia-universidad/${uni.slug}` : '/universidades'}
              className="bg-red-50 hover:bg-red-100 text-red-700 rounded-lg px-3 py-2 text-sm font-medium text-center transition-colors"
            >
              {uni.name}
            </a>
          ))}
        </div>
      </section>

      {/* FAQs Chile */}
      <section className="max-w-3xl mx-auto px-4 mb-10">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Preguntas Frecuentes sobre IA en Chile</h2>
        <div className="space-y-3">
          {[
            {
              q: '¿Funciona con textos académicos y legales de Chile?',
              a: 'Sí. El detector reconoce el español chileno y sus características lingüísticas. Es eficaz con trabajos académicos, informes de investigación y textos jurídicos de universidades chilenas como la UC, la U. de Chile y las universidades regionales.'
            },
            {
              q: '¿La UC y la U. de Chile permiten usar ChatGPT en los trabajos?',
              a: 'Ambas instituciones permiten usar IA como herramienta de apoyo con declaración explícita. La UC ha publicado guías para docentes sobre cómo diseñar evaluaciones que reduzcan el riesgo de uso fraudulento de IA. En ningún caso se permite que la IA sustituya el razonamiento propio del estudiante.'
            },
            {
              q: '¿Qué sistemas antiplagio usan las universidades chilenas?',
              a: 'Las principales universidades del CRUCH utilizan Turnitin, que ya incluye módulo de detección de IA en su versión actualizada. Algunas universidades privadas usan iThenticate o Compilatio. La adopción de detectores específicos de IA está creciendo rápidamente desde 2024.'
            },
            {
              q: '¿Cómo afecta la política del CRUCH a los estudiantes chilenos?',
              a: 'Mientras el CRUCH finaliza su marco común, cada institución aplica sus propias normas. Lo más seguro es declarar siempre el uso de IA, aunque no se te haya pedido explícitamente. Si tu profesor no ha dado indicaciones, pregunta antes de entregar. El desconocimiento de la política no exime de responsabilidad académica.'
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