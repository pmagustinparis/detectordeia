import { Metadata } from 'next';
import PricingPageClient from './PricingPageClient'; // Importamos el componente cliente

export const metadata: Metadata = {
  title: 'Planes y Precios | Detector de IA - DetectordeIA.ai',
  description: 'Descubre los planes premium de DetectordeIA.ai. Elige entre Starter y Pro para acceder a análisis avanzados, subida de archivos, reportes detallados y más. Optimizado para el mercado hispanohablante.',
  alternates: {
    canonical: 'https://detectordeia.ai/pricing',
  },
  openGraph: {
    title: 'Planes y Precios | Detector de IA - DetectordeIA.ai',
    description: 'Elige el plan premium que mejor se adapta a tus necesidades de detección de IA.',
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
    description: 'Elige el plan premium que mejor se adapta a tus necesidades de detección de IA.',
    images: ['https://detectordeia.ai/logo.png'],
  },
};

export default function PricingPage() {
  return <PricingPageClient />;
} 