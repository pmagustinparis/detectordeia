"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { trackEvent } from "@/lib/analytics/client";

const PRICES = {
  express: { '24h': 1.99, '7d': 8.99 },
  semestral: 24.99,
};

type PlanType = 'express' | 'semestral';

function CheckIcon({ verde = false }) {
  return (
    <svg className={`w-5 h-5 flex-shrink-0 ${verde ? 'text-verde-soft' : 'text-verde'}`} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}

export default function PricingPageClient() {
  const { isAuthenticated } = useAuth();
  const [expressDuration, setExpressDuration] = useState<'24h' | '7d'>('24h');
  const [userPlan, setUserPlan] = useState<string>('free');
  const [loadingCheckout, setLoadingCheckout] = useState<string | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    trackEvent({ eventType: 'pricing_page_visited', metadata: { referrer: document.referrer || 'direct' } });
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetch('/api/user/plan').then(r => r.json()).then(d => setUserPlan(d.plan_type || 'free')).catch(() => {});
  }, [isAuthenticated]);


  const triggerCheckout = async (plan: PlanType, option?: string) => {
    setLoadingCheckout(plan + (option || ''));
    const duration = plan === 'express' ? (option as '24h' | '7d') : undefined;
    const price = plan === 'express' ? PRICES.express[duration || '24h'] : PRICES.semestral;

    trackEvent({ eventType: 'checkout_started', metadata: { plan_type: plan, duration, price } });

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan_type: plan, ...(duration && { duration }) }),
      });
      const { url, error } = await res.json();
      if (error) { alert('Error al crear la sesión de pago. Intentá de nuevo.'); return; }
      if (url) window.location.href = url;
    } catch {
      alert('Error al procesar tu solicitud. Intentá de nuevo.');
    } finally {
      setLoadingCheckout(null);
    }
  };

  const handleCTA = (plan: PlanType, option?: string) => {
    triggerCheckout(plan, option);
  };

  const faqs = [
    {
      q: "¿Es seguro pagar aquí? ¿Quién procesa el pago?",
      a: "El pago es procesado íntegramente por Stripe, la plataforma de pagos usada por Amazon, Google y Spotify. Detectordeia.ai nunca ve ni almacena tus datos de tarjeta. Toda la transacción ocurre en los servidores de Stripe con encriptación de extremo a extremo.",
    },
    {
      q: "¿El Express se renueva automáticamente?",
      a: "No. El Express Pass es un pago único (24 horas por $1.99 o 7 días por $8.99). No hay cargos automáticos ni suscripción ni sorpresas. Cuando expire, podés volver a comprarlo si lo necesitás.",
    },
    {
      q: "¿Qué diferencia hay entre 24 horas y 7 días?",
      a: "Es solo la duración del acceso. 24 horas ($1.99) es ideal para una entrega puntual; 7 días ($8.99) conviene si tenés varios trabajos esta semana. Los dos incluyen exactamente las mismas funcionalidades.",
    },
    {
      q: "¿Qué incluye el Express Pass?",
      a: "Incluye todo: detector, humanizador y parafraseador sin límites de caracteres, todos los modos premium, subida de archivos (PDF, DOCX, TXT) y usos ilimitados durante el período activo.",
    },
    {
      q: "¿El Generador de Citas es gratis?",
      a: "Sí. El Generador de Citas (APA 7ª, MLA 9, Chicago) es gratuito e ilimitado para todos los usuarios, sin necesidad de registro.",
    },
    {
      q: "¿Puedo comprar otro Express si ya tengo uno activo?",
      a: "Sí, el tiempo se acumula. Si te quedan 2 horas y comprás otro 24h, tendrás 26 horas en total.",
    },
  ];

  return (
    <div className="min-h-screen bg-papel pb-20">

      {/* Header */}
      <div className="max-w-4xl mx-auto pt-14 pb-6 px-4 text-center">
        <h1 className="text-4xl md:text-5xl text-tinta mb-3">
          Acceso completo, cuando lo necesitás
        </h1>
        <p className="text-lg text-mute max-w-xl mx-auto">
          Pago único sin renovación automática. Sin sorpresas, sin compromisos.
        </p>
      </div>

      {/* Trust signals */}
      <div className="max-w-3xl mx-auto px-4 mb-10">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-mute">
          <span className="flex items-center gap-1.5"><CheckIcon /> +2.000 usuarios activos</span>
          <span className="flex items-center gap-1.5"><CheckIcon /> Pagos procesados por Stripe</span>
          <span className="flex items-center gap-1.5"><CheckIcon /> Pago único · sin renovación automática</span>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-md mx-auto px-4 mb-16">

        {/* EXPRESS PASS */}
        <div className="bg-papel-2 border border-line rounded-2xl p-7 flex flex-col shadow-sm">
          <div className="mb-5">
            <p className="font-mono text-xs font-medium text-mute uppercase tracking-widest mb-2">Acceso completo, pago único</p>
            <h2 className="text-2xl text-tinta mb-1">Express Pass</h2>
            <p className="text-sm text-mute">Todas las herramientas sin límites · Sin renovación</p>
          </div>

          {/* Toggle 24h / 7d */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setExpressDuration('24h')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                expressDuration === '24h'
                  ? 'bg-tinta text-papel'
                  : 'bg-papel-3 text-mute hover:bg-papel-3 hover:text-tinta-soft'
              }`}
            >
              24 Horas
            </button>
            <button
              onClick={() => setExpressDuration('7d')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                expressDuration === '7d'
                  ? 'bg-tinta text-papel'
                  : 'bg-papel-3 text-mute hover:bg-papel-3 hover:text-tinta-soft'
              }`}
            >
              7 Días
            </button>
          </div>

          <div className="mb-1 flex items-baseline gap-2">
            <span className="font-mono text-4xl font-medium text-tinta">
              ${expressDuration === '24h' ? '1.99' : '8.99'}
            </span>
            {expressDuration === '24h' && (
              <span className="font-mono text-xl text-mute line-through">$3.99</span>
            )}
            <span className="text-mute text-sm">
              {expressDuration === '24h' ? '/ 24 horas' : '/ 7 días'}
            </span>
          </div>
          {expressDuration === '7d' && (
            <p className="text-xs text-verde font-medium mb-4">Ahorrás 68% vs 7 días individuales</p>
          )}
          {expressDuration === '24h' && (
            <p className="text-xs font-semibold text-orange-600 mb-4">Oferta de lanzamiento · 50% off</p>
          )}

          {/* Ancla de precio */}
          <div className="bg-papel-3 border border-line rounded-xl px-4 py-2.5 mb-5 flex items-center justify-between text-xs">
            <span className="text-mute">Mismas funciones, acceso de 6 meses</span>
            <span className="text-mute line-through">$24.99</span>
          </div>

          <ul className="space-y-2.5 mb-6 flex-grow text-sm text-tinta-soft">
            <li className="flex items-center gap-2"><CheckIcon /> Detector · Humanizador · Parafraseador</li>
            <li className="flex items-center gap-2"><CheckIcon /> Caracteres y usos ilimitados</li>
            <li className="flex items-center gap-2"><CheckIcon /> Todos los modos premium</li>
            <li className="flex items-center gap-2"><CheckIcon /> Subida de archivos (PDF, DOCX, TXT)</li>
          </ul>

          <button
            onClick={() => handleCTA('express', expressDuration)}
            disabled={loadingCheckout === 'express' + expressDuration}
            className="w-full bg-tinta hover:bg-tinta-soft text-papel font-medium py-3 rounded-xl transition-all disabled:opacity-60 text-sm"
          >
            {loadingCheckout?.startsWith('express') ? 'Procesando...' : `Activar Express Pass · $${PRICES.express[expressDuration]}`}
          </button>
          <p className="text-xs text-center text-mute mt-2">Pago seguro con Stripe</p>
        </div>

      </div>

      {/* FAQs */}
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-2xl text-tinta mb-6 text-center">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-line rounded-xl overflow-hidden">
              <button
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-papel-2 transition-colors"
              >
                <span className="font-medium text-tinta text-sm pr-4">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-mute flex-shrink-0 transition-transform ${faqOpen === i ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {faqOpen === i && (
                <div className="px-5 pb-5 text-sm text-tinta-soft leading-relaxed border-t border-line-soft pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
