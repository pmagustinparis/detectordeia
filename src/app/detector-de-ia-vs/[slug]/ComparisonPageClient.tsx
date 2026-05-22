'use client';

import { ComparisonPage } from '@/lib/pseo/types';
import Link from 'next/link';

interface Props {
  comparison: ComparisonPage;
}

export default function ComparisonPageClient({ comparison }: Props) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: comparison.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://detectordeia.ai' },
      { '@type': 'ListItem', position: 2, name: 'Comparativas', item: 'https://detectordeia.ai/detector-de-ia-vs' },
      { '@type': 'ListItem', position: 3, name: `DetectordeIA vs ${comparison.competitorName}`, item: `https://detectordeia.ai/detector-de-ia-vs/${comparison.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-papel pb-10 px-2">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* HERO */}
      <section className="max-w-5xl mx-auto pt-8 pb-12 px-4 text-center">
        <h1 className="text-4xl md:text-5xl mb-4">{comparison.h1}</h1>
        <p className="text-lg text-tinta-soft max-w-3xl mx-auto leading-relaxed">{comparison.intro}</p>
      </section>

      {/* WHY DETECTORDEIA */}
      <section className="max-w-5xl mx-auto mb-16 px-4">
        <h2 className="text-3xl md:text-4xl text-center mb-3">
          ¿Por qué elegir <em>DetectorDeIA?</em>
        </h2>
        <p className="text-center text-mute mb-10">Ventajas clave sobre {comparison.competitorName}</p>

        <div className="bg-verde-050 rounded-xl border border-verde-soft p-8">
          <ul className="space-y-4">
            {comparison.whyBetter.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-verde flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-papel" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-tinta-soft leading-relaxed">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="max-w-5xl mx-auto mb-16 px-4">
        <h2 className="text-3xl md:text-4xl text-center mb-3">
          Comparación <em>detallada</em>
        </h2>
        <p className="text-center text-mute mb-10">DetectorDeIA vs {comparison.competitorName} lado a lado</p>

        <div className="bg-papel-2 rounded-xl border border-line overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-tinta text-papel">
                  <th className="px-6 py-4 text-left font-medium font-sans">Característica</th>
                  <th className="px-6 py-4 text-left font-medium font-sans">DetectorDeIA</th>
                  <th className="px-6 py-4 text-left font-medium font-sans">{comparison.competitorName}</th>
                </tr>
              </thead>
              <tbody>
                {comparison.comparisons.map((row, index) => (
                  <tr key={index} className={`border-b border-line-soft ${index % 2 === 0 ? 'bg-papel-2' : 'bg-papel'}`}>
                    <td className="px-6 py-4 font-medium text-tinta font-sans">{row.feature}</td>
                    <td className="px-6 py-4">
                      {typeof row.detectordeia === 'boolean' ? (
                        row.detectordeia ? (
                          <span className="inline-flex items-center gap-1 text-verde font-medium">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            Sí
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-mute">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            No
                          </span>
                        )
                      ) : (
                        <span className="text-tinta-soft font-sans">{row.detectordeia}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {typeof row.competitor === 'boolean' ? (
                        row.competitor ? (
                          <span className="inline-flex items-center gap-1 text-verde font-medium">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            Sí
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-mute">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            No
                          </span>
                        )
                      ) : (
                        <span className="text-tinta-soft font-sans">{row.competitor}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* WHEN TO USE COMPETITOR */}
      {comparison.whenToUseCompetitor && (
        <section className="max-w-4xl mx-auto mb-16 px-4">
          <div className="bg-papel-2 rounded-xl border border-line p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-tinta-soft flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-papel" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.347.347a3.977 3.977 0 01-.872.51 1 1 0 00-.61.84V17a2 2 0 01-4 0v-.308a1 1 0 00-.61-.84 3.977 3.977 0 01-.872-.51l-.347-.347z" /></svg>
              </div>
              <div>
                <h3 className="text-xl text-tinta mb-3">¿Cuándo usar {comparison.competitorName}?</h3>
                <p className="text-tinta-soft leading-relaxed">{comparison.whenToUseCompetitor}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PRICING COMPARISON */}
      <section className="max-w-4xl mx-auto mb-16 px-4">
        <h2 className="text-3xl md:text-4xl text-center mb-10">
          Comparación <em>de precios</em>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-verde-050 rounded-xl border border-verde-soft p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl text-tinta mb-2">DetectorDeIA</h3>
              <div className="font-mono text-3xl font-medium text-verde mb-2">{comparison.pricing.detectordeia}</div>
              <p className="text-sm text-mute">Sin renovación automática</p>
            </div>
            <Link href={`/detector?ref=vs-${comparison.slug}`} className="block w-full text-center bg-verde hover:bg-verde-deep text-papel font-medium py-4 px-6 rounded-xl transition-colors">
              Probar gratis ahora →
            </Link>
          </div>
          <div className="bg-papel-2 rounded-xl border border-line p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl text-tinta mb-2">{comparison.competitorName}</h3>
              <div className="font-mono text-3xl font-medium text-mute mb-2">{comparison.pricing.competitor}</div>
              <p className="text-sm text-mute">Precio del competidor</p>
            </div>
            {comparison.competitorWebsite && (
              <a href={comparison.competitorWebsite} target="_blank" rel="noopener noreferrer nofollow" className="block w-full text-center bg-papel-3 hover:bg-line text-tinta-soft font-medium py-4 px-6 rounded-xl transition-colors">
                Ver {comparison.competitorName} →
              </a>
            )}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto mb-16 px-4">
        <h2 className="text-3xl md:text-4xl text-center mb-3">
          Preguntas <em>frecuentes</em>
        </h2>
        <p className="text-center text-mute mb-10">Todo lo que necesitás saber sobre DetectorDeIA vs {comparison.competitorName}</p>
        <div className="space-y-3">
          {comparison.faqs.map((faq, index) => (
            <details key={index} className="bg-papel-2 rounded-xl border border-line p-6 group">
              <summary className="font-medium text-lg text-tinta cursor-pointer list-none flex items-center justify-between font-sans">
                <span>{faq.question}</span>
                <svg className="w-5 h-5 text-mute transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 text-tinta-soft leading-relaxed border-t border-line-soft pt-4 font-sans">{faq.answer}</div>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-4xl mx-auto mb-16 px-4">
        <div className="bg-tinta rounded-xl p-10 text-center">
          <h2 className="text-3xl md:text-4xl text-white mb-4">¿Listo para probar el mejor detector de IA en español?</h2>
          <p className="text-lg mb-8 text-white/60">Sin registro, sin tarjeta de crédito, 100% gratis para empezar.</p>
          <Link href={comparison.cta.url} className="inline-flex items-center gap-2 px-8 py-4 bg-papel text-tinta font-medium rounded-xl transition-colors hover:bg-papel-2">
            <span>{comparison.cta.text}</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* BREADCRUMBS */}
      <div className="max-w-5xl mx-auto px-4 text-center text-sm text-mute font-sans">
        <Link href="/" className="hover:text-verde transition-colors">Inicio</Link>
        <span className="mx-2">›</span>
        <span className="text-tinta-soft">DetectorDeIA vs {comparison.competitorName}</span>
      </div>
    </div>
  );
}
