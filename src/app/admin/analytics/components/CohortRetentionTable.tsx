/**
 * Cohort Retention Table Component
 *
 * Tabla de retención por cohorte mostrando:
 * - Cohortes semanales de usuarios
 * - Retención semana tras semana
 * - Heatmap visual con colores según % de retención
 */

'use client';

import { CohortAnalysis } from '@/lib/analytics/types';

interface CohortRetentionTableProps {
  data: CohortAnalysis;
}

export default function CohortRetentionTable({ data }: CohortRetentionTableProps) {
  const getRetentionColor = (retentionRate: number) => {
    if (retentionRate >= 70) return 'bg-green-500 text-white';
    if (retentionRate >= 50) return 'bg-green-400 text-white';
    if (retentionRate >= 30) return 'bg-yellow-400 text-gray-900';
    if (retentionRate >= 15) return 'bg-orange-400 text-white';
    if (retentionRate >= 5) return 'bg-red-400 text-white';
    return 'bg-red-600 text-white';
  };

  // Calcular el número máximo de semanas para headers
  const maxWeeks =
    data.cohorts.length > 0
      ? Math.max(...data.cohorts.map((c) => c.retention.length))
      : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          📅 Cohort Retention Analysis
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Retención semanal por cohorte de signup
        </p>
      </div>

      {/* Legend */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
        <p className="text-sm font-semibold text-blue-900 mb-3">
          🎨 Escala de Retención
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded"></div>
            <span className="text-xs text-gray-700">≥70% Excelente</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-400 rounded"></div>
            <span className="text-xs text-gray-700">≥50% Buena</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-400 rounded"></div>
            <span className="text-xs text-gray-700">≥30% Media</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-400 rounded"></div>
            <span className="text-xs text-gray-700">≥15% Baja</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-400 rounded"></div>
            <span className="text-xs text-gray-700">≥5% Muy baja</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded"></div>
            <span className="text-xs text-gray-700">&lt;5% Crítica</span>
          </div>
        </div>
      </div>

      {/* Table */}
      {data.cohorts.length > 0 ? (
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-100 border border-gray-300 font-bold text-sm text-gray-700 sticky left-0">
                  Cohorte
                </th>
                <th className="text-center p-3 bg-gray-100 border border-gray-300 font-bold text-sm text-gray-700">
                  Tamaño
                </th>
                {Array.from({ length: maxWeeks }, (_, i) => (
                  <th
                    key={i}
                    className="text-center p-3 bg-violet-100 border border-gray-300 font-bold text-sm text-violet-900"
                  >
                    W{i}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.cohorts.map((cohort) => (
                <tr key={cohort.cohortDate}>
                  {/* Cohort date */}
                  <td className="p-3 border border-gray-300 font-semibold text-sm text-gray-900 bg-gray-50 sticky left-0">
                    {new Date(cohort.cohortDate).toLocaleDateString('es-ES', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>

                  {/* Cohort size */}
                  <td className="p-3 border border-gray-300 text-center font-bold text-sm text-gray-900">
                    {cohort.size.toLocaleString()}
                  </td>

                  {/* Retention cells */}
                  {Array.from({ length: maxWeeks }, (_, weekIndex) => {
                    const retentionData = cohort.retention.find(
                      (r) => r.weekNumber === weekIndex
                    );

                    if (!retentionData) {
                      return (
                        <td
                          key={weekIndex}
                          className="p-3 border border-gray-300 bg-gray-100"
                        >
                          <div className="text-center text-xs text-gray-400">-</div>
                        </td>
                      );
                    }

                    const colorClass = getRetentionColor(
                      retentionData.retentionRate
                    );

                    return (
                      <td
                        key={weekIndex}
                        className={`p-3 border border-gray-300 ${colorClass}`}
                      >
                        <div className="text-center">
                          <div className="font-bold text-sm">
                            {retentionData.retentionRate.toFixed(0)}%
                          </div>
                          <div className="text-xs opacity-90">
                            {retentionData.activeUsers}
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 text-center">
          <span className="text-4xl mb-3 block">📊</span>
          <p className="text-gray-700 font-semibold mb-2">
            No hay datos de cohortes disponibles
          </p>
          <p className="text-sm text-gray-600">
            Se necesitan al menos 2 semanas de datos para generar la tabla de retención
          </p>
        </div>
      )}

      {/* Summary Insights */}
      {data.cohorts.length > 0 && (
        <div className="bg-violet-50 border-2 border-violet-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-violet-900 mb-2">
                Insights de Retención
              </p>
              <ul className="text-sm text-violet-800 space-y-1">
                {(() => {
                  // Calcular average retention en Week 1
                  const week1Retentions = data.cohorts
                    .map((c) => c.retention.find((r) => r.weekNumber === 1))
                    .filter((r) => r !== undefined)
                    .map((r) => r!.retentionRate);

                  const avgWeek1Retention =
                    week1Retentions.length > 0
                      ? week1Retentions.reduce((sum, r) => sum + r, 0) /
                        week1Retentions.length
                      : 0;

                  // Calcular average retention en Week 4
                  const week4Retentions = data.cohorts
                    .map((c) => c.retention.find((r) => r.weekNumber === 4))
                    .filter((r) => r !== undefined)
                    .map((r) => r!.retentionRate);

                  const avgWeek4Retention =
                    week4Retentions.length > 0
                      ? week4Retentions.reduce((sum, r) => sum + r, 0) /
                        week4Retentions.length
                      : 0;

                  return (
                    <>
                      <li>
                        📊 <strong>Retención promedio Week 1:</strong>{' '}
                        {avgWeek1Retention.toFixed(1)}%
                      </li>
                      {avgWeek4Retention > 0 && (
                        <li>
                          📊 <strong>Retención promedio Week 4:</strong>{' '}
                          {avgWeek4Retention.toFixed(1)}%
                        </li>
                      )}
                      {avgWeek1Retention < 30 && (
                        <li>
                          ⚠️ <strong>Retención temprana baja</strong> - Trabajar en onboarding y activación inicial
                        </li>
                      )}
                      {avgWeek1Retention >= 50 && (
                        <li>
                          ✨ <strong>Buena retención inicial</strong> - Los usuarios encuentran valor rápido
                        </li>
                      )}
                    </>
                  );
                })()}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* How to read */}
      <details className="group">
        <summary className="cursor-pointer list-none">
          <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-4 hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-xl">❓</span>
              <p className="text-sm font-semibold text-gray-900">
                ¿Cómo leer esta tabla?
              </p>
              <span className="ml-auto text-gray-500 group-open:rotate-180 transition-transform">
                ▼
              </span>
            </div>
          </div>
        </summary>
        <div className="mt-2 bg-white border-2 border-gray-200 rounded-xl p-4">
          <ul className="text-sm text-gray-700 space-y-2">
            <li>
              • <strong>Filas:</strong> Cada fila representa una cohorte (usuarios que se registraron en la misma semana)
            </li>
            <li>
              • <strong>W0:</strong> Primera semana (100% por definición)
            </li>
            <li>
              • <strong>W1, W2, etc:</strong> Porcentaje de usuarios de esa cohorte que siguen activos N semanas después
            </li>
            <li>
              • <strong>Colores:</strong> Verde = buena retención, Rojo = baja retención
            </li>
            <li>
              • <strong>Número pequeño:</strong> Cantidad absoluta de usuarios activos esa semana
            </li>
          </ul>
        </div>
      </details>
    </div>
  );
}
