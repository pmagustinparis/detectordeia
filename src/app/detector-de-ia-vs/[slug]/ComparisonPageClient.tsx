'use client';

import { ComparisonPage } from '@/lib/pseo/types';
import Link from 'next/link';

interface Props {
  comparison: ComparisonPage;
}

export default function ComparisonPageClient({ comparison }: Props) {
  // JSON-LD Schema para FAQs (SEO)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: comparison.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
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
        name: 'Comparativas',
        item: 'https://detectordeia.ai/detector-de-ia-vs',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `DetectordeIA vs ${comparison.competitorName}`,
        item: `https://detectordeia.ai/detector-de-ia-vs/${comparison.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen pb-10 px-2">
      {/* JSON-LD para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* HERO SECTION */}
      <section className="max-w-5xl mx-auto pt-8 pb-12 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 ">
          <span className="text-blue-900">{comparison.h1}</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {comparison.intro}
        </p>
      </section>

      {/* WHY DETECTORDEIA IS BETTER */}
      <section className="max-w-5xl mx-auto mb-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          <span className="text-blue-900">¿Por qué elegir</span>
          <span className="text-gray-800"> DetectorDeIA?</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Ventajas clave sobre {comparison.competitorName}
        </p>

        <div className="bg-blue-50 rounded-xl border border-blue-100 p-8">
          <ul className="space-y-4">
            {comparison.whyBetter.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 leading-relaxed">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="max-w-5xl mx-auto mb-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          <span className="text-gray-800">Comparación</span>
          <span className="text-blue-900"> detallada</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          DetectorDeIA vs {comparison.competitorName} lado a lado
        </p>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="px-6 py-4 text-left font-bold">Característica</th>
                  <th className="px-6 py-4 text-left font-bold">DetectorDeIA</th>
                  <th className="px-6 py-4 text-left font-bold">{comparison.competitorName}</th>
                </tr>
              </thead>
              <tbody>
                {comparison.comparisons.map((row, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-100 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">{row.feature}</td>
                    <td className="px-6 py-4">
                      {typeof row.detectordeia === 'boolean' ? (
                        row.detectordeia ? (
                          <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Sí
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            No
                          </span>
                        )
                      ) : (
                        <span className="text-gray-700">{row.detectordeia}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {typeof row.competitor === 'boolean' ? (
                        row.competitor ? (
                          <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Sí
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            No
                          </span>
                        )
                      ) : (
                        <span className="text-gray-700">{row.competitor}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* WHEN TO USE COMPETITOR (Honesty Section) */}
      {comparison.whenToUseCompetitor && (
        <section className="max-w-4xl mx-auto mb-16 px-4">
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-900 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.347.347a3.977 3.977 0 01-.872.51 1 1 0 00-.61.84V17a2 2 0 01-4 0v-.308a1 1 0 00-.61-.84 3.977 3.977 0 01-.872-.51l-.347-.347z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  ¿Cuándo usar {comparison.competitorName}?
                </h3>
                <p className="text-gray-700 leading-relaxed">{comparison.whenToUseCompetitor}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PRICING COMPARISON */}
      <section className="max-w-4xl mx-auto mb-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          <span className="text-blue-900">Comparación</span>
          <span className="text-gray-800"> de precios</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* DetectorDeIA Pricing */}
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">DetectorDeIA</h3>
              <div className="text-4xl font-bold text-blue-900 mb-2">
                {comparison.pricing.detectordeia}
              </div>
              <p className="text-sm text-gray-600">Plan individual accesible</p>
            </div>
            <Link
              href={`/detector?ref=vs-${comparison.slug}`}
              className="block w-full text-center bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              Probar gratis ahora →
            </Link>
          </div>

          {/* Competitor Pricing */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{comparison.competitorName}</h3>
              <div className="text-4xl font-bold text-gray-700 mb-2">
                {comparison.pricing.competitor}
              </div>
              <p className="text-sm text-gray-600">Precio del competidor</p>
            </div>
            {comparison.competitorWebsite && (
              <a
                href={comparison.competitorWebsite}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="block w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 px-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                Ver {comparison.competitorName} →
              </a>
            )}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto mb-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          <span className="text-gray-800">Preguntas</span>
          <span className="text-blue-900"> frecuentes</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Todo lo que necesitás saber sobre DetectorDeIA vs {comparison.competitorName}
        </p>

        <div className="space-y-4">
          {comparison.faqs.map((faq, index) => (
            <details
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-6 group"
            >
              <summary className="font-bold text-lg text-gray-800 cursor-pointer list-none flex items-center justify-between">
                <span>{faq.question}</span>
                <svg
                  className="w-5 h-5 text-blue-900 transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-4xl mx-auto mb-16 px-4">
        <div className="bg-blue-900 rounded-xl p-10 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para probar el mejor detector de IA en español?
          </h2>
          <p className="text-lg mb-8 text-blue-100">
            Sin registro, sin tarjeta de crédito, 100% gratis para empezar.
          </p>
          <Link
            href={comparison.cta.url}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-900 font-bold rounded-xl shadow-sm transition-all duration-300"
          >
            <span>{comparison.cta.text}</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* BREADCRUMBS FOOTER */}
      <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-900 transition-colors">
          Inicio
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">
          DetectorDeIA vs {comparison.competitorName}
        </span>
      </div>
    </div>
  );
}
