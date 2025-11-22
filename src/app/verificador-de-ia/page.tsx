import { Metadata } from 'next';
import VerificadorPageClient from './VerificadorPageClient';

export const metadata: Metadata = {
  title: 'Verificador de IA Online Gratis | Verifica Textos de IA',
  description: 'Verificador de IA gratuito en español. Verifica si un texto fue escrito por inteligencia artificial. Herramienta precisa para verificar contenido de ChatGPT, Claude y más. Sin registro.',
  alternates: {
    canonical: 'https://detectordeia.ai/verificador-de-ia',
  },
  openGraph: {
    title: 'Verificador de IA Online Gratis | DetectordeIA.ai',
    description: 'Verifica textos generados por IA con nuestro verificador online gratuito. Preciso y privado.',
    url: 'https://detectordeia.ai/verificador-de-ia',
    siteName: 'DetectordeIA.ai',
    images: [
      {
        url: 'https://detectordeia.ai/logo.png',
        width: 800,
        height: 600,
        alt: 'Verificador de IA - DetectordeIA.ai',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verificador de IA Online Gratis | DetectordeIA.ai',
    description: 'Verifica si un texto fue escrito por IA. Gratis, preciso y privado.',
    images: ['https://detectordeia.ai/logo.png'],
  },
};

export default function VerificadorPage() {
  return <VerificadorPageClient />;
}
