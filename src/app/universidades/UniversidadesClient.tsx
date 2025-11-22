'use client';

import { ProductIcons, Icon } from '@/lib/icons';
import universities from '@/data/universities.json';

// Agrupar universidades por país
const universitiesByCountry = universities.reduce((acc, uni) => {
  if (!acc[uni.country]) {
    acc[uni.country] = [];
  }
  acc[uni.country].push(uni);
  return acc;
}, {} as Record<string, typeof universities>);

// Ordenar países
const countries = Object.keys(universitiesByCountry).sort();

export default function UniversidadesClient() {
  return (
    <div className="min-h-screen bg-gray-100 pb-10 px-2">
      {/* HERO SECTION */}
      <section className="w-full flex flex-col items-center justify-center pt-6 pb-8 px-2 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-violet-300/20 rounded-full blur-3xl -z-10 animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl -z-10 animate-float" style={{animationDelay: '1s'}}></div>

        {/* Hero Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-3 mt-2 leading-tight animate-fade-in">
          <span className="gradient-text-primary">Detector de IA</span>
          <br />
          <span className="text-gray-800">para Universidades</span>
        </h1>

        <p className="text-base md:text-lg text-gray-600 text-center mb-4 max-w-2xl animate-fade-in" style={{animationDelay: '0.2s'}}>
          Herramienta académica gratuita para estudiantes y profesores de las principales universidades de LATAM y España
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-6 animate-fade-in" style={{animationDelay: '0.4s'}}>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-violet-100">
            <Icon icon={ProductIcons.Confidence} size="lg" className="text-violet-600" />
            <span className="text-sm font-medium text-gray-700">Preciso y confiable</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-violet-100">
            <Icon icon={ProductIcons.Locked} size="lg" className="text-cyan-600" />
            <span className="text-sm font-medium text-gray-700">100% privado</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-violet-100">
            <Icon icon={ProductIcons.GraduationCap} size="lg" className="text-emerald-600" />
            <span className="text-sm font-medium text-gray-700">Compatible con políticas académicas</span>
          </div>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="max-w-5xl mx-auto mb-12 px-2">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-100 p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-800">
            Verifica autenticidad académica con confianza
          </h2>
          <p className="text-gray-600 text-center leading-relaxed mb-6 max-w-3xl mx-auto">
            DetectorDeIA.ai es utilizado por estudiantes y profesores de las principales universidades de LATAM y España
            para verificar la autenticidad de trabajos académicos. Nuestra herramienta está optimizada para cumplir con
            las políticas de integridad académica de cada institución.
          </p>
          <div className="text-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span>Probar Detector de IA Gratis</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* UNIVERSIDADES POR PAÍS */}
      <section className="max-w-6xl mx-auto mb-16 px-2">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          <span className="gradient-text-primary">Universidades</span>
          <span className="text-gray-800"> en nuestro sistema</span>
        </h2>

        <div className="space-y-8">
          {countries.map((country) => (
            <div key={country} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-100 p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                <span className="text-2xl">🎓</span>
                {country}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {universitiesByCountry[country].map((uni) => (
                  <a
                    key={uni.slug}
                    href={`/detector-de-ia-universidad/${uni.slug}`}
                    className="group p-4 bg-gradient-to-br from-violet-50 to-purple-50 hover:from-violet-100 hover:to-purple-100 rounded-xl border border-violet-200 hover:border-violet-300 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon icon={ProductIcons.GraduationCap} size="lg" className="text-violet-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-800 text-sm mb-1 group-hover:text-violet-700 transition-colors">
                          {uni.shortName}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {uni.name}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-500">{uni.city}</span>
                          {uni.usesTurnitin && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                              Turnitin
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="max-w-5xl mx-auto mb-16 px-2">
        <div className="bg-gradient-to-br from-violet-600 to-purple-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            DetectorDeIA.ai en números
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold mb-2">{universities.length}</div>
              <div className="text-violet-100">Universidades</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold mb-2">12</div>
              <div className="text-violet-100">Países</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold mb-2">2M+</div>
              <div className="text-violet-100">Estudiantes alcanzados</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-4xl mx-auto mb-16 px-2">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-100 p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
            ¿Tu universidad no está en la lista?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Nuestro detector funciona para cualquier universidad. La herramienta es la misma, solo personalizamos
            el contenido para instituciones específicas. Puedes usar el detector principal sin problema.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <span>Usar Detector Principal</span>
            <span>→</span>
          </a>
        </div>
      </section>
    </div>
  );
}
