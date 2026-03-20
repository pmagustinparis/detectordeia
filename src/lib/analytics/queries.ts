/**
 * Analytics Queries - Elite Dashboard
 * Queries optimizadas y modulares para el nuevo dashboard
 * UPDATED: 2025-11-22 14:30 - Fixed Supabase 1000 row limit (added .limit(100000))
 */

import { SupabaseClient } from '@supabase/supabase-js';
import type {
  NorthStarMetrics,
  RevenueHealth,
  ConversionFunnel,
  HotLead,
  ProductEngagement,
  CohortAnalysis,
  UserInsights,
  QueryTimeframe,
  TestUserConfig,
  ChurnRiskUser,
  FunnelStage,
  AlertPriority,
  DailyPulse,
  AcquisitionMetrics,
  RevenueMix,
} from './types';

// Test users to exclude from revenue metrics
export const TEST_USER_CONFIG: TestUserConfig = {
  emails: [
    'parisagustin@gmail.com',  // Test user free
    'buildbyagus@gmail.com'     // Test user premium
  ],
};

/**
 * Helper function to fetch all rows with pagination
 * Supabase has a hard limit of 1000 rows per query, so we need to paginate
 */
async function fetchAllEventsPaginated<T = any>(
  supabase: SupabaseClient,
  query: {
    table: string;
    select: string;
    filters?: Array<{ column: string; operator: string; value: any }>;
    order?: { column: string; ascending: boolean };
  }
): Promise<T[]> {
  let allData: T[] = [];
  let page = 0;
  const pageSize = 1000;
  let hasMore = true;

  while (hasMore) {
    let q = supabase
      .from(query.table)
      .select(query.select)
      .range(page * pageSize, (page + 1) * pageSize - 1);

    // Apply filters
    if (query.filters) {
      query.filters.forEach(filter => {
        if (filter.operator === 'gte') {
          q = q.gte(filter.column, filter.value);
        } else if (filter.operator === 'lt') {
          q = q.lt(filter.column, filter.value);
        } else if (filter.operator === 'eq') {
          q = q.eq(filter.column, filter.value);
        } else if (filter.operator === 'in') {
          q = q.in(filter.column, filter.value);
        }
      });
    }

    // Apply ordering
    if (query.order) {
      q = q.order(query.order.column, { ascending: query.order.ascending });
    }

    const { data, error } = await q;

    if (error) {
      console.error(`[Pagination] Error fetching page ${page}:`, error);
      break;
    }

    if (data && data.length > 0) {
      allData = [...allData, ...(data as T[])];
      page++;
      hasMore = data.length === pageSize;
    } else {
      hasMore = false;
    }
  }

  return allData as T[];
}

// ============================================
// HELPER: Calculate timeframe dates
// ============================================

export function getQueryTimeframe(days: number): QueryTimeframe {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const previousPeriodStart = new Date(startDate);
  previousPeriodStart.setDate(previousPeriodStart.getDate() - days);

  return {
    days,
    startDate,
    endDate,
    previousPeriodStart,
  };
}

// ============================================
// 1. NORTH STAR METRICS
// ============================================

export async function fetchNorthStarMetrics(
  supabase: SupabaseClient,
  timeframe: QueryTimeframe
): Promise<NorthStarMetrics> {
  // MRR Calculation
  const { data: premiumUsers } = await supabase
    .from('users')
    .select('email, created_at')
    .eq('plan_type', 'premium')
    .not('email', 'in', `(${TEST_USER_CONFIG.emails.map(e => `"${e}"`).join(',')})`);

  const currentMRR = (premiumUsers?.length || 0) * 9.99;

  // Previous period MRR for trend
  const { data: premiumUsersPrevious } = await supabase
    .from('users')
    .select('email')
    .eq('plan_type', 'premium')
    .not('email', 'in', `(${TEST_USER_CONFIG.emails.map(e => `"${e}"`).join(',')})`)
    .lte('created_at', timeframe.startDate.toISOString());

  const previousMRR = (premiumUsersPrevious?.length || 0) * 9.99;
  const mrrTrend = previousMRR > 0 ? ((currentMRR - previousMRR) / previousMRR) * 100 : 0;

  // New MRR (users who became premium in this period)
  const { data: newPremiumUsers } = await supabase
    .from('users')
    .select('id')
    .eq('plan_type', 'premium')
    .gte('created_at', timeframe.startDate.toISOString())
    .not('email', 'in', `(${TEST_USER_CONFIG.emails.map(e => `"${e}"`).join(',')})`);

  const newMRR = (newPremiumUsers?.length || 0) * 9.99;

  // Churned MRR (simplified - would need subscription table for real churn)
  const churnedMRR = previousMRR > currentMRR ? previousMRR - currentMRR : 0;

  // Active Users - using pagination helper
  console.log(`[Analytics Debug] Fetching active users from ${timeframe.startDate.toISOString()}`);

  const activeUsersData = await fetchAllEventsPaginated<{ user_id: string | null; anonymous_id: string | null }>(
    supabase,
    {
      table: 'analytics_events',
      select: 'user_id, anonymous_id',
      filters: [
        { column: 'created_at', operator: 'gte', value: timeframe.startDate.toISOString() }
      ],
      order: { column: 'created_at', ascending: true }
    }
  );

  console.log(`[Analytics Debug] Fetched ${activeUsersData.length} events`);

  const registeredActiveUsers = new Set(
    activeUsersData?.filter(e => e.user_id).map(e => e.user_id) || []
  ).size;

  const anonymousActiveUsers = new Set(
    activeUsersData?.filter(e => !e.user_id && e.anonymous_id).map(e => e.anonymous_id) || []
  ).size;

  const totalActiveUsers = registeredActiveUsers + anonymousActiveUsers;

  console.log(`[Analytics Debug] Active users - Registered: ${registeredActiveUsers}, Anonymous: ${anonymousActiveUsers}, Total: ${totalActiveUsers}`);

  // Previous period active users - using pagination helper
  const activeUsersPreviousData = await fetchAllEventsPaginated<{ user_id: string | null; anonymous_id: string | null }>(
    supabase,
    {
      table: 'analytics_events',
      select: 'user_id, anonymous_id',
      filters: [
        { column: 'created_at', operator: 'gte', value: timeframe.previousPeriodStart.toISOString() },
        { column: 'created_at', operator: 'lt', value: timeframe.startDate.toISOString() }
      ],
      order: { column: 'created_at', ascending: true }
    }
  );

  const previousActiveUsers =
    new Set(activeUsersPreviousData?.filter(e => e.user_id).map(e => e.user_id) || []).size +
    new Set(activeUsersPreviousData?.filter(e => !e.user_id && e.anonymous_id).map(e => e.anonymous_id) || []).size;

  const activeUsersTrend = previousActiveUsers > 0
    ? ((totalActiveUsers - previousActiveUsers) / previousActiveUsers) * 100
    : 0;

  // Conversion Rate
  const { count: totalRegistered } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true });

  const testUsersCount = TEST_USER_CONFIG.emails.length;
  const denominator = (totalRegistered || 0) - testUsersCount;
  const conversionRate = denominator > 0
    ? ((premiumUsers?.length || 0) / denominator) * 100
    : 0;

  // Previous conversion for trend
  const { count: totalRegisteredPrevious } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .lte('created_at', timeframe.startDate.toISOString());

  const denominatorPrevious = (totalRegisteredPrevious || 0) - testUsersCount;
  const previousConversionRate = denominatorPrevious > 0
    ? ((premiumUsersPrevious?.length || 0) / denominatorPrevious) * 100
    : 0;

  const conversionTrend = previousConversionRate > 0
    ? ((conversionRate - previousConversionRate) / previousConversionRate) * 100
    : 0;

  return {
    mrr: {
      current: currentMRR,
      trend: mrrTrend,
      newMRR,
      churnedMRR,
      netGrowth: newMRR - churnedMRR,
    },
    activeUsers: {
      total: totalActiveUsers,
      trend: activeUsersTrend,
      registered: registeredActiveUsers,
      anonymous: anonymousActiveUsers,
    },
    conversionRate: {
      rate: conversionRate,
      trend: conversionTrend,
      numerator: premiumUsers?.length || 0,
      denominator,
    },
  };
}

