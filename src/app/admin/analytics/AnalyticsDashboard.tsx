'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsData {
  timeframe: string;
  // NUEVAS MÉTRICAS - INDIE HACKER VIEW
  healthMetrics: {
    estimatedMRR: string;
    premiumUsers: number;
    churnRisk: number;
    conversionRate: string;
  };
  journeyInsights: {
    signupPaths: {
      fromAnonymous: number;
      direct: number;
      totalSignups: number;
    };
    avgEngagementBeforeSignup: string;
    pathWinner: 'anonymous' | 'direct';
  };
  criticalDropoffs: {
    hitLimitNoPricing: number;
    sawPricingNoCheckout: number;
    checkoutNoConversion: number;
    activeNeverSawPricing: number;
  };
  hotLeads: Array<{
    userId: string;
    email: string;
    plan: string;
    reason: string;
    priority: 'high' | 'medium';
  }>;
  // DATOS LEGACY
  summary: {
    totalUsers: number;
    activeUsers: number;
    totalEvents: number;
    dailyChart: Array<{ date: string; count: number }>;
  };
  topUsers: Array<{
    userId: string;
    email: string;
    plan: string;
    eventCount: number;
    lastEvent: string;
  }>;
  friction: {
    counts: {
      hitDailyLimit: number;
      hitCharacterLimit: number;
      fileUploadBlocked: number;
      premiumModeBlocked: number;
    };
    usersAffected: number;
    limitBreakdown: {
      hitCharacterLimit: number;
      hitDailyLimit: number;
    };
    heatmapData: Array<{
      day: number;
      hour: number;
      count: number;
    }>;
    toolAnalysis: Record<string, {
      total: number;
      friction: number;
      completedUses: number;
    }>;
    topPremiumModes: Array<{
      mode: string;
      count: number;
    }>;
  };
  opportunities: Array<{
    userId: string;
    email: string;
    plan: string;
    reason: string;
    priority: string;
  }>;
  profiles: {
    totalProfiles: number;
    completionRate: string;
    topRoles: Array<{ role: string; count: number }>;
    topPrimaryUses: Array<{ use: string; count: number }>;
    topDiscoverySources: Array<{ source: string; count: number }>;
  };
  conversionFunnel: {
    registered: {
      steps: {
        activeUsers: number;
        pricingVisits: number;
        checkoutStarts: number;
        conversions: number;
      };
      rates: {
        visitToCheckout: string;
        checkoutToConversion: string;
        overall: string;
      };
    };
    anonymous: {
      steps: {
        visitors: number;
        pricingVisits: number;
        checkoutStarts: number;
        signups: number;
      };
      rates: {
        visitorToPricing: string;
        visitToCheckout: string;
        checkoutToSignup: string;
        overall: string;
      };
    };
    steps: {
      activeUsers: number;
      pricingVisits: number;
      checkoutStarts: number;
      conversions: number;
    };
    rates: {
      visitToCheckout: string;
      checkoutToConversion: string;
      overall: string;
    };
  };
  eventBreakdown: {
    success: {
      completed_analysis: number;
      completed_humanization: number;
      completed_paraphrase: number;
    };
    friction: {
      hit_character_limit: number;
      hit_daily_limit: number;
      file_upload_blocked: number;
      premium_mode_blocked: number;
    };
    conversion: {
      pricing_page_visited: number;
      checkout_started: number;
    };
  };
}

