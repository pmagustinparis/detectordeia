import type { Metadata } from 'next';
import CitadorClient from '../generador-de-citas/CitadorClient';

export const metadata: Metadata = {
  title: 'Generador de Citas Bibliográficas Gratis | APA, MLA, Chicago',
  description: 'Generá citas bibliográficas en APA, MLA y Chicago automáticamente. Sin registro. Generador gratuito de referencias para trabajos académicos en español.',
  keywords: ['citas bibliograficas', 'generador citas bibliograficas', 'referencias bibliograficas', 'citas bibliograficas gratis', 'hacer citas bibliograficas', 'como hacer citas bibliograficas'],
  alternates: { canonical: 'https://detectordeia.ai/citas-bibliograficas' },
  openGraph: {
    title: 'Generador de Citas Bibliográficas — APA, MLA, Chicago',
    description: 'Generá referencias bibliográficas al instante. DOI, ISBN o URL. Gratis, sin registro, en español.',
    url: 'https://detectordeia.ai/citas-bibliograficas',
  },
};

export default function Page() {
  return (
    <CitadorClient
      defaultStyle="apa7"
      defaultSourceType="article"
      h1="Generador de Citas Bibliográficas"
      subtitle="Generá referencias bibliográficas en APA, MLA o Chicago en segundos. Ingresá el DOI, ISBN o URL para completar los datos automáticamente."
      extraFaqs={[
        {
          q: '¿Qué son las citas bibliográficas?',
          a: 'Las citas bibliográficas son referencias formales a las fuentes utilizadas en un trabajo académico. Permiten identificar de dónde proviene la información, evitar el plagio y dar crédito a los autores originales. Se incluyen al final del trabajo en una lista de referencias o bibliografía.',
        },
        {
          q: '¿Cuáles son los elementos de una cita bibliográfica?',
          a: 'Los elementos básicos son: autor(es), año de publicación, título de la obra, fuente (revista, editorial, sitio web), y datos de localización (volumen, páginas, DOI o URL). El orden y formato varía según el estilo (APA, MLA, Chicago).',
        },
        {
          q: '¿Qué estilo de cita debo usar?',
          a: 'Depende de tu institución y disciplina: APA se usa en psicología, educación y ciencias sociales. MLA en humanidades, literatura y lenguas. Chicago en historia, arte y algunas ciencias sociales. Si no te indicaron un estilo específico, consultá con tu docente o institución.',
        },
      ]}
    />
  );
}
