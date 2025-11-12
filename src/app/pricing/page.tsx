import { Metadata } from 'next';
import PricingPageClient from './PricingPageClient'; // Importamos el componente cliente

export const metadata: Metadata = {
  title: 'Planes y Precios | Detector de IA - DetectordeIA.ai',
  description: 'Elige el plan perfecto para ti. Plan Free gratis, Plan Pro desde $10/mes con usos ilimitados y 5 modos premium, o Plan Team personalizado para equipos. Detector, Humanizador y Parafraseador de IA en español.',
  alternates: {
    canonical: 'https://detectordeia.ai/pricing',
  },
  openGraph: {
    title: 'Planes y Precios | Detector de IA - DetectordeIA.ai',
    description: 'Plan Free gratis, Plan Pro $10/mes con usos ilimitados, Plan Team personalizado. Detector, Humanizador y Parafraseador de IA en español.',
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
    description: 'Plan Free gratis, Plan Pro $10/mes, Plan Team personalizado. Herramientas de IA en español.',
    images: ['https://detectordeia.ai/logo.png'],
  },
};

export default function PricingPage() {
  return <PricingPageClient />;
} 