import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Detector de IA en Colombia | Detecta textos generados por IA en español',
  description: 'Herramienta gratuita para detectar si un texto fue generado por IA en Colombia. Analiza textos en español con alta precisión. Sin registro, 100% privado.',
  openGraph: {
    title: 'Detector de IA en Colombia | Detecta textos generados por IA en español',
    description: 'Herramienta gratuita para detectar si un texto fue generado por IA en Colombia. Analiza textos en español con alta precisión. Sin registro, 100% privado.',
    locale: 'es_CO',
    type: 'website',
    images: ['https://detectordeia.ai/logo.png'],
  },
  alternates: {
    canonical: 'https://detectordeia.ai/colombia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Detector de IA en Colombia | Detecta textos generados por IA en español',
    description: 'Herramienta gratuita para detectar si un texto fue generado por IA en Colombia. Analiza textos en español con alta precisión. Sin registro, 100% privado.',
    site: '@detectordeia',
    creator: '@detectordeia',
    images: ['https://detectordeia.ai/logo.png'],
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 