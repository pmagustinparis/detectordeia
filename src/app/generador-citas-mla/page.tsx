import type { Metadata } from 'next';
import CitadorClient from '../generador-de-citas/CitadorClient';

export const metadata: Metadata = {
  title: 'Generador de Citas MLA Gratis | Formato MLA 9ª Edición en Español',
  description: 'Generá citas en formato MLA 9ª edición automáticamente. Generador de referencias MLA gratis, sin registro, en español. Ideal para humanidades y literatura.',
  keywords: ['generador citas mla', 'citas mla gratis', 'formato mla', 'referencias mla', 'citar en mla', 'generador mla', 'normas mla'],
  alternates: { canonical: 'https://detectordeia.ai/generador-citas-mla' },
  openGraph: {
    title: 'Generador de Citas MLA — Gratis y Automático en Español',
    description: 'Citas en formato MLA 9 al instante. DOI, ISBN o URL. Gratis, sin registro.',
    url: 'https://detectordeia.ai/generador-citas-mla',
  },
};

export default function Page() {
  return (
    <CitadorClient
      defaultStyle="mla9"
      defaultSourceType="article"
      h1="Generador de Citas MLA"
      subtitle="Generá referencias en formato MLA 9ª edición para trabajos de humanidades, literatura e idiomas. Automático y gratuito."
      extraFaqs={[
        {
          q: '¿Qué es el formato MLA?',
          a: 'MLA (Modern Language Association) es un estilo de citación usado principalmente en humanidades, literatura, lingüística e idiomas. La 9ª edición es la versión actual. Se caracteriza por citar el número de página entre paréntesis en el texto y usar "Works Cited" (Obras citadas) al final.',
        },
        {
          q: '¿Cómo se hace una cita en MLA?',
          a: 'Una cita de artículo en MLA 9: Apellido, Nombre. "Título del artículo." Nombre de la Revista, vol. X, no. X, Año, pp. X–X. DOI o URL. El título del artículo va entre comillas y el nombre de la revista en cursiva.',
        },
        {
          q: '¿Cuándo usar MLA en vez de APA?',
          a: 'Usá MLA para trabajos de literatura, idiomas, filosofía, arte y estudios culturales. Usá APA para psicología, educación, ciencias sociales y trabajo social. Si no estás seguro, consultá con tu profesor o las guías de tu institución.',
        },
      ]}
    />
  );
}
