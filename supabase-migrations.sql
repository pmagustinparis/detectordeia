-- ============================================
-- DETECTORDEIA - SUPABASE DATABASE SCHEMA
-- Fase 0: Base de datos + Autenticación
-- ============================================

-- Este archivo contiene todas las migrations necesarias para Fase 0.
-- Ejecutar en Supabase SQL Editor en el orden que aparece.

-- ============================================
-- 1. TABLA: users
-- ============================================
-- Almacena información de perfil de usuarios.
-- Se conecta con auth.users (Supabase Auth built-in).

CREATE TABLE IF NOT EXISTS users (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Auth (conecta con Supabase Auth)
  auth_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Profile
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  avatar_url TEXT,

  -- Plan type
  plan_type VARCHAR(20) DEFAULT 'free' CHECK (plan_type IN ('free', 'premium')),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes para performance
CREATE INDEX IF NOT EXISTS idx_users_auth_id ON users(auth_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_plan_type ON users(plan_type);

-- Comentarios
COMMENT ON TABLE users IS 'Perfiles de usuarios registrados';
COMMENT ON COLUMN users.auth_id IS 'Referencia a auth.users (Supabase Auth)';
COMMENT ON COLUMN users.plan_type IS 'free o premium';


-- ============================================
-- 2. TABLA: subscriptions
-- ============================================
-- Información de suscripciones Premium (para Fase 1).
-- Creamos la estructura ahora para facilitar Fase 1.

CREATE TABLE IF NOT EXISTS subscriptions (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- User reference
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Stripe info (Fase 1)
  stripe_customer_id VARCHAR(255) UNIQUE,
  stripe_subscription_id VARCHAR(255) UNIQUE,
  stripe_price_id VARCHAR(255),

  -- Status
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'trialing', 'incomplete')),

  -- Billing periods
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- Comentarios
COMMENT ON TABLE subscriptions IS 'Suscripciones Premium (Fase 1 - Stripe)';
COMMENT ON COLUMN subscriptions.status IS 'Estado de la suscripción Stripe';


-- ============================================
-- 3. TABLA: usage_tracking
-- ============================================
-- Tracking de uso de herramientas para rate limiting.
-- Soporta usuarios autenticados Y anónimos.

CREATE TABLE IF NOT EXISTS usage_tracking (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- User (puede ser NULL para anónimos)
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,

  -- Anonymous tracking (para usuarios no autenticados)
  anonymous_id VARCHAR(255),
  ip_address INET,

  -- Tool usage
  tool_type VARCHAR(20) NOT NULL CHECK (tool_type IN ('detector', 'humanizador', 'parafraseador')),

  -- Request details
  input_length INTEGER NOT NULL,
  output_length INTEGER,

  -- Status
  success BOOLEAN DEFAULT TRUE,
  error_message TEXT,

  -- Timestamp
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes para queries de rate limiting
CREATE INDEX IF NOT EXISTS idx_usage_user_id ON usage_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_anonymous_id ON usage_tracking(anonymous_id);
CREATE INDEX IF NOT EXISTS idx_usage_created_at ON usage_tracking(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_usage_tool_type ON usage_tracking(tool_type);
CREATE INDEX IF NOT EXISTS idx_usage_user_created ON usage_tracking(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_usage_anon_created ON usage_tracking(anonymous_id, created_at DESC);

-- Comentarios
COMMENT ON TABLE usage_tracking IS 'Tracking de uso para rate limiting';
COMMENT ON COLUMN usage_tracking.user_id IS 'NULL para usuarios anónimos';
COMMENT ON COLUMN usage_tracking.anonymous_id IS 'Cookie/fingerprint para anónimos';


-- ============================================
-- 4. TABLA: email_waitlist
-- ============================================
-- Emails capturados vía EmailCaptureModal.
-- Migración de datos desde Google Sheets.

CREATE TABLE IF NOT EXISTS email_waitlist (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Email
  email VARCHAR(255) NOT NULL,

  -- Source tracking
  source VARCHAR(100) NOT NULL,

  -- Metadata
  ip_address INET,
  user_agent TEXT,

  -- Status
  notified BOOLEAN DEFAULT FALSE,
  notified_at TIMESTAMP WITH TIME ZONE,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Constraint: Un email puede estar múltiples veces si viene de sources distintos
CREATE UNIQUE INDEX IF NOT EXISTS idx_waitlist_email_source ON email_waitlist(email, source);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON email_waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_notified ON email_waitlist(notified);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON email_waitlist(created_at DESC);

-- Comentarios
COMMENT ON TABLE email_waitlist IS 'Emails capturados para notificar sobre Premium';
COMMENT ON COLUMN email_waitlist.source IS 'Ejemplo: humanizador-overlay-premium';
COMMENT ON COLUMN email_waitlist.notified IS 'TRUE cuando se notifica del lanzamiento';


-- ============================================
-- 5. TABLA: history
-- ============================================
-- Historial de usos de las herramientas.
-- Solo para usuarios autenticados.

CREATE TABLE IF NOT EXISTS history (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- User reference (required - solo autenticados tienen historial)
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Tool info
  tool_type VARCHAR(20) NOT NULL CHECK (tool_type IN ('detector', 'humanizador', 'parafraseador')),
  mode VARCHAR(50),

  -- Content (guardamos input y output completos)
  input_text TEXT NOT NULL,
  output_text TEXT NOT NULL,

  -- Metadata
  input_length INTEGER NOT NULL,
  output_length INTEGER NOT NULL,

  -- Timestamp
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes para queries de historial
CREATE INDEX IF NOT EXISTS idx_history_user_id ON history(user_id);
CREATE INDEX IF NOT EXISTS idx_history_tool_type ON history(tool_type);
CREATE INDEX IF NOT EXISTS idx_history_created_at ON history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_history_user_created ON history(user_id, created_at DESC);

-- Comentarios
COMMENT ON TABLE history IS 'Historial de usos para usuarios autenticados';
COMMENT ON COLUMN history.mode IS 'Ejemplo: standard, creative, formal (para modos premium)';


-- ============================================
-- 6. TRIGGER: Auto-crear user al registrarse
-- ============================================
-- Cuando alguien se registra con Google OAuth, Supabase crea un registro
-- en auth.users. Este trigger automáticamente crea el registro en nuestra
-- tabla users con los datos del perfil.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (auth_id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger que ejecuta la función cuando se crea un usuario
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Comentario
COMMENT ON FUNCTION public.handle_new_user() IS 'Auto-crea user profile cuando alguien se registra';


-- ============================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
-- Políticas de seguridad que garantizan que usuarios solo puedan
-- ver/editar sus propios datos.

-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE history ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 7.1 RLS: users
-- ============================================

-- Policy: Usuarios pueden ver su propio perfil
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = auth_id);

-- Policy: Usuarios pueden actualizar su propio perfil
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = auth_id);

-- Policy: Service role puede insertar (usado por trigger)
CREATE POLICY "Service role can insert users"
  ON users FOR INSERT
  WITH CHECK (true);


-- ============================================
-- 7.2 RLS: subscriptions
-- ============================================

-- Policy: Usuarios pueden ver su propia suscripción
CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

-- Policy: Service role puede insertar/actualizar (para Stripe webhooks en Fase 1)
CREATE POLICY "Service role can manage subscriptions"
  ON subscriptions FOR ALL
  USING (true)
  WITH CHECK (true);


-- ============================================
-- 7.3 RLS: usage_tracking
-- ============================================

-- Policy: Usuarios pueden ver su propio tracking
CREATE POLICY "Users can view own usage"
  ON usage_tracking FOR SELECT
  USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

-- Policy: Service role puede insertar (usado por API routes)
CREATE POLICY "Service role can insert usage"
  ON usage_tracking FOR INSERT
  WITH CHECK (true);


-- ============================================
-- 7.4 RLS: email_waitlist
-- ============================================

-- Policy: Cualquiera puede insertar (captura de emails es pública)
CREATE POLICY "Anyone can insert to waitlist"
  ON email_waitlist FOR INSERT
  WITH CHECK (true);

-- Policy: Service role puede leer todo (para notificaciones)
CREATE POLICY "Service role can read waitlist"
  ON email_waitlist FOR SELECT
  USING (true);


-- ============================================
-- 7.5 RLS: history
-- ============================================

-- Policy: Usuarios pueden ver su propio historial
CREATE POLICY "Users can view own history"
  ON history FOR SELECT
  USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

-- Policy: Usuarios pueden insertar en su propio historial
CREATE POLICY "Users can insert own history"
  ON history FOR INSERT
  WITH CHECK (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

-- Policy: Usuarios pueden eliminar de su propio historial
CREATE POLICY "Users can delete own history"
  ON history FOR DELETE
  USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));


-- ============================================
-- 8. FUNCIONES DE UTILIDAD
-- ============================================

-- Función para limpiar historial viejo (ejecutar con cron job)
CREATE OR REPLACE FUNCTION public.cleanup_old_history()
RETURNS void AS $$
BEGIN
  DELETE FROM history
  WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.cleanup_old_history() IS 'Elimina historial mayor a 90 días (ejecutar 1x semana)';


-- Función para limpiar usage_tracking viejo
CREATE OR REPLACE FUNCTION public.cleanup_old_usage()
RETURNS void AS $$
BEGIN
  DELETE FROM usage_tracking
  WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.cleanup_old_usage() IS 'Elimina tracking mayor a 90 días (ejecutar 1x semana)';


-- ============================================
-- 9. VERIFICACIÓN
-- ============================================
-- Queries para verificar que todo se creó correctamente

-- Verificar tablas creadas
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('users', 'subscriptions', 'usage_tracking', 'email_waitlist', 'history')
ORDER BY table_name;

-- Verificar indexes creados
SELECT
  tablename,
  indexname
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('users', 'subscriptions', 'usage_tracking', 'email_waitlist', 'history')
ORDER BY tablename, indexname;

-- Verificar RLS habilitado
SELECT
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('users', 'subscriptions', 'usage_tracking', 'email_waitlist', 'history');

-- Verificar policies creadas
SELECT
  tablename,
  policyname,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;


-- ============================================
-- ✅ MIGRATION COMPLETA
-- ============================================
-- Si llegaste aquí sin errores, la base de datos está lista.
--
-- Próximos pasos:
-- 1. Configurar Google OAuth en Supabase dashboard
-- 2. Copiar credenciales a Vercel
-- 3. Implementar lógica de Next.js
