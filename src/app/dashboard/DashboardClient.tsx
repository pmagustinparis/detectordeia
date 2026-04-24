'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import type { UsageStats } from '@/lib/queries/usageStats';
import { useUserProfile } from '@/lib/hooks/useUserProfile';
import UserProfileModal from '@/app/components/UserProfileModal';
import ChurnSurvey from '@/app/components/surveys/ChurnSurvey';
import ExpressTimer from '@/components/ExpressTimer';

interface DashboardClientProps {
  user: User;
  usageStats: UsageStats | null;
  history: any[];
  planType: 'free' | 'premium';
  hasStripeCustomer: boolean;
  expressExpiresAt: string | null;
}

export default function DashboardClient({ user, usageStats, history, planType, hasStripeCustomer, expressExpiresAt }: DashboardClientProps) {
  const searchParams = useSearchParams();
  const [selectedHistory, setSelectedHistory] = useState<any>(null);
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('upgrade_banner_dismissed') === 'true';
    }
    return false;
  });

  const { hasProfile, loading: profileLoading, refreshProfile } = useUserProfile();
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [showChurnSurvey, setShowChurnSurvey] = useState(false);
  useEffect(() => {
    if (searchParams.get('churn_survey') === '1') {
      setTimeout(() => setShowChurnSurvey(true), 800);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!profileLoading && hasProfile === false) {
      setTimeout(() => setShowProfileModal(true), 500);
    }
  }, [profileLoading, hasProfile]);

  const toolNames: Record<string, string> = {
    detector: 'Detector',
    humanizador: 'Humanizador',
    parafraseador: 'Parafraseador',
  };

  const getToolColorClass = (tool: string) => {
    if (tool === 'detector') return 'bg-blue-500';
    if (tool === 'humanizador') return 'bg-emerald-500';
    if (tool === 'parafraseador') return 'bg-orange-500';
    return 'bg-gray-500';
  };

  const getToolBadgeClasses = (tool: string) => {
    if (tool === 'detector') return 'bg-blue-100 text-blue-700';
    if (tool === 'humanizador') return 'bg-emerald-100 text-emerald-700';
    if (tool === 'parafraseador') return 'bg-orange-100 text-orange-700';
    return 'bg-gray-100 text-gray-700';
  };

  const getProgressColor = (used: number, limit: number) => {
    const percentage = (used / limit) * 100;
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copiado al portapapeles!');
  };

  const downloadText = (text: string, filename: string) => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

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

  const dismissBanner = () => {
    setIsBannerDismissed(true);
    localStorage.setItem('upgrade_banner_dismissed', 'true');
  };

  const isExpressActive = expressExpiresAt && new Date(expressExpiresAt) > new Date();

  return (
    <div className="min-h-screen bg-white pb-12">
      {/* Express Active Banner */}
      {isExpressActive && expressExpiresAt && (
        <div className="sticky top-0 z-40 bg-amber-500 text-white">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm sm:text-base">
                    Express Pass Activo - Acceso Ilimitado
                  </p>
                  <div className="text-xs sm:text-sm text-white/90 flex items-center gap-2">
                    <span>Tu pase expira en:</span>
                    <ExpressTimer expiresAt={expressExpiresAt} compact={true} />
                  </div>
                </div>
              </div>
              <a
                href="/pricing"
                className="bg-white text-amber-600 hover:bg-amber-50 font-bold py-2 px-4 sm:px-6 rounded-lg transition-all text-sm sm:text-base whitespace-nowrap"
              >
                Renovar Express
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Banner - Solo para usuarios Free sin Express */}
      {planType === 'free' && !isExpressActive && !isBannerDismissed && (
        <div className="sticky top-0 z-40 bg-blue-900 text-white">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex-1">
                  <p className="font-bold text-sm sm:text-base">
                    Desbloquea todo el potencial de DetectorDeIA
                  </p>
                  <p className="text-xs sm:text-sm text-blue-200 hidden sm:block">
                    Express $3.99/24h · Pro $12.99/mes · Usos ilimitados · 5 modos premium
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/pricing"
                  className="bg-white text-blue-900 hover:bg-blue-50 font-bold py-2 px-4 sm:px-6 rounded-lg transition-all text-sm sm:text-base whitespace-nowrap"
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
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-200">
          <div className="flex items-center gap-4">
            {user.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt={user.user_metadata?.full_name || 'Usuario'}
                className="w-20 h-20 rounded-full border-4 border-blue-200"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-blue-900 flex items-center justify-center text-white text-3xl font-bold border-4 border-blue-200">
                {user.email?.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                Hola, {user.user_metadata?.full_name || user.email?.split('@')[0]}
              </h1>
              <p className="text-gray-600 mt-1">{user.email}</p>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                planType === 'premium'
                  ? 'bg-blue-100 text-blue-900'
                  : 'bg-green-100 text-green-700'
              }`}>
                {planType === 'premium' ? 'Plan Premium' : 'Plan Free'}
              </span>
            </div>
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="bg-gray-50 rounded-xl shadow-sm p-4 mb-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-900 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">
                ¿Necesitás ayuda? Contactanos:
              </p>
              <a
                href="mailto:buildbyagus@gmail.com"
                className="inline-flex items-center gap-1.5 text-blue-900 hover:text-blue-700 font-semibold text-sm transition-colors"
              >
                buildbyagus@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Subscription Management - Solo para usuarios Pro */}
        {planType === 'premium' && hasStripeCustomer && (
          <div className="bg-blue-50 rounded-xl shadow-sm p-8 mb-8 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Gestión de Suscripción
            </h2>
            <p className="text-gray-600 mb-6">
              Administra tu suscripción, actualiza tu método de pago o consulta tu historial de facturas.
            </p>
            <button
              onClick={openCustomerPortal}
              disabled={isLoadingPortal}
              className="bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingPortal ? 'Cargando...' : 'Abrir Portal de Gestión'}
            </button>
          </div>
        )}

        {/* Usage Stats */}
        {usageStats && (
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Estadísticas de Uso
            </h2>

            {/* Overall stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="text-3xl font-bold text-blue-900">{usageStats.usesToday}</div>
                <div className="text-sm text-blue-700 font-medium mt-1">Usos hoy</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="text-3xl font-bold text-gray-900">
                  {usageStats.remaining === Infinity ? 'Ilimitado' : usageStats.remaining}
                </div>
                <div className="text-sm text-gray-600 font-medium mt-1">Usos restantes hoy</div>
              </div>
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="text-3xl font-bold text-green-700">{usageStats.usesThisMonth}</div>
                <div className="text-sm text-green-600 font-medium mt-1">Usos este mes</div>
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
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Historial
            <span className="text-sm font-normal text-gray-500">(Últimos 10 usos · 7 días)</span>
          </h2>

          {history.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg font-medium mb-2">No hay historial todavía</p>
              <p className="text-gray-500 text-sm mb-6">
                Usa las herramientas y tu historial aparecerá aquí
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition-all"
                >
                  Detector
                </a>
                <a
                  href="/humanizador"
                  className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition-all"
                >
                  Humanizador
                </a>
                <a
                  href="/parafraseador"
                  className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition-all"
                >
                  Parafraseador
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-xl p-4 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer"
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
                      className="text-blue-900 hover:text-blue-700 font-medium text-sm"
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
            className="fixed inset-0 bg-black/60 z-50"
            onClick={() => setSelectedHistory(null)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div
              className="bg-white rounded-xl shadow-lg max-w-3xl w-full max-h-[80vh] overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-blue-900 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{toolNames[selectedHistory.tool_type]}</h3>
                    <p className="text-blue-200 text-sm mt-1">
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
                        className="text-xs text-blue-900 hover:text-blue-700 font-medium"
                      >
                        Copiar
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
                          className="text-xs text-blue-900 hover:text-blue-700 font-medium"
                        >
                          Copiar
                        </button>
                        <button
                          onClick={() => downloadText(selectedHistory.output_text, `${selectedHistory.tool_type}-${Date.now()}.txt`)}
                          className="text-xs text-blue-900 hover:text-blue-700 font-medium"
                        >
                          Descargar
                        </button>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm text-gray-800 whitespace-pre-wrap">{selectedHistory.output_text}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <button
                  onClick={() => setSelectedHistory(null)}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-all"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* User Profile Onboarding Modal */}
      <UserProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onComplete={() => {
          refreshProfile();
          setShowProfileModal(false);
        }}
      />

      {/* Churn Survey */}
      {showChurnSurvey && (
        <ChurnSurvey
          onClose={() => setShowChurnSurvey(false)}
          onRetain={() => setShowChurnSurvey(false)}
        />
      )}
    </div>
  );
}
