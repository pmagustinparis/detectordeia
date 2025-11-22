-- ============================================
-- Active Users Verification Queries
-- Run these in Supabase SQL Editor to verify your analytics
-- ============================================

-- ============================================
-- 1. Check if events are being created TODAY
-- ============================================
SELECT
  event_type,
  COUNT(*) as count,
  COUNT(DISTINCT user_id) FILTER (WHERE user_id IS NOT NULL) as registered_users,
  COUNT(DISTINCT anonymous_id) FILTER (WHERE user_id IS NULL) as anonymous_users
FROM analytics_events
WHERE created_at >= CURRENT_DATE
GROUP BY event_type
ORDER BY count DESC;

-- Expected: Should see recent events (completed_analysis, etc.)
-- If empty: No one used the app today OR tracking is broken


-- ============================================
-- 2. Verify Active Users calculation (Last 30 days)
-- This should MATCH the number in your dashboard
-- ============================================
SELECT
  COUNT(DISTINCT user_id) FILTER (WHERE user_id IS NOT NULL) as registered_active,
  COUNT(DISTINCT anonymous_id) FILTER (WHERE user_id IS NULL AND anonymous_id IS NOT NULL) as anonymous_active,
  COUNT(DISTINCT user_id) FILTER (WHERE user_id IS NOT NULL) +
  COUNT(DISTINCT anonymous_id) FILTER (WHERE user_id IS NULL AND anonymous_id IS NOT NULL) as total_active,
  COUNT(*) as total_events
FROM analytics_events
WHERE created_at >= NOW() - INTERVAL '30 days';

-- Expected: total_active should match "Active Users" in dashboard
-- If different: Caching issue or query logic problem


-- ============================================
-- 3. Daily event trend (Last 7 days)
-- ============================================
SELECT
  DATE(created_at) as date,
  COUNT(*) as events,
  COUNT(DISTINCT user_id) FILTER (WHERE user_id IS NOT NULL) as registered,
  COUNT(DISTINCT anonymous_id) FILTER (WHERE user_id IS NULL) as anonymous,
  COUNT(DISTINCT COALESCE(user_id, anonymous_id)) as unique_users
FROM analytics_events
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Expected: Daily fluctuation, not zeros or stale dates
-- If zeros: Tracking broken or no usage


-- ============================================
-- 4. Compare current vs previous period (30 days each)
-- ============================================

-- Current period (last 30 days)
SELECT
  'Current Period (Last 30d)' as period,
  NOW() - INTERVAL '30 days' as start_date,
  NOW() as end_date,
  COUNT(DISTINCT user_id) FILTER (WHERE user_id IS NOT NULL) as registered_active,
  COUNT(DISTINCT anonymous_id) FILTER (WHERE user_id IS NULL) as anonymous_active,
  COUNT(DISTINCT COALESCE(user_id, anonymous_id)) as total_active,
  COUNT(*) as events
FROM analytics_events
WHERE created_at >= NOW() - INTERVAL '30 days'

UNION ALL

-- Previous period (30-60 days ago)
SELECT
  'Previous Period (30-60d ago)' as period,
  NOW() - INTERVAL '60 days' as start_date,
  NOW() - INTERVAL '30 days' as end_date,
  COUNT(DISTINCT user_id) FILTER (WHERE user_id IS NOT NULL) as registered_active,
  COUNT(DISTINCT anonymous_id) FILTER (WHERE user_id IS NULL) as anonymous_active,
  COUNT(DISTINCT COALESCE(user_id, anonymous_id)) as total_active,
  COUNT(*) as events
FROM analytics_events
WHERE created_at >= NOW() - INTERVAL '60 days'
  AND created_at < NOW() - INTERVAL '30 days';

-- Expected: Current should be >= Previous if growing
-- Shows the trend calculation logic


-- ============================================
-- 5. Event type breakdown (Last 30 days)
-- ============================================
SELECT
  event_type,
  COUNT(*) as total_events,
  COUNT(DISTINCT user_id) FILTER (WHERE user_id IS NOT NULL) as registered_users,
  COUNT(DISTINCT anonymous_id) FILTER (WHERE user_id IS NULL) as anonymous_users,
  ROUND(COUNT(*)::numeric /
    (SELECT COUNT(*) FROM analytics_events WHERE created_at >= NOW() - INTERVAL '30 days') * 100, 1) as percentage
FROM analytics_events
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY event_type
ORDER BY total_events DESC;

-- Expected: See which events are most common
-- Helps understand user behavior


-- ============================================
-- 6. Tool usage breakdown (Last 30 days)
-- ============================================
SELECT
  tool_type,
  COUNT(*) as completions,
  COUNT(DISTINCT COALESCE(user_id, anonymous_id)) as unique_users,
  ROUND(COUNT(*)::numeric / COUNT(DISTINCT COALESCE(user_id, anonymous_id)), 1) as avg_uses_per_user
