/**
 * API Route: Analytics Dashboard Data
 *
 * GET /api/admin/analytics-data?timeframe=7d
 *
 * Retorna datos agregados para el dashboard de analytics
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Usuarios internos/de prueba que se excluyen de métricas de MRR y conversión
const INTERNAL_TEST_EMAILS = [
  'parisagustin@gmail.com',
  'latamify@gmail.com',
];

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

    // Usuarios anónimos activos (con eventos en el período)
    const { data: anonymousUsersData } = await supabase
      .from('analytics_events')
      .select('anonymous_id')
      .gte('created_at', startDate.toISOString())
      .not('anonymous_id', 'is', null)
      .is('user_id', null); // Solo anónimos (sin user_id)

    const uniqueAnonymousUsers = new Set(anonymousUsersData?.map(e => e.anonymous_id) || []).size;

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
      .select('user_id, event_type, metadata')
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
      .in('id', opportunityUserIds)
      .not('email', 'in', `(${INTERNAL_TEST_EMAILS.map(e => `"${e}"`).join(',')})`);

    const opportunities = conversionOpportunities
      .map(opp => {
        const userData = opportunityUsers?.find(u => u.id === opp.userId);
        return {
          ...opp,
          email: userData?.email || opp.userId === 'anonymous' ? 'Usuario anónimo' : 'Unknown',
          plan: userData?.plan_type || 'free',
        };
      })
      .filter(opp => opp.email !== 'Unknown'); // Filtrar usuarios de prueba que no tienen userData

    // ============================================
    // 5. ANÁLISIS DETALLADO DE FRICCIÓN
    // ============================================

    // 5.1 Desglose específico de límites (characters vs daily_uses)
    const limitBreakdown = {
      hitCharacterLimit: 0,
      hitDailyLimit: 0,
    };

    limitEvents?.forEach(event => {
      if (event.event_type === 'hit_character_limit') {
        limitBreakdown.hitCharacterLimit++;
      } else if (event.event_type === 'hit_daily_limit') {
        limitBreakdown.hitDailyLimit++;
      }
    });

    // 5.2 Heatmap de fricción (día/hora)
    const frictionHeatmap: Record<number, Record<number, number>> = {};
    for (let day = 0; day < 7; day++) {
      frictionHeatmap[day] = {};
      for (let hour = 0; hour < 24; hour++) {
        frictionHeatmap[day][hour] = 0;
      }
    }

    // Procesar eventos con metadata temporal
    [...(limitEvents || []), ...(blockedEvents || [])].forEach(event => {
      const metadata = event.metadata as any;
      if (metadata?.hour_of_day !== undefined && metadata?.day_of_week !== undefined) {
        const hour = metadata.hour_of_day;
        const day = metadata.day_of_week;
        if (hour >= 0 && hour < 24 && day >= 0 && day < 7) {
          frictionHeatmap[day][hour]++;
        }
      }
    });

    // Convertir heatmap a array para facilitar visualización
    const heatmapData = [];
    for (let day = 0; day < 7; day++) {
      for (let hour = 0; hour < 24; hour++) {
        if (frictionHeatmap[day][hour] > 0) {
          heatmapData.push({
            day,
            hour,
            count: frictionHeatmap[day][hour],
          });
        }
      }
    }

    // 5.3 Análisis por herramienta
    const { data: allEvents } = await supabase
      .from('analytics_events')
      .select('tool_type, event_type')
      .gte('created_at', startDate.toISOString());

    const toolAnalysis: Record<string, { total: number; friction: number; completedUses: number }> = {
      detector: { total: 0, friction: 0, completedUses: 0 },
      humanizador: { total: 0, friction: 0, completedUses: 0 },
      parafraseador: { total: 0, friction: 0, completedUses: 0 },
    };

    allEvents?.forEach(event => {
      if (event.tool_type && toolAnalysis[event.tool_type]) {
        toolAnalysis[event.tool_type].total++;

        // Contar eventos de fricción
        if (['hit_daily_limit', 'hit_character_limit', 'file_upload_blocked', 'premium_mode_blocked'].includes(event.event_type)) {
          toolAnalysis[event.tool_type].friction++;
        }

        // Contar usos completados (análisis exitosos)
        if (['completed_analysis', 'completed_humanization', 'completed_paraphrase'].includes(event.event_type)) {
          toolAnalysis[event.tool_type].completedUses++;
        }
      }
    });

    // 5.4 Modos premium más solicitados
    const premiumModesRequested: Record<string, number> = {};

    blockedEvents?.forEach(event => {
      if (event.event_type === 'premium_mode_blocked') {
        const metadata = event.metadata as any;
        const mode = metadata?.mode;
        if (mode) {
          premiumModesRequested[mode] = (premiumModesRequested[mode] || 0) + 1;
        }
      }
    });

    const topPremiumModes = Object.entries(premiumModesRequested)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([mode, count]) => ({ mode, count }));

    // ============================================
    // 6. ANÁLISIS DE PERFILES DE USUARIO
    // ============================================

    // Total de perfiles completados
    const { count: totalProfiles } = await supabase
      .from('user_profiles')
      .select('*', { count: 'exact', head: true });

    // Distribución por rol
    const { data: profilesData } = await supabase
      .from('user_profiles')
      .select('role, primary_use, discovery_source');

    const roleDistribution: Record<string, number> = {};
    const primaryUseDistribution: Record<string, number> = {};
    const discoverySourceDistribution: Record<string, number> = {};

    profilesData?.forEach((profile) => {
      if (profile.role) {
        roleDistribution[profile.role] = (roleDistribution[profile.role] || 0) + 1;
      }
      if (profile.primary_use) {
        primaryUseDistribution[profile.primary_use] = (primaryUseDistribution[profile.primary_use] || 0) + 1;
      }
      if (profile.discovery_source) {
        discoverySourceDistribution[profile.discovery_source] = (discoverySourceDistribution[profile.discovery_source] || 0) + 1;
      }
    });

    // Top 5 de cada categoría
    const topRoles = Object.entries(roleDistribution)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([role, count]) => ({ role, count }));

    const topPrimaryUses = Object.entries(primaryUseDistribution)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([use, count]) => ({ use, count }));

    const topDiscoverySources = Object.entries(discoverySourceDistribution)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([source, count]) => ({ source, count }));

    // ============================================
    // 7. EMBUDO DE CONVERSIÓN
    // ============================================

    // Contar eventos del embudo
    const { data: funnelEvents } = await supabase
      .from('analytics_events')
      .select('event_type, user_id, anonymous_id, metadata')
      .gte('created_at', startDate.toISOString())
      .in('event_type', ['pricing_page_visited', 'checkout_started']);

    // SEPARAR EVENTOS POR TIPO DE USUARIO
    // Registrados: tienen user_id
    const registeredPricingVisits = funnelEvents?.filter(e =>
      e.event_type === 'pricing_page_visited' && e.user_id
    ).length || 0;

    const registeredCheckoutStarts = funnelEvents?.filter(e =>
      e.event_type === 'checkout_started' && e.user_id
    ).length || 0;

    // Anónimos: tienen anonymous_id pero NO user_id
    const anonymousPricingVisits = funnelEvents?.filter(e =>
      e.event_type === 'pricing_page_visited' && !e.user_id && e.anonymous_id
    ).length || 0;

    const anonymousCheckoutStarts = funnelEvents?.filter(e =>
      e.event_type === 'checkout_started' && !e.user_id && e.anonymous_id
    ).length || 0;

    // Total (para mantener compatibilidad con código existente)
    const pricingVisits = registeredPricingVisits + anonymousPricingVisits;
    const checkoutStarts = registeredCheckoutStarts + anonymousCheckoutStarts;

    // Conversiones completadas (usuarios que pasaron de free a premium en el período)
    // Excluyendo usuarios de prueba internos
    const { data: conversions } = await supabase
      .from('users')
      .select('plan_type, created_at, email')
      .eq('plan_type', 'premium')
      .gte('created_at', startDate.toISOString())
      .not('email', 'in', `(${INTERNAL_TEST_EMAILS.map(e => `"${e}"`).join(',')})`);

    const totalConversions = conversions?.length || 0;

    // Usuarios anónimos que se registraron (conversión para anónimos)
    const { data: newRegistrations } = await supabase
      .from('analytics_events')
      .select('user_id, created_at')
      .eq('event_type', 'signup')
      .gte('created_at', startDate.toISOString());

    const totalSignups = newRegistrations?.length || 0;

    // Calcular tasas de conversión - REGISTRADOS
    const registeredVisitToCheckout = registeredPricingVisits > 0
      ? ((registeredCheckoutStarts / registeredPricingVisits) * 100).toFixed(1)
      : '0.0';
    const registeredCheckoutToConversion = registeredCheckoutStarts > 0
      ? ((totalConversions / registeredCheckoutStarts) * 100).toFixed(1)
      : '0.0';
    const registeredOverall = registeredPricingVisits > 0
      ? ((totalConversions / registeredPricingVisits) * 100).toFixed(1)
      : '0.0';

    // Calcular tasas de conversión - ANÓNIMOS
    const anonymousVisitorToPricing = uniqueAnonymousUsers > 0
      ? ((anonymousPricingVisits / uniqueAnonymousUsers) * 100).toFixed(1)
      : '0.0';
    const anonymousVisitToCheckout = anonymousPricingVisits > 0
      ? ((anonymousCheckoutStarts / anonymousPricingVisits) * 100).toFixed(1)
      : '0.0';
    const anonymousCheckoutToSignup = anonymousCheckoutStarts > 0
      ? ((totalSignups / anonymousCheckoutStarts) * 100).toFixed(1)
      : '0.0';
    const anonymousOverall = uniqueAnonymousUsers > 0
      ? ((totalSignups / uniqueAnonymousUsers) * 100).toFixed(1)
      : '0.0';

    // Calcular tasas de conversión - TOTALES (para compatibilidad)
    const visitToCheckoutRate = pricingVisits > 0 ? ((checkoutStarts / pricingVisits) * 100).toFixed(1) : '0.0';
    const checkoutToConversionRate = checkoutStarts > 0 ? ((totalConversions / checkoutStarts) * 100).toFixed(1) : '0.0';
    const overallConversionRate = pricingVisits > 0 ? ((totalConversions / pricingVisits) * 100).toFixed(1) : '0.0';

    // Desglose de eventos por tipo
    const eventBreakdown = {
      success: {
        completed_analysis: allEvents?.filter(e => e.event_type === 'completed_analysis').length || 0,
        completed_humanization: allEvents?.filter(e => e.event_type === 'completed_humanization').length || 0,
        completed_paraphrase: allEvents?.filter(e => e.event_type === 'completed_paraphrase').length || 0,
      },
      friction: {
        hit_character_limit: allEvents?.filter(e => e.event_type === 'hit_character_limit').length || 0,
        hit_daily_limit: allEvents?.filter(e => e.event_type === 'hit_daily_limit').length || 0,
        file_upload_blocked: allEvents?.filter(e => e.event_type === 'file_upload_blocked').length || 0,
        premium_mode_blocked: allEvents?.filter(e => e.event_type === 'premium_mode_blocked').length || 0,
      },
      conversion: {
        pricing_page_visited: pricingVisits,
        checkout_started: checkoutStarts,
      },
    };

    // ============================================
    // 8. HEALTH METRICS (Indie Hacker View)
    // ============================================

    // MRR Estimado (asumiendo precio promedio)
    const MONTHLY_PRICE = 9.99; // Precio mensual
    const ANNUAL_PRICE_MONTHLY = 7.99; // Precio anual dividido por 12

    // Contar usuarios premium (excluyendo usuarios de prueba internos)
    const { count: premiumUsersCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('plan_type', 'premium')
      .not('email', 'in', `(${INTERNAL_TEST_EMAILS.map(e => `"${e}"`).join(',')})`);

    const estimatedMRR = ((premiumUsersCount || 0) * MONTHLY_PRICE).toFixed(2);

    // Churn Risk: usuarios premium que no han tenido actividad en los últimos 7 días
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: recentPremiumActivity } = await supabase
      .from('analytics_events')
      .select('user_id')
      .gte('created_at', sevenDaysAgo.toISOString())
      .not('user_id', 'is', null);

    const activePremiumUsers = new Set(recentPremiumActivity?.map(e => e.user_id) || []);

    const { data: allPremiumUsers } = await supabase
      .from('users')
      .select('id')
      .eq('plan_type', 'premium')
      .not('email', 'in', `(${INTERNAL_TEST_EMAILS.map(e => `"${e}"`).join(',')})`);

    const churnRisk = allPremiumUsers?.filter(u => !activePremiumUsers.has(u.id)).length || 0;

    // ============================================
    // 9. JOURNEY INSIGHTS
    // ============================================

    // Usuarios que empezaron anónimos y luego se registraron
    const { data: signupEvents } = await supabase
      .from('analytics_events')
      .select('user_id, anonymous_id, created_at')
      .eq('event_type', 'signup')
      .gte('created_at', startDate.toISOString())
      .not('user_id', 'is', null);

    let signupsWithPriorAnonymousActivity = 0;
    let totalEngagementBeforeSignup = 0;

    if (signupEvents && signupEvents.length > 0) {
      for (const signup of signupEvents) {
        if (signup.anonymous_id) {
          // Buscar actividad anónima previa
          const { data: priorActivity } = await supabase
            .from('analytics_events')
            .select('event_type')
            .eq('anonymous_id', signup.anonymous_id)
            .is('user_id', null)
            .lt('created_at', signup.created_at);

          if (priorActivity && priorActivity.length > 0) {
            signupsWithPriorAnonymousActivity++;
            totalEngagementBeforeSignup += priorActivity.length;
          }
        }
      }
    }

    const avgEngagementBeforeSignup = signupsWithPriorAnonymousActivity > 0
      ? (totalEngagementBeforeSignup / signupsWithPriorAnonymousActivity).toFixed(1)
      : '0.0';

    const signupPathBreakdown = {
      fromAnonymous: signupsWithPriorAnonymousActivity,
      direct: totalSignups - signupsWithPriorAnonymousActivity,
      totalSignups,
    };

    // ============================================
    // 10. DROP-OFFS CRÍTICOS
    // ============================================

    // 1. Tocaron límite pero NO vieron pricing
    const { data: limitUsers } = await supabase
      .from('analytics_events')
      .select('user_id')
      .in('event_type', ['hit_character_limit', 'hit_daily_limit'])
      .gte('created_at', startDate.toISOString())
      .not('user_id', 'is', null);

    const usersHitLimitSet = new Set(limitUsers?.map(e => e.user_id) || []);

    const { data: pricingUsers } = await supabase
      .from('analytics_events')
      .select('user_id')
      .eq('event_type', 'pricing_page_visited')
      .gte('created_at', startDate.toISOString())
      .not('user_id', 'is', null);

    const usersSawPricingSet = new Set(pricingUsers?.map(e => e.user_id) || []);

    const hitLimitNoPrice = Array.from(usersHitLimitSet).filter(
      uid => !usersSawPricingSet.has(uid)
    ).length;

    // 2. Vieron pricing pero NO hicieron checkout
    const { data: checkoutUsers } = await supabase
      .from('analytics_events')
      .select('user_id')
      .eq('event_type', 'checkout_started')
      .gte('created_at', startDate.toISOString())
      .not('user_id', 'is', null);

    const usersStartedCheckoutSet = new Set(checkoutUsers?.map(e => e.user_id) || []);

    const sawPricingNoCheckout = Array.from(usersSawPricingSet).filter(
      uid => !usersStartedCheckoutSet.has(uid)
    ).length;

    // 3. Iniciaron checkout pero NO convirtieron
    const { data: convertedUsers } = await supabase
      .from('users')
      .select('id')
      .eq('plan_type', 'premium')
      .gte('created_at', startDate.toISOString());

    const convertedUsersSet = new Set(convertedUsers?.map(u => u.id) || []);

    const checkoutNoConversion = Array.from(usersStartedCheckoutSet).filter(
      uid => !convertedUsersSet.has(uid)
    ).length;

    // 4. Activos que NUNCA vieron pricing
    const { data: activeUsersAll } = await supabase
      .from('analytics_events')
      .select('user_id')
      .gte('created_at', startDate.toISOString())
      .not('user_id', 'is', null);

    const allActiveUsersSet = new Set(activeUsersAll?.map(e => e.user_id) || []);

    const activeNeverSawPricing = Array.from(allActiveUsersSet).filter(
      uid => !usersSawPricingSet.has(uid)
    ).length;

    const criticalDropoffs = {
      hitLimitNoPricing: hitLimitNoPrice,
      sawPricingNoCheckout,
      checkoutNoConversion,
      activeNeverSawPricing,
    };

    // ============================================
    // 11. HOT LEADS (Accionables de HOY)
    // ============================================

    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    // Usuarios que tocaron límite 3+ veces en últimas 24h
    const { data: recentLimitEvents } = await supabase
      .from('analytics_events')
      .select('user_id')
      .in('event_type', ['hit_character_limit', 'hit_daily_limit'])
      .gte('created_at', twentyFourHoursAgo.toISOString())
      .not('user_id', 'is', null);

    const recentLimitCounts: Record<string, number> = {};
    recentLimitEvents?.forEach(e => {
      recentLimitCounts[e.user_id] = (recentLimitCounts[e.user_id] || 0) + 1;
    });

    const heavyLimitHitters = Object.entries(recentLimitCounts)
      .filter(([_, count]) => count >= 3)
      .map(([uid]) => uid);

    // Vieron pricing pero no checkout (últimas 24h)
    const { data: recentPricingViews } = await supabase
      .from('analytics_events')
      .select('user_id')
      .eq('event_type', 'pricing_page_visited')
      .gte('created_at', twentyFourHoursAgo.toISOString())
      .not('user_id', 'is', null);

    const { data: recentCheckouts } = await supabase
      .from('analytics_events')
      .select('user_id')
      .eq('event_type', 'checkout_started')
      .gte('created_at', twentyFourHoursAgo.toISOString())
      .not('user_id', 'is', null);

    const recentPricingSet = new Set(recentPricingViews?.map(e => e.user_id) || []);
    const recentCheckoutSet = new Set(recentCheckouts?.map(e => e.user_id) || []);

    const sawPricingRecentlyNoCheckout = Array.from(recentPricingSet).filter(
      uid => !recentCheckoutSet.has(uid)
    );

    // Checkout abandonado (últimas 24h)
    const checkoutAbandonedRecently = Array.from(recentCheckoutSet).filter(
      uid => !convertedUsersSet.has(uid)
    );

    const hotLeadIds = [
      ...new Set([
        ...heavyLimitHitters,
        ...sawPricingRecentlyNoCheckout,
        ...checkoutAbandonedRecently,
      ])
    ];

    // Obtener info de estos usuarios (excluyendo usuarios de prueba internos)
    const { data: hotLeadUsers } = hotLeadIds.length > 0
      ? await supabase
          .from('users')
          .select('id, email, plan_type')
          .in('id', hotLeadIds)
          .not('email', 'in', `(${INTERNAL_TEST_EMAILS.map(e => `"${e}"`).join(',')})`)
      : { data: [] };

    const hotLeads = hotLeadUsers?.map(user => {
      let reason = '';
      let priority: 'high' | 'medium' = 'medium';

      if (checkoutAbandonedRecently.includes(user.id)) {
        reason = 'Abandonó checkout en las últimas 24h';
        priority = 'high';
      } else if (heavyLimitHitters.includes(user.id)) {
        reason = `Tocó límite ${recentLimitCounts[user.id]} veces (24h)`;
        priority = 'high';
      } else if (sawPricingRecentlyNoCheckout.includes(user.id)) {
        reason = 'Vio pricing pero no hizo checkout (24h)';
        priority = 'medium';
      }

      return {
        userId: user.id,
        email: user.email,
        plan: user.plan_type,
        reason,
        priority,
      };
    }) || [];

    // ============================================
    // RESPUESTA FINAL
    // ============================================

    return NextResponse.json({
      timeframe: `${days} días`,
      // HEALTH CHECK - Lo más importante primero
      healthMetrics: {
        estimatedMRR,
        premiumUsers: premiumUsersCount || 0,
        churnRisk,
        conversionRate: registeredOverall,
      },
      // JOURNEY INSIGHTS
      journeyInsights: {
        signupPaths: signupPathBreakdown,
        avgEngagementBeforeSignup,
        pathWinner: signupPathBreakdown.fromAnonymous > signupPathBreakdown.direct
          ? 'anonymous'
          : 'direct',
      },
      // DROP-OFFS CRÍTICOS
      criticalDropoffs,
      // HOT LEADS (últimas 24h)
      hotLeads,
      // Datos legacy (mantener compatibilidad)
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
        limitBreakdown,
        heatmapData,
        toolAnalysis,
        topPremiumModes,
      },
      opportunities,
      profiles: {
        totalProfiles: totalProfiles || 0,
        completionRate: (totalUsers || 0) > 0 ? ((totalProfiles || 0) / (totalUsers || 0) * 100).toFixed(1) : '0.0',
        topRoles,
        topPrimaryUses,
        topDiscoverySources,
      },
      conversionFunnel: {
        // Embudo para usuarios REGISTRADOS
        registered: {
          steps: {
            activeUsers: uniqueActiveUsers,
            pricingVisits: registeredPricingVisits,
            checkoutStarts: registeredCheckoutStarts,
            conversions: totalConversions,
          },
          rates: {
            visitToCheckout: registeredVisitToCheckout,
            checkoutToConversion: registeredCheckoutToConversion,
            overall: registeredOverall,
          },
        },
        // Embudo para usuarios ANÓNIMOS
        anonymous: {
          steps: {
            visitors: uniqueAnonymousUsers, // Total de visitantes anónimos activos
            pricingVisits: anonymousPricingVisits,
            checkoutStarts: anonymousCheckoutStarts,
            signups: totalSignups,
          },
          rates: {
            visitorToPricing: anonymousVisitorToPricing,
            visitToCheckout: anonymousVisitToCheckout,
            checkoutToSignup: anonymousCheckoutToSignup,
            overall: anonymousOverall,
          },
        },
        // Legacy (mantener para compatibilidad)
        steps: {
          activeUsers: uniqueActiveUsers,
          pricingVisits,
          checkoutStarts,
          conversions: totalConversions,
        },
        rates: {
          visitToCheckout: visitToCheckoutRate,
          checkoutToConversion: checkoutToConversionRate,
          overall: overallConversionRate,
        },
      },
      eventBreakdown,
    });

  } catch (error) {
    console.error('[Analytics API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
