import { Metadata } from 'next';
import universities from '@/data/universities.json';
import UniversityPageClient from './UniversityPageClient';
import { notFound } from 'next/navigation';

// Generar páginas estáticas para todas las universidades
export async function generateStaticParams() {
  return universities.map((uni) => ({
    slug: uni.slug,
  }));
}

// Metadata dinámica por universidad
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const university = universities.find((uni) => uni.slug === params.slug);

  if (!university) {
    return {
      title: 'Universidad no encontrada',
    };
  }

  const title = `Detector de IA para ${university.name} | DetectordeIA.ai`;
  const description = `Detector de IA especializado para estudiantes y profesores de ${university.name} (${university.shortName}). Herramienta gratuita, precisa y optimizada para trabajos académicos de ${university.city}, ${university.country}.`;

  return {
    title,
    description,
    keywords: [
      `detector ia ${university.name}`,
      `detector ia ${university.shortName}`,
      `detector chatgpt ${university.name}`,
      `${university.shortName} detector`,
      ...university.keywords,
    ],
    alternates: {
      canonical: `https://detectordeia.ai/detector-de-ia-universidad/${university.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://detectordeia.ai/detector-de-ia-universidad/${university.slug}`,
      siteName: 'DetectordeIA.ai',
      images: [
        {
          url: 'https://detectordeia.ai/logo.png',
          width: 800,
          height: 600,
          alt: `Detector de IA - ${university.name}`,
        },
      ],
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://detectordeia.ai/logo.png'],
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

export default function UniversityPage({ params }: { params: { slug: string } }) {
  const university = universities.find((uni) => uni.slug === params.slug);

  if (!university) {
    notFound();
  }

  return <UniversityPageClient university={university} />;
}
