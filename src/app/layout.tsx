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
        <footer className="bg-gradient-to-br from-gray-900 via-violet-950 to-gray-900 text-white pt-12 pb-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Columna 1: Logo y descripción */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">🤖</span>
                  </div>
                  <span className="text-lg font-bold">DetectordeIA.ai</span>
                </div>
                <p className="text-gray-400 text-sm">
                  El detector de IA más preciso para español. Gratis, privado y sin registro.
                </p>
              </div>

              {/* Columna 2: Enlaces principales */}
              <div>
                <h3 className="font-bold text-white mb-4">Herramienta</h3>
                <div className="flex flex-col gap-2">
                  <a href="/" className="text-gray-400 hover:text-violet-400 transition-colors text-sm">Detector de IA</a>
                  <a href="/pricing" className="text-gray-400 hover:text-violet-400 transition-colors text-sm">Precios</a>
                </div>
              </div>

              {/* Columna 3: Legal */}
              <div>
                <h3 className="font-bold text-white mb-4">Legal</h3>
                <div className="flex flex-col gap-2">
                  <a href="/terminos" className="text-gray-400 hover:text-violet-400 transition-colors text-sm">Términos de uso</a>
                  <a href="/privacidad" className="text-gray-400 hover:text-violet-400 transition-colors text-sm">Política de privacidad</a>
                </div>
              </div>

              {/* Columna 4: Países */}
              <div>
                <h3 className="font-bold text-white mb-4">Regiones</h3>
                <div className="flex flex-col gap-2">
                  <a href="/es" className="text-gray-400 hover:text-violet-400 transition-colors text-sm">España</a>
                  <a href="/mx" className="text-gray-400 hover:text-violet-400 transition-colors text-sm">México</a>
                  <a href="/co" className="text-gray-400 hover:text-violet-400 transition-colors text-sm">Colombia</a>
                  <a href="/ar" className="text-gray-400 hover:text-violet-400 transition-colors text-sm">Argentina</a>
                  <a href="/cl" className="text-gray-400 hover:text-violet-400 transition-colors text-sm">Chile</a>
                  <a href="/pe" className="text-gray-400 hover:text-violet-400 transition-colors text-sm">Perú</a>
                </div>
              </div>
            </div>

            {/* Línea divisoria */}
            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-sm text-center md:text-left">
                  © 2025 DetectordeIA.ai. Resultado orientativo - la precisión puede variar según el tipo de texto.
                </p>
                <p className="text-gray-500 text-xs">
                  💬 Tu feedback nos ayuda a mejorar
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
