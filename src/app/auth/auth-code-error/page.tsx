// Página de error cuando falla el OAuth

export default function AuthCodeError() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl  p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">❌</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Error de autenticación
        </h1>
        <p className="text-gray-600 mb-6">
          Hubo un problema al iniciar sesión con Google. Por favor, intenta nuevamente.
        </p>
        <a
          href="/"
          className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
