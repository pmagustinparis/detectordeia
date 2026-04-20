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
        className="fixed inset-0 bg-black/60 z-50 "
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 pointer-events-auto "
          onClick={(e) => e.stopPropagation()}
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-xl bg-blue-900 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
            Sube Archivos Completos
          </h2>

          <p className="text-center text-gray-700 mb-6 leading-relaxed">
            Con <strong>Plan Premium</strong> podés analizar archivos PDF, DOCX y TXT completos sin tener que copiar y pegar.
          </p>

          {/* Benefits Box */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 mb-6">
            <p className="text-sm font-bold text-blue-900 mb-3">
              Con Plan Premium obtenés:
            </p>
            <ul className="space-y-2 text-sm text-blue-900">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Subida de archivos</strong> PDF, DOCX, TXT</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Caracteres ilimitados</strong> por análisis</span>
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
            <p className="text-xs text-blue-900 mt-3 font-semibold">
              Express $3.99/24h • Premium $12.99/mes • Ahorra 20% anual
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <a
              href="/pricing"
              className="block w-full text-center bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Ver Planes
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
