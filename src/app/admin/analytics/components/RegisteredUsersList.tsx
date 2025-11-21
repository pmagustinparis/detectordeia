/**
 * Registered Users List Component
 *
 * Lista completa de usuarios registrados con:
 * - Orden cronológico (más nuevo primero)
 * - Datos: email, nombre, fecha, plan
 * - Búsqueda y filtros
 * - Acción de contactar
 */

'use client';

import { useState } from 'react';

interface RegisteredUser {
  id: string;
  email: string;
  fullName?: string;
  planType: 'free' | 'premium';
  createdAt: string;
  lastActivity?: string;
  totalUses?: number;
  isTestUser?: boolean;
}

interface RegisteredUsersListProps {
  users: RegisteredUser[];
}

export default function RegisteredUsersList({ users }: RegisteredUsersListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState<'all' | 'free' | 'premium'>('all');
  const [showTestUsers, setShowTestUsers] = useState(false);

  // Filtrar usuarios
  const filteredUsers = users.filter(user => {
    // Filtro de búsqueda
    const matchesSearch =
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

    // Filtro de plan
    const matchesPlan = filterPlan === 'all' || user.planType === filterPlan;

    // Filtro de test users
    const matchesTestFilter = showTestUsers || !user.isTestUser;

    return matchesSearch && matchesPlan && matchesTestFilter;
  });

  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch (err) {
      console.error('Error copying email:', err);
    }
  };

  const handleCopyAllEmails = async () => {
    const emails = filteredUsers
      .filter(u => !u.isTestUser)
      .map(u => u.email)
      .join(', ');
    try {
      await navigator.clipboard.writeText(emails);
      setCopiedEmail('all');
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch (err) {
      console.error('Error copying emails:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPlanBadgeColor = (plan: string) => {
    return plan === 'premium'
      ? 'bg-violet-100 text-violet-800 border-violet-300'
      : 'bg-gray-100 text-gray-700 border-gray-300';
  };

  return (
    <div className="space-y-4">
      {/* Header actions */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Total: {filteredUsers.length} de {users.length} usuarios
        </p>
        <button
          onClick={handleCopyAllEmails}
          disabled={filteredUsers.filter(u => !u.isTestUser).length === 0}
          className="px-4 py-2 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors text-sm"
        >
          {copiedEmail === 'all' ? '✅ Copiados!' : '📋 Copiar emails'} ({filteredUsers.filter(u => !u.isTestUser).length})
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🔍 Buscar
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Email o nombre..."
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-500 transition-colors bg-white text-gray-900"
            />
          </div>

          {/* Plan filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Plan
            </label>
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value as 'all' | 'free' | 'premium')}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-500 transition-colors cursor-pointer bg-white text-gray-900"
            >
              <option value="all">Todos</option>
              <option value="free">Free</option>
              <option value="premium">Premium</option>
            </select>
          </div>
        </div>

        {/* Test users toggle */}
        <div className="mt-3 flex items-center gap-2">
          <input
            type="checkbox"
            id="showTestUsers"
            checked={showTestUsers}
            onChange={(e) => setShowTestUsers(e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          <label htmlFor="showTestUsers" className="text-sm text-gray-700 cursor-pointer">
            Mostrar usuarios de prueba
          </label>
        </div>
      </div>

      {/* Users table */}
      <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Registrado
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Usos
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No se encontraron usuarios
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className={`hover:bg-gray-50 transition-colors ${user.isTestUser ? 'bg-yellow-50' : ''}`}
                  >
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{user.email}</span>
                        {user.isTestUser && (
                          <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded">
                            TEST
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {user.fullName || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getPlanBadgeColor(user.planType)}`}>
                        {user.planType === 'premium' ? '💎 Premium' : '🆓 Free'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {user.totalUses !== undefined ? user.totalUses : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => handleCopyEmail(user.email)}
                        className="text-violet-600 hover:text-violet-800 font-semibold transition-colors"
                      >
                        {copiedEmail === user.email ? '✅ Copiado' : '📋 Copiar email'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-600 mb-1">Total Usuarios</p>
          <p className="text-2xl font-bold text-gray-900">{users.length}</p>
        </div>
        <div className="bg-white border-2 border-violet-200 rounded-xl p-4">
          <p className="text-sm text-gray-600 mb-1">Premium</p>
          <p className="text-2xl font-bold text-violet-700">
            {users.filter(u => u.planType === 'premium').length}
          </p>
        </div>
        <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-600 mb-1">Free</p>
          <p className="text-2xl font-bold text-gray-700">
            {users.filter(u => u.planType === 'free').length}
          </p>
        </div>
        <div className="bg-white border-2 border-yellow-200 rounded-xl p-4">
          <p className="text-sm text-gray-600 mb-1">Test Users</p>
          <p className="text-2xl font-bold text-yellow-700">
            {users.filter(u => u.isTestUser).length}
          </p>
        </div>
      </div>
    </div>
  );
}
