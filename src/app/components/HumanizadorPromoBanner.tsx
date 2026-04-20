'use client';

export default function HumanizadorPromoBanner() {
  return (
    <div className="flex items-center justify-between gap-4 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <span className="text-xs font-bold text-blue-900 uppercase tracking-wide">Nuevo</span>
          <p className="text-sm font-semibold text-blue-900">
            Humanizador de IA en Español
            <span className="hidden md:inline text-blue-700 font-normal"> · Gratis hasta 600 caracteres</span>
          </p>
        </div>
      </div>
      <a
        href="/humanizador"
        className="shrink-0 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-sm rounded-lg transition-colors"
      >
        Probar →
      </a>
    </div>
  );
}
