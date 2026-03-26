'use client';

import { SegmentIntelligence } from '@/lib/analytics/segmentQueries';

interface Props {
  data: SegmentIntelligence;
}

const TOOL_COLORS: Record<string, string> = {
  detector: 'bg-blue-500',
  humanizador: 'bg-emerald-500',
  parafraseador: 'bg-orange-500',
};

const TOOL_LABELS: Record<string, string> = {
  detector: 'Detector',
  humanizador: 'Humanizador',
  parafraseador: 'Parafraseador',
};

const SURVEY_TYPE_LABELS: Record<string, string> = {
  exit_intent: 'Exit Intent',
  post_use: 'Post-uso',
  churn: 'Churn',
  passive_feedback: 'Widget "¿Falta algo?"',
};

const QUESTION_LABELS: Record<string, string> = {
  que_falta_o_mejorarias: '¿Qué falta o mejorarías?',
  que_te_falto: '¿Qué te faltó hoy?',
  por_que_no_registraste: '¿Por qué no te registraste?',
  que_mejorarias: '¿Qué mejorarías?',
  como_fue_experiencia: '¿Cómo fue tu experiencia?',
  por_que_cancelas: '¿Por qué cancelás?',
  experience_detector: 'Experiencia Detector',
  experience_humanizador: 'Experiencia Humanizador',
  experience_parafraseador: 'Experiencia Parafraseador',
};

