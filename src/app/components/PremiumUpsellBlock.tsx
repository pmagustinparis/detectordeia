import React from 'react';
import Link from 'next/link';

interface PremiumUpsellBlockProps {
  textos: {
    titulo: string;
    subtitulo: string;
    bullets: string[];
    precio: string;
    cta: string;
  };
}

const PremiumUpsellBlock: React.FC<PremiumUpsellBlockProps> = ({ textos }) => (
  <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl shadow-xl p-6 relative overflow-hidden">
    <div className="relative">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-lg text-slate-800">{textos.titulo}</h3>
          <p className="text-sm text-slate-500 font-medium">{textos.subtitulo}</p>
        </div>
      </div>

      {/* Features List */}
      <ul className="space-y-2.5 mb-5">
        {textos.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <div className="mt-0.5 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm text-slate-500 leading-relaxed">{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Price */}
      <div className="mb-4 px-4 py-2.5 bg-white rounded-xl border border-slate-200 shadow-sm">
        <p className="text-center text-slate-800 font-bold text-base">{textos.precio}</p>
      </div>

      {/* CTA Button */}
      <Link
        href="/pricing"
        className="block w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-colors duration-200 text-center group"
      >
        <span className="flex items-center justify-center gap-2">
          {textos.cta}
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </Link>
    </div>
  </div>
);

export default PremiumUpsellBlock; 