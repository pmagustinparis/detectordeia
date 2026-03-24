import { Metadata } from 'next';
import universities from '@/data/universities.json';
import ParafraseadorUniversityPageClient from './ParafraseadorUniversityPageClient';
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

  const title = `Parafraseador para ${university.name} | DetectordeIA.ai`;
  const description = `Parafraseador online especializado para estudiantes de ${university.name} (${university.shortName}). Reescribe textos académicos manteniendo el significado. Gratis, sin registro, optimizado para trabajos de ${university.city}, ${university.country}.`;

  return {
    title,
    description,
    keywords: [
      `parafraseador ${university.name}`,
      `parafraseador ${university.shortName}`,
      `parafrasear texto ${university.name}`,
      `parafrasear ${university.shortName}`,
      `${university.shortName} parafrasear`,
      `reescribir texto ${university.country}`,
      ...university.keywords,
    ],
    alternates: {
      canonical: `https://detectordeia.ai/parafraseador-universidad/${university.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://detectordeia.ai/parafraseador-universidad/${university.slug}`,
      siteName: 'DetectordeIA.ai',
      images: [
        {
          url: 'https://detectordeia.ai/og-parafraseador.png',
          width: 1200,
          height: 630,
          alt: `Parafraseador - ${university.name}`,
        },
      ],
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://detectordeia.ai/og-parafraseador.png'],
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

export default async function ParafraseadorUniversityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const university = universities.find((uni) => uni.slug === slug);

  if (!university) {
    notFound();
  }

  return <ParafraseadorUniversityPageClient university={university} />;
}
