import { Metadata } from 'next';
import ComprobadorPageClient from './ComprobadorPageClient';

export const metadata: Metadata = {
  title: 'Comprobador de IA Gratis | Comprueba Textos de IA',
  description: 'Comprobador de IA online gratuito en español. Comprueba si un texto fue generado por ChatGPT, Claude o Gemini. Herramienta precisa y privada para comprobar contenido de IA. Sin registro.',
  alternates: {
    canonical: 'https://detectordeia.ai/comprobador-de-ia',
  },
  openGraph: {
    title: 'Comprobador de IA Gratis | DetectordeIA.ai',
    description: 'Comprueba textos generados por IA con nuestro comprobador online gratuito. Preciso y fácil de usar.',
    url: 'https://detectordeia.ai/comprobador-de-ia',
    siteName: 'DetectordeIA.ai',
    images: [
      {
        url: 'https://detectordeia.ai/logo.png',
        width: 800,
        height: 600,
        alt: 'Comprobador de IA - DetectordeIA.ai',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comprobador de IA Gratis | DetectordeIA.ai',
    description: 'Comprueba si un texto fue escrito por IA. Gratis, preciso y privado.',
    images: ['https://detectordeia.ai/logo.png'],
  },
};

export default function ComprobadorPage() {
  return <ComprobadorPageClient />;
}
