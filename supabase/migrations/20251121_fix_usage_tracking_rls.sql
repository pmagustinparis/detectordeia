-- ============================================
-- FIX: usage_tracking RLS policies
-- ============================================
-- Problema: Las API routes no pueden hacer SELECT en usage_tracking
-- para verificar rate limits de usuarios anónimos.
--
-- Solución: Agregar policy que permita al service role leer
-- todos los registros de usage_tracking (necesario para checkRateLimit).

-- Drop the restrictive policy
DROP POLICY IF EXISTS "Service role can insert usage" ON usage_tracking;

-- Create new policy that allows service role to SELECT and INSERT
CREATE POLICY "Service role can read and insert usage"
  ON usage_tracking
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Comentario
COMMENT ON POLICY "Service role can read and insert usage" ON usage_tracking IS
  'Permite a las API routes (service role) leer y escribir usage_tracking para rate limiting';
