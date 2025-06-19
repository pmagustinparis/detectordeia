-- Create the feedbacks table
CREATE TABLE IF NOT EXISTS feedbacks (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    original_text TEXT NOT NULL,
    result INTEGER NOT NULL,
    util TEXT,
    uso TEXT,
    comentario TEXT,
    label TEXT
); 