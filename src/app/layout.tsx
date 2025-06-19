import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieBanner from '../components/CookieBanner';

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
        {/* Header mejorado */}
        <header className="sticky top-0 z-30 w-full bg-white shadow-lg border-b border-gray-100">
          <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4 md:py-5">
            <a href="/" className="flex items-center group" aria-label="Inicio DetectordeIA.ai">
              <span className="font-extrabold text-2xl md:text-3xl tracking-tight text-[#a259f7] group-hover:text-[#7c3aed] transition-colors select-none" style={{letterSpacing: '-0.03em'}}>DetectordeIA.ai</span>
            </a>
            <div className="flex items-center gap-2 md:gap-6 text-base font-medium">
              <a href="/" className="px-3 py-1 rounded-lg text-gray-700 hover:bg-[#f3e8ff] hover:text-[#a259f7] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a259f7]">Detector de IA</a>
              <a href="/pricing" className="px-3 py-1 rounded-lg text-gray-700 hover:bg-[#f3e8ff] hover:text-[#a259f7] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a259f7]">Precios</a>
            </div>
          </nav>
        </header>
        <main className="min-h-screen bg-gray-50">
        {children}
        </main>
        <CookieBanner />
        <footer className="mt-12 text-center text-gray-200 text-sm flex flex-col items-center gap-2">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <a href="/" className="text-gray-200 hover:text-[#a259f7] transition-colors">Inicio</a>
              <a href="/pricing" className="text-gray-200 hover:text-[#a259f7] transition-colors">Precios</a>
              <a href="/terminos" className="text-gray-200 hover:text-[#a259f7] transition-colors">Términos</a>
              <a href="/privacidad" className="text-gray-200 hover:text-[#a259f7] transition-colors">Privacidad</a>
            </div>
            <div className="flex items-center gap-4">
              <a href="/es" className="text-gray-200 hover:text-[#a259f7] transition-colors">España</a>
              <a href="/mx" className="text-gray-200 hover:text-[#a259f7] transition-colors">México</a>
              <a href="/co" className="text-gray-200 hover:text-[#a259f7] transition-colors">Colombia</a>
              <a href="/ar" className="text-gray-200 hover:text-[#a259f7] transition-colors">Argentina</a>
              <a href="/cl" className="text-gray-200 hover:text-[#a259f7] transition-colors">Chile</a>
              <a href="/pe" className="text-gray-200 hover:text-[#a259f7] transition-colors">Perú</a>
            </div>
          </div>
          <p>Resultado orientativo - la precisión puede variar según el tipo de texto</p>
          <p className="text-xs text-gray-400 mt-1">
            💬 ¿Tenés feedback? Nos ayuda a mejorar para todos los usuarios
          </p>
        </footer>
      </body>
    </html>
  );
}
