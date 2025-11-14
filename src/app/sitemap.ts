import { MetadataRoute } from 'next';
import { comparisons } from '@/lib/pseo/comparisons';
import { useCases } from '@/lib/pseo/use-cases';
import { features } from '@/lib/pseo/features';
import { glossary } from '@/lib/pseo/glossary';
import { guides } from '@/lib/pseo/guides';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://detectordeia.ai';

  // Páginas estáticas principales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/humanizador`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/parafraseador`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Páginas de comparativas
  const comparisonPages: MetadataRoute.Sitemap = comparisons.map((comp) => ({
    url: `${baseUrl}/detector-de-ia-vs/${comp.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Páginas de casos de uso
  const useCasePages: MetadataRoute.Sitemap = useCases.map((useCase) => ({
    url: `${baseUrl}/${useCase.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Páginas de features
  const featurePages: MetadataRoute.Sitemap = features.map((feature) => ({
    url: `${baseUrl}/${feature.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Páginas de glosario
  const glossaryPages: MetadataRoute.Sitemap = glossary.map((term) => ({
    url: `${baseUrl}/glosario/${term.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Páginas de guías
  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${baseUrl}/guias/${guide.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9, // Guías tienen alta prioridad
  }));

  return [
    ...staticPages,
    ...comparisonPages,
    ...useCasePages,
    ...featurePages,
    ...glossaryPages,
    ...guidePages,
  ];
}
