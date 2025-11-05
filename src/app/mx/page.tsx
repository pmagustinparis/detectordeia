import { Metadata } from 'next';
import DetectorMain from '../components/DetectorMain';
import HumanizadorPromoBanner from '../components/HumanizadorPromoBanner';

export const metadata: Metadata = {
  title: 'Detector de IA para México – DetectordeIA.ai',
  description: 'Detecta si un texto fue escrito por inteligencia artificial en español de México. Herramienta gratuita, precisa y optimizada para México. Sin registro, ideal para estudiantes, docentes y empresas.',
  alternates: {
    canonical: 'https://detectordeia.ai/mx',
  },
  openGraph: {
    title: 'Detector de IA para México – DetectordeIA.ai',
    description: 'Herramienta gratuita para detectar IA en textos, optimizada para español de México.',
    url: 'https://detectordeia.ai/mx',
    siteName: 'DetectordeIA.ai',
    images: [
      {
        url: 'https://detectordeia.ai/logo.png',
        width: 800,
        height: 600,
        alt: 'Detector de IA México - DetectordeIA.ai',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Detector de IA para México – DetectordeIA.ai',
    description: 'Herramienta gratuita para detectar IA en textos, optimizada para español de México.',
    images: ['https://detectordeia.ai/logo.png'],
  },
};

export default function DetectorMexico() {
  return (
    <div className="min-h-screen bg-gray-100 pb-10 px-2">
      <HumanizadorPromoBanner />
      <DetectorMain 
        h1="Detector de IA para México"
        subtitle="Detecta si un texto fue escrito por inteligencia artificial con precisión líder en México. Herramienta gratuita, sin registro, optimizada para español de México. Ideal para estudiantes, docentes y empresas mexicanas."
      />
      <div className="mt-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-[#a259f7] mb-2">Preguntas frecuentes sobre IA en México</h2>
        <div className="bg-[#f5f3ff] rounded-xl p-4 text-gray-800 text-sm">
          <strong>¿Funciona con textos académicos y legales de México?</strong>
          <p>Sí, el detector está optimizado para el español de México y es ideal para analizar textos académicos, legales y profesionales.</p>
        </div>
      </div>
    </div>
  );
} 