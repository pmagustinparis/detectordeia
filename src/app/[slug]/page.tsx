import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { useCases } from '@/lib/pseo/use-cases';
import { features } from '@/lib/pseo/features';
import UseCasePageClient from './UseCasePageClient';
import FeaturePageClient from './FeaturePageClient';

// Generar páginas estáticas en build time
export async function generateStaticParams() {
  const useCaseSlugs = useCases.map((useCase) => ({ slug: useCase.slug }));
  const featureSlugs = features.map((feature) => ({ slug: feature.slug }));
  return [...useCaseSlugs, ...featureSlugs];
}

// Generar metadata SEO para cada página
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  // Intentar encontrar en use cases
  const useCase = useCases.find((uc) => uc.slug === slug);
  if (useCase) {
    const url = `https://detectordeia.ai/${useCase.slug}`;
    return {
      title: useCase.title,
      description: useCase.description,
      alternates: {
        canonical: url,
      },
      keywords: useCase.keywords.join(', '),
      openGraph: {
        title: useCase.title,
        description: useCase.description,
        url: url,
        siteName: 'DetectordeIA.ai',
        images: [
          {
            url: 'https://detectordeia.ai/logo.png',
            width: 800,
            height: 600,
            alt: `DetectordeIA.ai para ${useCase.audience}`,
          },
        ],
        locale: 'es_ES',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: useCase.title,
        description: useCase.description,
        images: ['https://detectordeia.ai/logo.png'],
      },
    };
  }

  // Intentar encontrar en features
  const feature = features.find((f) => f.slug === slug);
  if (feature) {
    const url = `https://detectordeia.ai/${feature.slug}`;
    return {
      title: feature.title,
      description: feature.description,
      alternates: {
        canonical: url,
      },
      keywords: feature.keywords.join(', '),
      openGraph: {
        title: feature.title,
        description: feature.description,
        url: url,
        siteName: 'DetectordeIA.ai',
        images: [
          {
            url: 'https://detectordeia.ai/logo.png',
            width: 800,
            height: 600,
            alt: feature.featureName,
          },
        ],
        locale: 'es_ES',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: feature.title,
        description: feature.description,
        images: ['https://detectordeia.ai/logo.png'],
      },
    };
  }

  return {
    title: 'Página no encontrada | DetectordeIA.ai',
  };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Intentar encontrar en use cases
  const useCase = useCases.find((uc) => uc.slug === slug);
  if (useCase) {
    return <UseCasePageClient useCase={useCase} />;
  }

  // Intentar encontrar en features
  const feature = features.find((f) => f.slug === slug);
  if (feature) {
    return <FeaturePageClient feature={feature} />;
  }

  // Si no se encuentra en ninguno, 404
  notFound();
}
