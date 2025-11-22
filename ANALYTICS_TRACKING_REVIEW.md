# Analytics Tracking - Comprehensive Review

**Generated:** 2025-11-22
**Purpose:** Complete breakdown of what we track, how we calculate metrics, and debugging Active Users

---

## 📊 What We're Tracking

### Events Tracked (13 types)

#### 1. **Success Events** (Main Product Usage)
- `completed_analysis` - Detector analysis finished
- `completed_humanization` - Humanizador finished
- `completed_paraphrase` - Parafraseador finished

**Metadata captured:**
- `text_length` - Characters processed
- `plan` - free/premium
- `probability` - AI detection score (detector only)
- `mode` - standard/academic/creative (humanizador)
- `usage_count` - User's usage count (humanizador)

#### 2. **Limit Events** (Conversion Triggers)
- `hit_daily_limit` - User reached daily usage limit
- `hit_character_limit` - User exceeded character limit
- `approaching_daily_limit` - User near limit (4/5 uses)

#### 3. **Blocked Features** (Premium Upsell Opportunities)
- `file_upload_blocked` - Free user tried to upload file
- `premium_mode_blocked` - Free user tried premium mode
- `advanced_metrics_blocked` - Free user tried advanced features

#### 4. **Conversion Events** (Purchase Funnel)
- `pricing_page_visited` - User visited /pricing
- `clicked_upgrade` - User clicked upgrade button
- `clicked_pricing_cta` - User clicked pricing CTA
- `checkout_started` - User initiated Stripe checkout

#### 5. **Auth Events**
- `signup` - New user registration
- `login` - User logged in
- `logout` - User logged out

### Where Events Are Tracked

**DetectorMain.tsx:**
- Line 195: `hit_character_limit`
- Line 242: `completed_analysis`

**HumanizadorMain.tsx:**
- Line 171: `hit_character_limit`
- Line 220: `hit_daily_limit`
- Line 243: `file_upload_blocked`
- Line 285: `completed_humanization`
- Line 363: `premium_mode_blocked`

**ParafraseadorMain.tsx:**
- Similar pattern to Humanizador
- Line 237: `completed_paraphrase`

**PricingPageClient.tsx:**
- Line 31: `pricing_page_visited` (on page load)
- Line 104: `checkout_started`

---

## 🔢 How Metrics Are Calculated

### Active Users (The "Stuck at 321" Metric)

**Definition:** Unique users (registered + anonymous) who had ANY event in the selected timeframe.

**Query Logic:**
```typescript
// Get all events in timeframe
const events = await supabase
  .from('analytics_events')
  .select('user_id, anonymous_id')
  .gte('created_at', '30 days ago');  // For 30d timeframe

// Deduplicate registered users
const registeredActive = new Set(
  events.filter(e => e.user_id).map(e => e.user_id)
).size;

// Deduplicate anonymous users
const anonymousActive = new Set(
  events.filter(e => !e.user_id && e.anonymous_id).map(e => e.anonymous_id)
).size;

// Total = sum of both
const totalActive = registeredActive + anonymousActive;
```

**What counts as "active"?**
- Completing a detection, humanization, or paraphrase ✅
- Hitting a character limit ✅
- Visiting the pricing page ✅
- Getting blocked from a premium feature ✅
- Even just signing up or logging in ✅

**Important:** This is NOT cumulative. It's a rolling window.
- 30d timeframe = unique users with events in LAST 30 days only
- If no new users come and same users keep using = number stays stable

### MRR (Monthly Recurring Revenue)

```typescript
// Count premium users (excluding test users)
const premiumUsers = await supabase
  .from('users')
  .select('*')
  .eq('plan_type', 'premium')
  .not('email', 'in', TEST_USER_CONFIG.emails);

const currentMRR = premiumUsers.length × $9.99;
```

**Test users excluded:**
- parisagustin@gmail.com
- buildbyagus@gmail.com

### Conversion Rate

```typescript
conversionRate = (premium_users / (total_registered - test_users)) × 100
```

### Conversion by Role (NEW)

**For each role:**
1. Count total users with that role
2. Count premium users with that role
3. Calculate: (premium / total) × 100

**Example:**
- Student University: 50 total, 3 premium = 6% conversion
- Professional: 20 total, 5 premium = 25% conversion

