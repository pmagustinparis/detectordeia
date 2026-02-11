import { Metadata } from 'next';
import ParafraseadorClient from './ParafraseadorClient';

export const metadata: Metadata = {
  title: 'Parafraseador de IA en Español Gratis | DetectorDeIA',
  description: 'Reescribe textos con otras palabras manteniendo el significado. Sin plagio. Parafraseador gratuito, sin registro, optimizado para español. Hasta 600 caracteres gratis.',
  keywords: ['parafraseador', 'parafrasear online', 'reescribir texto', 'evitar plagio', 'parafrasear español', 'parafrasear gratis', 'reescribir sin plagio', 'parafraseador español', 'parafraseo online'],
  alternates: {
    canonical: 'https://detectordeia.ai/parafraseador',
  },
  openGraph: {
    title: 'Parafraseador de IA en Español Gratis',
    description: 'Reescribe textos con otras palabras manteniendo el significado. Sin plagio. Sin registro, optimizado para español.',
    url: 'https://detectordeia.ai/parafraseador',
    siteName: 'DetectorDeIA',
    type: 'website',
    images: [
      {
        url: 'https://detectordeia.ai/og-parafraseador.png',
        width: 1200,
        height: 630,
        alt: 'Parafraseador de IA en Español',
      },
    ],
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parafraseador de IA en Español Gratis',
    description: 'Reescribe textos con otras palabras manteniendo el significado. Sin plagio. Sin registro, optimizado para español.',
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

export default function ParafraseadorPage() {
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
            name: 'Parafraseador de IA en Español',
            description: 'Herramienta gratuita para reescribir textos con otras palabras manteniendo el significado. Sin plagio.',
            url: 'https://detectordeia.ai/parafraseador',
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            featureList: [
              'Parafraseo de textos',
              'Sin plagio garantizado',
              'Sin registro requerido',
              '600 caracteres gratis',
              '15 usos diarios',
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
                name: '¿Qué es parafrasear?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Parafrasear es reescribir un texto con diferentes palabras sin cambiar su significado original. Implica usar sinónimos, reorganizar oraciones y reestructurar el contenido manteniendo el mensaje central intacto.',
                },
              },
              {
                '@type': 'Question',
                name: '¿El parafraseador evita el plagio?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sí. Nuestro parafraseador reescribe tu texto de forma única, haciendo que el resultado sea original. Sin embargo, si parafraseas ideas de otros, siempre debes citar las fuentes según las normas académicas.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Es gratis el parafraseador?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sí, puedes usar el parafraseador de forma gratuita sin registro (3 usos diarios) o registrarte gratis para obtener 15 usos diarios. El plan gratuito permite parafrasear hasta 600 caracteres por uso.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Cuántas veces puedo usarlo gratis?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sin registro: 3 usos diarios totales entre las 3 herramientas. Registrándote gratis: 15 usos diarios del Parafraseador. Con Plan Pro: usos ilimitados. Límite de 600 caracteres por paráfrasis en planes gratuitos.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Cambia el significado de mi texto?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. El parafraseador mantiene el significado, ideas y argumentos de tu texto original. Solo transforma la forma en que está escrito, usando otras palabras y estructuras.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Funciona con textos académicos?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sí, funciona perfectamente con textos académicos, ensayos, artículos científicos, trabajos universitarios y cualquier tipo de contenido que necesites parafrasear.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Cuál es la diferencia entre parafrasear y resumir?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Parafrasear reescribe el texto completo con otras palabras manteniendo la misma longitud. Resumir condensa el texto en una versión más corta con solo las ideas principales.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Qué modos de parafraseo hay disponibles?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'El Modo Estándar está disponible gratis. Con Express ($3.99/24h) o Pro ($12.99/mes) obtenés 4 modos premium adicionales: Formal (tono profesional), Creativo (cambios profundos), Simplificado (más fácil de entender) y Académico (estilo universitario).',
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
