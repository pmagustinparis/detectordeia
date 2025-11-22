import { Metadata } from 'next';
import HumanizadorClient from '../humanizador/HumanizadorClient';

export const metadata: Metadata = {
  title: 'Convertidor de IA a Humano Gratis | Convierte Texto IA a Humano',
  description: 'Convierte texto generado por IA en contenido humano y natural. Convertidor gratuito de IA a texto humano, sin registro, optimizado para español. Convierte hasta 600 caracteres gratis.',
  keywords: ['convertidor ia a humano', 'convertir ia a humano', 'convertir texto ia', 'ia a humano gratis', 'convertir chatgpt a humano', 'convertidor de ia', 'texto ia a humano'],
  alternates: {
    canonical: 'https://detectordeia.ai/convertidor-ia-a-humano',
  },
  openGraph: {
    title: 'Convertidor de IA a Humano Gratis',
    description: 'Convierte texto generado por IA en contenido humano y natural. Sin registro, 100% privado, optimizado para español.',
    url: 'https://detectordeia.ai/convertidor-ia-a-humano',
    siteName: 'DetectorDeIA',
    type: 'website',
    images: [
      {
        url: 'https://detectordeia.ai/og-humanizador.png',
        width: 1200,
        height: 630,
        alt: 'Convertidor de IA a Humano en Español',
      },
    ],
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convertidor de IA a Humano Gratis',
    description: 'Convierte texto generado por IA en contenido humano y natural. Sin registro, optimizado para español.',
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

export default function ConvertidorPage() {
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
            name: 'Convertidor de IA a Humano',
            description: 'Herramienta gratuita para convertir texto generado por IA en contenido humano y natural',
            url: 'https://detectordeia.ai/convertidor-ia-a-humano',
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            featureList: [
              'Convertir texto de IA a humano',
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
                name: '¿Cómo funciona el convertidor de IA a humano?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Nuestro convertidor analiza el texto generado por IA y lo reescribe para que suene más natural y humano. Convierte patrones robóticos en escritura fluida manteniendo el significado original.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Es gratis convertir texto de IA a humano?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sí, puedes convertir texto de IA a humano de forma gratuita. Sin registro obtienes 3 usos diarios, y registrándote gratis obtienes 15 usos diarios. Cada conversión permite hasta 600 caracteres.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Funciona con ChatGPT, Claude y Gemini?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sí, el convertidor funciona con texto generado por cualquier IA: ChatGPT, Claude, Gemini, DeepSeek, Copilot y cualquier otro generador de contenido con inteligencia artificial.',
                },
              },
              {
                '@type': 'Question',
                name: '¿El convertidor cambia el significado del texto?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. El convertidor mantiene el significado, mensaje e ideas de tu texto original. Solo convierte la forma en que está escrito para que suene más natural y menos generado por IA.',
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
