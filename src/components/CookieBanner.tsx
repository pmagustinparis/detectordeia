'use client';
import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setVisible(true);
  }, []);
  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };
  const reject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setVisible(false);
  };
  if (!visible) return null;
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg z-50 flex flex-col md:flex-row items-center justify-between px-4 py-3 gap-2">
      <span className="text-sm text-gray-700">Usamos cookies propias y de terceros (Google Analytics) para mejorar tu experiencia y analizar el uso del sitio. Puedes aceptar o rechazar las cookies no esenciales.</span>
      <div className="flex gap-2 mt-2 md:mt-0">
        <button onClick={accept} className="bg-[#a259f7] hover:bg-[#7c3aed] text-white font-bold py-2 px-4 rounded-lg text-sm">Aceptar</button>
        <button onClick={reject} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg text-sm">Rechazar</button>
      </div>
    </div>
  );
} 