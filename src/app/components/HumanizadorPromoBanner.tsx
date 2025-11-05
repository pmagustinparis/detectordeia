'use client';

export default function HumanizadorPromoBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 py-3 px-4 mb-6 rounded-2xl shadow-lg animate-fade-in">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-xl backdrop-blur-sm">
            <span className="text-2xl">✨</span>
          </div>
          <div className="text-white">
            <p className="font-bold text-base md:text-lg flex items-center gap-2">
              <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-md text-xs font-semibold">NUEVO</span>
              Humanizador de IA en Español
            </p>
            <p className="text-sm text-white/90 hidden md:block">
              Transforma texto de IA en contenido natural y humano • Gratis hasta 600 caracteres
            </p>
          </div>
        </div>
        <a
          href="/humanizador"
          className="px-6 py-2.5 bg-white text-emerald-600 font-bold rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 whitespace-nowrap"
        >
          Probar ahora →
        </a>
      </div>
    </div>
  );
}
