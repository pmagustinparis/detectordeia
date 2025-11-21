/**
 * Analytics Dashboard V2
 *
 * Nuevo dashboard de analytics completamente rediseñado
 * Usa el endpoint /api/admin/analytics-v2 y los componentes modulares
 */

'use client';

import { useState, useEffect } from 'react';
import { AnalyticsDashboardData, TimeframeOption } from '@/lib/analytics/types';
import NorthStarMetrics from './components/NorthStarMetrics';
import RevenueHealth from './components/RevenueHealth';
import ConversionFunnelView from './components/ConversionFunnelView';
import HotLeadsPanel from './components/HotLeadsPanel';
import ProductEngagementView from './components/ProductEngagementView';
import CohortRetentionTable from './components/CohortRetentionTable';
import UserInsightsView from './components/UserInsightsView';

export default function AnalyticsDashboardV2() {
  const [data, setData] = useState<AnalyticsDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<TimeframeOption>('30d');
  const [authUser, setAuthUser] = useState('');
  const [authPass, setAuthPass] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchData = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);

    try {
      const credentials = btoa(`${authUser}:${authPass}`);
      const response = await fetch(`/api/admin/analytics-v2?timeframe=${timeframe}`, {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      if (response.status === 401) {
        setError('Credenciales incorrectas');
        setIsAuthenticated(false);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error fetching data');
      }

      const jsonData: AnalyticsDashboardData = await response.json();
      setData(jsonData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, timeframe]);

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border-2 border-violet-200">
          <div className="text-center mb-6">
            <span className="text-6xl mb-4 block">🔐</span>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              Analytics Dashboard V2
            </h1>
            <p className="text-sm text-gray-600">
              Elite Indie Hacker Analytics
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Usuario
              </label>
              <input
                type="text"
                value={authUser}
                onChange={(e) => setAuthUser(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-violet-500 transition-colors"
                placeholder="Usuario"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={authPass}
                onChange={(e) => setAuthPass(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-violet-500 transition-colors"
                placeholder="Contraseña"
                required
              />
            </div>
            {error && (
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-3">
                <p className="text-sm text-red-700 font-semibold">
                  ⚠️ {error}
                </p>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-7xl mb-4">⚙️</div>
          <p className="text-xl font-bold text-gray-900">
            Cargando analytics...
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Procesando {timeframe} de datos
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border-2 border-red-300">
          <div className="text-center">
            <span className="text-6xl mb-4 block">❌</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
            <p className="text-sm text-gray-700 mb-4">{error}</p>
            <button
              onClick={() => {
                setError(null);
                fetchData();
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b-4 border-violet-200 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                <span className="text-4xl">📊</span>
                Elite Analytics Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Última actualización: {new Date(data.generatedAt).toLocaleString('es-ES')}
              </p>
            </div>

            {/* Timeframe selector */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-gray-700">
                Periodo:
              </label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value as TimeframeOption)}
                className="px-4 py-2 border-2 border-violet-300 rounded-xl bg-white font-semibold text-gray-900 focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
              >
                <option value="7d">7 días</option>
                <option value="14d">14 días</option>
                <option value="30d">30 días</option>
                <option value="90d">90 días</option>
              </select>
              <button
                onClick={fetchData}
                disabled={loading}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-colors"
              >
                {loading ? '⚙️ Cargando...' : '🔄 Actualizar'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Section 1: North Star Metrics - LO MÁS IMPORTANTE */}
        <section>
          <NorthStarMetrics data={data.northStar} />
        </section>

        {/* Section 2: Revenue Health */}
        <section>
          <RevenueHealth data={data.revenueHealth} />
        </section>

        {/* Section 3: Hot Leads - ACCIONABLE HOY */}
        <section>
          <HotLeadsPanel leads={data.hotLeads} />
        </section>

        {/* Section 4: Conversion Funnel */}
        <section>
          <ConversionFunnelView data={data.conversionFunnel} />
        </section>

        {/* Section 5: Product Engagement */}
        <section>
          <ProductEngagementView data={data.productEngagement} />
        </section>

        {/* Section 6: Cohort Retention */}
        <section>
          <CohortRetentionTable data={data.cohortAnalysis} />
        </section>

        {/* Section 7: User Insights */}
        <section>
          <UserInsightsView data={data.userInsights} />
        </section>

        {/* Footer info */}
        <footer className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <strong>Rango de datos:</strong>{' '}
              {new Date(data.meta.dateRange.start).toLocaleDateString('es-ES')} -{' '}
              {new Date(data.meta.dateRange.end).toLocaleDateString('es-ES')}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Total de eventos:</strong> {data.meta.totalEvents.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-4">
              Analytics Dashboard V2 - Powered by DetectordeIA.ai Elite System
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
