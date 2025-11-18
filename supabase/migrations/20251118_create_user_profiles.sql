-- ============================================
-- Tabla: user_profiles
-- Propósito: Almacenar información de perfil del usuario (onboarding)
-- ============================================

CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Datos del perfil
  role VARCHAR(100), -- 'student', 'teacher', 'writer', 'journalist', 'professional', 'other'
  primary_use VARCHAR(100), -- 'detect_ai', 'humanize', 'paraphrase', 'review_work', 'other'
  discovery_source VARCHAR(100), -- 'google', 'social_media', 'recommendation', 'youtube', 'other_website', 'other'

  -- Metadata
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraint: Un perfil por usuario
  CONSTRAINT unique_user_profile UNIQUE (user_id)
);

-- ============================================
-- Índices para mejorar performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_primary_use ON user_profiles(primary_use);
CREATE INDEX IF NOT EXISTS idx_user_profiles_discovery_source ON user_profiles(discovery_source);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Los usuarios pueden ver solo su propio perfil
CREATE POLICY "Users can view their own profile"
ON user_profiles
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Los usuarios pueden insertar solo su propio perfil
CREATE POLICY "Users can insert their own profile"
ON user_profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Los usuarios pueden actualizar solo su propio perfil
CREATE POLICY "Users can update their own profile"
ON user_profiles
FOR UPDATE
USING (auth.uid() = user_id);

-- Policy: Service role puede leer todos los perfiles (para analytics)
CREATE POLICY "Service role can read all profiles"
ON user_profiles
FOR SELECT
USING (auth.jwt()->>'role' = 'service_role');

-- ============================================
-- Función para actualizar updated_at automáticamente
-- ============================================

CREATE OR REPLACE FUNCTION update_user_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profiles_updated_at_trigger
BEFORE UPDATE ON user_profiles
FOR EACH ROW
EXECUTE FUNCTION update_user_profiles_updated_at();

-- ============================================
-- Comentarios para documentación
-- ============================================

COMMENT ON TABLE user_profiles IS 'Almacena información de perfil del usuario obtenida durante el onboarding';
COMMENT ON COLUMN user_profiles.role IS 'Rol del usuario: student, teacher, writer, journalist, professional, other';
COMMENT ON COLUMN user_profiles.primary_use IS 'Uso principal: detect_ai, humanize, paraphrase, review_work, other';
COMMENT ON COLUMN user_profiles.discovery_source IS 'Cómo nos encontró: google, social_media, recommendation, youtube, other_website, other';
