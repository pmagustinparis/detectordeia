/**
 * Revenue Health Component
 *
 * Muestra la salud financiera del negocio:
 * - MRR Breakdown (Nuevo, Expansion, Contraction, Churned)
 * - Churn Metrics (usuarios en riesgo)
 * - LTV (Lifetime Value)
 */

'use client';

import { RevenueHealth as RevenueHealthType } from '@/lib/analytics/types';

interface RevenueHealthProps {
  data: RevenueHealthType;
}

export default function RevenueHealth({ data }: RevenueHealthProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          💵 Revenue Health
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Desglose financiero y salud del negocio
        </p>
      </div>

      {/* Express Metrics - NEW */}
      <div className="bg-white border-2 border-orange-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>⚡</span>
          Express Pass Metrics
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Active Passes */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-600 uppercase mb-1">
              Pases Activos
            </p>
            <p className="text-3xl font-extrabold text-orange-900">
              {data.expressMetrics.activePasses}
            </p>
            <p className="text-xs text-orange-600 mt-1">
              Ahora mismo
            </p>
          </div>

          {/* New Purchases */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-600 uppercase mb-1">
              Compras
            </p>
            <p className="text-2xl font-bold text-green-700">
              {data.expressMetrics.newPurchases}
            </p>
            <p className="text-xs text-green-600 mt-1">
              Este período
            </p>
          </div>

          {/* Revenue */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-600 uppercase mb-1">
              Revenue
            </p>
            <p className="text-2xl font-bold text-blue-700">
              {formatCurrency(data.expressMetrics.totalRevenue)}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              $2.99 c/u
            </p>
          </div>

          {/* Avg Duration */}
          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-600 uppercase mb-1">
              Uso Promedio
            </p>
            <p className="text-2xl font-bold text-purple-700">
              {data.expressMetrics.avgDuration}h
            </p>
            <p className="text-xs text-purple-600 mt-1">
              de 24h disponibles
            </p>
          </div>
        </div>
      </div>

      {/* MRR Breakdown */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>📊</span>
          MRR Breakdown (Pro Suscripciones)
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {/* Total MRR */}
          <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-600 uppercase mb-1">
              Total MRR
            </p>
            <p className="text-3xl font-extrabold text-violet-900">
              {formatCurrency(data.mrrBreakdown.total)}
            </p>
          </div>

          {/* New MRR */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-600 uppercase mb-1">
              Nuevo
            </p>
            <p className="text-2xl font-bold text-green-700">
              +{formatCurrency(data.mrrBreakdown.new)}
            </p>
            <p className="text-xs text-green-600 mt-1">
              Nuevas subs
            </p>
          </div>

          {/* Expansion MRR */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-600 uppercase mb-1">
              Expansión
            </p>
            <p className="text-2xl font-bold text-blue-700">
              +{formatCurrency(data.mrrBreakdown.expansion)}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Upgrades
            </p>
          </div>

          {/* Contraction MRR */}
          <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-600 uppercase mb-1">
              Contracción
            </p>
            <p className="text-2xl font-bold text-orange-700">
              -{formatCurrency(data.mrrBreakdown.contraction)}
            </p>
            <p className="text-xs text-orange-600 mt-1">
              Downgrades
            </p>
          </div>

          {/* Churned MRR */}
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-600 uppercase mb-1">
              Churn
            </p>
            <p className="text-2xl font-bold text-red-700">
              -{formatCurrency(data.mrrBreakdown.churned)}
            </p>
            <p className="text-xs text-red-600 mt-1">
              Cancelaciones
            </p>
          </div>
        </div>

        {/* Net Growth Banner */}
        <div className={`mt-4 rounded-xl p-4 border-2 ${
          data.mrrBreakdown.netGrowth >= 0
            ? 'bg-green-50 border-green-300'
            : 'bg-red-50 border-red-300'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Net MRR Growth
              </p>
              <p className="text-xs text-gray-600 mt-1">
                (Nuevo + Expansión) - (Contracción + Churn)
              </p>
            </div>
            <div className="text-right">
              <p className={`text-3xl font-extrabold ${
                data.mrrBreakdown.netGrowth >= 0 ? 'text-green-700' : 'text-red-700'
              }`}>
                {data.mrrBreakdown.netGrowth >= 0 ? '+' : ''}{formatCurrency(data.mrrBreakdown.netGrowth)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Churn Metrics + LTV */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Churn Metrics */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>⚠️</span>
            Churn Risk
          </h3>

          <div className="space-y-4">
            {/* Stats */}
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Usuarios en Riesgo
                  </p>
                  <p className="text-xs text-gray-500">
                    7+ días sin actividad
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-extrabold text-red-700">
                    {data.churnMetrics.count}
                  </p>
                  <p className="text-sm text-red-600">
                    {formatPercentage(data.churnMetrics.percentage)}
                  </p>
                </div>
              </div>

              {/* Quick insight */}
              {data.churnMetrics.count > 0 && (
                <div className="pt-3 border-t border-red-200">
                  <p className="text-xs text-red-700 font-semibold">
                    💡 Acción recomendada:
                  </p>
                  <p className="text-xs text-red-600 mt-1">
                    Enviar emails de re-engagement a estos usuarios
                  </p>
                </div>
              )}
            </div>

            {/* Lista de usuarios en riesgo (primeros 5) */}
            {data.churnMetrics.users.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Top Churn Risk Users
                </p>
                <div className="space-y-2">
                  {data.churnMetrics.users.slice(0, 5).map((user) => (
                    <div
                      key={user.userId}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate">
                            {user.email}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Última actividad: {new Date(user.lastActivityDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="ml-3 text-right">
                          <p className="text-xs font-bold text-red-700">
                            {user.daysSinceLastActivity}d
                          </p>
                          <p className="text-xs text-gray-500">
                            inactivo
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {data.churnMetrics.users.length > 5 && (
                  <p className="text-xs text-gray-500 text-center mt-2">
                    + {data.churnMetrics.users.length - 5} usuarios más en riesgo
                  </p>
                )}
              </div>
            )}

            {data.churnMetrics.count === 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-700 font-semibold">
                  ✨ ¡Excelente!
                </p>
                <p className="text-sm text-green-600 mt-1">
                  No hay usuarios Premium en riesgo de churn
                </p>
              </div>
            )}
          </div>
        </div>

        {/* LTV */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>💎</span>
            Lifetime Value (LTV)
          </h3>

          <div className="space-y-4">
            {/* Average LTV */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200 rounded-xl p-6">
              <p className="text-sm font-semibold text-gray-600 uppercase mb-2">
                Average LTV
              </p>
              <p className="text-5xl font-extrabold text-violet-900">
                {formatCurrency(data.ltv.average)}
              </p>
              <p className="text-xs text-gray-600 mt-3">
                Valor promedio de vida de cada usuario
              </p>
            </div>

            {/* LTV por Plan */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">
                LTV por Plan
              </p>
              <div className="space-y-2">
                {Object.entries(data.ltv.byPlan).map(([plan, value]) => (
                  <div
                    key={plan}
                    className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        {plan === 'premium' ? '⭐' : '🆓'}
                      </span>
                      <span className="text-sm font-semibold text-gray-700 capitalize">
                        {plan}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      {formatCurrency(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Insight */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-xs font-semibold text-blue-900 mb-2">
                💡 Insight
              </p>
              <p className="text-xs text-blue-800">
                Un usuario Premium tiene un LTV {(data.ltv.byPlan.premium / data.ltv.byPlan.free).toFixed(1)}x mayor que un usuario Free.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
