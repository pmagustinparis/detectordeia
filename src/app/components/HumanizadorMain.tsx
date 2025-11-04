'use client';

import { useState } from 'react';
import EmailCaptureModal from './EmailCaptureModal';

const CHARACTER_LIMIT = 600;
const MIN_CHARACTERS = 50;

export default function HumanizadorMain() {
  const [text, setText] = useState('');
  const [isHumanizing, setIsHumanizing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLimitExceeded, setIsLimitExceeded] = useState(false);
  const [analyzedTextLength, setAnalyzedTextLength] = useState(0);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailModalSource, setEmailModalSource] = useState('');

  // Colores del contador dinámico
  const getCounterColor = () => {
    if (text.length > CHARACTER_LIMIT) return 'text-red-600';
    if (text.length > CHARACTER_LIMIT * 0.9) return 'text-yellow-600';
    return 'text-gray-500';
  };

  // Validar si el botón debe estar habilitado (solo mínimo, no máximo)
  const isButtonEnabled = () => {
    return text.length >= MIN_CHARACTERS;
  };

  const handleHumanize = async () => {
    // Validación mínima
    if (text.length < MIN_CHARACTERS) {
      setError(`El texto debe tener al menos ${MIN_CHARACTERS} caracteres`);
      return;
    }

    const exceededLimit = text.length > CHARACTER_LIMIT;

    setIsHumanizing(true);
    setError(null);

    try {
      // Llamada a API de humanización (SIEMPRE se ejecuta, aunque exceda el límite)
      const response = await fetch('/api/humanize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          mode: 'standard'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al humanizar el texto');
      }

      // Mostrar resultado humanizado
      setResult(data.humanizedText);
      setAnalyzedTextLength(text.length);
      setIsLimitExceeded(exceededLimit);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al humanizar el texto');
    } finally {
      setIsHumanizing(false);
    }
  };

  const handleClear = () => {
    setText('');
    setResult(null);
    setError(null);
    setIsLimitExceeded(false);
    setAnalyzedTextLength(0);
  };

  const handleCopy = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result);
        // Cambiar temporalmente el texto del botón para dar feedback
        const button = document.getElementById('copy-button');
        if (button) {
          const originalText = button.innerHTML;
          button.innerHTML = '<span>✅</span> ¡Copiado!';
          setTimeout(() => {
            button.innerHTML = originalText;
          }, 2000);
        }
      } catch (err) {
        console.error('Error al copiar:', err);
        setError('No se pudo copiar el texto');
      }
    }
  };

  const handleDownload = () => {
    if (result) {
      const blob = new Blob([result], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'texto-humanizado.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const openEmailModal = (source: string) => {
    setEmailModalSource(source);
    setIsEmailModalOpen(true);
  };

  return (
    <div className="max-w-5xl w-full flex flex-col md:flex-row gap-6 md:gap-8 items-stretch justify-center animate-scale-in" style={{animationDelay: '0.3s'}}>

      {/* COLUMNA IZQUIERDA - INPUT */}
      <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-violet-100 p-6 flex flex-col justify-between min-w-[320px] card-elevated" style={{minHeight: '560px', maxHeight: '600px'}}>

        {/* Trust indicators (badges superiores) */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 font-semibold rounded-full px-3 py-1.5 text-xs">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            No login
          </span>
          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 font-semibold rounded-full px-3 py-1.5 text-xs">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            100% privado
          </span>
          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 font-semibold rounded-full px-3 py-1.5 text-xs">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
            </svg>
            En español
          </span>
        </div>

        <label htmlFor="humanizador-textarea" className="block text-base font-semibold text-gray-800 mb-2">
          Pega tu texto para humanizar
        </label>

        <div className="flex flex-col" style={{flexGrow: 1}}>
          <textarea
            id="humanizador-textarea"
            className="w-full border-2 border-violet-200 rounded-2xl shadow-inner focus:ring-4 focus:ring-violet-300/50 focus:border-violet-400 p-4 text-base text-gray-800 placeholder-gray-400 transition-all outline-none resize-none mb-1 hover:border-violet-300 leading-relaxed"
            style={{minHeight: '220px', flexGrow: 1}}
            placeholder="Pega aquí tu texto generado por ChatGPT, Claude, Gemini u otra IA..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              // Limpiar resultado cuando el usuario edita el texto
              if (result) {
                setResult(null);
                setError(null);
                setIsLimitExceeded(false);
                setAnalyzedTextLength(0);
              }
            }}
            aria-label="Texto a humanizar"
          />
        </div>

        {/* Contador de caracteres y botón limpiar */}
        <div className="flex justify-between items-center text-sm text-gray-600 mt-0 mb-2 gap-2">
          <span className={getCounterColor() + ' font-medium'}>
            {text.length}/{CHARACTER_LIMIT}
          </span>
          <button
            onClick={handleClear}
            className="text-violet-600 font-semibold ml-2 hover:text-violet-700 hover:underline transition-all disabled:opacity-40"
            type="button"
            disabled={text.length === 0 && !result}
            aria-label="Limpiar texto"
          >
            Limpiar
          </button>
        </div>

        {/* SELECTOR DE MODO - Compacto */}
        <div className="mb-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Modo de humanización</label>
          <div className="space-y-2">
            {/* Modo Estándar - Disponible */}
            <label className="flex items-center p-2.5 border-2 border-violet-200 rounded-xl bg-white hover:border-violet-300 transition-all cursor-pointer">
              <input
                type="radio"
                name="mode"
                value="standard"
                checked={true}
                readOnly
                className="w-4 h-4 text-violet-600 focus:ring-violet-500"
              />
              <div className="ml-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800">⚪ Estándar</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                    Disponible
                  </span>
                </div>
              </div>
            </label>

            {/* Modo Avanzado - Bloqueado */}
            <div className="relative group">
              <label className="flex items-center p-2.5 border-2 border-gray-200 rounded-xl bg-gray-50 opacity-60 cursor-not-allowed">
                <input
                  type="radio"
                  name="mode"
                  value="advanced"
                  disabled
                  className="w-4 h-4 text-gray-400"
                />
                <div className="ml-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">🔒 Avanzado</span>
                    <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium">
                      Premium
                    </span>
                  </div>
                </div>
              </label>

              {/* Tooltip */}
              <div className="absolute left-0 right-0 top-full mt-2 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                <p className="font-semibold mb-1">Modo Avanzado - Próximamente</p>
                <p className="text-gray-300">
                  Incluye adaptación regional (LATAM/España), análisis de tono y personalización del estilo de escritura.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="mt-1 mb-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium">
            {error}
          </div>
        )}

        {/* BOTÓN PRINCIPAL */}
        <button
          onClick={handleHumanize}
          disabled={isHumanizing || !isButtonEnabled()}
          className={`mt-2 w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-3 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 btn-glow ${isHumanizing ? 'animate-pulse-glow' : ''}`}
          aria-label="Humanizar texto"
        >
          <span className="text-xl">🤖→👤</span>
          {isHumanizing ? 'Humanizando...' : 'Humanizar Texto'}
        </button>

        {/* DISCLAIMER */}
        <p className="text-center text-sm text-gray-600 mt-2 font-medium">
          Sin registro. 100% privado. No almacenamos tu texto.
        </p>
      </div>

      {/* COLUMNA DERECHA - OUTPUT */}
      <div className="flex-1 flex flex-col gap-4 min-w-[320px]">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-violet-100 p-6 flex flex-col justify-between relative card-elevated" style={{minHeight: '560px'}}>

          {/* Header con icono */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
              <span className="text-white text-lg">✨</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-800 text-base">Texto humanizado</span>
              <span className="text-xs text-gray-500">El resultado aparecerá aquí</span>
            </div>
          </div>

          {result ? (
            <div className="relative" style={{flexGrow: 1, display: 'flex', flexDirection: 'column', maxHeight: '400px'}}>
              <div className={isLimitExceeded ? "filter blur-sm overflow-y-auto" : "overflow-y-auto"} style={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
                {/* Área de resultado */}
                <div className="w-full border-2 border-emerald-200 rounded-2xl bg-emerald-50/30 p-4 text-base text-gray-800 mb-3 whitespace-pre-wrap leading-relaxed" style={{minHeight: '280px'}}>
                  {result}
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3 mb-3">
                  <button
                    id="copy-button"
                    onClick={handleCopy}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>📋</span>
                    Copiar todo
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>⬇️</span>
                    Descargar .txt
                  </button>
                </div>

                {/* Mensaje de éxito */}
                <div className="p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2">
                  <span className="text-green-600 text-xl">✅</span>
                  <span className="text-sm font-medium text-green-800">
                    Tu texto ha sido humanizado correctamente
                  </span>
                </div>
              </div>

              {/* Overlay premium cuando se excede el límite */}
              {isLimitExceeded && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white/90 flex items-center justify-center p-6 pointer-events-none">
                  <div className="text-center max-w-sm bg-white rounded-2xl shadow-xl p-6 pointer-events-auto">
                    <p className="text-red-600 font-bold mb-2 text-sm flex items-center justify-center gap-2">
                      ⚠️ {analyzedTextLength}/{CHARACTER_LIMIT} caracteres. Límite superado.
                    </p>
                    <p className="text-gray-700 mb-4 text-sm">
                      Para ver tu texto humanizado completo y humanizar sin límites, actualiza a Premium.
                    </p>
                    <button
                      onClick={() => openEmailModal('humanizador-overlay-premium')}
                      className="block w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all mb-2"
                    >
                      🔓 Avísame cuando esté disponible
                    </button>
                    <p className="text-xs text-gray-500">
                      📝 Serás el primero en saber cuando Premium esté listo
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Estado vacío mejorado */}
              <div className="flex flex-col items-center justify-center text-center px-6 py-8" style={{flexGrow: 1}}>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6 shadow-lg animate-pulse">
                  <span className="text-white text-4xl">✨</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Esperando tu texto
                </h3>
                <p className="text-gray-600 text-sm mb-4 max-w-xs">
                  Pega el texto generado por IA que quieres humanizar y haz clic en el botón
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <svg className="w-4 h-4 text-violet-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Resultado instantáneo</span>
                </div>
              </div>

              {/* Hint de usos ilimitados */}
              <div className="text-center text-sm bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-100">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <svg className="w-5 h-5 text-violet-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold text-violet-700">Usos ilimitados gratis</span>
                </div>
                <p className="text-xs text-gray-600">Hasta 600 caracteres por uso • Sin registro</p>
              </div>
            </>
          )}

        </div>
      </div>

      {/* Modal de captura de email */}
      <EmailCaptureModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        source={emailModalSource}
      />

    </div>
  );
}
