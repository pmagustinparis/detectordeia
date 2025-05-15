import React from 'react';

interface PremiumUpsellBlockProps {
  textos: {
    titulo: string;
    subtitulo: string;
    bullets: string[];
    precio: string;
    cta: string;
    aviso: string;
  };
}

const PremiumUpsellBlock: React.FC<PremiumUpsellBlockProps> = ({ textos }) => (
  <div className="mt-8 bg-white border-2 border-[#e9d5ff] rounded-2xl shadow-lg p-5 flex flex-col items-center text-center min-h-[220px]">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-2xl text-[#a259f7]">🔒</span>
      <span className="font-bold text-lg text-gray-800">{textos.titulo}</span>
    </div>
    <div className="text-sm text-gray-700 mb-3">
      <p className="font-medium mb-1">✨ {textos.subtitulo}</p>
      <ul className="text-left space-y-1">
        {textos.bullets.map((b, i) => <li key={i}>• {b}</li>)}
      </ul>
      <div className="mt-2 text-[#7c3aed] font-semibold">{textos.precio}</div>
    </div>
    <a
      href="/pricing"
      className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all text-base flex items-center justify-center gap-2 mb-1"
    >
      <span>✨</span> {textos.cta}
    </a>
    <div className="text-xs text-gray-500 mt-1">{textos.aviso}</div>
  </div>
);

export default PremiumUpsellBlock; 