// ============================================
// 2. REVENUE HEALTH
// ============================================

export async function fetchRevenueHealth(
  supabase: SupabaseClient,
  timeframe: QueryTimeframe
): Promise<RevenueHealth> {
  const PRO_PRICE = 12.99; // Updated pricing
  const EXPRESS_PRICE = 3.99;

  // Get all premium users
  const { data: premiumUsers } = await supabase
    .from('users')
    .select('id, email, created_at')
    .eq('plan_type', 'premium')
    .not('email', 'in', `(${TEST_USER_CONFIG.emails.map(e => `"${e}"`).join(',')})`);

  const totalMRR = (premiumUsers?.length || 0) * PRO_PRICE;

  // New premium users this period
  const newPremiumUsers = premiumUsers?.filter(
    u => new Date(u.created_at) >= timeframe.startDate
  ) || [];
  const newMRR = newPremiumUsers.length * PRO_PRICE;

  // Churned MRR (users who downgraded/cancelled)
  // For now, simplified - would need subscription status table
  const churnedMRR = 0;
  const expansionMRR = 0;
  const contractionMRR = 0;

  // ============================================
  // EXPRESS METRICS
  // ============================================

  // Active Express passes right now
  const { data: activeExpressUsers } = await supabase
    .from('users')
    .select('id, express_expires_at')
    .not('express_expires_at', 'is', null)
    .gte('express_expires_at', new Date().toISOString());

  const activePasses = activeExpressUsers?.length || 0;

  // Express purchases this period (check for express_expires_at set in this timeframe)
  // Since we don't have a purchases table, we approximate by counting users whose
  // express_expires_at falls within the timeframe
  const { data: expressPurchasesInPeriod } = await supabase
    .from('users')
    .select('id, express_expires_at')
    .not('express_expires_at', 'is', null)
    .gte('express_expires_at', timeframe.startDate.toISOString());

  const newExpressPurchases = expressPurchasesInPeriod?.length || 0;
  const expressRevenue = newExpressPurchases * EXPRESS_PRICE;

  // Average duration used (simplified - assumes 12h average usage out of 24h)
  // Would need analytics events to calculate actual usage
  const avgDuration = 12;

  // Churn Risk: Premium users with no activity in last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentActivity = await fetchAllEventsPaginated<{ user_id: string }>(
    supabase,
    {
      table: 'analytics_events',
      select: 'user_id',
      filters: [
        { column: 'created_at', operator: 'gte', value: sevenDaysAgo.toISOString() }
      ]
    }
  );

  const activeUserIds = new Set(recentActivity?.filter(e => e.user_id).map(e => e.user_id) || []);

  const churnRiskUsers: ChurnRiskUser[] = [];
  for (const user of premiumUsers || []) {
    if (!activeUserIds.has(user.id)) {
      // Get last activity
      const { data: lastActivity } = await supabase
        .from('analytics_events')
        .select('created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      const lastActivityDate = lastActivity?.[0]?.created_at || user.created_at;
      const daysSince = Math.floor(
        (Date.now() - new Date(lastActivityDate).getTime()) / (1000 * 60 * 60 * 24)
      );

      // Get total events for this user
      const { count: totalEvents } = await supabase
        .from('analytics_events')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      churnRiskUsers.push({
        userId: user.id,
        email: user.email,
        daysSinceLastActivity: daysSince,
        lastActivityDate,
        totalEvents: totalEvents || 0,
      });
    }
  }

  const churnPercentage = premiumUsers?.length
    ? (churnRiskUsers.length / premiumUsers.length) * 100
    : 0;

  // LTV calculation (simplified)
  // Average months subscribed * MRR per user
  const averageMonthsSubscribed = 6; // Placeholder - would need actual subscription data
  const averageLTV = averageMonthsSubscribed * PRO_PRICE;

  return {
    mrrBreakdown: {
      total: totalMRR,
      new: newMRR,
      expansion: expansionMRR,
      contraction: contractionMRR,
      churned: churnedMRR,
      netGrowth: newMRR + expansionMRR - contractionMRR - churnedMRR,
    },
    expressMetrics: {
      activePasses,
      totalRevenue: expressRevenue,
      newPurchases: newExpressPurchases,
      avgDuration,
    },
    churnMetrics: {
      count: churnRiskUsers.length,
      percentage: churnPercentage,
      users: churnRiskUsers.slice(0, 10), // Top 10 at risk
    },
    ltv: {
      average: averageLTV,
      byPlan: {
        free: 0,
        premium: averageLTV,
      },
    },
  };
}

// ============================================
// 3. CONVERSION FUNNEL
// ============================================

