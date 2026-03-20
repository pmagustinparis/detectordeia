/**
 * Acquisition View Component
 *
 * Muestra métricas de adquisición:
 * - DAU/WAU/MAU con ratio de stickiness
 * - Entry pages: qué páginas generan más tráfico y signups
 * - Referrers: de dónde viene el tráfico
 * - New vs returning users
 */

'use client';

import { AcquisitionMetrics } from '@/lib/analytics/types';

interface AcquisitionViewProps {
  data: AcquisitionMetrics;
}

export default function AcquisitionView({ data }: AcquisitionViewProps) {
  const formatPct = (v: number) => `${v.toFixed(1)}%`;
  const stickinessColor = data.dauWauRatio >= 0.3 ? 'text-green-700' : data.dauWauRatio >= 0.15 ? 'text-yellow-700' : 'text-red-700';
  const stickinessLabel = data.dauWauRatio >= 0.3 ? 'Excelente' : data.dauWauRatio >= 0.15 ? 'Normal' : 'Baja';

  const getCategoryBadge = (category: string) => {
    const styles: Record<string, string> = {
      search: 'bg-blue-100 text-blue-800 border-blue-300',
      social: 'bg-pink-100 text-pink-800 border-pink-300',
      direct: 'bg-gray-100 text-gray-700 border-gray-300',
      other: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    };
    const labels: Record<string, string> = {
      search: 'Buscador',
      social: 'Social',
      direct: 'Directo',
      other: 'Otro',
    };
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${styles[category] || styles.other}`}>
        {labels[category] || category}
      </span>
    );
  };

  // Max visits for bar width calculation
  const maxPageVisits = Math.max(...data.topEntryPages.map(p => p.visits), 1);
  const maxReferrerVisits = Math.max(...data.topReferrers.map(r => r.visits), 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Adquisicion & Tráfico
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          De dónde vienen los usuarios y qué páginas generan conversión
        </p>
      </div>

      {/* DAU / WAU / MAU */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>📊</span>
          DAU / WAU / MAU
          <span className="text-xs font-normal text-gray-500 ml-1">— stickiness del producto</span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200 rounded-xl p-4 text-center">
            <p className="text-xs font-semibold text-gray-600 uppercase mb-1">DAU (hoy)</p>
            <p className="text-3xl font-extrabold text-violet-900">{data.dau.toLocaleString()}</p>
            <p className="text-xs text-gray-600 mt-1">Usuarios activos</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4 text-center">
            <p className="text-xs font-semibold text-gray-600 uppercase mb-1">WAU (7d)</p>
            <p className="text-3xl font-extrabold text-blue-900">{data.wau.toLocaleString()}</p>
            <p className="text-xs text-gray-600 mt-1">Usuarios activos</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-4 text-center">
            <p className="text-xs font-semibold text-gray-600 uppercase mb-1">MAU (30d)</p>
            <p className="text-3xl font-extrabold text-indigo-900">{data.mau.toLocaleString()}</p>
            <p className="text-xs text-gray-600 mt-1">Usuarios activos</p>
          </div>
          <div className={`border-2 rounded-xl p-4 text-center ${data.dauWauRatio >= 0.3 ? 'bg-green-50 border-green-200' : data.dauWauRatio >= 0.15 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'}`}>
            <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Stickiness</p>
            <p className={`text-3xl font-extrabold ${stickinessColor}`}>
              {(data.dauWauRatio * 100).toFixed(0)}%
            </p>
            <p className="text-xs text-gray-600 mt-1">DAU/WAU — {stickinessLabel}</p>
          </div>
        </div>

        {/* New vs returning */}
        <div className="mt-4 pt-4 border-t-2 border-gray-200 grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-1">Usuarios Nuevos Hoy</p>
            <p className="text-2xl font-bold text-green-700">{data.newUsersToday}</p>
            <p className="text-xs text-gray-500">Primera sesión hoy</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-1">Usuarios Retornando Hoy</p>
            <p className="text-2xl font-bold text-blue-700">{data.returningUsersToday}</p>
            <p className="text-xs text-gray-500">Activos también ayer</p>
          </div>
        </div>
      </div>

      {/* Entry Pages */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>📄</span>
          Páginas de Entrada
          <span className="text-xs font-normal text-gray-500 ml-1">— por volumen de eventos en el período</span>
        </h3>

        {data.topEntryPages.length > 0 ? (
          <div className="space-y-3">
            {data.topEntryPages.map((page, index) => {
              const widthPct = (page.visits / maxPageVisits) * 100;
              return (
                <div key={page.page} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-xs font-bold text-gray-500 w-5 shrink-0">#{index + 1}</span>
                      <span className="font-semibold text-gray-900 truncate">{page.page}</span>
                    </div>
                    <div className="flex items-center gap-3 ml-4 shrink-0">
                      <span className="text-xs text-gray-500">{page.visits.toLocaleString()} visitas</span>
                      {page.signups > 0 && (
                        <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                          {page.signups} signups ({formatPct(page.signupRate)})
                        </span>
                      )}
                      {page.conversions > 0 && (
                        <span className="text-xs font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded">
                          {page.conversions} checkouts
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-600"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            No hay datos de páginas disponibles. Los eventos deben incluir page_url para ver este análisis.
          </p>
        )}

        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-800">
            <strong>Nota:</strong> Los datos se calculan a partir del campo <code>page_url</code> de analytics_events. Solo disponible para eventos trackeados con URL.
          </p>
        </div>
      </div>

      {/* Referrers */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>🔗</span>
          Fuentes de Tráfico (Referrers)
        </h3>

        {data.topReferrers.length > 0 ? (
          <div className="space-y-3">
            {data.topReferrers.map((ref, index) => {
              const widthPct = (ref.visits / maxReferrerVisits) * 100;
              return (
                <div key={ref.referrer} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-xs font-bold text-gray-500 w-5 shrink-0">#{index + 1}</span>
                      <span className="font-semibold text-gray-900 truncate max-w-[200px]">{ref.referrer}</span>
                      {getCategoryBadge(ref.category)}
                    </div>
                    <div className="flex items-center gap-3 ml-4 shrink-0">
                      <span className="text-xs text-gray-500">{ref.visits.toLocaleString()} visitas</span>
                      {ref.signups > 0 && (
                        <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                          {ref.signups} signups
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        ref.category === 'search' ? 'bg-blue-500' :
                        ref.category === 'social' ? 'bg-pink-500' :
                        ref.category === 'direct' ? 'bg-gray-400' :
                        'bg-yellow-500'
                      }`}
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            No hay datos de referrers disponibles para este período.
          </p>
        )}

        {/* Category legend */}
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-xs text-gray-600">Buscadores (SEO)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-pink-500" />
            <span className="text-xs text-gray-600">Redes Sociales</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-gray-400" />
            <span className="text-xs text-gray-600">Directo</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-xs text-gray-600">Otro</span>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-yellow-900 mb-2">
              Insights de Adquisición
            </p>
            <ul className="text-sm text-yellow-800 space-y-1">
              {data.dauWauRatio < 0.1 && (
                <li>⚠️ <strong>Stickiness muy baja ({(data.dauWauRatio * 100).toFixed(0)}%)</strong> — Los usuarios no vuelven día a día. Considerar emails de re-engagement o nuevas features.</li>
              )}
              {data.dauWauRatio >= 0.3 && (
                <li>✨ <strong>Excelente stickiness ({(data.dauWauRatio * 100).toFixed(0)}%)</strong> — Los usuarios vuelven con frecuencia. Buen momento para optimizar conversion.</li>
              )}
              {data.returningUsersToday > data.newUsersToday && (
                <li>🔄 <strong>Mayoría son usuarios retornantes</strong> — Buena señal de retención. Pero depender demasiado de retención sin nuevos usuarios es señal de que el SEO/adquisición necesita trabajo.</li>
              )}
              {data.newUsersToday > data.returningUsersToday * 3 && (
                <li>🚀 <strong>Mucho tráfico nuevo</strong> — Alto volumen de nuevos usuarios. Verificar que el onboarding los active rápido.</li>
              )}
              {data.topEntryPages.some(p => p.signupRate > 10) && (
                <li>🎯 <strong>Páginas con alta conversión a registro</strong> — Aprovechar esas páginas para CTAs más agresivos.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
