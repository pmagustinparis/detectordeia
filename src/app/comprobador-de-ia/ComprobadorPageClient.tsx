'use client';

import DetectorMain from '../components/DetectorMain';
import { ProductIcons, Icon } from '@/lib/icons';
import HumanizadorPromoBanner from '../components/HumanizadorPromoBanner';

export default function ComprobadorPageClient() {
  return (
    <div className="min-h-screen bg-gray-100 pb-10 px-2">
      {/* Banner Promocional */}
      <HumanizadorPromoBanner />

      {/* DETECTOR - Mismo componente, copy diferente */}
      <DetectorMain
        h1="Comprobador de IA Preciso"
        subtitle="Comprueba si un texto fue generado por inteligencia artificial. Análisis confiable en español para ChatGPT, Claude, Gemini y más. Gratis y sin registro."
      />

      {/* VALUE PROPS - Optimizado para keyword "comprobar" */}
      <section id="features" className="max-w-5xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-4 gap-6 px-2 mt-8 animate-slide-in-bottom">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all">
            <Icon icon={ProductIcons.Confidence} size="2xl" className="text-violet-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Comprobación precisa</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Comprueba contenido con alta precisión. Optimizado para textos en español.</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all">
            <Icon icon={ProductIcons.Locked} size="2xl" className="text-cyan-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Comprobación segura</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Comprueba textos con total seguridad. Privacidad 100% garantizada.</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all">
            <Icon icon={ProductIcons.Fast} size="2xl" className="text-emerald-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Comprobación instantánea</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Comprueba textos al instante. Sin esperas ni complicaciones.</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all">
            <Icon icon={ProductIcons.Analytics} size="2xl" className="text-orange-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Comprobación detallada</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Comprueba con reportes completos. Análisis detallado de resultados.</p>
        </div>
      </section>

      {/* SEO CONTENT - Optimizado para "comprobador de ia" */}
      <section className="max-w-5xl mx-auto mb-16 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Qué es un Comprobador de IA?</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Un comprobador de IA es una herramienta especializada diseñada para comprobar la autenticidad de textos, determinando si fueron
            escritos por un ser humano o generados automáticamente por inteligencia artificial. Nuestro comprobador analiza múltiples
            factores lingüísticos para comprobar el origen del contenido con alta fiabilidad.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">¿Cómo Comprobar si un Texto es de IA?</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Para comprobar si un texto fue generado por IA, simplemente pega el contenido en nuestro comprobador y haz clic en "Analizar".
            El comprobador procesará el texto en segundos y te mostrará un resultado claro: porcentaje de probabilidad de que sea IA,
            nivel de confianza del análisis y explicación detallada de los factores considerados.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">¿Para Qué Sirve un Comprobador de IA?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li><strong>Educación:</strong> Profesores comprueban la originalidad de trabajos estudiantiles</li>
            <li><strong>Contenido web:</strong> Editores comprueban artículos antes de publicar</li>
            <li><strong>Marketing:</strong> Empresas comprueban la autenticidad del contenido promocional</li>
            <li><strong>Investigación:</strong> Académicos comprueban documentos y papers</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Características de un Buen Comprobador de IA</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Un comprobador de IA efectivo debe ser preciso, rápido y fácil de usar. DetectordeIA.ai cumple con todos estos requisitos:
            comprueba textos con alta precisión en español, ofrece resultados instantáneos y no requiere conocimientos técnicos.
            Además, comprueba contenido de múltiples modelos de IA incluyendo ChatGPT, Claude y Gemini.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Comprobador de IA vs Detector de IA</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Aunque "comprobar" y "detectar" son conceptos relacionados, un comprobador de IA implica un proceso de verificación
            más exhaustivo. Nuestro comprobador no solo detecta la presencia de contenido generado por IA, sino que también comprueba
            diversos indicadores lingüísticos, proporciona un análisis de confianza y ofrece explicaciones detalladas del resultado.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">¿Es Gratis el Comprobador de IA?</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Sí, nuestro comprobador de IA ofrece 10 comprobaciones diarias completamente gratis, sin necesidad de registro.
            Para usuarios con mayores necesidades, ofrecemos planes premium con comprobaciones ilimitadas, carga de archivos,
            historial completo y reportes descargables. Comprueba ahora y descubre la diferencia de un comprobador optimizado para español.
          </p>
        </div>
      </section>
    </div>
  );
}
