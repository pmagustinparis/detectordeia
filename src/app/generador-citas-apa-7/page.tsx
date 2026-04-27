import type { Metadata } from 'next';
import CitadorClient from '../generador-de-citas/CitadorClient';

export const metadata: Metadata = {
  title: 'Generador de Citas APA 7 Gratis | APA 7ª Edición Automático',
  description: 'Generador de citas APA 7ª edición automático y gratuito. Buscá por DOI, ISBN o URL. Sin registro. Cumple con todas las normas APA 7 actualizadas.',
  keywords: ['generador de citas apa 7', 'generador citas apa 7ma edicion', 'citas apa 7 gratis', 'normas apa 7', 'generador apa 7', 'citar en apa 7', 'como citar en apa 7'],
  alternates: { canonical: 'https://detectordeia.ai/generador-citas-apa-7' },
  openGraph: {
    title: 'Generador de Citas APA 7ª Edición — Gratis y Automático',
    description: 'Citas APA 7 al instante. DOI, ISBN o URL. Gratis, sin registro, en español.',
    url: 'https://detectordeia.ai/generador-citas-apa-7',
  },
};

export default function Page() {
  return (
    <CitadorClient
      defaultStyle="apa7"
      defaultSourceType="article"
      h1="Generador de Citas APA 7ª Edición"
      subtitle="Generá citas con las normas APA 7ª edición actualizadas. Completá los datos o pegá el DOI para autocompletar."
      extraFaqs={[
        {
          q: '¿Qué cambió en APA 7ª edición respecto a APA 6?',
          a: 'Los principales cambios de APA 7ª edición incluyen: hasta 20 autores listados (antes eran 7), se eliminó el lugar de publicación de libros, los doi siempre van como URL (https://doi.org/...), se permite usar "ellos" como pronombre neutral, y hay nuevas categorías de fuentes como redes sociales y podcasts.',
        },
        {
          q: '¿Cómo citar un artículo con DOI en APA 7?',
          a: 'Formato APA 7 con DOI: Apellido, N. N., & Apellido2, N. N. (Año). Título del artículo. Nombre de la Revista, volumen(número), páginas. https://doi.org/xxxxx. Pegá el DOI en nuestro generador para armar la cita automáticamente.',
        },
        {
          q: '¿Cómo se cita un libro en APA 7ª edición?',
          a: 'En APA 7: Apellido, N. N. (Año). Título del libro en cursiva. Editorial. No se incluye ciudad de publicación en APA 7 (sí en APA 6). Seleccioná "Libro" en el generador e ingresá el ISBN o los datos manualmente.',
        },
      ]}
    />
  );
}
