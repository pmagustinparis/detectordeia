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
import RegisteredUsersList from './components/RegisteredUsersList';
import CollapsibleSection from './components/CollapsibleSection';
import DailyPulseView from './components/DailyPulseView';
import AcquisitionView from './components/AcquisitionView';
import RevenueMixView from './components/RevenueMixView';
import SegmentIntelligenceView from './components/SegmentIntelligenceView';

type TabId =
  | 'pulse'
  | 'north-star'
  | 'revenue'
  | 'conversion'
  | 'retention'
  | 'hot-leads'
  | 'acquisition'
  | 'users'
  | 'segments';

interface Tab {
  id: TabId;
  label: string;
  icon: string;
  description: string;
}

const TABS: Tab[] = [
  { id: 'pulse', label: 'Daily Pulse', icon: '⚡', description: 'Chequeo de 30 segundos' },
  { id: 'north-star', label: 'North Star', icon: '🎯', description: 'MRR, usuarios, conversión' },
  { id: 'revenue', label: 'Revenue', icon: '💰', description: 'Revenue mix y salud financiera' },
  { id: 'conversion', label: 'Conversión', icon: '🔄', description: 'Funnel y drop-offs' },
  { id: 'retention', label: 'Retención', icon: '📅', description: 'Cohortes y engagement' },
  { id: 'hot-leads', label: 'Hot Leads', icon: '🔥', description: 'Usuarios accionables' },
  { id: 'acquisition', label: 'Adquisición', icon: '📈', description: 'SEO, referrers, DAU/WAU' },
  { id: 'users', label: 'Usuarios', icon: '👥', description: 'Perfiles y lista completa' },
  { id: 'segments', label: 'Segmentos', icon: '🧠', description: 'Qué segmentos convierten, retienen y qué dicen' },
];

export default function AnalyticsDashboardV2() {
  const [data, setData] = useState<AnalyticsDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<TimeframeOption>('30d');
  const [authUser, setAuthUser] = useState('');
  const [authPass, setAuthPass] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('pulse');

  const fetchData = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);

    try {
      const credentials = btoa(`${authUser}:${authPass}`);
      // Add timestamp to prevent any caching
      const timestamp = Date.now();
      const response = await fetch(`/api/admin/analytics-v2?timeframe=${timeframe}&_t=${timestamp}`, {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
        cache: 'no-store',
        next: { revalidate: 0 },
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-violet-500 transition-colors bg-white text-gray-900"
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-violet-500 transition-colors bg-white text-gray-900"
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

  const activeTabData = TABS.find(t => t.id === activeTab)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b-4 border-violet-200 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
                <span className="text-3xl">📊</span>
                Analytics
                {loading && (
                  <span className="text-sm font-normal text-gray-500 animate-pulse ml-2">Actualizando...</span>
                )}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {new Date(data.generatedAt).toLocaleString('es-ES')} · {data.meta.totalEvents.toLocaleString()} eventos totales
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value as TimeframeOption)}
                className="px-3 py-2 border-2 border-violet-300 rounded-xl bg-white text-sm font-semibold text-gray-900 focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
              >
                <option value="7d">7 días</option>
                <option value="14d">14 días</option>
                <option value="30d">30 días</option>
                <option value="90d">90 días</option>
              </select>
              <button
                onClick={fetchData}
                disabled={loading}
                className="px-3 py-2 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-colors text-sm"
              >
                {loading ? '⚙️' : '🔄'}
              </button>
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide gap-1 pb-0 -mb-px">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-3 text-sm font-semibold whitespace-nowrap border-b-3 transition-colors shrink-0 ${
                  activeTab === tab.id
                    ? 'border-b-4 border-violet-600 text-violet-700 bg-violet-50/60'
                    : 'border-b-4 border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
                style={{ borderBottom: activeTab === tab.id ? '4px solid #7c3aed' : '4px solid transparent' }}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                {/* Badge for hot leads count */}
                {tab.id === 'hot-leads' && data.hotLeads.filter(l => l.priority === 'high').length > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {data.hotLeads.filter(l => l.priority === 'high').length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Tab content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab description */}
        <div className="mb-6">
          <p className="text-xs text-gray-500">{activeTabData.description}</p>
        </div>

        {/* DAILY PULSE */}
        {activeTab === 'pulse' && data.dailyPulse && (
          <DailyPulseView data={data.dailyPulse} />
        )}

        {/* NORTH STAR */}
        {activeTab === 'north-star' && (
          <div className="space-y-8">
            <NorthStarMetrics data={data.northStar} />
          </div>
        )}

        {/* REVENUE */}
        {activeTab === 'revenue' && (
          <div className="space-y-8">
            <RevenueMixView data={data.revenueMix} />
            <CollapsibleSection title="Revenue Health Detallado" icon="💵" defaultOpen={true}>
              <RevenueHealth data={data.revenueHealth} />
            </CollapsibleSection>
          </div>
        )}

        {/* CONVERSION */}
        {activeTab === 'conversion' && (
          <div className="space-y-8">
            <ConversionFunnelView data={data.conversionFunnel} />
          </div>
        )}

        {/* RETENTION */}
        {activeTab === 'retention' && (
          <div className="space-y-8">
            <ProductEngagementView data={data.productEngagement} />
            <CollapsibleSection title="Cohort Retention" icon="📅" defaultOpen={true}>
              <CohortRetentionTable data={data.cohortAnalysis} />
            </CollapsibleSection>
          </div>
        )}

        {/* HOT LEADS */}
        {activeTab === 'hot-leads' && (
          <HotLeadsPanel leads={data.hotLeads} />
        )}

        {/* ACQUISITION */}
        {activeTab === 'acquisition' && data.acquisitionMetrics && (
          <AcquisitionView data={data.acquisitionMetrics} />
        )}

        {/* SEGMENTS */}
        {activeTab === 'segments' && data.segmentIntelligence && (
          <SegmentIntelligenceView data={data.segmentIntelligence} />
        )}

        {/* USERS */}
        {activeTab === 'users' && (
          <div className="space-y-8">
            <CollapsibleSection title="User Insights" icon="🔍" defaultOpen={true}>
              <UserInsightsView data={data.userInsights} />
            </CollapsibleSection>
            <CollapsibleSection title="Usuarios Registrados" icon="👥" defaultOpen={true}>
              <RegisteredUsersList users={data.registeredUsers} />
            </CollapsibleSection>
          </div>
        )}

        {/* Footer info */}
        <footer className="mt-12 bg-white border-2 border-gray-200 rounded-2xl p-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
            <span>
              <strong>Período:</strong>{' '}
              {new Date(data.meta.dateRange.start).toLocaleDateString('es-ES')} —{' '}
              {new Date(data.meta.dateRange.end).toLocaleDateString('es-ES')}
            </span>
            <span>•</span>
            <span>
              <strong>Eventos:</strong> {data.meta.totalEvents.toLocaleString()}
            </span>
            <span>•</span>
            <span>Analytics Dashboard V2</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
