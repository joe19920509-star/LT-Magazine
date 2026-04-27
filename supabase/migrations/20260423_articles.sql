-- Articles table for newsletter tracking
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  category TEXT DEFAULT 'General',
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published_at DESC);

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Allow public read" ON articles
  FOR SELECT USING (true);

-- Only allow authenticated users to insert/update
CREATE POLICY "Allow authenticated write" ON articles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON articles
  FOR UPDATE USING (true);

-- Function to log sent newsletters
CREATE TABLE IF NOT EXISTS newsletter_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  articles_count INTEGER,
  subscribers_count INTEGER,
  success_count INTEGER,
  error_count INTEGER
);
