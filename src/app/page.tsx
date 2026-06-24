import { Metadata } from 'next';
import HomePageClient from './HomePageClient';
import { getUserStatus } from '@/lib/user/getUserStatus';

export const metadata: Metadata = {
  title: 'Detector de IA, Humanizador, Parafraseador y Citador | Gratis en Español',
  description: 'Detector de IA (identificador de textos de IA), Humanizador, Parafraseador y Generador de citas en español. Identifica si un texto fue escrito por ChatGPT, Claude o Gemini. Gratis, sin registro, 100% privado.',
  keywords: ['detector de ia', 'identificador de ia', 'identificar texto de ia', 'identificador de textos ia', 'detector de chatgpt', 'humanizador de ia', 'parafraseador', 'citador apa'],
  alternates: {
    canonical: 'https://detectordeia.ai/',
    languages: {
      'es-ES': 'https://detectordeia.ai/es',
      'es-MX': 'https://detectordeia.ai/mx',
      'es-CO': 'https://detectordeia.ai/co',
      'es-AR': 'https://detectordeia.ai/ar',
      'es-CL': 'https://detectordeia.ai/cl',
      'es-PE': 'https://detectordeia.ai/pe',
      'x-default': 'https://detectordeia.ai/',
    },
  },
  openGraph: {
    title: 'Detector de IA, Humanizador, Parafraseador y Citador | Gratis en Español',
    description: 'Herramientas de IA en español: Detector, Humanizador, Parafraseador y Citador. Gratuitas, precisas y sin registro.',
    url: 'https://detectordeia.ai/',
    siteName: 'DetectordeIA.ai',
    images: [
      {
        url: 'https://detectordeia.ai/og-default.png',
        width: 1200,
        height: 630,
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
    images: ['https://detectordeia.ai/og-default.png'],
  },
};

export default async function Home() {
  const initialUserStatus = await getUserStatus();
  return <HomePageClient initialUserStatus={initialUserStatus} />;
}
