-- ============================================
-- Fix: user_profiles RLS policy para service role
-- Problema: La policy actual puede no funcionar correctamente
-- Solución: Usar bypass automático del service role
-- ============================================

-- Eliminar la policy existente de service role
DROP POLICY IF EXISTS "Service role can read all profiles" ON user_profiles;

-- El service role key de Supabase automáticamente bypasses RLS
-- No necesitamos una policy especial
-- Pero por si acaso, creamos una policy más permisiva basada en el role del sistema

CREATE POLICY "Service role can read all profiles"
ON user_profiles
FOR SELECT
TO service_role
USING (true);

-- También permitir al service role actualizar para analytics
CREATE POLICY "Service role can update all profiles"
ON user_profiles
FOR UPDATE
TO service_role
USING (true);

-- Comentario explicativo
COMMENT ON POLICY "Service role can read all profiles" ON user_profiles
IS 'Permite al service role (usado en analytics API) leer todos los perfiles de usuarios';
