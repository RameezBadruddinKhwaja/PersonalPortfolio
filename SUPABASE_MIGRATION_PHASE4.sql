-- Phase 4: CMS & Analytics
-- Run these SQL commands in your Supabase SQL Editor

-- 1. Update projects table with new columns
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS display_order INTEGER,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);

-- 2. Create cms_content table
CREATE TABLE IF NOT EXISTS cms_content (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  category TEXT,
  type TEXT DEFAULT 'text' CHECK (type IN ('text', 'markdown', 'json', 'image_url')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cms_content_category ON cms_content(category);
CREATE INDEX IF NOT EXISTS idx_cms_content_key ON cms_content(key);

-- 3. Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  page TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT,
  country TEXT,
  device TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_page ON analytics(page);
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON analytics(timestamp);
CREATE INDEX IF NOT EXISTS idx_analytics_device ON analytics(device);

-- 4. Enable RLS
ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- 5. Create policies for public read
CREATE POLICY "Allow public read" ON cms_content FOR SELECT USING (true);

-- 6. Create policies for service role
CREATE POLICY "Allow service role all" ON cms_content FOR ALL USING (true);
CREATE POLICY "Allow service role all" ON analytics FOR ALL USING (true);

-- 7. Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cms_content_updated_at BEFORE UPDATE ON cms_content
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Migration complete!
-- Next steps:
-- 1. Run this SQL in Supabase SQL Editor
-- 2. Test CMS content management via /api/cms
-- 3. Test project CRUD via /api/projects
-- 4. Enable analytics tracking in frontend
