import type { Metadata } from 'next';
import CitadorClient from './CitadorClient';

export const metadata: Metadata = {
  title: 'Generador de Citas Bibliográficas Gratis | APA, MLA, Chicago en Español',
  description: 'Generá citas bibliográficas en APA 7ª, MLA 9 y Chicago gratis. Buscá por DOI, ISBN o URL. Sin registro. Generador de referencias académicas en español para estudiantes y docentes.',
  keywords: ['generador de citas', 'citas bibliográficas', 'citas APA', 'citas MLA', 'citas Chicago', 'referencias bibliográficas', 'citar fuentes', 'generador referencias APA', 'citas académicas', 'bibliografía automática'],
  alternates: {
    canonical: 'https://detectordeia.ai/generador-de-citas',
  },
  openGraph: {
    title: 'Generador de Citas Bibliográficas Gratis — APA, MLA, Chicago',
    description: 'Generá citas en APA 7ª, MLA y Chicago al instante. Buscá por DOI, ISBN o URL. Gratis, sin registro.',
    url: 'https://detectordeia.ai/generador-de-citas',
    siteName: 'DetectorDeIA',
  },
};

export default function Page() {
  return <CitadorClient />;
}
