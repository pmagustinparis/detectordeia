import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { comparisons } from '@/lib/pseo/comparisons';
import ComparisonPageClient from './ComparisonPageClient';

// Generar páginas estáticas en build time
export async function generateStaticParams() {
  return comparisons.map((comp) => ({
    slug: comp.slug,
  }));
}

// Generar metadata SEO para cada página
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const comparison = comparisons.find((c) => c.slug === slug);

  if (!comparison) {
    return {
      title: 'Página no encontrada | DetectordeIA.ai',
    };
  }

  const url = `https://detectordeia.ai/detector-de-ia-vs/${comparison.slug}`;

  return {
    title: comparison.title,
    description: comparison.description,
    alternates: {
      canonical: url,
    },
    keywords: comparison.keywords.join(', '),
    openGraph: {
      title: comparison.title,
      description: comparison.description,
      url: url,
      siteName: 'DetectordeIA.ai',
      images: [
        {
          url: 'https://detectordeia.ai/og-default.png',
          width: 1200,
          height: 630,
          alt: `DetectordeIA.ai vs ${comparison.competitorName}`,
        },
      ],
      locale: 'es_ES',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: comparison.title,
      description: comparison.description,
      images: ['https://detectordeia.ai/og-default.png'],
    },
  };
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comparison = comparisons.find((c) => c.slug === slug);

  if (!comparison) {
    notFound();
  }

  return <ComparisonPageClient comparison={comparison} />;
}
