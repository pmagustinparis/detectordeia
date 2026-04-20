'use client';

import { useState } from 'react';
import { ProductIcons, Icon } from '@/lib/icons';
import ParafraseadorMain from '../components/ParafraseadorMain';
import EmailCaptureModal from '../components/EmailCaptureModal';
import FAQSection from '../components/FAQSection';
import type { UserStatus } from '@/lib/types/user-status';

export default function ParafraseadorClient({ initialUserStatus }: { initialUserStatus?: UserStatus }) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailModalSource, setEmailModalSource] = useState('');
  const userPlan = initialUserStatus?.plan_type ?? 'free';

  const openEmailModal = (source: string) => {
    setEmailModalSource(source);
    setIsEmailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white pb-10 px-2">
      {/* HERO SECTION */}
      <section className="w-full flex flex-col items-center justify-center pt-6 pb-2 px-2 relative overflow-hidden">
        <ParafraseadorMain initialUserStatus={initialUserStatus} />
      </section>

      {/* Premium Upsell Block - SOLO para usuarios FREE */}
      {userPlan !== 'premium' && (
        <section className="max-w-3xl mx-auto mt-12 mb-16 px-2">
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <h2 className="text-2xl font-bold text-gray-800">
                ¿Necesitas más modos de parafraseo?
              </h2>
            </div>

            <p className="text-blue-900 font-semibold text-lg mb-4">
              Express Pass o Premium – acceso completo
            </p>

            <div className="grid md:grid-cols-2 gap-3 mb-6 text-left">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-lg">✓</span>
                <span className="text-sm text-gray-700">5 modos de parafraseo (Formal, Creativo, etc.)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-lg">✓</span>
                <span className="text-sm text-gray-700">Sin límite de caracteres por uso</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-lg">✓</span>
                <span className="text-sm text-gray-700">Carga de archivos (.txt, .docx, .pdf)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-lg">✓</span>
                <span className="text-sm text-gray-700">Historial completo</span>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Express Pass desde <strong className="text-gray-700">$3.99</strong> · pago único sin renovación &nbsp;·&nbsp; Premium desde <strong className="text-gray-700">$12.99/mes</strong>
            </p>

            <a
              href="/pricing"
              className="inline-block w-full md:w-auto px-8 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              Ver Planes
            </a>
          </div>
        </section>
      )}

      {/* Por qué usar el parafraseador Section */}
      <section className="max-w-5xl mx-auto mb-16 px-2">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          <span className="text-blue-900">¿Por qué usar</span>
          <span className="text-gray-800"> el parafraseador de DetectorDeIA?</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          La mejor opción para parafrasear textos en español
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Beneficio 1 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
              <Icon icon={ProductIcons.Confidence} size="2xl" className="text-blue-900" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Sin plagio garantizado</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Nuestro parafraseador reescribe tu texto de forma única, garantizando que el resultado sea completamente original y libre de plagio para tus trabajos académicos o profesionales.
            </p>
          </div>

          {/* Beneficio 2 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
              <Icon icon={ProductIcons.Fast} size="2xl" className="text-blue-900" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Instantáneo</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Obtén tu texto parafraseado en menos de 10 segundos. No pierdas tiempo reescribiendo manualmente. Parafrasea y continúa con tu trabajo de inmediato.
            </p>
          </div>

          {/* Beneficio 3 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
              <Icon icon={ProductIcons.Fast} size="2xl" className="text-blue-900" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Especializado en español</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              No es una traducción del inglés. Nuestro parafraseador está optimizado específicamente para español, entendiendo matices, modismos y estructuras propias del idioma.
            </p>
          </div>

          {/* Beneficio 4 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
              <Icon icon={ProductIcons.Confidence} size="2xl" className="text-blue-900" />
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-blue-900">
          ¿Cómo funciona el parafraseador?
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Tres simples pasos para reescribir tu texto
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-sm">1</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Pega tu texto</h3>
            <p className="text-gray-600 text-sm">
              Copia cualquier texto que quieras reescribir. Puede ser un ensayo, artículo, trabajo académico o cualquier contenido.
            </p>
          </div>

          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-sm">2</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Haz clic en "Parafrasear"</h3>
            <p className="text-gray-600 text-sm">
              Nuestro sistema reescribirá tu texto con otras palabras, manteniendo exactamente el mismo significado en segundos.
            </p>
          </div>

          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-sm">3</span>
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          <span className="text-blue-900">¿Quién usa</span>
          <span className="text-gray-800"> el parafraseador?</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Ideal para estudiantes, escritores, docentes y profesionales
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
              <Icon icon={ProductIcons.GraduationCap} size="2xl" className="text-blue-900" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Estudiantes</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Parafrasea citas, fuentes y textos de referencia para tus trabajos académicos sin caer en plagio.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
              <Icon icon={ProductIcons.PenTool} size="2xl" className="text-blue-900" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Escritores</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Reescribe borradores, mejora artículos y genera versiones alternativas de tu contenido.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
              <Icon icon={ProductIcons.Users} size="2xl" className="text-blue-900" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Docentes</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Crea versiones alternativas de materiales educativos, ejercicios y exámenes.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
              <Icon icon={ProductIcons.Briefcase} size="2xl" className="text-blue-900" />
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
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Icon icon={ProductIcons.Humanizer} size="2xl" className="text-blue-900" />
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
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span>Probar el Humanizador</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Detector */}
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Icon icon={ProductIcons.Detector} size="2xl" className="text-blue-900" />
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
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
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
          <div className="bg-blue-900 rounded-xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 !text-white">
                Comienza a parafrasear tus textos ahora
              </h2>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Reescribe cualquier texto con otras palabras manteniendo el significado. Sin plagio, sin registro, optimizado para español.
              </p>
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white text-blue-900 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg"
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
