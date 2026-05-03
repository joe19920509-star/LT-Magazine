import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import { resolveMediaUrl } from "@/lib/site";
import { Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "搜索",
  description: "在 LT 财经中搜索文章",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const raw = (q || "").trim();
  const needle = raw.toLowerCase();
  const articles = needle
    ? getAllArticles().filter((a) => {
        const hay = `${a.title} ${a.excerpt} ${a.category} ${a.column || ""} ${a.slug}`.toLowerCase();
        return hay.includes(needle);
      })
    : [];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <p className="font-ui text-xs uppercase tracking-widest text-muted mb-2">
          Search
        </p>
        <h1 className="font-heading text-3xl font-bold text-wsj-navy mb-2">
          搜索结果
        </h1>
        {raw ? (
          <p className="font-ui text-sm text-muted mb-8">
            关键词「<span className="text-black font-medium">{raw}</span>」共{" "}
            {articles.length} 篇
          </p>
        ) : (
          <p className="font-ui text-sm text-muted mb-8">
            请在顶部搜索框输入关键词。
          </p>
        )}

        {needle && articles.length === 0 && (
          <p className="text-muted font-serif">未找到匹配文章。</p>
        )}

        <ul className="space-y-6">
          {articles.map((article) => (
            <li
              key={article.slug}
              className="flex gap-4 border-b border-neutral-200 pb-6"
            >
              <Link
                href={`/articles/${article.slug}`}
                className="relative w-28 h-28 shrink-0 overflow-hidden bg-neutral-100"
              >
                <img
                  src={resolveMediaUrl(article.coverImage)}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </Link>
              <div className="min-w-0">
                <p className="font-ui text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                  {article.column || article.category || "Article"}
                </p>
                <Link
                  href={`/articles/${article.slug}`}
                  className="font-heading text-lg font-bold text-wsj-navy hover:text-primary transition-colors leading-snug"
                >
                  {article.title}
                </Link>
                <p className="text-sm text-muted mt-2 line-clamp-2 font-serif">
                  {article.excerpt}
                </p>
                <p className="font-ui text-xs text-muted mt-2 flex items-center gap-2">
                  <span>{article.date}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} />
                    {article.readTime}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-center">
          <Link
            href="/"
            className="font-ui text-sm font-semibold text-wsj-navy hover:text-primary uppercase tracking-wide"
          >
            ← 返回首页
          </Link>
        </p>
      </div>
    </div>
  );
}
