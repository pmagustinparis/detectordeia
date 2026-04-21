'use client';

import Link from 'next/link';
import { ProductIcons, Icon } from '@/lib/icons';
import ParafraseadorMain from '@/app/components/ParafraseadorMain';

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
  aiPolicySummary?: string;
  antiPlagiarismSoftware?: string;
  topFaculties?: string[];
}

export default function ParafraseadorUniversityPageClient({ university }: { university: University }) {
  return (
    <div className="min-h-screen bg-white pb-10 px-2">

      {/* PARAFRASEADOR - Copy personalizado por universidad */}
      <section className="w-full flex flex-col items-center justify-center pt-6 pb-2 px-2">
        <ParafraseadorMain
          h1={`Parafraseador para ${university.shortName}`}
          subtitle={`Reescribe textos académicos con tus propias palabras. Especializado para trabajos de ${university.name} en ${university.city}. Evitá el plagio manteniendo el significado.`}
        />
      </section>

      {/* VALUE PROPS */}
      <section className="max-w-5xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-4 gap-6 px-2 mt-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-3 shadow-md group-hover:shadow-sm transition-all">
            <Icon icon={ProductIcons.Confidence} size="2xl" className="text-gray-700" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Optimizado para {university.shortName}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Parafraseador especializado en español académico de {university.country}. Resultados naturales que respetan el estilo de escritura.
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-3 shadow-md group-hover:shadow-sm transition-all">
            <Icon icon={ProductIcons.Locked} size="2xl" className="text-gray-700" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Privacidad total</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Tus trabajos de {university.shortName} están seguros. No almacenamos ni compartimos tu contenido.
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-3 shadow-md group-hover:shadow-sm transition-all">
            <Icon icon={ProductIcons.Fast} size="2xl" className="text-gray-700" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Sin registro</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Estudiantes de {university.shortName} pueden parafrasear textos gratis, sin crear cuenta.
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-3 shadow-md group-hover:shadow-sm transition-all">
            <Icon icon={ProductIcons.Analytics} size="2xl" className="text-gray-700" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">
            {university.usesTurnitin ? 'Compatible con Turnitin' : 'Evita plagio académico'}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {university.usesTurnitin
              ? `${university.shortName} usa Turnitin para detectar plagio. Nuestro parafraseador genera texto lo suficientemente distinto al original.`
              : `Reescribí textos de fuentes externas con tus propias palabras para evitar plagio en ${university.shortName}.`}
          </p>
        </div>
      </section>

      {/* SEO CONTENT */}
      <section className="max-w-5xl mx-auto mb-16 px-4">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Parafraseador para {university.name}
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Los estudiantes de <strong>{university.name}</strong> ({university.shortName}) necesitan
            constantemente reescribir fuentes bibliográficas, resúmenes y conceptos con sus propias palabras.
            Nuestro parafraseador está especializado en español académico de {university.country} y ayuda
            a evitar el plagio manteniendo el significado original del texto.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Fundada en {university.foundedYear}, {university.name} es una institución de referencia en {university.country}
            con más de {parseInt(university.students).toLocaleString('es-ES')} estudiantes. La originalidad en los
            trabajos académicos es fundamental, y nuestro parafraseador facilita la reformulación de ideas con
            vocabulario y estructura propios.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            ¿Por Qué Estudiantes de {university.shortName} Usan Nuestro Parafraseador?
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>
              <strong>Reformulación académica:</strong> Reescribí citas y fuentes con el estilo de redacción de {university.country}
            </li>
            <li>
              <strong>Gratuito sin registro:</strong> Parafraseá textos sin crear cuenta ni pagar
            </li>
            <li>
              <strong>Privado y seguro:</strong> Los trabajos de {university.shortName} no se almacenan ni comparten
            </li>
            {university.usesTurnitin && (
              <li>
                <strong>Pasa Turnitin:</strong> {university.shortName} usa Turnitin; nuestro parafraseador genera variaciones lo suficientemente distintas al original
              </li>
            )}
            <li>
              <strong>5 modos de parafraseo:</strong> Estándar, Formal, Académico, Creativo y Simplificado para cada situación
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            Cómo Parafrasear Textos para {university.shortName}
          </h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
            <li>Copiá el texto que querés parafrasear (cita, párrafo de libro, fuente bibliográfica)</li>
            <li>Pegalo en nuestro parafraseador</li>
            <li>Elegí el modo <strong>Académico</strong> para trabajos de {university.shortName}</li>
            <li>Hacé clic en "Parafrasear texto"</li>
            <li>Revisá el resultado y verificá con nuestro detector que no sea marcado como IA</li>
          </ol>

          {university.hasAIPolicy && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Política de IA en {university.shortName}
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {university.name} tiene políticas sobre el uso de IA en trabajos académicos.
                El parafraseador es una herramienta legítima de reformulación de textos que te ayuda
                a expresar ideas con tus propias palabras, algo que siempre fue válido académicamente.
              </p>
            </>
          )}

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            Modos de Parafraseo para Trabajos de {university.shortName}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
              <h4 className="font-bold text-emerald-700 mb-1">Modo Académico</h4>
              <p className="text-gray-600 text-sm">Ideal para tesis, ensayos y monografías de {university.shortName}. Mantiene el rigor intelectual.</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
              <h4 className="font-bold text-emerald-700 mb-1">Modo Formal</h4>
              <p className="text-gray-600 text-sm">Para trabajos prácticos e informes técnicos. Lenguaje profesional y estructurado.</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
              <h4 className="font-bold text-emerald-700 mb-1">Modo Estándar</h4>
              <p className="text-gray-600 text-sm">Para todo tipo de textos. Equilibrado y natural. Disponible gratis.</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
              <h4 className="font-bold text-emerald-700 mb-1">Modo Simplificado</h4>
              <p className="text-gray-600 text-sm">Para resúmenes y síntesis de materias de {university.shortName}.</p>
            </div>
          </div>

          {/* Internal links */}
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <Link
              href="/guias/como-citar-fuentes-apa-parafraseo"
              className="flex flex-col gap-1 bg-emerald-50 rounded-xl p-4 border border-emerald-100 hover:border-emerald-300 hover:bg-emerald-100 transition-all group"
            >
              <span className="font-bold text-emerald-700 group-hover:text-emerald-900 text-sm">Guía: Cómo citar fuentes con parafraseo APA →</span>
              <span className="text-gray-600 text-xs">Aprendé a citar correctamente en formato APA usando parafraseo en tus trabajos de {university.shortName}.</span>
            </Link>
            <Link
              href={`/detector-de-ia-universidad/${university.slug}`}
              className="flex flex-col gap-1 bg-emerald-50 rounded-xl p-4 border border-emerald-100 hover:border-emerald-300 hover:bg-emerald-100 transition-all group"
            >
              <span className="font-bold text-emerald-700 group-hover:text-emerald-900 text-sm">Detector de IA para {university.shortName} →</span>
              <span className="text-gray-600 text-xs">Verificá que tu trabajo parafraseado no sea marcado como IA antes de entregarlo.</span>
            </Link>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mt-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              ¿Sos estudiante de {university.shortName}?
            </h3>
            <p className="text-gray-700 mb-4">
              Usá nuestro parafraseador gratis para reescribir fuentes bibliográficas, resúmenes y textos
              académicos con tus propias palabras. Sin registro, sin límites iniciales, 100% privado.
            </p>
            <a
              href="/parafraseador"
              className="inline-block bg-gradient-to-r from-emerald-500 to-violet-600 text-white font-bold py-3 px-8 rounded-xl hover:shadow-sm transition-all"
            >
              Parafrasear texto de {university.shortName} gratis
            </a>
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: `Parafraseador para ${university.name}`,
            description: `Herramienta gratuita de parafraseo especializada para ${university.name} (${university.shortName})`,
            url: `https://detectordeia.ai/parafraseador-universidad/${university.slug}`,
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            audience: {
              '@type': 'EducationalAudience',
              educationalRole: ['student'],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Inicio',
                item: 'https://detectordeia.ai',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Parafraseador',
                item: 'https://detectordeia.ai/parafraseador',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Universidades',
                item: 'https://detectordeia.ai/parafraseadores-universidades',
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: university.name,
                item: `https://detectordeia.ai/parafraseador-universidad/${university.slug}`,
              },
            ],
          }),
        }}
      />
    </div>
  );
}
