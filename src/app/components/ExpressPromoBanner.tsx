'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';

/**
 * ExpressPromoBanner Component
 *
 * Banner promocional para el plan Express ($2.99/24h)
 * Solo se muestra para usuarios FREE (no Express ni Premium)
 * Dismissible con localStorage
 */
export default function ExpressPromoBanner() {
  const { isAuthenticated } = useAuth();
  const [isDismissed, setIsDismissed] = useState(true);
  const [isExpressOrPremium, setIsExpressOrPremium] = useState(false);

  useEffect(() => {
    // Check if banner was dismissed
    const dismissed = localStorage.getItem('express_promo_banner_dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
      return;
    }

    // Check if user has Express or Premium
    async function checkUserPlan() {
      if (!isAuthenticated) {
        setIsDismissed(false);
        return;
      }

      try {
        const response = await fetch('/api/user/plan');
        if (response.ok) {
          const data = await response.json();

          // Check if has Premium
          if (data.plan_type === 'premium') {
            setIsExpressOrPremium(true);
            setIsDismissed(true);
            return;
          }

          // Check if has active Express
          if (data.express_expires_at) {
            const expiresAt = new Date(data.express_expires_at);
            if (expiresAt > new Date()) {
              setIsExpressOrPremium(true);
              setIsDismissed(true);
              return;
            }
          }

          // Free user - show banner
          setIsDismissed(false);
        }
      } catch (error) {
        console.error('Error checking user plan:', error);
        setIsDismissed(false);
      }
    }

    checkUserPlan();
  }, [isAuthenticated]);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('express_promo_banner_dismissed', 'true');
  };

  if (isDismissed || isExpressOrPremium) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto mb-6 px-2 animate-slide-in-top">
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-2xl shadow-lg p-4 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-white/80 hover:text-white p-1 transition-colors"
          aria-label="Cerrar banner"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-4 pr-8">
          <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex-shrink-0">
            <span className="text-3xl">⚡</span>
          </div>

          <div className="flex-1">
            <p className="text-white font-bold text-sm sm:text-base mb-1">
              ¿Entrega urgente? Express Pass - Acceso ilimitado por 24 horas
            </p>
            <p className="text-white/90 text-xs sm:text-sm">
              Todo ilimitado • 5 modos premium • Perfecto para entregas de último momento • <strong>Solo $2.99</strong>
            </p>
          </div>

          <a
            href="/pricing"
            className="hidden md:block bg-white text-orange-600 hover:bg-orange-50 font-bold py-2 px-5 rounded-lg shadow-md hover:shadow-lg transition-all whitespace-nowrap"
          >
            Ver Express
          </a>
        </div>

        {/* Mobile CTA */}
        <a
          href="/pricing"
          className="md:hidden mt-3 block w-full bg-white text-orange-600 hover:bg-orange-50 font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all text-center"
        >
          Ver Express Pass
        </a>
      </div>
    </div>
  );
}