export async function fetchConversionFunnel(
  supabase: SupabaseClient,
  timeframe: QueryTimeframe
): Promise<ConversionFunnel> {
  // Registered Users Funnel
  const { data: registeredUsers } = await supabase
    .from('users')
    .select('id')
    .gte('created_at', timeframe.startDate.toISOString());

  const registeredUserIds = registeredUsers?.map(u => u.id) || [];

  // Active registered users (had any event in period) - using pagination
  const activeEvents = await fetchAllEventsPaginated<{ user_id: string }>(
    supabase,
    {
      table: 'analytics_events',
      select: 'user_id',
      filters: [
        { column: 'user_id', operator: 'in', value: registeredUserIds },
        { column: 'created_at', operator: 'gte', value: timeframe.startDate.toISOString() }
      ]
    }
  );

  const activeUserIds = new Set(activeEvents?.map(e => e.user_id) || []);
  const activeUsersCount = activeUserIds.size;

  // Visited pricing - using pagination
  const pricingVisits = await fetchAllEventsPaginated<{ user_id: string }>(
    supabase,
    {
      table: 'analytics_events',
      select: 'user_id',
      filters: [
        { column: 'user_id', operator: 'in', value: registeredUserIds },
        { column: 'event_type', operator: 'eq', value: 'pricing_page_visited' },
        { column: 'created_at', operator: 'gte', value: timeframe.startDate.toISOString() }
      ]
    }
  );

  const pricingVisitorIds = new Set(pricingVisits?.map(e => e.user_id) || []);
  const pricingVisitsCount = pricingVisitorIds.size;

  // Started checkout - using pagination
  const checkouts = await fetchAllEventsPaginated<{ user_id: string }>(
    supabase,
    {
      table: 'analytics_events',
      select: 'user_id',
      filters: [
        { column: 'user_id', operator: 'in', value: registeredUserIds },
        { column: 'event_type', operator: 'eq', value: 'checkout_started' },
        { column: 'created_at', operator: 'gte', value: timeframe.startDate.toISOString() }
      ]
    }
  );

  const checkoutUserIds = new Set(checkouts?.map(e => e.user_id) || []);
  const checkoutsCount = checkoutUserIds.size;

  // Converted to premium
  const { data: premiumUsers } = await supabase
    .from('users')
    .select('id')
    .eq('plan_type', 'premium')
    .in('id', registeredUserIds);

  const premiumCount = premiumUsers?.length || 0;

  const registeredFunnel: FunnelStage[] = [
    {
      stage: 'Active Users',
      users: activeUsersCount,
    },
    {
      stage: 'Visited Pricing',
      users: pricingVisitsCount,
      conversionFromPrevious: activeUsersCount > 0
        ? (pricingVisitsCount / activeUsersCount) * 100
        : 0,
      dropoffFromPrevious: activeUsersCount - pricingVisitsCount,
    },
    {
      stage: 'Started Checkout',
      users: checkoutsCount,
      conversionFromPrevious: pricingVisitsCount > 0
        ? (checkoutsCount / pricingVisitsCount) * 100
        : 0,
      dropoffFromPrevious: pricingVisitsCount - checkoutsCount,
    },
    {
      stage: 'Converted to Premium',
      users: premiumCount,
      conversionFromPrevious: checkoutsCount > 0
        ? (premiumCount / checkoutsCount) * 100
        : 0,
      dropoffFromPrevious: checkoutsCount - premiumCount,
    },
  ];

  // Anonymous Funnel - using pagination
  const anonymousEvents = await fetchAllEventsPaginated<{ anonymous_id: string }>(
    supabase,
    {
      table: 'analytics_events',
      select: 'anonymous_id',
      filters: [
        { column: 'created_at', operator: 'gte', value: timeframe.startDate.toISOString() }
      ]
    }
  );

  const uniqueAnonymousIds = new Set(
    anonymousEvents?.filter(e => !e.anonymous_id && e.anonymous_id).map(e => e.anonymous_id) || []
  );
  const totalAnonymous = uniqueAnonymousIds.size;

  // Anonymous pricing visits - using pagination
  const anonymousPricing = await fetchAllEventsPaginated<{ anonymous_id: string }>(
    supabase,
    {
      table: 'analytics_events',
      select: 'anonymous_id',
      filters: [
        { column: 'event_type', operator: 'eq', value: 'pricing_page_visited' },
        { column: 'created_at', operator: 'gte', value: timeframe.startDate.toISOString() }
      ]
    }
  );

  const anonymousPricingCount = new Set(
    anonymousPricing?.filter(e => e.anonymous_id).map(e => e.anonymous_id) || []
  ).size;

  // Anonymous checkouts (rare but possible) - using pagination
  const anonymousCheckouts = await fetchAllEventsPaginated<{ anonymous_id: string }>(
    supabase,
    {
      table: 'analytics_events',
      select: 'anonymous_id',
      filters: [
        { column: 'event_type', operator: 'eq', value: 'checkout_started' },
        { column: 'created_at', operator: 'gte', value: timeframe.startDate.toISOString() }
      ]
    }
  );

  const anonymousCheckoutsCount = new Set(
    anonymousCheckouts?.filter(e => e.anonymous_id).map(e => e.anonymous_id) || []
  ).size;

  // Anonymous signups
  const signupEvents = await fetchAllEventsPaginated<{ anonymous_id: string }>(
    supabase,
    {
      table: 'analytics_events',
      select: 'anonymous_id',
      filters: [
        { column: 'event_type', operator: 'eq', value: 'signup' },
        { column: 'created_at', operator: 'gte', value: timeframe.startDate.toISOString() }
      ]
    }
  );

  const signupsCount = new Set(signupEvents?.filter(e => e.anonymous_id).map(e => e.anonymous_id) || []).size;

  const anonymousFunnel: FunnelStage[] = [
    {
      stage: 'Anonymous Visitors',
      users: totalAnonymous,
      conversionFromPrevious: 100,
      dropoffFromPrevious: 0,
    },
    {
      stage: 'Visited Pricing',
      users: anonymousPricingCount,
      conversionFromPrevious: totalAnonymous > 0 ? (anonymousPricingCount / totalAnonymous) * 100 : 0,
      dropoffFromPrevious: totalAnonymous - anonymousPricingCount,
    },
    {
      stage: 'Started Checkout',
      users: anonymousCheckoutsCount,
      conversionFromPrevious: anonymousPricingCount > 0 ? (anonymousCheckoutsCount / anonymousPricingCount) * 100 : 0,
      dropoffFromPrevious: anonymousPricingCount - anonymousCheckoutsCount,
    },
    {
      stage: 'Signed Up',
      users: signupsCount,
      conversionFromPrevious: anonymousCheckoutsCount > 0 ? (signupsCount / anonymousCheckoutsCount) * 100 : 0,
      dropoffFromPrevious: anonymousCheckoutsCount - signupsCount,
    },
  ];

  return {
    registered: registeredFunnel,
    anonymous: anonymousFunnel,
    byTool: {}, // TODO: Implement tool-specific funnels if needed
  };
}

// ============================================
// 4. HOT LEADS
// ============================================

