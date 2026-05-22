'use client';

import { GuidePage } from '@/lib/pseo/guides';
import Link from 'next/link';

interface Props {
  guide: GuidePage;
}

export default function GuidePageClient({ guide }: Props) {
  const howToSchema = {
    '@context': 'https://schema.org', '@type': 'HowTo',
    name: guide.title, description: guide.metaDescription,
    step: guide.steps.map((step) => ({
      '@type': 'HowToStep', position: step.number, name: step.title, text: step.description,
      ...(step.tips && step.tips.length > 0 ? { itemListElement: step.tips.map((tip, index) => ({ '@type': 'HowToTip', position: index + 1, text: tip })) } : {}),
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: guide.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  };

  const articleSchema = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: guide.h1, description: guide.metaDescription,
    author: { '@type': 'Organization', name: 'DetectorDeIA' },
    publisher: { '@type': 'Organization', name: 'DetectorDeIA', logo: { '@type': 'ImageObject', url: 'https://detectordeia.ai/brandidentity-detectordeia/logo-detectordeia.png' } },
    datePublished: '2025-01-14', dateModified: '2025-01-14',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://detectordeia.ai' },
      { '@type': 'ListItem', position: 2, name: 'Guías', item: 'https://detectordeia.ai/guias' },
      { '@type': 'ListItem', position: 3, name: guide.title, item: `https://detectordeia.ai/guias/${guide.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-papel pb-10 px-2">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* HERO */}
      <section className="max-w-5xl mx-auto pt-8 pb-12 px-4">
        <div className="inline-block px-4 py-2 bg-verde-050 text-verde-deep rounded-full text-sm font-medium mb-4 font-sans">
          Guía Práctica
        </div>
        <h1 className="text-4xl md:text-5xl mb-6">{guide.h1}</h1>
        <p className="text-lg text-tinta-soft max-w-3xl leading-relaxed mb-6 font-sans">{guide.intro}</p>
        <div className="bg-papel-2 rounded-xl border border-line p-6">
          <h2 className="font-medium text-lg mb-2 text-tinta font-sans">Lo que aprenderás:</h2>
          <p className="text-tinta-soft leading-relaxed font-sans">{guide.overview}</p>
        </div>
      </section>

      {/* STEPS */}
      <section className="max-w-4xl mx-auto mb-16 px-4">
        <h2 className="text-3xl md:text-4xl text-center mb-3">
          Guía paso <em>a paso</em>
        </h2>
        <p className="text-center text-mute mb-10 font-sans">Sigue estos {guide.steps.length} pasos para dominar el tema</p>

        <div className="space-y-8">
          {guide.steps.map((step, index) => (
            <div key={index} className="bg-papel-2 rounded-xl border border-line p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-verde flex items-center justify-center flex-shrink-0 text-papel font-bold text-xl font-sans">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl text-tinta mb-3">{step.title}</h3>
                </div>
              </div>
              <div className="mb-6 pl-16">
                <p className="text-tinta-soft leading-relaxed whitespace-pre-line font-sans">{step.description}</p>
              </div>
              {step.tips && step.tips.length > 0 && (
                <div className="pl-16 bg-verde-050 rounded-xl p-4 border-l-2 border-verde-soft">
                  <p className="font-medium text-verde-deep mb-2 font-sans">Consejos prácticos:</p>
                  <ul className="space-y-2">
                    {step.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="text-tinta-soft text-sm flex items-start gap-2 font-sans">
                        <span className="text-verde font-bold flex-shrink-0">•</span>
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
        <h2 className="text-3xl md:text-4xl text-center mb-3">
          Errores <em>comunes</em>
        </h2>
        <p className="text-center text-mute mb-10 font-sans">Evita estos errores frecuentes</p>
        <div className="space-y-4">
          {guide.commonMistakes.map((mistake, index) => (
            <div key={index} className="bg-papel-2 rounded-xl border border-line p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-coral-soft flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg mb-2 text-coral font-sans">{mistake.mistake}</h3>
                  <div className="bg-verde-050 rounded-lg p-4 border-l-2 border-verde mt-3">
                    <p className="font-medium text-verde-deep mb-1 font-sans">Solución:</p>
                    <p className="text-tinta-soft leading-relaxed font-sans">{mistake.solution}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQS */}
      <section className="max-w-4xl mx-auto mb-16 px-4">
        <h2 className="text-3xl md:text-4xl text-center mb-3">
          Preguntas <em>frecuentes</em>
        </h2>
        <p className="text-center text-mute mb-10 font-sans">Respuestas a las dudas más comunes</p>
        <div className="space-y-3">
          {guide.faqs.map((faq, index) => (
            <details key={index} className="bg-papel-2 rounded-xl border border-line p-6 group">
              <summary className="font-medium text-lg text-tinta cursor-pointer list-none flex items-center justify-between font-sans">
                <span className="pr-4">{faq.question}</span>
                <span className="text-mute group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
              </summary>
              <p className="text-tinta-soft mt-4 leading-relaxed pt-4 border-t border-line-soft whitespace-pre-line font-sans">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* RELATED CONTENT & CTA */}
      <section className="max-w-5xl mx-auto mb-12 px-4">
        <div className="bg-papel-2 rounded-xl border border-line p-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {guide.relatedGuides && guide.relatedGuides.length > 0 && (
              <div>
                <h3 className="text-xl text-tinta mb-4 font-sans font-medium">Guías relacionadas</h3>
                <div className="space-y-3">
                  {guide.relatedGuides.map((related, index) => (
                    <Link key={index} href={`/guias/${related.slug}`} className="block p-4 bg-papel rounded-lg border border-line-soft hover:border-line transition-all group">
                      <span className="text-tinta-soft font-medium group-hover:text-tinta font-sans">{related.title}</span>
                      <span className="text-verde ml-2 group-hover:ml-3 transition-all">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {guide.relatedTools && guide.relatedTools.length > 0 && (
              <div>
                <h3 className="text-xl text-tinta mb-4 font-sans font-medium">Herramientas útiles</h3>
                <div className="space-y-3">
                  {guide.relatedTools.map((tool, index) => (
                    <Link key={index} href={tool.url} className="block p-4 bg-papel rounded-lg border border-line-soft hover:border-line transition-all group">
                      <span className="text-tinta-soft font-medium group-hover:text-tinta font-sans">{tool.name}</span>
                      <span className="text-verde ml-2 group-hover:ml-3 transition-all">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="text-center pt-6 border-t border-line">
            <p className="text-tinta-soft mb-4 font-medium text-lg font-sans">¿Listo para poner en práctica lo aprendido?</p>
            <Link href={guide.cta.url} className="inline-flex items-center gap-2 px-8 py-4 bg-verde hover:bg-verde-deep text-papel font-medium rounded-xl transition-colors">
              <span>{guide.cta.text}</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
