'use client';

import { useState } from 'react';
import HumanizadorMain from '../components/HumanizadorMain';
import EmailCaptureModal from '../components/EmailCaptureModal';
import FAQSection from '../components/FAQSection';

export default function HumanizadorClient() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailModalSource, setEmailModalSource] = useState('');

  const openEmailModal = (source: string) => {
    setEmailModalSource(source);
    setIsEmailModalOpen(true);
  };

  return (
    <div className="min-h-screen pb-10 px-2">
      {/* HERO SECTION */}
      <section className="w-full flex flex-col items-center justify-center pt-6 pb-2 px-2 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-violet-300/20 rounded-full blur-3xl -z-10 animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl -z-10 animate-float" style={{animationDelay: '1s'}}></div>

        {/* Hero Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-2 mt-2 leading-tight animate-fade-in">
          <span className="gradient-text-primary">Humanizador de IA</span>
          <br />
          <span className="text-gray-800">en Español</span>
        </h1>

        <p className="text-base md:text-lg text-gray-600 text-center mb-6 max-w-2xl animate-fade-in" style={{animationDelay: '0.2s'}}>
          Transforma texto generado por IA en contenido natural y humano
        </p>

        {/* COMPONENTE PRINCIPAL - HERRAMIENTA */}
        <HumanizadorMain />
      </section>

      {/* Premium Upsell Block */}
      <section className="max-w-3xl mx-auto mt-12 mb-16 px-2">
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-3xl shadow-xl border border-violet-200 p-8 text-center card-elevated">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-3xl">🔓</span>
            <h2 className="text-2xl font-bold text-gray-800">
              ¿Necesitas humanizar textos más largos?
            </h2>
          </div>

          <p className="text-violet-700 font-semibold text-lg mb-4">
            Próximamente: Plan Premium
          </p>

          <div className="grid md:grid-cols-2 gap-3 mb-6 text-left">
            <div className="flex items-start gap-2">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-sm text-gray-700">Hasta 15,000 caracteres por uso</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-sm text-gray-700">Modo Avanzado con adaptación regional</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-sm text-gray-700">Historial completo de humanizaciones</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-sm text-gray-700">Carga de archivos (.txt, .docx, .pdf)</span>
            </div>
          </div>

          <p className="text-xl font-bold text-gray-800 mb-4">
            Desde $7/mes
          </p>

          <button
            onClick={() => openEmailModal('humanizador-bottom-upsell')}
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Avísame cuando esté disponible
          </button>
        </div>
      </section>

      {/* Por qué usar el humanizador Section */}
      <section className="max-w-5xl mx-auto mb-16 px-2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">
          <span className="gradient-text-primary">¿Por qué usar</span>
          <span className="text-gray-800"> el humanizador de DetectorDeIA?</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          La mejor opción para humanizar textos en español
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Beneficio 1 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-100 p-6 card-elevated">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-4 shadow-md">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Especializado en español</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Nuestro humanizador está optimizado específicamente para español, no es una simple traducción. Entiende modismos, regionalismos y estructuras del español de LATAM y España.
            </p>
          </div>

          {/* Beneficio 2 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-100 p-6 card-elevated">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4 shadow-md">
              <span className="text-3xl">🔒</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">100% Privado</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              No almacenamos tu contenido. Tu texto se procesa y se elimina inmediatamente. Usas la herramienta de forma completamente anónima sin necesidad de registro.
            </p>
          </div>

          {/* Beneficio 3 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-100 p-6 card-elevated">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4 shadow-md">
              <span className="text-3xl">⚡</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Resultados instantáneos</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Obtén tu texto humanizado en 5-10 segundos. No esperes horas ni días. Humaniza y continúa con tu trabajo de inmediato.
            </p>
          </div>

          {/* Beneficio 4 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-100 p-6 card-elevated">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center mb-4 shadow-md">
              <span className="text-3xl">✅</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Mantiene el significado</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              No cambiamos el mensaje de tu texto, solo la forma en que está escrito. El contenido, ideas y argumentos se preservan intactos.
            </p>
          </div>
        </div>
      </section>

      {/* Cómo Funciona Section */}
      <section className="max-w-5xl mx-auto mb-16 px-2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">
          <span className="gradient-text-primary">¿Cómo funciona</span>
          <span className="text-gray-800"> el humanizador de IA?</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Tres simples pasos para transformar tu texto
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">1️⃣</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Pega tu texto</h3>
            <p className="text-gray-600 text-sm">
              Copia el texto generado por cualquier IA (ChatGPT, Claude, Gemini, etc.) y pégalo en el cuadro.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">2️⃣</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Haz clic en "Humanizar"</h3>
            <p className="text-gray-600 text-sm">
              Nuestro sistema analizará y transformará tu texto en contenido natural en segundos.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">3️⃣</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Copia el resultado</h3>
            <p className="text-gray-600 text-sm">
              Obtén tu texto humanizado listo para usar. Cópialo o descárgalo como .txt.
            </p>
          </div>
        </div>
      </section>

      {/* Casos de Uso Section */}
      <section className="max-w-5xl mx-auto mb-16 px-2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">
          <span className="gradient-text-primary">¿Quién usa</span>
          <span className="text-gray-800"> el humanizador de IA?</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Ideal para estudiantes, profesionales, creadores y docentes
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
              <span className="text-4xl">🎓</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Estudiantes</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Humaniza ensayos y trabajos generados con IA para que suenen más naturales en tus entregas.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
              <span className="text-4xl">💼</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Profesionales</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Mejora emails, reportes y presentaciones para que tengan un tono más personal y profesional.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
              <span className="text-4xl">✍️</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Creadores</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Transforma borradores de IA en contenido auténtico para blogs, redes sociales y newsletters.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
              <span className="text-4xl">👨‍🏫</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Docentes</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Mejora materiales educativos generados con IA para que sean más comprensibles y cercanos.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Link a otras herramientas */}
      <section className="max-w-4xl mx-auto mb-16 px-2">
        <div className="space-y-6">
          {/* Detector */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl shadow-lg border border-cyan-200 p-8 card-elevated">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-3xl">🔍</span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  ¿Quieres verificar si tu texto pasa como humano?
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Después de humanizar tu texto, usa nuestro Detector de IA para verificar que suene natural y no active detectores.
                </p>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span>Probar el Detector de IA</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Parafraseador */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-lg border border-purple-200 p-8 card-elevated">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-3xl">🔄</span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  ¿Necesitas reescribir tu texto con otras palabras?
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Usa nuestro Parafraseador para reescribir tu texto manteniendo el significado. Sin plagio, optimizado para español.
                </p>
                <a
                  href="/parafraseador"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span>Probar el Parafraseador</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="max-w-4xl mx-auto mb-16 px-2">
        <div className="bg-gradient-to-br from-violet-600 to-purple-600 rounded-3xl shadow-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          {/* Elementos decorativos */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-300/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Comienza a humanizar tus textos ahora
            </h2>
            <p className="text-lg md:text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
              Transforma texto generado por IA en contenido natural y humano en segundos. Sin registro, 100% privado, optimizado para español.
            </p>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-white text-violet-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg"
            >
              Probar el humanizador gratis
            </button>
          </div>
        </div>
      </section>

      {/* Modal de captura de email */}
      <EmailCaptureModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        source={emailModalSource}
      />

    </div>
  );
}
