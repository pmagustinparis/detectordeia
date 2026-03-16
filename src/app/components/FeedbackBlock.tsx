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
  const [util, setUtil] = useState<number | null>(null);
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
      console.log('Enviando feedback:', { originalText, result, util, uso, comentario });
      const response = await fetch('/api/feedback', {
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
      
      console.log('Respuesta del servidor:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error del servidor:', errorData);
        throw new Error(errorData.error || 'Error del servidor');
      }
      
      const data = await response.json();
      console.log('Feedback enviado exitosamente:', data);
      
      setEnviado(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
      if (onSent) onSent();
    } catch (e) {
      console.error('Error al enviar feedback:', e);
      setError(e instanceof Error ? e.message : 'Error al enviar feedback.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      {/* Toast flotante */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg text-base font-semibold animate-fade-in">
          <div className="flex items-center gap-2">
            <span>🎉</span>
            <span>¡Gracias por ayudarnos a mejorar!</span>
          </div>
        </div>
      )}
      {enviado ? (
        <div className="mt-4 border p-3 rounded bg-green-50 text-green-700 text-sm font-semibold text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span>🎉</span>
            <span>¡Gracias por tu feedback!</span>
          </div>
          <p className="text-xs text-green-600 font-normal">
            Tu opinión nos ayuda a hacer el detector más preciso para todos
          </p>
        </div>
      ) : (
        <div className="mt-4 border p-3 rounded bg-gray-50">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">💡</span>
            <div>
              <p className="text-base font-bold text-blue-900">¿Te resultó útil el análisis?</p>
              <p className="text-xs text-gray-600">
                Tu feedback nos ayuda a mejorar la precisión del detector. Cada comentario nos permite afinar el algoritmo para que sea más útil para todos.
              </p>
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            <button
              className={`px-3 py-1 rounded text-sm font-semibold border transition-all ${util === 1 ? 'bg-green-100 text-green-700 border-green-300' : 'bg-white text-green-700 border-green-200 hover:bg-green-50'}`}
              onClick={() => setUtil(1)}
              type="button"
            >
              Sí, me ayudó
            </button>
            <button
              className={`px-3 py-1 rounded text-sm font-semibold border transition-all ${util === 5 ? 'bg-red-100 text-red-700 border-red-300' : 'bg-white text-red-700 border-red-200 hover:bg-red-50'}`}
              onClick={() => setUtil(5)}
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
            placeholder="¿Querés contarnos algo más? Tu opinión nos ayuda a mejorar (opcional)"
            value={comentario}
            onChange={e => setComentario(e.target.value)}
            rows={2}
          />
          {error && <div className="text-red-600 text-xs mb-2">{error}</div>}
          <button
            className="mt-1 bg-blue-900 hover:bg-blue-800 text-white px-4 py-1 rounded font-bold text-sm transition-all disabled:opacity-50"
            onClick={handleSend}
            disabled={enviando}
            type="button"
          >
            {enviando ? 'Enviando...' : 'Enviar feedback'}
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            🚀 Con tu ayuda, hacemos el mejor detector de IA en español
          </p>
          <div className="text-xs text-gray-400 mt-1 text-center">
            <span>💬 Ya recibimos feedback de +100 usuarios que nos ayudan a mejorar</span>
          </div>
          <div className="text-xs text-gray-400 mt-1 text-center">
            <span>📈 Gracias a vos, el detector mejora cada día</span>
          </div>
        </div>
      )}
    </>
  );
}

// Animación fade-in para el toast
// Agrega esto a tu CSS global si no tienes Tailwind plugin de animaciones:
// .animate-fade-in { animation: fadeIn 0.3s; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none;} } 