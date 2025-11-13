import LoginForm from '@/app/components/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iniciar Sesión - DetectorDeIA',
  description: 'Inicia sesión en tu cuenta de DetectorDeIA',
};

export default function LoginPage() {
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
            Inicia Sesión
          </h2>
          <p className="text-gray-600">
            Bienvenido de vuelta
          </p>
        </div>

        {/* Card con el formulario */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <LoginForm />
        </div>

        {/* Link al home */}
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-gray-600 hover:text-violet-600 transition-colors">
            ← Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
