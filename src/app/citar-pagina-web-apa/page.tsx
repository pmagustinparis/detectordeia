import type { Metadata } from 'next';
import CitadorClient from '../generador-de-citas/CitadorClient';

export const metadata: Metadata = {
  title: 'Citar Página Web en APA | Generador de Citas Web APA Gratis',
  description: 'Generá citas de páginas web en formato APA automáticamente. Pegá la URL y obtenés la referencia lista. Citar sitio web en APA 7ª edición, gratis y sin registro.',
  keywords: ['citar pagina web apa', 'como citar en apa una pagina web', 'citar sitio web apa', 'referencias apa paginas web', 'citar en apa paginas web', 'como citar una pagina web en apa 7'],
  alternates: { canonical: 'https://detectordeia.ai/citar-pagina-web-apa' },
  openGraph: {
    title: 'Citar Página Web en APA — Automático y Gratis',
    description: 'Pegá la URL y generamos la cita APA al instante. Sin registro.',
    url: 'https://detectordeia.ai/citar-pagina-web-apa',
  },
};

export default function Page() {
  return (
    <CitadorClient
      defaultStyle="apa7"
      defaultSourceType="website"
      h1="Citar Página Web en APA"
      subtitle="Pegá la URL del sitio web y generamos la referencia APA 7ª edición automáticamente, con título, autor y fecha extraídos al instante."
      extraFaqs={[
        {
          q: '¿Cómo se cita una página web en APA 7?',
          a: 'Formato APA 7 para web: Apellido, N. (Año, Mes Día). Título de la página en cursiva. Nombre del sitio. URL. Si no hay autor identificado, el título va en lugar del autor. Si la fecha es desconocida, se usa "s.f." (sin fecha).',
        },
        {
          q: '¿Qué pongo si no hay autor en la página web?',
          a: 'Si no hay autor, el título de la página ocupa el primer lugar de la referencia. Si hay una organización responsable, podés usarla como autor institucional. En nuestro generador, dejá el campo "Apellido" en blanco y el título irá primero automáticamente.',
        },
        {
          q: '¿Debo incluir la fecha de acceso en las citas web APA?',
          a: 'En APA 7, la fecha de acceso solo se incluye cuando el contenido puede cambiar con el tiempo (como wikis o páginas que se actualizan frecuentemente). Para artículos de noticias o páginas estables, no es obligatoria, pero nuestro generador la incluye para mayor completitud.',
        },
        {
          q: '¿Cómo citar una página web sin fecha en APA?',
          a: 'Si la página no tiene fecha de publicación visible, usá "s.f." (sin fecha) en lugar del año: Apellido, N. (s.f.). Título de la página. Nombre del sitio. URL. En nuestro generador, dejá el campo "Año" vacío.',
        },
      ]}
    />
  );
}
