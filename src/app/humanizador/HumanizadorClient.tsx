'use client';

import { useState } from 'react';
import { ProductIcons, Icon } from '@/lib/icons';
import HumanizadorMain from '../components/HumanizadorMain';
import EmailCaptureModal from '../components/EmailCaptureModal';
import FAQSection from '../components/FAQSection';
import type { UserStatus } from '@/lib/types/user-status';

export default function HumanizadorClient({ initialUserStatus }: { initialUserStatus?: UserStatus }) {
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
        <HumanizadorMain initialUserStatus={initialUserStatus} />
      </section>

      {/* Premium Upsell Block - SOLO para usuarios FREE */}
      {userPlan !== 'premium' && (
        <section className="max-w-3xl mx-auto mt-12 mb-16 px-2">
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <h2 className="text-2xl font-bold text-gray-800">
                ¿Necesitas humanizar textos más largos?
              </h2>
            </div>

            <p className="text-blue-900 font-semibold text-lg mb-4">
              Express Pass o Premium – acceso completo
            </p>

            <div className="grid md:grid-cols-2 gap-3 mb-6 text-left">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-lg">✓</span>
                <span className="text-sm text-gray-700">Sin límite de caracteres por uso</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-lg">✓</span>
                <span className="text-sm text-gray-700">5 modos (Estándar + Creativo gratis, Formal/Simplificado/Académico en Premium)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-lg">✓</span>
                <span className="text-sm text-gray-700">Carga de archivos (.txt, .docx, .pdf)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-lg">✓</span>
                <span className="text-sm text-gray-700">Historial completo de humanizaciones</span>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Express Pass desde <strong className="text-gray-700">$3.99</strong> · pago único sin renovación &nbsp;·&nbsp; Premium desde <strong className="text-gray-700">$12.99/mes</strong>
            </p>

            <a
              href="/pricing"
              className="inline-block w-full md:w-auto px-8 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl transition-all text-center"
            >
              Ver Planes
            </a>
          </div>
        </section>
      )}

      {/* Por qué usar el humanizador Section */}
      <section className="max-w-5xl mx-auto mb-16 px-2">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          <span className="text-blue-900">¿Por qué usar</span>
          <span className="text-gray-800"> el humanizador de DetectorDeIA?</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          La mejor opción para humanizar textos en español
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Beneficio 1 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-4 shadow-md">
              <Icon icon={ProductIcons.Confidence} size="2xl" className="text-blue-900" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Especializado en español</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Nuestro humanizador está optimizado específicamente para español, no es una simple traducción. Entiende modismos, regionalismos y estructuras del español de LATAM y España.
            </p>
          </div>

          {/* Beneficio 2 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-4 shadow-md">
              <Icon icon={ProductIcons.Locked} size="2xl" className="text-blue-900" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">100% Privado</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              No almacenamos tu contenido. Tu texto se procesa y se elimina inmediatamente. Usas la herramienta de forma completamente anónima sin necesidad de registro.
            </p>
          </div>

          {/* Beneficio 3 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-4 shadow-md">
              <Icon icon={ProductIcons.Fast} size="2xl" className="text-blue-900" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Resultados instantáneos</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Obtén tu texto humanizado en 5-10 segundos. No esperes horas ni días. Humaniza y continúa con tu trabajo de inmediato.
            </p>
          </div>

          {/* Beneficio 4 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
              <Icon icon={ProductIcons.Confidence} size="2xl" className="text-blue-900" />
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          <span className="text-blue-900">¿Cómo funciona</span>
          <span className="text-gray-800"> el humanizador de IA?</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Tres simples pasos para transformar tu texto
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-sm">1</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Pega tu texto</h3>
            <p className="text-gray-600 text-sm">
              Copia el texto generado por cualquier IA (ChatGPT, Claude, Gemini, etc.) y pégalo en el cuadro.
            </p>
          </div>

          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-sm">2</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Haz clic en "Humanizar"</h3>
            <p className="text-gray-600 text-sm">
              Nuestro sistema analizará y transformará tu texto en contenido natural en segundos.
            </p>
          </div>

          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-sm">3</span>
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          <span className="text-blue-900">¿Quién usa</span>
          <span className="text-gray-800"> el humanizador de IA?</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Ideal para estudiantes, profesionales, creadores y docentes
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
              <Icon icon={ProductIcons.GraduationCap} size="2xl" className="text-blue-900" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Estudiantes</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Humaniza ensayos y trabajos generados con IA para que suenen más naturales en tus entregas.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
              <Icon icon={ProductIcons.Briefcase} size="2xl" className="text-blue-900" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Profesionales</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Mejora emails, reportes y presentaciones para que tengan un tono más personal y profesional.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
              <Icon icon={ProductIcons.PenTool} size="2xl" className="text-blue-900" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Creadores</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Transforma borradores de IA en contenido auténtico para blogs, redes sociales y newsletters.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
              <Icon icon={ProductIcons.Users} size="2xl" className="text-blue-900" />
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

      {/* VARIANTES DEL HUMANIZADOR - Internal Linking SEO */}
      <section className="max-w-5xl mx-auto mb-12 px-2">
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <p className="text-gray-700 text-sm mb-3">
            <span className="font-semibold">También buscado como:</span>
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/convertidor-ia-a-humano"
              className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200"
            >
              Convertidor IA a Humano
            </a>
            <a
              href="/transformador-texto-ia"
              className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200"
            >
              Transformador de Texto IA
            </a>
          </div>
        </div>
      </section>

      {/* Link a otras herramientas */}
      <section className="max-w-4xl mx-auto mb-16 px-2">
        <div className="space-y-6">
          {/* Detector */}
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Icon icon={ProductIcons.Detector} size="2xl" className="text-blue-900" />
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
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl shadow-md hover:shadow-sm transition-all duration-300"
                >
                  <span>Probar el Detector de IA</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Parafraseador */}
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Icon icon={ProductIcons.Paraphraser} size="2xl" className="text-blue-900" />
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
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl shadow-md hover:shadow-sm transition-all duration-300"
                >
                  <span>Probar el Parafraseador</span>
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
                Comienza a humanizar tus textos ahora
              </h2>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Transforma texto generado por IA en contenido natural y humano en segundos. Sin registro, 100% privado, optimizado para español.
              </p>
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white text-blue-900 font-bold rounded-xl shadow-sm hover:shadow-sm transition-all duration-300 text-lg"
              >
                Probar el humanizador gratis
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
