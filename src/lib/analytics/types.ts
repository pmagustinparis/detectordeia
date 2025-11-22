/**
 * Analytics Types - Elite Dashboard
 * Tipos TypeScript para el nuevo dashboard de analytics
 */

export type TimeframeOption = '7d' | '14d' | '30d' | '90d';

export type UserPlanType = 'free' | 'premium';

export type AlertPriority = 'high' | 'medium' | 'low';

export type AlertType =
  | 'frequent_limit_hits'  // Usuario hitting limits muchas veces
  | 'churn_risk'           // Usuario PRO sin actividad
  | 'ready_to_convert'     // Usuario vio pricing multiple veces
  | 'abandoned_checkout';  // Started checkout pero no convirtió

// ============================================
// NORTH STAR METRICS
// ============================================

export interface NorthStarMetrics {
  mrr: {
    current: number;
    trend: number; // % change vs previous period
    newMRR: number;
    churnedMRR: number;
    netGrowth: number;
  };
  activeUsers: {
    total: number;
    trend: number;
    registered: number;
    anonymous: number;
  };
  conversionRate: {
    rate: number; // Premium / (Registered - Test Users)
    trend: number;
    numerator: number; // Premium users
    denominator: number; // Registered - Test Users
  };
}

// ============================================
// REVENUE HEALTH
// ============================================

export interface RevenueHealth {
  mrrBreakdown: {
    total: number;
    new: number;          // New subscriptions this period
    expansion: number;    // Upgrades (if any)
    contraction: number;  // Downgrades (if any)
    churned: number;      // Cancellations
    netGrowth: number;    // new + expansion - contraction - churned
  };
  churnMetrics: {
    count: number;        // Users at risk
    percentage: number;   // % of premium base
    users: ChurnRiskUser[];
  };
  ltv: {
    average: number;      // Average LTV per user
    byPlan: Record<UserPlanType, number>;
  };
}

export interface ChurnRiskUser {
  userId: string;
  email: string;
  daysSinceLastActivity: number;
  lastActivityDate: string;
  totalEvents: number;
}

// ============================================
// CONVERSION FUNNEL
// ============================================

export interface ConversionFunnel {
  registered: FunnelStage[];
  anonymous: FunnelStage[];
  byTool: Record<string, FunnelStage[]>; // Breakdown by tool
}

export interface FunnelStage {
  stage: string;
  users: number;
  conversionFromPrevious?: number; // % conversion from previous stage
  dropoffFromPrevious?: number;    // Users lost from previous stage
}

// ============================================
// HOT LEADS
// ============================================

export interface HotLead {
  userId?: string;
  anonymousId?: string;
  email?: string;
  name?: string;
  plan: UserPlanType;
  alertType: AlertType;
  priority: AlertPriority;
  reason: string; // Human-readable explanation
  actionable: string; // What to do about it
  metadata: {
    limitHitsLast24h?: number;
    pricingVisits?: number;
    daysSinceLastActivity?: number;
    checkoutAttempts?: number;
    lastEventDate?: string;
  };
}

// ============================================
// PRODUCT ENGAGEMENT
// ============================================

export interface ProductEngagement {
  toolUsage: ToolUsageStats[];
  modeUsage: ModeUsageStats[];
  featureRequests: FeatureRequestStats[];
  engagementTrend: EngagementTrendPoint[];
}

export interface ToolUsageStats {
  toolName: string;
  totalUses: number;
  uniqueUsers: number;
  averageUsesPerUser: number;
  trend: number; // % change
}

export interface ModeUsageStats {
  mode: string;
  toolType: string;
  uses: number;
  uniqueUsers: number;
}

export interface FeatureRequestStats {
  feature: string; // e.g., "Premium Mode: Aggresive"
  toolType: string;
  blockCount: number;
  uniqueUsers: number;
  priority: number; // 1-5, calculated by frequency
}

export interface EngagementTrendPoint {
  date: string;
  events: number;
  users: number;
}

// ============================================
// COHORT ANALYSIS
// ============================================

export interface CohortAnalysis {
  cohorts: Cohort[];
  retentionHeatmap: number[][]; // For visualization
}

export interface Cohort {
  cohortDate: string; // Week starting date
  size: number; // Users in cohort
  retention: CohortRetention[];
}

export interface CohortRetention {
  weekNumber: number; // 0, 1, 2, 3, 4...
  activeUsers: number;
  retentionRate: number; // % of original cohort
}

// ============================================
// USER INSIGHTS
// ============================================

export interface UserInsights {
  demographics: {
    totalProfiles: number;
    completionRate: number;
    byRole: Record<string, number>;
    byPrimaryUse: Record<string, number>;
    byDiscoverySource: Record<string, number>;
  };
  conversionByRole: Record<string, {
    totalUsers: number;
    premiumUsers: number;
    conversionRate: number;
  }>;
  topUsers: TopUser[];
  recentSignups: RecentSignup[];
}

export interface TopUser {
  userId: string;
  email: string;
  name?: string;
  plan: UserPlanType;
  eventCount: number;
  lastEventDate: string;
  daysSinceSignup: number;
  isTestUser: boolean;
}

export interface RecentSignup {
  userId: string;
  email: string;
  name?: string;
  signupDate: string;
  signupMethod: 'google' | 'email' | 'unknown';
  hadPriorActivity: boolean;
  eventsBeforeSignup: number;
  eventsSinceSignup: number;
}

// ============================================
// REGISTERED USERS LIST
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
  // Profile data
  role?: string;
  primaryUse?: string;
  discoverySource?: string;
}

// ============================================
// COMPLETE DASHBOARD DATA
// ============================================

export interface AnalyticsDashboardData {
  timeframe: TimeframeOption;
  generatedAt: string;

  northStar: NorthStarMetrics;
  revenueHealth: RevenueHealth;
  conversionFunnel: ConversionFunnel;
  hotLeads: HotLead[];
  productEngagement: ProductEngagement;
  cohortAnalysis: CohortAnalysis;
  userInsights: UserInsights;
  registeredUsers: RegisteredUser[];

  // Meta info
  meta: {
    totalEvents: number;
    dateRange: {
      start: string;
      end: string;
    };
  };
}

// ============================================
// QUERY HELPERS
// ============================================

export interface QueryTimeframe {
  days: number;
  startDate: Date;
  endDate: Date;
  previousPeriodStart: Date; // For trend calculations
}

export interface TestUserConfig {
  emails: string[];
}
