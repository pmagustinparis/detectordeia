import { Metadata } from 'next';
import IdentificadorPageClient from './IdentificadorPageClient';

export const metadata: Metadata = {
  title: 'Identificador de IA Gratis en Español | Identifica Textos de IA',
  description: 'Identificador de IA online gratuito en español. Identifica si un texto fue escrito por ChatGPT, Claude o Gemini. Herramienta precisa, privada y sin registro. Resultados instantáneos.',
  alternates: {
    canonical: 'https://detectordeia.ai/identificador-de-ia',
  },
  openGraph: {
    title: 'Identificador de IA Gratis en Español | DetectordeIA.ai',
    description: 'Identifica textos generados por IA con nuestro identificador online gratuito. Preciso y fácil de usar.',
    url: 'https://detectordeia.ai/identificador-de-ia',
    siteName: 'DetectordeIA.ai',
    images: [
      {
        url: 'https://detectordeia.ai/logo.png',
        width: 800,
        height: 600,
        alt: 'Identificador de IA - DetectordeIA.ai',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Identificador de IA Gratis en Español | DetectordeIA.ai',
    description: 'Identifica si un texto fue escrito por IA. Gratis, preciso y privado.',
    images: ['https://detectordeia.ai/logo.png'],
  },
};

export default function IdentificadorPage() {
  return <IdentificadorPageClient />;
}
