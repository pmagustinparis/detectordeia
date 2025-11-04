'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: '¿Es gratis el humanizador de IA?',
    answer: 'Sí, puedes usar el humanizador de forma completamente gratuita sin necesidad de registro. El plan gratuito te permite humanizar hasta 600 caracteres por uso, con usos ilimitados al día.'
  },
  {
    question: '¿Cuántas veces puedo usar el humanizador gratis?',
    answer: '¡Todas las veces que quieras! No hay límite diario de usos en el plan gratuito. Solo hay un límite de 600 caracteres por cada humanización.'
  },
  {
    question: '¿El humanizador cambia el significado de mi texto?',
    answer: 'No. El humanizador mantiene el significado, mensaje e ideas de tu texto original. Solo transforma la forma en que está escrito para que suene más natural y menos robótico.'
  },
  {
    question: '¿Es privado? ¿Almacenan mi texto?',
    answer: 'Tu privacidad es importante para nosotros. No almacenamos ningún texto que humanices en el plan gratuito. Tu contenido se procesa y se elimina inmediatamente después.'
  },
  {
    question: '¿Funciona con texto generado por ChatGPT, Claude, Gemini?',
    answer: 'Sí, funciona con texto generado por cualquier herramienta de IA: ChatGPT, Claude, Gemini, DeepSeek, Copilot, Jasper, y cualquier otro generador de texto con inteligencia artificial.'
  },
  {
    question: '¿Cuál es la diferencia entre el Modo Estándar y el Modo Avanzado?',
    answer: 'El Modo Estándar (gratis) hace una humanización efectiva y confiable eliminando marcadores evidentes de IA. El Modo Avanzado (próximamente en Premium) ofrece humanización más profunda con adaptación regional (LATAM vs España) y mayor libertad de reformulación.'
  },
  {
    question: '¿Cuándo estará disponible el plan Premium?',
    answer: 'Estamos trabajando en el plan Premium que estará disponible próximamente. Incluirá límites más altos (15,000 caracteres), Modo Avanzado, historial, carga de archivos y más. Puedes dejar tu email para ser avisado cuando esté listo.'
  },
  {
    question: '¿Puedo usar el texto humanizado para trabajos académicos?',
    answer: 'El humanizador es una herramienta de edición y mejora de textos. Sin embargo, es tu responsabilidad usar el contenido de forma ética y cumpliendo con las políticas de tu institución educativa sobre uso de IA.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto mb-16 px-2">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">
        <span className="gradient-text-primary">Preguntas</span>
        <span className="text-gray-800"> frecuentes</span>
      </h2>
      <p className="text-center text-gray-600 mb-10">
        Todo lo que necesitas saber sobre el humanizador
      </p>

      <div className="space-y-3">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-100 overflow-hidden card-elevated"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full text-left p-5 flex items-center justify-between hover:bg-violet-50/50 transition-colors"
              aria-expanded={openIndex === index}
            >
              <span className="font-bold text-gray-800 text-base pr-4">
                {item.question}
              </span>
              <svg
                className={`w-6 h-6 text-violet-600 flex-shrink-0 transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`overflow-hidden transition-all duration-200 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-5 pb-5 pt-0">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
