import { Metadata } from 'next';
import universities from '@/data/universities.json';
import HumanizadorUniversityPageClient from './HumanizadorUniversityPageClient';
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
    return {
      title: 'Universidad no encontrada',
    };
  }

  const title = `Humanizador de IA para ${university.name} | DetectordeIA.ai`;
  const description = `Humanizador de IA especializado para estudiantes de ${university.name} (${university.shortName}). Convierte textos de IA en contenido natural y original. Gratis, sin registro, optimizado para trabajos académicos de ${university.city}, ${university.country}.`;

  return {
    title,
    description,
    keywords: [
      `humanizador ia ${university.name}`,
      `humanizador ia ${university.shortName}`,
      `humanizar texto ${university.name}`,
      `humanizar chatgpt ${university.shortName}`,
      `${university.shortName} humanizador`,
      `humanizar texto ia ${university.country}`,
      ...university.keywords,
    ],
    alternates: {
      canonical: `https://detectordeia.ai/humanizador-universidad/${university.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://detectordeia.ai/humanizador-universidad/${university.slug}`,
      siteName: 'DetectordeIA.ai',
      images: [
        {
          url: 'https://detectordeia.ai/og-humanizador.png',
          width: 1200,
          height: 630,
          alt: `Humanizador de IA - ${university.name}`,
        },
      ],
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://detectordeia.ai/og-humanizador.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function HumanizadorUniversityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const university = universities.find((uni) => uni.slug === slug);

  if (!university) {
    notFound();
  }

  return <HumanizadorUniversityPageClient university={university} />;
}
