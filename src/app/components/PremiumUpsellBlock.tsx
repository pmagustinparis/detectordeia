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
  <div className="mt-8 bg-tinta rounded-xl p-6 relative overflow-hidden">
    <div className="relative">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-verde-soft" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <div>
          <h3 className="font-medium text-lg text-white">{textos.titulo}</h3>
          <p className="text-sm text-white/50">{textos.subtitulo}</p>
        </div>
      </div>

      <ul className="space-y-2.5 mb-5">
        {textos.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <div className="mt-0.5 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-verde-soft" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm text-white/70 leading-relaxed">{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="mb-4 px-4 py-2.5 bg-white/10 rounded-xl border border-white/20">
        <p className="text-center text-white font-medium text-base">{textos.precio}</p>
      </div>

      <Link href="/pricing" className="block w-full bg-papel hover:bg-papel-2 text-tinta font-medium py-3.5 px-6 rounded-xl transition-colors text-center group">
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
