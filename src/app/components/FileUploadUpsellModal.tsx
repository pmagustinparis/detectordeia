/**
 * FileUploadUpsellModal Component
 *
 * Modal que aparece cuando usuarios Free/Anónimos intentan subir archivos.
 * Muestra de forma vendedora los beneficios de actualizar a PRO.
 */

'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';

interface FileUploadUpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName: string; // "Detector", "Humanizador", "Parafraseador"
}

export default function FileUploadUpsellModal({
  isOpen,
  onClose,
  toolName,
}: FileUploadUpsellModalProps) {
  const { isAuthenticated } = useAuth();

  // Cerrar con ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Bloquear scroll cuando está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 pointer-events-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center">
              <span className="text-5xl">📄</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-3">
            Sube Archivos Completos
          </h2>

          <p className="text-center text-gray-700 mb-6 leading-relaxed">
            Con <strong>Plan Pro</strong> podés analizar archivos PDF, DOCX y TXT completos sin tener que copiar y pegar.
          </p>

          {/* Benefits Box */}
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 border-2 border-violet-200 rounded-2xl p-5 mb-6">
            <p className="text-sm font-bold text-violet-900 mb-3">
              🚀 Con Plan Pro obtenés:
            </p>
            <ul className="space-y-2 text-sm text-violet-800">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Subida de archivos</strong> PDF, DOCX, TXT</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>✨ Caracteres ilimitados</strong> por análisis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Usos ilimitados</strong> todos los días</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>5 modos premium</strong> en Humanizador y Parafraseador</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Historial completo</strong> de tus análisis</span>
              </li>
            </ul>
            <p className="text-xs text-violet-700 mt-3 font-semibold">
              Express $2.99/24h • Pro $6.99/mes • Ahorra 20% anual
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <a
              href="/pricing"
              className="block w-full text-center bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Ver Planes y Precios
            </a>

            <button
              onClick={onClose}
              className="block w-full text-center text-gray-600 hover:text-gray-800 font-medium py-2"
            >
              Tal vez después
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
