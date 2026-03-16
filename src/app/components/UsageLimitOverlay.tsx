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

import { useEffect } from 'react';

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
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 pointer-events-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
              <span className="text-5xl">⏱️</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-3">
            Límite Diario Alcanzado
          </h2>

          {/* Message - Anonymous User */}
          {userType === 'anonymous' && (
            <>
              <p className="text-center text-gray-700 mb-6 leading-relaxed">
                Ya usaste tus <strong>{limit} {getToolNamePlural()} gratis</strong> de hoy.
              </p>

              <div className="bg-blue-900/5 border-2 border-blue-900/20 rounded-2xl p-5 mb-6">
                <p className="text-sm font-bold text-blue-900 mb-3">
                  🎁 Registrándote gratis obtenés:
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
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300 rounded-2xl p-5 mb-4 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-md">
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
                    <span>5 modos premium + archivos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">✓</span>
                    <span>Perfecto para entregas urgentes</span>
                  </li>
                </ul>
                <p className="text-lg font-extrabold text-orange-900">
                  $3.99 • Pago único
                </p>
              </div>

              {/* Pro Option */}
              <div className="bg-blue-900/5 border-2 border-blue-900/20 rounded-2xl p-5 mb-6">
                <p className="text-sm font-bold text-blue-900 mb-2">
                  🚀 Plan Premium - Uso continuo
                </p>
                <ul className="space-y-1.5 text-sm text-blue-900/80 mb-3">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold">✓</span>
                    <span><strong>Usos ilimitados</strong> permanentes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold">✓</span>
                    <span>5 modos premium + archivos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold">✓</span>
                    <span>Mejor para uso regular</span>
                  </li>
                </ul>
                <p className="text-lg font-extrabold text-blue-900">
                  $12.99/mes • $124.68/año
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 mb-3">
                <a
                  href="/pricing"
                  className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  ⚡ Activar Express ($3.99/24h)
                </a>
                <a
                  href="/pricing"
                  className="block w-full text-center bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
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