export async function fetchHotLeads(
  supabase: SupabaseClient,
  timeframe: QueryTimeframe
): Promise<HotLead[]> {
  const leads: HotLead[] = [];
  const last24h = new Date();
  last24h.setHours(last24h.getHours() - 24);

  // 1. HIGH PRIORITY: Users who hit limits multiple times in last 24h - using pagination
  const limitHits = await fetchAllEventsPaginated<{ user_id: string; anonymous_id: string; event_type: string }>(
    supabase,
    {
      table: 'analytics_events',
      select: 'user_id, anonymous_id, event_type',
      filters: [
        { column: 'event_type', operator: 'in', value: ['hit_daily_limit', 'hit_character_limit'] },
        { column: 'created_at', operator: 'gte', value: last24h.toISOString() }
      ]
    }
  );

  const limitHitCounts: Record<string, number> = {};
  limitHits?.forEach(event => {
    const key = event.user_id || event.anonymous_id;
    if (key) {
      limitHitCounts[key] = (limitHitCounts[key] || 0) + 1;
    }
  });

  for (const [userId, count] of Object.entries(limitHitCounts)) {
    if (count >= 3) {
      // Get user info
      const { data: user } = await supabase
        .from('users')
        .select('email, full_name, plan_type')
        .eq('id', userId)
        .single();

      if (user) {
        leads.push({
          userId,
          email: user.email,
          name: user.full_name,
          plan: user.plan_type || 'free',
          alertType: 'frequent_limit_hits',
          priority: 'high',
          reason: `Hit limits ${count} times in last 24h`,
          actionable: 'Send upgrade email highlighting unlimited plan benefits',
          metadata: {
            limitHitsLast24h: count,
            lastEventDate: new Date().toISOString(),
          },
        });
      }
    }
  }

  // 2. MEDIUM PRIORITY: Saw pricing multiple times but didn't checkout
  const { data: pricingVisits } = await supabase
    .from('analytics_events')
    .select('user_id, created_at')
    .eq('event_type', 'pricing_page_visited')
    .not('user_id', 'is', null)
    .gte('created_at', timeframe.startDate.toISOString());

  const pricingVisitCounts: Record<string, number> = {};
  pricingVisits?.forEach(event => {
    if (event.user_id) {
      pricingVisitCounts[event.user_id] = (pricingVisitCounts[event.user_id] || 0) + 1;
    }
  });

  for (const [userId, count] of Object.entries(pricingVisitCounts)) {
    if (count >= 3) {
      // Check if they started checkout
      const { data: checkout } = await supabase
        .from('analytics_events')
        .select('id')
        .eq('user_id', userId)
        .eq('event_type', 'checkout_started')
        .limit(1);

      if (!checkout || checkout.length === 0) {
        const { data: user } = await supabase
          .from('users')
          .select('email, full_name, plan_type')
          .eq('id', userId)
          .single();

        if (user && user.plan_type === 'free') {
          leads.push({
            userId,
            email: user.email,
            name: user.full_name,
            plan: 'free',
            alertType: 'ready_to_convert',
            priority: 'medium',
            reason: `Viewed pricing ${count} times but hasn't started checkout`,
            actionable: 'Send personalized email asking if they have questions',
            metadata: {
              pricingVisits: count,
            },
          });
        }
      }
    }
  }

  // 3. HIGH PRIORITY: Premium users with no activity in 7+ days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data: premiumUsers } = await supabase
    .from('users')
    .select('id, email, full_name')
    .eq('plan_type', 'premium')
    .not('email', 'in', `(${TEST_USER_CONFIG.emails.map(e => `"${e}"`).join(',')})`);

  for (const user of premiumUsers || []) {
    const { data: recentActivity } = await supabase
      .from('analytics_events')
      .select('created_at')
      .eq('user_id', user.id)
      .gte('created_at', sevenDaysAgo.toISOString())
      .limit(1);

    if (!recentActivity || recentActivity.length === 0) {
      // Get last activity date
      const { data: lastActivity } = await supabase
        .from('analytics_events')
        .select('created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      const lastActivityDate = lastActivity?.[0]?.created_at;
      const daysSince = lastActivityDate
        ? Math.floor((Date.now() - new Date(lastActivityDate).getTime()) / (1000 * 60 * 60 * 24))
        : 999;

      leads.push({
        userId: user.id,
        email: user.email,
        name: user.full_name,
        plan: 'premium',
        alertType: 'churn_risk',
        priority: 'high',
        reason: `No activity in ${daysSince} days`,
        actionable: 'Send re-engagement email or cancel alert',
        metadata: {
          daysSinceLastActivity: daysSince,
          lastEventDate: lastActivityDate,
        },
      });
    }
  }

  // Sort by priority
  const priorityOrder: Record<AlertPriority, number> = {
    high: 1,
    medium: 2,
    low: 3,
  };

  return leads.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}

// ============================================
// 5. PRODUCT ENGAGEMENT
// ============================================

export async function fetchProductEngagement(
  supabase: SupabaseClient,
  timeframe: QueryTimeframe
): Promise<ProductEngagement> {
  // Tool Usage Stats
  const toolTypes = ['detector', 'humanizador', 'parafraseador'];
  const toolUsage: ProductEngagement['toolUsage'] = [];

  for (const toolType of toolTypes) {
    const events = await fetchAllEventsPaginated<{ user_id: string; anonymous_id: string }>(
      supabase,
      {
        table: 'analytics_events',
        select: 'user_id, anonymous_id',
        filters: [
          { column: 'tool_type', operator: 'eq', value: toolType },
          { column: 'event_type', operator: 'in', value: ['completed_analysis', 'completed_humanization', 'completed_paraphrase'] },
          { column: 'created_at', operator: 'gte', value: timeframe.startDate.toISOString() }
        ]
      }
    );

    const totalUses = events?.length || 0;
    const uniqueUsers = new Set(
      events?.map(e => e.user_id || e.anonymous_id).filter(Boolean) || []
    ).size;

    // Previous period for trend - using pagination
    const previousEvents = await fetchAllEventsPaginated<{ id: string }>(
      supabase,
      {
        table: 'analytics_events',
        select: 'id',
        filters: [
          { column: 'tool_type', operator: 'eq', value: toolType },
          { column: 'event_type', operator: 'in', value: ['completed_analysis', 'completed_humanization', 'completed_paraphrase'] },
          { column: 'created_at', operator: 'gte', value: timeframe.previousPeriodStart.toISOString() },
          { column: 'created_at', operator: 'lt', value: timeframe.startDate.toISOString() }
        ]
      }
    );

    const previousUses = previousEvents?.length || 0;
    const trend = previousUses > 0 ? ((totalUses - previousUses) / previousUses) * 100 : 0;

    toolUsage.push({
      toolName: toolType.charAt(0).toUpperCase() + toolType.slice(1),
      totalUses,
      uniqueUsers,
      averageUsesPerUser: uniqueUsers > 0 ? totalUses / uniqueUsers : 0,
      trend,
    });
  }

  // Mode Usage (for humanizador and parafraseador)
  const { data: modeEvents } = await supabase
    .from('analytics_events')
    .select('tool_type, metadata, user_id, anonymous_id')
    .in('tool_type', ['humanizador', 'parafraseador'])
    .in('event_type', ['completed_humanization', 'completed_paraphrase'])
    .gte('created_at', timeframe.startDate.toISOString());

  const modeUsageMap: Record<string, { uses: number; users: Set<string> }> = {};
  modeEvents?.forEach(event => {
    const mode = event.metadata?.mode as string;
    if (mode) {
      const key = `${event.tool_type}-${mode}`;
      if (!modeUsageMap[key]) {
        modeUsageMap[key] = { uses: 0, users: new Set() };
      }
      modeUsageMap[key].uses++;
      const userId = event.user_id || event.anonymous_id;
      if (userId) modeUsageMap[key].users.add(userId);
    }
  });

  const modeUsage: ProductEngagement['modeUsage'] = Object.entries(modeUsageMap).map(
    ([key, data]) => {
      const [toolType, mode] = key.split('-');
      return {
        mode,
        toolType,
        uses: data.uses,
        uniqueUsers: data.users.size,
      };
    }
  ).sort((a, b) => b.uses - a.uses);

  // Feature Requests (blocked premium modes)
  const { data: blockedEvents } = await supabase
    .from('analytics_events')
    .select('event_type, tool_type, metadata, user_id, anonymous_id')
    .in('event_type', ['premium_mode_blocked', 'file_upload_blocked'])
    .gte('created_at', timeframe.startDate.toISOString());

  const featureRequestMap: Record<string, { count: number; users: Set<string> }> = {};
  blockedEvents?.forEach(event => {
    let feature = '';
    if (event.event_type === 'file_upload_blocked') {
      feature = 'File Upload';
    } else if (event.event_type === 'premium_mode_blocked') {
      const mode = event.metadata?.mode as string;
      feature = mode ? `Premium Mode: ${mode}` : 'Premium Mode';
    }

    const key = `${event.tool_type}-${feature}`;
    if (!featureRequestMap[key]) {
      featureRequestMap[key] = { count: 0, users: new Set() };
    }
    featureRequestMap[key].count++;
    const userId = event.user_id || event.anonymous_id;
    if (userId) featureRequestMap[key].users.add(userId);
  });

  const featureRequests: ProductEngagement['featureRequests'] = Object.entries(
    featureRequestMap
  ).map(([key, data]) => {
    const [toolType, feature] = key.split('-');
    // Calculate priority (1-5) based on frequency
    const priority = Math.min(5, Math.ceil(data.count / 10));
    return {
      feature,
      toolType,
      blockCount: data.count,
      uniqueUsers: data.users.size,
      priority,
    };
  }).sort((a, b) => b.blockCount - a.blockCount);

  // Engagement Trend (daily events in period)
  const { data: allEvents } = await supabase
    .from('analytics_events')
    .select('created_at, user_id, anonymous_id')
    .gte('created_at', timeframe.startDate.toISOString());

  const dailyMap: Record<string, { events: number; users: Set<string> }> = {};
  allEvents?.forEach(event => {
    const date = new Date(event.created_at).toISOString().split('T')[0];
    if (!dailyMap[date]) {
      dailyMap[date] = { events: 0, users: new Set() };
    }
    dailyMap[date].events++;
    const userId = event.user_id || event.anonymous_id;
    if (userId) dailyMap[date].users.add(userId);
  });

  const engagementTrend = Object.entries(dailyMap)
    .map(([date, data]) => ({
      date,
      events: data.events,
      users: data.users.size,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    toolUsage,
    modeUsage,
    featureRequests,
    engagementTrend,
  };
}

// ============================================
// 6. COHORT ANALYSIS
// ============================================

export async function fetchCohortAnalysis(
  supabase: SupabaseClient,
  timeframe: QueryTimeframe
): Promise<CohortAnalysis> {
  // Get all users grouped by signup week
  const { data: users } = await supabase
    .from('users')
    .select('id, created_at')
    .gte('created_at', timeframe.startDate.toISOString())
    .order('created_at', { ascending: true });

  if (!users || users.length === 0) {
    return { cohorts: [], retentionHeatmap: [] };
  }

  // Group users by week
  const cohortMap: Record<string, string[]> = {};
  users.forEach(user => {
    const date = new Date(user.created_at);
    // Get Monday of the week
    const dayOfWeek = date.getDay();
    const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(date.setDate(diff));
    const weekKey = monday.toISOString().split('T')[0];

    if (!cohortMap[weekKey]) {
      cohortMap[weekKey] = [];
    }
    cohortMap[weekKey].push(user.id);
  });

  // Calculate retention for each cohort
  const cohorts: CohortAnalysis['cohorts'] = [];
  const now = new Date();

  for (const [weekKey, userIds] of Object.entries(cohortMap)) {
    const cohortStart = new Date(weekKey);
    const weeksElapsed = Math.floor((now.getTime() - cohortStart.getTime()) / (7 * 24 * 60 * 60 * 1000));

    const retention: CohortAnalysis['cohorts'][0]['retention'] = [];

    for (let week = 0; week <= Math.min(weeksElapsed, 12); week++) {
      const weekStart = new Date(cohortStart);
      weekStart.setDate(weekStart.getDate() + (week * 7));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);

      // Count active users in this week
      const { data: activeUsers } = await supabase
        .from('analytics_events')
        .select('user_id')
        .in('user_id', userIds)
        .gte('created_at', weekStart.toISOString())
        .lt('created_at', weekEnd.toISOString());

      const activeCount = new Set(activeUsers?.map(e => e.user_id) || []).size;
      const retentionRate = (activeCount / userIds.length) * 100;

      retention.push({
        weekNumber: week,
        activeUsers: activeCount,
        retentionRate,
      });
    }

    cohorts.push({
      cohortDate: weekKey,
      size: userIds.length,
      retention,
    });
  }

  // Create retention heatmap (matrix for visualization)
  const maxWeeks = Math.max(...cohorts.map(c => c.retention.length));
  const retentionHeatmap: number[][] = cohorts.map(cohort => {
    const row: number[] = [];
    for (let i = 0; i < maxWeeks; i++) {
      row.push(cohort.retention[i]?.retentionRate || 0);
    }
    return row;
  });

  return {
    cohorts: cohorts.reverse(), // Most recent first
    retentionHeatmap,
  };
}

// ============================================
// 7. USER INSIGHTS
// ============================================

export async function fetchUserInsights(
  supabase: SupabaseClient,
  timeframe: QueryTimeframe
): Promise<UserInsights> {
  // Demographics from user_profiles
  const { data: profiles } = await supabase
    .from('user_profiles')
    .select('role, primary_use, discovery_source');

  const totalProfiles = profiles?.length || 0;

  // Count by role
  const byRole: Record<string, number> = {};
  profiles?.forEach(p => {
    if (p.role) {
      byRole[p.role] = (byRole[p.role] || 0) + 1;
    }
  });

  // Count by primary use
  const byPrimaryUse: Record<string, number> = {};
  profiles?.forEach(p => {
    if (p.primary_use) {
      byPrimaryUse[p.primary_use] = (byPrimaryUse[p.primary_use] || 0) + 1;
    }
  });

  // Count by discovery source
  const byDiscoverySource: Record<string, number> = {};
  profiles?.forEach(p => {
    if (p.discovery_source) {
      byDiscoverySource[p.discovery_source] = (byDiscoverySource[p.discovery_source] || 0) + 1;
    }
  });

  // Total users for completion rate
  const { count: totalUsers } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true });

  const completionRate = totalUsers ? (totalProfiles / totalUsers) * 100 : 0;

  // Top Users (most active)
  const { data: eventCounts } = await supabase
    .from('analytics_events')
    .select('user_id, created_at')
    .not('user_id', 'is', null)
    .gte('created_at', timeframe.startDate.toISOString());

  const userEventMap: Record<string, number> = {};
  eventCounts?.forEach(e => {
    if (e.user_id) {
      userEventMap[e.user_id] = (userEventMap[e.user_id] || 0) + 1;
    }
  });

  const topUserIds = Object.entries(userEventMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([id]) => id);

  const { data: topUsersData } = await supabase
    .from('users')
    .select('id, email, full_name, plan_type, created_at')
    .in('id', topUserIds);

  const topUsers: UserInsights['topUsers'] = topUsersData?.map(user => {
    const eventCount = userEventMap[user.id] || 0;
    const daysSinceSignup = Math.floor(
      (Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24)
    );
    const isTestUser = TEST_USER_CONFIG.emails.includes(user.email);

    // Get last event date
    const lastEvent = eventCounts?.filter(e => e.user_id === user.id).sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0];

    return {
      userId: user.id,
      email: user.email,
      name: user.full_name,
      plan: user.plan_type || 'free',
      eventCount,
      lastEventDate: lastEvent?.created_at || user.created_at,
      daysSinceSignup,
      isTestUser,
    };
  }).sort((a, b) => b.eventCount - a.eventCount) || [];

  // Recent Signups
  const { data: recentSignups } = await supabase
    .from('users')
    .select('id, email, full_name, created_at')
    .gte('created_at', timeframe.startDate.toISOString())
    .order('created_at', { ascending: false })
    .limit(20);

  const recentSignupsData: UserInsights['recentSignups'] = [];
  for (const user of recentSignups || []) {
    // Get signup event
    const { data: signupEvent } = await supabase
      .from('analytics_events')
      .select('metadata')
      .eq('event_type', 'signup')
      .eq('user_id', user.id)
      .limit(1);

    const metadata = signupEvent?.[0]?.metadata;
    const hadPriorActivity = metadata?.hadPriorAnonymousActivity || false;

    // Count events before signup (if anonymous)
    let eventsBeforeSignup = 0;
    if (hadPriorActivity && metadata?.anonymousId) {
      const { count } = await supabase
        .from('analytics_events')
        .select('*', { count: 'exact', head: true })
        .eq('anonymous_id', metadata.anonymousId)
        .is('user_id', null)
        .lt('created_at', user.created_at);
      eventsBeforeSignup = count || 0;
    }

    // Count events after signup
    const { count: eventsSinceSignup } = await supabase
      .from('analytics_events')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    recentSignupsData.push({
      userId: user.id,
      email: user.email,
      name: user.full_name,
      signupDate: user.created_at,
      signupMethod: metadata?.method || 'unknown',
      hadPriorActivity,
      eventsBeforeSignup,
      eventsSinceSignup: eventsSinceSignup || 0,
    });
  }

  // Calculate conversion rate by role
  const { data: usersWithProfiles } = await supabase
    .from('users')
    .select('id, auth_id, email, plan_type');

  const { data: allProfiles } = await supabase
    .from('user_profiles')
    .select('user_id, role');

  const conversionByRole: Record<string, { totalUsers: number; premiumUsers: number; conversionRate: number }> = {};

  // Create a map of user_id to role
  const userRoleMap: Record<string, string> = {};
  allProfiles?.forEach(p => {
    if (p.role) {
      userRoleMap[p.user_id] = p.role;
    }
  });

  // Count total and premium users by role
  usersWithProfiles?.forEach(user => {
    const role = userRoleMap[user.auth_id];
    if (role && !TEST_USER_CONFIG.emails.includes(user.email)) {
      if (!conversionByRole[role]) {
        conversionByRole[role] = { totalUsers: 0, premiumUsers: 0, conversionRate: 0 };
      }
      conversionByRole[role].totalUsers += 1;
      if (user.plan_type === 'premium') {
        conversionByRole[role].premiumUsers += 1;
      }
    }
  });

  // Calculate conversion rates
  Object.keys(conversionByRole).forEach(role => {
    const data = conversionByRole[role];
    data.conversionRate = data.totalUsers > 0
      ? (data.premiumUsers / data.totalUsers) * 100
      : 0;
  });

  return {
    demographics: {
      totalProfiles,
      completionRate,
      byRole,
      byPrimaryUse,
      byDiscoverySource,
    },
    conversionByRole,
    topUsers,
    recentSignups: recentSignupsData,
  };
}

