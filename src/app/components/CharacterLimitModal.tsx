/**
 * CharacterLimitModal Component
 *
 * Modal que aparece cuando un usuario excede el límite de caracteres.
 * Muestra copy dinámico según el tipo de usuario (anonymous, free, premium).
 */

'use client';

import { useEffect } from 'react';

interface CharacterLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName: string; // "Detector", "Humanizador", "Parafraseador"
  currentChars: number;
  maxChars: number;
  premiumMaxChars: number;
  userType: 'anonymous' | 'free' | 'premium'; // Tipo de usuario
  freeMaxChars?: number; // Límite del plan free (para calcular multiplicador en anónimos)
}

export default function CharacterLimitModal({
  isOpen,
  onClose,
  toolName,
  currentChars,
  maxChars,
  premiumMaxChars,
  userType,
  freeMaxChars = 1200, // Default para Detector
}: CharacterLimitModalProps) {
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

  const excessChars = currentChars - maxChars;

  // Calcular multiplicadores
  const freeMultiplier = userType === 'anonymous' ? Math.round(freeMaxChars / maxChars) : 0;
  const proMultiplier = Math.round(premiumMaxChars / maxChars);

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
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
            Texto Demasiado Largo
          </h2>

          {/* Current usage */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-sm font-medium text-gray-600">Caracteres:</span>
            <span className="text-lg font-bold text-red-600">{currentChars.toLocaleString()}</span>
            <span className="text-sm text-gray-400">/</span>
            <span className="text-sm text-gray-500">{maxChars.toLocaleString()}</span>
            <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full font-medium">
              +{excessChars.toLocaleString()} extra
            </span>
          </div>

          {/* Copy dinámico según tipo de usuario */}
          {userType === 'anonymous' && (
            <>
              <p className="text-center text-gray-700 mb-6 leading-relaxed">
                Tu texto tiene <strong>{excessChars.toLocaleString()} caracteres de más</strong>.
                Sin registro podés procesar hasta <strong>{maxChars.toLocaleString()} caracteres</strong> por vez.
              </p>

              {/* Free Benefits */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-4">
                <p className="text-sm font-bold text-green-900 mb-3">
                  Registrándote GRATIS obtenés:
                </p>
                <ul className="space-y-2 text-sm text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold text-base">✓</span>
                    <span><strong>Hasta {freeMaxChars.toLocaleString()} caracteres</strong> ({freeMultiplier}x más)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold text-base">✓</span>
                    <span><strong>15 usos diarios</strong> (vs 3 actual)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold text-base">✓</span>
                    <span><strong>Historial</strong> de tus últimos análisis</span>
                  </li>
                </ul>
              </div>

              {/* Pro Benefits */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 mb-6">
                <p className="text-sm font-bold text-blue-900 mb-3">
                  Con Plan Premium obtenés:
                </p>
                <ul className="space-y-2 text-sm text-blue-900">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold text-base">✓</span>
                    <span><strong>Hasta {premiumMaxChars.toLocaleString()} caracteres</strong> ({proMultiplier}x más que ahora)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold text-base">✓</span>
                    <span><strong>Usos ilimitados</strong> todos los días</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold text-base">✓</span>
                    <span><strong>5 modos premium</strong> + subida de archivos</span>
                  </li>
                </ul>
                <p className="text-xs text-blue-900 mt-3 font-medium">
                  Express $3.99/24h • Premium $12.99/mes • Ahorra 20% anual
                </p>
              </div>

              {/* CTA - Registro gratis primero */}
              <a
                href="/auth/signup"
                className="block w-full text-center bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-2"
              >
                Registrarme Gratis en 10 segundos
              </a>

              {/* Secondary CTA - Ver Planes */}
              <a
                href="/pricing"
                className="block w-full text-center text-blue-900 hover:text-blue-900 font-semibold py-2 transition-colors text-sm mb-3"
              >
                O ver Express y Premium →
              </a>
            </>
          )}

          {userType === 'free' && (
            <>
              <p className="text-center text-gray-700 mb-5 leading-relaxed">
                Tu texto tiene <strong>{excessChars.toLocaleString()} caracteres de más</strong>.
                Con el Plan Free podés procesar hasta <strong>{maxChars.toLocaleString()} caracteres</strong> por vez.
              </p>

              {/* Dual option: Express vs Premium */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="border border-amber-200 bg-amber-50 rounded-xl p-4">
                  <p className="text-xs font-bold text-amber-800 mb-1">⚡ Express Pass</p>
                  <p className="text-2xl font-bold text-amber-900">$3.99</p>
                  <p className="text-xs text-amber-700">/ 24 horas</p>
                  <p className="text-xs text-amber-600 mt-1">Sin suscripción</p>
                  <ul className="text-xs text-amber-800 mt-2 space-y-1">
                    <li>✓ <strong>{premiumMaxChars.toLocaleString()} chars</strong></li>
                    <li>✓ Usos ilimitados hoy</li>
                  </ul>
                </div>
                <div className="border-2 border-blue-200 bg-blue-50 rounded-xl p-4">
                  <p className="text-xs font-bold text-blue-900 mb-1">Premium</p>
                  <p className="text-2xl font-bold text-blue-900">$12.99</p>
                  <p className="text-xs text-blue-900">/ mes</p>
                  <p className="text-xs text-blue-900 mt-1">Ahorra 20% anual</p>
                  <ul className="text-xs text-blue-900 mt-2 space-y-1">
                    <li>✓ <strong>{premiumMaxChars.toLocaleString()} chars</strong></li>
                    <li>✓ Usos ilimitados</li>
                    <li>✓ 5 modos premium</li>
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <a
                href="/pricing"
                className="block w-full text-center bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-3"
              >
                Ver Express y Premium
              </a>
            </>
          )}

          {/* Alternative: Close and trim */}
          <button
            onClick={onClose}
            className="w-full text-center text-gray-600 hover:text-gray-800 font-medium py-2 transition-colors text-sm"
          >
            Volver y reducir mi texto
          </button>

          {/* Trust badge */}
          <p className="text-xs text-center text-gray-500 mt-4">
            Pago seguro con Stripe • Cancela cuando quieras
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        . {
          animation: fade-in 0.2s ease-out;
        }

        . {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
