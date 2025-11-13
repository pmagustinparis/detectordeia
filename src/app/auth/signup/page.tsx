import SignupForm from '@/app/components/SignupForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registrarse - DetectorDeIA',
  description: 'Crea tu cuenta gratis en DetectorDeIA y obtén acceso a 15 usos diarios',
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo y Header */}
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-2xl">🎯</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">DetectorDeIA</h1>
            </div>
          </a>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Crea tu Cuenta Gratis
          </h2>
          <p className="text-gray-600">
            100% gratis · Sin tarjeta · En 30 segundos
          </p>
        </div>

        {/* Card con el formulario */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Botón de Google OAuth */}
          <SignupForm />
        </div>

        {/* Beneficios */}
        <div className="mt-6 bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-violet-100">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            ✨ Con tu cuenta gratis obtenés:
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span><strong>15 usos diarios</strong> en cada herramienta</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span><strong>1200 caracteres</strong> en Detector</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span><strong>600 caracteres</strong> en Humanizador y Parafraseador</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span><strong>Historial</strong> de tus últimos 20 análisis</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
