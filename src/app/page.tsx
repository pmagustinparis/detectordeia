import { Metadata } from 'next';
import HomePageClient from './HomePageClient'; // Importamos el componente cliente

export const metadata: Metadata = {
  title: 'Detector de IA, Humanizador y Parafraseador | Gratis en Español',
  description: 'Detector de IA, Humanizador y Parafraseador en español. Herramientas gratuitas, precisas y fáciles de usar para trabajar con contenido de inteligencia artificial. Sin registro, 100% privado.',
  alternates: {
    canonical: 'https://detectordeia.ai/',
  },
  openGraph: {
    title: 'Detector de IA, Humanizador y Parafraseador | Gratis en Español',
    description: 'Herramientas de IA en español: Detector, Humanizador y Parafraseador. Gratuitas, precisas y sin registro.',
    url: 'https://detectordeia.ai/',
    siteName: 'DetectordeIA.ai',
    images: [
      {
        url: 'https://detectordeia.ai/logo.png',
        width: 800,
        height: 600,
        alt: 'DetectordeIA.ai - Herramientas de IA en Español',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Detector de IA, Humanizador y Parafraseador | Gratis en Español',
    description: 'Herramientas de IA en español: gratuitas, precisas y fáciles de usar. Pruébalas ahora.',
    images: ['https://detectordeia.ai/logo.png'],
  },
};

export default function Home() {
  return <HomePageClient />;
}
