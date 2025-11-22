'use client';

import DetectorMain from '@/app/components/DetectorMain';
import { ProductIcons, Icon } from '@/lib/icons';
import HumanizadorPromoBanner from '@/app/components/HumanizadorPromoBanner';

interface University {
  slug: string;
  name: string;
  shortName: string;
  country: string;
  city: string;
  students: string;
  foundedYear: string;
  usesTurnitin: boolean;
  hasAIPolicy: boolean;
  keywords: string[];
}

export default function UniversityPageClient({ university }: { university: University }) {
  return (
    <div className="min-h-screen bg-gray-100 pb-10 px-2">
      {/* Banner Promocional */}
      <HumanizadorPromoBanner />

      {/* DETECTOR - Copy personalizado por universidad */}
      <DetectorMain
        h1={`Detector de IA para ${university.shortName}`}
        subtitle={`Detector de inteligencia artificial especializado para estudiantes y profesores de ${university.name}. Gratis, preciso y compatible con requisitos académicos de ${university.city}.`}
      />

      {/* VALUE PROPS - Personalizadas por universidad */}
      <section id="features" className="max-w-5xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-4 gap-6 px-2 mt-8 animate-slide-in-bottom">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all">
            <Icon icon={ProductIcons.Confidence} size="2xl" className="text-violet-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Optimizado para {university.shortName}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Detector especializado para trabajos académicos de {university.name}. Resultados precisos en español.
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all">
            <Icon icon={ProductIcons.Locked} size="2xl" className="text-cyan-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Privacidad total</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Tus trabajos de {university.shortName} están seguros. No almacenamos ni compartimos tu contenido.
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all">
            <Icon icon={ProductIcons.Fast} size="2xl" className="text-emerald-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Sin registro</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Estudiantes de {university.shortName} pueden analizar textos gratis, sin crear cuenta. 10 usos diarios.
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all">
            <Icon icon={ProductIcons.Analytics} size="2xl" className="text-orange-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">
            {university.usesTurnitin ? 'Compatible con Turnitin' : 'Reportes académicos'}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {university.usesTurnitin
              ? `Resultados complementarios a Turnitin usado en ${university.shortName}. Planes premium con reportes detallados.`
              : `Planes premium con reportes detallados para trabajos de ${university.shortName}.`}
          </p>
        </div>
      </section>

      {/* SEO CONTENT - Personalizado por universidad */}
      <section className="max-w-5xl mx-auto mb-16 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Detector de IA para {university.name}
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Los estudiantes y profesores de <strong>{university.name}</strong> ({university.shortName})
            necesitan herramientas confiables para detectar contenido generado por inteligencia artificial.
            Nuestro detector está optimizado para el español de {university.country} y cumple con los
            estándares académicos de instituciones educativas en {university.city}.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Fundada en {university.foundedYear}, {university.name} es una de las instituciones educativas
            más prestigiosas de {university.country}, con más de {parseInt(university.students).toLocaleString('es-ES')} estudiantes.
            La integridad académica es fundamental, y nuestro detector de IA ayuda a mantener los altos
            estándares de {university.shortName}.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            ¿Por Qué Estudiantes de {university.shortName} Usan Nuestro Detector?
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>
              <strong>Especializado en español:</strong> Optimizado para textos académicos en español de {university.country}
            </li>
            <li>
              <strong>Gratuito para estudiantes:</strong> Hasta 10 análisis diarios sin necesidad de pago o registro
            </li>
            <li>
              <strong>Privado y seguro:</strong> Los trabajos de {university.shortName} no se almacenan ni comparten
            </li>
            {university.usesTurnitin && (
              <li>
                <strong>Complementa Turnitin:</strong> {university.shortName} usa Turnitin para plagio;
                nuestro detector identifica contenido de IA
              </li>
            )}
            <li>
              <strong>Resultados instantáneos:</strong> Análisis completo en segundos, ideal para deadlines de {university.shortName}
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            Para Profesores de {university.name}
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Los docentes de {university.shortName} pueden verificar trabajos estudiantiles de forma rápida y confiable.
            Nuestro detector identifica textos generados por ChatGPT, Claude, Gemini y otros modelos de IA,
            proporcionando un análisis detallado con porcentaje de probabilidad y nivel de confianza.
          </p>

          {university.hasAIPolicy && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Política de IA en {university.shortName}
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {university.name} ha establecido políticas claras sobre el uso de inteligencia artificial
                en trabajos académicos. Nuestro detector ayuda a estudiantes y profesores a cumplir con estas
                políticas, identificando contenido generado por IA y promoviendo la originalidad académica.
              </p>
            </>
          )}

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            Cómo Usar el Detector de IA en {university.shortName}
          </h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
            <li>Copia el texto de tu trabajo académico de {university.shortName}</li>
            <li>Pega el texto en el detector (arriba en esta página)</li>
            <li>Haz clic en "Analizar Texto"</li>
            <li>Revisa el resultado: porcentaje de probabilidad de IA y explicación detallada</li>
            <li>Si necesitas editar el texto, usa nuestro Humanizador de IA gratuito</li>
          </ol>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            Recursos para Estudiantes de {university.name}
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Además del detector de IA, ofrecemos herramientas gratuitas para estudiantes de {university.shortName}:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>
              <strong>Humanizador de IA:</strong> Transforma texto generado por IA en contenido más natural
            </li>
            <li>
              <strong>Parafraseador:</strong> Reescribe textos con otras palabras manteniendo el significado
            </li>
            <li>
              <strong>Guías académicas:</strong> Tutoriales sobre escritura académica y uso ético de IA
            </li>
          </ul>

          <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-6 mt-8 border-2 border-violet-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              ¿Eres estudiante de {university.shortName}?
            </h3>
            <p className="text-gray-700 mb-4">
              Únete a los miles de estudiantes de {university.name} que ya usan DetectordeIA.ai
              para verificar sus trabajos académicos antes de entregarlos. Gratis, privado y confiable.
            </p>
            <a
              href="#detector"
              className="inline-block bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold py-3 px-8 rounded-xl hover:shadow-lg transition-all"
            >
              Analizar mi trabajo de {university.shortName} gratis
            </a>
          </div>
        </div>
      </section>

      {/* Schema.org - Específico por universidad */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: `Detector de IA para ${university.name}`,
            description: `Herramienta gratuita de detección de IA especializada para ${university.name} (${university.shortName})`,
            url: `https://detectordeia.ai/detector-de-ia-universidad/${university.slug}`,
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            audience: {
              '@type': 'EducationalAudience',
              educationalRole: ['student', 'teacher'],
            },
            about: {
              '@type': 'EducationalOrganization',
              name: university.name,
              alternateName: university.shortName,
              address: {
                '@type': 'PostalAddress',
                addressLocality: university.city,
                addressCountry: university.country,
              },
            },
          }),
        }}
      />
    </div>
  );
}
