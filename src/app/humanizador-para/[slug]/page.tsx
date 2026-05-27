import { Metadata } from 'next';
import { humanizerUseCases } from '@/lib/pseo/humanizer-use-cases';
import HumanizerUseCasePageClient from './HumanizerUseCasePageClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return humanizerUseCases.map((uc) => ({
    slug: uc.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const useCase = humanizerUseCases.find((uc) => uc.slug === slug);

  if (!useCase) {
    return { title: 'Página no encontrada' };
  }

  return {
    title: useCase.title,
    description: useCase.description,
    keywords: useCase.keywords,
    alternates: {
      canonical: `https://detectordeia.ai/humanizador-para/${useCase.slug}`,
    },
    openGraph: {
      title: useCase.title,
      description: useCase.description,
      url: `https://detectordeia.ai/humanizador-para/${useCase.slug}`,
      siteName: 'DetectordeIA.ai',
      images: [
        {
          url: 'https://detectordeia.ai/og-humanizador.png',
          width: 1200,
          height: 630,
          alt: useCase.h1,
        },
      ],
      locale: 'es_ES',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: useCase.title,
      description: useCase.description,
      images: ['https://detectordeia.ai/og-humanizador.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function HumanizerUseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const useCase = humanizerUseCases.find((uc) => uc.slug === slug);

  if (!useCase) {
    notFound();
  }

  return <HumanizerUseCasePageClient useCase={useCase} />;
}
