"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";
import { trackEvent } from "@/lib/analytics/client";

const PRICES = {
  free: { monthly: 0, annual: 0 },
  express: 3.99, // Pago único 24h
  pro: { monthly: 12.99, annual: 124.68 }, // $10.39/mes efectivo con 20% descuento
};

export default function PricingPageClient() {
  const { isAuthenticated } = useAuth();
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [userPlan, setUserPlan] = useState<'free' | 'premium'>('free');
  const [loadingPlan, setLoadingPlan] = useState(true);

  // Track pricing page visit
  useEffect(() => {
    trackEvent({
      eventType: 'pricing_page_visited',
      metadata: {
        referrer: document.referrer || 'direct',
        is_authenticated: isAuthenticated,
        current_plan: userPlan,
      }
    });
  }, []); // Solo al montar

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
      const pendingPlanType = localStorage.getItem('pending_plan_type');
      const pendingPlanInterval = localStorage.getItem('pending_plan_checkout');

      if (pendingPlanType) {
        const planType = pendingPlanType as 'express' | 'premium';
        const planInterval = pendingPlanInterval as 'month' | 'year' | null;

        localStorage.removeItem('pending_plan_type');
        localStorage.removeItem('pending_plan_checkout');

        // Trigger checkout after a small delay to ensure auth is fully settled
        setTimeout(() => {
          if (planType === 'express') {
            handleCheckout('express');
          } else if (planInterval) {
            handleCheckout('premium', planInterval);
          }
        }, 500);
      }
    }
  }, [isAuthenticated]);

  const handleCheckout = async (planType: 'express' | 'premium', planInterval?: 'month' | 'year') => {
    // Track checkout initiation
    trackEvent({
      eventType: 'checkout_started',
      metadata: {
        plan_type: planType,
        ...(planInterval && { plan_interval: planInterval }),
        price: planType === 'express'
          ? PRICES.express
          : (planInterval === 'month' ? PRICES.pro.monthly : PRICES.pro.annual),
        is_authenticated: isAuthenticated,
        current_plan: userPlan,
      }
    });

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan_type: planType,
          ...(planInterval && { plan_interval: planInterval }),
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
      // Save the plan selection and redirect to signup
      const planInterval = billing === 'monthly' ? 'month' : 'year';
      localStorage.setItem('pending_plan_checkout', planInterval);
      localStorage.setItem('pending_plan_type', 'premium');

      // Redirect to signup page
      window.location.href = '/auth/signup';
    } else {
      // User is authenticated, proceed to checkout
      const planInterval = billing === 'monthly' ? 'month' : 'year';
      await handleCheckout('premium', planInterval);
    }
  };

  const handleExpressCTAClick = async () => {
    if (!isAuthenticated) {
      // Save the plan selection and redirect to signup
      localStorage.setItem('pending_plan_type', 'express');

      // Redirect to signup page
      window.location.href = '/auth/signup';
    } else {
      // User is authenticated, proceed to checkout
      await handleCheckout('express');
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
      q: "¿Qué es el plan Express?",
      a: "El plan Express es un pase de 24 horas que te da acceso ilimitado a todas las funcionalidades premium por solo $3.99. Es perfecto para cuando necesitas completar un proyecto urgente o quieres probar todas las funciones premium antes de suscribirte al plan Pro.",
    },
    {
      q: "¿El plan Express se renueva automáticamente?",
      a: "No, el plan Express es un pago único que dura exactamente 24 horas desde el momento de la compra. No hay renovación automática. Si quieres más acceso, puedes comprar otro pase Express o suscribirte al plan Pro.",
    },
    {
      q: "¿Qué métodos de pago aceptan?",
      a: "Aceptamos todas las tarjetas de crédito y débito principales (Visa, Mastercard, American Express) a través de Stripe, nuestra plataforma de pago segura.",
    },
    {
      q: "¿Puedo cancelar el plan Pro en cualquier momento?",
      a: "Sí, puedes cancelar tu suscripción Pro en cualquier momento desde tu dashboard. No hay compromisos ni penalizaciones por cancelación anticipada.",
    },
    {
      q: "¿Qué diferencia hay entre Express y Pro?",
      a: "Express te da acceso completo por 24 horas ($3.99), mientras que Pro es una suscripción mensual ($12.99/mes) o anual ($124.68/año) con acceso continuo. Ambos tienen las mismas funcionalidades ilimitadas.",
    },
    {
      q: "¿El plan anual se renueva automáticamente?",
      a: "Sí, el plan Pro anual se renueva automáticamente cada año. Puedes cancelar la renovación automática en cualquier momento desde tu dashboard.",
    },
    {
      q: "¿Puedo cambiar de plan mensual a anual?",
      a: "Sí, puedes cambiar entre planes en cualquier momento. El cambio se aplica en tu próximo ciclo de facturación.",
    },
    {
      q: "¿Los planes incluyen todas las herramientas?",
      a: "Sí, tanto Express como Pro incluyen acceso completo a Detector, Humanizador y Parafraseador con todas sus funcionalidades premium.",
    },
    {
      q: "¿Hay límites de uso en Express y Pro?",
      a: "No, tanto Express como Pro incluyen usos ilimitados diarios y caracteres ilimitados por análisis. No hay límites en la cantidad de texto que puedes procesar.",
    },
    {
      q: "¿Ofrecen reembolsos?",
      a: "No ofrecemos reembolsos en ningún plan. Al comprar Express o suscribirte a Pro, aceptas nuestros términos de servicio y la política de no reembolso. En Pro, puedes cancelar en cualquier momento y mantendrás acceso hasta el final del período pagado.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto py-16 px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="gradient-text-primary">Planes y Precios</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Elige el plan que se adapta a tu ritmo. Acceso temporal o continuo, la decisión es tuya.
          </p>
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
              <p className="text-gray-600 text-sm">Prueba sin compromiso</p>
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
                <span className="text-gray-700"><strong>3 usos/día</strong> del Humanizador</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">15 análisis/día con el Detector</span>
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
                <span className="text-gray-700">Solo modo Estándar</span>
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
                href="/auth/signup"
                className="w-full text-center bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all"
              >
                Empezar Gratis
              </a>
            )}
          </div>

          {/* Express Pass - NUEVO */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-2xl p-8 flex flex-col items-start border-4 border-orange-400 relative transform scale-105">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg">
              ⚡ POPULAR
            </div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-3">
                Express
              </h2>
              <div className="bg-gradient-to-r from-orange-100 to-amber-100 border-2 border-orange-400 rounded-xl px-4 py-3">
                <p className="text-orange-900 text-base font-bold text-center">
                  ⏱️ Acceso ilimitado por 24 horas
                </p>
                <p className="text-orange-700 text-xs font-semibold text-center mt-1">
                  ¡Actívalo cuando lo necesites!
                </p>
              </div>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-extrabold text-gray-900">${PRICES.express}</span>
              <span className="text-xl text-gray-600">/24h</span>
              <p className="text-sm text-orange-700 font-semibold mt-2">
                Pago único • Sin renovación automática
              </p>
            </div>
            <ul className="space-y-3.5 mb-8 flex-grow w-full">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-semibold">Acceso completo a todas las herramientas</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-semibold">Caracteres ilimitados</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-semibold">Usos ilimitados</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-medium">Modos premium en Humanizador y Parafraseador</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-medium">Subida de archivos (PDF, DOCX, TXT)</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-medium">Ideal para entregas urgentes o uso intensivo</span>
              </li>
            </ul>
            <button
              onClick={handleExpressCTAClick}
              className="mt-auto w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all text-base cursor-pointer"
            >
              {isAuthenticated ? 'Activar Express' : 'Registrate y Activa'}
            </button>
            <p className="text-xs text-gray-600 mt-3 text-center w-full">
              💳 Pago seguro con Stripe
            </p>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-start border-2 border-gray-200 hover:border-violet-200 transition-all duration-300">
            <div className="mb-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Pro
              </h2>
              <p className="text-gray-700 text-sm font-bold">🔄 Acceso continuo, sin interrupciones</p>
            </div>

            {/* Toggle Billing - DENTRO de la card */}
            <div className="w-full mb-6">
              <div className="relative flex bg-violet-100 rounded-full p-1 w-full h-11 shadow-sm">
                <button
                  className={`flex-1 z-10 font-semibold text-sm transition-colors duration-200 rounded-full focus:outline-none ${
                    billing === 'monthly' ? 'text-white' : 'text-violet-700'
                  }`}
                  onClick={() => setBilling('monthly')}
                >
                  Mensual
                </button>
                <button
                  className={`flex-1 z-10 font-semibold text-sm transition-colors duration-200 rounded-full focus:outline-none flex items-center justify-center gap-1.5 ${
                    billing === 'annual' ? 'text-white' : 'text-violet-700'
                  }`}
                  onClick={() => setBilling('annual')}
                >
                  Anual
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      billing === 'annual'
                        ? 'bg-white text-violet-600'
                        : 'bg-violet-200 text-violet-700'
                    }`}
                  >
                    -20%
                  </span>
                </button>
                <span
                  className="absolute top-1 left-1 h-9 w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-violet-600 to-purple-600 transition-all duration-300 shadow-md"
                  style={{
                    transform: billing === 'monthly' ? 'translateX(0)' : 'translateX(100%)',
                  }}
                />
              </div>
            </div>

            <div className="mb-2">
              <span className="text-5xl font-extrabold text-gray-900">
                ${billing === 'monthly' ? PRICES.pro.monthly : (PRICES.pro.annual / 12).toFixed(2)}
              </span>
              <span className="text-xl text-gray-600">/mes</span>
            </div>
            {billing === 'annual' && (
              <p className="text-sm text-violet-700 font-semibold mb-6">
                ${PRICES.pro.annual}/año • Ahorra 20%
              </p>
            )}
            {billing === 'monthly' && <div className="mb-6" />}
            <ul className="space-y-4 mb-8 flex-grow w-full">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-violet-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-semibold">✨ Caracteres ilimitados</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-violet-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-semibold">Usos ilimitados diarios</span>
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
        </div>

        {/* Scroll Hint - Ver Comparación */}
        <div className="flex flex-col items-center justify-center py-8 mb-8">
          <p className="text-2xl font-bold text-gray-900 mb-4">
            ¿Querés ver todas las diferencias en detalle?
          </p>
          <button
            onClick={() => {
              const comparisonTable = document.getElementById('comparison-table');
              comparisonTable?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="flex flex-col items-center gap-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all group"
          >
            <span className="font-bold text-lg">📊 Ver Comparación Completa de Planes</span>
            <svg
              className="w-6 h-6 animate-bounce group-hover:scale-110 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>

        {/* Feature Comparison Table */}
        <div id="comparison-table" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-3">
              <span className="gradient-text-primary">Comparación Completa</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Encuentra el plan perfecto para tus necesidades
            </p>
          </div>

          {/* Comparison Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Free Column */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 text-center border-b-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Free</h3>
                <div className="mb-2">
                  <span className="text-4xl font-extrabold text-gray-900">$0</span>
                </div>
                <p className="text-sm text-gray-600">Gratis para siempre</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Detector */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">🔍 Detector</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Usos diarios</span>
                      <span className="font-semibold text-gray-900">15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Caracteres</span>
                      <span className="font-semibold text-gray-900">1,200</span>
                    </div>
                  </div>
                </div>

                {/* Humanizador */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">✨ Humanizador</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Usos diarios</span>
                      <span className="font-semibold text-gray-900">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Modos</span>
                      <span className="font-semibold text-gray-900">Estándar</span>
                    </div>
                  </div>
                </div>

                {/* Parafraseador */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">🔄 Parafraseador</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Usos diarios</span>
                      <span className="font-semibold text-gray-900">10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Modos</span>
                      <span className="font-semibold text-gray-900">Estándar</span>
                    </div>
                  </div>
                </div>

                {/* Características */}
                <div className="pt-4 border-t-2 border-gray-100">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Historial</span>
                      <span className="text-gray-400">—</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Subir archivos</span>
                      <span className="text-gray-400">—</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Soporte</span>
                      <span className="font-medium text-gray-900">Email</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Express Column - DESTACADO */}
            <div className="relative bg-white rounded-2xl shadow-2xl border-4 border-orange-400 overflow-hidden transform md:scale-105">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div>
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap inline-block">
                  ⚡ MÁS POPULAR
                </span>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 text-center border-b-2 border-orange-200 mt-2">
                <h3 className="text-xl font-bold text-orange-700 mb-2">Express</h3>
                <div className="mb-2">
                  <span className="text-4xl font-extrabold text-orange-600">$3.99</span>
                </div>
                <p className="text-sm text-orange-700 font-medium">Pago único · 24 horas</p>
              </div>

              <div className="p-6 space-y-6 bg-gradient-to-b from-orange-50/30 to-white">
                {/* Detector */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">🔍 Detector</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Usos diarios</span>
                      <span className="font-bold text-orange-600">Ilimitado</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Caracteres</span>
                      <span className="font-bold text-orange-600">Ilimitado</span>
                    </div>
                  </div>
                </div>

                {/* Humanizador */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">✨ Humanizador</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Usos diarios</span>
                      <span className="font-bold text-orange-600">Ilimitado</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Modos</span>
                      <span className="font-bold text-orange-600">5 premium</span>
                    </div>
                  </div>
                </div>

                {/* Parafraseador */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">🔄 Parafraseador</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Usos diarios</span>
                      <span className="font-bold text-orange-600">Ilimitado</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Modos</span>
                      <span className="font-bold text-orange-600">5 premium</span>
                    </div>
                  </div>
                </div>

                {/* Características */}
                <div className="pt-4 border-t-2 border-orange-100">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Historial</span>
                      <span className="font-bold text-orange-600">✓</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Subir archivos</span>
                      <span className="font-bold text-orange-600 text-xs">✓ PDF, DOCX, TXT</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Soporte</span>
                      <span className="font-bold text-orange-600">Email</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro Column */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-violet-200 overflow-hidden">
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-6 text-center border-b-2 border-violet-200">
                <h3 className="text-xl font-bold text-violet-700 mb-2">Pro</h3>
                <div className="mb-2">
                  <span className="text-4xl font-extrabold text-violet-600">$12.99</span>
                </div>
                <p className="text-sm text-violet-700 font-medium">Suscripción mensual</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Detector */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">🔍 Detector</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Usos diarios</span>
                      <span className="font-bold text-violet-600">Ilimitado</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Caracteres</span>
                      <span className="font-bold text-violet-600">Ilimitado</span>
                    </div>
                  </div>
                </div>

                {/* Humanizador */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">✨ Humanizador</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Usos diarios</span>
                      <span className="font-bold text-violet-600">Ilimitado</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Modos</span>
                      <span className="font-bold text-violet-600">5 premium</span>
                    </div>
                  </div>
                </div>

                {/* Parafraseador */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">🔄 Parafraseador</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Usos diarios</span>
                      <span className="font-bold text-violet-600">Ilimitado</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Modos</span>
                      <span className="font-bold text-violet-600">5 premium</span>
                    </div>
                  </div>
                </div>

                {/* Características */}
                <div className="pt-4 border-t-2 border-violet-100">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Historial</span>
                      <span className="font-bold text-violet-600">✓</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Subir archivos</span>
                      <span className="font-bold text-violet-600 text-xs">✓ PDF, DOCX, TXT</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Soporte</span>
                      <span className="font-bold text-violet-600">Prioritario</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                "Necesitaba revisar 20 trabajos antes de la fecha de entrega y los límites gratis no me alcanzaban. El Express me salvó - por $3.99 pude terminar todo en un día sin interrupciones."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white font-bold text-lg">
                  CM
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Carlos Mendoza</p>
                  <p className="text-sm text-gray-600">Profesor de Secundaria, Colombia</p>
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
    </div>
  );
}
