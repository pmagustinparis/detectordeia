import { Metadata } from 'next';
import universities from '@/data/universities.json';
import CitadorUniversityPageClient from './CitadorUniversityPageClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return universities.map((uni) => ({
    slug: uni.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const university = universities.find((uni) => uni.slug === slug);

  if (!university) {
    return { title: 'Universidad no encontrada' };
  }

  const title = `Generador de Citas para ${university.name} | APA, MLA, Chicago`;
  const description = `Generador de citas bibliográficas gratuito para estudiantes de ${university.name} (${university.shortName}). Crea referencias en APA 7ª, MLA 9 y Chicago al instante. Sin registro, sin límites, optimizado para trabajos académicos de ${university.city}.`;

  return {
    title,
    description,
    keywords: [
      `citas bibliograficas ${university.name}`,
      `citas apa ${university.shortName}`,
      `generador citas ${university.shortName}`,
      `referencias bibliograficas ${university.name}`,
      `como citar ${university.shortName}`,
      `citas mla ${university.shortName}`,
      `normas apa ${university.country}`,
      `bibliografia ${university.shortName}`,
      ...university.keywords,
    ],
    alternates: {
      canonical: `https://detectordeia.ai/citador-universidad/${university.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://detectordeia.ai/citador-universidad/${university.slug}`,
      siteName: 'DetectordeIA.ai',
      images: [
        {
          url: 'https://detectordeia.ai/og-citador.png',
          width: 1200,
          height: 630,
          alt: `Generador de Citas - ${university.name}`,
        },
      ],
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://detectordeia.ai/og-citador.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export default async function CitadorUniversityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const university = universities.find((uni) => uni.slug === slug);

  if (!university) notFound();

  return <CitadorUniversityPageClient university={university} />;
}
