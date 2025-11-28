import { Metadata } from 'next';
import PricingPageClient from './PricingPageClient'; // Importamos el componente cliente

export const metadata: Metadata = {
  title: 'Planes y Precios | Detector de IA - DetectordeIA.ai',
  description: 'Elige el plan perfecto para ti. Plan Free gratis, Plan Express $2.99/24h para entregas urgentes, o Plan Pro $6.99/mes con usos ilimitados y 5 modos premium. Detector, Humanizador y Parafraseador de IA en español.',
  alternates: {
    canonical: 'https://detectordeia.ai/pricing',
  },
  openGraph: {
    title: 'Planes y Precios | Detector de IA - DetectordeIA.ai',
    description: 'Plan Free gratis, Plan Express $2.99/24h, Plan Pro $6.99/mes con usos ilimitados. Detector, Humanizador y Parafraseador de IA en español.',
    url: 'https://detectordeia.ai/pricing',
    siteName: 'DetectordeIA.ai',
    images: [
      {
        url: 'https://detectordeia.ai/logo.png',
        width: 800,
        height: 600,
        alt: 'Planes DetectordeIA.ai',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Planes y Precios | Detector de IA - DetectordeIA.ai',
    description: 'Plan Free gratis, Express $2.99/24h, Pro $6.99/mes. Herramientas de IA en español.',
    images: ['https://detectordeia.ai/logo.png'],
  },
};

export default function PricingPage() {
  return <PricingPageClient />;
} 