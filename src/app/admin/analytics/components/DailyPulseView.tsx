/**
 * Daily Pulse View Component
 *
 * La vista de "30 segundos cada mañana".
 * Muestra los KPIs críticos del día actual con comparación vs ayer.
 */

'use client';

import { DailyPulse } from '@/lib/analytics/types';

interface DailyPulseViewProps {
  data: DailyPulse;
}

export default function DailyPulseView({ data }: DailyPulseViewProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatTrend = (trend: number) => {
    const abs = Math.abs(trend).toFixed(1);
    if (trend > 0) return { text: `+${abs}%`, color: 'text-green-600', icon: '↑' };
    if (trend < 0) return { text: `-${abs}%`, color: 'text-red-600', icon: '↓' };
    return { text: '=', color: 'text-gray-500', icon: '→' };
  };

  const frictionPct = (data.frictionRatio * 100).toFixed(1);
  const frictionColor = data.frictionRatio > 0.15 ? 'text-red-600' : data.frictionRatio > 0.08 ? 'text-yellow-600' : 'text-green-600';
  const frictionBg = data.frictionRatio > 0.15 ? 'bg-red-50 border-red-300' : data.frictionRatio > 0.08 ? 'bg-yellow-50 border-yellow-300' : 'bg-green-50 border-green-300';

  const activeUsersTrend = formatTrend(data.trends.activeUsers);
  const analysesTrend = formatTrend(data.trends.analyses);
  const signupsTrend = formatTrend(data.trends.signups);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Daily Pulse
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {new Date(data.date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} — chequeo de 30 segundos
        </p>
      </div>

      {/* Primary KPIs — the things you look at first */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* MRR */}
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-300 rounded-2xl p-5">
          <p className="text-xs font-semibold text-violet-700 uppercase tracking-wide mb-1">MRR Actual</p>
          <p className="text-3xl font-extrabold text-violet-900">{formatCurrency(data.mrrToday)}</p>
          {data.mrrChange > 0 && (
            <p className="text-xs text-green-600 mt-1 font-semibold">+{formatCurrency(data.mrrChange)} hoy</p>
          )}
          {data.mrrChange === 0 && (
            <p className="text-xs text-gray-500 mt-1">Sin cambios hoy</p>
          )}
        </div>

        {/* Active users today */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-5">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Usuarios Activos Hoy</p>
          <p className="text-3xl font-extrabold text-gray-900">{data.activeToday.toLocaleString()}</p>
          <p className={`text-xs font-semibold mt-1 ${activeUsersTrend.color}`}>
            {activeUsersTrend.icon} {activeUsersTrend.text} vs ayer
          </p>
        </div>

        {/* Signups today */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-5">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Nuevos Registros Hoy</p>
          <p className="text-3xl font-extrabold text-gray-900">{data.newSignupsToday}</p>
          <p className={`text-xs font-semibold mt-1 ${signupsTrend.color}`}>
            {signupsTrend.icon} {signupsTrend.text} vs ayer
          </p>
        </div>

        {/* Analyses today */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-5">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Análisis Completados Hoy</p>
          <p className="text-3xl font-extrabold text-gray-900">{data.analysesToday.toLocaleString()}</p>
          <p className={`text-xs font-semibold mt-1 ${analysesTrend.color}`}>
            {analysesTrend.icon} {analysesTrend.text} vs ayer
          </p>
        </div>
      </div>

      {/* Secondary signals */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* New paying users today */}
        <div className={`border-2 rounded-xl p-4 ${data.newPayingToday > 0 ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{data.newPayingToday > 0 ? '🎉' : '💳'}</span>
            <p className="text-xs font-semibold text-gray-700">Nuevos Pagadores Hoy</p>
          </div>
          <p className={`text-3xl font-extrabold ${data.newPayingToday > 0 ? 'text-green-700' : 'text-gray-400'}`}>
            {data.newPayingToday}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {data.newPayingToday > 0 ? `+${formatCurrency(data.newPayingToday * 12.99)} MRR` : 'Sin ventas aún hoy'}
          </p>
        </div>

        {/* Hot leads */}
        <div className={`border-2 rounded-xl p-4 ${data.hotLeadsCount > 0 ? 'bg-amber-50 border-amber-300' : 'bg-gray-50 border-gray-200'}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🔥</span>
            <p className="text-xs font-semibold text-gray-700">Hot Leads (24h)</p>
          </div>
          <p className={`text-3xl font-extrabold ${data.hotLeadsCount > 0 ? 'text-amber-700' : 'text-gray-400'}`}>
            {data.hotLeadsCount}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {data.hotLeadsCount > 0 ? 'Ver sección Hot Leads' : 'Sin señales hoy'}
          </p>
        </div>

        {/* Checkouts today */}
        <div className={`border-2 rounded-xl p-4 ${data.checkoutsToday > 0 ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200'}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🛒</span>
            <p className="text-xs font-semibold text-gray-700">Checkouts Iniciados Hoy</p>
          </div>
          <p className={`text-3xl font-extrabold ${data.checkoutsToday > 0 ? 'text-blue-700' : 'text-gray-400'}`}>
            {data.checkoutsToday}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {data.checkoutsToday > data.newPayingToday && data.checkoutsToday > 0
              ? `${data.checkoutsToday - data.newPayingToday} abandonaron`
              : 'En proceso de conversión'}
          </p>
        </div>

        {/* Friction ratio */}
        <div className={`border-2 rounded-xl p-4 ${frictionBg}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">⚠️</span>
            <p className="text-xs font-semibold text-gray-700">Fricción Hoy</p>
          </div>
          <p className={`text-3xl font-extrabold ${frictionColor}`}>{frictionPct}%</p>
          <p className="text-xs text-gray-600 mt-1">
            {data.frictionEventsToday} bloqueos de {data.analysesToday > 0 ? data.analysesToday : '-'} usos
          </p>
        </div>
      </div>

      {/* Status interpretation */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-blue-900 mb-2">
              Diagnóstico del día
            </p>
            <ul className="text-sm text-blue-800 space-y-1">
              {data.newPayingToday > 0 && (
                <li>💰 <strong>Día con ventas</strong> — {data.newPayingToday} nuevo(s) pagador(es), +{formatCurrency(data.newPayingToday * 12.99)} al MRR</li>
              )}
              {data.checkoutsToday > 0 && data.checkoutsToday > data.newPayingToday && (
                <li>🛒 <strong>Checkout abandonado</strong> — {data.checkoutsToday - data.newPayingToday} persona(s) llegaron a checkout pero no convirtieron hoy</li>
              )}
              {data.hotLeadsCount >= 5 && (
                <li>🔥 <strong>Muchos hot leads</strong> — {data.hotLeadsCount} usuarios tocaron límites múltiples veces. Ideal para outreach personalizado.</li>
              )}
              {data.frictionRatio > 0.15 && (
                <li>⚠️ <strong>Fricción alta</strong> — {frictionPct}% de interacciones son bloqueos. Podría indicar que los límites son muy restrictivos o que el producto está despertando interés premium.</li>
              )}
              {data.newSignupsToday === 0 && (
                <li>📉 <strong>Sin registros hoy</strong> — Revisar tráfico y si hay problemas con el signup flow.</li>
              )}
              {data.activeToday > 0 && data.analysesToday === 0 && (
                <li>🤔 <strong>Usuarios activos sin análisis</strong> — Hay sesiones pero sin uso de herramientas. Puede ser navegación de pricing/blog.</li>
              )}
              {data.newPayingToday === 0 && data.checkoutsToday === 0 && data.hotLeadsCount === 0 && (
                <li>😐 <strong>Día tranquilo</strong> — Sin señales comerciales destacables. Normal si es temprano en el día.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
