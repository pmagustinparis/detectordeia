import type { Metadata } from "next";
import "./globals.css";
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="16x16" />
        {/* Organization schema — establece la entidad del sitio para Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'DetectordeIA.ai',
              url: 'https://detectordeia.ai',
              logo: 'https://detectordeia.ai/logo.png',
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
        <div className="flex min-h-screen bg-white">
          {/* Sidebar — desktop only, sticky */}
          <AppSidebar />

          {/* Main content area */}
          <div className="flex-1 flex flex-col min-w-0">
            <AppTopBar />
            <main className="flex-1 pb-16 md:pb-0">
              {children}
            </main>
        <footer className="bg-blue-900 text-white pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4">
            {/* Fila 1: Logo + descripción */}
            <div className="flex items-start justify-between mb-10 flex-wrap gap-6">
              <div className="max-w-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-800 flex items-center justify-center">
                    <span className="text-white font-black italic text-xl leading-none">D</span>
                  </div>
                  <span className="text-xl font-black tracking-tight text-white">
                    Detector<span className="text-blue-300">deIA</span><span className="text-blue-400 font-semibold">.ai</span>
                  </span>
                </div>
                <p className="text-blue-200 text-sm leading-relaxed mb-4">
                  Suite completa de herramientas de IA en español: detecta, humaniza y parafrasea textos. Gratis, privado y sin registro.
                </p>
                <div className="flex gap-3">
                  <a href="https://x.com/builtbyagus" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-blue-800 hover:bg-blue-700 flex items-center justify-center transition-colors">
                    <span className="text-lg">𝕏</span>
                  </a>
                  <a href="mailto:buildbyagus@gmail.com" className="w-9 h-9 rounded-lg bg-blue-800 hover:bg-blue-700 flex items-center justify-center transition-colors">
                    <span className="text-lg">✉️</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Fila 2: Columnas de navegación */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
              {/* Columna: Herramientas */}
              <div>
                <h3 className="font-bold !text-white mb-4 text-sm uppercase tracking-wider">Herramientas</h3>
                <div className="flex flex-col gap-2.5">
                  <a href="/" className="text-blue-300 hover:text-white transition-colors text-sm">Detector de IA</a>
                  <a href="/humanizador" className="text-blue-300 hover:text-white transition-colors text-sm">Humanizador</a>
                  <a href="/parafraseador" className="text-blue-300 hover:text-white transition-colors text-sm">Parafraseador</a>
                  <a href="/pricing" className="text-blue-300 hover:text-white transition-colors text-sm">Planes</a>
                </div>
              </div>

              {/* Columna: Guías */}
              <div>
                <h3 className="font-bold !text-white mb-4 text-sm uppercase tracking-wider">Guías</h3>
                <div className="flex flex-col gap-2.5">
                  <a href="/guias/como-evitar-plagio-academico" className="text-blue-300 hover:text-white transition-colors text-sm">Evitar plagio</a>
                  <a href="/guias/como-usar-ia-eticamente-universidad" className="text-blue-300 hover:text-white transition-colors text-sm">IA ética en la uni</a>
                  <a href="/guias/como-hacer-bibliografia-apa" className="text-blue-300 hover:text-white transition-colors text-sm">Bibliografía APA</a>
                  <a href="/guias/como-citar-fuentes-apa-parafraseo" className="text-blue-300 hover:text-white transition-colors text-sm">Citar fuentes APA</a>
                  <a href="/guias/como-gestionar-tiempo-proyectos-academicos" className="text-blue-300 hover:text-white transition-colors text-sm">Gestión del tiempo</a>
                </div>
              </div>

              {/* Columna: Comparativas */}
              <div>
                <h3 className="font-bold !text-white mb-4 text-sm uppercase tracking-wider">Comparativas</h3>
                <div className="flex flex-col gap-2.5">
                  <a href="/detector-de-ia-vs/turnitin" className="text-blue-300 hover:text-white transition-colors text-sm">vs Turnitin</a>
                  <a href="/detector-de-ia-vs/quillbot" className="text-blue-300 hover:text-white transition-colors text-sm">vs QuillBot</a>
                  <a href="/detector-de-ia-vs/gptzero" className="text-blue-300 hover:text-white transition-colors text-sm">vs GPTZero</a>
                  <a href="/detector-de-ia-vs/copyleaks" className="text-blue-300 hover:text-white transition-colors text-sm">vs Copyleaks</a>
                  <a href="/detector-de-ia-vs/chatgpt" className="text-blue-300 hover:text-white transition-colors text-sm">vs ChatGPT</a>
                </div>
              </div>

              {/* Columna: Universidades */}
              <div>
                <h3 className="font-bold !text-white mb-4 text-sm uppercase tracking-wider">Universidades</h3>
                <div className="flex flex-col gap-2.5">
                  <a href="/detector-de-ia-universidad/universidad-buenos-aires" className="text-blue-300 hover:text-white transition-colors text-sm">UBA</a>
                  <a href="/detector-de-ia-universidad/unam" className="text-blue-300 hover:text-white transition-colors text-sm">UNAM</a>
                  <a href="/detector-de-ia-universidad/universidad-complutense-madrid" className="text-blue-300 hover:text-white transition-colors text-sm">Complutense</a>
                  <a href="/detector-de-ia-universidad/pontificia-universidad-javeriana" className="text-blue-300 hover:text-white transition-colors text-sm">Javeriana</a>
                  <a href="/universidades" className="text-blue-300 hover:text-white transition-colors text-sm">Ver todas →</a>
                </div>
              </div>

              {/* Columna: Legal */}
              <div>
                <h3 className="font-bold !text-white mb-4 text-sm uppercase tracking-wider">Legal</h3>
                <div className="flex flex-col gap-2.5">
                  <a href="/terminos" className="text-blue-300 hover:text-white transition-colors text-sm">Términos de uso</a>
                  <a href="/privacidad" className="text-blue-300 hover:text-white transition-colors text-sm">Política de privacidad</a>
                </div>
              </div>

              {/* Columna: Regiones */}
              <div>
                <h3 className="font-bold !text-white mb-4 text-sm uppercase tracking-wider">Regiones</h3>
                <div className="flex flex-col gap-2.5">
                  <a href="/es" className="text-blue-300 hover:text-white transition-colors text-sm">🇪🇸 España</a>
                  <a href="/mx" className="text-blue-300 hover:text-white transition-colors text-sm">🇲🇽 México</a>
                  <a href="/co" className="text-blue-300 hover:text-white transition-colors text-sm">🇨🇴 Colombia</a>
                  <a href="/ar" className="text-blue-300 hover:text-white transition-colors text-sm">🇦🇷 Argentina</a>
                  <a href="/cl" className="text-blue-300 hover:text-white transition-colors text-sm">🇨🇱 Chile</a>
                  <a href="/pe" className="text-blue-300 hover:text-white transition-colors text-sm">🇵🇪 Perú</a>
                </div>
              </div>
            </div>

            {/* Línea divisoria */}
            <div className="border-t border-blue-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                  <p className="text-blue-300 text-sm text-center md:text-left">
                    © 2025 DetectordeIA.ai
                  </p>
                  <span className="hidden md:block text-blue-700">•</span>
                  <p className="text-blue-400 text-xs text-center md:text-left">
                    Resultado orientativo - la precisión puede variar según el tipo de texto
                  </p>
                </div>
                <a href="mailto:buildbyagus@gmail.com?subject=Feedback DetectorDeIA" className="text-blue-400 hover:text-white text-xs flex items-center gap-1 transition-colors">
                  <span>💬</span>
                  <span>Tu feedback nos ayuda a mejorar</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
          </div>{/* end main content area */}
        </div>{/* end flex min-h-screen */}
        <MobileBottomNav />
        <PassiveFeedbackWidget />
        <CookieBanner />
      </body>
    </html>
  );
}
