'use client';

import Link from 'next/link';
import DetectorMain from '@/app/components/DetectorMain';
import { ProductIcons, Icon } from '@/lib/icons';

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

export default function UniversityPageClient({ university }: { university: University }) {
  return (
    <div className="min-h-screen bg-papel pb-10 px-2">

      <DetectorMain
        h1={`Detector de IA para ${university.shortName}`}
        subtitle={`Detector de inteligencia artificial especializado para estudiantes y profesores de ${university.name}. Gratis, preciso y compatible con requisitos académicos de ${university.city}.`}
      />

      {/* VALUE PROPS */}
      <section id="features" className="max-w-5xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-4 gap-6 px-2 mt-8 animate-slide-in-bottom">
        {[
          {
            icon: ProductIcons.Confidence,
            title: `Optimizado para ${university.shortName}`,
            body: `Detector especializado para trabajos académicos de ${university.name}. Resultados precisos en español.`,
          },
          {
            icon: ProductIcons.Locked,
            title: 'Privacidad total',
            body: `Tus trabajos de ${university.shortName} están seguros. No almacenamos ni compartimos tu contenido.`,
          },
          {
            icon: ProductIcons.Fast,
            title: 'Sin registro',
            body: `Estudiantes de ${university.shortName} pueden analizar textos gratis, sin crear cuenta. 10 usos diarios.`,
          },
          {
            icon: ProductIcons.Analytics,
            title: university.usesTurnitin ? 'Compatible con Turnitin' : 'Reportes académicos',
            body: university.usesTurnitin
              ? `Resultados complementarios a Turnitin usado en ${university.shortName}. Express Pass con reportes detallados.`
              : `Express Pass con reportes detallados para trabajos de ${university.shortName}.`,
          },
        ].map((card, i) => (
          <div key={i} className="bg-papel-2 rounded-xl border border-line p-6 flex flex-col items-center text-center card-elevated">
            <div className="w-14 h-14 rounded-xl bg-verde-050 flex items-center justify-center mb-3">
              <Icon icon={card.icon} size="2xl" className="text-verde" />
            </div>
            <h3 className="font-medium text-base mb-2 text-tinta font-sans">{card.title}</h3>
            <p className="text-tinta-soft text-sm leading-relaxed font-sans">{card.body}</p>
          </div>
        ))}
      </section>

      {/* SEO CONTENT */}
      <section className="max-w-5xl mx-auto mb-16 px-4">
        <div className="bg-papel-2 rounded-xl border border-line p-8">
          <h2 className="text-2xl text-tinta mb-4">Detector de IA para {university.name}</h2>
          <p className="text-tinta-soft mb-4 leading-relaxed font-sans">
            Los estudiantes y profesores de <strong>{university.name}</strong> ({university.shortName}) necesitan herramientas confiables para detectar contenido generado por inteligencia artificial. Nuestro detector está optimizado para el español de {university.country} y cumple con los estándares académicos de instituciones educativas en {university.city}.
          </p>
          <p className="text-tinta-soft mb-4 leading-relaxed font-sans">
            Fundada en {university.foundedYear}, {university.name} es una de las instituciones educativas más prestigiosas de {university.country}, con más de {parseInt(university.students).toLocaleString('es-ES')} estudiantes. La integridad académica es fundamental, y nuestro detector de IA ayuda a mantener los altos estándares de {university.shortName}.
          </p>

          <h2 className="text-2xl text-tinta mb-4 mt-8">¿Por Qué Estudiantes de {university.shortName} Usan Nuestro Detector?</h2>
          <ul className="list-disc list-inside text-tinta-soft space-y-2 mb-4 font-sans">
            <li><strong>Especializado en español:</strong> Optimizado para textos académicos en español de {university.country}</li>
            <li><strong>Gratuito para estudiantes:</strong> Hasta 10 análisis diarios sin necesidad de pago o registro</li>
            <li><strong>Privado y seguro:</strong> Los trabajos de {university.shortName} no se almacenan ni comparten</li>
            {university.usesTurnitin && (
              <li><strong>Complementa Turnitin:</strong> {university.shortName} usa Turnitin para plagio; nuestro detector identifica contenido de IA</li>
            )}
            <li><strong>Resultados instantáneos:</strong> Análisis completo en segundos, ideal para deadlines de {university.shortName}</li>
          </ul>

          <h2 className="text-2xl text-tinta mb-4 mt-8">Para Profesores de {university.name}</h2>
          <p className="text-tinta-soft mb-4 leading-relaxed font-sans">
            Los profesores de {university.shortName} pueden verificar trabajos estudiantiles de forma rápida y confiable. Nuestro detector identifica textos generados por ChatGPT, Claude, Gemini y otros modelos de IA, proporcionando un análisis detallado con porcentaje de probabilidad y nivel de confianza.
          </p>

          {university.aiPolicySummary && (
            <>
              <h2 className="text-2xl text-tinta mb-4 mt-8">Qué dice {university.shortName} sobre la inteligencia artificial</h2>
              <p className="text-tinta-soft mb-4 leading-relaxed font-sans">
                {university.aiPolicySummary}
              </p>
              <p className="text-tinta-soft mb-4 leading-relaxed font-sans">
                {university.shortName} usa{' '}
                <strong>{university.antiPlagiarismSoftware || 'software antiplagio'}</strong>{' '}
                para revisar trabajos.
                {university.topFaculties && university.topFaculties.length > 0 && (
                  <> Antes de entregar en facultades como <strong>{university.topFaculties.join(', ')}</strong>, conviene verificar que tu texto no parezca generado por IA.</>
                )}{' '}
                Si lo parece, ajustalo con el{' '}
                <Link href="/humanizador" className="text-verde-deep underline underline-offset-2 hover:text-verde font-medium">Humanizador de IA gratuito</Link>{' '}
                o reescribilo con el{' '}
                <Link href="/parafraseador" className="text-verde-deep underline underline-offset-2 hover:text-verde font-medium">Parafraseador para reescribir sin plagio</Link>.
              </p>
            </>
          )}

          <h2 className="text-2xl text-tinta mb-4 mt-8">Cómo Usar el Detector de IA en {university.shortName}</h2>
          <ol className="list-decimal list-inside text-tinta-soft space-y-2 mb-4 font-sans">
            <li>Copia el texto de tu trabajo académico de {university.shortName}</li>
            <li>Pega el texto en el detector (arriba en esta página)</li>
            <li>Haz clic en "Analizar Texto"</li>
            <li>Revisa el resultado: porcentaje de probabilidad de IA y explicación detallada</li>
            <li>Si necesitas editar el texto, usa nuestro <Link href="/humanizador" className="text-verde-deep underline underline-offset-2 hover:text-verde font-medium">Humanizador de IA gratuito</Link></li>
          </ol>

          <h2 className="text-2xl text-tinta mb-4 mt-8">Recursos para Estudiantes de {university.name}</h2>
          <p className="text-tinta-soft mb-4 leading-relaxed font-sans">
            Además del detector de IA, ofrecemos herramientas gratuitas para estudiantes de {university.shortName}:
          </p>
          <ul className="list-disc list-inside text-tinta-soft space-y-2 mb-4 font-sans">
            <li><Link href="/humanizador" className="text-verde-deep underline underline-offset-2 hover:text-verde font-medium">Humanizar texto de IA gratis</Link> — transforma contenido generado por IA en algo más natural</li>
            <li><Link href="/parafraseador" className="text-verde-deep underline underline-offset-2 hover:text-verde font-medium">Parafrasear sin plagio</Link> — reescribe textos con otras palabras manteniendo el significado</li>
            <li><Link href="/guias/como-usar-ia-eticamente-universidad" className="text-verde-deep underline underline-offset-2 hover:text-verde font-medium">Guías académicas</Link> — tutoriales sobre escritura académica y uso ético de IA</li>
          </ul>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <Link href="/guias/como-usar-ia-eticamente-universidad" className="flex flex-col gap-1 bg-verde-050 rounded-xl p-4 border border-verde-soft hover:border-verde hover:bg-verde-050 transition-all group">
              <span className="font-medium text-verde-deep group-hover:text-verde text-sm font-sans">Guía: Usar IA éticamente en la universidad →</span>
              <span className="text-mute text-xs font-sans">Cuándo puedes usar IA y cómo declararla correctamente en {university.shortName}.</span>
            </Link>
            {university.usesTurnitin ? (
              <Link href="/detector-de-ia-vs/turnitin" className="flex flex-col gap-1 bg-verde-050 rounded-xl p-4 border border-verde-soft hover:border-verde hover:bg-verde-050 transition-all group">
                <span className="font-medium text-verde-deep group-hover:text-verde text-sm font-sans">DetectordeIA vs Turnitin →</span>
                <span className="text-mute text-xs font-sans">{university.shortName} usa Turnitin. Descubre cómo se complementan ambas herramientas.</span>
              </Link>
            ) : (
              <Link href="/guias/como-evitar-plagio-academico" className="flex flex-col gap-1 bg-verde-050 rounded-xl p-4 border border-verde-soft hover:border-verde hover:bg-verde-050 transition-all group">
                <span className="font-medium text-verde-deep group-hover:text-verde text-sm font-sans">Guía: Cómo evitar el plagio académico →</span>
                <span className="text-mute text-xs font-sans">Todo lo que necesitas saber sobre plagio e integridad académica en {university.shortName}.</span>
              </Link>
            )}
          </div>

          <div className="bg-tinta rounded-xl p-6 mt-8">
            <h3 className="text-xl text-white mb-3">¿Eres estudiante de {university.shortName}?</h3>
            <p className="text-white/60 mb-4 font-sans">
              Únete a los miles de estudiantes de {university.name} que ya usan DetectordeIA.ai para verificar sus trabajos académicos antes de entregarlos. Gratis, privado y confiable.
            </p>
            <a href="#detector" className="inline-block bg-verde hover:bg-verde-deep text-papel font-medium py-3 px-8 rounded-xl transition-colors">
              Analizar mi trabajo de {university.shortName} gratis
            </a>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'WebApplication',
        name: `Detector de IA para ${university.name}`,
        description: `Herramienta gratuita de detección de IA especializada para ${university.name} (${university.shortName})`,
        url: `https://detectordeia.ai/detector-de-ia-universidad/${university.slug}`,
        applicationCategory: 'EducationalApplication', operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        audience: { '@type': 'EducationalAudience', educationalRole: ['student', 'teacher'] },
        about: { '@type': 'EducationalOrganization', name: university.name, alternateName: university.shortName, address: { '@type': 'PostalAddress', addressLocality: university.city, addressCountry: university.country } },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://detectordeia.ai' },
          { '@type': 'ListItem', position: 2, name: 'Universidades', item: 'https://detectordeia.ai/universidades' },
          { '@type': 'ListItem', position: 3, name: university.name, item: `https://detectordeia.ai/detector-de-ia-universidad/${university.slug}` },
        ],
      }) }} />
    </div>
  );
}
