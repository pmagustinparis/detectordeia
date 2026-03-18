'use client';

import { GuidePage } from '@/lib/pseo/guides';
import Link from 'next/link';

interface Props {
  guide: GuidePage;
}

export default function GuidePageClient({ guide }: Props) {
  // JSON-LD Schema para HowTo (SEO)
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: guide.title,
    description: guide.metaDescription,
    step: guide.steps.map((step) => ({
      '@type': 'HowToStep',
      position: step.number,
      name: step.title,
      text: step.description,
      ...(step.tips && step.tips.length > 0
        ? {
            itemListElement: step.tips.map((tip, index) => ({
              '@type': 'HowToTip',
              position: index + 1,
              text: tip,
            })),
          }
        : {}),
    })),
  };

  // JSON-LD Schema para FAQs (SEO)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // JSON-LD Schema para Article (SEO)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.h1,
    description: guide.metaDescription,
    author: {
      '@type': 'Organization',
      name: 'DetectorDeIA',
    },
    publisher: {
      '@type': 'Organization',
      name: 'DetectorDeIA',
      logo: {
        '@type': 'ImageObject',
        url: 'https://detectordeia.ai/logo.png',
      },
    },
    datePublished: '2025-01-14',
    dateModified: '2025-01-14',
  };

  // JSON-LD Schema para BreadcrumbList (SEO — rich breadcrumbs en SERPs)
  const breadcrumbSchema = {
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
        name: 'Guías',
        item: 'https://detectordeia.ai/guias',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.title,
        item: `https://detectordeia.ai/guias/${guide.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen pb-10 px-2">
      {/* JSON-LD para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* HERO SECTION */}
      <section className="max-w-5xl mx-auto pt-8 pb-12 px-4">
        <div className="inline-block px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold mb-4">
          📖 Guía Práctica
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 animate-fade-in">
          <span className="gradient-text-primary">{guide.h1}</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl leading-relaxed mb-6">
          {guide.intro}
        </p>

        {/* Overview Box */}
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl shadow-md border border-violet-200 p-6">
          <h2 className="font-bold text-lg mb-2 text-gray-800">
            📋 Lo que aprenderás:
          </h2>
          <p className="text-gray-700 leading-relaxed">{guide.overview}</p>
        </div>
      </section>

      {/* STEPS SECTION */}
      <section className="max-w-4xl mx-auto mb-16 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">
          <span className="gradient-text-primary">Guía Paso</span>
          <span className="text-gray-800"> a Paso</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Sigue estos {guide.steps.length} pasos para dominar el tema
        </p>

        <div className="space-y-8">
          {guide.steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-violet-100 p-8 hover:shadow-xl transition-all"
            >
              {/* Step Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-xl shadow-md">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {step.title}
                  </h3>
                </div>
              </div>

              {/* Step Description */}
              <div className="mb-6 pl-16">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {step.description}
                </p>
              </div>

              {/* Tips */}
              {step.tips && step.tips.length > 0 && (
                <div className="pl-16 bg-violet-50 rounded-xl p-4 border-l-4 border-violet-500">
                  <p className="font-semibold text-violet-700 mb-2 flex items-center gap-2">
                    <span>💡</span> Consejos prácticos:
                  </p>
                  <ul className="space-y-2">
                    {step.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="text-gray-700 text-sm flex items-start gap-2">
                        <span className="text-violet-500 font-bold flex-shrink-0">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* COMMON MISTAKES */}
      <section className="max-w-4xl mx-auto mb-16 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">
          <span className="text-gray-800">Errores</span>
          <span className="gradient-text-primary"> Comunes</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Evita estos errores frecuentes
        </p>

        <div className="space-y-4">
          {guide.commonMistakes.map((mistake, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border border-red-100 p-6 hover:border-red-200 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">❌</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 text-red-700">
                    {mistake.mistake}
                  </h3>
                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500 mt-3">
                    <p className="font-semibold text-green-700 mb-1 flex items-center gap-2">
                      <span>✅</span> Solución:
                    </p>
                    <p className="text-gray-700 leading-relaxed">{mistake.solution}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQS */}
      <section className="max-w-4xl mx-auto mb-16 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">
          <span className="gradient-text-primary">Preguntas</span>
          <span className="text-gray-800"> Frecuentes</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Respuestas a las dudas más comunes
        </p>

        <div className="space-y-4">
          {guide.faqs.map((faq, index) => (
            <details
              key={index}
              className="bg-white rounded-xl shadow-md border border-violet-100 p-6 hover:border-violet-200 transition-all group"
            >
              <summary className="font-bold text-lg text-gray-800 cursor-pointer list-none flex items-center justify-between">
                <span className="pr-4 flex items-start gap-3">
                  <span className="text-violet-500 flex-shrink-0">❓</span>
                  <span>{faq.question}</span>
                </span>
                <span className="text-violet-500 group-open:rotate-180 transition-transform flex-shrink-0">
                  ▼
                </span>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed pt-4 border-t border-violet-100 pl-9 whitespace-pre-line">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* RELATED CONTENT & CTA */}
      <section className="max-w-5xl mx-auto mb-12 px-4">
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-3xl shadow-lg border border-violet-200 p-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Related Guides */}
            {guide.relatedGuides && guide.relatedGuides.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                  <span>📚</span> Guías Relacionadas
                </h3>
                <div className="space-y-3">
                  {guide.relatedGuides.map((related, index) => (
                    <Link
                      key={index}
                      href={`/guias/${related.slug}`}
                      className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md border border-violet-200 hover:border-violet-300 transition-all group"
                    >
                      <span className="text-gray-700 font-medium group-hover:text-violet-600">
                        {related.title}
                      </span>
                      <span className="text-violet-500 ml-2 group-hover:ml-3 transition-all">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Tools */}
            {guide.relatedTools && guide.relatedTools.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                  <span>🛠️</span> Herramientas Útiles
                </h3>
                <div className="space-y-3">
                  {guide.relatedTools.map((tool, index) => (
                    <Link
                      key={index}
                      href={tool.url}
                      className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md border border-violet-200 hover:border-violet-300 transition-all group"
                    >
                      <span className="text-gray-700 font-medium group-hover:text-violet-600">
                        {tool.name}
                      </span>
                      <span className="text-violet-500 ml-2 group-hover:ml-3 transition-all">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="text-center pt-6 border-t border-violet-200">
            <p className="text-gray-700 mb-4 font-medium text-lg">
              ¿Listo para poner en práctica lo aprendido?
            </p>
            <Link
              href={guide.cta.url}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span>{guide.cta.text}</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
