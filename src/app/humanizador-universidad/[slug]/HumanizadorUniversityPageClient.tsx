'use client';

import Link from 'next/link';
import { ProductIcons, Icon } from '@/lib/icons';
import HumanizadorMain from '@/app/components/HumanizadorMain';

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

export default function HumanizadorUniversityPageClient({ university }: { university: University }) {
  return (
    <div className="min-h-screen bg-white pb-10 px-2">

      {/* HUMANIZADOR - Copy personalizado por universidad */}
      <section className="w-full flex flex-col items-center justify-center pt-6 pb-2 px-2">
        <HumanizadorMain
          h1={`Humanizador de IA para ${university.shortName}`}
          subtitle={`Convierte texto generado por IA en contenido natural y original. Especializado para trabajos académicos de ${university.name} en ${university.city}.`}
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
            Humanizador especializado en español académico de {university.country}. Resultados naturales y fluidos.
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
            Estudiantes de {university.shortName} pueden humanizar textos gratis, sin crear cuenta.
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center card-elevated group">
          <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-3 shadow-md group-hover:shadow-sm transition-all">
            <Icon icon={ProductIcons.Analytics} size="2xl" className="text-gray-700" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">
            {university.usesTurnitin ? 'Elude detección Turnitin' : 'Texto 100% original'}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {university.usesTurnitin
              ? `${university.shortName} usa Turnitin. Nuestro humanizador genera texto que supera la detección de IA.`
              : `Convierte texto de IA en contenido original que pasa cualquier detector académico.`}
          </p>
        </div>
      </section>

      {/* SEO CONTENT */}
      <section className="max-w-5xl mx-auto mb-16 px-4">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Humanizador de IA para {university.name}
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Los estudiantes de <strong>{university.name}</strong> ({university.shortName}) enfrentan
            un desafío creciente: cómo usar la inteligencia artificial de forma responsable sin que
            sus trabajos sean marcados como generados por IA. Nuestro humanizador convierte texto de
            ChatGPT, Claude, Gemini y otros modelos en contenido natural, fluido y académicamente correcto
            para {university.city}, {university.country}.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Fundada en {university.foundedYear}, {university.name} es una de las instituciones más
            prestigiosas de {university.country}, con más de {parseInt(university.students).toLocaleString('es-ES')} estudiantes.
            Mantener la integridad académica mientras se aprovechan las herramientas de IA requiere
            un equilibrio delicado que nuestro humanizador facilita.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            ¿Por Qué Estudiantes de {university.shortName} Usan Nuestro Humanizador?
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>
              <strong>Texto académico natural:</strong> Convierte texto robótico de IA en redacción fluida al estilo de {university.country}
            </li>
            <li>
              <strong>Gratuito sin registro:</strong> Humanizá textos sin crear cuenta ni pagar
            </li>
            <li>
              <strong>Privado y seguro:</strong> Los trabajos de {university.shortName} no se almacenan ni comparten
            </li>
            {university.usesTurnitin && (
              <li>
                <strong>Compatible con Turnitin:</strong> {university.shortName} usa Turnitin; nuestro humanizador genera texto que no activa detectores de IA
              </li>
            )}
            <li>
              <strong>5 modos de humanización:</strong> Estándar, Formal, Académico, Creativo y Simplificado para cada tipo de trabajo
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            Cómo Humanizar Textos de IA para {university.shortName}
          </h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
            <li>Generá tu borrador con ChatGPT u otra IA</li>
            <li>Copiá el texto y pegalo en nuestro humanizador</li>
            <li>Elegí el modo <strong>Académico</strong> para trabajos de {university.shortName}</li>
            <li>Hacé clic en "Humanizar texto"</li>
            <li>Revisá el resultado y verificalo con nuestro detector de IA</li>
          </ol>

          {university.hasAIPolicy && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Política de IA en {university.shortName}
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {university.name} tiene políticas sobre el uso de inteligencia artificial en trabajos académicos.
                Nuestro humanizador te ayuda a trabajar dentro de esos límites: podés usar IA como punto de
                partida y humanizar el resultado para que refleje tu propia voz y comprensión del tema.
              </p>
            </>
          )}

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            Modos de Humanización para Trabajos Académicos de {university.shortName}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-violet-50 rounded-xl p-4 border border-violet-100">
              <h4 className="font-bold text-violet-700 mb-1">Modo Académico</h4>
              <p className="text-gray-600 text-sm">Ideal para tesis, ensayos y monografías de {university.shortName}. Estilo riguroso y técnico.</p>
            </div>
            <div className="bg-violet-50 rounded-xl p-4 border border-violet-100">
              <h4 className="font-bold text-violet-700 mb-1">Modo Formal</h4>
              <p className="text-gray-600 text-sm">Para trabajos prácticos e informes. Lenguaje profesional y estructurado.</p>
            </div>
            <div className="bg-violet-50 rounded-xl p-4 border border-violet-100">
              <h4 className="font-bold text-violet-700 mb-1">Modo Estándar</h4>
              <p className="text-gray-600 text-sm">Para todo tipo de textos. Equilibrado y natural. Disponible gratis.</p>
            </div>
            <div className="bg-violet-50 rounded-xl p-4 border border-violet-100">
              <h4 className="font-bold text-violet-700 mb-1">Modo Simplificado</h4>
              <p className="text-gray-600 text-sm">Para resúmenes y textos divulgativos de {university.shortName}.</p>
            </div>
          </div>

          {/* Internal links */}
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <Link
              href="/guias/como-usar-ia-eticamente-universidad"
              className="flex flex-col gap-1 bg-violet-50 rounded-xl p-4 border border-violet-100 hover:border-violet-300 hover:bg-violet-100 transition-all group"
            >
              <span className="font-bold text-violet-700 group-hover:text-violet-900 text-sm">Guía: Usar IA éticamente en la universidad →</span>
              <span className="text-gray-600 text-xs">Cuándo podés usar IA y cómo declararlo correctamente en {university.shortName}.</span>
            </Link>
            <Link
              href={`/detector-de-ia-universidad/${university.slug}`}
              className="flex flex-col gap-1 bg-violet-50 rounded-xl p-4 border border-violet-100 hover:border-violet-300 hover:bg-violet-100 transition-all group"
            >
              <span className="font-bold text-violet-700 group-hover:text-violet-900 text-sm">Detector de IA para {university.shortName} →</span>
              <span className="text-gray-600 text-xs">Verificá si tu trabajo tiene contenido de IA antes de entregarlo.</span>
            </Link>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mt-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              ¿Sos estudiante de {university.shortName}?
            </h3>
            <p className="text-gray-700 mb-4">
              Usá nuestro humanizador de IA gratis para convertir texto de ChatGPT o Claude en contenido
              natural y académico. Sin registro, sin límites iniciales, 100% privado.
            </p>
            <a
              href="/humanizador"
              className="inline-block bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold py-3 px-8 rounded-xl hover:shadow-sm transition-all"
            >
              Humanizar texto de {university.shortName} gratis
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
            name: `Humanizador de IA para ${university.name}`,
            description: `Herramienta gratuita para humanizar textos de IA especializada para ${university.name} (${university.shortName})`,
            url: `https://detectordeia.ai/humanizador-universidad/${university.slug}`,
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
                name: 'Humanizador',
                item: 'https://detectordeia.ai/humanizador',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Universidades',
                item: 'https://detectordeia.ai/humanizadores-universidades',
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: university.name,
                item: `https://detectordeia.ai/humanizador-universidad/${university.slug}`,
              },
            ],
          }),
        }}
      />
    </div>
  );
}