FROM analytics_events
WHERE event_type IN ('completed_analysis', 'completed_humanization', 'completed_paraphrase')
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY tool_type
ORDER BY completions DESC;

-- Expected: See which tools are most popular
-- Detector, Humanizador, or Parafraseador


-- ============================================
-- 7. Hourly events (Last 24 hours)
-- ============================================
SELECT
  DATE_TRUNC('hour', created_at) as hour,
  COUNT(*) as events,
  COUNT(DISTINCT COALESCE(user_id, anonymous_id)) as unique_users
FROM analytics_events
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY DATE_TRUNC('hour', created_at)
ORDER BY hour DESC;

-- Expected: See hourly activity pattern
-- Helps identify peak usage times


-- ============================================
-- 8. Check for duplicate anonymous IDs (Data quality)
-- ============================================
SELECT
  anonymous_id,
  COUNT(*) as event_count,
  COUNT(DISTINCT event_type) as different_events,
  MIN(created_at) as first_seen,
  MAX(created_at) as last_seen
FROM analytics_events
WHERE anonymous_id IS NOT NULL
  AND user_id IS NULL
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY anonymous_id
HAVING COUNT(*) > 50  -- Heavy users
ORDER BY event_count DESC
LIMIT 20;

-- Expected: See most active anonymous users
-- If one anonymous_id has hundreds of events: possible bot or power user


-- ============================================
-- 9. Conversion funnel verification (Last 30 days)
-- ============================================
WITH funnel_data AS (
  SELECT
    COUNT(DISTINCT COALESCE(user_id, anonymous_id)) FILTER (WHERE event_type IN (
      'completed_analysis', 'completed_humanization', 'completed_paraphrase',
      'hit_daily_limit', 'hit_character_limit', 'pricing_page_visited'
    )) as active_users,
    COUNT(DISTINCT COALESCE(user_id, anonymous_id)) FILTER (WHERE event_type = 'pricing_page_visited') as visited_pricing,
    COUNT(DISTINCT COALESCE(user_id, anonymous_id)) FILTER (WHERE event_type = 'checkout_started') as started_checkout
  FROM analytics_events
  WHERE created_at >= NOW() - INTERVAL '30 days'
)
SELECT
  active_users,
  visited_pricing,
  ROUND(visited_pricing::numeric / NULLIF(active_users, 0) * 100, 1) as pricing_visit_rate,
  started_checkout,
  ROUND(started_checkout::numeric / NULLIF(visited_pricing, 0) * 100, 1) as checkout_start_rate
FROM funnel_data;

-- Expected: See conversion rates at each funnel stage
-- Helps identify where users drop off


-- ============================================
-- 10. Check for test users in data
-- ============================================
SELECT
  u.email,
  u.plan_type,
  COUNT(ae.id) as event_count,
  MAX(ae.created_at) as last_event
FROM users u
LEFT JOIN analytics_events ae ON u.id = ae.user_id
WHERE u.email IN ('parisagustin@gmail.com', 'buildbyagus@gmail.com')
  AND ae.created_at >= NOW() - INTERVAL '30 days'
GROUP BY u.email, u.plan_type;

-- Expected: See if test users are skewing data
-- Should be excluded from Active Users count


-- ============================================
-- SUMMARY QUERY: Quick Health Check
-- ============================================
SELECT
  'Events Last 24h' as metric,
  COUNT(*) as value
FROM analytics_events
WHERE created_at >= NOW() - INTERVAL '24 hours'

UNION ALL

SELECT
  'Active Users (30d)' as metric,
  COUNT(DISTINCT COALESCE(user_id, anonymous_id)) as value
FROM analytics_events
WHERE created_at >= NOW() - INTERVAL '30 days'

UNION ALL

SELECT
  'Registered Users (30d)' as metric,
  COUNT(DISTINCT user_id) as value
FROM analytics_events
WHERE created_at >= NOW() - INTERVAL '30 days'
  AND user_id IS NOT NULL

UNION ALL

SELECT
  'Anonymous Users (30d)' as metric,
  COUNT(DISTINCT anonymous_id) as value
FROM analytics_events
WHERE created_at >= NOW() - INTERVAL '30 days'
  AND user_id IS NULL
  AND anonymous_id IS NOT NULL

UNION ALL

SELECT
  'Completions (30d)' as metric,
  COUNT(*) as value
FROM analytics_events
WHERE event_type IN ('completed_analysis', 'completed_humanization', 'completed_paraphrase')
  AND created_at >= NOW() - INTERVAL '30 days'

UNION ALL

SELECT
  'Premium Users' as metric,
  COUNT(*) as value
FROM users
WHERE plan_type = 'premium'
  AND email NOT IN ('parisagustin@gmail.com', 'buildbyagus@gmail.com');

-- Expected: Quick overview of key metrics
-- All should have non-zero values if system is working
