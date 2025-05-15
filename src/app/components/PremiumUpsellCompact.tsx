import React from 'react';

interface PremiumUpsellCompactProps {
  textos: {
    titulo: string;
    bullets: string[];
    cta: string;
    aviso: string;
  };
}

const PremiumUpsellCompact: React.FC<PremiumUpsellCompactProps> = ({ textos }) => (
  <div className="mt-6 mb-2 bg-white border border-[#e9d5ff] rounded-xl shadow p-4 flex flex-col items-center text-center">
    <div className="flex items-center gap-2 mb-1">
      <span className="text-xl text-[#a259f7]">🔒</span>
      <span className="font-bold text-base text-gray-800">{textos.titulo}</span>
    </div>
    <div className="text-xs text-gray-700 mb-2">
      <ul className="text-left space-y-1">
        {textos.bullets.map((b, i) => <li key={i}>• {b}</li>)}
      </ul>
    </div>
    <a
      href="/pricing"
      className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold py-2 px-4 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 mb-1"
    >
      <span>✨</span> {textos.cta}
    </a>
    <div className="text-xs text-gray-500">{textos.aviso}</div>
  </div>
);

export default PremiumUpsellCompact; 