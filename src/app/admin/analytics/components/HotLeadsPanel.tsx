/**
 * Hot Leads Panel Component
 *
 * Muestra alerts accionables de usuarios que necesitan atención:
 * - HIGH priority: Usuarios hitting limits múltiples veces, churn risk
 * - MEDIUM priority: Usuarios visitando pricing sin convertir
 * - Agrupados por tipo de alert con acciones recomendadas
 */

'use client';

import { HotLead } from '@/lib/analytics/types';

interface HotLeadsPanelProps {
  leads: HotLead[];
}

export default function HotLeadsPanel({ leads }: HotLeadsPanelProps) {
  // Agrupar leads por priority
  const highPriorityLeads = leads.filter((l) => l.priority === 'high');
  const mediumPriorityLeads = leads.filter((l) => l.priority === 'medium');
  const lowPriorityLeads = leads.filter((l) => l.priority === 'low');

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300">
            🔴 HIGH
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-300">
            🟡 MEDIUM
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            🔵 LOW
          </span>
        );
      default:
        return null;
    }
  };

  const getAlertTypeIcon = (alertType: string) => {
    switch (alertType) {
      case 'frequent_limit_hits':
        return '⚡';
      case 'churn_risk':
        return '⚠️';
      case 'ready_to_convert':
        return '🎯';
      case 'abandoned_checkout':
        return '🛒';
      default:
        return '📌';
    }
  };

  const getAlertTypeName = (alertType: string) => {
    switch (alertType) {
      case 'frequent_limit_hits':
        return 'Límites Frecuentes';
      case 'churn_risk':
        return 'Riesgo de Churn';
      case 'ready_to_convert':
        return 'Listo para Convertir';
      case 'abandoned_checkout':
        return 'Checkout Abandonado';
      default:
        return alertType;
    }
  };

  const renderLead = (lead: HotLead) => {
    const bgColorClass =
      lead.priority === 'high'
        ? 'bg-red-50 border-red-300'
        : lead.priority === 'medium'
        ? 'bg-yellow-50 border-yellow-300'
        : 'bg-blue-50 border-blue-300';

    return (
      <div
        key={lead.userId || lead.anonymousId}
        className={`border-2 rounded-xl p-4 ${bgColorClass} hover:shadow-md transition-shadow`}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getAlertTypeIcon(lead.alertType)}</span>
            <div>
              <p className="font-bold text-gray-900 text-sm">
                {getAlertTypeName(lead.alertType)}
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                {lead.email || lead.anonymousId || 'Usuario anónimo'}
              </p>
            </div>
          </div>
          {getPriorityBadge(lead.priority)}
        </div>

        {/* Reason */}
        <div className="mb-3">
          <p className="text-sm text-gray-700">
            <strong>Situación:</strong> {lead.reason}
          </p>
        </div>

        {/* Metadata */}
        {lead.metadata && Object.keys(lead.metadata).length > 0 && (
          <div className="mb-3 p-2 bg-white/50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-2 gap-2 text-xs">
              {lead.metadata.limitHitsLast24h !== undefined && (
                <div>
                  <span className="text-gray-600">Límites (24h):</span>
                  <span className="ml-1 font-bold text-gray-900">
                    {lead.metadata.limitHitsLast24h}
                  </span>
                </div>
              )}
              {lead.metadata.pricingVisits !== undefined && (
                <div>
                  <span className="text-gray-600">Visitas pricing:</span>
                  <span className="ml-1 font-bold text-gray-900">
                    {lead.metadata.pricingVisits}
                  </span>
                </div>
              )}
              {lead.metadata.daysSinceLastActivity !== undefined && (
                <div>
                  <span className="text-gray-600">Días inactivo:</span>
                  <span className="ml-1 font-bold text-gray-900">
                    {lead.metadata.daysSinceLastActivity}
                  </span>
                </div>
              )}
              {lead.metadata.checkoutAttempts !== undefined && (
                <div>
                  <span className="text-gray-600">Checkouts:</span>
                  <span className="ml-1 font-bold text-gray-900">
                    {lead.metadata.checkoutAttempts}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Actionable */}
        <div className="bg-white border-2 border-gray-300 rounded-lg p-3">
          <p className="text-xs font-semibold text-gray-700 mb-1">
            💡 Acción Recomendada:
          </p>
          <p className="text-sm text-gray-900">{lead.actionable}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          🔥 Hot Leads
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Usuarios que necesitan atención inmediata - ordenados por prioridad
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🔴</span>
            <p className="text-sm font-semibold text-gray-700">High Priority</p>
          </div>
          <p className="text-4xl font-extrabold text-red-700">
            {highPriorityLeads.length}
          </p>
          <p className="text-xs text-red-600 mt-1">Actúa HOY</p>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🟡</span>
            <p className="text-sm font-semibold text-gray-700">Medium Priority</p>
          </div>
          <p className="text-4xl font-extrabold text-yellow-700">
            {mediumPriorityLeads.length}
          </p>
          <p className="text-xs text-yellow-600 mt-1">Esta semana</p>
        </div>

        <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🔵</span>
            <p className="text-sm font-semibold text-gray-700">Low Priority</p>
          </div>
          <p className="text-4xl font-extrabold text-blue-700">
            {lowPriorityLeads.length}
          </p>
          <p className="text-xs text-blue-600 mt-1">Seguimiento</p>
        </div>
      </div>

      {/* Empty state */}
      {leads.length === 0 && (
        <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-8 text-center">
          <span className="text-6xl mb-4 block">✨</span>
          <p className="text-xl font-bold text-green-900 mb-2">
            ¡Todo bajo control!
          </p>
          <p className="text-sm text-green-700">
            No hay leads que requieran atención inmediata en este momento.
          </p>
        </div>
      )}

      {/* High Priority Leads */}
      {highPriorityLeads.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🔴</span>
            <h3 className="text-lg font-bold text-gray-900">
              Alta Prioridad ({highPriorityLeads.length})
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {highPriorityLeads.map(renderLead)}
          </div>
        </div>
      )}

      {/* Medium Priority Leads */}
      {mediumPriorityLeads.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🟡</span>
            <h3 className="text-lg font-bold text-gray-900">
              Prioridad Media ({mediumPriorityLeads.length})
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mediumPriorityLeads.map(renderLead)}
          </div>
        </div>
      )}

      {/* Low Priority Leads - Collapsed by default */}
      {lowPriorityLeads.length > 0 && (
        <details className="group">
          <summary className="cursor-pointer list-none">
            <div className="flex items-center gap-2 mb-4 hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <span className="text-2xl">🔵</span>
              <h3 className="text-lg font-bold text-gray-900">
                Prioridad Baja ({lowPriorityLeads.length})
              </h3>
              <span className="ml-auto text-gray-500 group-open:rotate-180 transition-transform">
                ▼
              </span>
            </div>
          </summary>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            {lowPriorityLeads.map(renderLead)}
          </div>
        </details>
      )}

      {/* Quick Actions */}
      {leads.length > 0 && (
        <div className="bg-violet-50 border-2 border-violet-300 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-violet-900 mb-2">
                Quick Actions
              </p>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-lg transition-colors">
                  Enviar Email Masivo
                </button>
                <button className="px-4 py-2 bg-white hover:bg-gray-50 text-violet-700 border-2 border-violet-300 text-sm font-semibold rounded-lg transition-colors">
                  Exportar Lista
                </button>
                <button className="px-4 py-2 bg-white hover:bg-gray-50 text-violet-700 border-2 border-violet-300 text-sm font-semibold rounded-lg transition-colors">
                  Marcar Como Contactado
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
