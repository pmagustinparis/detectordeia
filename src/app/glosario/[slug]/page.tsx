import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { glossary } from '@/lib/pseo/glossary';
import GlossaryPageClient from './GlossaryPageClient';

// Generar páginas estáticas en build time
export async function generateStaticParams() {
  return glossary.map((term) => ({
    slug: term.slug,
  }));
}

// Generar metadata SEO para cada página
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const term = glossary.find((t) => t.slug === slug);

  if (!term) {
    return {
      title: 'Página no encontrada | DetectordeIA.ai',
    };
  }

  const url = `https://detectordeia.ai/glosario/${term.slug}`;

  return {
    title: term.title,
    description: term.description,
    alternates: {
      canonical: url,
    },
    keywords: term.keywords.join(', '),
    openGraph: {
      title: term.title,
      description: term.description,
      url: url,
      siteName: 'DetectordeIA.ai',
      images: [
        {
          url: 'https://detectordeia.ai/logo.png',
          width: 800,
          height: 600,
          alt: term.term,
        },
      ],
      locale: 'es_ES',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: term.title,
      description: term.description,
      images: ['https://detectordeia.ai/logo.png'],
    },
  };
}

export default async function GlossaryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const term = glossary.find((t) => t.slug === slug);

  if (!term) {
    notFound();
  }

  return <GlossaryPageClient term={term} />;
}
