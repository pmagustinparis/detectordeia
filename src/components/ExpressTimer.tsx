'use client';

import { useEffect, useState } from 'react';

interface ExpressTimerProps {
  expiresAt: string; // ISO timestamp
  compact?: boolean; // Versión compacta para header
}

export default function ExpressTimer({ expiresAt, compact = false }: ExpressTimerProps) {
  const [timeLeft, setTimeLeft] = useState('');
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const expires = new Date(expiresAt);
      const diff = expires.getTime() - now.getTime();

      if (diff <= 0) {
        setIsExpired(true);
        setTimeLeft('Expirado');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      if (hours > 0) {
        setTimeLeft(`${hours}h ${mins}m`);
      } else if (mins > 0) {
        setTimeLeft(`${mins}m ${secs}s`);
      } else {
        setTimeLeft(`${secs}s`);
      }
    };

    // Update immediately
    updateTimer();

    // Update every second
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  // Reload page when expired to update limits
  useEffect(() => {
    if (isExpired) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [isExpired]);

  if (compact) {
    // Versión compacta para header con tooltip
    return (
      <div className="relative group">
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium cursor-help ${
          isExpired
            ? 'bg-gray-100 text-gray-600'
            : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm'
        }`}>
          <span>⚡</span>
          <span>{isExpired ? 'Expirado' : timeLeft}</span>
        </div>

        {/* Tooltip */}
        <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl">
          <div className="font-bold mb-1">⚡ Express Pass Activo</div>
          <div className="text-gray-300">
            {isExpired
              ? 'Tu pase de 24h ha expirado. Renuévalo para seguir con acceso ilimitado.'
              : 'Acceso ilimitado a todas las herramientas. Tu pase expira en ' + timeLeft + '.'
            }
          </div>
          <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
        </div>
      </div>
    );
  }

  // Versión completa para dashboard/páginas
  return (
    <div className={`rounded-xl p-4 ${
      isExpired
        ? 'bg-gray-100 border-2 border-gray-300'
        : 'bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 shadow-lg'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl">⚡</div>
          <div>
            <div className={`font-bold text-lg ${isExpired ? 'text-gray-700' : 'text-white'}`}>
              {isExpired ? 'Express Pass Expirado' : 'Express Pass Activo'}
            </div>
            <div className={`text-sm ${isExpired ? 'text-gray-600' : 'text-white/90'}`}>
              {isExpired
                ? 'Volviste al plan Free. Actualiza para continuar ilimitado.'
                : `Acceso ilimitado por: ${timeLeft}`
              }
            </div>
          </div>
        </div>

        {!isExpired && (
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{timeLeft}</div>
            <div className="text-xs text-white/75">restantes</div>
          </div>
        )}
      </div>

      {isExpired && (
        <div className="mt-3 pt-3 border-t border-gray-300">
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            Renovar Express →
          </a>
        </div>
      )}
    </div>
  );
}
