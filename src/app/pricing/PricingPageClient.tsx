"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";

const PRICES = {
  free: { monthly: 0, annual: 0 },
  pro: { monthly: 10, annual: 96 }, // $8/mes efectivo
};

export default function PricingPageClient() {
  const { isAuthenticated } = useAuth();
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [teamFormData, setTeamFormData] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: '',
    message: '',
  });
  const [teamSubmitted, setTeamSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [userPlan, setUserPlan] = useState<'free' | 'premium'>('free');
  const [loadingPlan, setLoadingPlan] = useState(true);

  // Fetch user plan when authenticated
  useEffect(() => {
    async function fetchUserPlan() {
      if (!isAuthenticated) {
        setUserPlan('free');
        setLoadingPlan(false);
        return;
      }

      try {
        const response = await fetch('/api/user/plan');
        if (response.ok) {
          const data = await response.json();
          setUserPlan(data.plan_type || 'free');
        }
      } catch (error) {
        console.error('Error fetching user plan:', error);
        setUserPlan('free');
      } finally {
        setLoadingPlan(false);
      }
    }
    fetchUserPlan();
  }, [isAuthenticated]);

  // Check if user just logged in and had a pending checkout
  useEffect(() => {
    if (isAuthenticated) {
      const pendingPlan = localStorage.getItem('pending_plan_checkout');
      if (pendingPlan) {
        const planInterval = pendingPlan as 'month' | 'year';
        localStorage.removeItem('pending_plan_checkout');
        // Trigger checkout after a small delay to ensure auth is fully settled
        setTimeout(() => {
          handleCheckout(planInterval);
        }, 500);
      }
    }
  }, [isAuthenticated]);

  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Team contact form:', teamFormData);

    try {
      // TODO: Implement Google Sheets integration
      const response = await fetch('/api/contact-team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamFormData),
      });

      if (response.ok) {
        console.log('Team contact submitted successfully');
        setTeamSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting team contact:', error);
    }
  };

  const handleCheckout = async (planInterval: 'month' | 'year') => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan_interval: planInterval,
        }),
      });

      const { url, error } = await response.json();

      if (error) {
        console.error('Error from API:', error);
        alert('Error al crear la sesión de pago. Por favor, intenta de nuevo.');
        return;
      }

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Error al procesar tu solicitud. Por favor, intenta de nuevo.');
    }
  };

  const handleManageSubscription = async () => {
    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
      });

      const { url, error } = await response.json();

      if (error) {
        console.error('Error from API:', error);
        alert('Error al abrir el portal de gestión. Por favor, intenta de nuevo.');
        return;
      }

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error opening portal:', error);
      alert('Error al procesar tu solicitud. Por favor, intenta de nuevo.');
    }
  };

  const handleProCTAClick = async () => {
    // Si el usuario ya es PRO, ir al portal de gestión
    if (isAuthenticated && userPlan === 'premium') {
      await handleManageSubscription();
      return;
    }

    if (!isAuthenticated) {
      // Save the plan selection and trigger login
      const planInterval = billing === 'monthly' ? 'month' : 'year';
      localStorage.setItem('pending_plan_checkout', planInterval);

      // Trigger Google OAuth login
      const supabase = createClient();
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/pricing`,
        },
      });
    } else {
      // User is authenticated, proceed to checkout
      const planInterval = billing === 'monthly' ? 'month' : 'year';
      await handleCheckout(planInterval);
    }
  };

  const getProCTA = () => {
    // Si el usuario ya es PRO
    if (isAuthenticated && userPlan === 'premium') {
      return (
        <button
          onClick={handleProCTAClick}
          className="mt-auto w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all text-base cursor-pointer"
        >
          ✓ Plan Activo - Gestionar
        </button>
      );
    }

    // Usuario no PRO
    return (
      <button
        onClick={handleProCTAClick}
        className="mt-auto w-full text-center bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all text-base cursor-pointer"
      >
        {isAuthenticated ? 'Actualizar a Pro' : 'Registrate Gratis y Actualiza'}
      </button>
    );
  };

  const faqs = [
    {
      q: "¿Qué métodos de pago aceptan?",
      a: "Aceptamos todas las tarjetas de crédito y débito principales (Visa, Mastercard, American Express) a través de Stripe, nuestra plataforma de pago segura.",
    },
    {
      q: "¿Puedo cancelar en cualquier momento?",
      a: "Sí, puedes cancelar tu suscripción en cualquier momento desde tu dashboard. No hay compromisos ni penalizaciones por cancelación anticipada.",
    },
    {
      q: "¿Qué pasa con mis datos si cancelo?",
      a: "Mantendrás acceso a tu historial durante 30 días después de la cancelación. Pasado ese tiempo, tus datos serán eliminados de nuestros servidores.",
    },
    {
      q: "¿Ofrecen descuentos para estudiantes o educadores?",
      a: "Actualmente estamos trabajando en planes especiales para educación. Contáctanos a través del formulario de Team para más información.",
    },
    {
      q: "¿El plan anual se renueva automáticamente?",
      a: "Sí, el plan anual se renueva automáticamente cada año. Puedes cancelar la renovación automática en cualquier momento desde tu dashboard.",
    },
    {
      q: "¿Puedo cambiar de plan mensual a anual?",
      a: "Sí, puedes cambiar entre planes en cualquier momento. El cambio se aplica en tu próximo ciclo de facturación.",
    },
    {
      q: "¿Los planes incluyen todas las herramientas?",
      a: "Sí, el plan Pro incluye acceso completo a Detector, Humanizador y Parafraseador con todas sus funcionalidades premium.",
    },
    {
      q: "¿Hay límites de uso en el plan Pro?",
      a: "El plan Pro incluye usos ilimitados diarios. Los únicos límites son 15,000 caracteres por análisis individual.",
    },
    {
      q: "¿Qué incluye el plan Team?",
      a: "El plan Team incluye todo lo del plan Pro más gestión de equipo, facturación consolidada, soporte prioritario y opciones de personalización. Contáctanos para un presupuesto personalizado.",
    },
    {
      q: "¿Ofrecen reembolsos?",
      a: "No ofrecemos reembolsos. Al suscribirte, aceptas nuestros términos de servicio y la política de no reembolso. Puedes cancelar tu suscripción en cualquier momento desde el portal de gestión, y mantendrás acceso hasta el final del período pagado.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="gradient-text-primary">Planes y Precios</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Elige el plan perfecto para ti. Desde análisis gratuitos hasta soluciones empresariales completas.
          </p>
        </div>

        {/* Toggle Billing */}
        <div className="flex justify-center items-center mb-12">
          <div className="relative flex bg-violet-100 rounded-full p-1.5 w-[360px] h-14 shadow-md">
            <button
              className={`flex-1 z-10 font-bold text-lg transition-colors duration-200 rounded-full focus:outline-none ${
                billing === 'monthly' ? 'text-white' : 'text-violet-700'
              }`}
              onClick={() => setBilling('monthly')}
            >
              Mensual
            </button>
            <button
              className={`flex-1 z-10 font-bold text-lg transition-colors duration-200 rounded-full focus:outline-none flex items-center justify-center gap-2 ${
                billing === 'annual' ? 'text-white' : 'text-violet-700'
              }`}
              onClick={() => setBilling('annual')}
            >
              Anual
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  billing === 'annual'
                    ? 'bg-white text-violet-600'
                    : 'bg-violet-200 text-violet-700'
                }`}
              >
                AHORRA 20%
              </span>
            </button>
            <span
              className="absolute top-1.5 left-1.5 h-11 w-[calc(50%-6px)] rounded-full bg-gradient-to-r from-violet-600 to-purple-600 transition-all duration-300 shadow-lg"
              style={{
                transform: billing === 'monthly' ? 'translateX(0)' : 'translateX(100%)',
              }}
            />
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* Free Plan */}
          <div className={`bg-white rounded-3xl shadow-xl p-8 flex flex-col items-start border-2 transition-all duration-300 ${
            isAuthenticated && userPlan === 'premium'
              ? 'border-gray-200 opacity-60'
              : 'border-gray-200 hover:border-violet-200'
          }`}>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Free</h2>
              <p className="text-gray-600 text-sm">Perfecto para empezar</p>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-extrabold text-gray-900">$0</span>
              <span className="text-xl text-gray-600">/siempre</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow w-full">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">15 usos diarios</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Hasta 1,200 caracteres</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Modo Estándar</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Gratis siempre</span>
              </li>
            </ul>
            {isAuthenticated && userPlan === 'premium' ? (
              <button
                disabled
                className="w-full text-center bg-gray-300 text-gray-500 font-bold py-3 px-6 rounded-xl shadow-md cursor-not-allowed"
              >
                Tu plan actual es Pro
              </button>
            ) : (
              <a
                href="/"
                className="w-full text-center bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all"
              >
                Empezar Gratis
              </a>
            )}
          </div>

          {/* Pro Plan - POPULAR */}
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-3xl shadow-2xl p-8 flex flex-col items-start border-4 border-violet-500 relative transform scale-105">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg">
              MÁS POPULAR
            </div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Pro
              </h2>
              <p className="text-gray-700 text-sm font-medium">Para profesionales y estudiantes</p>
            </div>
            <div className="mb-2">
              <span className="text-5xl font-extrabold text-gray-900">
                ${billing === 'monthly' ? PRICES.pro.monthly : Math.round(PRICES.pro.annual / 12)}
              </span>
              <span className="text-xl text-gray-600">/mes</span>
            </div>
            {billing === 'annual' && (
              <p className="text-sm text-violet-700 font-semibold mb-6">
                ${PRICES.pro.annual}/año • Ahorra ${PRICES.pro.monthly * 12 - PRICES.pro.annual}
              </p>
            )}
            {billing === 'monthly' && <div className="mb-6" />}
            <ul className="space-y-4 mb-8 flex-grow w-full">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-violet-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-medium">Usos ilimitados</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-violet-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-medium">Hasta 15,000 caracteres</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-violet-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-medium">Subida de archivos (PDF, DOCX, TXT)</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-violet-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-medium">5 modos premium</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-violet-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-medium">Historial completo</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-violet-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-medium">Soporte prioritario</span>
              </li>
            </ul>
            {getProCTA()}
            <p className="text-xs text-gray-600 mt-3 text-center w-full">
              💳 Pago seguro con Stripe
            </p>
          </div>

          {/* Team Plan */}
          <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-start border-2 border-gray-200 hover:border-violet-200 transition-all duration-300">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Team</h2>
              <p className="text-gray-600 text-sm">Para equipos y empresas</p>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-extrabold text-gray-900">Custom</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow w-full">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Todo lo de Pro</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Múltiples usuarios</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Gestión centralizada</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Facturación consolidada</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Soporte dedicado</span>
              </li>
            </ul>
            <button
              onClick={() => setShowTeamModal(true)}
              className="w-full text-center bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all cursor-pointer"
            >
              Contactar Ventas
            </button>
          </div>
        </div>

        {/* Scroll Hint - Ver Comparación */}
        <div className="flex flex-col items-center justify-center py-8 mb-8">
          <p className="text-lg font-semibold text-gray-700 mb-3">
            ¿Querés ver todas las diferencias en detalle?
          </p>
          <button
            onClick={() => {
              const comparisonTable = document.getElementById('comparison-table');
              comparisonTable?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="flex flex-col items-center gap-2 text-violet-600 hover:text-violet-700 transition-all group"
          >
            <span className="font-bold text-base">Ver Comparación Completa</span>
            <svg
              className="w-8 h-8 animate-bounce group-hover:scale-110 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>

        {/* Feature Comparison Table */}
        <div id="comparison-table" className="bg-white rounded-3xl shadow-xl p-8 mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="gradient-text-primary">Comparación Completa</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">Free</th>
                  <th className="text-center py-4 px-4 font-semibold bg-violet-50 text-violet-700 rounded-t-xl">Pro</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">Team</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {/* Detector Features */}
                <tr className="border-b border-gray-100">
                  <td colSpan={4} className="py-3 px-4 font-bold text-gray-900 bg-gray-50">
                    🔍 Detector de IA
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Usos diarios</td>
                  <td className="text-center py-3 px-4 text-gray-900 font-medium">15</td>
                  <td className="text-center py-3 px-4 bg-violet-50 font-semibold text-violet-700">Ilimitado</td>
                  <td className="text-center py-3 px-4 text-gray-900 font-semibold">Ilimitado</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Caracteres por análisis</td>
                  <td className="text-center py-3 px-4 text-gray-900 font-medium">1,200</td>
                  <td className="text-center py-3 px-4 bg-violet-50 font-semibold text-violet-700">15,000</td>
                  <td className="text-center py-3 px-4 text-gray-900 font-semibold">15,000</td>
                </tr>

                {/* Humanizador Features */}
                <tr className="border-b border-gray-100">
                  <td colSpan={4} className="py-3 px-4 font-bold text-gray-900 bg-gray-50">
                    ✨ Humanizador de IA
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Usos diarios</td>
                  <td className="text-center py-3 px-4 text-gray-900 font-medium">15</td>
                  <td className="text-center py-3 px-4 bg-violet-50 font-semibold text-violet-700">Ilimitado</td>
                  <td className="text-center py-3 px-4 text-gray-900 font-semibold">Ilimitado</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Modos disponibles</td>
                  <td className="text-center py-3 px-4 text-gray-900 font-medium">Estándar</td>
                  <td className="text-center py-3 px-4 bg-violet-50 font-semibold text-violet-700">5 modos</td>
                  <td className="text-center py-3 px-4 text-gray-900 font-semibold">5 modos</td>
                </tr>

                {/* Parafraseador Features */}
                <tr className="border-b border-gray-100">
                  <td colSpan={4} className="py-3 px-4 font-bold text-gray-900 bg-gray-50">
                    🔄 Parafraseador
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Usos diarios</td>
                  <td className="text-center py-3 px-4 text-gray-900 font-medium">15</td>
                  <td className="text-center py-3 px-4 bg-violet-50 font-semibold text-violet-700">Ilimitado</td>
                  <td className="text-center py-3 px-4 text-gray-900 font-semibold">Ilimitado</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Modos disponibles</td>
                  <td className="text-center py-3 px-4 text-gray-900 font-medium">Estándar</td>
                  <td className="text-center py-3 px-4 bg-violet-50 font-semibold text-violet-700">5 modos</td>
                  <td className="text-center py-3 px-4 text-gray-900 font-semibold">5 modos</td>
                </tr>

                {/* General Features */}
                <tr className="border-b border-gray-100">
                  <td colSpan={4} className="py-3 px-4 font-bold text-gray-900 bg-gray-50">
                    ⚙️ Características Generales
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Historial</td>
                  <td className="text-center py-3 px-4 text-gray-900 font-medium">❌</td>
                  <td className="text-center py-3 px-4 bg-violet-50 font-semibold text-violet-700">✅</td>
                  <td className="text-center py-3 px-4 text-gray-900 font-semibold">✅</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Subida de archivos</td>
                  <td className="text-center py-3 px-4 text-gray-900 font-medium">❌</td>
                  <td className="text-center py-3 px-4 bg-violet-50 font-semibold text-violet-700">✅ PDF, DOCX, TXT</td>
                  <td className="text-center py-3 px-4 text-gray-900 font-semibold">✅ PDF, DOCX, TXT</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Soporte</td>
                  <td className="text-center py-3 px-4 text-gray-900 font-medium">Email</td>
                  <td className="text-center py-3 px-4 bg-violet-50 font-semibold text-violet-700">Prioritario</td>
                  <td className="text-center py-3 px-4 text-gray-900 font-semibold">Dedicado</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Gestión de equipo</td>
                  <td className="text-center py-3 px-4 text-gray-900 font-medium">❌</td>
                  <td className="text-center py-3 px-4 bg-violet-50">❌</td>
                  <td className="text-center py-3 px-4 text-gray-900 font-semibold">✅</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Facturación consolidada</td>
                  <td className="text-center py-3 px-4 text-gray-900 font-medium">❌</td>
                  <td className="text-center py-3 px-4 bg-violet-50">❌</td>
                  <td className="text-center py-3 px-4 text-gray-900 font-semibold">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text-primary">Lo que dicen</span>
            <span className="text-gray-900"> nuestros usuarios</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Como docente universitario, DetectorDeIA me ha ayudado enormemente a identificar trabajos generados por IA. La precisión en español es excelente y los 5 modos del humanizador son perfectos para enseñar a mis estudiantes."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg">
                  MC
                </div>
                <div>
                  <p className="font-semibold text-gray-900">María Contreras</p>
                  <p className="text-sm text-gray-600">Profesora Universitaria, Argentina</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Uso DetectorDeIA diariamente para verificar el contenido de mi blog. El plan Pro vale cada centavo - los usos ilimitados y los 5 modos del parafraseador me ahorran horas de trabajo manual."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center text-white font-bold text-lg">
                  JR
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Javier Rodríguez</p>
                  <p className="text-sm text-gray-600">Creador de Contenido, México</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Impresionante herramienta para estudiantes. El modo académico del humanizador me ayuda a reescribir mis ensayos manteniendo el rigor académico. 100% recomendado."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center text-white font-bold text-lg">
                  SP
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sofía Paredes</p>
                  <p className="text-sm text-gray-600">Estudiante de Maestría, España</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Para nuestra agencia de marketing, el plan Team es perfecto. Gestión centralizada, facturación simple y todos los miembros del equipo pueden usar las herramientas sin límites."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg">
                  LM
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Luis Mendoza</p>
                  <p className="text-sm text-gray-600">Director de Marketing, Colombia</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text-primary">Preguntas</span>
            <span className="text-gray-900"> Frecuentes</span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <svg
                    className={`w-6 h-6 text-violet-600 flex-shrink-0 transition-transform ${
                      faqOpen === index ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {faqOpen === index && (
                  <div className="px-6 pb-6 text-gray-700">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Contact Modal */}
      {showTeamModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md relative">
            <button
              onClick={() => {
                setShowTeamModal(false);
                setTeamSubmitted(false);
                setTeamFormData({ name: '', email: '', company: '', teamSize: '', message: '' });
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>

            {teamSubmitted ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Gracias por tu interés!</h3>
                <p className="text-gray-600">
                  Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Contactar Ventas</h3>
                <p className="text-gray-600 mb-6">
                  Cuéntanos sobre tu equipo y te enviaremos una propuesta personalizada.
                </p>
                <form onSubmit={handleTeamSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={teamFormData.name}
                      onChange={(e) => setTeamFormData({ ...teamFormData, name: e.target.value })}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Email corporativo *
                    </label>
                    <input
                      type="email"
                      required
                      value={teamFormData.email}
                      onChange={(e) => setTeamFormData({ ...teamFormData, email: e.target.value })}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Empresa
                    </label>
                    <input
                      type="text"
                      value={teamFormData.company}
                      onChange={(e) => setTeamFormData({ ...teamFormData, company: e.target.value })}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Tamaño del equipo *
                    </label>
                    <select
                      required
                      value={teamFormData.teamSize}
                      onChange={(e) => setTeamFormData({ ...teamFormData, teamSize: e.target.value })}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    >
                      <option value="">Selecciona...</option>
                      <option value="2-5">2-5 personas</option>
                      <option value="6-10">6-10 personas</option>
                      <option value="11-25">11-25 personas</option>
                      <option value="26-50">26-50 personas</option>
                      <option value="50+">Más de 50 personas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Mensaje (opcional)
                    </label>
                    <textarea
                      value={teamFormData.message}
                      onChange={(e) => setTeamFormData({ ...teamFormData, message: e.target.value })}
                      rows={3}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      placeholder="Cuéntanos tus necesidades específicas..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Enviar Solicitud
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
