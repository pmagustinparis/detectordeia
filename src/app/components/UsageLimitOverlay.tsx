/**
 * UsageLimitOverlay Component
 *
 * Modal/overlay que aparece cuando un usuario alcanza su límite diario.
 * Muestra mensajes diferentes según el tipo de usuario:
 * - Anonymous: CTA para registrarse (obtener más usos/día)
 * - Free: CTA para Express ($3.99/24h) o Pro ($12.99/mes)
 * - Express/Premium: No deberían ver este modal (tienen usos ilimitados)
 */

'use client';

import { useEffect, useState } from 'react';

interface UsageLimitOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  userType: 'anonymous' | 'free' | 'express' | 'premium';
  limit: number;
  resetAt: Date;
  toolName: string; // "Detector", "Humanizador", "Parafraseador"
}

export default function UsageLimitOverlay({
  isOpen,
  onClose,
  userType,
  limit,
  resetAt,
  toolName,
}: UsageLimitOverlayProps) {
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const handleExpressCheckout = async (duration: '24h' | '7d') => {
    setLoadingCheckout(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan_type: 'express', duration }),
      });
      const { url, error } = await response.json();
      if (error || !url) {
        alert('Error al crear la sesión de pago. Por favor, intentá de nuevo.');
        setLoadingCheckout(false);
        return;
      }
      window.location.href = url;
    } catch {
      alert('Error al procesar tu solicitud. Por favor, intentá de nuevo.');
      setLoadingCheckout(false);
    }
  };

  // Función para obtener el nombre plural correcto de cada herramienta
  const getToolNamePlural = () => {
    switch (toolName) {
      case 'Detector':
        return 'análisis';
      case 'Humanizador':
        return 'humanizaciones';
      case 'Parafraseador':
        return 'paráfrasis';
      default:
        return 'usos';
    }
  };

  // Cerrar con ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Bloquear scroll cuando está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Calcular tiempo hasta reset
  const now = new Date();
  const resetDate = new Date(resetAt);
  const hoursUntilReset = Math.ceil((resetDate.getTime() - now.getTime()) / (1000 * 60 * 60));

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-50 "
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 pointer-events-auto "
          onClick={(e) => e.stopPropagation()}
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-xl bg-amber-50 flex items-center justify-center">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
            Límite Diario Alcanzado
          </h2>

          {/* Message - Anonymous User */}
          {userType === 'anonymous' && (
            <>
              <p className="text-center text-gray-700 mb-6 leading-relaxed">
                Ya usaste tus <strong>{limit} {getToolNamePlural()} gratis</strong> de hoy.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
                <p className="text-sm font-bold text-blue-900 mb-3">
                  Registrándote gratis obtenés:
                </p>
                <ul className="space-y-2 text-sm text-blue-900/80">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Más usos diarios</strong> en todas las herramientas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Historial</strong> de tus últimos usos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Más caracteres</strong> por análisis</span>
                  </li>
                </ul>
              </div>

              {/* CTA - Register */}
              <a
                href="/dashboard"
                className="block w-full text-center bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-3"
              >
                Crear Cuenta Gratis en 10 Segundos
              </a>

              <button
                onClick={onClose}
                className="block w-full text-center text-gray-600 hover:text-gray-800 font-medium py-2"
              >
                Volver mañana ({hoursUntilReset}h hasta reset)
              </button>
            </>
          )}

          {/* Message - Free User */}
          {userType === 'free' && (
            <>
              <p className="text-center text-gray-700 mb-6 leading-relaxed">
                Alcanzaste tu límite de <strong>{limit} {getToolNamePlural()} diarios</strong>.
                <br />
                <span className="text-sm text-gray-600">
                  Tu límite se restablece en {hoursUntilReset} horas.
                </span>
              </p>

              {/* Express Option - Destacado */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-0.5 rounded-md text-xs font-bold shadow-md">
                  ⚡ URGENTE
                </div>
                <p className="text-sm font-bold text-orange-900 mb-2 mt-2">
                  Express Pass - 24 horas ilimitadas
                </p>
                <ul className="space-y-1.5 text-sm text-orange-800 mb-3">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">✓</span>
                    <span><strong>Todo ilimitado</strong> por 24 horas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">✓</span>
                    <span>Todos los modos + subida de archivos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">✓</span>
                    <span>Perfecto para entregas urgentes</span>
                  </li>
                </ul>
                <p className="text-lg font-bold text-orange-900">
                  $3.99 • Pago único
                </p>
              </div>

              {/* Pro Option */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
                <p className="text-sm font-bold text-blue-900 mb-2">
                  Plan Premium - Uso continuo
                </p>
                <ul className="space-y-1.5 text-sm text-blue-900/80 mb-3">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold">✓</span>
                    <span><strong>Usos ilimitados</strong> permanentes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold">✓</span>
                    <span>Todos los modos + subida de archivos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold">✓</span>
                    <span>Mejor para uso regular</span>
                  </li>
                </ul>
                <p className="text-lg font-bold text-blue-900">
                  $12.99/mes • $124.68/año
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-2 mb-3">
                <button
                  onClick={() => handleExpressCheckout('24h')}
                  disabled={loadingCheckout}
                  className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-60 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300"
                >
                  {loadingCheckout ? 'Procesando...' : '⚡ Activar Express 24h · $3.99'}
                </button>
                <button
                  onClick={() => handleExpressCheckout('7d')}
                  disabled={loadingCheckout}
                  className="block w-full text-center bg-amber-100 hover:bg-amber-200 disabled:opacity-60 text-amber-900 font-semibold py-2.5 px-6 rounded-xl transition-colors text-sm"
                >
                  {loadingCheckout ? '...' : 'Express 7 días · $8.99 (ahorra 68%)'}
                </button>
                <a
                  href="/pricing"
                  className="block w-full text-center border border-blue-900/30 text-blue-900 hover:bg-blue-50 font-semibold py-2.5 px-6 rounded-xl transition-colors text-sm"
                >
                  Ver Plan Premium ($12.99/mes)
                </a>
              </div>

              <button
                onClick={onClose}
                className="block w-full text-center text-gray-600 hover:text-gray-800 font-medium py-2"
              >
                Volver mañana ({hoursUntilReset}h hasta reset)
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
