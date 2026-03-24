import { Metadata } from 'next';
import { humanizerComparisons } from '@/lib/pseo/humanizer-comparisons';
import HumanizadorComparisonPageClient from './HumanizadorComparisonPageClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return humanizerComparisons.map((comp) => ({
    slug: comp.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const comparison = humanizerComparisons.find((c) => c.slug === slug);

  if (!comparison) {
    return { title: 'Comparativa no encontrada' };
  }

  return {
    title: comparison.title,
    description: comparison.description,
    keywords: comparison.keywords,
    alternates: {
      canonical: `https://detectordeia.ai/humanizador-vs/${comparison.slug}`,
    },
    openGraph: {
      title: comparison.title,
      description: comparison.description,
      url: `https://detectordeia.ai/humanizador-vs/${comparison.slug}`,
      siteName: 'DetectordeIA.ai',
      images: [
        {
          url: 'https://detectordeia.ai/og-humanizador.png',
          width: 1200,
          height: 630,
          alt: comparison.h1,
        },
      ],
      locale: 'es_ES',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: comparison.title,
      description: comparison.description,
      images: ['https://detectordeia.ai/og-humanizador.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function HumanizadorComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comparison = humanizerComparisons.find((c) => c.slug === slug);

  if (!comparison) {
    notFound();
  }

  return <HumanizadorComparisonPageClient comparison={comparison} />;
}
