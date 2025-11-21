import React from 'react';
import Link from 'next/link';

interface PremiumUpsellCompactProps {
  textos: {
    titulo: string;
    bullets: string[];
    cta: string;
  };
}

const PremiumUpsellCompact: React.FC<PremiumUpsellCompactProps> = ({ textos }) => (
  <div className="mt-6 mb-2 bg-gradient-to-br from-violet-50 to-white border border-violet-200 rounded-xl shadow-lg p-4 relative overflow-hidden">
    {/* Decorative element */}
    <div className="absolute -top-5 -right-5 w-20 h-20 bg-violet-200 rounded-full blur-2xl opacity-30"></div>

    <div className="relative">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md flex-shrink-0">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <span className="font-bold text-sm text-gray-900">{textos.titulo}</span>
      </div>

      {/* Features */}
      <ul className="space-y-1.5 mb-3 text-left">
        {textos.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2">
            <div className="mt-0.5 w-4 h-4 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-2.5 h-2.5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-xs text-gray-700">{bullet}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Link
        href="/pricing"
        className="block w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all text-sm text-center group"
      >
        <span className="flex items-center justify-center gap-1.5">
          {textos.cta}
          <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </Link>
    </div>
  </div>
);

export default PremiumUpsellCompact; 