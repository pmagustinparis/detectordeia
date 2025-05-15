'use client';
import { useState } from 'react';

export default function CaptureEmail() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación: mostrar en consola
    console.log('Nuevo interesado en planes pagos:', email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
        <h1 className="text-2xl font-extrabold text-[#a259f7] mb-2 text-center">¿Te interesan los planes premium?</h1>
        <p className="text-gray-700 mb-6 text-center">Dejanos tu email y te avisamos cuando estén disponibles. Además, podrás participar en la beta y recibir beneficios exclusivos.</p>
        {submitted ? (
          <div className="text-green-600 font-bold text-center">¡Gracias! Te avisaremos cuando lancemos los planes premium 🚀</div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <input
              type="email"
              required
              placeholder="Tu email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#a259f7]"
            />
            <button type="submit" className="bg-[#a259f7] hover:bg-[#7c3aed] text-white font-bold py-3 rounded-lg transition-all text-base">Quiero enterarme</button>
          </form>
        )}
      </div>
    </div>
  );
} 