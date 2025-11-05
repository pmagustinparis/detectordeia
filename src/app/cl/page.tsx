import { Metadata } from 'next';
import DetectorMain from '../components/DetectorMain';
import HumanizadorPromoBanner from '../components/HumanizadorPromoBanner';

export const metadata: Metadata = {
  title: 'Detector de IA para Chile – DetectordeIA.ai',
  description: 'Detecta si un texto fue escrito por inteligencia artificial en español de Chile. Herramienta gratuita, precisa y optimizada para Chile. Sin registro, ideal para estudiantes, docentes y empresas chilenas.',
  alternates: {
    canonical: 'https://detectordeia.ai/cl',
  },
  openGraph: {
    title: 'Detector de IA para Chile – DetectordeIA.ai',
    description: 'Herramienta gratuita para detectar IA en textos, optimizada para español de Chile.',
    url: 'https://detectordeia.ai/cl',
    siteName: 'DetectordeIA.ai',
    images: [
      {
        url: 'https://detectordeia.ai/logo.png', // Assuming a general logo, or replace if country-specific
        width: 800,
        height: 600,
        alt: 'Detector de IA Chile - DetectordeIA.ai',
      },
    ],
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Detector de IA para Chile – DetectordeIA.ai',
    description: 'Herramienta gratuita para detectar IA en textos, optimizada para español de Chile.',
    images: ['https://detectordeia.ai/logo.png'], // Assuming a general logo
  },
};

export default function DetectorChile() {
  return (
    <div className="min-h-screen bg-gray-100 pb-10 px-2">
      <HumanizadorPromoBanner />
      <DetectorMain 
        h1="Detector de IA para Chile"
        subtitle="Detecta si un texto fue escrito por inteligencia artificial con precisión líder en Chile. Herramienta gratuita, sin registro, optimizada para español de Chile. Ideal para estudiantes, docentes y empresas chilenas."
      />
      <div className="mt-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-[#a259f7] mb-2">Preguntas frecuentes sobre IA en Chile</h2>
        <div className="bg-[#f5f3ff] rounded-xl p-4 text-gray-800 text-sm">
          <strong>¿Funciona con textos académicos y legales de Chile?</strong>
          <p>Sí, el detector está optimizado para el español de Chile y es ideal para analizar textos académicos, legales y profesionales.</p>
        </div>
      </div>
    </div>
  );
} 