// ============================================
// 8. ALL REGISTERED USERS
// ============================================

export interface RegisteredUser {
  id: string;
  email: string;
  fullName?: string;
  planType: 'free' | 'premium';
  createdAt: string;
  lastActivity?: string;
  totalUses?: number;
  isTestUser?: boolean;
}

export async function getAllRegisteredUsers(
  supabase: SupabaseClient
): Promise<RegisteredUser[]> {
  // Get all users
  const { data: users, error } = await supabase
    .from('users')
    .select('id, auth_id, email, full_name, plan_type, created_at')
    .order('created_at', { ascending: false });

  if (error || !users) {
    console.error('Error fetching registered users:', error);
    return [];
  }

  // For each user, get usage stats and profile data
  const usersWithStats = await Promise.all(
    users.map(async (user) => {
      // Check if test user
      const isTestUser = TEST_USER_CONFIG.emails.includes(user.email);

      // Count total uses
      const { count } = await supabase
        .from('analytics_events')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .in('event_type', [
          'completed_analysis',
          'completed_humanization',
          'completed_paraphrase',
        ]);

      // Get last activity
      const { data: lastEvent } = await supabase
        .from('analytics_events')
        .select('created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      // Get user profile data
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('role, primary_use, discovery_source')
        .eq('user_id', user.auth_id)
        .maybeSingle();

      // Log profile errors for debugging
      if (profileError) {
        console.error(`Error fetching profile for user ${user.email}:`, profileError);
      }

      return {
        id: user.id,
        email: user.email,
        fullName: user.full_name || undefined,
        planType: (user.plan_type as 'free' | 'premium') || 'free',
        createdAt: user.created_at,
        lastActivity: lastEvent?.[0]?.created_at || undefined,
        totalUses: count || 0,
        isTestUser,
        // Profile data
        role: profile?.role || undefined,
        primaryUse: profile?.primary_use || undefined,
        discoverySource: profile?.discovery_source || undefined,
      };
    })
  );

  return usersWithStats;
}

// ============================================
// 9. DAILY PULSE
// ============================================

export async function fetchDailyPulse(
  supabase: SupabaseClient
): Promise<DailyPulse> {
  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);

  const yesterdayEnd = new Date(todayStart);

  // ---- Revenue / paying users today ----
  // New premium signups today
  const { data: newPremiumToday } = await supabase
    .from('users')
    .select('id')
    .eq('plan_type', 'premium')
    .gte('created_at', todayStart.toISOString())
    .not('email', 'in', `(${TEST_USER_CONFIG.emails.map(e => `"${e}"`).join(',')})`);

  const newPayingToday = newPremiumToday?.length || 0;

  // Total premium users (for MRR)
  const { data: allPremium } = await supabase
    .from('users')
    .select('id')
    .eq('plan_type', 'premium')
    .not('email', 'in', `(${TEST_USER_CONFIG.emails.map(e => `"${e}"`).join(',')})`);

  const mrrToday = (allPremium?.length || 0) * 12.99;

  // ---- DAU today ----
  const todayEvents = await fetchAllEventsPaginated<{ user_id: string | null; anonymous_id: string | null }>(
    supabase,
    {
      table: 'analytics_events',
      select: 'user_id, anonymous_id',
      filters: [
        { column: 'created_at', operator: 'gte', value: todayStart.toISOString() }
      ]
    }
  );

  const dauUsers = new Set(
    todayEvents.map(e => e.user_id || e.anonymous_id).filter(Boolean)
  );
  const activeToday = dauUsers.size;

  // ---- Yesterday active users (for trend) ----
  const yesterdayEvents = await fetchAllEventsPaginated<{ user_id: string | null; anonymous_id: string | null }>(
    supabase,
    {
      table: 'analytics_events',
      select: 'user_id, anonymous_id',
      filters: [
        { column: 'created_at', operator: 'gte', value: yesterdayStart.toISOString() },
        { column: 'created_at', operator: 'lt', value: yesterdayEnd.toISOString() }
      ]
    }
  );

  const yesterdayActiveUsers = new Set(
    yesterdayEvents.map(e => e.user_id || e.anonymous_id).filter(Boolean)
  ).size;

  const activeUsersTrend = yesterdayActiveUsers > 0
    ? ((activeToday - yesterdayActiveUsers) / yesterdayActiveUsers) * 100
    : 0;

  // ---- New signups today ----
  const { count: newSignupsToday } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', todayStart.toISOString());

  const { count: newSignupsYesterday } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', yesterdayStart.toISOString())
    .lt('created_at', yesterdayEnd.toISOString());

  const signupsTrend = (newSignupsYesterday || 0) > 0
    ? (((newSignupsToday || 0) - (newSignupsYesterday || 0)) / (newSignupsYesterday || 0)) * 100
    : 0;

  // ---- Analyses today ----
  const analysesTodayEvents = todayEvents.filter(() => true); // we already have all
  // Re-query for specific event types today
  const { data: analysesTodayData } = await supabase
    .from('analytics_events')
    .select('event_type')
    .in('event_type', ['completed_analysis', 'completed_humanization', 'completed_paraphrase'])
    .gte('created_at', todayStart.toISOString());

  const { data: analysesYesterdayData } = await supabase
    .from('analytics_events')
    .select('event_type')
    .in('event_type', ['completed_analysis', 'completed_humanization', 'completed_paraphrase'])
    .gte('created_at', yesterdayStart.toISOString())
    .lt('created_at', yesterdayEnd.toISOString());

  const analysesToday = analysesTodayData?.length || 0;
  const analysesYesterday = analysesYesterdayData?.length || 0;
  const analysesTrend = analysesYesterday > 0
    ? ((analysesToday - analysesYesterday) / analysesYesterday) * 100
    : 0;

  // ---- Friction events today ----
  const { data: frictionToday } = await supabase
    .from('analytics_events')
    .select('event_type')
    .in('event_type', ['hit_daily_limit', 'hit_character_limit', 'file_upload_blocked', 'premium_mode_blocked'])
    .gte('created_at', todayStart.toISOString());

  const frictionEventsToday = frictionToday?.length || 0;
  const totalTodayEvents = todayEvents.length;
  const frictionRatio = totalTodayEvents > 0 ? frictionEventsToday / totalTodayEvents : 0;

  // ---- Checkouts today ----
  const { count: checkoutsToday } = await supabase
    .from('analytics_events')
    .select('*', { count: 'exact', head: true })
    .eq('event_type', 'checkout_started')
    .gte('created_at', todayStart.toISOString());

  // ---- Hot leads (limit hits in last 24h) ----
  const last24h = new Date(now);
  last24h.setHours(last24h.getHours() - 24);

  const { data: limitHits24h } = await supabase
    .from('analytics_events')
    .select('user_id, anonymous_id')
    .in('event_type', ['hit_daily_limit', 'hit_character_limit'])
    .gte('created_at', last24h.toISOString());

  const limitHitUsers: Record<string, number> = {};
  limitHits24h?.forEach(e => {
    const key = e.user_id || e.anonymous_id;
    if (key) limitHitUsers[key] = (limitHitUsers[key] || 0) + 1;
  });
  const hotLeadsCount = Object.values(limitHitUsers).filter(c => c >= 2).length;

  return {
    date: now.toISOString(),
    mrrToday,
    mrrChange: newPayingToday * 12.99,
    newPayingToday,
    activeToday,
    newSignupsToday: newSignupsToday || 0,
    hotLeadsCount,
    checkoutsToday: checkoutsToday || 0,
    analysesToday,
    frictionEventsToday,
    frictionRatio,
    trends: {
      activeUsers: activeUsersTrend,
      analyses: analysesTrend,
      signups: signupsTrend,
    },
  };
}

