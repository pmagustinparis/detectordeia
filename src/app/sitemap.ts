import { MetadataRoute } from 'next';
import { comparisons } from '@/lib/pseo/comparisons';
import { useCases } from '@/lib/pseo/use-cases';
import { features } from '@/lib/pseo/features';
import { glossary } from '@/lib/pseo/glossary';
import { guides } from '@/lib/pseo/guides';
import universities from '@/data/universities.json';

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

  // Páginas sinónimos Detector de IA (Fase 1 SEO)
  const detectorSynonymPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/identificador-de-ia`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/verificador-de-ia`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/comprobador-de-ia`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Páginas sinónimos Humanizador/Parafraseador (Fase 2a SEO)
  const toolSynonymPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/convertidor-ia-a-humano`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/transformador-texto-ia`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reescritor-de-textos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reformulador-online`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
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

  // Páginas de universidades (Fase 2b pSEO)
  const universityPages: MetadataRoute.Sitemap = universities.map((uni) => ({
    url: `${baseUrl}/detector-de-ia-universidad/${uni.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...detectorSynonymPages,
    ...toolSynonymPages,
    ...comparisonPages,
    ...useCasePages,
    ...featurePages,
    ...glossaryPages,
    ...guidePages,
    ...universityPages,
  ];
}
