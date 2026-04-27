import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ltmagazine.com';
  
  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/launch-issue`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/auth`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.5 },
  ];

  // Dynamic article pages
  const articles = getAllArticles();
  const articlePages = articles.map(article => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Category pages
  const categoryPages = [
    { url: `${baseUrl}/category/long-term-short-term`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${baseUrl}/category/fast-slow`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${baseUrl}/category/lab-to-market`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.6 },
  ];

  return [...staticPages, ...articlePages, ...categoryPages];
}
