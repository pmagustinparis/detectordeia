'use client';

import { UseCasePage } from '@/lib/pseo/types';
import Link from 'next/link';

interface Props {
  useCase: UseCasePage;
}

export default function UseCasePageClient({ useCase }: Props) {
  // JSON-LD Schema para FAQs (SEO)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: useCase.faqs.map((faq) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO SECTION */}
      <section className="max-w-5xl mx-auto pt-8 pb-12 px-4 text-center">
        <div className="inline-block px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold mb-4">
          Para {useCase.audience}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fade-in">
          <span className="gradient-text-primary">{useCase.h1}</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
          {useCase.intro}
        </p>
        <Link
          href={useCase.cta.url}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <span>{useCase.cta.text}</span>
          <span>→</span>
        </Link>
      </section>

      {/* BENEFITS */}
      <section className="max-w-6xl mx-auto mb-16 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">
          <span className="gradient-text-primary">Beneficios</span>
          <span className="text-gray-800"> para {useCase.audience}</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Por qué DetectorDeIA es la mejor herramienta para vos
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCase.benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 card-elevated group hover:border-violet-200 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all">
                <span className="text-3xl">{benefit.icon}</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">{benefit.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-4xl mx-auto mb-16 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">
          <span className="text-gray-800">¿Cómo</span>
          <span className="gradient-text-primary"> funciona?</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Simple, rápido y efectivo en 5 pasos
        </p>

        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-3xl shadow-lg border border-violet-200 p-8">
          <ol className="space-y-6">
            {useCase.howItWorks.map((step, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0 text-white font-bold shadow-md">
                  {index + 1}
                </div>
                <p className="text-gray-700 leading-relaxed pt-1.5">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* TESTIMONIAL */}
      {useCase.testimonial && (
        <section className="max-w-4xl mx-auto mb-16 px-4">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl shadow-lg border border-blue-200 p-8 md:p-10">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 text-3xl">
                💬
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-lg text-gray-700 italic mb-4 leading-relaxed">
                  "{useCase.testimonial.quote}"
                </p>
                <div>
                  <p className="font-bold text-gray-800">{useCase.testimonial.author}</p>
                  <p className="text-sm text-gray-600">{useCase.testimonial.role}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="max-w-4xl mx-auto mb-16 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">
          <span className="text-gray-800">Preguntas</span>
          <span className="gradient-text-primary"> frecuentes</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Todo lo que {useCase.audience.toLowerCase()} necesitan saber
        </p>

        <div className="space-y-4">
          {useCase.faqs.map((faq, index) => (
            <details
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 card-elevated group open:ring-2 open:ring-violet-300"
            >
              <summary className="font-bold text-lg text-gray-800 cursor-pointer list-none flex items-center justify-between">
                <span>{faq.question}</span>
                <svg
                  className="w-5 h-5 text-violet-500 transition-transform group-open:rotate-180"
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
        <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl shadow-2xl p-10 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-lg mb-8 text-violet-100">
            Sin registro, sin tarjeta de crédito, 100% gratis para empezar.
          </p>
          <Link
            href={useCase.cta.url}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-violet-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <span>{useCase.cta.text}</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* BREADCRUMBS FOOTER */}
      <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-500">
        <Link href="/" className="hover:text-violet-600 transition-colors">
          Inicio
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">{useCase.audience}</span>
      </div>
    </div>
  );
}
