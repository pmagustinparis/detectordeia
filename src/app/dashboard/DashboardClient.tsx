'use client';

import { useState } from 'react';
import type { User } from '@supabase/supabase-js';
import type { UsageStats } from '@/lib/queries/usageStats';

interface DashboardClientProps {
  user: User;
  usageStats: UsageStats | null;
  history: any[];
  planType: 'free' | 'premium';
  hasStripeCustomer: boolean;
}

export default function DashboardClient({ user, usageStats, history, planType, hasStripeCustomer }: DashboardClientProps) {
  const [selectedHistory, setSelectedHistory] = useState<any>(null);
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState(() => {
    // Check if banner was dismissed in localStorage
    if (typeof window !== 'undefined') {
      return localStorage.getItem('upgrade_banner_dismissed') === 'true';
    }
    return false;
  });

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

  // Open Stripe Customer Portal
  const openCustomerPortal = async () => {
    setIsLoadingPortal(true);
    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear sesión del portal');
      }

      if (!data.url) {
        throw new Error('No se recibió URL del portal');
      }

      window.location.href = data.url;
    } catch (error: any) {
      console.error('Error al abrir portal:', error);
      alert(`Error al abrir el portal de gestión: ${error.message}\n\nSi el problema persiste, contacta a soporte.`);
      setIsLoadingPortal(false);
    }
  };

  // Dismiss upgrade banner
  const dismissBanner = () => {
    setIsBannerDismissed(true);
    localStorage.setItem('upgrade_banner_dismissed', 'true');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-12">
      {/* Upgrade Banner - Solo para usuarios Free */}
      {planType === 'free' && !isBannerDismissed && (
        <div className="sticky top-0 z-40 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
                  <span className="text-2xl">🚀</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm sm:text-base">
                    ¡Desbloquea todo el potencial de DetectorDeIA!
                  </p>
                  <p className="text-xs sm:text-sm text-violet-100 hidden sm:block">
                    Usos ilimitados • 5 modos premium • 15,000 caracteres • Desde $10/mes
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/pricing"
                  className="bg-white text-violet-600 hover:bg-violet-50 font-bold py-2 px-4 sm:px-6 rounded-lg shadow-md hover:shadow-lg transition-all text-sm sm:text-base whitespace-nowrap"
                >
                  Ver Planes
                </a>
                <button
                  onClick={dismissBanner}
                  className="text-white/80 hover:text-white p-2 transition-colors"
                  aria-label="Cerrar banner"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                planType === 'premium'
                  ? 'bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {planType === 'premium' ? '✨ Plan Pro' : '✓ Plan Free'}
              </span>
            </div>
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl shadow-lg p-6 mb-8 border-2 border-cyan-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">¿Necesitás ayuda?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Nuestro equipo de soporte está disponible para resolver tus dudas y ayudarte con cualquier consulta.
              </p>
              <a
                href="mailto:soporte@detectordeia.ai"
                className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                soporte@detectordeia.ai
              </a>
            </div>
          </div>
        </div>

        {/* Subscription Management - Solo para usuarios Pro */}
        {planType === 'premium' && hasStripeCustomer && (
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl shadow-lg p-8 mb-8 border-2 border-violet-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>💳</span>
              Gestión de Suscripción
            </h2>
            <p className="text-gray-600 mb-6">
              Administra tu suscripción, actualiza tu método de pago o consulta tu historial de facturas.
            </p>
            <button
              onClick={openCustomerPortal}
              disabled={isLoadingPortal}
              className="bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingPortal ? 'Cargando...' : 'Abrir Portal de Gestión'}
            </button>
          </div>
        )}

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
                <div className="text-3xl font-bold text-cyan-700">
                  {usageStats.remaining === Infinity ? 'Ilimitado' : usageStats.remaining}
                </div>
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
                  {usageStats.usesToday} / {usageStats.limit === Infinity ? 'Ilimitado' : usageStats.limit}
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
