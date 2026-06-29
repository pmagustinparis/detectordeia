'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';

export default function ExpressPromoBanner() {
  const { isAuthenticated } = useAuth();
  const [isDismissed, setIsDismissed] = useState(true);
  const [isExpressOrPremium, setIsExpressOrPremium] = useState(false);

  useEffect(() => {
    const handler = () => setIsDismissed(false);
    window.addEventListener('express-limit-exceeded', handler);
    return () => window.removeEventListener('express-limit-exceeded', handler);
  }, []);

  useEffect(() => {
    const dismissed = localStorage.getItem('express_promo_banner_dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
      return;
    }

    async function checkUserPlan() {
      if (!isAuthenticated) {
        setIsDismissed(false);
        return;
      }

      try {
        const response = await fetch('/api/user/plan');
        if (response.ok) {
          const data = await response.json();
          if (data.plan_type === 'premium') {
            setIsExpressOrPremium(true);
            setIsDismissed(true);
            return;
          }
          if (data.express_expires_at) {
            const expiresAt = new Date(data.express_expires_at);
            if (expiresAt > new Date()) {
              setIsExpressOrPremium(true);
              setIsDismissed(true);
              return;
            }
          }
          setIsDismissed(false);
        }
      } catch {
        setIsDismissed(false);
      }
    }

    checkUserPlan();
  }, [isAuthenticated]);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('express_promo_banner_dismissed', 'true');
  };

  if (isDismissed || isExpressOrPremium) return null;

  return (
    <div className="max-w-5xl mx-auto mb-5 px-2">
      <div className="flex items-center justify-between gap-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex-shrink-0 w-7 h-7 rounded-md bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-sm text-amber-900 font-medium truncate">
            <span className="font-bold uppercase tracking-wide text-orange-700 mr-1.5">Oferta · 33% OFF</span>
            <span className="font-semibold">Express Pass 24h a $3.99</span> <span className="line-through text-amber-700/50">$5.99</span> · acceso completo, sin suscripción
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href="/pricing"
            className="text-sm font-semibold text-amber-900 hover:text-amber-700 underline underline-offset-2 transition-colors whitespace-nowrap"
          >
            Ver planes
          </a>
          <button
            onClick={handleDismiss}
            className="text-amber-400 hover:text-amber-600 p-1 transition-colors"
            aria-label="Cerrar"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
