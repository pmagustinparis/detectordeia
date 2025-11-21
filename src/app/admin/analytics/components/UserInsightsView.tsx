/**
 * User Insights View Component
 *
 * Muestra insights sobre la base de usuarios:
 * - Demographics (roles, use cases, discovery sources)
 * - Top Users (más activos)
 * - Recent Signups (con info de actividad previa)
 */

'use client';

import { UserInsights } from '@/lib/analytics/types';

interface UserInsightsViewProps {
  data: UserInsights;
}

export default function UserInsightsView({ data }: UserInsightsViewProps) {
  const formatPercentage = (value: number, total: number) => {
    if (total === 0) return '0%';
    return `${((value / total) * 100).toFixed(1)}%`;
  };

  const getPlanBadge = (plan: string) => {
    if (plan === 'premium') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-violet-100 text-violet-800 border border-violet-300">
          ⭐ PRO
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-300">
        🆓 FREE
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          👥 User Insights
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Información demográfica y comportamiento de usuarios
        </p>
      </div>

      {/* Demographics */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>📊</span>
          Demographics
        </h3>

        {/* Summary stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-600 mb-1">
              Total Profiles
            </p>
            <p className="text-4xl font-extrabold text-violet-900">
              {data.demographics.totalProfiles.toLocaleString()}
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-600 mb-1">
              Completion Rate
            </p>
            <p className="text-4xl font-extrabold text-blue-900">
              {data.demographics.completionRate.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Breakdown sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* By Role */}
          <div>
            <p className="text-sm font-bold text-gray-700 mb-3">
              👔 Por Rol
            </p>
            <div className="space-y-2">
              {Object.entries(data.demographics.byRole).length > 0 ? (
                Object.entries(data.demographics.byRole)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 5)
                  .map(([role, count]) => (
                    <div
                      key={role}
                      className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-2"
                    >
                      <span className="text-sm text-gray-700 truncate flex-1">
                        {role || 'Sin especificar'}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">
                          {count}
                        </span>
                        <span className="text-xs text-gray-600">
                          ({formatPercentage(count, data.demographics.totalProfiles)})
                        </span>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-xs text-gray-500 italic">No hay datos</p>
              )}
            </div>
          </div>

          {/* By Primary Use */}
          <div>
            <p className="text-sm font-bold text-gray-700 mb-3">
              🎯 Uso Principal
            </p>
            <div className="space-y-2">
              {Object.entries(data.demographics.byPrimaryUse).length > 0 ? (
                Object.entries(data.demographics.byPrimaryUse)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 5)
                  .map(([use, count]) => (
                    <div
                      key={use}
                      className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-2"
                    >
                      <span className="text-sm text-gray-700 truncate flex-1">
                        {use || 'Sin especificar'}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">
                          {count}
                        </span>
                        <span className="text-xs text-gray-600">
                          ({formatPercentage(count, data.demographics.totalProfiles)})
                        </span>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-xs text-gray-500 italic">No hay datos</p>
              )}
            </div>
          </div>

          {/* By Discovery Source */}
          <div>
            <p className="text-sm font-bold text-gray-700 mb-3">
              🔍 Fuente de Descubrimiento
            </p>
            <div className="space-y-2">
              {Object.entries(data.demographics.byDiscoverySource).length > 0 ? (
                Object.entries(data.demographics.byDiscoverySource)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 5)
                  .map(([source, count]) => (
                    <div
                      key={source}
                      className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-2"
                    >
                      <span className="text-sm text-gray-700 truncate flex-1">
                        {source || 'Sin especificar'}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">
                          {count}
                        </span>
                        <span className="text-xs text-gray-600">
                          ({formatPercentage(count, data.demographics.totalProfiles)})
                        </span>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-xs text-gray-500 italic">No hay datos</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Top Users */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>🏆</span>
          Top Users
          <span className="text-sm font-normal text-gray-600 ml-2">
            (Más activos)
          </span>
        </h3>

        {data.topUsers.length > 0 ? (
          <div className="space-y-2">
            {data.topUsers.slice(0, 15).map((user, index) => (
              <div
                key={user.userId}
                className={`border-2 rounded-lg p-4 ${
                  user.plan === 'premium'
                    ? 'bg-violet-50 border-violet-200'
                    : 'bg-gray-50 border-gray-200'
                } ${user.isTestUser ? 'opacity-50' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-gray-700">
                        #{index + 1}
                      </span>
                      {getPlanBadge(user.plan)}
                      {user.isTestUser && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-300">
                          🧪 TEST
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-gray-900 truncate">
                        {user.email}
                      </p>
                      {user.name && (
                        <p className="text-sm text-gray-600">{user.name}</p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-gray-600 mt-2">
                        <div>
                          <span className="font-semibold">Eventos:</span>{' '}
                          {user.eventCount.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-semibold">Días desde signup:</span>{' '}
                          {user.daysSinceSignup}
                        </div>
                        <div>
                          <span className="font-semibold">Última actividad:</span>{' '}
                          {new Date(user.lastEventDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-3xl font-extrabold text-gray-900">
                      {user.eventCount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">eventos</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            No hay datos de usuarios disponibles
          </p>
        )}
      </div>

      {/* Recent Signups */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>🆕</span>
          Recent Signups
          <span className="text-sm font-normal text-gray-600 ml-2">
            (Últimos registros)
          </span>
        </h3>

        {data.recentSignups.length > 0 ? (
          <div className="space-y-2">
            {data.recentSignups.slice(0, 10).map((user) => (
              <div
                key={user.userId}
                className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {user.email}
                    </p>
                    {user.name && (
                      <p className="text-sm text-gray-600 mt-1">{user.name}</p>
                    )}
                  </div>
                  <div className="ml-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                      user.signupMethod === 'google'
                        ? 'bg-blue-100 text-blue-800'
                        : user.signupMethod === 'email'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.signupMethod === 'google' && '🔵'}
                      {user.signupMethod === 'email' && '✉️'}
                      {user.signupMethod === 'unknown' && '❓'}
                      {' '}
                      {user.signupMethod.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="bg-white border border-gray-200 rounded p-2">
                    <p className="text-gray-600 mb-1">Signup:</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(user.signupDate).toLocaleDateString('es-ES', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded p-2">
                    <p className="text-gray-600 mb-1">Prior Activity:</p>
                    <p className="font-semibold text-gray-900">
                      {user.hadPriorActivity ? (
                        <span className="text-green-700">✓ Sí ({user.eventsBeforeSignup})</span>
                      ) : (
                        <span className="text-gray-500">✗ No</span>
                      )}
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded p-2">
                    <p className="text-gray-600 mb-1">Events Antes:</p>
                    <p className="font-semibold text-gray-900">
                      {user.eventsBeforeSignup}
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded p-2">
                    <p className="text-gray-600 mb-1">Events Después:</p>
                    <p className="font-semibold text-gray-900">
                      {user.eventsSinceSignup}
                    </p>
                  </div>
                </div>

                {/* Insight */}
                {user.hadPriorActivity && (
                  <div className="mt-2 bg-blue-50 border border-blue-200 rounded p-2">
                    <p className="text-xs text-blue-800">
                      💡 Usuario probó el producto antes de registrarse ({user.eventsBeforeSignup} eventos)
                    </p>
                  </div>
                )}
                {!user.hadPriorActivity && user.eventsSinceSignup === 0 && (
                  <div className="mt-2 bg-red-50 border border-red-200 rounded p-2">
                    <p className="text-xs text-red-800">
                      ⚠️ Se registró pero nunca usó el producto
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            No hay signups recientes
          </p>
        )}
      </div>
    </div>
  );
}
