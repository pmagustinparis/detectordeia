import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { guides } from '@/lib/pseo/guides';
import GuidePageClient from './GuidePageClient';

// Generar páginas estáticas en build time
export async function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

// Generar metadata SEO para cada página
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);

  if (!guide) {
    return {
      title: 'Página no encontrada | DetectordeIA.ai',
    };
  }

  const url = `https://detectordeia.ai/guias/${guide.slug}`;

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: {
      canonical: url,
    },
    keywords: guide.keywords.join(', '),
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: url,
      siteName: 'DetectordeIA.ai',
      images: [
        {
          url: 'https://detectordeia.ai/logo.png',
          width: 800,
          height: 600,
          alt: guide.title,
        },
      ],
      locale: 'es_ES',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.metaTitle,
      description: guide.metaDescription,
      images: ['https://detectordeia.ai/logo.png'],
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  return <GuidePageClient guide={guide} />;
}
