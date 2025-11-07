/**
 * UsageLimitOverlay Component
 *
 * Modal/overlay que aparece cuando un usuario alcanza su límite diario.
 * Muestra mensajes diferentes según el tipo de usuario:
 * - Anonymous: CTA para registrarse (obtener 50 usos/día)
 * - Free: CTA para Premium (próximamente)
 */

'use client';

import { useEffect } from 'react';

interface UsageLimitOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  userType: 'anonymous' | 'free' | 'premium';
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
                Ya usaste tus <strong>{limit} {toolName.toLowerCase()}s gratis</strong> de hoy.
              </p>

              <div className="bg-gradient-to-r from-violet-50 to-purple-50 border-2 border-violet-200 rounded-2xl p-5 mb-6">
                <p className="text-sm font-bold text-violet-900 mb-3">
                  🎁 Registrándote gratis obtenés:
                </p>
                <ul className="space-y-2 text-sm text-violet-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>50 usos diarios</strong> (5x más que ahora)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Historial</strong> de tus últimos usos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Acceso anticipado</strong> a nuevas features</span>
                  </li>
                </ul>
              </div>

              {/* CTA - Register */}
              <a
                href="/dashboard"
                className="block w-full text-center bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-3"
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
                Alcanzaste tu límite de <strong>{limit} {toolName.toLowerCase()}s diarios</strong>.
                <br />
                <span className="text-sm text-gray-600">
                  Tu límite se restablece en {hoursUntilReset} horas.
                </span>
              </p>

              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-2xl p-5 mb-6">
                <p className="text-sm font-bold text-cyan-900 mb-3">
                  🚀 Próximamente: Plan Premium
                </p>
                <ul className="space-y-2 text-sm text-cyan-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Usos ilimitados</strong> todos los días</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Hasta 15,000 caracteres</strong> por uso</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Modo Avanzado</strong> con adaptación regional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Historial completo</strong> sin límites</span>
                  </li>
                </ul>
                <p className="text-xs text-cyan-700 mt-3">
                  Desde $7/mes • Disponible próximamente
                </p>
              </div>

              {/* CTA - Email waitlist */}
              <button
                onClick={() => {
                  onClose();
                  // TODO: Open email capture modal
                  console.log('Open email capture modal');
                }}
                className="block w-full text-center bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-3"
              >
                Avísame Cuando Esté Disponible
              </button>

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
