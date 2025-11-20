'use client';

import { useEffect, useState } from 'react';
import { Icon, ProductIcons } from '@/lib/icons';

interface Step {
  id: number;
  label: string;
  icon: any;
}

interface LoadingStepsProps {
  steps: Step[];
  currentStep: number;
  title?: string;
  estimatedTime?: number; // en segundos
}

export default function LoadingSteps({
  steps,
  currentStep,
  title = 'Procesando...',
  estimatedTime = 10
}: LoadingStepsProps) {
  const [progress, setProgress] = useState(0);
  const progressPerStep = 100 / steps.length;

  useEffect(() => {
    const targetProgress = currentStep * progressPerStep;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= targetProgress) {
          clearInterval(interval);
          return targetProgress;
        }
        return Math.min(prev + 2, targetProgress);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [currentStep, progressPerStep]);

  return (
    <div className="w-full p-8 bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50 rounded-2xl border-2 border-violet-200 shadow-lg animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="animate-spin">
          <Icon icon={ProductIcons.Analytics} size="xl" className="text-violet-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-violet-900">{title}</h3>
          <p className="text-xs text-violet-600">Tiempo estimado: ~{estimatedTime} segundos</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-violet-700 mb-2 font-medium">
          <span>Progreso</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-3 bg-violet-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isPending = step.id > currentStep;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                isCurrent ? 'bg-white shadow-md scale-105' :
                isCompleted ? 'bg-white/50' :
                'bg-white/20'
              }`}
            >
              {/* Icon/Status */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                isCompleted ? 'bg-green-500' :
                isCurrent ? 'bg-violet-500 animate-pulse' :
                'bg-gray-300'
              }`}>
                {isCompleted ? (
                  <Icon icon={ProductIcons.Success} size="sm" className="text-white" />
                ) : isCurrent ? (
                  <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                ) : (
                  <Icon icon={step.icon} size="sm" className="text-white" />
                )}
              </div>

              {/* Label */}
              <span className={`text-sm font-medium ${
                isCurrent ? 'text-violet-900' :
                isCompleted ? 'text-green-700' :
                'text-gray-500'
              }`}>
                {step.label}
              </span>

              {/* Loading spinner for current step */}
              {isCurrent && (
                <div className="ml-auto">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Skeleton Preview (opcional) */}
      <div className="mt-6 p-4 bg-white/30 rounded-lg border border-violet-200/50">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-violet-200/50 rounded w-3/4"></div>
          <div className="h-4 bg-violet-200/50 rounded w-1/2"></div>
          <div className="h-20 bg-violet-200/50 rounded"></div>
        </div>
      </div>
    </div>
  );
}
