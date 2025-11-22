import { Metadata } from 'next';
import HumanizadorClient from '../humanizador/HumanizadorClient';

export const metadata: Metadata = {
  title: 'Transformador de Texto IA Gratis | Transforma IA a Texto Humano',
  description: 'Transforma texto generado por IA en contenido humano y natural. Transformador gratuito de textos IA, sin registro, optimizado para español. Transforma hasta 600 caracteres gratis.',
  keywords: ['transformador texto ia', 'transformar texto ia', 'transformar ia a humano', 'transformador de ia', 'transformar chatgpt', 'texto ia transformador'],
  alternates: {
    canonical: 'https://detectordeia.ai/transformador-texto-ia',
  },
  openGraph: {
    title: 'Transformador de Texto IA Gratis',
    description: 'Transforma texto generado por IA en contenido humano y natural. Sin registro, 100% privado, optimizado para español.',
    url: 'https://detectordeia.ai/transformador-texto-ia',
    siteName: 'DetectorDeIA',
    type: 'website',
    images: [
      {
        url: 'https://detectordeia.ai/og-humanizador.png',
        width: 1200,
        height: 630,
        alt: 'Transformador de Texto IA en Español',
      },
    ],
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transformador de Texto IA Gratis',
    description: 'Transforma texto generado por IA en contenido humano. Sin registro, optimizado para español.',
    images: ['https://detectordeia.ai/og-humanizador.png'],
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

export default function TransformadorPage() {
  return (
    <>
      <HumanizadorClient />

      {/* Structured Data - JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Transformador de Texto IA',
            description: 'Herramienta gratuita para transformar texto generado por IA en contenido humano y natural',
            url: 'https://detectordeia.ai/transformador-texto-ia',
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            featureList: [
              'Transformar texto de IA',
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
                name: '¿Qué es un transformador de texto IA?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Un transformador de texto IA es una herramienta que transforma contenido generado por inteligencia artificial en texto que suena más natural y humano. Elimina patrones robóticos característicos de la IA.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Es gratis transformar texto de IA?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sí, puedes transformar texto de IA de forma gratuita. Ofrecemos 3 usos diarios sin registro y 15 usos diarios registrándote gratis. Cada transformación permite hasta 600 caracteres.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Qué textos de IA puedo transformar?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Puedes transformar texto generado por cualquier IA: ChatGPT, Claude, Gemini, DeepSeek, Copilot, Jasper y cualquier otro modelo de lenguaje. El transformador funciona con todos.',
                },
              },
              {
                '@type': 'Question',
                name: '¿El transformador mantiene el significado original?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sí, el transformador mantiene el significado, mensaje e ideas del texto original. Solo transforma la forma de escribir para hacerla más natural y menos robótica.',
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