export default function AnalyticsDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [timeframe, setTimeframe] = useState('7d');

  // Verificar si ya está autenticado (sessionStorage)
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'authenticated') {
      setIsAuthenticated(true);
      fetchData('7d');
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'Agus' && password === '1908') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'authenticated');
      setLoginError('');
      fetchData(timeframe);
    } else {
      setLoginError('Usuario o contraseña incorrectos');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
    setData(null);
  };

  const fetchData = async (tf: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/analytics-data?timeframe=${tf}`, {
        headers: {
          'Authorization': 'Basic ' + btoa('Agus:1908'),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setData(data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeframeChange = (tf: string) => {
    setTimeframe(tf);
    fetchData(tf);
  };

  // ============================================
  // LOGIN SCREEN
  // ============================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-violet-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              🔒 Analytics Dashboard
            </h1>
            <p className="text-gray-600">Acceso restringido</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="Ingresa usuario"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="Ingresa contraseña"
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ============================================
  // DASHBOARD
  // ============================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              📊 Analytics Dashboard
            </h1>
            <p className="text-gray-600">DetectordeIA.ai</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Timeframe Selector + Refresh Button */}
        <div className="mb-6 flex gap-2 items-center">
          {['7d', '14d', '30d'].map((tf) => (
            <button
              key={tf}
              onClick={() => handleTimeframeChange(tf)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeframe === tf
                  ? 'bg-violet-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Últimos {tf.replace('d', ' días')}
            </button>
          ))}

          <div className="flex-1"></div>

          <button
            onClick={() => fetchData(timeframe)}
            disabled={loading}
            className="px-4 py-2 rounded-lg font-medium transition-all bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            title="Actualizar datos"
          >
            <span className={loading ? 'animate-spin' : ''}>🔄</span>
            <span className="hidden sm:inline">{loading ? 'Actualizando...' : 'Actualizar'}</span>
          </button>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
            <p className="mt-4 text-gray-600">Cargando datos...</p>
          </div>
        )}

        {!loading && data && (
          <div className="space-y-8">
            {/* ============================================ */}
            {/* 💰 HEALTH CHECK - Lo más importante primero */}
            {/* ============================================ */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                  💰
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Health Check</h2>
                  <p className="text-sm text-gray-600">El estado de tu negocio en 4 números</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-5 text-white">
                  <div className="text-xs font-medium mb-1 opacity-90">💵 MRR Estimado</div>
                  <div className="text-3xl font-bold">${data.healthMetrics.estimatedMRR}</div>
                  <div className="text-xs mt-1 opacity-75">{data.healthMetrics.premiumUsers} usuarios premium</div>
                </div>

                <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg p-5 text-white">
                  <div className="text-xs font-medium mb-1 opacity-90">📈 Tasa Conversión</div>
                  <div className="text-3xl font-bold">{data.healthMetrics.conversionRate}%</div>
                  <div className="text-xs mt-1 opacity-75">{data.conversionFunnel.registered.steps.conversions} conversiones en {data.timeframe}</div>
                </div>

                <div className={`bg-gradient-to-br ${data.healthMetrics.churnRisk > 0 ? 'from-red-500 to-orange-600' : 'from-blue-500 to-cyan-600'} rounded-xl shadow-lg p-5 text-white`}>
                  <div className="text-xs font-medium mb-1 opacity-90">⚠️ Riesgo de Churn</div>
                  <div className="text-3xl font-bold">{data.healthMetrics.churnRisk}</div>
                  <div className="text-xs mt-1 opacity-75">
                    {data.healthMetrics.churnRisk > 0 ? 'Premium sin actividad (7d)' : 'Todos activos 🎉'}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl shadow-lg p-5 text-white">
                  <div className="text-xs font-medium mb-1 opacity-90">🔥 Hot Leads</div>
                  <div className="text-3xl font-bold">{data.hotLeads.length}</div>
                  <div className="text-xs mt-1 opacity-75">Contactar HOY (últimas 24h)</div>
                </div>
              </div>
            </div>

            {/* ============================================ */}
            {/* 🎯 JOURNEY INSIGHTS */}
            {/* ============================================ */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                  🎯
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Customer Journey</h2>
                  <p className="text-sm text-gray-600">Cómo los usuarios descubren y adoptan el producto</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Signup Paths */}
                <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 p-5">
                  <div className="text-sm font-semibold text-blue-700 mb-3">📊 Rutas de Registro</div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Desde anónimo:</span>
                      <span className="text-lg font-bold text-blue-600">{data.journeyInsights.signupPaths.fromAnonymous}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Registro directo:</span>
                      <span className="text-lg font-bold text-violet-600">{data.journeyInsights.signupPaths.direct}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-700">Total registros:</span>
                      <span className="text-xl font-bold text-gray-800">{data.journeyInsights.signupPaths.totalSignups}</span>
                    </div>
                  </div>
                </div>

                {/* Engagement before signup */}
                <div className="bg-white rounded-xl shadow-lg border-2 border-violet-200 p-5">
                  <div className="text-sm font-semibold text-violet-700 mb-3">💪 Engagement Pre-Registro</div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-violet-600 mb-2">{data.journeyInsights.avgEngagementBeforeSignup}</div>
                    <div className="text-xs text-gray-600">eventos promedio antes de registrarse</div>
                    <div className="mt-3 text-xs text-gray-500">
                      (usuarios que probaron anónimo primero)
                    </div>
                  </div>
                </div>

                {/* Path Winner */}
                <div className={`rounded-xl shadow-lg border-2 p-5 ${
                  data.journeyInsights.pathWinner === 'anonymous'
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
                    : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300'
                }`}>
                  <div className="text-sm font-semibold text-gray-700 mb-3">🏆 Mejor Ruta</div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">
                      {data.journeyInsights.pathWinner === 'anonymous' ? '🌐' : '✍️'}
                    </div>
                    <div className="text-lg font-bold text-gray-800 mb-1">
                      {data.journeyInsights.pathWinner === 'anonymous' ? 'Anónimo → Registro' : 'Registro Directo'}
                    </div>
                    <div className="text-xs text-gray-600">
                      {data.journeyInsights.pathWinner === 'anonymous'
                        ? 'La mayoría prueba antes de registrarse'
                        : 'La mayoría se registra directamente'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================ */}
            {/* 🚨 CRITICAL DROP-OFFS */}
            {/* ============================================ */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                  🚨
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Critical Drop-Offs</h2>
                  <p className="text-sm text-gray-600">Dónde exactamente estás perdiendo dinero</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-lg border-l-4 border-red-500 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">⛔ Tocaron límite → NO vieron pricing</span>
                    <span className="text-3xl font-bold text-red-600">{data.criticalDropoffs.hitLimitNoPricing}</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Usuarios frustrados que NO llegaron a ver los planes
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border-l-4 border-orange-500 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">👀 Vieron pricing → NO hicieron checkout</span>
                    <span className="text-3xl font-bold text-orange-600">{data.criticalDropoffs.sawPricingNoCheckout}</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Vieron precios pero no avanzaron (revisar propuesta de valor)
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border-l-4 border-amber-500 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">🛒 Checkout → NO convirtieron</span>
                    <span className="text-3xl font-bold text-amber-600">{data.criticalDropoffs.checkoutNoConversion}</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Abandonaron en el último paso (revisar proceso de pago)
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border-l-4 border-yellow-500 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">😴 Activos que NUNCA vieron pricing</span>
                    <span className="text-3xl font-bold text-yellow-600">{data.criticalDropoffs.activeNeverSawPricing}</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Usuarios comprometidos que no conocen tu oferta premium
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================ */}
            {/* 🔥 HOT LEADS - Accionables HOY */}
            {/* ============================================ */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                  🔥
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Hot Leads (últimas 24h)</h2>
                  <p className="text-sm text-gray-600">Usuarios para contactar HOY - ventana de oportunidad</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl shadow-lg border-2 border-yellow-300 p-6">
                {data.hotLeads.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-lg font-bold text-gray-800">
                        {data.hotLeads.length} lead{data.hotLeads.length !== 1 ? 's' : ''} caliente{data.hotLeads.length !== 1 ? 's' : ''}
                      </div>
                      <button
                        onClick={() => {
                          const emails = data.hotLeads.map(lead => lead.email).join(', ');
                          navigator.clipboard.writeText(emails);
                          alert('¡Emails copiados al portapapeles!');
                        }}
                        className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-colors text-sm shadow"
                      >
                        📋 Copiar Emails
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {data.hotLeads.map((lead, index) => (
                        <div
                          key={lead.userId + index}
                          className={`p-4 rounded-lg border-2 ${
                            lead.priority === 'high'
                              ? 'bg-white border-red-400 shadow-md'
                              : 'bg-white border-yellow-400'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-xs px-2 py-1 rounded font-bold ${
                              lead.priority === 'high'
                                ? 'bg-red-600 text-white'
                                : 'bg-yellow-600 text-white'
                            }`}>
                              {lead.priority === 'high' ? '🔥 URGENTE' : '⚡ PRIORIDAD'}
                            </span>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded font-medium text-gray-700">
                              {lead.plan}
                            </span>
                          </div>
                          <div className="font-semibold text-sm text-gray-800 mb-1 break-all">{lead.email}</div>
                          <div className="text-xs text-gray-600">{lead.reason}</div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">✨</div>
                    <div className="text-gray-700 font-semibold">No hay hot leads en las últimas 24h</div>
                    <div className="text-xs text-gray-600 mt-1">Revisa los Critical Drop-Offs para oportunidades a mediano plazo</div>
                  </div>
                )}
              </div>
            </div>

            {/* ============================================ */}
            {/* 📊 DEEP DIVE - Análisis Detallado */}
            {/* ============================================ */}
            <div className="border-t-4 border-gray-300 pt-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-slate-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                  📊
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Deep Dive</h2>
                  <p className="text-sm text-gray-600">Análisis detallado de conversión, engagement y fricción</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Embudos de Conversión - COLAPSABLE */}
                <details className="bg-white rounded-xl shadow border border-gray-200" open>
                  <summary className="p-5 cursor-pointer font-bold text-gray-800 hover:bg-gray-50 text-lg">
                    🎯 Embudos de Conversión Detallados
                  </summary>
                  <div className="px-5 pb-5">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5">
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      Comparación entre usuarios registrados y visitantes anónimos
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* EMBUDO 1: USUARIOS REGISTRADOS */}
                    <div className="bg-white rounded-xl p-5 shadow">
                      <div className="text-center mb-4">
                        <h4 className="text-lg font-bold text-blue-600 flex items-center justify-center gap-2">
                          👤 Usuarios Registrados
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">De uso activo a conversión premium</p>
                      </div>

                      {/* Funnel Visual */}
                      <div className="space-y-3">
                        {/* Nivel 1: Usuarios Activos */}
                        <div className="relative">
                          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg text-center">
                            <div className="text-xs font-semibold opacity-90">Usuarios Activos</div>
                            <div className="text-3xl font-bold">{data.conversionFunnel.registered.steps.activeUsers}</div>
                          </div>
                          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-2xl">↓</div>
                        </div>

                        {/* Nivel 2: Vieron Pricing */}
                        <div className="relative mx-4">
                          <div className="bg-gradient-to-r from-violet-500 to-violet-600 text-white p-4 rounded-lg text-center">
                            <div className="text-xs font-semibold opacity-90">Visitaron Pricing</div>
                            <div className="text-2xl font-bold">{data.conversionFunnel.registered.steps.pricingVisits}</div>
                            <div className="text-xs mt-1 font-semibold bg-white/20 inline-block px-2 py-0.5 rounded">
                              {data.conversionFunnel.registered.steps.activeUsers > 0
                                ? ((data.conversionFunnel.registered.steps.pricingVisits / data.conversionFunnel.registered.steps.activeUsers) * 100).toFixed(1)
                                : '0.0'}%
                            </div>
                          </div>
                          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-2xl">↓</div>
                        </div>

                        {/* Nivel 3: Iniciaron Checkout */}
                        <div className="relative mx-8">
                          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg text-center">
                            <div className="text-xs font-semibold opacity-90">Iniciaron Checkout</div>
                            <div className="text-xl font-bold">{data.conversionFunnel.registered.steps.checkoutStarts}</div>
                            <div className="text-xs mt-1 font-semibold bg-white/20 inline-block px-2 py-0.5 rounded">
                              {data.conversionFunnel.registered.rates.visitToCheckout}%
                            </div>
                          </div>
                          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-2xl">↓</div>
                        </div>

                        {/* Nivel 4: Conversión Premium */}
                        <div className="mx-12">
                          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-lg text-center">
                            <div className="text-xs font-semibold opacity-90">✓ Convirtieron a Premium</div>
                            <div className="text-2xl font-bold">{data.conversionFunnel.registered.steps.conversions}</div>
                            <div className="text-xs mt-1 font-semibold bg-white/20 inline-block px-2 py-0.5 rounded">
                              {data.conversionFunnel.registered.rates.checkoutToConversion}%
                            </div>
                          </div>
                        </div>

                        {/* Tasa Global */}
                        <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-3 rounded-lg text-center border-2 border-green-400 mt-4">
                          <div className="text-xs text-gray-600 font-semibold">CONVERSIÓN TOTAL</div>
                          <div className="text-3xl font-bold text-green-600">{data.conversionFunnel.registered.rates.overall}%</div>
                        </div>
                      </div>
                    </div>

                    {/* EMBUDO 2: USUARIOS ANÓNIMOS */}
                    <div className="bg-white rounded-xl p-5 shadow">
                      <div className="text-center mb-4">
                        <h4 className="text-lg font-bold text-purple-600 flex items-center justify-center gap-2">
                          🌐 Visitantes Anónimos
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">De visita a registro/conversión</p>
                      </div>

                      {/* Funnel Visual */}
                      <div className="space-y-3">
                        {/* Nivel 1: Visitantes Totales */}
                        <div className="relative">
                          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg text-center">
                            <div className="text-xs font-semibold opacity-90">Visitantes Totales</div>
                            <div className="text-3xl font-bold">{data.conversionFunnel.anonymous.steps.visitors}</div>
                          </div>
                          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-2xl">↓</div>
                        </div>

                        {/* Nivel 2: Vieron Pricing */}
                        <div className="relative mx-4">
                          <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-4 rounded-lg text-center">
                            <div className="text-xs font-semibold opacity-90">Visitaron Pricing</div>
                            <div className="text-2xl font-bold">{data.conversionFunnel.anonymous.steps.pricingVisits}</div>
                            <div className="text-xs mt-1 font-semibold bg-white/20 inline-block px-2 py-0.5 rounded">
                              {data.conversionFunnel.anonymous.rates.visitorToPricing}%
                            </div>
                          </div>
                          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-2xl">↓</div>
                        </div>

                        {/* Nivel 3: Iniciaron Checkout */}
                        <div className="relative mx-8">
                          <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4 rounded-lg text-center">
                            <div className="text-xs font-semibold opacity-90">Iniciaron Checkout</div>
                            <div className="text-xl font-bold">{data.conversionFunnel.anonymous.steps.checkoutStarts}</div>
                            <div className="text-xs mt-1 font-semibold bg-white/20 inline-block px-2 py-0.5 rounded">
                              {data.conversionFunnel.anonymous.rates.visitToCheckout}%
                            </div>
                          </div>
                          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-2xl">↓</div>
                        </div>

                        {/* Nivel 4: Se Registraron */}
                        <div className="mx-12">
                          <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white p-4 rounded-lg text-center">
                            <div className="text-xs font-semibold opacity-90">✓ Se Registraron</div>
                            <div className="text-2xl font-bold">{data.conversionFunnel.anonymous.steps.signups}</div>
                            <div className="text-xs mt-1 font-semibold bg-white/20 inline-block px-2 py-0.5 rounded">
                              {data.conversionFunnel.anonymous.rates.checkoutToSignup}%
                            </div>
                          </div>
                        </div>

                        {/* Tasa Global */}
                        <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-3 rounded-lg text-center border-2 border-cyan-400 mt-4">
                          <div className="text-xs text-gray-600 font-semibold">CONVERSIÓN TOTAL</div>
                          <div className="text-3xl font-bold text-cyan-600">{data.conversionFunnel.anonymous.rates.overall}%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desglose de Eventos */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 mt-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Desglose de Eventos</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Éxitos */}
                <div>
                  <h4 className="text-sm font-semibold text-green-700 mb-3 flex items-center gap-2">
                    ✅ Éxitos ({Object.values(data.eventBreakdown.success).reduce((a, b) => a + b, 0)})
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">🤖 Análisis</span>
                      <span className="font-semibold text-green-600">{data.eventBreakdown.success.completed_analysis}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">👤 Humanizaciones</span>
                      <span className="font-semibold text-green-600">{data.eventBreakdown.success.completed_humanization}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">🔄 Parafraseos</span>
                      <span className="font-semibold text-green-600">{data.eventBreakdown.success.completed_paraphrase}</span>
                    </div>
                  </div>
                </div>

                {/* Fricción */}
                <div>
                  <h4 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
                    ⚠️ Fricción ({Object.values(data.eventBreakdown.friction).reduce((a, b) => a + b, 0)})
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">🔤 Límite caracteres</span>
                      <span className="font-semibold text-red-600">{data.eventBreakdown.friction.hit_character_limit}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">📊 Límite diario</span>
                      <span className="font-semibold text-red-600">{data.eventBreakdown.friction.hit_daily_limit}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">📎 Archivo bloqueado</span>
                      <span className="font-semibold text-red-600">{data.eventBreakdown.friction.file_upload_blocked}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">💎 Modo premium</span>
                      <span className="font-semibold text-red-600">{data.eventBreakdown.friction.premium_mode_blocked}</span>
                    </div>
                  </div>
                </div>

                {/* Conversión */}
                <div>
                  <h4 className="text-sm font-semibold text-violet-700 mb-3 flex items-center gap-2">
                    💰 Conversión ({Object.values(data.eventBreakdown.conversion).reduce((a, b) => a + b, 0)})
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">👁️ Vieron pricing</span>
                      <span className="font-semibold text-violet-600">{data.eventBreakdown.conversion.pricing_page_visited}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">🛒 Iniciaron checkout</span>
                      <span className="font-semibold text-violet-600">{data.eventBreakdown.conversion.checkout_started}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                  </div>
                </details>

                {/* Oportunidades Legacy - COLAPSABLE */}
                <details className="bg-white rounded-xl shadow border border-gray-200">
                  <summary className="p-5 cursor-pointer font-bold text-gray-800 hover:bg-gray-50 text-lg">
                    🎯 Oportunidades (Vista Legacy)
                  </summary>
                  <div className="px-5 pb-5">
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    🎯 Oportunidades de Conversión
                    <span className="text-xs bg-yellow-600 text-white px-2 py-0.5 rounded font-bold">{data.opportunities.length}</span>
                  </h3>
                  <p className="text-xs text-gray-600 mb-4">Usuarios prioritarios para contactar y convertir a Premium</p>

                  {data.opportunities.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {data.opportunities.slice(0, 6).map((opp, index) => (
                        <div
                          key={opp.userId + index}
                          className={`p-3 rounded-lg border-2 ${
                            opp.priority === 'high'
                              ? 'bg-white border-red-300 shadow-md'
                              : 'bg-white border-yellow-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-xs px-2 py-1 rounded font-bold ${
                              opp.priority === 'high'
                                ? 'bg-red-600 text-white'
                                : 'bg-yellow-600 text-white'
                            }`}>
                              {opp.priority === 'high' ? '🔥 ALTA PRIORIDAD' : '⚡ Media Prioridad'}
                            </span>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded font-medium text-gray-700">{opp.plan}</span>
                          </div>
                          <div className="font-semibold text-sm text-gray-800 mb-1">{opp.email}</div>
                          <div className="text-xs text-gray-600">{opp.reason}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500 text-sm bg-white rounded-lg">
                      No hay oportunidades detectadas
                    </div>
                  )}
                </div>
                  </div>
                </details>

                {/* Engagement - COLAPSABLE */}
                <details className="bg-white rounded-xl shadow border border-gray-200">
                  <summary className="p-5 cursor-pointer font-bold text-gray-800 hover:bg-gray-50 text-lg">
                    📈 Engagement y Uso del Producto
                  </summary>
                  <div className="px-5 pb-5">
              <div className="space-y-4">
                {/* Usos por Herramienta */}
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl shadow-lg border-2 border-violet-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        🎯 Usos por Herramienta
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Cuántas veces los usuarios completaron análisis en cada herramienta
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(data.friction.toolAnalysis).map(([tool, stats]) => {
                      const toolConfig: Record<string, { name: string; icon: string; color: string; bgColor: string }> = {
                        detector: { name: 'Detector de IA', icon: '🤖', color: 'text-violet-600', bgColor: 'from-violet-100 to-violet-50' },
                        humanizador: { name: 'Humanizador', icon: '👤', color: 'text-emerald-600', bgColor: 'from-emerald-100 to-emerald-50' },
                        parafraseador: { name: 'Parafraseador', icon: '🔄', color: 'text-cyan-600', bgColor: 'from-cyan-100 to-cyan-50' },
                      };

                      const config = toolConfig[tool] || { name: tool, icon: '🛠️', color: 'text-gray-600', bgColor: 'from-gray-100 to-gray-50' };

                      return (
                        <div key={tool} className={`bg-gradient-to-br ${config.bgColor} rounded-xl p-5 border border-gray-200`}>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-2xl">{config.icon}</span>
                            <div className="font-semibold text-gray-800 text-sm">{config.name}</div>
                          </div>

                          <div className={`text-4xl font-bold ${config.color} mb-2`}>
                            {stats.completedUses}
                          </div>

                          <div className="text-xs text-gray-600">
                            Usos completados
                          </div>

                          <div className="mt-3 pt-3 border-t border-gray-300 flex justify-between text-xs">
                            <span className="text-gray-600">Total eventos:</span>
                            <span className="font-semibold">{stats.total}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Actividad Diaria */}
                <div className="bg-white rounded-xl shadow border border-blue-100 p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">📊 Actividad Diaria</h3>
                  <p className="text-xs text-gray-600 mb-4">Eventos y uso del producto a lo largo del tiempo</p>

                  {data.summary.dailyChart.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={data.summary.dailyChart}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          tickFormatter={(date) => new Date(date).toLocaleDateString('es-AR', { month: 'short', day: 'numeric' })}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} name="Eventos" />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="text-center py-6 text-gray-500 text-sm">
                      No hay datos para mostrar
                    </div>
                  )}
                </div>
              </div>
                  </div>
                </details>

                {/* Análisis de Fricción - COLAPSABLE */}
                <details className="bg-white rounded-xl shadow border border-gray-200">
                  <summary className="p-5 cursor-pointer font-bold text-gray-800 hover:bg-gray-50 text-lg">
                    ⚠️ Análisis de Fricción Detallado
                  </summary>
                  <div className="px-5 pb-5">
            <div className="space-y-4">
            {/* GRID 2 COLUMNAS - Desglose y Análisis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              {/* Desglose de Límites */}
              <div className="bg-white rounded-xl shadow border border-violet-100 p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  🎯 Qué Límites Tocan
                  <span className="text-xs font-normal text-gray-500" title="Ayuda a entender si los usuarios se frustran por caracteres o por usos diarios">❓</span>
                </h3>

                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-lg border border-amber-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-amber-700">🔤 Límite de caracteres</span>
                      <span className="text-xl font-bold text-gray-800">{data.friction.limitBreakdown.hitCharacterLimit}</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-3 rounded-lg border border-violet-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-violet-700">📊 Límite diario de usos</span>
                      <span className="text-xl font-bold text-gray-800">{data.friction.limitBreakdown.hitDailyLimit}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fricción por Herramienta */}
              <div className="bg-white rounded-xl shadow border border-violet-100 p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  🛠️ Fricción por Herramienta
                  <span className="text-xs font-normal text-gray-500" title="% de eventos que fueron límites/bloqueos vs total de eventos">❓</span>
                </h3>

                <div className="space-y-3">
                  {Object.entries(data.friction.toolAnalysis).map(([tool, stats]) => {
                    const frictionRate = stats.total > 0 ? (stats.friction / stats.total * 100).toFixed(1) : '0.0';
                    const toolNames: Record<string, string> = {
                      detector: '🤖 Detector',
                      humanizador: '👤 Humanizador',
                      parafraseador: '🔄 Parafraseador',
                    };

                    return (
                      <div key={tool}>
                        <div className="flex items-center justify-between mb-1 text-sm">
                          <span className="font-medium text-gray-700">{toolNames[tool] || tool}</span>
                          <span className="text-xs text-gray-600">{stats.friction}/{stats.total} eventos</span>
                        </div>
                        <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 to-orange-500"
                            style={{ width: `${frictionRate}%` }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">
                            {frictionRate}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ============================================ */}
            {/* GRID 2 COLUMNAS - Heatmap y Modos Premium */}
            {/* ============================================ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Heatmap */}
              <div className="bg-white rounded-xl shadow border border-violet-100 p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2">🔥 Cuándo Tocan Límites</h3>
                <p className="text-xs text-gray-600 mb-3">Día y hora de mayor fricción</p>

                {data.friction.heatmapData.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-xs">
                      <thead>
                        <tr>
                          <th className="p-1 text-xs text-gray-600 text-left w-12">D/H</th>
                          {[0, 6, 12, 18].map((h) => (
                            <th key={h} className="p-1 text-xs text-gray-600 text-center">{h}h</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((dayName, dayIndex) => (
                          <tr key={dayIndex}>
                            <td className="p-1 text-xs font-medium text-gray-700">{dayName}</td>
                            {[0, 6, 12, 18].map((hourIndex) => {
                              const dataPoint = data.friction.heatmapData.find(
                                (d) => d.day === dayIndex && d.hour === hourIndex
                              );
                              const count = dataPoint?.count || 0;

                              let bgColor = 'bg-gray-100';
                              if (count > 0 && count <= 2) bgColor = 'bg-yellow-200';
                              else if (count > 2 && count <= 5) bgColor = 'bg-orange-300';
                              else if (count > 5) bgColor = 'bg-red-400';

                              return (
                                <td
                                  key={hourIndex}
                                  className={`p-1 text-center ${bgColor} text-xs font-medium`}
                                  title={count > 0 ? `${count} eventos` : 'Sin eventos'}
                                >
                                  {count > 0 ? count : '·'}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="flex items-center gap-3 mt-3 text-xs justify-center">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-gray-100 rounded"></div>
                        <span>Sin datos</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-yellow-200 rounded"></div>
                        <span>1-2</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-orange-300 rounded"></div>
                        <span>3-5</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-red-400 rounded"></div>
                        <span>+5</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500 text-sm">
                    No hay datos suficientes
                  </div>
                )}
              </div>

              {/* Modos Premium */}
              <div className="bg-white rounded-xl shadow border border-violet-100 p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2">💎 Modos Premium Solicitados</h3>
                <p className="text-xs text-gray-600 mb-3">Features que usuarios quisieron usar</p>

                {data.friction.topPremiumModes.length > 0 ? (
                  <div className="space-y-2">
                    {data.friction.topPremiumModes.map((mode, index) => (
                      <div
                        key={mode.mode}
                        className="bg-gradient-to-r from-violet-50 to-purple-50 p-3 rounded-lg border border-violet-200 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                            {index + 1}
                          </div>
                          <div className="font-medium text-sm text-gray-800 capitalize">
                            {mode.mode.replace('_', ' ')}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-violet-600">{mode.count}</div>
                          <div className="text-xs text-gray-600">intentos</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500 text-sm">
                    No hay datos
                  </div>
                )}
              </div>
            </div>
            </div>
                  </div>
                </details>

                {/* Insights de Usuarios - COLAPSABLE */}
                <details className="bg-white rounded-xl shadow border border-gray-200">
                  <summary className="p-5 cursor-pointer font-bold text-gray-800 hover:bg-gray-50 text-lg">
                    👥 Insights de Usuarios y Perfiles
                  </summary>
                  <div className="px-5 pb-5">
            <div className="space-y-4">
            {/* Perfiles de Usuario */}
            <div className="bg-white rounded-xl border border-violet-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    👥 Perfiles de Usuario
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Quiénes son tus usuarios y cómo nos encontraron
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-violet-600">{data.profiles.totalProfiles}</div>
                  <div className="text-xs text-gray-600">perfiles completados</div>
                  <div className="text-xs text-gray-500">({data.profiles.completionRate}% de usuarios)</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Roles */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">🎓 Roles principales</h4>
                  {data.profiles.topRoles.length > 0 ? (
                    <div className="space-y-2">
                      {data.profiles.topRoles.map((item) => {
                        const roleLabels: Record<string, string> = {
                          student: 'Estudiante',
                          teacher: 'Profesor',
                          writer: 'Escritor',
                          journalist: 'Periodista',
                          professional: 'Profesional',
                          other: 'Otro',
                        };
                        return (
                          <div key={item.role} className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">{roleLabels[item.role] || item.role}</span>
                            <span className="font-semibold text-violet-600">{item.count}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500">Sin datos</div>
                  )}
                </div>

                {/* Uso principal */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">🎯 Uso principal</h4>
                  {data.profiles.topPrimaryUses.length > 0 ? (
                    <div className="space-y-2">
                      {data.profiles.topPrimaryUses.map((item) => {
                        const useLabels: Record<string, string> = {
                          detect_ai: 'Detectar IA',
                          humanize: 'Humanizar',
                          paraphrase: 'Parafrasear',
                          review_work: 'Revisar trabajos',
                          other: 'Otro',
                        };
                        return (
                          <div key={item.use} className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">{useLabels[item.use] || item.use}</span>
                            <span className="font-semibold text-violet-600">{item.count}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500">Sin datos</div>
                  )}
                </div>

                {/* Fuente de descubrimiento */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">📍 Cómo nos encontraron</h4>
                  {data.profiles.topDiscoverySources.length > 0 ? (
                    <div className="space-y-2">
                      {data.profiles.topDiscoverySources.map((item) => {
                        const sourceLabels: Record<string, string> = {
                          google: 'Google',
                          social_media: 'Redes sociales',
                          recommendation: 'Recomendación',
                          youtube: 'YouTube',
                          other_website: 'Otro sitio',
                          other: 'Otro',
                        };
                        return (
                          <div key={item.source} className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">{sourceLabels[item.source] || item.source}</span>
                            <span className="font-semibold text-violet-600">{item.count}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500">Sin datos</div>
                  )}
                </div>
              </div>
            </div>

            {/* Top Usuarios (colapsado) */}
            <details className="bg-white rounded-xl shadow border border-violet-100">
              <summary className="p-5 cursor-pointer font-bold text-gray-800 hover:bg-gray-50">
                🔥 Top Usuarios Más Activos
              </summary>
              <div className="px-5 pb-5">
                {data.topUsers.length > 0 ? (
                  <div className="space-y-2">
                    {data.topUsers.map((user, index) => (
                      <div
                        key={user.userId}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-gray-800">{user.email}</div>
                            <div className="text-xs text-gray-500">Plan: {user.plan}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg text-violet-600">{user.eventCount}</div>
                          <div className="text-xs text-gray-500">eventos</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500 text-sm">
                    No hay datos
                  </div>
                )}
              </div>
            </details>
            </div>
                  </div>
                </details>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-gray-500 pt-6 border-t border-gray-200">
              Datos actualizados en tiempo real • {data.timeframe}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
