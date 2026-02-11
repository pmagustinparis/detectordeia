import { Metadata } from 'next';
import DetectorMain from '../components/DetectorMain';
import ExpressPromoBanner from '../components/ExpressPromoBanner';
import ToolSwitcher from '../components/ToolSwitcher';

export const metadata: Metadata = {
  title: 'Detector de IA para Colombia – DetectordeIA.ai',
  description: 'Detecta si un texto fue escrito por inteligencia artificial en español de Colombia. Herramienta gratuita, precisa y optimizada para Colombia. Sin registro, ideal para estudiantes, docentes y empresas colombianas.',
  alternates: {
    canonical: 'https://detectordeia.ai/co',
  },
  openGraph: {
    title: 'Detector de IA para Colombia – DetectordeIA.ai',
    description: 'Herramienta gratuita para detectar IA en textos, optimizada para español de Colombia.',
    url: 'https://detectordeia.ai/co',
    siteName: 'DetectordeIA.ai',
    images: [
      {
        url: 'https://detectordeia.ai/logo.png',
        width: 800,
        height: 600,
        alt: 'Detector de IA Colombia - DetectordeIA.ai',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Detector de IA para Colombia – DetectordeIA.ai',
    description: 'Herramienta gratuita para detectar IA en textos, optimizada para español de Colombia.',
    images: ['https://detectordeia.ai/logo.png'],
  },
};

export default function DetectorColombia() {
  return (
    <div className="min-h-screen bg-gray-100 pb-10 px-2">
      <ExpressPromoBanner />
      <ToolSwitcher />
      <DetectorMain 
        h1="Detector de IA para Colombia"
        subtitle="Detecta si un texto fue escrito por inteligencia artificial con precisión líder en Colombia. Herramienta gratuita, sin registro, optimizada para español de Colombia. Ideal para estudiantes, docentes y empresas colombianas."
      />
      <div className="mt-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-[#a259f7] mb-2">Preguntas frecuentes sobre IA en Colombia</h2>
        <div className="bg-[#f5f3ff] rounded-xl p-4 text-gray-800 text-sm">
          <strong>¿Funciona con textos académicos y legales de Colombia?</strong>
          <p>Sí, el detector está optimizado para el español de Colombia y es ideal para analizar textos académicos, legales y profesionales.</p>
        </div>
      </div>
    </div>
  );
} 