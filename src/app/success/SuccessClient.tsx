'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

interface SuccessClientProps {
  sessionId?: string;
  userEmail: string;
  planType: string;
}

export default function SuccessClient({
  sessionId,
  userEmail,
  planType,
}: SuccessClientProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 text-center">
        {/* Icon de éxito */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-4">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ¡Bienvenido a Premium! 🎉
        </h1>

        {/* Descripción */}
        <p className="text-gray-600 mb-6">
          Tu suscripción ha sido activada exitosamente. Ahora tienes acceso a
          todas las funciones premium de DetectorDeIA.
        </p>

        {/* Detalles */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium text-gray-900">{userEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Plan:</span>
              <span className="font-medium text-gray-900">
                {planType === 'premium' ? 'Premium' : 'Free'}
              </span>
            </div>
            {sessionId && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Sesión:</span>
                <span className="font-mono text-gray-700 truncate max-w-[200px]">
                  {sessionId.substring(0, 20)}...
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Beneficios */}
        <div className="text-left mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">
            Lo que incluye tu plan premium:
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>Detector: Usos y caracteres ilimitados</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>Humanizador: Usos y caracteres ilimitados</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>Parafraseador: Usos y caracteres ilimitados</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>5 modos premium para Humanizador y Parafraseador</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>Historial de 100 usos durante 30 días</span>
            </li>
          </ul>
        </div>

        {/* Countdown y botón */}
        <div className="space-y-3">
          <p className="text-sm text-gray-500">
            Redirigiendo al dashboard en{' '}
            <span className="font-bold text-blue-600">{countdown}</span>{' '}
            segundos...
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition-all duration-200"
          >
            Ir al Dashboard ahora
          </button>
        </div>
      </div>
    </div>
  );
}
