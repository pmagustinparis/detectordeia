'use client';

import DetectorMain from './components/DetectorMain';
import { ProductIcons, Icon } from '@/lib/icons';
import HumanizadorPromoBanner from './components/HumanizadorPromoBanner';

export default function HomePageClient() {
  return (
    <div className="min-h-screen bg-gray-100 pb-10 px-2">
      {/* Banner Promocional - Lanzamiento Humanizador */}
      <HumanizadorPromoBanner />

      {/* DETECTOR UNIFICADO */}
      <DetectorMain
        h1="El Mejor Detector de IA en Español"
        subtitle="Detecta contenido generado por IA con precisión líder. Gratis, privado y sin registro."
      />

      {/* VALUE PROPS/FEATURES ROW */}
      <section id="features" className="max-w-5xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-4 gap-6 px-2 mt-8 animate-slide-in-bottom">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all">
            <Icon icon={ProductIcons.Confidence} size="2xl" className="text-violet-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Precisión en español</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Optimizado para textos de España y LATAM. Resultados confiables y explicados.</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all">
            <Icon icon={ProductIcons.Locked} size="2xl" className="text-cyan-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Privacidad total</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Tus textos no se guardan ni comparten. 100% privado y seguro.</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all">
            <Icon icon={ProductIcons.Zap} size="2xl" className="text-emerald-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Sin registro</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Analizá textos gratis, sin crear cuenta. 10 usos diarios.</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all">
            <Icon icon={ProductIcons.Analytics} size="2xl" className="text-orange-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Reportes avanzados</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Planes premium con archivos, historial y reportes detallados.</p>
        </div>
      </section>

      {/* SECCIÓN DE BENEFICIOS */}
      <section className="max-w-5xl mx-auto mb-16 px-2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3 animate-fade-in">
          <span className="gradient-text-primary">¿Para quién es</span>
          <span className="text-gray-800"> DetectordeIA.ai?</span>
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Diseñado para profesionales, educadores, estudiantes y creadores de contenido
        </p>
        <div className="grid md:grid-cols-4 gap-6 animate-slide-in-bottom">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
              <Icon icon={ProductIcons.GraduationCap} size="2xl" className="text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Docentes</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Verifica la autenticidad de trabajos académicos de tus estudiantes.</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
              <Icon icon={ProductIcons.FileText} size="2xl" className="text-green-600" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Estudiantes</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Asegúrate de que tu trabajo no sea confundido con contenido de IA.</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
              <Icon icon={ProductIcons.PenTool} size="2xl" className="text-purple-600" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Creadores</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Valida que tu contenido mantenga autenticidad y originalidad.</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
              <Icon icon={ProductIcons.Building2} size="2xl" className="text-orange-600" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Empresas</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Asegura la calidad y autenticidad del contenido de tu organización.</p>
          </div>
        </div>
      </section>

      {/* OTRAS HERRAMIENTAS */}
      <section className="max-w-4xl mx-auto mb-16 px-2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">
          <span className="gradient-text-primary">Otras</span>
          <span className="text-gray-800"> herramientas</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Más herramientas para trabajar con contenido de IA
        </p>

        <div className="space-y-6">
          {/* Humanizador */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl shadow-lg border border-emerald-200 p-8 card-elevated">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg flex-shrink-0">
                <Icon icon={ProductIcons.Humanizer} size="2xl" className="text-emerald-600" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  ¿Tu texto suena a IA? Humanízalo
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Transforma texto generado por ChatGPT, Claude o cualquier IA en contenido que suena natural y humano. Gratis, sin registro, optimizado para español.
                </p>
                <a
                  href="/humanizador"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span>Probar el Humanizador de IA</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Parafraseador */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-lg border border-purple-200 p-8 card-elevated">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg flex-shrink-0">
                <Icon icon={ProductIcons.Paraphraser} size="2xl" className="text-purple-600" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  ¿Necesitas reescribir tu texto? Parafraseálo
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Reescribe cualquier texto con otras palabras manteniendo el significado. Sin plagio, sin registro, optimizado para español.
                </p>
                <a
                  href="/parafraseador"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span>Probar el Parafraseador</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
