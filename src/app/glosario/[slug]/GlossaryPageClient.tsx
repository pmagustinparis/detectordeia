'use client';

import { GlossaryPage } from '@/lib/pseo/glossary';
import Link from 'next/link';

interface Props {
  term: GlossaryPage;
}

export default function GlossaryPageClient({ term }: Props) {
  // JSON-LD Schema para DefinedTerm (SEO)
  const termSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.term,
    description: term.definition,
    inDefinedTermSet: 'https://detectordeia.ai/glosario',
  };

  // JSON-LD Schema para FAQs (SEO)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: term.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen pb-10 px-2">
      {/* JSON-LD para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto pt-8 pb-12 px-4">
        <div className="inline-block px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold mb-4">
          📚 Glosario
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 animate-fade-in">
          <span className="gradient-text-primary">{term.h1}</span>
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          {term.intro}
        </p>
      </section>

      {/* DEFINITION */}
      <section className="max-w-4xl mx-auto mb-12 px-4">
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-3xl shadow-lg border border-violet-200 p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <span>📖</span> Definición
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {term.definition}
          </p>
        </div>
      </section>

      {/* CHARACTERISTICS */}
      <section className="max-w-5xl mx-auto mb-12 px-4">
        <h2 className="text-3xl font-extrabold mb-6 text-center">
          <span className="gradient-text-primary">Características</span>
          <span className="text-gray-800"> Principales</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {term.characteristics.map((char, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-100 p-6 hover:border-violet-200 hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all">
                <span className="text-3xl">{char.icon}</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">{char.title}</h3>
              <p className="text-gray-600 leading-relaxed">{char.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EXAMPLES */}
      <section className="max-w-4xl mx-auto mb-12 px-4">
        <h2 className="text-3xl font-extrabold mb-6">
          <span className="gradient-text-primary">Ejemplos</span>
          <span className="text-gray-800"> Prácticos</span>
        </h2>
        <div className="space-y-4">
          {term.examples.map((example, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl shadow-md border border-violet-200 p-6"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                </div>
                <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: example }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQS */}
      <section className="max-w-4xl mx-auto mb-12 px-4">
        <h2 className="text-3xl font-extrabold mb-6 text-center">
          <span className="gradient-text-primary">Preguntas</span>
          <span className="text-gray-800"> Frecuentes</span>
        </h2>
        <div className="space-y-4">
          {term.faqs.map((faq, index) => (
            <details
              key={index}
              className="bg-white rounded-xl shadow-md border border-violet-100 p-6 hover:border-violet-200 transition-all group"
            >
              <summary className="font-bold text-lg text-gray-800 cursor-pointer list-none flex items-center justify-between">
                <span className="pr-4">{faq.question}</span>
                <span className="text-violet-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 mt-4 leading-relaxed pt-4 border-t border-violet-100">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* RELATED TERMS & CTA */}
      <section className="max-w-4xl mx-auto mb-12 px-4">
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-3xl shadow-lg border border-violet-200 p-8">
          {/* Related Terms */}
          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                <span>🔗</span> Términos Relacionados
              </h3>
              <div className="flex flex-wrap gap-3">
                {term.relatedTerms.map((related, index) => (
                  <Link
                    key={index}
                    href={`/glosario/${related.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md border border-violet-200 hover:border-violet-300 transition-all"
                  >
                    <span className="text-gray-700 font-medium">{related.term}</span>
                    <span className="text-violet-500">→</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Tools */}
          {term.relatedTools && term.relatedTools.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                <span>🛠️</span> Herramientas Relacionadas
              </h3>
              <div className="flex flex-wrap gap-3">
                {term.relatedTools.map((tool, index) => (
                  <Link
                    key={index}
                    href={tool.url}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md border border-violet-200 hover:border-violet-300 transition-all"
                  >
                    <span className="text-gray-700 font-medium">{tool.name}</span>
                    <span className="text-violet-500">→</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="text-center pt-6 border-t border-violet-200">
            <p className="text-gray-700 mb-4 font-medium">
              ¿Listo para verificar tu contenido?
            </p>
            <Link
              href={term.cta.url}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span>{term.cta.text}</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
