import type { Metadata } from 'next';
import CitadorClient from '../generador-de-citas/CitadorClient';

export const metadata: Metadata = {
  title: 'Generador de Referencias APA | Referencias en Formato APA Gratis',
  description: 'Generá referencias bibliográficas en formato APA automáticamente. Generador de referencias APA gratis y sin registro. APA 7ª edición, MLA y Chicago.',
  keywords: ['referencias apa', 'generador de referencias apa', 'referencias en formato apa', 'referencias formato apa', 'referencias bibliograficas apa', 'formato referencias apa'],
  alternates: { canonical: 'https://detectordeia.ai/referencias-apa' },
  openGraph: {
    title: 'Generador de Referencias APA — Gratis, Sin Registro',
    description: 'Generá referencias bibliográficas APA al instante. DOI, ISBN o URL. Gratis en español.',
    url: 'https://detectordeia.ai/referencias-apa',
  },
};

export default function Page() {
  return (
    <CitadorClient
      defaultStyle="apa7"
      defaultSourceType="article"
      h1="Generador de Referencias APA"
      subtitle="Armá tu lista de referencias bibliográficas en formato APA 7ª edición. Buscá por DOI, ISBN o URL para autocompletar los datos."
      extraFaqs={[
        {
          q: '¿Cuál es la diferencia entre cita y referencia en APA?',
          a: 'En APA, una cita es la mención dentro del texto (ej: "García, 2020"), mientras que una referencia es la entrada completa al final del documento con todos los datos de la fuente. Toda cita en el texto debe tener su referencia correspondiente al final.',
        },
        {
          q: '¿Cómo se ordena una lista de referencias APA?',
          a: 'Las referencias APA se ordenan alfabéticamente por el apellido del primer autor. Si hay varias obras del mismo autor, se ordenan cronológicamente. Si hay varias del mismo autor y año, se agregan letras: (2020a), (2020b).',
        },
        {
          q: '¿Cómo hacer referencias APA de páginas web?',
          a: 'Formato: Apellido, N. (Año, Mes Día). Título de la página. Nombre del sitio. URL. Si la página se actualiza frecuentemente, incluí la fecha de recuperación. Usá la pestaña "Sitio web" en nuestro generador y pegá la URL para autocompletar.',
        },
      ]}
    />
  );
}
