import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieBanner from '../components/CookieBanner';
import Header from '../components/Header';

const inter = Inter({ subsets: ["latin"] });

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
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen gradient-bg-primary">
        {children}
        </main>
        <CookieBanner />
        <footer className="bg-gradient-to-br from-gray-900 via-violet-950 to-gray-900 text-white pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
              {/* Columna 1: Logo y descripción - Más ancha */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">🤖</span>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    DetectordeIA.ai
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-sm">
                  Suite completa de herramientas de IA en español: detecta, humaniza y parafrasea textos. Gratis, privado y sin registro.
                </p>
                <div className="flex gap-3">
                  <a href="https://x.com/builtbyagus" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-violet-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <span className="text-lg">𝕏</span>
                  </a>
                  <a href="mailto:buildbyagus@gmail.com" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-violet-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <span className="text-lg">✉️</span>
                  </a>
                </div>
              </div>

              {/* Columna 2: Herramientas */}
              <div>
                <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Herramientas</h3>
                <div className="flex flex-col gap-2.5">
                  <a href="/" className="text-gray-400 hover:text-violet-400 transition-colors text-sm flex items-center gap-2 group">
                    <span className="text-xs group-hover:translate-x-1 transition-transform">🔍</span>
                    <span>Detector de IA</span>
                  </a>
                  <a href="/humanizador" className="text-gray-400 hover:text-violet-400 transition-colors text-sm flex items-center gap-2 group">
                    <span className="text-xs group-hover:translate-x-1 transition-transform">✨</span>
                    <span>Humanizador</span>
                  </a>
                  <a href="/parafraseador" className="text-gray-400 hover:text-violet-400 transition-colors text-sm flex items-center gap-2 group">
                    <span className="text-xs group-hover:translate-x-1 transition-transform">🔄</span>
                    <span>Parafraseador</span>
                  </a>
                  <a href="/pricing" className="text-gray-400 hover:text-violet-400 transition-colors text-sm flex items-center gap-2 group">
                    <span className="text-xs group-hover:translate-x-1 transition-transform">💎</span>
                    <span>Planes</span>
                  </a>
                </div>
              </div>

              {/* Columna 3: Legal */}
              <div>
                <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Legal</h3>
                <div className="flex flex-col gap-2.5">
                  <a href="/terminos" className="text-gray-400 hover:text-violet-400 transition-colors text-sm">Términos de uso</a>
                  <a href="/privacidad" className="text-gray-400 hover:text-violet-400 transition-colors text-sm">Política de privacidad</a>
                </div>
              </div>

              {/* Columna 4: Regiones */}
              <div>
                <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Regiones</h3>
                <div className="flex flex-col gap-2.5">
                  <a href="/es" className="text-gray-400 hover:text-violet-400 transition-colors text-sm">🇪🇸 España</a>
                  <a href="/mx" className="text-gray-400 hover:text-violet-400 transition-colors text-sm">🇲🇽 México</a>
                  <a href="/co" className="text-gray-400 hover:text-violet-400 transition-colors text-sm">🇨🇴 Colombia</a>
                  <a href="/ar" className="text-gray-400 hover:text-violet-400 transition-colors text-sm">🇦🇷 Argentina</a>
                  <a href="/cl" className="text-gray-400 hover:text-violet-400 transition-colors text-sm">🇨🇱 Chile</a>
                  <a href="/pe" className="text-gray-400 hover:text-violet-400 transition-colors text-sm">🇵🇪 Perú</a>
                </div>
              </div>
            </div>

            {/* Línea divisoria */}
            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                  <p className="text-gray-400 text-sm text-center md:text-left">
                    © 2025 DetectordeIA.ai
                  </p>
                  <span className="hidden md:block text-gray-700">•</span>
                  <p className="text-gray-500 text-xs text-center md:text-left">
                    Resultado orientativo - la precisión puede variar según el tipo de texto
                  </p>
                </div>
                <a href="mailto:buildbyagus@gmail.com?subject=Feedback DetectorDeIA" className="text-gray-500 hover:text-violet-400 text-xs flex items-center gap-1 transition-colors">
                  <span>💬</span>
                  <span>Tu feedback nos ayuda a mejorar</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
