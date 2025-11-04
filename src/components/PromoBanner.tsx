'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 text-white py-3 px-4 animate-slide-in-top">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-center">
        <span className="text-2xl animate-float">✨</span>
        <p className="text-sm md:text-base font-medium">
          <strong className="font-bold">Nuevo:</strong> Análisis premium con explicaciones por frase y acceso API
          <Link href="/pricing" className="underline ml-2 font-bold hover:text-violet-200 transition-colors">
            Ver planes →
          </Link>
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Cerrar banner"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
