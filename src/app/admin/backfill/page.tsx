'use client';

import { useState } from 'react';

export default function BackfillPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const executeBackfill = async () => {
    if (!confirm('¿Estás seguro? Este script se debe ejecutar UNA SOLA VEZ.')) {
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/admin/backfill-signups', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa('Agus:1908'),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error ejecutando backfill');
        return;
      }

      setResult(data);
    } catch (err) {
      setError('Error de conexión: ' + String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            🔄 Backfill: Signup Events
          </h1>
          <p className="text-gray-600 mb-6">
            Este script genera eventos <code className="bg-gray-100 px-2 py-1 rounded">signup</code> retroactivos
            para usuarios que se registraron en los últimos 30 días pero no tienen el evento en analytics_events.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700 font-semibold">
                  ⚠️ IMPORTANTE: Ejecutar UNA SOLA VEZ
                </p>
                <p className="text-xs text-yellow-600 mt-1">
                  Este script detecta si ya existen eventos signup y los omite automáticamente.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={executeBackfill}
            disabled={loading || result !== null}
            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Ejecutando backfill...
              </span>
            ) : result !== null ? (
              '✅ Backfill Completado'
            ) : (
              '🚀 Ejecutar Backfill de Signup Events'
            )}
          </button>

          {/* Error */}
          {error && (
            <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resultado */}
          {result && (
            <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    {result.message}
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Total usuarios encontrados: <strong>{result.totalUsersFound}</strong></li>
                      <li>✅ Eventos creados: <strong>{result.backfilledCount}</strong></li>
                      <li>⏭️ Eventos saltados (ya existían): <strong>{result.skippedCount}</strong></li>
                    </ul>

                    {result.backfilledCount > 0 && (
                      <div className="mt-4 p-3 bg-white rounded-lg">
                        <p className="font-semibold text-green-800 mb-2">
                          Usuarios con eventos creados:
                        </p>
                        <ul className="text-xs space-y-1">
                          {result.backfilledUsers.map((email: string, i: number) => (
                            <li key={i} className="text-gray-700">• {email}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.skippedCount > 0 && (
                      <div className="mt-4 p-3 bg-white rounded-lg">
                        <p className="font-semibold text-gray-700 mb-2">
                          Usuarios omitidos (ya tenían evento signup):
                        </p>
                        <ul className="text-xs space-y-1">
                          {result.skippedUsers.map((email: string, i: number) => (
                            <li key={i} className="text-gray-600">• {email}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 text-sm text-green-700">
                    <p className="font-semibold">🎉 ¡Listo!</p>
                    <p className="mt-1">
                      Ahora tu dashboard de analytics mostrará los registros históricos.
                      <br />
                      💡 Refresca el dashboard de analytics para ver los datos actualizados.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="mt-6 text-center">
              <a
                href="/admin/analytics"
                className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                📊 Ir al Dashboard de Analytics
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
