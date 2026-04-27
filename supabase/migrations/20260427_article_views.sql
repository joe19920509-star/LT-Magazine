-- 文章阅读量统计表
CREATE TABLE IF NOT EXISTS article_views (
  id BIGSERIAL PRIMARY KEY,
  article_slug TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建索引加速查询
CREATE INDEX IF NOT EXISTS idx_article_views_slug ON article_views(article_slug);
CREATE INDEX IF NOT EXISTS idx_article_views_created_at ON article_views(created_at);

-- 汇总视图：每篇文章的阅读量
CREATE OR REPLACE VIEW article_view_counts AS
SELECT 
  article_slug,
  COUNT(*) as total_views,
  COUNT(DISTINCT ip_address) as unique_views
FROM article_views
GROUP BY article_slug;

-- RLS 策略：允许匿名插入（记录浏览），允许所有人读取
ALTER TABLE article_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON article_views
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public reads" ON article_views
  FOR SELECT USING (true);
