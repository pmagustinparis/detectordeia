import { Metadata } from 'next';
import HomePageClient from './HomePageClient'; // Importamos el componente cliente

export const metadata: Metadata = {
  title: 'El Mejor Detector de IA en Español Gratis | DetectordeIA.ai',
  description: 'Descubre por qué DetectordeIA.ai es considerado el mejor detector de IA en español. Herramienta gratuita, precisa y fácil de usar para analizar textos y identificar contenido generado por inteligencia artificial. Sin registro, 100% privado.',
  alternates: {
    canonical: 'https://detectordeia.ai/',
  },
  openGraph: {
    title: 'El Mejor Detector de IA en Español Gratis | DetectordeIA.ai',
    description: 'Descubre por qué DetectordeIA.ai es el mejor detector de IA en español. Herramienta gratuita y precisa.',
    url: 'https://detectordeia.ai/',
    siteName: 'DetectordeIA.ai',
    images: [
      {
        url: 'https://detectordeia.ai/logo.png',
        width: 800,
        height: 600,
        alt: 'Logo DetectordeIA.ai - El Mejor Detector de IA en Español',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El Mejor Detector de IA en Español Gratis | DetectordeIA.ai',
    description: 'El mejor detector de IA en español: gratuito, preciso y fácil de usar. Pruébalo ahora.',
    images: ['https://detectordeia.ai/logo.png'],
  },
};

export default function Home() {
  return <HomePageClient />;
}
