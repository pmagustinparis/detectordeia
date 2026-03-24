import { Metadata } from 'next';
import { paraphraserComparisons } from '@/lib/pseo/paraphraser-comparisons';
import ParafraseadorComparisonPageClient from './ParafraseadorComparisonPageClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return paraphraserComparisons.map((comp) => ({
    slug: comp.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const comparison = paraphraserComparisons.find((c) => c.slug === slug);

  if (!comparison) {
    return { title: 'Comparativa no encontrada' };
  }

  return {
    title: comparison.title,
    description: comparison.description,
    keywords: comparison.keywords,
    alternates: {
      canonical: `https://detectordeia.ai/parafraseador-vs/${comparison.slug}`,
    },
    openGraph: {
      title: comparison.title,
      description: comparison.description,
      url: `https://detectordeia.ai/parafraseador-vs/${comparison.slug}`,
      siteName: 'DetectordeIA.ai',
      images: [
        {
          url: 'https://detectordeia.ai/og-parafraseador.png',
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
      images: ['https://detectordeia.ai/og-parafraseador.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ParafraseadorComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comparison = paraphraserComparisons.find((c) => c.slug === slug);

  if (!comparison) {
    notFound();
  }

  return <ParafraseadorComparisonPageClient comparison={comparison} />;
}
