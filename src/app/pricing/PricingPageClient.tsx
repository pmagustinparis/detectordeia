"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { trackEvent } from "@/lib/analytics/client";

const PRICES = {
  express: { '24h': 3.99, '7d': 8.99 },
  semestral: 24.99,
  premium: { month: 12.99, year: 124.68 },
};

type PlanType = 'express' | 'semestral' | 'premium';

function CheckIcon({ amber = false }) {
  return (
    <svg className={`w-5 h-5 flex-shrink-0 ${amber ? 'text-amber-400' : 'text-emerald-500'}`} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}

export default function PricingPageClient() {
  const { isAuthenticated } = useAuth();
  const [expressDuration, setExpressDuration] = useState<'24h' | '7d'>('24h');
  const [premiumInterval, setPremiumInterval] = useState<'month' | 'year'>('month');
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

  useEffect(() => {
    if (!isAuthenticated) return;
    const pending = localStorage.getItem('pending_plan_type') as PlanType | null;
    const duration = localStorage.getItem('pending_express_duration') as '24h' | '7d' | null;
    const interval = localStorage.getItem('pending_plan_checkout') as 'month' | 'year' | null;
    if (!pending) return;
    localStorage.removeItem('pending_plan_type');
    localStorage.removeItem('pending_express_duration');
    localStorage.removeItem('pending_plan_checkout');
    setTimeout(() => {
      if (pending === 'express') triggerCheckout('express', duration || '24h');
      else if (pending === 'semestral') triggerCheckout('semestral');
      else if (pending === 'premium') triggerCheckout('premium', interval || 'month');
    }, 500);
  }, [isAuthenticated]);

  const triggerCheckout = async (plan: PlanType, option?: string) => {
    setLoadingCheckout(plan + (option || ''));
    const duration = plan === 'express' ? (option as '24h' | '7d') : undefined;
    const plan_interval = plan === 'premium' ? (option as 'month' | 'year') : undefined;
    const price = plan === 'express' ? PRICES.express[duration || '24h']
      : plan === 'semestral' ? PRICES.semestral
      : plan_interval === 'year' ? PRICES.premium.year : PRICES.premium.month;

    trackEvent({ eventType: 'checkout_started', metadata: { plan_type: plan, duration, plan_interval, price } });

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan_type: plan, ...(duration && { duration }), ...(plan_interval && { plan_interval }) }),
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
    if (!isAuthenticated) {
      localStorage.setItem('pending_plan_type', plan);
      if (plan === 'express') localStorage.setItem('pending_express_duration', option || '24h');
      if (plan === 'premium') localStorage.setItem('pending_plan_checkout', option || 'month');
      window.location.href = '/auth/signup?next=/pricing';
      return;
    }
    triggerCheckout(plan, option);
  };

  const faqs = [
    {
      q: "¿Es seguro pagar aquí? ¿Quién procesa el pago?",
      a: "El pago es procesado íntegramente por Stripe, la plataforma de pagos usada por Amazon, Google y Spotify. Detectordeia.ai nunca ve ni almacena tus datos de tarjeta. Toda la transacción ocurre en los servidores de Stripe con encriptación de extremo a extremo.",
    },
    {
      q: "¿El Semestral se renueva automáticamente?",
      a: "No. El Semestral Pass es un pago único de $24.99 que te da acceso completo por 6 meses. No hay cargos automáticos ni sorpresas. Cuando expire, podés renovar manualmente si querés.",
    },
    {
      q: "¿Qué diferencia hay entre Express y Semestral?",
      a: "Express es para necesidades puntuales: 24 horas ($3.99) o 7 días ($8.99), pago único. Semestral es para los próximos 6 meses: acceso completo por $24.99, también pago único sin renovación automática. Premium es la opción para uso frecuente y continuo con facturación mensual o anual.",
    },
    {
      q: "¿Qué incluyen Express, Semestral y Premium?",
      a: "Los tres incluyen exactamente las mismas funcionalidades: detector, humanizador y parafraseador sin límites de caracteres, todos los modos premium, subida de archivos y historial completo. La diferencia es solo la duración y el modelo de pago.",
    },
    {
      q: "¿El Generador de Citas es gratis?",
      a: "Sí. El Generador de Citas (APA 7ª, MLA 9, Chicago) es gratuito e ilimitado para todos los usuarios, sin necesidad de registro.",
    },
    {
      q: "¿Puedo comprar otro Express si ya tengo uno activo?",
      a: "Sí, el tiempo se acumula. Si te quedan 2 horas y comprás otro 24h, tendrás 26 horas en total.",
    },
    {
      q: "¿Puedo cancelar Premium en cualquier momento?",
      a: "Sí, sin penalizaciones. Tu acceso se mantiene hasta el fin del período ya pagado.",
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">

      {/* 1. Header — beneficio universal, pre-empta confianza */}
      <div className="max-w-4xl mx-auto pt-14 pb-6 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-3">
          Acceso completo, cuando lo necesitás
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Pago único sin renovación automática, o suscripción mensual. Sin sorpresas, sin compromisos forzados.
        </p>
      </div>

      {/* 4. Trust signals */}
      <div className="max-w-3xl mx-auto px-4 mb-10">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-500">
          <span className="flex items-center gap-1.5"><CheckIcon /> +2.000 usuarios activos</span>
          <span className="flex items-center gap-1.5"><CheckIcon /> Pagos procesados por Stripe</span>
          <span className="flex items-center gap-1.5"><CheckIcon /> Sin renovación automática en Express y Semestral</span>
        </div>
      </div>

      {/* Cards — 7. orden mobile: Semestral primero */}
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-6 mb-16">

        {/* EXPRESS PASS — md:order-1, mobile order-2 */}
        <div className="bg-white border border-gray-200 rounded-2xl p-7 flex flex-col shadow-sm md:order-1 order-2">
          <div className="mb-5">
            {/* 2. Frame Express: "Para una necesidad urgente" */}
            <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">Para una necesidad urgente</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Express Pass</h2>
            <p className="text-sm text-gray-500">Acceso completo · Pago único · Sin renovación</p>
          </div>

          {/* Toggle 24h / 7d */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setExpressDuration('24h')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${
                expressDuration === '24h' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              24 Horas
            </button>
            <button
              onClick={() => setExpressDuration('7d')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${
                expressDuration === '7d' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              7 Días
            </button>
          </div>

          <div className="mb-1">
            <span className="text-4xl font-bold text-gray-900">
              ${expressDuration === '24h' ? '3.99' : '8.99'}
            </span>
            <span className="text-gray-500 text-sm ml-1">
              {expressDuration === '24h' ? '/ 24 horas' : '/ 7 días'}
            </span>
          </div>
          {expressDuration === '7d' && (
            <p className="text-xs text-amber-600 font-semibold mb-4">Ahorrás 68% vs 7 días individuales</p>
          )}
          {expressDuration === '24h' && (
            <p className="text-xs text-gray-400 mb-4">Para una necesidad puntual o urgente</p>
          )}

          <ul className="space-y-2.5 mb-6 flex-grow text-sm text-gray-700">
            <li className="flex items-center gap-2"><CheckIcon /> Detector · Humanizador · Parafraseador</li>
            <li className="flex items-center gap-2"><CheckIcon /> Caracteres y usos ilimitados</li>
            <li className="flex items-center gap-2"><CheckIcon /> Todos los modos premium</li>
            <li className="flex items-center gap-2"><CheckIcon /> Subida de archivos (PDF, DOCX, TXT)</li>
          </ul>

          <button
            onClick={() => handleCTA('express', expressDuration)}
            disabled={loadingCheckout === 'express' + expressDuration}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-60 text-sm"
          >
            {loadingCheckout?.startsWith('express') ? 'Procesando...' : `⚡ Activar Express Pass · $${PRICES.express[expressDuration]}`}
          </button>
          <p className="text-xs text-center text-gray-400 mt-2">Pago seguro con Stripe</p>
        </div>

        {/* SEMESTRAL PASS — md:order-2, mobile order-1 (primero en mobile) */}
        <div className="bg-blue-900 rounded-2xl p-7 flex flex-col shadow-lg relative md:order-2 order-1">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span className="bg-amber-400 text-blue-900 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow">
              MÁS POPULAR
            </span>
          </div>

          <div className="mb-5 mt-2">
            {/* 2. Frame Semestral: "Para los próximos 6 meses" */}
            <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">Para los próximos 6 meses</p>
            <h2 className="text-2xl font-bold mb-1" style={{color: '#ffffff'}}>Semestral Pass</h2>
            <p className="text-sm text-blue-200">6 meses · Pago único · Sin renovación automática</p>
          </div>

          <div className="mb-1">
            <span className="text-4xl font-bold text-white">$24.99</span>
            <span className="text-blue-300 text-sm ml-1">/ 6 meses</span>
          </div>
          <p className="text-xs text-amber-400 font-semibold mb-4">Equivale a $4.17/mes · Ahorrás 68% vs mensual</p>

          <ul className="space-y-2.5 mb-6 flex-grow text-sm text-blue-100">
            <li className="flex items-center gap-2"><CheckIcon amber /> Detector · Humanizador · Parafraseador</li>
            <li className="flex items-center gap-2"><CheckIcon amber /> Caracteres y usos ilimitados</li>
            <li className="flex items-center gap-2"><CheckIcon amber /> Todos los modos premium</li>
            <li className="flex items-center gap-2"><CheckIcon amber /> Subida de archivos (PDF, DOCX, TXT)</li>
            <li className="flex items-center gap-2"><CheckIcon amber /> Historial completo (100 usos · 30 días)</li>
            <li className="flex items-center gap-2"><CheckIcon amber /> Sin renovación automática</li>
          </ul>

          <button
            onClick={() => handleCTA('semestral')}
            disabled={loadingCheckout === 'semestral'}
            className="w-full bg-white hover:bg-gray-50 text-blue-900 font-bold py-3 rounded-xl transition-all disabled:opacity-60 text-sm shadow-sm"
          >
            {loadingCheckout === 'semestral' ? 'Procesando...' : 'Activar Semestral Pass · $24.99'}
          </button>
          <p className="text-xs text-center text-blue-300 mt-2">Pago seguro con Stripe</p>
        </div>

        {/* PREMIUM — md:order-3, mobile order-3 */}
        <div className="bg-white border border-gray-200 rounded-2xl p-7 flex flex-col shadow-sm md:order-3 order-3">
          <div className="mb-5">
            {/* 2. Frame Premium: "Para uso frecuente y continuo" */}
            <p className="text-xs font-bold text-blue-900 uppercase tracking-widest mb-2">Para uso frecuente y continuo</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Premium</h2>
            <p className="text-sm text-gray-500">Acceso continuo · Sin interrupciones</p>
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setPremiumInterval('month')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${
                premiumInterval === 'month' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setPremiumInterval('year')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${
                premiumInterval === 'year' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Anual <span className="text-emerald-500">-20%</span>
            </button>
          </div>

          <div className="mb-1">
            <span className="text-4xl font-bold text-gray-900">
              ${premiumInterval === 'month' ? '12.99' : '10.39'}
            </span>
            <span className="text-gray-500 text-sm ml-1">/mes</span>
          </div>
          {premiumInterval === 'year' && (
            <p className="text-xs text-emerald-600 font-semibold mb-4">$124.68/año · Ahorrás $31.20</p>
          )}
          {premiumInterval === 'month' && (
            <p className="text-xs text-gray-400 mb-4">Cancelá cuando quieras, sin penalizaciones</p>
          )}

          <ul className="space-y-2.5 mb-6 flex-grow text-sm text-gray-700">
            <li className="flex items-center gap-2"><CheckIcon /> Detector · Humanizador · Parafraseador</li>
            <li className="flex items-center gap-2"><CheckIcon /> Caracteres y usos ilimitados</li>
            <li className="flex items-center gap-2"><CheckIcon /> Todos los modos premium</li>
            <li className="flex items-center gap-2"><CheckIcon /> Subida de archivos (PDF, DOCX, TXT)</li>
            <li className="flex items-center gap-2"><CheckIcon /> Historial completo (100 usos · 30 días)</li>
          </ul>

          {isAuthenticated && userPlan === 'premium' ? (
            <button
              onClick={async () => {
                const res = await fetch('/api/create-portal-session', { method: 'POST' });
                const { url } = await res.json();
                if (url) window.location.href = url;
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all text-sm"
            >
              ✓ Plan Activo — Gestionar
            </button>
          ) : (
            <button
              onClick={() => handleCTA('premium', premiumInterval)}
              disabled={loadingCheckout === 'premium'}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-60 text-sm"
            >
              {loadingCheckout === 'premium' ? 'Procesando...' : isAuthenticated ? 'Activar Premium' : 'Registrate y Activar'}
            </button>
          )}
          <p className="text-xs text-center text-gray-400 mt-2">Pago seguro con Stripe</p>
        </div>
      </div>

      {/* 5. Free tier — mensaje positivo, no dubitativo */}
      <div className="max-w-2xl mx-auto px-4 mb-16 text-center">
        <p className="text-sm text-gray-500">
          Podés empezar gratis hoy — 15 análisis diarios con el Detector, 3 usos del Humanizador y Generador de Citas ilimitado, sin tarjeta.{' '}
          <a href="/" className="text-blue-900 font-semibold hover:underline">Probarlo ahora →</a>
        </p>
      </div>

      {/* 6. FAQs — seguridad primero */}
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-sm pr-4">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${faqOpen === i ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {faqOpen === i && (
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
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
