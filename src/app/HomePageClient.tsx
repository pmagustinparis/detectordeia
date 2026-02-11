'use client';

import DetectorMain from './components/DetectorMain';
import { ProductIcons, Icon } from '@/lib/icons';
import HumanizadorPromoBanner from './components/HumanizadorPromoBanner';
import ExpressPromoBanner from './components/ExpressPromoBanner';

export default function HomePageClient() {
  return (
    <div className="min-h-screen bg-white pb-24 px-4">
      {/* Banner Promocional - Express Pass */}
      <ExpressPromoBanner />

      {/* Banner Promocional - Lanzamiento Humanizador */}
      <HumanizadorPromoBanner />

      {/* DETECTOR UNIFICADO */}
      <DetectorMain
        h1="El Mejor Detector de IA en Español"
        subtitle="Detecta contenido generado por IA con precisión líder. Gratis, privado y sin registro."
      />

      {/* VALUE PROPS/FEATURES - GRID LIMPIO */}
      <section id="features" className="max-w-6xl mx-auto mb-32 px-2 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white border-l-4 border-blue-900 p-8 animate-slide-in-left" style={{animationDelay: '0s'}}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon icon={ProductIcons.Confidence} size="xl" className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-blue-900" style={{fontFamily: "'Georgia', serif"}}>Precisión en español</h3>
            </div>
            <p className="text-gray-700 text-base leading-relaxed">
              Optimizado para textos de España y LATAM. Resultados confiables y explicados en tu idioma.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white border-l-4 border-red-600 p-8 animate-fade-in" style={{animationDelay: '0.1s'}}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon icon={ProductIcons.Locked} size="xl" className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-blue-900" style={{fontFamily: "'Georgia', serif"}}>Privacidad total</h3>
            </div>
            <p className="text-gray-700 text-base leading-relaxed">
              Tus textos no se guardan ni comparten. 100% privado, seguro y sin datos guardados en servidores.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white border-l-4 border-blue-900 p-8 animate-slide-in-right" style={{animationDelay: '0.2s'}}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon icon={ProductIcons.Fast} size="xl" className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-blue-900" style={{fontFamily: "'Georgia', serif"}}>Sin registro</h3>
            </div>
            <p className="text-gray-700 text-base leading-relaxed">
              Analizá textos gratis, sin crear cuenta. 10 usos diarios sin necesidad de identificación.
            </p>
          </div>
        </div>

        {/* Feature destacado - Reportes */}
        <div className="mt-12 bg-blue-50 border border-blue-200 p-8 rounded-lg">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="w-16 h-16 bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon icon={ProductIcons.Analytics} size="2xl" className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-blue-900 mb-2" style={{fontFamily: "'Georgia', serif"}}>Reportes avanzados</h3>
              <p className="text-gray-700 text-base leading-relaxed">
                Planes premium con análisis de archivos, historial completo y reportes detallados para docentes y profesionales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VARIANTES DEL DETECTOR - Internal Linking SEO */}
      <section className="max-w-5xl mx-auto mb-32 px-2">
        <div className="border-l-4 border-blue-900 pl-6">
          <p className="text-sm font-semibold text-blue-900 mb-6 uppercase tracking-wider">También conocido como</p>
          <div className="flex flex-wrap gap-3">
            <a href="/identificador-de-ia" className="px-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all">
              Identificador de IA
            </a>
            <a href="/verificador-de-ia" className="px-4 py-2.5 bg-white hover:bg-blue-50 text-blue-900 font-medium rounded-lg border border-blue-900 shadow-sm hover:shadow-md transition-all">
              Verificador de IA
            </a>
            <a href="/comprobador-de-ia" className="px-4 py-2.5 bg-white hover:bg-blue-50 text-blue-900 font-medium rounded-lg border border-blue-900 shadow-sm hover:shadow-md transition-all">
              Comprobador de IA
            </a>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE BENEFICIOS - LIMPIA Y CLARA */}
      <section className="max-w-5xl mx-auto mb-32 px-2">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 text-center" style={{fontFamily: "'Georgia', serif"}}>
          Diseñado para estudiantes y educadores
        </h2>
        <p className="text-center text-gray-700 text-lg mb-16 max-w-3xl mx-auto">
          La herramienta de confianza para verificar la autenticidad del trabajo académico
        </p>

        <div className="space-y-16">
          {/* Docentes */}
          <div className="flex flex-col md:flex-row gap-12 items-center border-b pb-12">
            <div className="md:w-1/2">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center">
                  <Icon icon={ProductIcons.GraduationCap} size="lg" className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900" style={{fontFamily: "'Georgia', serif"}}>Para Docentes</h3>
              </div>
              <p className="text-gray-700 text-base leading-relaxed">
                Verifica la autenticidad de trabajos académicos de tus estudiantes. Detecta contenido generado por ChatGPT, Claude y otras IA en ensayos y trabajos finales.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="w-full aspect-square bg-blue-50 rounded-lg border border-blue-200 flex items-center justify-center">
                <div className="text-4xl">📚</div>
              </div>
            </div>
          </div>

          {/* Estudiantes */}
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center border-b pb-12">
            <div className="md:w-1/2">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <Icon icon={ProductIcons.FileText} size="lg" className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900" style={{fontFamily: "'Georgia', serif"}}>Para Estudiantes</h3>
              </div>
              <p className="text-gray-700 text-base leading-relaxed">
                Asegúrate de que tu trabajo sea reconocido como auténtico. Valida tu escritura antes de entregar ensayos, trabajos finales y proyectos de investigación.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="w-full aspect-square bg-red-50 rounded-lg border border-red-200 flex items-center justify-center">
                <div className="text-4xl">✍️</div>
              </div>
            </div>
          </div>

          {/* Creadores */}
          <div className="flex flex-col md:flex-row gap-12 items-center border-b pb-12">
            <div className="md:w-1/2">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center">
                  <Icon icon={ProductIcons.PenTool} size="lg" className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900" style={{fontFamily: "'Georgia', serif"}}>Para Creadores</h3>
              </div>
              <p className="text-gray-700 text-base leading-relaxed">
                Valida que tu contenido mantenga autenticidad. Ideal para bloggers, periodistas, escritores y creadores de contenido que confían en la originalidad.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="w-full aspect-square bg-blue-50 rounded-lg border border-blue-200 flex items-center justify-center">
                <div className="text-4xl">✨</div>
              </div>
            </div>
          </div>

          {/* Instituciones */}
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
            <div className="md:w-1/2">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <Icon icon={ProductIcons.Building2} size="lg" className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900" style={{fontFamily: "'Georgia', serif"}}>Para Instituciones</h3>
              </div>
              <p className="text-gray-700 text-base leading-relaxed">
                Asegura la calidad y autenticidad del contenido. Escala la verificación con planes empresariales y licencias institucionales para universidades.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="w-full aspect-square bg-red-50 rounded-lg border border-red-200 flex items-center justify-center">
                <div className="text-4xl">🏛️</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OTRAS HERRAMIENTAS - GRID LIMPIO */}
      <section className="max-w-6xl mx-auto px-2">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6" style={{fontFamily: "'Georgia', serif"}}>
          Amplía tu toolkit
        </h2>
        <p className="text-gray-700 text-lg max-w-2xl mb-16">
          Completa tu detector con herramientas complementarias para humanizar y parafrasear contenido.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Humanizador */}
          <div className="bg-white border-2 border-green-600 rounded-lg p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon icon={ProductIcons.Humanizer} size="2xl" className="text-white" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Nueva herramienta</span>
                <h3 className="text-3xl font-bold text-blue-900 mt-2" style={{fontFamily: "'Georgia', serif"}}>
                  Humanizador de IA
                </h3>
              </div>
            </div>
            <p className="text-gray-700 text-base leading-relaxed mb-8">
              Transforma texto generado por ChatGPT, Claude o cualquier IA en contenido que suena natural, humano y auténtico. Perfecto para ensayos y contenido académico.
            </p>
            <a
              href="/humanizador"
              className="inline-flex items-center gap-3 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all"
            >
              <span>Probar ahora</span>
              <span>→</span>
            </a>
          </div>

          {/* Parafraseador */}
          <div className="bg-white border-2 border-blue-900 rounded-lg p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-16 h-16 bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon icon={ProductIcons.Paraphraser} size="2xl" className="text-white" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Herramienta destacada</span>
                <h3 className="text-3xl font-bold text-blue-900 mt-2" style={{fontFamily: "'Georgia', serif"}}>
                  Parafraseador
                </h3>
              </div>
            </div>
            <p className="text-gray-700 text-base leading-relaxed mb-8">
              Reescribe cualquier texto con otras palabras manteniendo el significado. Sin plagio, sin registro y optimizado para español académico.
            </p>
            <a
              href="/parafraseador"
              className="inline-flex items-center gap-3 px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg transition-all"
            >
              <span>Explorar</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
