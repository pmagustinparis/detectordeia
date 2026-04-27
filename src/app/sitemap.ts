import { MetadataRoute } from 'next';
import { comparisons } from '@/lib/pseo/comparisons';
import { humanizerComparisons } from '@/lib/pseo/humanizer-comparisons';
import { paraphraserComparisons } from '@/lib/pseo/paraphraser-comparisons';
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
      url: `${baseUrl}/generador-de-citas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/generador-citas-apa`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/generador-citas-apa-7`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/referencias-apa`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/citar-pagina-web-apa`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/citas-bibliograficas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/generador-citas-mla`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/generador-citas-chicago`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
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

  // Hub de universidades
  const universitiesHub: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/universidades`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Páginas de universidades — Humanizador (Fase 3 pSEO)
  const humanizerUniversityPages: MetadataRoute.Sitemap = universities.map((uni) => ({
    url: `${baseUrl}/humanizador-universidad/${uni.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Hub Humanizador — Universidades
  const humanizerUniversitiesHub: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/humanizadores-universidades`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Páginas de universidades — Parafraseador (Fase 3 pSEO)
  const paraphraserUniversityPages: MetadataRoute.Sitemap = universities.map((uni) => ({
    url: `${baseUrl}/parafraseador-universidad/${uni.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Hub Parafraseador — Universidades
  const paraphraserUniversitiesHub: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/parafraseadores-universidades`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Comparativas Humanizador vs competidores
  const humanizerComparisonPages: MetadataRoute.Sitemap = humanizerComparisons.map((comp) => ({
    url: `${baseUrl}/humanizador-vs/${comp.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Comparativas Parafraseador vs competidores
  const paraphraserComparisonPages: MetadataRoute.Sitemap = paraphraserComparisons.map((comp) => ({
    url: `${baseUrl}/parafraseador-vs/${comp.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Páginas regionales (targeting geográfico)
  const regionalPages: MetadataRoute.Sitemap = ['es', 'mx', 'co', 'ar', 'cl', 'pe'].map((region) => ({
    url: `${baseUrl}/${region}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
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
    ...universitiesHub,
    ...humanizerUniversityPages,
    ...humanizerUniversitiesHub,
    ...paraphraserUniversityPages,
    ...paraphraserUniversitiesHub,
    ...humanizerComparisonPages,
    ...paraphraserComparisonPages,
    ...regionalPages,
  ];
}
