import type { Metadata } from 'next';
import CitadorClient from '../generador-de-citas/CitadorClient';

export const metadata: Metadata = {
  title: 'Generador de Citas APA Gratis | Citas APA 7ª Edición en Español',
  description: 'Generá citas en formato APA automáticamente. Buscá por DOI, ISBN o URL. Generador de referencias APA 7ª edición gratis, sin registro, en español.',
  keywords: ['generador de citas apa', 'generador de referencias apa', 'citas apa gratis', 'referencias apa generador', 'generador apa', 'citar en apa', 'generador de citas apa gratuito'],
  alternates: { canonical: 'https://detectordeia.ai/generador-citas-apa' },
  openGraph: {
    title: 'Generador de Citas APA Gratis — Automático y en Español',
    description: 'Generá referencias APA 7ª edición al instante. Buscá por DOI, ISBN o URL. Gratis, sin registro.',
    url: 'https://detectordeia.ai/generador-citas-apa',
  },
};

export default function Page() {
  return (
    <CitadorClient
      defaultStyle="apa7"
      defaultSourceType="article"
      h1="Generador de Citas APA"
      subtitle="Generá referencias en formato APA 7ª edición al instante. Ingresá el DOI, ISBN o URL y la cita se arma sola."
      extraFaqs={[
        {
          q: '¿Cómo se hace una cita en formato APA?',
          a: 'En APA 7ª edición, una cita de artículo tiene el formato: Apellido, N. N. (Año). Título del artículo. Nombre de la Revista, volumen(número), páginas. https://doi.org/xxx. Usá nuestro generador para armarla automáticamente ingresando el DOI.',
        },
        {
          q: '¿Cuál es la diferencia entre APA 6 y APA 7?',
          a: 'APA 7ª edición (2019) simplificó varios elementos: ya no se incluye el lugar de publicación de libros, se permite hasta 20 autores antes de usar puntos suspensivos, y los títulos de artículos no llevan mayúsculas excepto en la primera palabra. Nuestro generador usa APA 7ª por defecto.',
        },
        {
          q: '¿Cómo citar una página web en APA?',
          a: 'En APA 7ª: Apellido, N. (Año, Mes Día). Título de la página. Nombre del sitio. URL. Si no hay autor, el título va primero. Cambiá el tipo de fuente a "Sitio web" en nuestro generador para armarla automáticamente pegando la URL.',
        },
      ]}
    />
  );
}
