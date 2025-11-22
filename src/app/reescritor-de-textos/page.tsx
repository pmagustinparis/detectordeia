import { Metadata } from 'next';
import ParafraseadorClient from '../parafraseador/ParafraseadorClient';

export const metadata: Metadata = {
  title: 'Reescritor de Textos Online Gratis | Reescribe Textos sin Plagio',
  description: 'Reescribe textos con otras palabras manteniendo el significado. Sin plagio. Reescritor gratuito, sin registro, optimizado para español. Hasta 600 caracteres gratis.',
  keywords: ['reescritor de textos', 'reescribir texto', 'reescribir online', 'reescritor gratis', 'reescribir sin plagio', 'reescritor español', 'reescribir textos academicos'],
  alternates: {
    canonical: 'https://detectordeia.ai/reescritor-de-textos',
  },
  openGraph: {
    title: 'Reescritor de Textos Online Gratis',
    description: 'Reescribe textos con otras palabras manteniendo el significado. Sin plagio. Sin registro, optimizado para español.',
    url: 'https://detectordeia.ai/reescritor-de-textos',
    siteName: 'DetectorDeIA',
    type: 'website',
    images: [
      {
        url: 'https://detectordeia.ai/og-parafraseador.png',
        width: 1200,
        height: 630,
        alt: 'Reescritor de Textos en Español',
      },
    ],
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reescritor de Textos Online Gratis',
    description: 'Reescribe textos con otras palabras manteniendo el significado. Sin plagio. Optimizado para español.',
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

export default function ReescritorPage() {
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
            name: 'Reescritor de Textos Online',
            description: 'Herramienta gratuita para reescribir textos con otras palabras manteniendo el significado. Sin plagio.',
            url: 'https://detectordeia.ai/reescritor-de-textos',
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            featureList: [
              'Reescribir textos online',
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
                name: '¿Qué es un reescritor de textos?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Un reescritor de textos es una herramienta que reescribe contenido usando otras palabras y estructuras, manteniendo el significado original. Útil para evitar plagio y crear contenido único.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Es gratis el reescritor de textos?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sí, puedes reescribir textos de forma gratuita. Ofrecemos 3 usos diarios sin registro y 15 usos diarios registrándote gratis. Cada reescritura permite hasta 600 caracteres.',
                },
              },
              {
                '@type': 'Question',
                name: '¿El reescritor evita el plagio?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sí, nuestro reescritor ayuda a evitar el plagio al reformular el texto con otras palabras. Sin embargo, siempre debes citar las fuentes originales y seguir las normas académicas de tu institución.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Puedo reescribir textos académicos?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sí, puedes reescribir textos académicos, ensayos, artículos y trabajos universitarios. El reescritor mantiene el nivel académico y la coherencia del texto original mientras lo reformula.',
                },
              },
              {
                '@type': 'Question',
                name: '¿El reescritor cambia el significado?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. El reescritor mantiene el significado, mensaje e ideas del texto original. Solo reescribe la forma en que está expresado usando sinónimos y estructuras alternativas.',
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
