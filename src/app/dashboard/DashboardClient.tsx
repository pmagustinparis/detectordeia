'use client';

import { useState } from 'react';
import type { User } from '@supabase/supabase-js';
import type { UsageStats } from '@/lib/queries/usageStats';

interface DashboardClientProps {
  user: User;
  usageStats: UsageStats | null;
  history: any[];
}

export default function DashboardClient({ user, usageStats, history }: DashboardClientProps) {
  const [selectedHistory, setSelectedHistory] = useState<any>(null);

  // Tool name mapping
  const toolNames: Record<string, string> = {
    detector: 'Detector',
    humanizador: 'Humanizador',
    parafraseador: 'Parafraseador',
  };

  // Tool colors (más diferenciados para mejor UX)
  const toolColors: Record<string, string> = {
    detector: 'blue',        // Azul - análisis/tecnología
    humanizador: 'emerald',  // Verde - natural/humano
    parafraseador: 'orange', // Naranja - creatividad/transformación
  };

  // Get tool color class (full class name for Tailwind)
  const getToolColorClass = (tool: string) => {
    if (tool === 'detector') return 'bg-blue-500';
    if (tool === 'humanizador') return 'bg-emerald-500';
    if (tool === 'parafraseador') return 'bg-orange-500';
    return 'bg-gray-500';
  };

  // Get tool badge classes (full class names for Tailwind)
  const getToolBadgeClasses = (tool: string) => {
    if (tool === 'detector') return 'bg-blue-100 text-blue-700';
    if (tool === 'humanizador') return 'bg-emerald-100 text-emerald-700';
    if (tool === 'parafraseador') return 'bg-orange-100 text-orange-700';
    return 'bg-gray-100 text-gray-700';
  };

  // Progress bar color based on usage
  const getProgressColor = (used: number, limit: number) => {
    const percentage = (used / limit) * 100;
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Hace un momento';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // TODO: Show toast notification
    alert('Copiado al portapapeles!');
  };

  // Download as text file
  const downloadText = (text: string, filename: string) => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-12">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4">
            {user.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt={user.user_metadata?.full_name || 'Usuario'}
                className="w-20 h-20 rounded-full border-4 border-violet-200"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-violet-200">
                {user.email?.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                ¡Hola, {user.user_metadata?.full_name || user.email?.split('@')[0]}!
              </h1>
              <p className="text-gray-600 mt-1">{user.email}</p>
              <span className="inline-block mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                ✓ Plan Free
              </span>
            </div>
          </div>
        </div>

        {/* Usage Stats */}
        {usageStats && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span>📊</span>
              Estadísticas de Uso
            </h2>

            {/* Overall stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6 border-2 border-violet-200">
                <div className="text-3xl font-bold text-violet-700">{usageStats.usesToday}</div>
                <div className="text-sm text-violet-600 font-medium mt-1">Usos hoy</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200">
                <div className="text-3xl font-bold text-cyan-700">{usageStats.remaining}</div>
                <div className="text-sm text-cyan-600 font-medium mt-1">Usos restantes hoy</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border-2 border-emerald-200">
                <div className="text-3xl font-bold text-emerald-700">{usageStats.usesThisMonth}</div>
                <div className="text-sm text-emerald-600 font-medium mt-1">Usos este mes</div>
              </div>
            </div>

            {/* Progress bar overall */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Límite diario total</span>
                <span className="text-sm font-bold text-gray-900">
                  {usageStats.usesToday} / {usageStats.limit}
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressColor(usageStats.usesToday, usageStats.limit)} transition-all duration-300`}
                  style={{ width: `${Math.min((usageStats.usesToday / usageStats.limit) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* By tool */}
            <h3 className="text-lg font-bold text-gray-900 mb-4">Por Herramienta</h3>
            <div className="space-y-4">
              {Object.entries(usageStats.usesTodayByTool).map(([tool, count]) => (
                <div key={tool}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{toolNames[tool]}</span>
                    <span className="text-sm font-bold text-gray-900">{count} usos hoy</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getToolColorClass(tool)} transition-all duration-300`}
                      style={{ width: `${Math.min((count / usageStats.limit) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* History */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span>📜</span>
            Historial
            <span className="text-sm font-normal text-gray-500">(Últimos 10 usos · 7 días)</span>
          </h2>

          {history.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-600 text-lg font-medium mb-2">No hay historial todavía</p>
              <p className="text-gray-500 text-sm mb-6">
                Usa las herramientas y tu historial aparecerá aquí
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-lg transition-all"
                >
                  <span>🔍</span>
                  Detector
                </a>
                <a
                  href="/humanizador"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-all"
                >
                  <span>✨</span>
                  Humanizador
                </a>
                <a
                  href="/parafraseador"
                  className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all"
                >
                  <span>🔄</span>
                  Parafraseador
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-xl p-4 hover:border-violet-300 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => setSelectedHistory(item)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getToolBadgeClasses(item.tool_type)}`}>
                          {toolNames[item.tool_type]}
                        </span>
                        <span className="text-xs text-gray-500">{formatDate(item.created_at)}</span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs text-gray-500">{item.input_length} caracteres</span>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {item.input_text.substring(0, 150)}
                        {item.input_text.length > 150 && '...'}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedHistory(item);
                      }}
                      className="text-violet-600 hover:text-violet-700 font-medium text-sm"
                    >
                      Ver →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* History Detail Modal */}
      {selectedHistory && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
            onClick={() => setSelectedHistory(null)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div
              className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden pointer-events-auto animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{toolNames[selectedHistory.tool_type]}</h3>
                    <p className="text-violet-100 text-sm mt-1">
                      {formatDate(selectedHistory.created_at)} · {selectedHistory.input_length} caracteres
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedHistory(null)}
                    className="text-white hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition-all"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)]">
                <div className="space-y-6">
                  {/* Input */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Texto Original</h4>
                      <button
                        onClick={() => copyToClipboard(selectedHistory.input_text)}
                        className="text-xs text-violet-600 hover:text-violet-700 font-medium"
                      >
                        📋 Copiar
                      </button>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-800 whitespace-pre-wrap">{selectedHistory.input_text}</p>
                    </div>
                  </div>

                  {/* Output */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Resultado</h4>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyToClipboard(selectedHistory.output_text)}
                          className="text-xs text-violet-600 hover:text-violet-700 font-medium"
                        >
                          📋 Copiar
                        </button>
                        <button
                          onClick={() => downloadText(selectedHistory.output_text, `${selectedHistory.tool_type}-${Date.now()}.txt`)}
                          className="text-xs text-violet-600 hover:text-violet-700 font-medium"
                        >
                          ⬇️ Descargar
                        </button>
                      </div>
                    </div>
                    <div className="bg-violet-50 rounded-lg p-4 border border-violet-200">
                      <p className="text-sm text-gray-800 whitespace-pre-wrap">{selectedHistory.output_text}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <button
                  onClick={() => setSelectedHistory(null)}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-all"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
