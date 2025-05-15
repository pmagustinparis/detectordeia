import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Detector de IA en Chile | Detecta textos generados por IA en español',
  description: 'Herramienta gratuita para detectar si un texto fue generado por IA en Chile. Analiza textos en español con alta precisión. Sin registro, 100% privado.',
  openGraph: {
    title: 'Detector de IA en Chile | Detecta textos generados por IA en español',
    description: 'Herramienta gratuita para detectar si un texto fue generado por IA en Chile. Analiza textos en español con alta precisión. Sin registro, 100% privado.',
    locale: 'es_CL',
    type: 'website',
    images: ['https://detectordeia.ai/logo.png'],
  },
  alternates: {
    canonical: 'https://detectordeia.ai/chile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Detector de IA en Chile | Detecta textos generados por IA en español',
    description: 'Herramienta gratuita para detectar si un texto fue generado por IA en Chile. Analiza textos en español con alta precisión. Sin registro, 100% privado.',
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