### Product Engagement

**Tool Usage:**
```sql
-- Total uses
SELECT COUNT(*) FROM analytics_events
WHERE event_type IN ('completed_analysis', 'completed_humanization', 'completed_paraphrase')
AND created_at >= '30 days ago';

-- Unique users
SELECT COUNT(DISTINCT COALESCE(user_id, anonymous_id))
FROM analytics_events
WHERE event_type IN (...)
AND created_at >= '30 days ago';

-- Avg uses per user = total / unique
```

---

## 🐛 Debugging Active Users "Stuck at 321"

### Why It Might Be Stuck

**1. Browser Cache (FIXED ✅)**
- Added `Cache-Control: no-store, no-cache` headers to API
- Added `cache: 'no-store'` to frontend fetch
- Commit: `aea3b25` (2025-11-22)

**2. Hard Refresh Logs You Out**
- This is a separate auth session issue
- Use regular reload (Cmd+R) instead of hard refresh (Cmd+Shift+R)

**3. The Number Might Be Correct**
- Active Users is a ROLLING WINDOW, not cumulative
- If you have stable usage, the number will stabilize
- 321 unique users in 30 days is reasonable for early-stage SaaS
- Number only grows if you get NEW users, not if same users keep using

**4. Data Not Flowing**
- Check if events are being created (see SQL queries below)

### How to Verify

#### Step 1: Check Recent Events (Run in Supabase SQL Editor)

```sql
-- Events created TODAY
SELECT
  event_type,
  COUNT(*) as count,
  COUNT(DISTINCT user_id) FILTER (WHERE user_id IS NOT NULL) as registered_users,
  COUNT(DISTINCT anonymous_id) FILTER (WHERE user_id IS NULL) as anonymous_users
FROM analytics_events
WHERE created_at >= CURRENT_DATE
GROUP BY event_type
ORDER BY count DESC;
```

**Expected:** If your app is active, you should see events from today.

#### Step 2: Verify Active Users Calculation (Last 30 Days)

```sql
-- Manually calculate what Active Users SHOULD be
SELECT
  COUNT(DISTINCT user_id) FILTER (WHERE user_id IS NOT NULL) as registered_active,
  COUNT(DISTINCT anonymous_id) FILTER (WHERE user_id IS NULL AND anonymous_id IS NOT NULL) as anonymous_active,
  COUNT(DISTINCT user_id) FILTER (WHERE user_id IS NOT NULL) +
  COUNT(DISTINCT anonymous_id) FILTER (WHERE user_id IS NULL AND anonymous_id IS NOT NULL) as total_active,
  COUNT(*) as total_events
FROM analytics_events
WHERE created_at >= NOW() - INTERVAL '30 days';
```

**Expected:** `total_active` should match the "Active Users" shown in dashboard.

#### Step 3: Check Daily Event Trend

```sql
-- Events per day for last 7 days
SELECT
  DATE(created_at) as date,
  COUNT(*) as events,
  COUNT(DISTINCT COALESCE(user_id, anonymous_id)) as unique_users
FROM analytics_events
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

**Expected:** Should see daily fluctuation, not zeros.

#### Step 4: Check Timeframe Comparison

```sql
-- Current period (last 30 days)
SELECT
  'Current Period' as period,
  COUNT(DISTINCT COALESCE(user_id, anonymous_id)) as active_users,
  COUNT(*) as events
FROM analytics_events
WHERE created_at >= NOW() - INTERVAL '30 days';

-- Previous period (30-60 days ago)
SELECT
  'Previous Period' as period,
  COUNT(DISTINCT COALESCE(user_id, anonymous_id)) as active_users,
  COUNT(*) as events
FROM analytics_events
WHERE created_at >= NOW() - INTERVAL '60 days'
  AND created_at < NOW() - INTERVAL '30 days';