// ============================================
// 10. ACQUISITION METRICS
// ============================================

export async function fetchAcquisitionMetrics(
  supabase: SupabaseClient,
  timeframe: QueryTimeframe
): Promise<AcquisitionMetrics> {
  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const weekStart = new Date(now);
  weekStart.setDate(weekStart.getDate() - 7);

  const monthStart = new Date(now);
  monthStart.setDate(monthStart.getDate() - 30);

  // ---- DAU ----
  const dauEvents = await fetchAllEventsPaginated<{ user_id: string | null; anonymous_id: string | null }>(
    supabase,
    {
      table: 'analytics_events',
      select: 'user_id, anonymous_id',
      filters: [{ column: 'created_at', operator: 'gte', value: todayStart.toISOString() }]
    }
  );
  const dau = new Set(dauEvents.map(e => e.user_id || e.anonymous_id).filter(Boolean)).size;

  // ---- WAU ----
  const wauEvents = await fetchAllEventsPaginated<{ user_id: string | null; anonymous_id: string | null }>(
    supabase,
    {
      table: 'analytics_events',
      select: 'user_id, anonymous_id',
      filters: [{ column: 'created_at', operator: 'gte', value: weekStart.toISOString() }]
    }
  );
  const wau = new Set(wauEvents.map(e => e.user_id || e.anonymous_id).filter(Boolean)).size;

  // ---- MAU ----
  const mauEvents = await fetchAllEventsPaginated<{ user_id: string | null; anonymous_id: string | null }>(
    supabase,
    {
      table: 'analytics_events',
      select: 'user_id, anonymous_id',
      filters: [{ column: 'created_at', operator: 'gte', value: monthStart.toISOString() }]
    }
  );
  const mau = new Set(mauEvents.map(e => e.user_id || e.anonymous_id).filter(Boolean)).size;

  // ---- New vs returning users today ----
  const todayUserIds = new Set(dauEvents.map(e => e.user_id || e.anonymous_id).filter(Boolean));

  // Count users who were also active yesterday (returning)
  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);
  const yesterdayEvents = await fetchAllEventsPaginated<{ user_id: string | null; anonymous_id: string | null }>(
    supabase,
    {
      table: 'analytics_events',
      select: 'user_id, anonymous_id',
      filters: [
        { column: 'created_at', operator: 'gte', value: yesterdayStart.toISOString() },
        { column: 'created_at', operator: 'lt', value: todayStart.toISOString() }
      ]
    }
  );
  const yesterdayUserIds = new Set(yesterdayEvents.map(e => e.user_id || e.anonymous_id).filter(Boolean));

  let returningUsersToday = 0;
  todayUserIds.forEach(uid => {
    if (uid && yesterdayUserIds.has(uid)) returningUsersToday++;
  });
  const newUsersToday = dau - returningUsersToday;

  // ---- New signups today ----
  const { count: newSignupsToday } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', todayStart.toISOString());

  // ---- Entry pages (from page_url field) ----
  const { data: pageUrlEvents } = await supabase
    .from('analytics_events')
    .select('page_url, user_id, event_type')
    .gte('created_at', timeframe.startDate.toISOString())
    .not('page_url', 'is', null)
    .limit(10000);

  const pageStats: Record<string, { visits: number; signups: number; conversions: number; uniqueUsers: Set<string> }> = {};

  pageUrlEvents?.forEach(e => {
    if (!e.page_url) return;
    // Normalize URL to path only
    let path = e.page_url;
    try {
      const url = new URL(e.page_url);
      path = url.pathname;
    } catch {}

    // Simplify path
    if (path.startsWith('/detector') || path === '/') path = '/detector';
    else if (path.startsWith('/humanizador')) path = '/humanizador';
    else if (path.startsWith('/parafraseador')) path = '/parafraseador';
    else if (path.startsWith('/pricing')) path = '/pricing';
    else if (path.startsWith('/blog')) path = '/blog';
    else if (path.length > 40) path = path.substring(0, 40) + '...';

    if (!pageStats[path]) {
      pageStats[path] = { visits: 0, signups: 0, conversions: 0, uniqueUsers: new Set() };
    }
    pageStats[path].visits++;
    if (e.user_id) pageStats[path].uniqueUsers.add(e.user_id);
    if (e.event_type === 'signup') pageStats[path].signups++;
    if (e.event_type === 'checkout_started') pageStats[path].conversions++;
  });

  const topEntryPages = Object.entries(pageStats)
    .map(([page, stats]) => ({
      page,
      visits: stats.visits,
      signups: stats.signups,
      conversions: stats.conversions,
      signupRate: stats.visits > 0 ? (stats.signups / stats.visits) * 100 : 0,
    }))
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 10);

  // ---- Referrers ----
  const { data: referrerEvents } = await supabase
    .from('analytics_events')
    .select('referrer, user_id, event_type')
    .gte('created_at', timeframe.startDate.toISOString())
    .not('referrer', 'is', null)
    .limit(10000);

  const referrerStats: Record<string, { visits: number; signups: number; category: string }> = {};

  const categorizReferrer = (ref: string): string => {
    if (!ref || ref === '' || ref === 'direct') return 'direct';
    if (ref.includes('google') || ref.includes('bing') || ref.includes('yahoo')) return 'search';
    if (ref.includes('instagram') || ref.includes('facebook') || ref.includes('tiktok') ||
        ref.includes('twitter') || ref.includes('youtube') || ref.includes('reddit')) return 'social';
    if (ref.includes('t.co') || ref.includes('l.instagram')) return 'social';
    return 'other';
  };

  referrerEvents?.forEach(e => {
    if (!e.referrer) return;
    let ref = e.referrer;
    try {
      ref = new URL(e.referrer).hostname.replace('www.', '');
    } catch {}

    if (!referrerStats[ref]) {
      referrerStats[ref] = { visits: 0, signups: 0, category: categorizReferrer(e.referrer) };
    }
    referrerStats[ref].visits++;
    if (e.event_type === 'signup') referrerStats[ref].signups++;
  });

  // Add 'direct' for events with no referrer
  const { count: directVisits } = await supabase
    .from('analytics_events')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', timeframe.startDate.toISOString())
    .is('referrer', null);

  if ((directVisits || 0) > 0) {
    referrerStats['direct'] = {
      visits: directVisits || 0,
      signups: 0,
      category: 'direct',
    };
  }

  const topReferrers = Object.entries(referrerStats)
    .map(([referrer, stats]) => ({
      referrer: referrer || 'direct',
      category: stats.category,
      visits: stats.visits,
      signups: stats.signups,
    }))
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 10);

  return {
    topEntryPages,
    topReferrers,
    dau,
    wau,
    mau,
    dauWauRatio: wau > 0 ? dau / wau : 0,
    newUsersToday,
    returningUsersToday,
  };
}

