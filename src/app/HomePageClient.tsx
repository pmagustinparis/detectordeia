'use client';

import DetectorMain from './components/DetectorMain';
import { ProductIcons, Icon } from '@/lib/icons';
import type { UserStatus } from '@/lib/types/user-status';

export default function HomePageClient({ initialUserStatus }: { initialUserStatus?: UserStatus }) {
  return (
    <div className="min-h-screen bg-papel pb-24 px-4">
      {/* DETECTOR UNIFICADO */}
      <DetectorMain
        h1="El Mejor Detector de IA en Español"
        subtitle="Detecta contenido generado por IA con precisión líder. Gratis, privado y sin registro."
        initialUserStatus={initialUserStatus}
      />

      {/* VALUE PROPS/FEATURES */}
      <section id="features" className="max-w-6xl mx-auto mb-32 px-2 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-papel-2 border-l-2 border-verde p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-verde rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon icon={ProductIcons.Confidence} size="xl" className="text-papel" />
              </div>
              <h3 className="text-xl text-tinta">Precisión en español</h3>
            </div>
            <p className="text-tinta-soft text-base leading-relaxed">
              Optimizado para textos de España y LATAM. Resultados confiables y explicados en tu idioma.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-papel-2 border-l-2 border-tinta-soft p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-tinta-soft rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon icon={ProductIcons.Locked} size="xl" className="text-papel" />
              </div>
              <h3 className="text-xl text-tinta">Privacidad total</h3>
            </div>
            <p className="text-tinta-soft text-base leading-relaxed">
              Tus textos no se guardan ni comparten. 100% privado, seguro y sin datos guardados en servidores.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-papel-2 border-l-2 border-verde p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-verde rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon icon={ProductIcons.Fast} size="xl" className="text-papel" />
              </div>
              <h3 className="text-xl text-tinta">Sin registro</h3>
            </div>
            <p className="text-tinta-soft text-base leading-relaxed">
              Analizá textos gratis, sin crear cuenta. 10 usos diarios sin necesidad de identificación.
            </p>
          </div>
        </div>

        {/* Feature destacado - Reportes */}
        <div className="mt-12 bg-papel-2 border border-line p-8 rounded-lg">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="w-16 h-16 bg-verde rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon icon={ProductIcons.Analytics} size="2xl" className="text-papel" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl text-tinta mb-2">Reportes avanzados</h3>
              <p className="text-tinta-soft text-base leading-relaxed">
                Express Pass y Semestral Pass con análisis de archivos, historial completo y reportes detallados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VARIANTES DEL DETECTOR - Internal Linking SEO */}
      <section className="max-w-5xl mx-auto mb-32 px-2">
        <div className="border-l-2 border-line pl-6">
          <p className="font-mono text-xs font-medium text-mute mb-6 uppercase tracking-wider">También conocido como</p>
          <div className="flex flex-wrap gap-3">
            <a href="/identificador-de-ia" className="px-4 py-2.5 bg-tinta hover:bg-tinta-soft text-papel font-medium rounded-lg transition-all">
              Identificador de IA
            </a>
            <a href="/verificador-de-ia" className="px-4 py-2.5 bg-papel-2 hover:bg-papel-3 text-tinta font-medium rounded-lg border border-line transition-all">
              Verificador de IA
            </a>
            <a href="/comprobador-de-ia" className="px-4 py-2.5 bg-papel-2 hover:bg-papel-3 text-tinta font-medium rounded-lg border border-line transition-all">
              Comprobador de IA
            </a>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE BENEFICIOS */}
      <section className="max-w-5xl mx-auto mb-32 px-2">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-tinta mb-4">
            Confianza académica
          </h2>
          <p className="text-tinta-soft text-lg max-w-3xl mx-auto">
            Utilizado por docentes, estudiantes e instituciones para verificar autenticidad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-papel-2 border-l-2 border-verde p-8 card-elevated">
            <h3 className="text-xl text-tinta mb-4">Docentes</h3>
            <p className="text-tinta-soft text-base leading-relaxed">
              Verifica la autenticidad de trabajos académicos. Detecta contenido generado por IA en ensayos y trabajos finales de manera confiable.
            </p>
          </div>

          <div className="bg-papel-2 border-l-2 border-line p-8 card-elevated">
            <h3 className="text-xl text-tinta mb-4">Estudiantes</h3>
            <p className="text-tinta-soft text-base leading-relaxed">
              Valida que tu trabajo sea reconocido como auténtico. Asegúrate antes de entregar ensayos, proyectos e investigaciones.
            </p>
          </div>

          <div className="bg-papel-2 border-l-2 border-verde p-8 card-elevated">
            <h3 className="text-xl text-tinta mb-4">Instituciones</h3>
            <p className="text-tinta-soft text-base leading-relaxed">
              Implementa verificación de autenticidad en toda tu institución. Escalable y confiable para universidades y centros educativos.
            </p>
          </div>
        </div>
      </section>

      {/* OTRAS HERRAMIENTAS */}
      <section className="max-w-6xl mx-auto px-2">
        <h2 className="text-4xl md:text-5xl text-tinta mb-6">
          Amplía tu toolkit
        </h2>
        <p className="text-tinta-soft text-lg max-w-2xl mb-16">
          Completa tu detector con herramientas complementarias para humanizar y parafrasear contenido.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Humanizador */}
          <div className="bg-papel-2 border border-line-soft rounded-lg p-8 card-elevated">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-16 h-16 bg-verde rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon icon={ProductIcons.Humanizer} size="2xl" className="text-papel" />
              </div>
              <div className="flex-1">
                <span className="font-mono text-xs font-medium text-mute uppercase tracking-wider">Herramienta popular</span>
                <h3 className="text-3xl text-tinta mt-2">
                  Humanizador de IA
                </h3>
              </div>
            </div>
            <p className="text-tinta-soft text-base leading-relaxed mb-8">
              Transforma texto generado por ChatGPT, Claude o cualquier IA en contenido que suena natural, humano y auténtico. Perfecto para ensayos y contenido académico.
            </p>
            <a
              href="/humanizador"
              className="inline-flex items-center gap-3 px-6 py-3 bg-verde hover:bg-verde-deep text-papel font-medium rounded-lg transition-all"
            >
              <span>Probar ahora</span>
              <span>→</span>
            </a>
          </div>

          {/* Parafraseador */}
          <div className="bg-papel-2 border border-line-soft rounded-lg p-8 card-elevated">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-16 h-16 bg-tinta-soft rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon icon={ProductIcons.Paraphraser} size="2xl" className="text-papel" />
              </div>
              <div className="flex-1">
                <span className="font-mono text-xs font-medium text-mute uppercase tracking-wider">Herramienta destacada</span>
                <h3 className="text-3xl text-tinta mt-2">
                  Parafraseador
                </h3>
              </div>
            </div>
            <p className="text-tinta-soft text-base leading-relaxed mb-8">
              Reescribe cualquier texto con otras palabras manteniendo el significado. Sin plagio, sin registro y optimizado para español académico.
            </p>
            <a
              href="/parafraseador"
              className="inline-flex items-center gap-3 px-6 py-3 bg-verde hover:bg-verde-deep text-papel font-medium rounded-lg transition-all"
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
