import ResetPasswordForm from '@/app/components/ResetPasswordForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resetear Contraseña - DetectorDeIA',
  description: 'Crea una nueva contraseña para tu cuenta de DetectorDeIA',
};

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo y Header */}
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-900 flex items-center justify-center ">
                <span className="text-2xl">🎯</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">DetectorDeIA</h1>
            </div>
          </a>
        </div>

        {/* Card con el formulario */}
        <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
          <ResetPasswordForm />
        </div>

        {/* Link al home */}
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-gray-600 hover:text-blue-900 transition-colors">
            ← Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