// ============================================
// 11. REVENUE MIX
// ============================================

export async function fetchRevenueMix(
  supabase: SupabaseClient,
  timeframe: QueryTimeframe
): Promise<RevenueMix> {
  const EXPRESS_24H_PRICE = 3.99;
  const EXPRESS_7D_PRICE = 8.99;
  const PRO_MONTHLY_PRICE = 12.99;
  const PRO_ANNUAL_PRICE_MONTHLY = 10.39; // $124.68/yr / 12

  // ---- Premium monthly subscribers ----
  const { data: premiumMonthlyUsers } = await supabase
    .from('users')
    .select('id, created_at, subscription_interval')
    .eq('plan_type', 'premium')
    .not('email', 'in', `(${TEST_USER_CONFIG.emails.map(e => `"${e}"`).join(',')})`)
    .or('subscription_interval.eq.month,subscription_interval.is.null');

  // ---- Premium annual subscribers ----
  const { data: premiumAnnualUsers } = await supabase
    .from('users')
    .select('id, created_at')
    .eq('plan_type', 'premium')
    .eq('subscription_interval', 'year')
    .not('email', 'in', `(${TEST_USER_CONFIG.emails.map(e => `"${e}"`).join(',')})`)
    .limit(1000);

  const monthlyCount = premiumMonthlyUsers?.length || 0;
  const annualCount = premiumAnnualUsers?.length || 0;
  const monthlyMRR = monthlyCount * PRO_MONTHLY_PRICE;
  const annualMRR = annualCount * PRO_ANNUAL_PRICE_MONTHLY;

  // ---- Express 24h purchases in period ----
  // Check users with express_plan = '24h' or express plan fields
  const { data: expressUsers } = await supabase
    .from('users')
    .select('id, express_expires_at, express_plan')
    .not('express_expires_at', 'is', null)
    .not('email', 'in', `(${TEST_USER_CONFIG.emails.map(e => `"${e}"`).join(',')})`)
    .gte('express_expires_at', timeframe.startDate.toISOString())
    .limit(10000);

  // Separate 24h vs 7d based on plan field or duration
  const express24hUsers = expressUsers?.filter(u => {
    if (u.express_plan === '7d') return false;
    // If no plan field, default to 24h
    return true;
  }) || [];

  const express7dUsers = expressUsers?.filter(u => u.express_plan === '7d') || [];

  // Check repeat purchasers: users who appear more than once
  // We approximate by looking at users who had express passes in both halves of the period
  const halfwayPoint = new Date((timeframe.startDate.getTime() + timeframe.endDate.getTime()) / 2);

  const { data: expressFirstHalf } = await supabase
    .from('users')
    .select('id')
    .not('express_expires_at', 'is', null)
    .gte('express_expires_at', timeframe.startDate.toISOString())
    .lt('express_expires_at', halfwayPoint.toISOString())
    .limit(1000);

  const { data: expressSecondHalf } = await supabase
    .from('users')
    .select('id')
    .not('express_expires_at', 'is', null)
    .gte('express_expires_at', halfwayPoint.toISOString())
    .lt('express_expires_at', timeframe.endDate.toISOString())
    .limit(1000);

  const firstHalfIds = new Set(expressFirstHalf?.map(u => u.id) || []);
  const repeatPurchasers = expressSecondHalf?.filter(u => firstHalfIds.has(u.id)).length || 0;

  const express24hRevenue = express24hUsers.length * EXPRESS_24H_PRICE;
  const express7dRevenue = express7dUsers.length * EXPRESS_7D_PRICE;
  const totalExpressRevenue = express24hRevenue + express7dRevenue;
  const totalPremiumRevenue = monthlyMRR + annualMRR;
  const totalRevenuePeriod = totalExpressRevenue + totalPremiumRevenue;

  const totalPayingUsers = (expressUsers?.length || 0) + monthlyCount + annualCount;
  const arpu = totalPayingUsers > 0 ? totalRevenuePeriod / totalPayingUsers : 0;
  const expressRepeatRate = (expressUsers?.length || 0) > 0
    ? (repeatPurchasers / (expressUsers?.length || 1)) * 100
    : 0;

  return {
    express24h: {
      purchases: express24hUsers.length,
      revenue: express24hRevenue,
      repeatPurchasers,
    },
    express7d: {
      purchases: express7dUsers.length,
      revenue: express7dRevenue,
    },
    premiumMonthly: {
      subscribers: monthlyCount,
      mrr: monthlyMRR,
    },
    premiumAnnual: {
      subscribers: annualCount,
      mrr: annualMRR,
    },
    totalRevenuePeriod,
    expressVsPremiumSplit: totalRevenuePeriod > 0
      ? (totalExpressRevenue / totalRevenuePeriod) * 100
      : 0,
    arpu,
    expressRepeatRate,
  };
}
