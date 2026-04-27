'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: '¿Es gratis el humanizador de IA?',
    answer: 'Sí, puedes usar el humanizador de forma completamente gratuita sin necesidad de registro. Sin registro: 3 usos diarios. Con registro gratuito: 15 usos diarios. El límite es de 600 caracteres por humanización en el plan gratuito.'
  },
  {
    question: '¿Cuántas veces puedo usar el humanizador gratis?',
    answer: 'Con registro gratuito podés humanizar hasta 15 veces por día. Sin registro: 3 usos diarios. Para usos ilimitados, el plan Premium ($12.99/mes) o Express ($3.99/24h) eliminan todos los límites.'
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
    answer: 'Los modos Estándar y Creativo están disponibles gratis. El Modo Estándar hace una humanización efectiva eliminando marcadores evidentes de IA. El Modo Creativo agrega personalidad y variedad. Los modos Formal, Simplificado y Académico están disponibles con el plan Premium o Express.'
  },
  {
    question: '¿Qué incluye el plan Premium?',
    answer: 'El plan Premium ($12.99/mes o $124.68/año) incluye usos y caracteres ilimitados en las 3 herramientas (Detector, Humanizador y Parafraseador), los 5 modos de humanización y paráfrasis, y subida de archivos PDF/DOCX. También está disponible el pase Express ($3.99/24h o $8.99/7 días) para necesidades puntuales.'
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
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
        <span className="text-blue-900">Preguntas</span>
        <span className="text-gray-800"> frecuentes</span>
      </h2>
      <p className="text-center text-gray-600 mb-10">
        Todo lo que necesitas saber sobre el humanizador
      </p>

      <div className="space-y-3">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full text-left p-5 flex items-center justify-between hover:bg-blue-50 transition-colors"
              aria-expanded={openIndex === index}
            >
              <span className="font-bold text-gray-800 text-base pr-4">
                {item.question}
              </span>
              <svg
                className={`w-6 h-6 text-blue-900 flex-shrink-0 transition-transform duration-200 ${
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
