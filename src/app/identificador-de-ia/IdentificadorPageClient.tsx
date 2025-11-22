'use client';

import DetectorMain from '../components/DetectorMain';
import { ProductIcons, Icon } from '@/lib/icons';
import HumanizadorPromoBanner from '../components/HumanizadorPromoBanner';

export default function IdentificadorPageClient() {
  return (
    <div className="min-h-screen bg-gray-100 pb-10 px-2">
      {/* Banner Promocional */}
      <HumanizadorPromoBanner />

      {/* DETECTOR - Mismo componente, copy diferente */}
      <DetectorMain
        h1="Identificador de IA Online Gratis"
        subtitle="Identifica textos generados por ChatGPT, Claude, Gemini y otras IA. Resultados precisos en español. Gratis y sin registro."
      />

      {/* VALUE PROPS - Optimizado para keyword "identificar" */}
      <section id="features" className="max-w-5xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-4 gap-6 px-2 mt-8 animate-slide-in-bottom">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all">
            <Icon icon={ProductIcons.Confidence} size="2xl" className="text-violet-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Identificación precisa</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Identifica contenido de IA con alta precisión. Optimizado para español de España y LATAM.</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all">
            <Icon icon={ProductIcons.Locked} size="2xl" className="text-cyan-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Privado y seguro</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Tus textos no se almacenan. Identificación 100% privada y confidencial.</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all">
            <Icon icon={ProductIcons.Fast} size="2xl" className="text-emerald-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Instantáneo y gratis</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Identifica textos al instante. Sin crear cuenta. 10 usos diarios gratis.</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all">
            <Icon icon={ProductIcons.Analytics} size="2xl" className="text-orange-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Múltiples IA identificadas</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Identifica ChatGPT, Claude, Gemini, Llama y más. Reportes detallados disponibles.</p>
        </div>
      </section>

      {/* SEO CONTENT - Optimizado para "identificador de ia" */}
      <section className="max-w-5xl mx-auto mb-16 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Qué es un Identificador de IA?</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Un identificador de IA es una herramienta que analiza textos para determinar si fueron escritos por inteligencia artificial
            (como ChatGPT, Claude o Gemini) o por un humano. A diferencia de otros detectores, nuestro identificador está específicamente
            optimizado para el español, ofreciendo resultados más precisos en textos de España y América Latina.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">¿Cómo Funciona Nuestro Identificador de IA?</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Nuestro identificador utiliza algoritmos avanzados de procesamiento de lenguaje natural para identificar patrones característicos
            de textos generados por IA. Analiza factores como la estructura de oraciones, uso de vocabulario, coherencia y otros indicadores
            que diferencian el contenido creado por IA del escrito por humanos.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">¿Por Qué Usar un Identificador de IA?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li><strong>Educación:</strong> Profesores identifican trabajos académicos generados por IA</li>
            <li><strong>Empresas:</strong> Verifican la autenticidad del contenido web y marketing</li>
            <li><strong>Periodismo:</strong> Periodistas identifican artículos creados por IA</li>
            <li><strong>Estudiantes:</strong> Verifican que sus trabajos no parezcan generados por IA</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Características del Mejor Identificador de IA</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            DetectordeIA.ai se destaca como el mejor identificador de IA en español por su precisión, velocidad y facilidad de uso.
            Identifica contenido de múltiples modelos de IA (ChatGPT 3.5, ChatGPT 4, Claude, Gemini) y ofrece resultados detallados
            con porcentaje de probabilidad y análisis de confianza.
          </p>
        </div>
      </section>
    </div>
  );
}
