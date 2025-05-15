import { Metadata } from 'next';
import DetectorMain from '../components/DetectorMain';

export const metadata: Metadata = {
  title: 'Detector de IA para Perú – DetectordeIA.ai',
  description: 'Detecta si un texto fue escrito por inteligencia artificial en español de Perú. Herramienta gratuita, precisa y optimizada para Perú. Sin registro, ideal para estudiantes, docentes y empresas.',
  alternates: {
    canonical: 'https://detectordeia.ai/pe',
  },
  openGraph: {
    title: 'Detector de IA para Perú – DetectordeIA.ai',
    description: 'Herramienta gratuita para detectar IA en textos, optimizada para español de Perú.',
    url: 'https://detectordeia.ai/pe',
    siteName: 'DetectordeIA.ai',
    images: [
      {
        url: 'https://detectordeia.ai/logo.png',
        width: 800,
        height: 600,
        alt: 'Detector de IA Perú - DetectordeIA.ai',
      },
    ],
    locale: 'es_PE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Detector de IA para Perú – DetectordeIA.ai',
    description: 'Herramienta gratuita para detectar IA en textos, optimizada para español de Perú.',
    images: ['https://detectordeia.ai/logo.png'],
  },
};

export default function DetectorPeru() {
  return (
    <div className="min-h-screen bg-gray-100 pb-10 px-2">
      <DetectorMain 
        h1="Detector de IA para Perú"
        subtitle="Detecta si un texto fue escrito por inteligencia artificial con precisión líder en Perú. Herramienta gratuita, sin registro, optimizada para español de Perú. Ideal para estudiantes, docentes y empresas peruanas."
      />
      <div className="mt-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-[#a259f7] mb-2">Preguntas frecuentes sobre IA en Perú</h2>
        <div className="bg-[#f5f3ff] rounded-xl p-4 text-gray-800 text-sm">
          <strong>¿Funciona con textos académicos y legales de Perú?</strong>
          <p>Sí, el detector está optimizado para el español de Perú y es ideal para analizar textos académicos, legales y profesionales.</p>
        </div>
      </div>
    </div>
  );
} 