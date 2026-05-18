'use client';

import Link from 'next/link';
import { ProductIcons, Icon } from '@/lib/icons';
import CitadorClient from '@/app/generador-de-citas/CitadorClient';

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

function getPrimaryStyle(university: University): { label: string; reason: string } {
  const faculties = (university.topFaculties || []).join(' ').toLowerCase();
  if (faculties.includes('medicina') || faculties.includes('salud') || faculties.includes('enfermería') || faculties.includes('farmacia')) {
    return { label: 'APA 7ª o Vancouver', reason: 'recomendado para ciencias de la salud' };
  }
  if (faculties.includes('humanidades') || faculties.includes('filología') || faculties.includes('literatura') || faculties.includes('bellas artes')) {
    return { label: 'MLA 9', reason: 'estándar en humanidades y literatura' };
  }
  if (faculties.includes('historia')) {
    return { label: 'Chicago', reason: 'estándar en historia y ciencias sociales' };
  }
  return { label: 'APA 7ª', reason: 'el más usado en educación superior hispanohablante' };
}

export default function CitadorUniversityPageClient({ university }: { university: University }) {
  const primaryStyle = getPrimaryStyle(university);

  return (
    <div className="min-h-screen bg-white pb-10 px-2">

      {/* CITADOR — copy personalizado por universidad */}
      <section className="w-full flex flex-col items-center justify-center pt-6 pb-2 px-2">
        <CitadorClient
          h1={`Generador de Citas para ${university.shortName}`}
          subtitle={`Crea referencias en APA 7ª, MLA 9 y Chicago para tus trabajos de ${university.name}. Gratis, ilimitado, sin registro.`}
        />
      </section>

      {/* VALUE PROPS */}
      <section className="max-w-5xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-4 gap-6 px-2 mt-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-3">
            <Icon icon={ProductIcons.Analytics} size="2xl" className="text-gray-700" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">APA · MLA · Chicago</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Los tres estilos más usados en {university.name}. Formato correcto al instante.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-3">
            <Icon icon={ProductIcons.Fast} size="2xl" className="text-gray-700" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">DOI, ISBN y URL</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Pegá el DOI, ISBN o URL y la cita se completa automáticamente con los datos reales.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-3">
            <Icon icon={ProductIcons.Locked} size="2xl" className="text-gray-700" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">100% gratuito</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Sin límites, sin registro. Estudiantes de {university.shortName} pueden generar todas las citas que necesiten.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-3">
            <Icon icon={ProductIcons.Confidence} size="2xl" className="text-gray-700" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Estilo recomendado</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Para {university.shortName}: <strong>{primaryStyle.label}</strong> — {primaryStyle.reason}.
          </p>
        </div>
      </section>

      {/* SEO CONTENT */}
      <section className="max-w-5xl mx-auto mb-16 px-4">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Citas bibliográficas para {university.name}
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Los estudiantes de <strong>{university.name}</strong> ({university.shortName}) deben incluir
            referencias bibliográficas correctas en todos sus trabajos académicos. Un formato incorrecto
            puede costar puntos aunque el contenido sea sólido. Nuestro generador aplica automáticamente
            las normas de APA 7ª edición, MLA 9ª edición y Chicago para que tus citas queden perfectas.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Fundada en {university.foundedYear}, {university.name} es una de las instituciones de referencia
            en {university.country} con más de {parseInt(university.students).toLocaleString('es-ES')} estudiantes.
            El estilo bibliográfico más utilizado en {university.shortName} es <strong>{primaryStyle.label}</strong>, {primaryStyle.reason}.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            Estilos de citas aceptados en {university.shortName}
          </h2>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-1">APA 7ª edición</h4>
              <p className="text-gray-600 text-sm">El más usado en {university.country}. Obligatorio en ciencias sociales, educación y psicología. Nuestro generador aplica la 7ª edición (2020).</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-1">MLA 9ª edición</h4>
              <p className="text-gray-600 text-sm">Estándar en humanidades, literatura y artes. Si estudiás Filología, Bellas Artes o Historia del Arte en {university.shortName}, probablemente uses MLA.</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-1">Chicago</h4>
              <p className="text-gray-600 text-sm">Usado en Historia y algunas ciencias sociales. Admite tanto notas al pie (Chicago A) como autor-fecha (Chicago B).</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            Cómo generar citas para tus trabajos de {university.shortName}
          </h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-6">
            <li>Elegí el estilo que te pide la cátedra (APA, MLA o Chicago)</li>
            <li>Seleccioná el tipo de fuente: artículo, libro o sitio web</li>
            <li>Pegá el DOI, ISBN o URL — los datos se completan automáticamente</li>
            <li>Si no tenés el identificador, completá el formulario manual</li>
            <li>Copiá la cita generada y pegala en tu lista de referencias</li>
          </ol>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            Errores más comunes en citas de {university.shortName}
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li><strong>Usar la edición equivocada de APA</strong> — muchos trabajan con APA 6ª pero la vigente es la 7ª (2020). Nuestro generador usa siempre la versión actualizada.</li>
            <li><strong>Mayúsculas incorrectas en títulos</strong> — en APA solo va en mayúscula la primera palabra del título y subtítulo. En MLA, todas las palabras principales.</li>
            <li><strong>Falta de DOI en artículos</strong> — cuando existe DOI, debe incluirse siempre en APA 7ª.</li>
            <li><strong>Mezclar estilos en el mismo trabajo</strong> — toda la bibliografía debe usar el mismo formato.</li>
          </ul>

          {/* Internal links */}
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <Link
              href={`/detector-de-ia-universidad/${university.slug}`}
              className="flex flex-col gap-1 bg-blue-50 rounded-xl p-4 border border-blue-100 hover:border-blue-300 hover:bg-blue-100 transition-all group"
            >
              <span className="font-bold text-blue-900 group-hover:text-blue-900 text-sm">Detector de IA para {university.shortName} →</span>
              <span className="text-gray-600 text-xs">Verificá si tu trabajo tiene contenido de IA antes de entregarlo.</span>
            </Link>
            <Link
              href={`/humanizador-universidad/${university.slug}`}
              className="flex flex-col gap-1 bg-blue-50 rounded-xl p-4 border border-blue-100 hover:border-blue-300 hover:bg-blue-100 transition-all group"
            >
              <span className="font-bold text-blue-900 group-hover:text-blue-900 text-sm">Humanizador para {university.shortName} →</span>
              <span className="text-gray-600 text-xs">Convertí texto de IA en contenido natural que pasa los detectores.</span>
            </Link>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mt-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              ¿Sos estudiante de {university.shortName}?
            </h3>
            <p className="text-gray-700 mb-4">
              Generá todas tus citas en APA, MLA o Chicago gratis, sin registro y sin límites.
              Compatible con artículos, libros y sitios web.
            </p>
            <a
              href="/generador-de-citas"
              className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-xl transition-all"
            >
              Generar citas para {university.shortName} →
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
            name: `Generador de Citas para ${university.name}`,
            description: `Generador de citas APA, MLA y Chicago para ${university.name} (${university.shortName}). Gratuito e ilimitado.`,
            url: `https://detectordeia.ai/citador-universidad/${university.slug}`,
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'All',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
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
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://detectordeia.ai' },
              { '@type': 'ListItem', position: 2, name: 'Generador de Citas', item: 'https://detectordeia.ai/generador-de-citas' },
              { '@type': 'ListItem', position: 3, name: 'Universidades', item: 'https://detectordeia.ai/citadores-universidades' },
              { '@type': 'ListItem', position: 4, name: university.name, item: `https://detectordeia.ai/citador-universidad/${university.slug}` },
            ],
          }),
        }}
      />
    </div>
  );
}
