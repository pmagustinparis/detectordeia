'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

interface SuccessClientProps {
  sessionId?: string;
  userEmail: string;
  planType: string;
}

export default function SuccessClient({ sessionId, userEmail, planType }: SuccessClientProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(timer); router.push('/dashboard'); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [router]);

  const isExpress = planType === '24h' || planType === '7d' || planType === 'express';
  const isSemestral = planType === 'semestral';
  const planLabel = isSemestral ? 'Semestral Pass' : isExpress ? 'Express Pass' : planType;
  const title = isExpress ? '¡Express Pass activado!' : isSemestral ? '¡Semestral Pass activado!' : '¡Plan activado!';
  const description = planType === '24h'
    ? 'Tu pase Express ha sido activado. Tenés acceso ilimitado a todas las herramientas por las próximas 24 horas.'
    : planType === '7d'
    ? 'Tu pase Express ha sido activado. Tenés acceso ilimitado a todas las herramientas durante los próximos 7 días.'
    : isSemestral
    ? 'Tu Semestral Pass ha sido activado. Tenés acceso ilimitado a todas las herramientas durante los próximos 6 meses.'
    : 'Tu plan ha sido activado exitosamente. Ahora tenés acceso ilimitado a todas las herramientas de detectordeia.ai.';

  return (
    <div className="min-h-screen bg-papel flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-papel-2 rounded-xl border border-line p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-verde-050 rounded-full p-4">
            <CheckCircle className="w-16 h-16 text-verde" />
          </div>
        </div>

        <h1 className="text-3xl text-tinta mb-4">{title}</h1>
        <p className="text-tinta-soft mb-6 font-sans">{description}</p>

        <div className="bg-papel rounded-lg border border-line p-4 mb-6 text-left">
          <div className="space-y-2 font-sans">
            <div className="flex justify-between">
              <span className="text-mute">Email:</span>
              <span className="font-medium text-tinta">{userEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-mute">Plan:</span>
              <span className="font-medium text-tinta">{planLabel}</span>
            </div>
            {sessionId && (
              <div className="flex justify-between text-sm">
                <span className="text-mute">Sesión:</span>
                <span className="font-mono text-tinta-soft truncate max-w-[200px]">{sessionId.substring(0, 20)}...</span>
              </div>
            )}
          </div>
        </div>

        <div className="text-left mb-6">
          <h3 className="font-medium text-tinta mb-3 font-sans">Lo que incluye tu plan:</h3>
          <ul className="space-y-2 text-sm text-tinta-soft font-sans">
            {['Detector: Usos y caracteres ilimitados', 'Humanizador: Usos y caracteres ilimitados', 'Parafraseador: Usos y caracteres ilimitados', '5 modos avanzados para Humanizador y Parafraseador', 'Historial de 100 usos durante 30 días'].map((item, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle className="w-4 h-4 text-verde mr-2 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-mute font-sans">
            Redirigiendo al dashboard en <span className="font-bold text-verde">{countdown}</span> segundos...
          </p>
          <button onClick={() => router.push('/dashboard')} className="w-full bg-verde text-papel font-medium py-3 px-6 rounded-lg hover:bg-verde-deep transition-colors font-sans">
            Ir al Dashboard ahora
          </button>
        </div>
      </div>
    </div>
  );
}
