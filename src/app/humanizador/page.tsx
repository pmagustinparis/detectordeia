import { Metadata } from 'next';
import HumanizadorClient from './HumanizadorClient';

export const metadata: Metadata = {
  title: 'Humanizar Texto IA Gratis 2025 | Humanizador en Español Sin Registro',
  description: 'Humaniza texto de IA gratis y online. Convierte contenido de ChatGPT, Gemini o cualquier IA en texto natural y humano. Sin límites en versión free, sin registro. 600 caracteres gratis, actualizado 2025.',
  keywords: ['humanizar texto ia gratis', 'humanizar texto gratis', 'humanizar ia gratis', 'humanizador de ia gratis', 'humanizar texto de ia', 'humanizar texto de chatgpt', 'humanizador de textos gratis', 'humanizar ia', 'humanizador de texto ia', 'quitar ia de un texto', 'eliminador de ia', 'humanizador gratis', 'humanizar chatgpt gratis'],
  alternates: {
    canonical: 'https://detectordeia.ai/humanizador',
  },
  openGraph: {
    title: 'Humanizar Texto IA Gratis 2025 | Humanizador en Español',
    description: 'Humaniza texto de IA gratis y online. Convierte contenido de ChatGPT, Gemini o cualquier IA en texto natural. Sin registro, 100% privado. Actualizado 2025.',
    url: 'https://detectordeia.ai/humanizador',
    siteName: 'DetectorDeIA',
    type: 'website',
    images: [
      {
        url: 'https://detectordeia.ai/og-humanizador.png',
        width: 1200,
        height: 630,
        alt: 'Humanizador de IA en Español',
      },
    ],
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Humanizar Texto IA Gratis 2025 | Humanizador en Español',
    description: 'Humaniza texto de IA gratis y online. Convierte contenido de ChatGPT, Gemini o cualquier IA en texto natural. Sin registro, actualizado 2025.',
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

export default function HumanizadorPage() {
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
            name: 'Humanizar Texto IA Gratis - Humanizador en Español',
            description: 'Humaniza texto de IA gratis y online. Herramienta gratuita para convertir contenido de ChatGPT, Gemini o cualquier IA en texto natural y humano',
            url: 'https://detectordeia.ai/humanizador',
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            featureList: [
              'Humanización de texto de IA',
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
                name: '¿Es gratis el humanizador de IA?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sí, puedes usar el humanizador de forma gratuita sin registro (3 usos diarios) o registrarte gratis para obtener 15 usos diarios. El plan gratuito te permite humanizar hasta 600 caracteres por uso.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Cuántas veces puedo usar el humanizador gratis?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sin registro: 3 usos diarios totales entre las 3 herramientas. Registrándote gratis: 15 usos diarios del Humanizador. Con Plan Pro: usos ilimitados. Límite de 600 caracteres por humanización en planes gratuitos.',
                },
              },
              {
                '@type': 'Question',
                name: '¿El humanizador cambia el significado de mi texto?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. El humanizador mantiene el significado, mensaje e ideas de tu texto original. Solo transforma la forma en que está escrito para que suene más natural y menos robótico.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Es privado? ¿Almacenan mi texto?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Tu privacidad es importante para nosotros. No almacenamos ningún texto que humanices en el plan gratuito. Tu contenido se procesa y se elimina inmediatamente después.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Funciona con texto generado por ChatGPT, Claude, Gemini?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sí, funciona con texto generado por cualquier herramienta de IA: ChatGPT, Claude, Gemini, DeepSeek, Copilot, Jasper, y cualquier otro generador de texto con inteligencia artificial.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Cuál es la diferencia entre el Modo Estándar y el Modo Avanzado?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'El Modo Estándar (gratis) hace una humanización efectiva y confiable eliminando marcadores evidentes de IA. Los Modos Avanzados (incluidos en Express y Pro) ofrecen humanización más profunda con adaptación regional (LATAM vs España), diferentes tonos (formal, creativo, académico) y mayor libertad de reformulación.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Qué incluyen los planes Express y Pro?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Express ($3.99 por 24 horas) te da acceso ilimitado a todas las herramientas con 5 modos premium, subida de archivos y sin límite de caracteres - perfecto para entregas urgentes. Pro ($12.99/mes o $124.68/año) incluye lo mismo pero de forma continua, con historial completo y soporte prioritario.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Puedo usar el texto humanizado para trabajos académicos?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'El humanizador es una herramienta de edición y mejora de textos. Sin embargo, es tu responsabilidad usar el contenido de forma ética y cumpliendo con las políticas de tu institución educativa sobre uso de IA.',
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