function ConversionBadge({ rate }: { rate: number }) {
  const color = rate >= 15 ? 'bg-emerald-100 text-emerald-700' : rate >= 5 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700';
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${color}`}>
      {rate}%
    </span>
  );
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <span className="text-sm">
      {'⭐'.repeat(Math.round(rating))}
      <span className="text-slate-500 ml-1 text-xs">({rating.toFixed(1)})</span>
    </span>
  );
}

export default function SegmentIntelligenceView({ data }: Props) {
  if (!data) return null;

  const totalResponses = data.surveyInsights.reduce((acc, s) => acc + s.totalResponses, 0);

  return (
    <div className="space-y-8">

      {/* ── Segmentos Rentables ─────────────────────────── */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
          🎯 Segmentos Rentables
        </h2>
        <p className="text-xs text-slate-500 mb-4">Qué roles de usuario tienen mayor tasa de conversión a premium.</p>

        {data.byRole.length === 0 ? (
          <p className="text-sm text-slate-400">Sin datos suficientes todavía.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rol</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Usuarios</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Premium</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Conversión</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tool top</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.byRole.map((seg) => (
                  <tr key={seg.segment} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-800">{seg.label}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{seg.totalUsers.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{seg.premiumUsers}</td>
                    <td className="px-4 py-3 text-right">
                      <ConversionBadge rate={seg.conversionRate} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-xs font-semibold text-white px-2 py-0.5 rounded-full ${TOOL_COLORS[seg.topTool] || 'bg-slate-400'}`}>
                        {TOOL_LABELS[seg.topTool] || seg.topTool}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ── Valor por Canal de Adquisición ─────────────── */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
          📡 Valor por Canal de Adquisición
        </h2>
        <p className="text-xs text-slate-500 mb-4">Qué canales traen usuarios que realmente convierten a premium.</p>

        {data.byDiscoverySource.length === 0 ? (
          <p className="text-sm text-slate-400">Sin datos suficientes todavía.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.byDiscoverySource.map((src) => (
              <div key={src.source} className="bg-white border border-slate-200 rounded-xl p-4">
                <p className="font-semibold text-slate-800 text-sm mb-2">{src.label}</p>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Usuarios totales</span>
                  <span className="font-medium text-slate-700">{src.totalUsers}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>Premium</span>
                  <span className="font-medium text-slate-700">{src.premiumUsers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Conversión</span>
                  <ConversionBadge rate={src.conversionRate} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Preferencia de Herramienta por Rol ─────────── */}
      {data.toolPreferenceByRole.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
            🔧 Qué herramienta usa cada segmento
          </h2>
          <p className="text-xs text-slate-500 mb-4">Distribución de usos por herramienta para cada rol de usuario.</p>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rol</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-blue-500 uppercase tracking-wider">Detector</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-emerald-500 uppercase tracking-wider">Humanizador</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-orange-500 uppercase tracking-wider">Parafraseador</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.toolPreferenceByRole.map((row) => {
                  const total = row.detector + row.humanizador + row.parafraseador || 1;
                  return (
                    <tr key={row.role} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-800">{row.label}</td>
                      {(['detector', 'humanizador', 'parafraseador'] as const).map((tool) => (
                        <td key={tool} className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 bg-slate-100 rounded-full h-1.5 hidden sm:block">
                              <div
                                className={`h-1.5 rounded-full ${TOOL_COLORS[tool]}`}
                                style={{ width: `${Math.round((row[tool] / total) * 100)}%` }}
                              />
                            </div>
                            <span className="text-slate-600 tabular-nums">
                              {Math.round((row[tool] / total) * 100)}%
                            </span>
                          </div>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ── Insights de Surveys ────────────────────────── */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
          💬 Voz del Usuario
          {totalResponses > 0 && (
            <span className="text-xs font-normal text-slate-500">({totalResponses} respuestas totales)</span>
          )}
        </h2>
        <p className="text-xs text-slate-500 mb-4">Respuestas recopiladas de todos los surveys activos.</p>

        {data.surveyInsights.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
            <p className="text-2xl mb-2">🌱</p>
            <p className="text-sm font-medium text-slate-700">Todavía no hay respuestas de surveys</p>
            <p className="text-xs text-slate-500 mt-1">Los datos aparecerán aquí a medida que los usuarios respondan el exit intent, post-uso y el widget de feedback.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {data.surveyInsights.map((insight) => (
              <div key={`${insight.surveyType}::${insight.questionKey}`} className="bg-white border border-slate-200 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs font-medium text-violet-600 uppercase tracking-wider">
                      {SURVEY_TYPE_LABELS[insight.surveyType] || insight.surveyType}
                    </span>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">
                      {QUESTION_LABELS[insight.questionKey] || insight.questionKey}
                    </p>
                  </div>
                  <span className="text-xs text-slate-400 ml-2 flex-shrink-0">{insight.totalResponses} resp.</span>
                </div>

                {insight.avgRating !== null && (
                  <div className="mb-3">
                    <RatingStars rating={insight.avgRating} />
                  </div>
                )}

                {insight.topOptions.length > 0 && (
                  <div className="space-y-1.5 mb-3">
                    {insight.topOptions.map(({ option, count }) => {
                      const pct = Math.round((count / insight.totalResponses) * 100);
                      return (
                        <div key={option}>
                          <div className="flex items-center justify-between text-xs mb-0.5">
                            <span className="text-slate-700 truncate max-w-[70%]">{option}</span>
                            <span className="text-slate-500 ml-1">{count} ({pct}%)</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-1">
                            <div className="bg-violet-500 h-1 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {insight.recentTexts.length > 0 && (
                  <div className="space-y-1.5">
                    <p className="text-xs font-medium text-slate-500">Respuestas recientes:</p>
                    {insight.recentTexts.map((text, i) => (
                      <p key={i} className="text-xs text-slate-600 bg-slate-50 rounded-lg px-3 py-2 italic">
                        "{text.length > 120 ? text.slice(0, 120) + '…' : text}"
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Secuencias de Comportamiento ───────────────── */}
      {data.behaviorSequences.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
            🔀 Secuencias de Comportamiento
          </h2>
          <p className="text-xs text-slate-500 mb-4">Patrones de uso en los últimos 30 días que predicen conversión.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.behaviorSequences.map((seq) => (
              <div key={seq.name} className="bg-white border border-slate-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-slate-800 mb-1">{seq.name}</p>
                <p className="text-xs text-slate-500 mb-3">{seq.description}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-black text-slate-900">{seq.userCount.toLocaleString()}</p>
                    <p className="text-xs text-slate-400">usuarios</p>
                  </div>
                  {seq.conversionRate > 0 && (
                    <ConversionBadge rate={seq.conversionRate} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
