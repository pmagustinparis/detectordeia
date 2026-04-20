"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";
import { trackEvent } from "@/lib/analytics/client";

const PRICES = {
  free: { monthly: 0, annual: 0 },
  express: { '24h': 3.99, '7d': 8.99 }, // Pago único
  pro: { monthly: 12.99, annual: 124.68 }, // $10.39/mes efectivo con 20% descuento
};

export default function PricingPageClient() {
  const { isAuthenticated } = useAuth();
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [expressDuration, setExpressDuration] = useState<'24h' | '7d'>('24h');
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
      const pendingExpressDuration = localStorage.getItem('pending_express_duration');

      if (pendingPlanType) {
        const planType = pendingPlanType as 'express' | 'premium';
        const planInterval = pendingPlanInterval as 'month' | 'year' | null;
        const duration = pendingExpressDuration as '24h' | '7d' | null;

        localStorage.removeItem('pending_plan_type');
        localStorage.removeItem('pending_plan_checkout');
        localStorage.removeItem('pending_express_duration');

        // Trigger checkout after a small delay to ensure auth is fully settled
        setTimeout(() => {
          if (planType === 'express') {
            handleCheckout('express', duration || '24h');
          } else if (planInterval) {
            handleCheckout('premium', planInterval);
          }
        }, 500);
      }
    }
  }, [isAuthenticated]);

  const handleCheckout = async (
    planType: 'express' | 'premium',
    planIntervalOrDuration?: 'month' | 'year' | '24h' | '7d'
  ) => {
    // Determinar si es duration (Express) o interval (Premium)
    const isDuration = planType === 'express';
    const duration = isDuration ? planIntervalOrDuration as '24h' | '7d' : undefined;
    const planInterval = !isDuration ? planIntervalOrDuration as 'month' | 'year' : undefined;

    // Track checkout initiation
    trackEvent({
      eventType: 'checkout_started',
      metadata: {
        plan_type: planType,
        ...(planInterval && { plan_interval: planInterval }),
        ...(duration && { duration: duration }),
        price: planType === 'express'
          ? PRICES.express[duration || '24h']
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
          ...(duration && { duration: duration }),
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
      localStorage.setItem('pending_express_duration', expressDuration);

      // Redirect to signup page
      window.location.href = '/auth/signup';
    } else {
      // User is authenticated, proceed to checkout
      await handleCheckout('express', expressDuration);
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
        className="mt-auto w-full text-center bg-blue-900 text-white hover:bg-blue-800 font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer"
      >
        {isAuthenticated ? 'Actualizar a Premium' : 'Registrate Gratis y Actualiza'}
      </button>
    );
  };

  const faqs = [
    {
      q: "¿Qué es el plan Express?",
      a: "El plan Express es un pase temporal que te da acceso ilimitado a todas las funcionalidades premium. Disponible en dos opciones: Express 24h ($3.99) para emergencias puntuales, o Express Semanal ($8.99) para 7 días completos - ideal para semanas de exámenes o proyectos intensivos. Es perfecto para cuando necesitas acceso premium sin suscribirte.",
    },
    {
      q: "¿Qué diferencia hay entre Express 24h y Express Semanal?",
      a: "Express 24h ($3.99) te da acceso ilimitado por 24 horas - ideal para una entrega urgente o emergencia puntual. Express Semanal ($8.99) te da 7 días completos de acceso, perfecto para semanas de exámenes, proyectos grupales o múltiples entregas. El Semanal ahorra 68% vs comprar 7 pases de 24h individuales.",
    },
    {
      q: "¿El plan Express se renueva automáticamente?",
      a: "No, el plan Express (tanto 24h como Semanal) es un pago único sin renovación automática. Dura exactamente el tiempo comprado desde el momento de la activación. Si quieres más acceso, puedes comprar otro pase Express (se extiende tu tiempo activo) o suscribirte al plan Premium.",
    },
    {
      q: "¿Puedo comprar más Express si ya tengo uno activo?",
      a: "¡Sí! Si compras otro pase Express mientras tienes uno activo, el tiempo se suma automáticamente. Por ejemplo, si te quedan 2 horas de Express 24h y compras otro 24h, tendrás 26 horas totales. Lo mismo aplica para Express Semanal.",
    },
    {
      q: "¿Qué diferencia hay entre Express y Premium?",
      a: "Express es un pago único temporal (24h por $3.99 o 7 días por $8.99) sin renovación automática - ideal para necesidades puntuales. Premium es una suscripción continua ($12.99/mes o $124.68/año) con acceso permanente - ideal para uso regular. Ambos tienen las mismas funcionalidades ilimitadas.",
    },
    {
      q: "¿Qué métodos de pago aceptan?",
      a: "Aceptamos todas las tarjetas de crédito y débito principales (Visa, Mastercard, American Express) a través de Stripe, nuestra plataforma de pago segura.",
    },
    {
      q: "¿Puedo cancelar el plan Premium en cualquier momento?",
      a: "Sí, puedes cancelar tu suscripción Premium en cualquier momento desde tu dashboard. No hay compromisos ni penalizaciones por cancelación anticipada.",
    },
    {
      q: "¿El plan anual se renueva automáticamente?",
      a: "Sí, el plan Premium anual se renueva automáticamente cada año. Puedes cancelar la renovación automática en cualquier momento desde tu dashboard.",
    },
    {
      q: "¿Puedo cambiar de plan mensual a anual?",
      a: "Sí, puedes cambiar entre planes en cualquier momento. El cambio se aplica en tu próximo ciclo de facturación.",
    },
    {
      q: "¿Los planes incluyen todas las herramientas?",
      a: "Sí, tanto Express (24h y Semanal) como Premium incluyen acceso completo a Detector, Humanizador y Parafraseador con todas sus funcionalidades premium.",
    },
    {
      q: "¿Hay límites de uso en Express y Premium?",
      a: "No, tanto Express como Premium incluyen usos ilimitados diarios y caracteres ilimitados por análisis. No hay límites en la cantidad de texto que puedes procesar.",
    },
    {
      q: "¿Ofrecen reembolsos?",
      a: "No ofrecemos reembolsos en ningún plan. Al comprar Express o suscribirte a Premium, aceptas nuestros términos de servicio y la política de no reembolso. En Premium, puedes cancelar en cualquier momento y mantendrás acceso hasta el final del período pagado.",
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto py-16 px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text-primary">Planes</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Elige el plan que se adapta a tu ritmo. Acceso temporal o continuo, la decisión es tuya.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* Free Plan */}
          <div className={`bg-white rounded-xl shadow-sm p-8 flex flex-col items-start border transition-all duration-300 ${
            isAuthenticated && userPlan === 'premium'
              ? 'border-slate-200 opacity-60'
              : 'border-slate-200'
          }`}>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Free</h2>
              <p className="text-gray-600 text-sm">Prueba sin compromiso</p>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-bold text-gray-900">$0</span>
              <span className="text-xl text-gray-600">/siempre</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow w-full">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-700"><strong>3 usos/día</strong> del Humanizador</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-700">15 análisis/día con el Detector</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-700">Hasta 1,200 caracteres</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-700">Solo modo Estándar</span>
              </li>
            </ul>
            {isAuthenticated && userPlan === 'premium' ? (
              <button
                disabled
                className="w-full text-center bg-slate-100 text-slate-400 font-semibold py-3 px-6 rounded-lg cursor-not-allowed"
              >
                Tu plan actual es Premium
              </button>
            ) : (
              <a
                href="/auth/signup"
                className="w-full text-center border border-blue-900/30 text-blue-900 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Empezar Gratis
              </a>
            )}
          </div>

          {/* Express Pass - NUEVO */}
          <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-start border-2 border-blue-900 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-900 text-white px-3 py-1 rounded-full text-xs font-bold">
              POPULAR
            </div>
            <div className="mb-4 w-full">
              <h2 className="text-3xl font-bold text-slate-900 mb-3 text-center">
                Express Pass
              </h2>
              <p className="text-sm text-slate-600 font-medium text-center mb-4">Acceso temporal ilimitado · Pago único sin renovación</p>

              {/* Tabs para duración */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setExpressDuration('24h')}
                  className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-colors ${
                    expressDuration === '24h'
                      ? 'bg-blue-900 text-white'
                      : 'bg-white text-blue-900 hover:bg-blue-50 border border-blue-900/30'
                  }`}
                >
                  24 Horas
                </button>
                <button
                  onClick={() => setExpressDuration('7d')}
                  className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-colors ${
                    expressDuration === '7d'
                      ? 'bg-blue-900 text-white'
                      : 'bg-white text-blue-900 hover:bg-blue-50 border border-blue-900/30'
                  }`}
                >
                  7 Días
                </button>
              </div>
            </div>

            {/* Precio dinámico */}
            <div className="mb-4 text-center w-full">
              <span className="text-5xl font-bold text-slate-900">${PRICES.express[expressDuration]}</span>
              <span className="text-xl text-slate-600">/{expressDuration === '24h' ? '24h' : '7 días'}</span>
              <p className="text-sm text-slate-600 font-semibold mt-2">
                Pago único • Sin renovación automática
              </p>
            </div>

            {/* Copy dinámico según duración */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-4 w-full">
              <p className="text-slate-700 text-sm font-semibold text-center">
                {expressDuration === '24h'
                  ? 'Ideal para: entrega urgente, emergencia académica'
                  : 'Ideal para: semana de exámenes, proyecto grupal, múltiples entregas'
                }
              </p>
            </div>

            {/* Badge de ahorro solo para 7d */}
            {expressDuration === '7d' && (
              <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 mb-4 w-full">
                <p className="text-xs text-green-800 font-bold text-center">
                  Ahorra 68% vs 7 días individuales ($27.93)
                </p>
              </div>
            )}
            <ul className="space-y-3 mb-6 flex-grow w-full">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-semibold">Acceso completo a todas las herramientas</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-semibold">Caracteres ilimitados</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-semibold">Usos ilimitados</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-medium">Modos premium en Humanizador y Parafraseador</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-medium">Subida de archivos (PDF, DOCX, TXT)</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-medium">Ideal para entregas urgentes o uso intensivo</span>
              </li>
            </ul>
            <button
              onClick={handleExpressCTAClick}
              className="mt-auto w-full text-center bg-blue-900 text-white hover:bg-blue-800 font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer"
            >
              {isAuthenticated
                ? `Activar Express ${expressDuration === '24h' ? '24h' : 'Semanal'}`
                : 'Registrate y Activa'}
            </button>
            <p className="text-xs text-gray-600 mt-3 text-center w-full">
              Pago seguro con Stripe
            </p>
          </div>

          {/* Premium Plan */}
          <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-start border border-slate-200 transition-all duration-300">
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Premium
              </h2>
              <p className="text-gray-600 text-sm font-medium">Acceso continuo, sin interrupciones</p>
            </div>

            {/* Botones de selección de billing */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setBilling('monthly')}
                className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-colors ${
                  billing === 'monthly'
                    ? 'bg-blue-900 text-white'
                    : 'bg-white text-blue-900 hover:bg-blue-50 border border-blue-900/30'
                }`}
              >
                Mensual
              </button>
              <button
                onClick={() => setBilling('annual')}
                className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-1.5 ${
                  billing === 'annual'
                    ? 'bg-blue-900 text-white'
                    : 'bg-white text-blue-900 hover:bg-blue-50 border border-blue-900/30'
                }`}
              >
                Anual
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  billing === 'annual' ? 'bg-white text-blue-900' : 'bg-blue-900/10 text-blue-900'
                }`}>
                  -20%
                </span>
              </button>
            </div>

            <div className="mb-2">
              <span className="text-5xl font-bold text-gray-900">
                ${billing === 'monthly' ? PRICES.pro.monthly : (PRICES.pro.annual / 12).toFixed(2)}
              </span>
              <span className="text-xl text-gray-600">/mes</span>
            </div>
            {billing === 'annual' && (
              <p className="text-sm text-slate-600 font-semibold mb-6">
                ${PRICES.pro.annual}/año • Ahorra 20%
              </p>
            )}
            {billing === 'monthly' && <div className="mb-6" />}
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-4 w-full">
              <p className="text-slate-700 text-sm font-semibold text-center">
                Ideal para: uso diario profesional, estudiantes avanzados, creadores de contenido
              </p>
            </div>
            <ul className="space-y-4 mb-8 flex-grow w-full">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-semibold">Trabajo ilimitado sin interrupciones ni restricciones</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-semibold">Caracteres y usos ilimitados todos los días</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-semibold">5 modos premium en Humanizador y Parafraseador</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-medium">Subida de archivos largos (PDF, DOCX, TXT)</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-medium">Historial completo de tus análisis</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-medium">Soporte prioritario por email</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-medium">Ideal para uso profesional continuo</span>
              </li>
            </ul>
            {getProCTA()}
            <p className="text-xs text-gray-600 mt-3 text-center w-full">
              Pago seguro con Stripe
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text-primary">Lo que dicen</span>
            <span className="text-gray-900"> nuestros usuarios</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
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
                <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold text-lg">
                  MC
                </div>
                <div>
                  <p className="font-semibold text-gray-900">María Contreras</p>
                  <p className="text-sm text-gray-600">Profesora Universitaria, Argentina</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Uso DetectorDeIA diariamente para verificar el contenido de mi blog. El plan Premium vale cada centavo - los usos ilimitados y los 5 modos del parafraseador me ahorran horas de trabajo manual."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold text-lg">
                  JR
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Javier Rodríguez</p>
                  <p className="text-sm text-gray-600">Creador de Contenido, México</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
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
                <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold text-lg">
                  SP
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sofía Paredes</p>
                  <p className="text-sm text-gray-600">Estudiante de Maestría, España</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
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
                <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold text-lg">
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
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <svg
                    className={`w-6 h-6 text-slate-500 flex-shrink-0 transition-transform ${
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
