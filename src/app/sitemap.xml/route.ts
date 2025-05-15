import { MetadataRoute } from 'next';

const URL = 'https://detectordeia.ai';

const paises = [
  { code: 'es', name: 'España' },
  { code: 'cl', name: 'Chile' },
  { code: 'ar', name: 'Argentina' },
  { code: 'co', name: 'Colombia' },
  { code: 'mx', name: 'México' },
  { code: 'pe', name: 'Perú' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${URL}/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const countryPages: MetadataRoute.Sitemap = paises.map((pais) => ({
    url: `${URL}/${pais.code}`,
    lastModified: new Date(),
    changeFrequency: 'monthly', // O 'yearly' si el contenido no cambia mucho
    priority: 0.7, // Prioridad ligeramente menor que las páginas principales
  }));

  return [...staticPages, ...countryPages];
} 