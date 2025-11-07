import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4">
            {user.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt={user.user_metadata?.full_name || 'Usuario'}
                className="w-20 h-20 rounded-full border-4 border-violet-200"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-violet-200">
                {user.email?.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                ¡Hola, {user.user_metadata?.full_name || user.email?.split('@')[0]}!
              </h1>
              <p className="text-gray-600 mt-1">{user.email}</p>
              <span className="inline-block mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                ✓ Plan Free
              </span>
            </div>
          </div>
        </div>

        {/* Bienvenida */}
        <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl shadow-lg p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-2">🎉 ¡Bienvenido a DetectorDeIA!</h2>
          <p className="text-violet-100">
            Tu cuenta está activa. Pronto podrás ver tu historial, estadísticas de uso y mucho más.
          </p>
        </div>

        {/* Features Coming Soon */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Estadísticas de Uso</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Próximamente podrás ver cuántas veces usaste cada herramienta y tus límites diarios.
            </p>
            <span className="inline-block bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-xs font-semibold">
              Próximamente
            </span>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                <span className="text-2xl">📜</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Historial</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Accede a tus últimos 10 usos de las herramientas (últimos 7 días).
            </p>
            <span className="inline-block bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-xs font-semibold">
              Próximamente
            </span>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Plan Premium</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Actualiza a Premium para desbloquear límites más altos, modos avanzados y más.
            </p>
            <span className="inline-block bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-xs font-semibold">
              Próximamente
            </span>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Configuración</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Gestiona tu perfil, preferencias y más configuraciones de tu cuenta.
            </p>
            <span className="inline-block bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-xs font-semibold">
              Próximamente
            </span>
          </div>
        </div>

        {/* CTA de herramientas */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Empieza a usar las herramientas</h3>
          <div className="flex flex-wrap gap-4">
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-lg transition-all"
            >
              <span>🔍</span>
              Detector de IA
            </a>
            <a
              href="/humanizador"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-all"
            >
              <span>✨</span>
              Humanizador
            </a>
            <a
              href="/parafraseador"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all"
            >
              <span>🔄</span>
              Parafraseador
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