```

**Expected:** Current period should have more/similar events if growing.

### Debug Logging

The code now includes debug logs (lines 101-114 in queries.ts):

```
[Analytics Debug] Fetching active users from 2025-10-23T...
[Analytics Debug] Found 1234 events
[Analytics Debug] Active users - Registered: 285, Anonymous: 36, Total: 321
```

**To see these:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Reload analytics dashboard (Cmd+R, NOT hard refresh)
4. Look for `[Analytics Debug]` messages
5. Compare numbers with SQL queries above

---

## 📈 What We Show in Dashboard

### North Star Metrics
- **MRR:** Current monthly recurring revenue
- **Active Users:** Unique users in timeframe
- **Conversion Rate:** % of users who upgraded to premium

### Revenue Health
- **MRR Breakdown:** Total, New, Churned, Net Growth
- **Churn Risk:** Premium users with no activity in 7 days
- **LTV Estimate:** Based on retention data

### Conversion Funnel
**Registered Users:**
1. Active Users (had events)
2. Visited Pricing (pricing_page_visited)
3. Started Checkout (checkout_started)
4. Converted (plan_type = premium)

**Anonymous Users:**
1. Anonymous Visitors
2. Visited Pricing
3. Started Checkout
4. Signed Up (signup)

### Product Engagement
- **Tool Usage:** Uses and unique users per tool
- **Mode Usage:** Which modes are popular
- **Feature Requests:** Blocked feature attempts

### User Insights (NEW)
- **Demographics:** Breakdown by role, primary use, discovery source
- **Conversion by Role:** Which segments convert best
- **Top Users:** Most active users
- **Recent Signups:** Latest registrations

### Registered Users List (NEW)
- Full list with profile tags
- Filters by plan, role, test users
- Search by email/name
- Copy emails functionality

---

## 🔍 Current Tracking Coverage

### ✅ What We Track Well
- Product usage (completions) ✅
- Conversion funnel events ✅
- Limit/blocked events ✅
- Auth events ✅
- User profiles (role, use, source) ✅

### ⚠️ What We're Missing
- **Premium feature usage:** Don't track which premium features are used
- **Error events:** Don't track when analysis fails
- **Tool switching:** Don't track when users switch between tools
- **Time on page:** Not tracking session duration
- **API errors:** Don't track backend errors that affect UX

### 💡 Potential Additions
1. **Error tracking:**
   ```typescript
   trackEvent({
     eventType: 'analysis_error',
     toolType: 'detector',
     metadata: { error_code, error_message }
   });
   ```

2. **Feature usage:**
   ```typescript
   trackEvent({
     eventType: 'feature_used',
     toolType: 'humanizador',
     metadata: { feature: 'file_upload', plan: 'premium' }
   });
   ```

3. **Session metrics:**
   ```typescript
   trackEvent({
     eventType: 'session_end',
     metadata: {
       duration_seconds: 245,
       tools_used: ['detector', 'humanizador'],
       total_analyses: 3
     }
   });
   ```

---

## 🎯 Key Takeaways

### What "Active Users" Means
- **NOT** cumulative all-time users
- **NOT** just users who completed analyses
- **IS** unique users with ANY event in the timeframe
- **IS** a rolling window (last X days)

### Why It Might Look "Stuck"
1. Stable user base (same users returning)
2. Browser caching (fixed in recent commit)
3. Growing slowly (need more traffic for noticeable change)

### What's Normal
- 321 active users in 30 days = ~10-11 per day
- For early-stage SaaS, this is reasonable
- Focus on conversion rate (currently ~12%) more than raw numbers

### Next Steps
1. Run the SQL queries above to verify data is flowing
2. Check browser console for debug logs
3. If numbers match → Active Users is working correctly
4. If numbers don't match → investigate caching or query logic
5. Focus on growing traffic AND conversion rate

---

## 📚 Related Files

**Tracking:**
- `src/lib/analytics/trackEvent.ts` - Event definitions
- `src/lib/analytics/client.ts` - Client tracking
- `src/app/api/analytics/track/route.ts` - Tracking API

**Metrics:**
- `src/lib/analytics/queries.ts` - ALL calculations (CRITICAL FILE)
- `src/lib/analytics/types.ts` - TypeScript types

**Dashboard:**
- `src/app/api/admin/analytics-v2/route.ts` - Dashboard API
- `src/app/admin/analytics/AnalyticsDashboardV2.tsx` - Dashboard UI
- `src/app/admin/analytics/components/*` - Dashboard components

**Database:**
- `supabase/migrations/20251118_create_analytics_events.sql` - Schema

**Docs:**
- `ANALYTICS_DASHBOARD_FAQ.md` - Detailed FAQ
- `ANALYTICS_TRACKING_REVIEW.md` - This file
