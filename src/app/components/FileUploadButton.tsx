'use client';

import { useRef, useState } from 'react';
import { extractTextFromFile } from '@/lib/fileParser';
import FileUploadUpsellModal from './FileUploadUpsellModal';

interface FileUploadButtonProps {
  onTextExtracted: (text: string, wasTruncated: boolean) => void;
  maxChars: number;
  disabled: boolean;
  userPlan: 'free' | 'premium';
  isExpressActive?: boolean; // Nuevo: detectar Express Pass
  toolName: string; // "Detector", "Humanizador", "Parafraseador"
  className?: string;
}

export default function FileUploadButton({
  onTextExtracted,
  maxChars,
  disabled,
  userPlan,
  isExpressActive = false,
  toolName,
  className = '',
}: FileUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUpsellModal, setShowUpsellModal] = useState(false);

  const handleFileSelect = async (file: File) => {
    setError(null);
    setIsProcessing(true);

    try {
      const result = await extractTextFromFile(file, maxChars);
      onTextExtracted(result.text, result.wasTruncated);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al procesar el archivo';
      setError(errorMessage);

      // Limpiar error después de 5 segundos
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsProcessing(false);
      // Limpiar el input para permitir subir el mismo archivo de nuevo
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const hasPremiumAccess = userPlan === 'premium' || isExpressActive;

  const handleButtonClick = () => {
    if (!hasPremiumAccess) {
      setShowUpsellModal(true);
      return;
    }

    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <>
      <FileUploadUpsellModal
        isOpen={showUpsellModal}
        onClose={() => setShowUpsellModal(false)}
        toolName={toolName}
      />

      <div className={`flex flex-col gap-2 ${className}`}>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleButtonClick}
            disabled={disabled || isProcessing}
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all
              ${hasPremiumAccess
                ? 'bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-200 text-gray-500 cursor-pointer hover:bg-gray-300'
              }
              ${(disabled || isProcessing) && 'opacity-50 cursor-not-allowed'}
              relative group
            `}
            title={!hasPremiumAccess ? 'Subir archivos es exclusivo del Plan PRO o Express Pass 👑 Click para ver planes' : 'Subir archivo PDF, DOCX o TXT'}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Subir archivo
                {!hasPremiumAccess && ' 👑'}
              </>
            )}
          </button>

          {hasPremiumAccess && (
            <span className="text-xs text-gray-500">PDF, DOCX o TXT (máx. 10MB)</span>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex items-start gap-2">
            <span className="flex-shrink-0">❌</span>
            <span>{error}</span>
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled || isProcessing}
        />
      </div>
    </>
  );
}
