import { Metadata } from 'next';
import UniversidadesClient from './UniversidadesClient';

export const metadata: Metadata = {
  title: 'Detector de IA para Universidades | DetectorDeIA.ai',
  description: 'Detector de IA optimizado para estudiantes y profesores de las principales universidades de LATAM y España. Herramienta académica gratuita compatible con políticas universitarias.',
  keywords: [
    'detector ia universidades',
    'detector ia estudiantes',
    'detector ia universidad',
    'detector ia académico',
    'detector chatgpt universidad',
    'UBA',
    'UNAM',
    'Uniandes',
    'UCM',
    'detector turnitin',
  ],
  alternates: {
    canonical: 'https://detectordeia.ai/universidades',
  },
  openGraph: {
    title: 'Detector de IA para Universidades | DetectorDeIA.ai',
    description: 'Detector de IA para estudiantes y profesores de universidades de LATAM y España. Gratis, preciso y compatible con políticas académicas.',
    url: 'https://detectordeia.ai/universidades',
    siteName: 'DetectorDeIA',
    type: 'website',
    images: [
      {
        url: 'https://detectordeia.ai/logo.png',
        width: 1200,
        height: 630,
        alt: 'DetectorDeIA.ai - Universidades',
      },
    ],
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Detector de IA para Universidades | DetectorDeIA.ai',
    description: 'Detector de IA para universidades de LATAM y España. Gratis y compatible con políticas académicas.',
    images: ['https://detectordeia.ai/logo.png'],
  },
};

export default function UniversidadesPage() {
  return (
    <>
      <UniversidadesClient />

      {/* Structured Data - Educational Application */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalApplication',
            name: 'Detector de IA para Universidades',
            description: 'Detector de IA optimizado para estudiantes y profesores de universidades de LATAM y España',
            url: 'https://detectordeia.ai/universidades',
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            educationalUse: 'Academic Integrity',
            educationalLevel: 'Higher Education',
          }),
        }}
      />
    </>
  );
}
