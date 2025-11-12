-- Phase 3: AI Enhancement with RAG
-- Run these SQL commands in your Supabase SQL Editor

-- 1. Create chat_sessions table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  session_id TEXT UNIQUE NOT NULL,
  user_ip TEXT,
  user_agent TEXT,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ended_at TIMESTAMPTZ
);

CREATE INDEX idx_chat_sessions_session_id ON chat_sessions(session_id);

-- 2. Update chat_messages table (drop and recreate to add new columns)
-- IMPORTANT: This will delete existing chat_messages data!
-- If you want to preserve data, use ALTER TABLE ADD COLUMN instead

DROP TABLE IF EXISTS chat_messages CASCADE;

CREATE TABLE chat_messages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  session_id TEXT NOT NULL REFERENCES chat_sessions(session_id) ON DELETE CASCADE,
  user_message TEXT NOT NULL,
  bot_reply TEXT NOT NULL,
  embedding TEXT, -- JSON string of vector embedding
  context_used TEXT, -- Context retrieved from RAG
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX idx_chat_messages_created_at ON chat_messages(created_at);

-- 3. Create ai_corrections table
CREATE TABLE IF NOT EXISTS ai_corrections (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  wrong_response TEXT NOT NULL,
  correct_response TEXT NOT NULL,
  user_feedback TEXT,
  context TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ai_corrections_created_at ON ai_corrections(created_at);

-- 4. Create knowledge_base table
CREATE TABLE IF NOT EXISTS knowledge_base (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  content TEXT NOT NULL,
  embedding TEXT, -- JSON string of vector embedding
  category TEXT,
  metadata TEXT, -- JSON string with additional info
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_knowledge_base_category ON knowledge_base(category);
CREATE INDEX idx_knowledge_base_created_at ON knowledge_base(created_at);

-- 5. Enable Row Level Security (RLS) - Optional but recommended
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_corrections ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;

-- 6. Create policies for public read access
CREATE POLICY "Allow public read" ON knowledge_base FOR SELECT USING (true);

-- 7. Policies for admin-only write (you'll need to implement auth checks)
-- These are placeholder policies - customize based on your auth setup
CREATE POLICY "Allow service role all" ON chat_sessions FOR ALL USING (true);
CREATE POLICY "Allow service role all" ON chat_messages FOR ALL USING (true);
CREATE POLICY "Allow service role all" ON ai_corrections FOR ALL USING (true);
CREATE POLICY "Allow service role all" ON knowledge_base FOR ALL USING (true);

-- 8. Optional: Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_knowledge_base_updated_at BEFORE UPDATE ON knowledge_base
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 9. Optional: Add vector extension for future optimizations
-- (Requires pgvector extension - may need to enable in Supabase dashboard)
-- CREATE EXTENSION IF NOT EXISTS vector;
-- ALTER TABLE knowledge_base ADD COLUMN embedding_vector vector(768);
-- CREATE INDEX ON knowledge_base USING ivfflat (embedding_vector vector_cosine_ops);

-- Migration complete!
-- Next steps:
-- 1. Run this SQL in Supabase SQL Editor
-- 2. Initialize knowledge base via API: POST /api/knowledge/init (with admin auth)
-- 3. Test RAG chatbot
