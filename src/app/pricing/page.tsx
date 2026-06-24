import { Metadata } from 'next';
import PricingPageClient from './PricingPageClient'; // Importamos el componente cliente

export const metadata: Metadata = {
  title: 'Planes | Detector de IA - DetectordeIA.ai',
  description: 'Elige el plan perfecto para ti. Plan Free gratis, Express Pass $1.99/24h para entregas urgentes. Detector, Humanizador y Parafraseador de IA en español.',
  alternates: {
    canonical: 'https://detectordeia.ai/pricing',
  },
  openGraph: {
    title: 'Planes | Detector de IA - DetectordeIA.ai',
    description: 'Plan Free gratis, Express Pass $1.99/24h. Detector, Humanizador y Parafraseador de IA en español.',
    url: 'https://detectordeia.ai/pricing',
    siteName: 'DetectordeIA.ai',
    images: [
      {
        url: 'https://detectordeia.ai/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Planes DetectordeIA.ai',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Planes | Detector de IA - DetectordeIA.ai',
    description: 'Plan Free gratis, Express Pass $1.99/24h. Herramientas de IA en español.',
    images: ['https://detectordeia.ai/og-default.png'],
  },
};

export default function PricingPage() {
  return <PricingPageClient />;
} 