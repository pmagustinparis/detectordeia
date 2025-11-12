-- Crear la tabla team_inquiries para guardar contactos del formulario Team
CREATE TABLE IF NOT EXISTS team_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  team_size TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_team_inquiries_created_at ON team_inquiries(created_at DESC);
CREATE INDEX idx_team_inquiries_email ON team_inquiries(email);

-- Habilitar RLS (Row Level Security)
ALTER TABLE team_inquiries ENABLE ROW LEVEL SECURITY;

-- Política para permitir todas las operaciones (para el service role)
-- Esto permite que el endpoint API pueda insertar sin problemas
CREATE POLICY "Allow all operations for service role" ON team_inquiries
  FOR ALL USING (true);

-- Comentario para documentar la tabla
COMMENT ON TABLE team_inquiries IS 'Almacena las consultas de equipos/empresas desde el formulario de contacto Team en /pricing';
