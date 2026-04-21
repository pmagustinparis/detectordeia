import { Metadata } from 'next';
import DetectorMain from '../components/DetectorMain';
import { getUserStatus } from '@/lib/user/getUserStatus';

export const metadata: Metadata = {
  title: 'Detector de IA para Perú – DetectordeIA.ai',
  description: 'Detecta si un texto fue escrito por inteligencia artificial en español de Perú. Herramienta gratuita, precisa y optimizada para Perú. Sin registro, ideal para estudiantes, docentes y empresas.',
  alternates: {
    canonical: 'https://detectordeia.ai/pe',
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
    title: 'Detector de IA para Perú – DetectordeIA.ai',
    description: 'Herramienta gratuita para detectar IA en textos, optimizada para español de Perú.',
    url: 'https://detectordeia.ai/pe',
    siteName: 'DetectordeIA.ai',
    images: [
      {
        url: 'https://detectordeia.ai/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Detector de IA Perú - DetectordeIA.ai',
      },
    ],
    locale: 'es_PE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Detector de IA para Perú – DetectordeIA.ai',
    description: 'Herramienta gratuita para detectar IA en textos, optimizada para español de Perú.',
    images: ['https://detectordeia.ai/og-default.png'],
  },
};

export default async function DetectorPeru() {
  const initialUserStatus = await getUserStatus();
  return (
    <div className="min-h-screen bg-white pb-10 px-2">
      <DetectorMain
        h1="Detector de IA para Perú"
        subtitle="Detecta si un texto fue escrito por inteligencia artificial con precisión líder en Perú. Herramienta gratuita, sin registro, optimizada para español de Perú. Ideal para estudiantes, docentes y empresas peruanas."
        initialUserStatus={initialUserStatus}
      />

      {/* Contexto IA en Perú */}
      <section className="max-w-3xl mx-auto mt-10 px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">IA en las Universidades Peruanas: Lo que Debes Saber</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          La <strong>UNMSM (Universidad Nacional Mayor de San Marcos)</strong>, la más antigua de América, y la <strong>PUCP (Pontificia Universidad Católica del Perú)</strong> están desarrollando activamente políticas sobre el uso de inteligencia artificial en trabajos académicos. La PUCP ha publicado recomendaciones que permiten el uso de IA con declaración expresa, mientras la UNMSM evalúa lineamientos más restrictivos para ciertas carreras.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Perú aprobó en 2023 una <strong>Estrategia Nacional de Inteligencia Artificial</strong>, lo que ha acelerado el debate en las universidades. La SUNEDU (superintendencia universitaria) recomienda que cada institución establezca su propia política antes de 2026. Mientras tanto, el uso indebido de IA puede considerarse falta contra la integridad académica bajo el Reglamento Estudiantil de cada universidad.
        </p>

        {/* Universidades peruanas */}
        <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Detector de IA para Universidades Peruanas</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {[
            { name: 'UNMSM San Marcos', slug: 'universidad-san-marcos' },
            { name: 'PUCP', slug: 'universidad-catolica-peru' },
            { name: 'Ver todas →', slug: '' },
          ].map((uni) => (
            <a
              key={uni.slug || 'all'}
              href={uni.slug ? `/detector-de-ia-universidad/${uni.slug}` : '/universidades'}
              className="bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg px-3 py-2 text-sm font-medium text-center transition-colors"
            >
              {uni.name}
            </a>
          ))}
        </div>
      </section>

      {/* FAQs Perú */}
      <section className="max-w-3xl mx-auto px-4 mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Preguntas Frecuentes sobre IA en Perú</h2>
        <div className="space-y-3">
          {[
            {
              q: '¿Funciona con textos académicos y legales de Perú?',
              a: 'Sí. El detector reconoce el español peruano y sus variantes regionales. Es eficaz con monografías, tesis, informes de prácticas y trabajos de investigación de universidades peruanas como la UNMSM, PUCP, UNI, UP y UNMSM, entre otras.'
            },
            {
              q: '¿La PUCP y la UNMSM permiten usar ChatGPT en los trabajos?',
              a: 'La PUCP permite el uso de IA como herramienta de apoyo con declaración explícita en el trabajo. La UNMSM está en proceso de definir su política formal; hasta entonces, se aplica el criterio del docente. En ambas instituciones está prohibido presentar texto generado íntegramente por IA como propio.'
            },
            {
              q: '¿Qué sistemas antiplagio se usan en las universidades peruanas?',
              a: 'La PUCP usa Turnitin de forma extendida en pregrado y posgrado, incluyendo el módulo de detección de IA. La UNMSM utiliza herramientas propias y acuerdos con plataformas externas. Universidades privadas como la UP, USIL y UPC también emplean Turnitin o Compilatio para verificación de originalidad.'
            },
            {
              q: '¿Qué dice la SUNEDU sobre el uso de IA en trabajos universitarios?',
              a: 'La SUNEDU no ha emitido una norma específica sobre IA en trabajos académicos, pero su marco de licenciamiento exige que las universidades garanticen la calidad y originalidad del trabajo estudiantil. Usar IA para generar contenido sin declararlo puede vulnerar los reglamentos de cada institución y poner en riesgo la validez de los títulos obtenidos.'
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