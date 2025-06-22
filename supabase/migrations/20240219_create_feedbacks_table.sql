-- Eliminar la tabla si existe
DROP TABLE IF EXISTS feedbacks;

-- Crear la tabla feedbacks con la estructura correcta
CREATE TABLE feedbacks (
  id SERIAL PRIMARY KEY,
  original_text TEXT NOT NULL,
  result INTEGER NOT NULL,
  util INTEGER,
  uso TEXT,
  comentario TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_feedbacks_created_at ON feedbacks(created_at);
CREATE INDEX idx_feedbacks_result ON feedbacks(result);

-- Habilitar RLS (Row Level Security) pero permitir todas las operaciones para el service role
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;

-- Política para permitir todas las operaciones (para el service role)
CREATE POLICY "Allow all operations for service role" ON feedbacks
  FOR ALL USING (true); 