import React, { useState } from 'react';

interface FeedbackBlockProps {
  originalText: string;
  result: number;
  onSent?: () => void;
}

const USOS = [
  { value: '', label: 'Elegí una opción (opcional)' },
  { value: 'tarea', label: 'Tarea escolar / universitaria' },
  { value: 'trabajo', label: 'Trabajo / empresa' },
  { value: 'curiosidad', label: 'Curiosidad personal' },
  { value: 'web', label: 'Revisión de contenido web' },
  { value: 'otro', label: 'Otro' },
];

export default function FeedbackBlock({ originalText, result, onSent }: FeedbackBlockProps) {
  const [util, setUtil] = useState<string>('');
  const [uso, setUso] = useState<string>('');
  const [comentario, setComentario] = useState<string>('');
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleSend = async () => {
    if (!util) {
      setError('Por favor, seleccioná si te resultó útil.');
      return;
    }
    setEnviando(true);
    setError(null);
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalText,
          result,
          util,
          uso,
          comentario,
        }),
      });
      setEnviado(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
      if (onSent) onSent();
    } catch (e) {
      setError('Error al enviar feedback.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      {/* Toast flotante */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg text-base font-semibold animate-fade-in">
          ¡Gracias por tu feedback!
        </div>
      )}
      {enviado ? (
        <div className="mt-4 border p-3 rounded bg-green-50 text-green-700 text-sm font-semibold text-center">
          ¡Gracias por tu feedback!
        </div>
      ) : (
        <div className="mt-4 border p-3 rounded bg-gray-50">
          <p className="text-base font-bold text-[#7c3aed] mb-2">¿Te resultó útil el análisis?</p>
          <div className="flex gap-2 mb-2">
            <button
              className={`px-3 py-1 rounded text-sm font-semibold border transition-all ${util === 'si' ? 'bg-green-100 text-green-700 border-green-300' : 'bg-white text-green-700 border-green-200 hover:bg-green-50'}`}
              onClick={() => setUtil('si')}
              type="button"
            >
              Sí, me ayudó
            </button>
            <button
              className={`px-3 py-1 rounded text-sm font-semibold border transition-all ${util === 'no' ? 'bg-red-100 text-red-700 border-red-300' : 'bg-white text-red-700 border-red-200 hover:bg-red-50'}`}
              onClick={() => setUtil('no')}
              type="button"
            >
              No, no me sirvió
            </button>
          </div>
          <label className="block text-sm font-medium text-gray-700 mb-1">¿Para qué lo usaste?</label>
          <select
            className="w-full border rounded p-2 text-sm mb-2 text-gray-800"
            value={uso}
            onChange={e => setUso(e.target.value)}
          >
            {USOS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <textarea
            className="w-full border rounded p-2 text-sm mb-2 placeholder-gray-700 text-gray-800"
            placeholder="¿Querés contarnos algo más? (opcional)"
            value={comentario}
            onChange={e => setComentario(e.target.value)}
            rows={2}
          />
          {error && <div className="text-red-600 text-xs mb-2">{error}</div>}
          <button
            className="mt-1 bg-[#7c3aed] hover:bg-[#5b21b6] text-white px-4 py-1 rounded font-bold text-sm transition-all disabled:opacity-50"
            onClick={handleSend}
            disabled={enviando}
            type="button"
          >
            {enviando ? 'Enviando...' : 'Enviar feedback'}
          </button>
        </div>
      )}
    </>
  );
}

// Animación fade-in para el toast
// Agrega esto a tu CSS global si no tienes Tailwind plugin de animaciones:
// .animate-fade-in { animation: fadeIn 0.3s; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none;} } 