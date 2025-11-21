/**
 * Conversion Funnel View Component
 *
 * Visualización del funnel de conversión mostrando:
 * - Funnel de usuarios registrados (signup → usage → pricing → premium)
 * - Funnel de usuarios anónimos (visit → usage → signup)
 * - Drop-off rates entre etapas
 */

'use client';

import { ConversionFunnel } from '@/lib/analytics/types';

interface ConversionFunnelViewProps {
  data: ConversionFunnel;
}

export default function ConversionFunnelView({ data }: ConversionFunnelViewProps) {
  const formatPercentage = (value?: number) => {
    if (value === undefined) return '-';
    return `${value.toFixed(1)}%`;
  };

  const getStageColor = (conversionRate?: number) => {
    if (!conversionRate) return 'bg-gray-200';
    if (conversionRate >= 50) return 'bg-green-500';
    if (conversionRate >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const renderFunnelStage = (
    stage: string,
    users: number,
    conversionFromPrevious?: number,
    dropoffFromPrevious?: number,
    isFirst: boolean = false,
    maxUsers: number = 1
  ) => {
    // Calcular width del funnel basado en usuarios (máximo 100%)
    const widthPercent = Math.max((users / maxUsers) * 100, 15); // Mínimo 15% para visibilidad

    return (
      <div className="space-y-2">
        {/* Stage box */}
        <div className="relative flex justify-center">
          <div
            className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg p-4 shadow-lg transition-all hover:scale-105"
            style={{
              width: `${widthPercent}%`,
              maxWidth: '100%',
              minWidth: '150px'
            }}
          >
            <p className="text-white font-bold text-center text-lg">
              {stage}
            </p>
            <p className="text-white text-center text-2xl font-extrabold mt-1">
              {users.toLocaleString()}
            </p>
            {!isFirst && conversionFromPrevious !== undefined && (
              <p className="text-violet-100 text-center text-sm mt-1">
                {formatPercentage(conversionFromPrevious)} conversion
              </p>
            )}
          </div>
        </div>

        {/* Drop-off indicator */}
        {!isFirst && dropoffFromPrevious !== undefined && dropoffFromPrevious > 0 && (
          <div className="flex items-center justify-center gap-2">
            <div className={`h-1 flex-1 max-w-xs ${getStageColor(conversionFromPrevious)}`} />
            <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
              ⚠️ -{dropoffFromPrevious.toLocaleString()} users
            </span>
            <div className={`h-1 flex-1 max-w-xs ${getStageColor(conversionFromPrevious)}`} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Description */}
      <p className="text-sm text-gray-600">
        Flujo de conversión de usuarios desde el primer contacto hasta Premium
      </p>

      {/* Registered Users Funnel */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 overflow-hidden">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span>👤</span>
          Funnel de Usuarios Registrados
        </h3>

        <div className="space-y-4">
          {data.registered.map((stage, index) => (
            <div key={stage.stage}>
              {renderFunnelStage(
                stage.stage,
                stage.users,
                stage.conversionFromPrevious,
                stage.dropoffFromPrevious,
                index === 0,
                data.registered[0]?.users || 1
              )}
            </div>
          ))}
        </div>

        {/* Summary stats */}
        <div className="mt-6 pt-6 border-t-2 border-gray-200 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Entrada</p>
            <p className="text-2xl font-bold text-gray-900">
              {data.registered[0]?.users.toLocaleString() || 0}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Salida</p>
            <p className="text-2xl font-bold text-gray-900">
              {data.registered[data.registered.length - 1]?.users.toLocaleString() || 0}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Overall Conversion</p>
            <p className="text-2xl font-bold text-violet-700">
              {data.registered.length > 0
                ? formatPercentage(
                    ((data.registered[data.registered.length - 1]?.users || 0) /
                      (data.registered[0]?.users || 1)) *
                      100
                  )
                : '-'}
            </p>
          </div>
        </div>
      </div>

      {/* Anonymous Users Funnel */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 overflow-hidden">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span>👻</span>
          Funnel de Usuarios Anónimos
        </h3>

        <div className="space-y-4">
          {data.anonymous.map((stage, index) => (
            <div key={stage.stage}>
              {renderFunnelStage(
                stage.stage,
                stage.users,
                stage.conversionFromPrevious,
                stage.dropoffFromPrevious,
                index === 0,
                data.anonymous[0]?.users || 1
              )}
            </div>
          ))}
        </div>

        {/* Summary stats */}
        <div className="mt-6 pt-6 border-t-2 border-gray-200 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Anónimos</p>
            <p className="text-2xl font-bold text-gray-900">
              {data.anonymous[0]?.users.toLocaleString() || 0}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Convertidos</p>
            <p className="text-2xl font-bold text-gray-900">
              {data.anonymous[data.anonymous.length - 1]?.users.toLocaleString() || 0}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Signup Rate</p>
            <p className="text-2xl font-bold text-blue-700">
              {data.anonymous.length > 0
                ? formatPercentage(
                    ((data.anonymous[data.anonymous.length - 1]?.users || 0) /
                      (data.anonymous[0]?.users || 1)) *
                      100
                  )
                : '-'}
            </p>
          </div>
        </div>
      </div>

      {/* Tool Breakdown */}
      {Object.keys(data.byTool).length > 0 && (
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🛠️</span>
            Conversión por Herramienta
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(data.byTool).map(([tool, stages]) => {
              const firstStage = stages[0];
              const lastStage = stages[stages.length - 1];
              const conversionRate =
                firstStage && lastStage && firstStage.users > 0
                  ? (lastStage.users / firstStage.users) * 100
                  : 0;

              return (
                <div
                  key={tool}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl p-4"
                >
                  <p className="text-sm font-bold text-gray-700 uppercase mb-2">
                    {tool}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Entrada:</span>
                      <span className="font-semibold text-gray-900">
                        {firstStage?.users.toLocaleString() || 0}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Premium:</span>
                      <span className="font-semibold text-gray-900">
                        {lastStage?.users.toLocaleString() || 0}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-gray-300">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Conversion:</span>
                        <span className="font-bold text-violet-700">
                          {formatPercentage(conversionRate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Insights */}
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-yellow-900 mb-2">
              Optimization Opportunities
            </p>
            <ul className="text-sm text-yellow-800 space-y-1">
              {data.registered.map((stage, index) => {
                if (index === 0 || !stage.conversionFromPrevious) return null;
                if (stage.conversionFromPrevious < 30) {
                  return (
                    <li key={stage.stage}>
                      ⚠️ <strong>Drop-off crítico en "{stage.stage}"</strong> - Solo {formatPercentage(stage.conversionFromPrevious)} convierte
                    </li>
                  );
                }
                return null;
              })}
              {data.anonymous.length > 0 &&
                data.anonymous[data.anonymous.length - 1]?.conversionFromPrevious &&
                data.anonymous[data.anonymous.length - 1].conversionFromPrevious! < 20 && (
                  <li>
                    📈 <strong>Signup rate bajo</strong> - Mejorar CTAs y value proposition para usuarios anónimos
                  </li>
                )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
