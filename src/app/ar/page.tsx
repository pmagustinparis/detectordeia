import { Metadata } from 'next';
import DetectorMain from '../components/DetectorMain';
import HumanizadorPromoBanner from '../components/HumanizadorPromoBanner';

export const metadata: Metadata = {
  title: 'Detector de IA para Argentina – DetectordeIA.ai',
  description: 'Detecta si un texto fue escrito por inteligencia artificial en español de Argentina. Herramienta gratuita, precisa y optimizada para Argentina. Sin registro, ideal para estudiantes, docentes y empresas.',
  alternates: {
    canonical: 'https://detectordeia.ai/ar',
  },
  openGraph: {
    title: 'Detector de IA para Argentina – DetectordeIA.ai',
    description: 'Herramienta gratuita para detectar IA en textos, optimizada para español de Argentina.',
    url: 'https://detectordeia.ai/ar',
    siteName: 'DetectordeIA.ai',
    images: [
      {
        url: 'https://detectordeia.ai/logo.png',
        width: 800,
        height: 600,
        alt: 'Detector de IA Argentina - DetectordeIA.ai',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Detector de IA para Argentina – DetectordeIA.ai',
    description: 'Herramienta gratuita para detectar IA en textos, optimizada para español de Argentina.',
    images: ['https://detectordeia.ai/logo.png'],
  },
};

export default function DetectorArgentina() {
  return (
    <div className="min-h-screen bg-gray-100 pb-10 px-2">
      <HumanizadorPromoBanner />
      <DetectorMain 
        h1="Detector de IA para Argentina"
        subtitle="Detecta si un texto fue escrito por inteligencia artificial con precisión líder en Argentina. Herramienta gratuita, sin registro, optimizada para español de Argentina. Ideal para estudiantes, docentes y empresas argentinas."
      />
      <div className="mt-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-[#a259f7] mb-2">Preguntas frecuentes sobre IA en Argentina</h2>
        <div className="bg-[#f5f3ff] rounded-xl p-4 text-gray-800 text-sm">
          <strong>¿Funciona con textos académicos y legales de Argentina?</strong>
          <p>Sí, el detector está optimizado para el español de Argentina y es ideal para analizar textos académicos, legales y profesionales.</p>
        </div>
      </div>
    </div>
  );
} 