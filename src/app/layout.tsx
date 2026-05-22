import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import CookieBanner from '../components/CookieBanner';
import AppSidebar from './components/AppSidebar';
import AppTopBar from './components/AppTopBar';
import MobileBottomNav from './components/MobileBottomNav';
import PassiveFeedbackWidget from './components/surveys/PassiveFeedbackWidget';

export const metadata: Metadata = {
  title: "Detector de IA - Detecta si un texto fue escrito por inteligencia artificial",
  description: "Herramienta gratuita para detectar si un texto fue generado por IA. Analiza textos en español con alta precisión.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-MVQ4SSTK3Z"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MVQ4SSTK3Z');
            `,
          }}
        />

        {/* Favicons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2D5944" />

        {/* Open Graph */}
        <meta property="og:title" content="detectordeIA — Detector, humanizador y citador APA en español" />
        <meta property="og:description" content="Suite académica de IA en español para estudiantes y profesores. Detector de IA, humanizador, parafraseador y citador APA 7." />
        <meta property="og:image" content="https://detectordeia.ai/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://detectordeia.ai" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_ES" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="detectordeIA" />
        <meta name="twitter:description" content="Detector, humanizador y citador APA en español." />
        <meta name="twitter:image" content="https://detectordeia.ai/og-image.png" />

        {/* Fuentes */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300..700;1,8..60,300..700&family=Geist:wght@300..700&family=Geist+Mono:wght@400..600&display=swap" rel="stylesheet" />

        {/* Organization schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'DetectordeIA.ai',
              url: 'https://detectordeia.ai',
              logo: 'https://detectordeia.ai/brandidentity-detectordeia/logo-detectordeia.png',
              sameAs: ['https://x.com/builtbyagus'],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'buildbyagus@gmail.com',
                contactType: 'customer support',
              },
            }),
          }}
        />
      </head>
      <body className="font-sans">
        <div className="flex min-h-screen bg-papel">
          {/* Sidebar — desktop only, sticky */}
          <AppSidebar />

          {/* Main content area */}
          <div className="flex-1 flex flex-col min-w-0">
            <AppTopBar />
            <main className="flex-1 pb-16 md:pb-0">
              {children}
            </main>

            <footer className="bg-tinta text-white pt-16 pb-8">
              <div className="max-w-7xl mx-auto px-4">
                {/* Fila 1: Logo + descripción */}
                <div className="flex items-start justify-between mb-10 flex-wrap gap-6">
                  <div className="max-w-sm">
                    <div className="mb-4">
                      <Image
                        src="/brandidentity-detectordeia/logo-detectordeia-white.svg"
                        alt="detectordeIA"
                        width={160}
                        height={42}
                        priority
                      />
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed mb-4">
                      Suite académica de herramientas de IA en español: detecta, humaniza y parafrasea textos. Gratis, privado y sin registro.
                    </p>
                    <div className="flex gap-3">
                      <a href="https://x.com/builtbyagus" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                        <span className="text-base font-bold text-white">𝕏</span>
                      </a>
                      <a href="mailto:buildbyagus@gmail.com" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Fila 2: Columnas de navegación */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
                  <div>
                    <h3 className="font-sans font-semibold text-white/40 mb-4 text-xs uppercase tracking-wider">Herramientas</h3>
                    <div className="flex flex-col gap-2.5">
                      <a href="/" className="text-white/60 hover:text-white transition-colors text-sm">Detector de IA</a>
                      <a href="/humanizador" className="text-white/60 hover:text-white transition-colors text-sm">Humanizador</a>
                      <a href="/parafraseador" className="text-white/60 hover:text-white transition-colors text-sm">Parafraseador</a>
                      <a href="/pricing" className="text-white/60 hover:text-white transition-colors text-sm">Planes</a>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-sans font-semibold text-white/40 mb-4 text-xs uppercase tracking-wider">Guías</h3>
                    <div className="flex flex-col gap-2.5">
                      <a href="/guias/como-evitar-plagio-academico" className="text-white/60 hover:text-white transition-colors text-sm">Evitar plagio</a>
                      <a href="/guias/como-usar-ia-eticamente-universidad" className="text-white/60 hover:text-white transition-colors text-sm">IA ética en la uni</a>
                      <a href="/guias/como-hacer-bibliografia-apa" className="text-white/60 hover:text-white transition-colors text-sm">Bibliografía APA</a>
                      <a href="/guias/como-citar-fuentes-apa-parafraseo" className="text-white/60 hover:text-white transition-colors text-sm">Citar fuentes APA</a>
                      <a href="/guias/como-gestionar-tiempo-proyectos-academicos" className="text-white/60 hover:text-white transition-colors text-sm">Gestión del tiempo</a>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-sans font-semibold text-white/40 mb-4 text-xs uppercase tracking-wider">Comparativas</h3>
                    <div className="flex flex-col gap-2.5">
                      <a href="/detector-de-ia-vs/turnitin" className="text-white/60 hover:text-white transition-colors text-sm">vs Turnitin</a>
                      <a href="/detector-de-ia-vs/quillbot" className="text-white/60 hover:text-white transition-colors text-sm">vs QuillBot</a>
                      <a href="/detector-de-ia-vs/gptzero" className="text-white/60 hover:text-white transition-colors text-sm">vs GPTZero</a>
                      <a href="/detector-de-ia-vs/copyleaks" className="text-white/60 hover:text-white transition-colors text-sm">vs Copyleaks</a>
                      <a href="/detector-de-ia-vs/chatgpt" className="text-white/60 hover:text-white transition-colors text-sm">vs ChatGPT</a>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-sans font-semibold text-white/40 mb-4 text-xs uppercase tracking-wider">Universidades</h3>
                    <div className="flex flex-col gap-2.5">
                      <a href="/detector-de-ia-universidad/universidad-buenos-aires" className="text-white/60 hover:text-white transition-colors text-sm">UBA</a>
                      <a href="/detector-de-ia-universidad/unam" className="text-white/60 hover:text-white transition-colors text-sm">UNAM</a>
                      <a href="/detector-de-ia-universidad/universidad-complutense-madrid" className="text-white/60 hover:text-white transition-colors text-sm">Complutense</a>
                      <a href="/detector-de-ia-universidad/pontificia-universidad-javeriana" className="text-white/60 hover:text-white transition-colors text-sm">Javeriana</a>
                      <a href="/universidades" className="text-white/60 hover:text-white transition-colors text-sm">Ver todas →</a>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-sans font-semibold text-white/40 mb-4 text-xs uppercase tracking-wider">Legal</h3>
                    <div className="flex flex-col gap-2.5">
                      <a href="/terminos" className="text-white/60 hover:text-white transition-colors text-sm">Términos de uso</a>
                      <a href="/privacidad" className="text-white/60 hover:text-white transition-colors text-sm">Política de privacidad</a>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-sans font-semibold text-white/40 mb-4 text-xs uppercase tracking-wider">Regiones</h3>
                    <div className="flex flex-col gap-2.5">
                      <a href="/es" className="text-white/60 hover:text-white transition-colors text-sm">España</a>
                      <a href="/mx" className="text-white/60 hover:text-white transition-colors text-sm">México</a>
                      <a href="/co" className="text-white/60 hover:text-white transition-colors text-sm">Colombia</a>
                      <a href="/ar" className="text-white/60 hover:text-white transition-colors text-sm">Argentina</a>
                      <a href="/cl" className="text-white/60 hover:text-white transition-colors text-sm">Chile</a>
                      <a href="/pe" className="text-white/60 hover:text-white transition-colors text-sm">Perú</a>
                    </div>
                  </div>
                </div>

                {/* Línea divisoria */}
                <div className="border-t border-white/10 pt-8">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                      <p className="text-white/40 text-sm text-center md:text-left">
                        © 2025 DetectordeIA.ai
                      </p>
                      <span className="hidden md:block text-white/20">•</span>
                      <p className="text-white/30 text-xs text-center md:text-left">
                        Resultado orientativo — la precisión puede variar según el tipo de texto
                      </p>
                    </div>
                    <a href="mailto:buildbyagus@gmail.com?subject=Feedback DetectorDeIA" className="text-white/40 hover:text-white/80 text-xs flex items-center gap-1.5 transition-colors">
                      <span>Tu feedback nos ayuda a mejorar</span>
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
        <MobileBottomNav />
        <PassiveFeedbackWidget />
        <CookieBanner />
      </body>
    </html>
  );
}
