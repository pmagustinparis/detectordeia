'use client';

import DetectorMain from '../components/DetectorMain';
import { ProductIcons, Icon } from '@/lib/icons';
import HumanizadorPromoBanner from '../components/HumanizadorPromoBanner';

export default function VerificadorPageClient() {
  return (
    <div className="min-h-screen bg-gray-100 pb-10 px-2">
      {/* Banner Promocional */}
      <HumanizadorPromoBanner />

      {/* DETECTOR - Mismo componente, copy diferente */}
      <DetectorMain
        h1="Verificador de IA Confiable"
        subtitle="Verifica si un texto fue generado por inteligencia artificial. Análisis preciso en español para ChatGPT, Claude y Gemini. Gratis y sin registro."
      />

      {/* VALUE PROPS - Optimizado para keyword "verificar" */}
      <section id="features" className="max-w-5xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-4 gap-6 px-2 mt-8 animate-slide-in-bottom">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all">
            <Icon icon={ProductIcons.Confidence} size="2xl" className="text-violet-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Verificación confiable</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Verifica contenido con alta precisión. Algoritmos optimizados para español.</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all">
            <Icon icon={ProductIcons.Locked} size="2xl" className="text-cyan-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Verificación privada</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Verifica textos con total privacidad. Tus datos no se almacenan.</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all">
            <Icon icon={ProductIcons.Fast} size="2xl" className="text-emerald-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Verificación rápida</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Verifica textos en segundos. Sin registro ni configuración.</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all">
            <Icon icon={ProductIcons.Analytics} size="2xl" className="text-orange-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Reportes de verificación</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Verifica con reportes detallados. Planes premium con historial completo.</p>
        </div>
      </section>

      {/* SEO CONTENT - Optimizado para "verificador de ia" */}
      <section className="max-w-5xl mx-auto mb-16 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Qué es un Verificador de IA?</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Un verificador de IA es una herramienta especializada que permite verificar la autenticidad de textos, determinando si fueron
            escritos por un humano o generados por inteligencia artificial. Nuestro verificador analiza patrones lingüísticos, coherencia
            y otros indicadores para verificar el origen del contenido con alta precisión.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">¿Cómo Verificar si un Texto es de IA?</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Para verificar si un texto fue generado por IA, nuestro verificador utiliza algoritmos de aprendizaje automático entrenados
            específicamente en español. Solo tienes que pegar el texto, hacer clic en "Verificar" y obtendrás un resultado instantáneo
            con porcentaje de probabilidad y nivel de confianza.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">¿Por Qué Necesitas un Verificador de IA?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li><strong>Instituciones educativas:</strong> Verifican la autenticidad de trabajos académicos</li>
            <li><strong>Editores y medios:</strong> Verifican artículos antes de publicación</li>
            <li><strong>Empresas:</strong> Verifican contenido de marketing y comunicaciones</li>
            <li><strong>Autores:</strong> Verifican que su contenido no parezca generado por IA</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Ventajas de Nuestro Verificador de IA</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            A diferencia de otros verificadores, DetectordeIA.ai está optimizado para el español y ofrece verificación gratuita
            con 10 usos diarios. Verifica textos de ChatGPT, Claude, Gemini y otros modelos de IA con resultados claros y explicados.
            No requiere registro y garantiza total privacidad en la verificación.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Verificación vs Detección de IA</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Si bien "verificar" y "detectar" son términos similares, nuestro verificador de IA va más allá de la simple detección.
            Verifica no solo la presencia de contenido generado por IA, sino que también proporciona un análisis detallado de confianza,
            explicaciones y recomendaciones para mejorar la autenticidad del texto.
          </p>
        </div>
      </section>
    </div>
  );
}
