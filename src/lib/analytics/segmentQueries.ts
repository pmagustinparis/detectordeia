/**
 * Segment Intelligence Queries
 *
 * Cruza user_profiles + users + analytics_events + usage_tracking
 * para responder: qué segmentos convierten, retienen y generan más valor.
 */

import { SupabaseClient } from '@supabase/supabase-js';
import { TEST_USER_CONFIG } from './queries';

export interface SegmentStat {
  segment: string;
  label: string;
  totalUsers: number;
  premiumUsers: number;
  conversionRate: number;     // %
  avgUsesBeforeConvert: number;
  topTool: string;            // herramienta más usada por este segmento
}

export interface DiscoverySourceValue {
  source: string;
  label: string;
  totalUsers: number;
  premiumUsers: number;
  conversionRate: number;
}

export interface ToolPreferenceByRole {
  role: string;
  label: string;
  detector: number;
  humanizador: number;
  parafraseador: number;
  topTool: string;
}

export interface SurveyInsight {
  surveyType: string;
  questionKey: string;
  totalResponses: number;
  avgRating: number | null;
  topOptions: Array<{ option: string; count: number }>;
  recentTexts: string[];
}

export interface BehaviorSequence {
  name: string;
  description: string;
  userCount: number;
  conversionRate: number;
}

export interface SegmentIntelligence {
  byRole: SegmentStat[];
  byDiscoverySource: DiscoverySourceValue[];
  toolPreferenceByRole: ToolPreferenceByRole[];
  surveyInsights: SurveyInsight[];
  behaviorSequences: BehaviorSequence[];
  generatedAt: string;
}

const ROLE_LABELS: Record<string, string> = {
  student_university: 'Estudiante universitario',
  student_secondary: 'Estudiante secundario',
  student: 'Estudiante',
  teacher: 'Profesor/Docente',
  writer: 'Escritor/Creador',
  journalist: 'Periodista',
  professional: 'Profesional/Empresa',
  researcher: 'Investigador',
  other: 'Otro',
};

const SOURCE_LABELS: Record<string, string> = {
  google: 'Google/Buscador',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  twitter: 'Twitter/X',
  recommendation: 'Recomendación',
  other_website: 'Otro sitio web',
  social_media: 'Redes sociales',
  other: 'Otro',
};

