import { Metadata } from 'next';
import universities from '@/data/universities.json';
import { ProductIcons, Icon } from '@/lib/icons';

export const metadata: Metadata = {
  title: 'Parafraseador para Universidades | DetectorDeIA.ai',
  description: 'Parafraseador online optimizado para estudiantes de las principales universidades de LATAM y España. Reescribe textos académicos evitando el plagio. Gratis, sin registro.',
  keywords: [
    'parafraseador universidades',
    'parafraseador estudiantes',
    'parafrasear texto universidad',
    'parafrasear académico',
    'reescribir texto sin plagio',
    'UBA',
    'UNAM',
    'Uniandes',
    'UCM',
    'parafraseador turnitin',
  ],
  alternates: {
    canonical: 'https://detectordeia.ai/parafraseadores-universidades',
  },
  openGraph: {
    title: 'Parafraseador para Universidades | DetectorDeIA.ai',
    description: 'Parafraseador para estudiantes de universidades de LATAM y España. Gratis, preciso y compatible con políticas académicas.',
    url: 'https://detectordeia.ai/parafraseadores-universidades',
    siteName: 'DetectorDeIA',
    type: 'website',
    images: [
      {
        url: 'https://detectordeia.ai/og-parafraseador.png',
        width: 1200,
        height: 630,
        alt: 'Parafraseador - Universidades',
      },
    ],
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parafraseador para Universidades | DetectorDeIA.ai',
    description: 'Parafraseador para universidades de LATAM y España. Gratis y sin plagio.',
    images: ['https://detectordeia.ai/og-parafraseador.png'],
  },
};

const universitiesByCountry = universities.reduce((acc, uni) => {
  if (!acc[uni.country]) {
    acc[uni.country] = [];
  }
  acc[uni.country].push(uni);
  return acc;
}, {} as Record<string, typeof universities>);

const countries = Object.keys(universitiesByCountry).sort();

export default function ParafraseadoresUniversidadesPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 pb-10 px-2">
        {/* HERO SECTION */}
        <section className="w-full flex flex-col items-center justify-center pt-6 pb-8 px-2 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl -z-10 animate-float"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-300/20 rounded-full blur-3xl -z-10 animate-float" style={{animationDelay: '1s'}}></div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-3 mt-2 leading-tight animate-fade-in">
            <span className="gradient-text-primary">Parafraseador</span>
            <br />
            <span className="text-gray-800">para Universidades</span>
          </h1>

          <p className="text-base md:text-lg text-gray-600 text-center mb-4 max-w-2xl animate-fade-in" style={{animationDelay: '0.2s'}}>
            Reescribí textos académicos con tus propias palabras y evitá el plagio. Herramienta gratuita para estudiantes de las principales universidades de LATAM y España.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-6 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-emerald-100">
              <Icon icon={ProductIcons.Confidence} size="lg" className="text-emerald-600" />
              <span className="text-sm font-medium text-gray-700">Sin plagio garantizado</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-emerald-100">
              <Icon icon={ProductIcons.Locked} size="lg" className="text-violet-600" />
              <span className="text-sm font-medium text-gray-700">100% privado</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-emerald-100">
              <Icon icon={ProductIcons.GraduationCap} size="lg" className="text-emerald-600" />
              <span className="text-sm font-medium text-gray-700">Compatible con políticas académicas</span>
            </div>
          </div>

          <a
            href="/parafraseador"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-violet-600 hover:from-emerald-600 hover:to-violet-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <span>Parafrasear texto gratis</span>
            <span>→</span>
          </a>
        </section>

        {/* INTRO SECTION */}
        <section className="max-w-5xl mx-auto mb-12 px-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-800">
              Reformulá cualquier texto sin perder el significado
            </h2>
            <p className="text-gray-600 text-center leading-relaxed mb-6 max-w-3xl mx-auto">
              DetectorDeIA.ai es utilizado por estudiantes de las principales universidades de LATAM y España
              para reformular fuentes bibliográficas, resúmenes de libros y textos académicos con sus propias palabras.
              Nuestra herramienta está optimizada para el español académico y compatible con las políticas contra el plagio.
            </p>
            <div className="text-center">
              <a
                href="/parafraseador"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-violet-600 hover:from-emerald-600 hover:to-violet-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <span>Probar Parafraseador Gratis</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </section>

        {/* UNIVERSIDADES POR PAÍS */}
        <section className="max-w-6xl mx-auto mb-16 px-2">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
            <span className="gradient-text-primary">Universidades</span>
            <span className="text-gray-800"> en nuestro sistema</span>
          </h2>

          <div className="space-y-8">
            {countries.map((country) => (
              <div key={country} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">🎓</span>
                  {country}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {universitiesByCountry[country].map((uni) => (
                    <a
                      key={uni.slug}
                      href={`/parafraseador-universidad/${uni.slug}`}
                      className="group p-4 bg-gradient-to-br from-emerald-50 to-violet-50 hover:from-emerald-100 hover:to-violet-100 rounded-xl border border-emerald-200 hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-violet-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Icon icon={ProductIcons.GraduationCap} size="lg" className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-800 text-sm mb-1 group-hover:text-emerald-700 transition-colors">
                            {uni.shortName}
                          </h4>
                          <p className="text-xs text-gray-600 line-clamp-2">
                            {uni.name}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-gray-500">{uni.city}</span>
                            {uni.usesTurnitin && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                                Turnitin
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="max-w-5xl mx-auto mb-16 px-2">
          <div className="bg-gradient-to-br from-emerald-500 to-violet-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Parafraseador en números
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold mb-2">{universities.length}</div>
                <div className="text-emerald-100">Universidades</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold mb-2">5</div>
                <div className="text-emerald-100">Modos de parafraseo</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold mb-2">0%</div>
                <div className="text-emerald-100">Plagio garantizado</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="max-w-4xl mx-auto mb-16 px-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
              ¿Tu universidad no está en la lista?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Nuestro parafraseador funciona para estudiantes de cualquier universidad. La herramienta es la misma,
              solo personalizamos el contenido para instituciones específicas. Podés usarlo directamente sin problema.
            </p>
            <a
              href="/parafraseador"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-violet-600 hover:from-emerald-600 hover:to-violet-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span>Usar Parafraseador</span>
              <span>→</span>
            </a>
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Parafraseador para Universidades',
            description: 'Parafraseador online optimizado para estudiantes de universidades de LATAM y España',
            url: 'https://detectordeia.ai/parafraseadores-universidades',
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            educationalUse: 'Academic Writing',
            educationalLevel: 'Higher Education',
          }),
        }}
      />
    </>
  );
}
