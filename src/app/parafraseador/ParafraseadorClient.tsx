'use client';

import { useState, useEffect } from 'react';
import { ProductIcons, Icon } from '@/lib/icons';
import ParafraseadorMain from '../components/ParafraseadorMain';
import EmailCaptureModal from '../components/EmailCaptureModal';
import FAQSection from '../components/FAQSection';
import { useAuth } from '@/lib/hooks/useAuth';

export default function ParafraseadorClient() {
  const { isAuthenticated, user } = useAuth();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailModalSource, setEmailModalSource] = useState('');
  const [userPlan, setUserPlan] = useState<'free' | 'premium'>('free');

  // Obtener plan del usuario
  useEffect(() => {
    async function fetchUserPlan() {
      if (!isAuthenticated || !user) {
        setUserPlan('free');
        return;
      }

      try {
        const response = await fetch('/api/user/plan');
        if (response.ok) {
          const data = await response.json();
          setUserPlan(data.plan_type || 'free');
        }
      } catch (error) {
        console.error('Error fetching user plan:', error);
        setUserPlan('free');
      }
    }

    fetchUserPlan();
  }, [isAuthenticated, user]);

  const openEmailModal = (source: string) => {
    setEmailModalSource(source);
    setIsEmailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-10 px-2">
      {/* HERO SECTION */}
      <section className="w-full flex flex-col items-center justify-center pt-6 pb-2 px-2 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-violet-300/20 rounded-full blur-3xl -z-10 animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl -z-10 animate-float" style={{animationDelay: '1s'}}></div>

        {/* Hero Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-2 mt-2 leading-tight animate-fade-in">
          <span className="gradient-text-primary">Parafraseador de IA</span>
          <br />
          <span className="text-gray-800">en Español</span>
        </h1>

        <p className="text-base md:text-lg text-gray-600 text-center mb-6 max-w-2xl animate-fade-in" style={{animationDelay: '0.2s'}}>
          Reescribe cualquier texto con otras palabras manteniendo el significado. Sin plagio.
        </p>

        {/* COMPONENTE PRINCIPAL - HERRAMIENTA */}
        <ParafraseadorMain />
      </section>

      {/* Premium Upsell Block - SOLO para usuarios FREE */}
      {userPlan !== 'premium' && (
        <section className="max-w-3xl mx-auto mt-12 mb-16 px-2">
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-3xl shadow-xl border border-violet-200 p-8 text-center card-elevated">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-3xl">🔓</span>
              <h2 className="text-2xl font-bold text-gray-800">
                ¿Necesitas más modos de parafraseo?
              </h2>
            </div>

            <p className="text-violet-700 font-semibold text-lg mb-4">
              Plan Pro – Ya Disponible
            </p>

            <div className="grid md:grid-cols-2 gap-3 mb-6 text-left">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-lg">✓</span>
                <span className="text-sm text-gray-700">5 modos de parafraseo (Formal, Creativo, etc.)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-lg">✓</span>
                <span className="text-sm text-gray-700">Hasta 15,000 caracteres por uso</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-lg">✓</span>
                <span className="text-sm text-gray-700">Slider de intensidad de parafraseo</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-lg">✓</span>
                <span className="text-sm text-gray-700">Historial completo</span>
              </div>
            </div>

            <p className="text-xl font-bold text-gray-800 mb-4">
              Desde $10/mes • Ahorra 20% con plan anual
            </p>

            <a
              href="/pricing"
              className="inline-block w-full md:w-auto px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              Ver Planes y Precios
            </a>
          </div>
        </section>
      )}

      {/* Por qué usar el parafraseador Section */}
      <section className="max-w-5xl mx-auto mb-16 px-2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">
          <span className="gradient-text-primary">¿Por qué usar</span>
          <span className="text-gray-800"> el parafraseador de DetectorDeIA?</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          La mejor opción para parafrasear textos en español
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Beneficio 1 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-100 p-6 card-elevated">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-4 shadow-md">
              <Icon icon={ProductIcons.Target} size="2xl" className="text-violet-600" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Sin plagio garantizado</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Nuestro parafraseador reescribe tu texto de forma única, garantizando que el resultado sea completamente original y libre de plagio para tus trabajos académicos o profesionales.
            </p>
          </div>

          {/* Beneficio 2 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-100 p-6 card-elevated">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4 shadow-md">
              <Icon icon={ProductIcons.Zap} size="2xl" className="text-emerald-600" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Instantáneo</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Obtén tu texto parafraseado en menos de 10 segundos. No pierdas tiempo reescribiendo manualmente. Parafrasea y continúa con tu trabajo de inmediato.
            </p>
          </div>

          {/* Beneficio 3 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-100 p-6 card-elevated">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4 shadow-md">
              <span className="text-3xl">🇪🇸</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Especializado en español</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              No es una traducción del inglés. Nuestro parafraseador está optimizado específicamente para español, entendiendo matices, modismos y estructuras propias del idioma.
            </p>
          </div>

          {/* Beneficio 4 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-100 p-6 card-elevated">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center mb-4 shadow-md">
              <span className="text-3xl">✅</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Significado preservado</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              No cambiamos el mensaje de tu texto, solo la forma en que está escrito. Todas las ideas, argumentos y datos se mantienen intactos.
            </p>
          </div>
        </div>
      </section>

      {/* Cómo Funciona Section */}
      <section className="max-w-5xl mx-auto mb-16 px-2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">
          <span className="gradient-text-primary">¿Cómo funciona</span>
          <span className="text-gray-800"> el parafraseador?</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Tres simples pasos para reescribir tu texto
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">1️⃣</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Pega tu texto</h3>
            <p className="text-gray-600 text-sm">
              Copia cualquier texto que quieras reescribir. Puede ser un ensayo, artículo, trabajo académico o cualquier contenido.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">2️⃣</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Haz clic en "Parafrasear"</h3>
            <p className="text-gray-600 text-sm">
              Nuestro sistema reescribirá tu texto con otras palabras, manteniendo exactamente el mismo significado en segundos.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">3️⃣</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Copia el resultado</h3>
            <p className="text-gray-600 text-sm">
              Obtén tu texto parafraseado listo para usar. Cópialo directamente o descárgalo como .txt sin plagio.
            </p>
          </div>
        </div>
      </section>

      {/* Casos de Uso Section */}
      <section className="max-w-5xl mx-auto mb-16 px-2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">
          <span className="gradient-text-primary">¿Quién usa</span>
          <span className="text-gray-800"> el parafraseador?</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Ideal para estudiantes, escritores, docentes y profesionales
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
              <Icon icon={ProductIcons.GraduationCap} size="2xl" className="text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Estudiantes</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Parafrasea citas, fuentes y textos de referencia para tus trabajos académicos sin caer en plagio.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
              <Icon icon={ProductIcons.PenTool} size="2xl" className="text-purple-600" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Escritores</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Reescribe borradores, mejora artículos y genera versiones alternativas de tu contenido.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
              <Icon icon={ProductIcons.Users} size="2xl" className="text-green-600" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Docentes</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Crea versiones alternativas de materiales educativos, ejercicios y exámenes.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-50 p-6 flex flex-col items-center text-center card-elevated group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
              <Icon icon={ProductIcons.Briefcase} size="2xl" className="text-violet-600" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Profesionales</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Mejora documentos, reportes y comunicaciones empresariales de forma más clara.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Link a otras herramientas */}
      <section className="max-w-4xl mx-auto mb-16 px-2">
        <div className="space-y-6">
          {/* Humanizador */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl shadow-lg border border-emerald-200 p-8 card-elevated">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg flex-shrink-0">
                <Icon icon={ProductIcons.Humanizer} size="2xl" className="text-emerald-600" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  ¿Tu texto suena muy robótico o generado por IA?
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Usa nuestro Humanizador de IA para hacer que tu texto parafraseado suene más natural y humano.
                </p>
                <a
                  href="/humanizador"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span>Probar el Humanizador</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Detector */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl shadow-lg border border-cyan-200 p-8 card-elevated">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-3xl">🔍</span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  ¿Quieres verificar si tu texto detecta como IA?
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Usa nuestro Detector de IA para analizar si tu texto parafraseado pasa como contenido humano.
                </p>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span>Probar el Detector</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final Section - SOLO para usuarios FREE */}
      {userPlan !== 'premium' && (
        <section className="max-w-4xl mx-auto mb-16 px-2">
          <div className="bg-gradient-to-br from-violet-600 to-purple-600 rounded-3xl shadow-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            {/* Elementos decorativos */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-300/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Comienza a parafrasear tus textos ahora
              </h2>
              <p className="text-lg md:text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
                Reescribe cualquier texto con otras palabras manteniendo el significado. Sin plagio, sin registro, optimizado para español.
              </p>
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white text-violet-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg"
              >
                Probar el parafraseador gratis
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Modal de captura de email */}
      <EmailCaptureModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        source={emailModalSource}
      />

    </div>
  );
}
