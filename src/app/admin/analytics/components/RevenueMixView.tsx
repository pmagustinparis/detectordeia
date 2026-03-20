/**
 * Revenue Mix View Component
 *
 * Desglosa los ingresos por producto:
 * - Express 24h vs 7d
 * - Premium mensual vs anual
 * - ARPU, Express repeat rate
 * - Split Express vs Premium
 */

'use client';

import { RevenueMix } from '@/lib/analytics/types';

interface RevenueMixViewProps {
  data: RevenueMix;
}

export default function RevenueMixView({ data }: RevenueMixViewProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const expressTotal = data.express24h.revenue + data.express7d.revenue;
  const premiumTotal = data.premiumMonthly.mrr + data.premiumAnnual.mrr;

  // Bar widths for the mix visualization
  const expressWidth = data.totalRevenuePeriod > 0
    ? (expressTotal / data.totalRevenuePeriod) * 100
    : 0;
  const premiumWidth = 100 - expressWidth;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Revenue Mix
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Desglose detallado por producto: Express 24h, Express 7d, Premium mensual/anual
        </p>
      </div>

      {/* Total Revenue + ARPU + Split Bar */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Resumen del Período</h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {/* Total Revenue */}
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200 rounded-xl p-4 text-center">
            <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Revenue Total</p>
            <p className="text-3xl font-extrabold text-violet-900">{formatCurrency(data.totalRevenuePeriod)}</p>
            <p className="text-xs text-gray-600 mt-1">Express + Premium</p>
          </div>

          {/* ARPU */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4 text-center">
            <p className="text-xs font-semibold text-gray-600 uppercase mb-1">ARPU</p>
            <p className="text-3xl font-extrabold text-blue-900">{formatCurrency(data.arpu)}</p>
            <p className="text-xs text-gray-600 mt-1">Revenue por pagador</p>
          </div>

          {/* Express repeat rate */}
          <div className={`border-2 rounded-xl p-4 text-center ${data.expressRepeatRate > 20 ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
            <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Express Repeat Rate</p>
            <p className={`text-3xl font-extrabold ${data.expressRepeatRate > 20 ? 'text-green-700' : 'text-gray-600'}`}>
              {data.expressRepeatRate.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-600 mt-1">Recompra Express</p>
          </div>
        </div>

        {/* Revenue mix bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-semibold">
            <span className="text-orange-700">Express ({formatCurrency(expressTotal)})</span>
            <span className="text-violet-700">Premium ({formatCurrency(premiumTotal)})</span>
          </div>
          <div className="w-full h-8 rounded-xl overflow-hidden flex">
            {expressWidth > 0 && (
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-amber-500 flex items-center justify-center transition-all"
                style={{ width: `${expressWidth}%` }}
              >
                {expressWidth > 15 && (
                  <span className="text-xs font-bold text-white">{expressWidth.toFixed(0)}%</span>
                )}
              </div>
            )}
            {premiumWidth > 0 && (
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center transition-all"
                style={{ width: `${premiumWidth}%` }}
              >
                {premiumWidth > 15 && (
                  <span className="text-xs font-bold text-white">{premiumWidth.toFixed(0)}%</span>
                )}
              </div>
            )}
            {data.totalRevenuePeriod === 0 && (
              <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                <span className="text-xs text-gray-500">Sin datos de revenue</span>
              </div>
            )}
          </div>
          <div className="flex gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-orange-400" />
              Express
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-violet-500" />
              Premium
            </div>
          </div>
        </div>
      </div>

      {/* Product breakdown grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Express 24h */}
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            Express 24h
            <span className="text-xs font-normal text-orange-600 ml-1">$3.99 c/u</span>
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center bg-orange-50 border border-orange-200 rounded-lg p-3">
              <span className="text-sm text-gray-700">Compras en período</span>
              <span className="text-xl font-bold text-orange-700">{data.express24h.purchases}</span>
            </div>
            <div className="flex justify-between items-center bg-orange-50 border border-orange-200 rounded-lg p-3">
              <span className="text-sm text-gray-700">Revenue generado</span>
              <span className="text-xl font-bold text-orange-700">{formatCurrency(data.express24h.revenue)}</span>
            </div>
            <div className="flex justify-between items-center bg-orange-50 border border-orange-200 rounded-lg p-3">
              <span className="text-sm text-gray-700">Recompradores</span>
              <span className="text-xl font-bold text-orange-700">{data.express24h.repeatPurchasers}</span>
            </div>
          </div>

          {data.express24h.purchases > 0 && data.express24h.repeatPurchasers > 0 && (
            <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-xs text-green-800">
                <strong>Señal positiva:</strong> {data.express24h.repeatPurchasers} usuario(s) compraron Express más de una vez. Estos son candidatos ideales para conversion a Premium.
              </p>
            </div>
          )}
        </div>

        {/* Express 7d */}
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">📅</span>
            Express 7 días
            <span className="text-xs font-normal text-amber-600 ml-1">$8.99 c/u</span>
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center bg-amber-50 border border-amber-200 rounded-lg p-3">
              <span className="text-sm text-gray-700">Compras en período</span>
              <span className="text-xl font-bold text-amber-700">{data.express7d.purchases}</span>
            </div>
            <div className="flex justify-between items-center bg-amber-50 border border-amber-200 rounded-lg p-3">
              <span className="text-sm text-gray-700">Revenue generado</span>
              <span className="text-xl font-bold text-amber-700">{formatCurrency(data.express7d.revenue)}</span>
            </div>
          </div>

          {data.express7d.purchases > 0 && (
            <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-800">
                <strong>Nota:</strong> El Express 7d tiene mejor ARPU ($8.99 vs $3.99). Considerar destacarlo más en pricing.
              </p>
            </div>
          )}

          {data.express7d.purchases === 0 && (
            <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-xs text-yellow-800">
                Sin compras de Express 7d en este período. Revisar si está visible en la pricing page.
              </p>
            </div>
          )}
        </div>

        {/* Premium Monthly */}
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">💎</span>
            Premium Mensual
            <span className="text-xs font-normal text-violet-600 ml-1">$12.99/mes</span>
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center bg-violet-50 border border-violet-200 rounded-lg p-3">
              <span className="text-sm text-gray-700">Suscriptores activos</span>
              <span className="text-xl font-bold text-violet-700">{data.premiumMonthly.subscribers}</span>
            </div>
            <div className="flex justify-between items-center bg-violet-50 border border-violet-200 rounded-lg p-3">
              <span className="text-sm text-gray-700">MRR aportado</span>
              <span className="text-xl font-bold text-violet-700">{formatCurrency(data.premiumMonthly.mrr)}</span>
            </div>
          </div>
        </div>

        {/* Premium Annual */}
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            Premium Anual
            <span className="text-xs font-normal text-indigo-600 ml-1">$124.68/año ($10.39/mes)</span>
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center bg-indigo-50 border border-indigo-200 rounded-lg p-3">
              <span className="text-sm text-gray-700">Suscriptores activos</span>
              <span className="text-xl font-bold text-indigo-700">{data.premiumAnnual.subscribers}</span>
            </div>
            <div className="flex justify-between items-center bg-indigo-50 border border-indigo-200 rounded-lg p-3">
              <span className="text-sm text-gray-700">MRR normalizado</span>
              <span className="text-xl font-bold text-indigo-700">{formatCurrency(data.premiumAnnual.mrr)}</span>
            </div>
          </div>

          {data.premiumAnnual.subscribers === 0 && (
            <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-xs text-yellow-800">
                Sin suscriptores anuales. El plan anual reduce churn y aumenta LTV 2x. Considerar destacarlo con descuento visible.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Strategic insights */}
      <div className="bg-violet-50 border-2 border-violet-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🎯</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-violet-900 mb-2">
              Insights Estratégicos
            </p>
            <ul className="text-sm text-violet-800 space-y-1">
              {data.expressVsPremiumSplit > 60 && (
                <li>⚠️ <strong>Revenue dominado por Express ({data.expressVsPremiumSplit.toFixed(0)}%)</strong> — El MRR es inestable porque Express es pago único. Priorizar conversión a Premium recurrente.</li>
              )}
              {data.expressVsPremiumSplit < 20 && data.express24h.purchases > 0 && (
                <li>💡 <strong>Express subutilizado</strong> — Solo {data.expressVsPremiumSplit.toFixed(0)}% del revenue viene de Express. Puede ser un buen entry point para convertir usuarios. Considerar upsell Express → Premium más agresivo.</li>
              )}
              {data.expressRepeatRate > 30 && (
                <li>✨ <strong>Alta recompra de Express ({data.expressRepeatRate.toFixed(0)}%)</strong> — Estos usuarios valoran el producto pero no se suscriben. Ofrecerles un upgrade con descuento del primer mes.</li>
              )}
              {data.premiumAnnual.subscribers === 0 && data.premiumMonthly.subscribers > 0 && (
                <li>📊 <strong>0% conversión a anual</strong> — Ningún usuario eligió el plan anual. Hacerlo más prominente podría reducir churn y aumentar LTV significativamente.</li>
              )}
              {data.arpu > 0 && data.arpu < 5 && (
                <li>💰 <strong>ARPU bajo (${data.arpu.toFixed(2)})</strong> — El revenue por pagador es bajo. Revisar si Express 24h está siendo la opción default en vez de Premium.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
