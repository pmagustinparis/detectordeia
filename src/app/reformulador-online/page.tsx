import { Metadata } from 'next';
import ParafraseadorClient from '../parafraseador/ParafraseadorClient';

export const metadata: Metadata = {
  title: 'Reformulador Online Gratis | Reformula Textos sin Plagio',
  description: 'Reformula textos con otras palabras manteniendo el significado. Sin plagio. Reformulador gratuito, sin registro, optimizado para español. Hasta 600 caracteres gratis.',
  keywords: ['reformulador online', 'reformular texto', 'reformulador gratis', 'reformular sin plagio', 'reformulador español', 'reformular textos academicos'],
  alternates: {
    canonical: 'https://detectordeia.ai/reformulador-online',
  },
  openGraph: {
    title: 'Reformulador Online Gratis',
    description: 'Reformula textos con otras palabras manteniendo el significado. Sin plagio. Sin registro, optimizado para español.',
    url: 'https://detectordeia.ai/reformulador-online',
    siteName: 'DetectorDeIA',
    type: 'website',
    images: [
      {
        url: 'https://detectordeia.ai/og-parafraseador.png',
        width: 1200,
        height: 630,
        alt: 'Reformulador Online en Español',
      },
    ],
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reformulador Online Gratis',
    description: 'Reformula textos con otras palabras manteniendo el significado. Sin plagio. Optimizado para español.',
    images: ['https://detectordeia.ai/og-parafraseador.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function ReformuladorPage() {
  return (
    <>
      <ParafraseadorClient />

      {/* Structured Data - JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Reformulador de Textos Online',
            description: 'Herramienta gratuita para reformular textos con otras palabras manteniendo el significado. Sin plagio.',
            url: 'https://detectordeia.ai/reformulador-online',
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            featureList: [
              'Reformular textos online',
              'Sin plagio',
              'Sin registro requerido',
              '600 caracteres gratis',
              '15 usos diarios',
              '100% privado',
              'Optimizado para español',
            ],
          }),
        }}
      />

      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: '¿Qué es un reformulador de textos?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Un reformulador de textos es una herramienta que reformula contenido usando diferentes palabras y estructuras gramaticales, manteniendo el significado original. Ideal para evitar plagio y crear versiones únicas de textos.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Es gratis el reformulador online?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sí, puedes reformular textos de forma gratuita. Ofrecemos 3 usos diarios sin registro y 15 usos diarios registrándote gratis. Cada reformulación permite hasta 600 caracteres.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Cómo funciona el reformulador?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'El reformulador analiza tu texto y lo reescribe usando sinónimos, estructuras alternativas y variaciones gramaticales. Mantiene el significado original mientras crea una versión única del contenido.',
                },
              },
              {
                '@type': 'Question',
                name: '¿El reformulador evita el plagio?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sí, nuestro reformulador ayuda a evitar el plagio al reformular el texto con diferentes palabras y estructuras. Sin embargo, siempre debes citar las fuentes y seguir las normas académicas.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Puedo usar el reformulador para trabajos académicos?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sí, puedes reformular textos académicos, ensayos y trabajos universitarios. El reformulador es útil para parafrasear fuentes y expresar ideas con tus propias palabras, siempre citando correctamente.',
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
