/**
 * Product Engagement View Component
 *
 * Muestra métricas de engagement con el producto:
 * - Tool Usage: Usos por herramienta con trends
 * - Mode Usage: Modos más usados (Premium modes, etc)
 * - Feature Requests: Features bloqueadas que usuarios intentan usar
 * - Engagement Trend: Timeline de actividad
 */

'use client';

import { ProductEngagement } from '@/lib/analytics/types';

interface ProductEngagementViewProps {
  data: ProductEngagement;
}

export default function ProductEngagementView({ data }: ProductEngagementViewProps) {
  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-green-600';
    if (trend < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return '↗';
    if (trend < 0) return '↘';
    return '→';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          📊 Product Engagement
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Cómo los usuarios interactúan con tu producto
        </p>
      </div>

      {/* Tool Usage */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>🛠️</span>
          Uso por Herramienta
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.toolUsage.map((tool) => (
            <div
              key={tool.toolName}
              className="bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200 rounded-xl p-5"
            >
              {/* Tool name & trend */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {tool.toolName}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {tool.uniqueUsers.toLocaleString()} usuarios
                  </p>
                </div>
                <div className={`text-right ${getTrendColor(tool.trend)}`}>
                  <p className="text-2xl">{getTrendIcon(tool.trend)}</p>
                  <p className="text-xs font-bold">
                    {formatPercentage(tool.trend)}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-sm text-gray-600">Total usos:</span>
                  <span className="text-2xl font-extrabold text-violet-900">
                    {tool.totalUses.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-violet-200">
                  <span className="text-xs text-gray-600">Avg por usuario:</span>
                  <span className="text-sm font-bold text-violet-700">
                    {tool.averageUsesPerUser.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total summary */}
        <div className="mt-4 pt-4 border-t-2 border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">
              Total Usos (todas las herramientas):
            </span>
            <span className="text-2xl font-extrabold text-gray-900">
              {data.toolUsage.reduce((sum, tool) => sum + tool.totalUses, 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Mode Usage */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>⚙️</span>
          Uso por Modo
        </h3>

        {data.modeUsage.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.modeUsage.map((mode, index) => (
              <div
                key={`${mode.toolType}-${mode.mode}-${index}`}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {mode.mode}
                    </p>
                    <p className="text-xs text-gray-600">
                      {mode.toolType}
                    </p>
                  </div>
                  <span className="text-lg ml-2">
                    {mode.mode.toLowerCase().includes('premium') ||
                    mode.mode.toLowerCase().includes('aggresive') ||
                    mode.mode.toLowerCase().includes('creativo')
                      ? '⭐'
                      : '🔧'}
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-xs text-gray-600">Usos:</span>
                  <span className="text-xl font-bold text-gray-900">
                    {mode.uses.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-end mt-1">
                  <span className="text-xs text-gray-600">Usuarios:</span>
                  <span className="text-sm font-semibold text-gray-700">
                    {mode.uniqueUsers.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            No hay datos de modos disponibles
          </p>
        )}
      </div>

      {/* Feature Requests (Blocked Features) */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>🚫</span>
          Feature Requests
          <span className="text-sm font-normal text-gray-600 ml-2">
            (Features bloqueadas que usuarios intentan usar)
          </span>
        </h3>

        {data.featureRequests.length > 0 ? (
          <div className="space-y-3">
            {data.featureRequests.slice(0, 10).map((feature, index) => {
              // Calcular prioridad visual
              const maxBlocks = Math.max(
                ...data.featureRequests.map((f) => f.blockCount)
              );
              const priorityPercentage = (feature.blockCount / maxBlocks) * 100;

              return (
                <div
                  key={`${feature.feature}-${feature.toolType}-${index}`}
                  className={`border-2 rounded-lg p-4 ${
                    priorityPercentage > 70
                      ? 'bg-red-50 border-red-300'
                      : priorityPercentage > 40
                      ? 'bg-yellow-50 border-yellow-300'
                      : 'bg-blue-50 border-blue-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">
                          {priorityPercentage > 70
                            ? '🔴'
                            : priorityPercentage > 40
                            ? '🟡'
                            : '🔵'}
                        </span>
                        <p className="text-sm font-bold text-gray-900">
                          {feature.feature}
                        </p>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">
                        {feature.toolType}
                      </p>
                      <div className="flex items-center gap-4 text-xs">
                        <div>
                          <span className="text-gray-600">Bloqueos:</span>
                          <span className="ml-1 font-bold text-gray-900">
                            {feature.blockCount.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Usuarios únicos:</span>
                          <span className="ml-1 font-bold text-gray-900">
                            {feature.uniqueUsers.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Prioridad:</span>
                          <span className="ml-1 font-bold text-violet-700">
                            {feature.priority}/5
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Priority bar */}
                    <div className="ml-4">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            priorityPercentage > 70
                              ? 'bg-red-500'
                              : priorityPercentage > 40
                              ? 'bg-yellow-500'
                              : 'bg-blue-500'
                          }`}
                          style={{ width: `${priorityPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-green-700 font-semibold">
              ✨ No hay features bloqueadas
            </p>
            <p className="text-sm text-green-600 mt-1">
              Los usuarios no están intentando acceder a funciones premium
            </p>
          </div>
        )}

        {data.featureRequests.length > 10 && (
          <p className="text-xs text-gray-500 text-center mt-4">
            Mostrando top 10 de {data.featureRequests.length} features bloqueadas
          </p>
        )}
      </div>

      {/* Engagement Trend */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>📈</span>
          Engagement Trend
        </h3>

        {data.engagementTrend.length > 0 ? (
          <div className="space-y-4">
            {/* Simple bar chart */}
            <div className="space-y-2">
              {data.engagementTrend.slice(-14).map((point) => {
                const maxEvents = Math.max(
                  ...data.engagementTrend.map((p) => p.events)
                );
                const widthPercentage = (point.events / maxEvents) * 100;

                return (
                  <div key={point.date} className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 w-20">
                      {new Date(point.date).toLocaleDateString('es-ES', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg flex items-center justify-end pr-2"
                          style={{ width: `${widthPercentage}%` }}
                        >
                          {widthPercentage > 20 && (
                            <span className="text-xs font-bold text-white">
                              {point.events.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      {widthPercentage <= 20 && (
                        <span className="text-xs font-bold text-gray-700 w-12">
                          {point.events.toLocaleString()}
                        </span>
                      )}
                      <span className="text-xs text-gray-500 w-16 text-right">
                        {point.users.toLocaleString()} users
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t-2 border-gray-200 text-sm text-gray-600 text-center">
              Mostrando últimos {Math.min(data.engagementTrend.length, 14)} días
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            No hay datos de engagement disponibles
          </p>
        )}
      </div>
    </div>
  );
}
