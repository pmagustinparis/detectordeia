'use client';

import { useState } from 'react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const ROLES = [
  { value: 'student', label: 'Estudiante', icon: '🎓' },
  { value: 'teacher', label: 'Profesor/Docente', icon: '👨‍🏫' },
  { value: 'writer', label: 'Escritor/Creador', icon: '✍️' },
  { value: 'journalist', label: 'Periodista', icon: '📰' },
  { value: 'professional', label: 'Profesional/Empresa', icon: '💼' },
  { value: 'other', label: 'Otro', icon: '🔍' },
];

const PRIMARY_USES = [
  { value: 'detect_ai', label: 'Detectar si un texto es IA', icon: '🤖' },
  { value: 'humanize', label: 'Humanizar textos de IA', icon: '👤' },
  { value: 'paraphrase', label: 'Parafrasear contenido', icon: '🔄' },
  { value: 'review_work', label: 'Revisar trabajos/tareas', icon: '📝' },
  { value: 'other', label: 'Otro', icon: '🔍' },
];

const DISCOVERY_SOURCES = [
  { value: 'google', label: 'Google/Buscador', icon: '🔍' },
  { value: 'social_media', label: 'Redes sociales', icon: '📱' },
  { value: 'recommendation', label: 'Recomendación', icon: '👥' },
  { value: 'youtube', label: 'YouTube', icon: '🎥' },
  { value: 'other_website', label: 'Otro sitio web', icon: '🔗' },
  { value: 'other', label: 'Otro', icon: '🌐' },
];

export default function UserProfileModal({ isOpen, onClose, onComplete }: UserProfileModalProps) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [primaryUse, setPrimaryUse] = useState('');
  const [discoverySource, setDiscoverySource] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, primary_use: primaryUse, discovery_source: discoverySource }),
      });

      if (response.ok) {
        onComplete();
        onClose();
      } else {
        console.error('Error al guardar perfil');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canContinue = () => {
    if (step === 1) return role !== '';
    if (step === 2) return primaryUse !== '';
    if (step === 3) return discoverySource !== '';
    return false;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full mb-3">
            <span className="text-3xl">👋</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            ¡Bienvenido a DetectordeIA!
          </h2>
          <p className="text-sm text-gray-600">
            Ayudanos a conocerte mejor (toma 30 seg)
          </p>
          <div className="flex justify-center gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  s === step ? 'w-8 bg-violet-600' : 'w-1.5 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Rol */}
        {step === 1 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">¿Cuál es tu rol?</h3>
            {ROLES.map((r) => (
              <button
                key={r.value}
                onClick={() => setRole(r.value)}
                className={`w-full p-3 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${
                  role === r.value
                    ? 'border-violet-500 bg-violet-50'
                    : 'border-gray-200 hover:border-violet-300 bg-white'
                }`}
              >
                <span className="text-2xl">{r.icon}</span>
                <span className="font-medium text-gray-800">{r.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Uso principal */}
        {step === 2 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              ¿Para qué vas a usar DetectordeIA?
            </h3>
            {PRIMARY_USES.map((use) => (
              <button
                key={use.value}
                onClick={() => setPrimaryUse(use.value)}
                className={`w-full p-3 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${
                  primaryUse === use.value
                    ? 'border-violet-500 bg-violet-50'
                    : 'border-gray-200 hover:border-violet-300 bg-white'
                }`}
              >
                <span className="text-2xl">{use.icon}</span>
                <span className="font-medium text-gray-800 text-sm">{use.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Step 3: Origen */}
        {step === 3 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              ¿Cómo nos encontraste?
            </h3>
            {DISCOVERY_SOURCES.map((source) => (
              <button
                key={source.value}
                onClick={() => setDiscoverySource(source.value)}
                className={`w-full p-3 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${
                  discoverySource === source.value
                    ? 'border-violet-500 bg-violet-50'
                    : 'border-gray-200 hover:border-violet-300 bg-white'
                }`}
              >
                <span className="text-2xl">{source.icon}</span>
                <span className="font-medium text-gray-800">{source.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Footer Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 text-gray-600 font-medium hover:text-gray-800 transition-colors"
          >
            Saltar por ahora
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canContinue()}
              className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canContinue() || isSubmitting}
              className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Guardando...' : 'Completar'}
            </button>
          )}
        </div>

        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="w-full mt-2 text-sm text-gray-500 hover:text-gray-700"
          >
            ← Volver
          </button>
        )}
      </div>
    </div>
  );
}
