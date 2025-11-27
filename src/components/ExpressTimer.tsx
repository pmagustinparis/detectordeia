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
    // Versión compacta para header
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
        isExpired
          ? 'bg-gray-100 text-gray-600'
          : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
      }`}>
        <span>⚡</span>
        <span>{isExpired ? 'Expirado' : timeLeft}</span>
      </div>
    );
  }

  // Versión completa para dashboard/páginas
  return (
    <div className={`rounded-xl p-4 ${
      isExpired
        ? 'bg-gray-100 border-2 border-gray-300'
        : 'bg-gradient-to-r from-purple-500 to-pink-500'
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700"
          >
            Ver planes →
          </a>
        </div>
      )}
    </div>
  );
}
