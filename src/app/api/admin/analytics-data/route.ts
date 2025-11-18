/**
 * API Route: Analytics Dashboard Data
 *
 * GET /api/admin/analytics-data?timeframe=7d
 *
 * Retorna datos agregados para el dashboard de analytics
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticación simple
    const authHeader = request.headers.get('authorization');
    if (authHeader !== 'Basic ' + Buffer.from('Agus:1908').toString('base64')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Obtener parámetro de timeframe (default: 7 días)
    const timeframe = request.nextUrl.searchParams.get('timeframe') || '7d';
    const days = parseInt(timeframe.replace('d', ''));

    // Cliente Supabase con service role (para bypass RLS)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createSupabaseClient(supabaseUrl, supabaseServiceKey);

    // Fecha de inicio
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // ============================================
    // 1. RESUMEN GENERAL
    // ============================================

    // Total de usuarios registrados
    const { count: totalUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    // Usuarios activos (con eventos en el período)
    const { data: activeUsersData } = await supabase
      .from('analytics_events')
      .select('user_id')
      .gte('created_at', startDate.toISOString())
      .not('user_id', 'is', null);

    const uniqueActiveUsers = new Set(activeUsersData?.map(e => e.user_id) || []).size;

    // Actividad diaria (últimos N días)
    const { data: dailyActivity } = await supabase
      .from('analytics_events')
      .select('created_at')
      .gte('created_at', startDate.toISOString());

    // Agrupar por día
    const activityByDay: Record<string, number> = {};
    dailyActivity?.forEach(event => {
      const day = new Date(event.created_at).toISOString().split('T')[0];
      activityByDay[day] = (activityByDay[day] || 0) + 1;
    });

    const dailyChart = Object.entries(activityByDay)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // ============================================
    // 2. TOP USUARIOS MÁS ACTIVOS
    // ============================================

    const { data: topUsersEvents } = await supabase
      .from('analytics_events')
      .select('user_id, created_at')
      .gte('created_at', startDate.toISOString())
      .not('user_id', 'is', null);

    // Contar eventos por usuario
    const userEventCounts: Record<string, { count: number; lastEvent: string }> = {};
    topUsersEvents?.forEach(event => {
      if (!userEventCounts[event.user_id]) {
        userEventCounts[event.user_id] = { count: 0, lastEvent: event.created_at };
      }
      userEventCounts[event.user_id].count++;
      if (new Date(event.created_at) > new Date(userEventCounts[event.user_id].lastEvent)) {
        userEventCounts[event.user_id].lastEvent = event.created_at;
      }
    });

    // Ordenar y tomar top 10
    const topUserIds = Object.entries(userEventCounts)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 10)
      .map(([userId]) => userId);

    // Obtener datos de usuarios
    const { data: topUsersData } = await supabase
      .from('users')
      .select('id, email, plan_type')
      .in('id', topUserIds);

    const topUsers = topUserIds.map(userId => {
      const userData = topUsersData?.find(u => u.id === userId);
      return {
        userId,
        email: userData?.email || 'Unknown',
        plan: userData?.plan_type || 'free',
        eventCount: userEventCounts[userId].count,
        lastEvent: userEventCounts[userId].lastEvent,
      };
    });

    // ============================================
    // 3. FRICCIÓN DETECTADA
    // ============================================

    // Usuarios que tocaron límites
    const { data: limitEvents } = await supabase
      .from('analytics_events')
      .select('user_id, event_type, metadata')
      .gte('created_at', startDate.toISOString())
      .in('event_type', ['hit_daily_limit', 'hit_character_limit']);

    const usersHitLimit: Record<string, number> = {};
    limitEvents?.forEach(event => {
      const key = event.user_id || 'anonymous';
      usersHitLimit[key] = (usersHitLimit[key] || 0) + 1;
    });

    // Usuarios que intentaron features bloqueadas
    const { data: blockedEvents } = await supabase
      .from('analytics_events')
      .select('user_id, event_type')
      .gte('created_at', startDate.toISOString())
      .in('event_type', ['file_upload_blocked', 'premium_mode_blocked']);

    const usersTriedBlocked: Record<string, number> = {};
    blockedEvents?.forEach(event => {
      const key = event.user_id || 'anonymous';
      usersTriedBlocked[key] = (usersTriedBlocked[key] || 0) + 1;
    });

    // Contadores por tipo de fricción
    const frictionCounts = {
      hitDailyLimit: limitEvents?.filter(e => e.event_type === 'hit_daily_limit').length || 0,
      hitCharacterLimit: limitEvents?.filter(e => e.event_type === 'hit_character_limit').length || 0,
      fileUploadBlocked: blockedEvents?.filter(e => e.event_type === 'file_upload_blocked').length || 0,
      premiumModeBlocked: blockedEvents?.filter(e => e.event_type === 'premium_mode_blocked').length || 0,
    };

    // ============================================
    // 4. OPORTUNIDADES DE CONVERSIÓN
    // ============================================

    // Usuarios que tocaron límite múltiples veces (alta probabilidad)
    const highPriorityUsers = Object.entries(usersHitLimit)
      .filter(([_, count]) => count >= 2)
      .map(([userId, count]) => ({
        userId,
        reason: `Tocó límite ${count} veces`,
        priority: 'high',
      }));

    // Usuarios que intentaron features bloqueadas múltiples veces
    const blockedFeatureUsers = Object.entries(usersTriedBlocked)
      .filter(([_, count]) => count >= 2)
      .map(([userId, count]) => ({
        userId,
        reason: `Intentó ${count} veces features Pro`,
        priority: 'medium',
      }));

    // Combinar y ordenar por prioridad
    const conversionOpportunities = [...highPriorityUsers, ...blockedFeatureUsers]
      .slice(0, 10);

    // Obtener emails de estos usuarios
    const opportunityUserIds = conversionOpportunities
      .map(o => o.userId)
      .filter(id => id !== 'anonymous');

    const { data: opportunityUsers } = await supabase
      .from('users')
      .select('id, email, plan_type')
      .in('id', opportunityUserIds);

    const opportunities = conversionOpportunities.map(opp => {
      const userData = opportunityUsers?.find(u => u.id === opp.userId);
      return {
        ...opp,
        email: userData?.email || opp.userId === 'anonymous' ? 'Usuario anónimo' : 'Unknown',
        plan: userData?.plan_type || 'free',
      };
    });

    // ============================================
    // RESPUESTA FINAL
    // ============================================

    return NextResponse.json({
      timeframe: `${days} días`,
      summary: {
        totalUsers: totalUsers || 0,
        activeUsers: uniqueActiveUsers,
        totalEvents: dailyActivity?.length || 0,
        dailyChart,
      },
      topUsers,
      friction: {
        counts: frictionCounts,
        usersAffected: Object.keys(usersHitLimit).length + Object.keys(usersTriedBlocked).length,
      },
      opportunities,
    });

  } catch (error) {
    console.error('[Analytics API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
