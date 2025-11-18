-- ============================================
-- ANALYTICS EVENTS TABLE
-- ============================================
-- Tabla para eventos específicos de analytics y comportamiento de usuario
-- Complementa usage_tracking (que es para rate limiting)
-- Esta tabla captura eventos clave para conversión y engagement

CREATE TABLE IF NOT EXISTS analytics_events (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- User (puede ser NULL para anónimos)
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,

  -- Anonymous tracking
  anonymous_id VARCHAR(255),

  -- Tipo de evento
  event_type VARCHAR(50) NOT NULL,
  -- Ejemplos:
  -- 'hit_daily_limit' - Tocó límite de usos diarios
  -- 'hit_character_limit' - Tocó límite de caracteres
  -- 'viewed_pricing' - Vio página de precios
  -- 'clicked_upgrade' - Click en botón upgrade
  -- 'attempted_blocked_feature' - Intentó usar feature Pro bloqueada
  -- 'file_upload_blocked' - Intentó subir archivo (bloqueado en Free)
  -- 'premium_mode_blocked' - Intentó usar modo premium (bloqueado)
  -- 'completed_analysis' - Completó análisis exitoso
  -- 'signup' - Se registró
  -- 'login' - Hizo login

  -- Metadata flexible (JSON para datos específicos del evento)
  metadata JSONB DEFAULT '{}'::jsonb,
  -- Ejemplos de metadata:
  -- {tool: 'detector', limit_type: 'daily', current_count: 15}
  -- {feature: 'file_upload', file_type: 'pdf'}
  -- {mode: 'academic', tool: 'humanizador'}
  -- {plan_viewed: 'pro', price: '$10/mes'}

  -- Context adicional
  tool_type VARCHAR(20) CHECK (tool_type IN ('detector', 'humanizador', 'parafraseador', 'general')),
  page_url TEXT,
  referrer TEXT,

  -- Timestamp
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes para queries rápidas
CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_anonymous_id ON analytics_events(anonymous_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_user_event ON analytics_events(user_id, event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_anon_event ON analytics_events(anonymous_id, event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_tool_type ON analytics_events(tool_type);

-- Index compuesto para queries comunes de dashboard
CREATE INDEX IF NOT EXISTS idx_analytics_user_created ON analytics_events(user_id, created_at DESC) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_analytics_event_created ON analytics_events(event_type, created_at DESC);

-- Comentarios
COMMENT ON TABLE analytics_events IS 'Eventos de analytics para dashboard y conversión';
COMMENT ON COLUMN analytics_events.event_type IS 'Tipo de evento: hit_daily_limit, viewed_pricing, clicked_upgrade, etc';
COMMENT ON COLUMN analytics_events.metadata IS 'Datos adicionales del evento en formato JSON';
COMMENT ON COLUMN analytics_events.user_id IS 'NULL para usuarios anónimos';
COMMENT ON COLUMN analytics_events.anonymous_id IS 'Cookie/fingerprint para tracking de anónimos';

-- Row Level Security (RLS) - Solo admins pueden leer
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Policy: Solo service role puede insertar/leer (para proteger privacidad)
-- Los eventos se insertan desde el backend con service role
CREATE POLICY "Service role full access" ON analytics_events
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy: Usuarios pueden ver solo sus propios eventos (para debugging futuro)
CREATE POLICY "Users can view own events" ON analytics_events
  FOR SELECT
  TO authenticated
  USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));
