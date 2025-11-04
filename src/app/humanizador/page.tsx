import { Metadata } from 'next';
import HumanizadorClient from './HumanizadorClient';

export const metadata: Metadata = {
  title: 'Humanizador de IA en Español Gratis | DetectorDeIA',
  description: 'Transforma texto generado por IA en contenido natural y humano. Humanizador gratuito, sin registro, optimizado para español. Hasta 600 caracteres gratis.',
  keywords: ['humanizador de ia', 'humanizar texto ia', 'convertir ia a humano', 'humanizador español', 'chatgpt humanizer', 'humanizar chatgpt', 'humanizar texto chatgpt', 'pasar detector ia', 'humanizador gratis'],
  alternates: {
    canonical: 'https://detectordeia.ai/humanizador',
  },
  openGraph: {
    title: 'Humanizador de IA en Español Gratis',
    description: 'Transforma texto generado por IA en contenido natural y humano. Sin registro, 100% privado, optimizado para español.',
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
    title: 'Humanizador de IA en Español Gratis',
    description: 'Transforma texto generado por IA en contenido natural y humano. Sin registro, optimizado para español.',
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
            name: 'Humanizador de IA en Español',
            description: 'Herramienta gratuita para transformar texto generado por IA en contenido natural y humano',
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
              'Usos ilimitados',
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
                  text: 'Sí, puedes usar el humanizador de forma completamente gratuita sin necesidad de registro. El plan gratuito te permite humanizar hasta 600 caracteres por uso, con usos ilimitados al día.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Cuántas veces puedo usar el humanizador gratis?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '¡Todas las veces que quieras! No hay límite diario de usos en el plan gratuito. Solo hay un límite de 600 caracteres por cada humanización.',
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
                  text: 'El Modo Estándar (gratis) hace una humanización efectiva y confiable eliminando marcadores evidentes de IA. El Modo Avanzado (próximamente en Premium) ofrece humanización más profunda con adaptación regional (LATAM vs España) y mayor libertad de reformulación.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Cuándo estará disponible el plan Premium?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Estamos trabajando en el plan Premium que estará disponible próximamente. Incluirá límites más altos (15,000 caracteres), Modo Avanzado, historial, carga de archivos y más. Puedes dejar tu email para ser avisado cuando esté listo.',
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
