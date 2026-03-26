-- ============================================================
-- User Understanding & Feedback System
-- Created: 2026-03-26
-- Run this in Supabase SQL Editor
-- ============================================================

-- ============================================================
-- TABLE: surveys
-- Unified container for all survey responses
-- (exit intent, post-use, churn, passive feedback)
-- ============================================================

CREATE TABLE IF NOT EXISTS surveys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_type TEXT NOT NULL CHECK (survey_type IN ('exit_intent', 'post_use', 'churn', 'passive_feedback')),
  question_key TEXT NOT NULL,
  response_text TEXT,
  response_option TEXT,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  anonymous_id TEXT,
  page_url TEXT,
  tool_type TEXT CHECK (tool_type IN ('detector', 'humanizador', 'parafraseador', NULL)),
  context JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_surveys_type ON surveys(survey_type);
CREATE INDEX IF NOT EXISTS idx_surveys_created_at ON surveys(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_surveys_user_id ON surveys(user_id);
CREATE INDEX IF NOT EXISTS idx_surveys_tool_type ON surveys(tool_type);

ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert surveys"
  ON surveys FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role reads surveys"
  ON surveys FOR SELECT
  USING (auth.role() = 'service_role');

-- ============================================================
-- TABLE: feature_requests
-- User-submitted feature ideas with upvoting
-- ============================================================

CREATE TABLE IF NOT EXISTS feature_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  tool_type TEXT CHECK (tool_type IN ('detector', 'humanizador', 'parafraseador', 'general')),
  submitted_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  submitted_by_anonymous_id TEXT,
  vote_count INTEGER DEFAULT 1,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'planned', 'shipped', 'declined')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_feature_requests_status ON feature_requests(status);
CREATE INDEX IF NOT EXISTS idx_feature_requests_votes ON feature_requests(vote_count DESC);
CREATE INDEX IF NOT EXISTS idx_feature_requests_created ON feature_requests(created_at DESC);

ALTER TABLE feature_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert feature requests"
  ON feature_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read feature requests"
  ON feature_requests FOR SELECT
  USING (true);

CREATE POLICY "Service role manages feature requests"
  ON feature_requests FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- TABLE: feature_request_votes
-- Prevents double-voting via unique constraints
-- ============================================================

CREATE TABLE IF NOT EXISTS feature_request_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_request_id UUID NOT NULL REFERENCES feature_requests(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  anonymous_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  -- Prevent double voting
  CONSTRAINT unique_vote_user UNIQUE (feature_request_id, user_id),
  CONSTRAINT unique_vote_anon UNIQUE (feature_request_id, anonymous_id),
  -- At least one identifier required
  CONSTRAINT vote_has_identifier CHECK (user_id IS NOT NULL OR anonymous_id IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS idx_votes_request_id ON feature_request_votes(feature_request_id);

ALTER TABLE feature_request_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can vote"
  ON feature_request_votes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read votes"
  ON feature_request_votes FOR SELECT
  USING (true);

-- Function to auto-update updated_at on feature_requests
CREATE OR REPLACE FUNCTION update_feature_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_feature_requests_updated_at
  BEFORE UPDATE ON feature_requests
  FOR EACH ROW EXECUTE FUNCTION update_feature_requests_updated_at();
