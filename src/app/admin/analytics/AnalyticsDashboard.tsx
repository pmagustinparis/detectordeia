'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
  };
  opportunities: Array<{
    userId: string;
    email: string;
    plan: string;
    reason: string;
    priority: string;
  }>;
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

        {/* Timeframe Selector */}
        <div className="mb-6 flex gap-2">
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
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
            <p className="mt-4 text-gray-600">Cargando datos...</p>
          </div>
        )}

        {!loading && data && (
          <div className="space-y-6">
            {/* ============================================ */}
            {/* 1. RESUMEN GENERAL */}
            {/* ============================================ */}
            <div className="bg-white rounded-2xl shadow-lg border border-violet-100 p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                📈 Resumen General
              </h2>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-6 rounded-xl border border-violet-200">
                  <div className="text-sm text-violet-600 font-medium mb-1">
                    Usuarios Registrados
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    {data.summary.totalUsers}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <div className="text-sm text-green-600 font-medium mb-1">
                    Usuarios Activos ({data.timeframe})
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    {data.summary.activeUsers}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {data.summary.totalUsers > 0
                      ? Math.round((data.summary.activeUsers / data.summary.totalUsers) * 100)
                      : 0}% del total
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl border border-cyan-200">
                  <div className="text-sm text-cyan-600 font-medium mb-1">
                    Eventos Totales
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    {data.summary.totalEvents}
                  </div>
                </div>
              </div>

              {/* Activity Chart */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Actividad Diaria
                </h3>
                {data.summary.dailyChart.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.summary.dailyChart}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(date) => new Date(date).toLocaleDateString('es-AR', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={2} name="Eventos" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No hay datos para mostrar en este período
                  </div>
                )}
              </div>
            </div>

            {/* ============================================ */}
            {/* 2. TOP USUARIOS MÁS ACTIVOS */}
            {/* ============================================ */}
            <div className="bg-white rounded-2xl shadow-lg border border-violet-100 p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                🔥 Top Usuarios Más Activos
              </h2>

              {data.topUsers.length > 0 ? (
                <div className="space-y-3">
                  {data.topUsers.map((user, index) => (
                    <div
                      key={user.userId}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-violet-300 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{user.email}</div>
                          <div className="text-sm text-gray-500">
                            {user.eventCount} eventos • Último: {new Date(user.lastEvent).toLocaleDateString('es-AR')}
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.plan === 'premium'
                            ? 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border border-yellow-300'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {user.plan === 'premium' ? '👑 Pro' : 'Free'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No hay datos de usuarios activos en este período
                </div>
              )}
            </div>

            {/* ============================================ */}
            {/* 3. FRICCIÓN DETECTADA */}
            {/* ============================================ */}
            <div className="bg-white rounded-2xl shadow-lg border border-violet-100 p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                ⚠️ Fricción Detectada
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                  <div className="text-sm text-red-600 font-medium mb-1">
                    🚫 Límite Diario Alcanzado
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {data.friction.counts.hitDailyLimit}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Usuarios que tocaron su límite de usos diarios
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                  <div className="text-sm text-orange-600 font-medium mb-1">
                    ✂️ Límite de Caracteres
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {data.friction.counts.hitCharacterLimit}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Textos que excedieron el límite de caracteres
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <div className="text-sm text-blue-600 font-medium mb-1">
                    📄 Subida de Archivos Bloqueada
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {data.friction.counts.fileUploadBlocked}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Usuarios Free intentaron subir archivos
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                  <div className="text-sm text-purple-600 font-medium mb-1">
                    🔒 Modo Premium Bloqueado
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {data.friction.counts.premiumModeBlocked}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Intentos de usar modos premium
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
                <div className="text-sm font-medium text-yellow-800">
                  📊 {data.friction.usersAffected} usuarios afectados por fricción en total
                </div>
              </div>
            </div>

            {/* ============================================ */}
            {/* 4. OPORTUNIDADES DE CONVERSIÓN */}
            {/* ============================================ */}
            <div className="bg-white rounded-2xl shadow-lg border border-violet-100 p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                💰 Oportunidades de Conversión
              </h2>

              {data.opportunities.length > 0 ? (
                <div className="space-y-3">
                  {data.opportunities.map((opp, index) => (
                    <div
                      key={opp.userId + index}
                      className={`p-4 rounded-xl border-2 ${
                        opp.priority === 'high'
                          ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-300'
                          : 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              opp.priority === 'high'
                                ? 'bg-red-600 text-white'
                                : 'bg-yellow-600 text-white'
                            }`}>
                              {opp.priority === 'high' ? '🔥 Alta Prioridad' : '⚡ Media Prioridad'}
                            </span>
                            <span className="text-xs text-gray-600">
                              Plan: {opp.plan}
                            </span>
                          </div>
                          <div className="font-semibold text-gray-800">
                            {opp.email}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {opp.reason}
                          </div>
                        </div>
                        <div>
                          <button className="px-4 py-2 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition-colors text-sm">
                            Contactar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No hay oportunidades de conversión detectadas en este período
                </div>
              )}
            </div>

            {/* Footer Info */}
            <div className="text-center text-sm text-gray-500 pt-4">
              Datos actualizados en tiempo real • {data.timeframe}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
