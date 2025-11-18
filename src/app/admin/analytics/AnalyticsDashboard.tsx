'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsData {
  timeframe: string;
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
            {/* EXECUTIVE SUMMARY - KPIs Críticos */}
            {/* ============================================ */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg p-5 text-white">
                <div className="text-xs font-medium mb-1 opacity-90">👥 Usuarios Registrados</div>
                <div className="text-3xl font-bold">{data.summary.totalUsers}</div>
                <div className="text-xs mt-1 opacity-75">Base total de usuarios</div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-5 text-white">
                <div className="text-xs font-medium mb-1 opacity-90">⚡ Usuarios Activos</div>
                <div className="text-3xl font-bold">{data.summary.activeUsers}</div>
                <div className="text-xs mt-1 opacity-90 font-semibold">
                  {data.summary.totalUsers > 0
                    ? Math.round((data.summary.activeUsers / data.summary.totalUsers) * 100)
                    : 0}% engagement
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg p-5 text-white">
                <div className="text-xs font-medium mb-1 opacity-90">💰 Tasa Conversión</div>
                <div className="text-3xl font-bold">{data.conversionFunnel.rates.overall}%</div>
                <div className="text-xs mt-1 opacity-75">{data.conversionFunnel.steps.conversions} conversiones</div>
              </div>

              <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl shadow-lg p-5 text-white">
                <div className="text-xs font-medium mb-1 opacity-90">🎯 Oportunidades</div>
                <div className="text-3xl font-bold">{data.opportunities.length}</div>
                <div className="text-xs mt-1 opacity-75">Usuarios listos para convertir</div>
              </div>
            </div>

            {/* ============================================ */}
            {/* SECCIÓN 1: MONETIZACIÓN (Prioridad Máxima) */}
            {/* ============================================ */}
            <div className="border-t-4 border-green-500 pt-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-2xl">
                  💰
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Monetización</h2>
                  <p className="text-sm text-gray-600">Métricas clave de conversión y oportunidades de venta</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Embudo de Conversión */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border-2 border-green-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    🎯 Embudo de Conversión
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    De usuarios activos a clientes premium
                  </p>
                </div>
              </div>

              {/* Funnel Steps */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 border-2 border-blue-200">
                  <div className="text-xs text-blue-600 font-medium mb-1">Paso 1: Usuarios Activos</div>
                  <div className="text-3xl font-bold text-gray-800">{data.conversionFunnel.steps.activeUsers}</div>
                  <div className="text-xs text-gray-500 mt-1">Usaron las herramientas</div>
                </div>

                <div className="bg-white rounded-xl p-4 border-2 border-violet-200 relative">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 text-2xl">→</div>
                  <div className="text-xs text-violet-600 font-medium mb-1">Paso 2: Vieron Pricing</div>
                  <div className="text-3xl font-bold text-gray-800">{data.conversionFunnel.steps.pricingVisits}</div>
                  <div className="text-xs text-green-600 font-semibold mt-1">
                    {data.conversionFunnel.steps.activeUsers > 0
                      ? ((data.conversionFunnel.steps.pricingVisits / data.conversionFunnel.steps.activeUsers) * 100).toFixed(1)
                      : '0.0'}% de activos
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border-2 border-orange-200 relative">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 text-2xl">→</div>
                  <div className="text-xs text-orange-600 font-medium mb-1">Paso 3: Iniciaron Checkout</div>
                  <div className="text-3xl font-bold text-gray-800">{data.conversionFunnel.steps.checkoutStarts}</div>
                  <div className="text-xs text-green-600 font-semibold mt-1">
                    {data.conversionFunnel.rates.visitToCheckout}% de visitas
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4 border-2 border-green-300 relative">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 text-2xl">→</div>
                  <div className="text-xs text-green-700 font-medium mb-1">✓ Paso 4: Convirtieron</div>
                  <div className="text-3xl font-bold text-green-600">{data.conversionFunnel.steps.conversions}</div>
                  <div className="text-xs text-green-700 font-semibold mt-1">
                    {data.conversionFunnel.rates.overall}% conversión total
                  </div>
                </div>
              </div>

              {/* Conversion Rates Summary */}
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Pricing → Checkout</div>
                    <div className="text-2xl font-bold text-violet-600">{data.conversionFunnel.rates.visitToCheckout}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Checkout → Premium</div>
                    <div className="text-2xl font-bold text-orange-600">{data.conversionFunnel.rates.checkoutToConversion}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Conversión Global</div>
                    <div className="text-2xl font-bold text-green-600">{data.conversionFunnel.rates.overall}%</div>
                  </div>
                </div>
              </div>
            </div>

                {/* Desglose de Eventos de Conversión */}
                <div className="bg-white rounded-xl shadow border border-green-100 p-5">
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

                {/* Oportunidades de Conversión */}
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl shadow border border-yellow-200 p-5">
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
            </div>

            {/* ============================================ */}
            {/* SECCIÓN 2: ENGAGEMENT (Uso del Producto) */}
            {/* ============================================ */}
            <div className="border-t-4 border-blue-500 pt-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-2xl">
                  📈
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Engagement</h2>
                  <p className="text-sm text-gray-600">Uso y actividad en las herramientas</p>
                </div>
              </div>

              <div className="space-y-6">
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

            {/* ============================================ */}
            {/* SECCIÓN 3: ANÁLISIS DE FRICCIÓN */}
            {/* ============================================ */}
            <div className="border-t-4 border-red-500 pt-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center text-2xl">
                  ⚠️
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Análisis de Fricción</h2>
                  <p className="text-sm text-gray-600">Dónde y cuándo los usuarios encuentran límites</p>
                </div>
              </div>

            {/* ============================================ */}
            {/* GRID 2 COLUMNAS - Desglose y Análisis */}
            {/* ============================================ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

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

            {/* ============================================ */}
            {/* SECCIÓN 4: INSIGHTS DE USUARIOS */}
            {/* ============================================ */}
            <div className="border-t-4 border-violet-500 pt-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                  👥
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Insights de Usuarios</h2>
                  <p className="text-sm text-gray-600">Quiénes son y cómo usan el producto</p>
                </div>
              </div>

            {/* Perfiles de Usuario */}
            <div className="bg-white rounded-xl shadow border border-violet-100 p-5">
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
