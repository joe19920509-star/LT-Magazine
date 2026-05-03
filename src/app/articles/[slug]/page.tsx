import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug, markdownToHtml } from "@/lib/articles";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { ContentGate } from "@/components/ContentGate";
import { resolveMediaUrl, rewriteHtmlAssetUrls } from "@/lib/site";

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "文章未找到" };
  return {
    title: `${article.title} | LT 财经`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const fullContentRaw = article.content
    ? await markdownToHtml(article.content)
    : article.excerpt;
  const fullContent = rewriteHtmlAssetUrls(fullContentRaw);

  // 生成预览内容（前 300 字或前 2 段）
  const previewText = article.content 
    ? article.content.split(/\n\n/).slice(0, 2).join('\n\n')
    : article.excerpt;
  const previewContent = rewriteHtmlAssetUrls(
    await markdownToHtml(previewText)
  );
  const coverSrc = article.coverImage
    ? resolveMediaUrl(article.coverImage)
    : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation bar */}
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted hover:text-black transition-colors text-sm"
          >
            <ArrowLeft size={16} /> 返回首页
          </Link>
        </div>
      </div>

      {/* Hero Image - Full width */}
      {coverSrc && (
        <div className="w-full border-b border-neutral-200">
          <img
            src={coverSrc}
            alt={article.title}
            className="w-full h-[50vh] md:h-[60vh] object-cover"
          />
        </div>
      )}

      {/* Article Header - WSJ style */}
      <div className="max-w-3xl mx-auto px-4 pt-8 md:pt-12">
        {/* Category & Date line */}
        <div className="flex flex-wrap items-center gap-4 mb-6 pb-4 border-b border-neutral-200">
          <span className="font-ui text-[10px] font-bold tracking-[0.2em] uppercase text-primary">
            {article.column || "Article"}
          </span>
          <span className="font-ui text-xs text-muted uppercase tracking-wide">
            {article.category}
          </span>
        </div>

        <h1 className="font-heading font-bold text-3xl md:text-5xl text-wsj-navy mb-6 leading-[1.08] tracking-tight">
          {article.title}
        </h1>

        {/* Deck/Subheadline */}
        {article.excerpt && (
          <p className="text-xl md:text-2xl text-muted leading-relaxed mb-6 font-serif">
            {article.excerpt}
          </p>
        )}

        {/* Byline */}
        <div className="flex flex-wrap items-center gap-6 font-ui text-xs uppercase tracking-wide text-muted py-6 border-t border-b border-neutral-200 mb-8">
          <span className="font-semibold text-wsj-navy">
            {article.author || "LT 财经"}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} /> {article.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} /> {article.readTime || "10 min read"}
          </span>
        </div>
      </div>

      {/* Article Body - WSJ newspaper style */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <ContentGate previewContent={previewContent} fullContent={fullContent} />
      </div>

      {/* CTA - WSJ style */}
      <div className="border-t border-gray-200 mt-8">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <h3 className="font-heading font-bold text-2xl mb-3">
            喜欢这篇文章？
          </h3>
          <p className="text-muted mb-6 max-w-md mx-auto">
            订阅 LT 财经，获取与 ltmagazine.com 同步的深度报道与通讯。
          </p>
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-medium text-sm tracking-wide uppercase hover:bg-primary transition-colors"
          >
            立即订阅
          </Link>
        </div>
      </div>
    </div>
  );
}
