"use client";
import { useState } from "react";

const PRICES = {
  free: { monthly: 0, annual: 0 },
  starter: { monthly: 7, annual: 7 * 12 * 0.8 },
  pro: { monthly: 12, annual: 12 * 12 * 0.8 },
};

export default function PricingPageClient() { // Renombrado
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [showModal, setShowModal] = useState(false);
  const [modalPlan, setModalPlan] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const openModal = (plan: string) => {
    setModalPlan(plan);
    setShowModal(true);
    setEmail('');
    setSubmitted(false);
  };
  const closeModal = () => setShowModal(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Interesado en ${modalPlan}:`, email);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, plan: modalPlan }),
      });

      if (response.ok) {
        console.log('Suscripción exitosa');
      } else {
        console.error('Error en la suscripción:', await response.text());
      }
    } catch (error) {
      console.error('Error de red o al enviar la suscripción:', error);
    }
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-extrabold text-center text-[#a259f7] mb-4">Planes Premium de Detector de IA</h1>
      <p className="text-lg text-gray-700 text-center mb-8 max-w-2xl mx-auto">
        Elige el plan que mejor se adapta a tus necesidades y accede a <strong>análisis avanzados</strong>, <strong>subida de archivos</strong>, <strong>reportes detallados</strong> y mucho más. Optimizado para profesionales, empresas y educación en español. Mejora la detección de IA en tus textos y obtén resultados confiables en segundos.
      </p>
      <div className="flex justify-center items-center mb-10">
        <div className="relative flex bg-[#e9d5ff] rounded-full p-1 w-[320px] h-12 shadow-sm">
          <button
            className={`flex-1 z-10 font-bold text-base md:text-lg transition-colors duration-200 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a259f7] ${billing === 'monthly' ? 'text-white' : 'text-[#a259f7]'}`}
            style={{ position: 'relative' }}
            aria-pressed={billing === 'monthly'}
            onClick={() => setBilling('monthly')}
          >
            Mensual
          </button>
          <button
            className={`flex-1 z-10 font-bold text-base md:text-lg transition-colors duration-200 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a259f7] flex items-center justify-center gap-2 ${billing === 'annual' ? 'text-white' : 'text-[#a259f7]'}`}
            style={{ position: 'relative' }}
            aria-pressed={billing === 'annual'}
            onClick={() => setBilling('annual')}
          >
            Anual
            <span className={`ml-1 text-xs font-semibold px-2 py-0.5 rounded-full ${billing === 'annual' ? 'bg-white text-[#a259f7]' : 'bg-[#a259f7]/10 text-[#a259f7]'}`}>20% OFF</span>
          </button>
          <span
            className="absolute top-1 left-1 h-10 w-[calc(50%-4px)] rounded-full bg-[#a259f7] transition-all duration-300"
            style={{
              transform: billing === 'monthly' ? 'translateX(0)' : 'translateX(100%)',
            }}
            aria-hidden="true"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-[#e9d5ff]">
          <h2 className="text-2xl font-bold text-[#a259f7] mb-2">Gratis</h2>
          <div className="flex flex-col items-center mb-1">
            <span className="text-4xl font-extrabold text-gray-900 leading-tight">
              $0
              <span className="text-lg font-normal text-gray-700">/siempre</span>
            </span>
          </div>
          <ul className="text-base text-gray-700 mb-4 mt-2 space-y-1 text-left w-full max-w-xs">
            <li>Hasta 5.000 caracteres por análisis</li>
            <li>Hasta 10 análisis diarios</li>
            <li>Pegar texto directamente</li>
            <li>Resultado básico</li>
            <li>Sin historial</li>
            <li>Sin login requerido</li>
          </ul>
          <a href="/#detector" className="mt-auto bg-[#a259f7] hover:bg-[#7c3aed] text-white font-bold py-2 px-6 rounded-xl shadow-md transition-all text-base">Empezar Gratis</a>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-[#e9d5ff]">
          <h2 className="text-2xl font-bold text-[#a259f7] mb-2">Starter</h2>
          <div className="flex flex-col items-center mb-1">
            <span className="text-4xl font-extrabold text-gray-900 leading-tight">
              ${billing === 'monthly' ? PRICES.starter.monthly : PRICES.starter.annual.toFixed(0)}
              <span className="text-lg font-normal text-gray-700">/{billing === 'monthly' ? 'mes' : 'año'}</span>
            </span>
            {billing === 'annual' && (
              <span className="text-xs text-gray-500 line-through">${(PRICES.starter.monthly * 12).toFixed(0)}/año</span>
            )}
          </div>
          <ul className="text-base text-gray-700 mb-4 mt-2 space-y-1 text-left w-full max-w-xs">
            <li>Hasta 15.000 caracteres por análisis</li>
            <li>Hasta 50 análisis diarios</li>
            <li>Subida de archivo .txt, .docx, .pdf</li>
            <li>Reporte detallado por sección</li>
            <li>Historial de análisis de 7 días</li>
            <li>Login seguro vía Magic Link</li>
          </ul>
          <button
            onClick={() => openModal('Starter')}
            className="mt-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl shadow-md transition-all text-base"
          >
            Avísame cuando esté disponible
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">Este plan estará disponible próximamente</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-[#e9d5ff]">
          <h2 className="text-2xl font-bold text-[#a259f7] mb-2">Pro</h2>
          <div className="flex flex-col items-center mb-1">
            <span className="text-4xl font-extrabold text-gray-900 leading-tight">
              ${billing === 'monthly' ? PRICES.pro.monthly : PRICES.pro.annual.toFixed(0)}
              <span className="text-lg font-normal text-gray-700">/{billing === 'monthly' ? 'mes' : 'año'}</span>
            </span>
            {billing === 'annual' && (
              <span className="text-xs text-gray-500 line-through">${(PRICES.pro.monthly * 12).toFixed(0)}/año</span>
            )}
          </div>
          <ul className="text-base text-gray-700 mb-4 mt-2 space-y-1 text-left w-full max-w-xs">
            <li>Hasta 50.000 caracteres por análisis</li>
            <li>Análisis diarios ilimitados</li>
            <li>Carga múltiple de archivos</li>
            <li>Reporte detallado ampliado</li>
            <li>Historial de 30 días</li>
            <li>Humanizador IA y API (próximamente)</li>
          </ul>
          <button
            onClick={() => openModal('Pro')}
            className="mt-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl shadow-md transition-all text-base"
          >
            Avísame cuando esté disponible
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">Este plan estará disponible próximamente</p>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-xs flex flex-col items-center relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl">×</button>
            <h3 className="text-lg font-bold mb-2 text-[#a259f7]">¿Te avisamos cuando {modalPlan} esté disponible?</h3>
            {submitted ? (
              <p className="text-green-600 font-bold text-center mt-2">¡Te avisaremos!</p>
            ) : (
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 mt-2">
                <input
                  type="email"
                  required
                  placeholder="Tu email..."
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#a259f7] placeholder-gray-700 font-semibold text-gray-800"
                />
                <button type="submit" className="bg-[#a259f7] hover:bg-[#7c3aed] text-white font-bold py-2 rounded-lg transition-all text-base">Avisame</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 