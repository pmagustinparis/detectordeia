-- ============================================
-- Migration: Add Express Plan Support
-- Date: 2025-11-27
-- ============================================

-- Add express_expires_at column to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS express_expires_at TIMESTAMP WITH TIME ZONE;

-- Create index for efficient queries
CREATE INDEX IF NOT EXISTS idx_users_express_expires
ON users(express_expires_at)
WHERE express_expires_at IS NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN users.express_expires_at IS
'Timestamp cuando expira el pase Express de 24h. NULL si no tiene pase activo.';

-- Optional: Add helper function to check if Express is active
CREATE OR REPLACE FUNCTION is_express_active(user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  expires_at TIMESTAMP WITH TIME ZONE;
BEGIN
  SELECT express_expires_at INTO expires_at
  FROM users
  WHERE id = user_id;

  RETURN expires_at IS NOT NULL AND expires_at > NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION is_express_active(UUID) IS
'Verifica si un usuario tiene un pase Express activo';
