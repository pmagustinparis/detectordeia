import type { Metadata } from 'next';
import CitadorClient from '../generador-de-citas/CitadorClient';

export const metadata: Metadata = {
  title: 'Generador de Citas Chicago Gratis | Estilo Chicago en Español',
  description: 'Generá citas en estilo Chicago (Author-Date) automáticamente. Generador de referencias Chicago gratis, sin registro. Ideal para historia y ciencias sociales.',
  keywords: ['generador citas chicago', 'citas chicago gratis', 'estilo chicago', 'referencias chicago', 'citar en chicago', 'normas chicago', 'formato chicago'],
  alternates: { canonical: 'https://detectordeia.ai/generador-citas-chicago' },
  openGraph: {
    title: 'Generador de Citas Chicago — Gratis y Automático en Español',
    description: 'Citas en estilo Chicago al instante. DOI, ISBN o URL. Gratis, sin registro.',
    url: 'https://detectordeia.ai/generador-citas-chicago',
  },
};

export default function Page() {
  return (
    <CitadorClient
      defaultStyle="chicago"
      defaultSourceType="article"
      h1="Generador de Citas Chicago"
      subtitle="Generá referencias en estilo Chicago (Author-Date) para trabajos de historia, arte y ciencias sociales. Automático y gratuito."
      extraFaqs={[
        {
          q: '¿Qué es el estilo Chicago?',
          a: 'El estilo Chicago es un sistema de citación publicado por la University of Chicago Press. Tiene dos variantes: Notes-Bibliography (notas al pie, usado en humanidades) y Author-Date (similar a APA, usado en ciencias sociales e historia). Nuestro generador usa Author-Date.',
        },
        {
          q: '¿Cómo se hace una cita en Chicago Author-Date?',
          a: 'Una cita de artículo en Chicago Author-Date: Apellido, Nombre. Año. "Título del artículo." Nombre de la Revista Volumen (Número): Páginas. DOI. En el texto se cita como (Apellido Año, página).',
        },
        {
          q: '¿Cuándo usar estilo Chicago?',
          a: 'Chicago es el estándar en historia, estudios clásicos, artes y algunas ciencias sociales. Es común en publicaciones académicas de EE.UU. Si tu institución no especifica un estilo, verificá con tu profesor. Para educación y psicología, APA suele ser más apropiado.',
        },
      ]}
    />
  );
}
