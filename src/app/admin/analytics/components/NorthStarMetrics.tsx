/**
 * North Star Metrics Component
 *
 * Muestra las 3 métricas más importantes del negocio:
 * - MRR (Monthly Recurring Revenue)
 * - Active Users (Registered + Anonymous)
 * - Conversion Rate (Premium / Registered)
 */

'use client';

import { NorthStarMetrics as NorthStarMetricsType } from '@/lib/analytics/types';

interface NorthStarMetricsProps {
  data: NorthStarMetricsType;
}

export default function NorthStarMetrics({ data }: NorthStarMetricsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number, decimals: number = 1) => {
    return `${value.toFixed(decimals)}%`;
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

  const getTrendBgColor = (trend: number) => {
    if (trend > 0) return 'bg-green-50 border-green-200';
    if (trend < 0) return 'bg-red-50 border-red-200';
    return 'bg-gray-50 border-gray-200';
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          🎯 North Star Metrics
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Las métricas más importantes de tu negocio
        </p>
      </div>

      {/* Grid de 3 métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* MRR */}
        <div className={`border-2 rounded-2xl p-6 ${getTrendBgColor(data.mrr.trend)}`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                MRR
              </p>
              <p className="text-xs text-gray-500 mt-1">Monthly Recurring Revenue</p>
            </div>
            <span className="text-3xl">💰</span>
          </div>

          {/* Valor principal */}
          <div className="mb-4">
            <p className="text-4xl font-extrabold text-gray-900">
              {formatCurrency(data.mrr.current)}
            </p>
            <div className={`flex items-center gap-2 mt-2 ${getTrendColor(data.mrr.trend)}`}>
              <span className="text-2xl">{getTrendIcon(data.mrr.trend)}</span>
              <span className="text-lg font-bold">
                {formatPercentage(Math.abs(data.mrr.trend))}
              </span>
            </div>
          </div>

          {/* Breakdown */}
          <div className="pt-4 border-t border-gray-300 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Nuevo MRR:</span>
              <span className="font-semibold text-green-700">
                +{formatCurrency(data.mrr.newMRR)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Churn MRR:</span>
              <span className="font-semibold text-red-700">
                -{formatCurrency(data.mrr.churnedMRR)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold pt-2 border-t border-gray-200">
              <span className="text-gray-900">Net Growth:</span>
              <span className={data.mrr.netGrowth >= 0 ? 'text-green-700' : 'text-red-700'}>
                {data.mrr.netGrowth >= 0 ? '+' : ''}{formatCurrency(data.mrr.netGrowth)}
              </span>
            </div>
          </div>
        </div>

        {/* Active Users */}
        <div className={`border-2 rounded-2xl p-6 ${getTrendBgColor(data.activeUsers.trend)}`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Active Users
              </p>
              <p className="text-xs text-gray-500 mt-1">Usuarios activos en periodo</p>
            </div>
            <span className="text-3xl">👥</span>
          </div>

          {/* Valor principal */}
          <div className="mb-4">
            <p className="text-4xl font-extrabold text-gray-900">
              {data.activeUsers.total.toLocaleString()}
            </p>
            <div className={`flex items-center gap-2 mt-2 ${getTrendColor(data.activeUsers.trend)}`}>
              <span className="text-2xl">{getTrendIcon(data.activeUsers.trend)}</span>
              <span className="text-lg font-bold">
                {formatPercentage(Math.abs(data.activeUsers.trend))}
              </span>
            </div>
          </div>

          {/* Breakdown */}
          <div className="pt-4 border-t border-gray-300 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Registrados:</span>
              <span className="font-semibold text-violet-700">
                {data.activeUsers.registered.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Anónimos:</span>
              <span className="font-semibold text-blue-700">
                {data.activeUsers.anonymous.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold pt-2 border-t border-gray-200">
              <span className="text-gray-900">Split:</span>
              <span className="text-gray-700">
                {((data.activeUsers.registered / data.activeUsers.total) * 100).toFixed(0)}% / {((data.activeUsers.anonymous / data.activeUsers.total) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className={`border-2 rounded-2xl p-6 ${getTrendBgColor(data.conversionRate.trend)}`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Conversion Rate
              </p>
              <p className="text-xs text-gray-500 mt-1">Premium / Registered Users</p>
            </div>
            <span className="text-3xl">🎯</span>
          </div>

          {/* Valor principal */}
          <div className="mb-4">
            <p className="text-4xl font-extrabold text-gray-900">
              {formatPercentage(data.conversionRate.rate, 2)}
            </p>
            <div className={`flex items-center gap-2 mt-2 ${getTrendColor(data.conversionRate.trend)}`}>
              <span className="text-2xl">{getTrendIcon(data.conversionRate.trend)}</span>
              <span className="text-lg font-bold">
                {formatPercentage(Math.abs(data.conversionRate.trend))}
              </span>
            </div>
          </div>

          {/* Breakdown */}
          <div className="pt-4 border-t border-gray-300 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Premium Users:</span>
              <span className="font-semibold text-violet-700">
                {data.conversionRate.numerator.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Registered (real):</span>
              <span className="font-semibold text-blue-700">
                {data.conversionRate.denominator.toLocaleString()}
              </span>
            </div>
            <div className="pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-500 italic">
                Excluye usuarios test del cálculo
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Insights rápidos */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-blue-900 mb-2">
              Quick Insights
            </p>
            <ul className="text-sm text-blue-800 space-y-1">
              {data.mrr.trend > 10 && (
                <li>✨ <strong>MRR creciendo fuerte</strong> (+{formatPercentage(data.mrr.trend)})</li>
              )}
              {data.mrr.trend < -5 && (
                <li>⚠️ <strong>Alerta de churn</strong> - MRR bajando ({formatPercentage(data.mrr.trend)})</li>
              )}
              {data.conversionRate.rate < 5 && (
                <li>📈 <strong>Oportunidad de conversión</strong> - Solo {formatPercentage(data.conversionRate.rate, 2)} convierte a Premium</li>
              )}
              {data.activeUsers.anonymous > data.activeUsers.registered * 2 && (
                <li>🎯 <strong>Muchos usuarios anónimos</strong> - Oportunidad de capturar signups</li>
              )}
              {data.mrr.netGrowth > 0 && (
                <li>🚀 <strong>Crecimiento neto positivo</strong> - Nuevo MRR supera el churn</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
