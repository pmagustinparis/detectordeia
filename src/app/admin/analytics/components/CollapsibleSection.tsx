/**
 * Collapsible Section Component
 *
 * Wrapper para secciones del dashboard que pueden colapsarse
 */

'use client';

import { useState } from 'react';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: string;
}

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
  icon = '📊',
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-2 border-gray-200 rounded-2xl overflow-hidden bg-white">
      {/* Header - clickeable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {isOpen ? 'Ocultar' : 'Mostrar'}
          </span>
          <div className={`transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            <svg
              className="w-5 h-5 text-gray-600"
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
          </div>
        </div>
      </button>

      {/* Content - colapsable */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-6 pb-6 pt-2">{children}</div>
      </div>
    </div>
  );
}
