export default function PreciosPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Plan Gratuito */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Plan Gratuito</h3>
        <p className="text-gray-600 mb-6">Ideal para uso ocasional y pruebas.</p>
        <ul className="space-y-4 mb-8">
          <li className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Hasta 5 análisis diarios</span>
          </li>
          <li className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Máximo 500 caracteres por análisis</span>
          </li>
        </ul>
        <a href="/" className="block w-full text-center bg-[#a259f7] hover:bg-[#7c3aed] text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          Probar Ahora
        </a>
      </div>
      {/* Plan Premium */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Plan Premium</h3>
        <p className="text-gray-600 mb-6">Ideal para uso profesional y frecuente.</p>
        <ul className="space-y-4 mb-8">
          <li className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Análisis ilimitados</span>
          </li>
          <li className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Hasta 10,000 caracteres por análisis</span>
          </li>
        </ul>
        <a href="/premium" className="block w-full text-center bg-[#a259f7] hover:bg-[#7c3aed] text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          Upgrade a Premium
        </a>
      </div>
    </div>
  );
} 