export async function fetchSegmentIntelligence(
  supabase: SupabaseClient,
): Promise<SegmentIntelligence> {
  try {
    // Fetch all needed data in parallel
    const [profilesResult, usersResult, usageResult, surveysResult, eventsResult] = await Promise.all([
      // user_profiles: role, primary_use, discovery_source, user_id
      supabase
        .from('user_profiles')
        .select('user_id, role, primary_use, discovery_source')
        .limit(10000),

      // users: id, plan_type, email (to exclude test users)
      supabase
        .from('users')
        .select('id, plan_type, email')
        .not('email', 'in', `(${TEST_USER_CONFIG.emails.map(e => `"${e}"`).join(',')})`)
        .limit(10000),

      // usage_tracking: user_id, tool_type
      supabase
        .from('usage_tracking')
        .select('user_id, tool_type')
        .not('user_id', 'is', null)
        .limit(50000),

      // surveys table for insights
      supabase
        .from('surveys')
        .select('survey_type, question_key, rating, response_option, response_text, created_at')
        .order('created_at', { ascending: false })
        .limit(1000),

      // analytics_events for behavior sequences
      supabase
        .from('analytics_events')
        .select('event_type, user_id, anonymous_id, created_at')
        .in('event_type', [
          'completed_analysis', 'completed_humanization', 'completed_paraphrase',
          'hit_daily_limit', 'viewed_pricing', 'checkout_completed',
        ])
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
        .limit(50000),
    ]);

    const profiles = profilesResult.data || [];
    const users = usersResult.data || [];
    const usageRows = usageResult.data || [];
    const surveys = surveysResult.data || [];
    const events = eventsResult.data || [];

    // Build lookup maps
    const userPlanMap = new Map<string, string>();
    for (const u of users) {
      userPlanMap.set(u.id, u.plan_type);
    }

    const profileByUserId = new Map<string, typeof profiles[0]>();
    for (const p of profiles) {
      if (p.user_id) profileByUserId.set(p.user_id, p);
    }

    // ─── BY ROLE ───────────────────────────────────────────────
    const roleMap = new Map<string, { total: number; premium: number }>();

    for (const profile of profiles) {
      const plan = userPlanMap.get(profile.user_id) ?? 'free';
      const role = profile.role || 'other';
      const existing = roleMap.get(role) ?? { total: 0, premium: 0 };
      roleMap.set(role, {
        total: existing.total + 1,
        premium: existing.premium + (plan === 'premium' ? 1 : 0),
      });
    }

    const byRole: SegmentStat[] = Array.from(roleMap.entries())
      .filter(([, v]) => v.total >= 2)
      .sort((a, b) => b[1].premium - a[1].premium)
      .map(([role, stats]) => ({
        segment: role,
        label: ROLE_LABELS[role] || role,
        totalUsers: stats.total,
        premiumUsers: stats.premium,
        conversionRate: stats.total > 0 ? Math.round((stats.premium / stats.total) * 100) : 0,
        avgUsesBeforeConvert: 0, // filled below
        topTool: 'detector',     // filled below
      }));

    // ─── TOOL PREFERENCE BY ROLE ───────────────────────────────
    // usage per user_id by tool
    const usageByUser = new Map<string, Record<string, number>>();
    for (const row of usageRows) {
      if (!row.user_id) continue;
      const existing = usageByUser.get(row.user_id) ?? { detector: 0, humanizador: 0, parafraseador: 0 };
      existing[row.tool_type as string] = (existing[row.tool_type as string] ?? 0) + 1;
      usageByUser.set(row.user_id, existing);
    }

    // Aggregate by role
    const toolByRole = new Map<string, { detector: number; humanizador: number; parafraseador: number }>();
    for (const profile of profiles) {
      const role = profile.role || 'other';
      const usage = usageByUser.get(profile.user_id) ?? { detector: 0, humanizador: 0, parafraseador: 0 };
      const existing = toolByRole.get(role) ?? { detector: 0, humanizador: 0, parafraseador: 0 };
      toolByRole.set(role, {
        detector: existing.detector + (usage.detector || 0),
        humanizador: existing.humanizador + (usage.humanizador || 0),
        parafraseador: existing.parafraseador + (usage.parafraseador || 0),
      });
    }

    const toolPreferenceByRole: ToolPreferenceByRole[] = Array.from(toolByRole.entries())
      .filter(([role]) => roleMap.has(role) && (roleMap.get(role)?.total ?? 0) >= 2)
      .map(([role, tools]) => {
        const topTool = Object.entries(tools).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'detector';
        return {
          role,
          label: ROLE_LABELS[role] || role,
          detector: tools.detector,
          humanizador: tools.humanizador,
          parafraseador: tools.parafraseador,
          topTool,
        };
      })
      .sort((a, b) => (b.detector + b.humanizador + b.parafraseador) - (a.detector + a.humanizador + a.parafraseador));

    // Backfill topTool in byRole
    for (const roleStat of byRole) {
      const pref = toolPreferenceByRole.find(t => t.role === roleStat.segment);
      if (pref) roleStat.topTool = pref.topTool;
    }

    // ─── BY DISCOVERY SOURCE ───────────────────────────────────
    const sourceMap = new Map<string, { total: number; premium: number }>();
    for (const profile of profiles) {
      const plan = userPlanMap.get(profile.user_id) ?? 'free';
      const source = profile.discovery_source || 'other';
      const existing = sourceMap.get(source) ?? { total: 0, premium: 0 };
      sourceMap.set(source, {
        total: existing.total + 1,
        premium: existing.premium + (plan === 'premium' ? 1 : 0),
      });
    }

    const byDiscoverySource: DiscoverySourceValue[] = Array.from(sourceMap.entries())
      .filter(([, v]) => v.total >= 2)
      .sort((a, b) => b[1].premium - a[1].premium)
      .map(([source, stats]) => ({
        source,
        label: SOURCE_LABELS[source] || source,
        totalUsers: stats.total,
        premiumUsers: stats.premium,
        conversionRate: stats.total > 0 ? Math.round((stats.premium / stats.total) * 100) : 0,
      }));

    // ─── SURVEY INSIGHTS ───────────────────────────────────────
    const surveyGrouped = new Map<string, typeof surveys>();
    for (const s of surveys) {
      const key = `${s.survey_type}::${s.question_key}`;
      const existing = surveyGrouped.get(key) ?? [];
      existing.push(s);
      surveyGrouped.set(key, existing);
    }

    const surveyInsights: SurveyInsight[] = Array.from(surveyGrouped.entries()).map(([key, responses]) => {
      const [surveyType, questionKey] = key.split('::');
      const ratings = responses.map(r => r.rating).filter(r => r !== null && r !== undefined) as number[];
      const avgRating = ratings.length > 0 ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10 : null;

      // Top options
      const optionCount = new Map<string, number>();
      for (const r of responses) {
        if (r.response_option) {
          optionCount.set(r.response_option, (optionCount.get(r.response_option) ?? 0) + 1);
        }
      }
      const topOptions = Array.from(optionCount.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([option, count]) => ({ option, count }));

      // Recent text responses (non-empty, max 5)
      const recentTexts = responses
        .filter(r => r.response_text && r.response_text.trim().length > 5)
        .slice(0, 5)
        .map(r => r.response_text as string);

      return {
        surveyType,
        questionKey,
        totalResponses: responses.length,
        avgRating,
        topOptions,
        recentTexts,
      };
    });

    // ─── BEHAVIOR SEQUENCES ────────────────────────────────────
    // Group events by user/anonymous id
    const userEvents = new Map<string, string[]>();
    for (const e of events) {
      const id = e.user_id || e.anonymous_id;
      if (!id) continue;
      const existing = userEvents.get(id) ?? [];
      existing.push(e.event_type);
      userEvents.set(id, existing);
    }

    const allIds = Array.from(userEvents.keys());

    // Sequence 1: hit limit → viewed pricing → no convert
    const hitLimitAndPricing = allIds.filter(id => {
      const evs = userEvents.get(id)!;
      return evs.includes('hit_daily_limit') && evs.includes('viewed_pricing') && !evs.includes('checkout_completed');
    });

    // Sequence 2: cross-tool users (used 2+ tools)
    const crossToolUsers = allIds.filter(id => {
      const evs = new Set(userEvents.get(id)!);
      const toolEvents = ['completed_analysis', 'completed_humanization', 'completed_paraphrase'];
      return toolEvents.filter(t => evs.has(t)).length >= 2;
    });

    // Sequence 3: completed checkout (converted)
    const converted = allIds.filter(id => userEvents.get(id)!.includes('checkout_completed'));

    // Cross-tool conversion rate
    const crossToolConverted = crossToolUsers.filter(id => userEvents.get(id)!.includes('checkout_completed'));

    const behaviorSequences: BehaviorSequence[] = [
      {
        name: 'Límite → Pricing → No convierte',
        description: 'Usuarios que tocaron el límite, vieron pricing pero no compraron',
        userCount: hitLimitAndPricing.length,
        conversionRate: 0,
      },
      {
        name: 'Usuarios multi-herramienta',
        description: 'Usuarios que usaron 2 o más herramientas distintas',
        userCount: crossToolUsers.length,
        conversionRate: crossToolUsers.length > 0
          ? Math.round((crossToolConverted.length / crossToolUsers.length) * 100)
          : 0,
      },
      {
        name: 'Conversiones totales (30d)',
        description: 'Usuarios que completaron un pago en los últimos 30 días',
        userCount: converted.length,
        conversionRate: allIds.length > 0 ? Math.round((converted.length / allIds.length) * 100) : 0,
      },
    ];

    return {
      byRole,
      byDiscoverySource,
      toolPreferenceByRole,
      surveyInsights,
      behaviorSequences,
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('[segmentQueries] Error:', error);
    return {
      byRole: [],
      byDiscoverySource: [],
      toolPreferenceByRole: [],
      surveyInsights: [],
      behaviorSequences: [],
      generatedAt: new Date().toISOString(),
    };
  }
}
