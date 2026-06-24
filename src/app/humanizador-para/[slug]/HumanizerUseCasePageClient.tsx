'use client';

import { HumanizerUseCasePage } from '@/lib/pseo/types';
import Link from 'next/link';

interface Props {
  useCase: HumanizerUseCasePage;
}

export default function HumanizerUseCasePageClient({ useCase }: Props) {
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://detectordeia.ai' },
      { '@type': 'ListItem', position: 2, name: 'Humanizador', item: 'https://detectordeia.ai/humanizador' },
      { '@type': 'ListItem', position: 3, name: `Humanizador para ${useCase.useCaseName}`, item: `https://detectordeia.ai/humanizador-para/${useCase.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-papel pb-16 px-2">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* HERO */}
      <section className="max-w-3xl mx-auto pt-12 pb-10 px-4 text-center">
        <p className="font-mono text-xs font-medium text-mute uppercase tracking-widest mb-3">
          Humanizador de IA · {useCase.useCaseName}
        </p>
        <h1 className="text-3xl md:text-4xl text-tinta font-bold mb-4 leading-tight">
          {useCase.h1}
        </h1>
        <p className="text-base text-tinta-soft max-w-2xl mx-auto leading-relaxed mb-8">
          {useCase.intro}
        </p>
        <Link
          href={useCase.cta.url}
          className="inline-flex items-center gap-2 px-6 py-3 bg-tinta hover:bg-tinta-soft text-papel font-semibold rounded-xl transition-all text-sm shadow-sm"
        >
          {useCase.cta.text} →
        </Link>
        <p className="text-xs text-mute mt-2">Sin registro · Sin tarjeta · Gratis para empezar</p>
      </section>

      {/* BENEFICIOS */}
      <section className="max-w-3xl mx-auto mb-14 px-4">
        <h2 className="text-2xl text-tinta font-bold text-center mb-8">
          ¿Qué hace el Humanizador por tus {useCase.useCaseName}?
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {useCase.benefits.map((benefit, i) => (
            <div key={i} className="bg-papel-2 border border-line rounded-xl p-5">
              <div className="text-2xl mb-3">{benefit.icon}</div>
              <h3 className="text-sm font-bold text-tinta mb-1">{benefit.title}</h3>
              <p className="text-sm text-tinta-soft leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="max-w-3xl mx-auto mb-14 px-4">
        <h2 className="text-2xl text-tinta font-bold text-center mb-8">
          Cómo humanizar tus {useCase.useCaseName}
        </h2>
        <div className="space-y-3">
          {useCase.howItWorks.map((step, i) => (
            <div key={i} className="flex items-start gap-4 bg-papel-2 border border-line rounded-xl p-4">
              <div className="w-7 h-7 rounded-full bg-tinta text-papel flex items-center justify-center shrink-0 text-xs font-bold">
                {i + 1}
              </div>
              <p className="text-sm text-tinta-soft leading-relaxed pt-0.5">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLANES */}
      <section className="max-w-3xl mx-auto mb-14 px-4">
        <div className="bg-papel-2 border border-line rounded-2xl p-6 md:p-8">
          <h2 className="text-xl text-tinta font-bold mb-1 text-center">Precios para humanizar {useCase.useCaseName}</h2>
          <p className="text-sm text-mute text-center mb-6">Pago único · Sin renovación automática · Sin suscripción</p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-papel border border-line rounded-xl p-4 text-center">
              <p className="text-xs font-mono uppercase tracking-wider text-mute mb-1">Gratis</p>
              <p className="text-2xl font-bold text-tinta mb-1">$0</p>
              <p className="text-xs text-tinta-soft mb-3">600 chars · 15 usos/día</p>
              <p className="text-xs text-mute">Para resúmenes cortos</p>
            </div>
            <div className="bg-papel border border-amber-300 rounded-xl p-4 text-center ring-1 ring-amber-300">
              <p className="text-xs font-mono uppercase tracking-wider text-amber-700 mb-1">Express</p>
              <p className="text-2xl font-bold text-tinta mb-1">$1.99</p>
              <p className="text-xs text-tinta-soft mb-3">24 horas · Ilimitado</p>
              <p className="text-xs text-mute">Para una entrega urgente</p>
            </div>
            <div className="bg-verde-deep rounded-xl p-4 text-center">
              <p className="text-xs font-mono uppercase tracking-wider text-verde-soft mb-1">Semestral</p>
              <p className="text-2xl font-bold text-white mb-1">$24.99</p>
              <p className="text-xs text-white/60 mb-3">6 meses · Ilimitado</p>
              <p className="text-xs text-verde-soft">Para todo el semestre</p>
            </div>
          </div>
          <div className="text-center mt-6">
            <Link
              href={useCase.cta.url}
              className="inline-flex items-center gap-2 px-6 py-3 bg-tinta hover:bg-tinta-soft text-papel font-semibold rounded-xl transition-all text-sm"
            >
              {useCase.cta.text} →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-3xl mx-auto mb-14 px-4">
        <h2 className="text-2xl text-tinta font-bold text-center mb-8">
          Preguntas frecuentes sobre humanizar {useCase.useCaseName}
        </h2>
        <div className="space-y-3">
          {useCase.faqs.map((faq, i) => (
            <details
              key={i}
              className="bg-papel-2 border border-line rounded-xl overflow-hidden group"
            >
              <summary className="font-semibold text-sm text-tinta cursor-pointer list-none flex items-center justify-between p-5 hover:bg-papel-3 transition-colors">
                <span>{faq.question}</span>
                <svg
                  className="w-4 h-4 text-mute shrink-0 transition-transform group-open:rotate-180 ml-3"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-5 text-sm text-tinta-soft leading-relaxed border-t border-line-soft pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-3xl mx-auto mb-8 px-4">
        <div className="bg-tinta rounded-2xl p-8 text-center">
          <h2 className="text-2xl text-papel font-bold mb-2">
            ¿Listo para humanizar tus {useCase.useCaseName}?
          </h2>
          <p className="text-papel/60 text-sm mb-6">
            Sin registro · Sin tarjeta de crédito · Resultado en segundos
          </p>
          <Link
            href={useCase.cta.url}
            className="inline-flex items-center gap-2 px-8 py-3 bg-papel hover:bg-papel-2 text-tinta font-bold rounded-xl transition-all"
          >
            {useCase.cta.text} →
          </Link>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="max-w-3xl mx-auto px-4 text-center text-xs text-mute">
        <Link href="/" className="hover:text-tinta transition-colors">Inicio</Link>
        <span className="mx-2">›</span>
        <Link href="/humanizador" className="hover:text-tinta transition-colors">Humanizador</Link>
        <span className="mx-2">›</span>
        <span className="text-tinta-soft">Humanizador para {useCase.useCaseName}</span>
      </div>
    </div>
  );
}
