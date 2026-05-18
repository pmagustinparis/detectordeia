import { Metadata } from 'next';
import Link from 'next/link';
import universities from '@/data/universities.json';

export const metadata: Metadata = {
  title: 'Generador de Citas para Universidades | APA, MLA, Chicago | DetectorDeIA.ai',
  description: 'Generador de citas APA, MLA y Chicago para estudiantes de las principales universidades de España y LATAM. Gratis, ilimitado, sin registro. Compatible con artículos, libros y sitios web.',
  keywords: [
    'generador citas universidades',
    'citas apa universidades',
    'citas bibliograficas universidad',
    'generador referencias academicas',
    'citas mla universidad',
    'normas apa españa',
    'citas chicago universidad',
    'bibliografia universidad gratis',
    'UBA', 'UNAM', 'UCM', 'Uniandes',
  ],
  alternates: {
    canonical: 'https://detectordeia.ai/citadores-universidades',
  },
  openGraph: {
    title: 'Generador de Citas para Universidades | DetectorDeIA.ai',
    description: 'Citas APA, MLA y Chicago para estudiantes de universidades de España y LATAM. Gratis e ilimitado.',
    url: 'https://detectordeia.ai/citadores-universidades',
    siteName: 'DetectorDeIA',
    type: 'website',
    images: [
      {
        url: 'https://detectordeia.ai/og-citador.png',
        width: 1200,
        height: 630,
        alt: 'Generador de Citas - Universidades',
      },
    ],
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generador de Citas para Universidades | DetectorDeIA.ai',
    description: 'Citas APA, MLA y Chicago para universidades de España y LATAM. Gratis e ilimitado.',
    images: ['https://detectordeia.ai/og-citador.png'],
  },
};

const universitiesByCountry = universities.reduce((acc, uni) => {
  if (!acc[uni.country]) acc[uni.country] = [];
  acc[uni.country].push(uni);
  return acc;
}, {} as Record<string, typeof universities>);

const countries = Object.keys(universitiesByCountry).sort();

export default function CitadoresUniversidadesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-10 px-2">
      <div className="max-w-5xl mx-auto pt-10 pb-6 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4">
          Generador de Citas para Universidades
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Citas en APA 7ª, MLA 9 y Chicago para las principales universidades de España y Latinoamérica.
          Gratis, ilimitado, sin registro.
        </p>
        <Link
          href="/generador-de-citas"
          className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-xl transition-all"
        >
          Generar cita ahora →
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        {countries.map((country) => (
          <div key={country} className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              {country}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {universitiesByCountry[country].map((uni) => (
                <Link
                  key={uni.slug}
                  href={`/citador-universidad/${uni.slug}`}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-900 transition-colors leading-tight">
                        {uni.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{uni.shortName} · {uni.city}</p>
                    </div>
                    <span className="text-blue-900 opacity-0 group-hover:opacity-100 transition-opacity text-sm shrink-0">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
