import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug, markdownToHtml } from "@/lib/articles";
import { ArrowLeft, Clock, Calendar, User, Tag } from "lucide-react";
import { ContentGate } from "@/components/ContentGate";

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
    title: `${article.title} | LTMagazine`,
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

  const fullContent = article.content
    ? await markdownToHtml(article.content)
    : article.excerpt;

  // 生成预览内容（前 300 字或前 2 段）
  const previewText = article.content 
    ? article.content.split(/\n\n/).slice(0, 2).join('\n\n')
    : article.excerpt;
  const previewContent = await markdownToHtml(previewText);

  return (
    <div className="min-h-screen bg-light">
      {/* Back */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors font-heading text-sm"
        >
          <ArrowLeft size={16} /> 返回首页
        </Link>
      </div>

      {/* Hero */}
      {article.coverImage && (
        <div className="max-w-4xl mx-auto px-4 mt-6">
          <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-dark text-white text-xs font-heading font-semibold px-3 py-1 rounded uppercase tracking-wide">
            {article.column}
          </span>
          <span className="flex items-center gap-1 text-muted text-xs">
            <Tag size={12} /> {article.category}
          </span>
        </div>
        <h1 className="font-heading font-bold text-3xl md:text-5xl mb-6 leading-tight">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-muted text-sm pb-8 border-b border-gray-200">
          <span className="flex items-center gap-1">
            <User size={14} /> {article.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} /> {article.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> {article.readTime}
          </span>
        </div>
      </div>

      {/* Article Body */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <ContentGate previewContent={previewContent} fullContent={fullContent} />
      </div>

      {/* CTA */}
      <div className="bg-dark text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-heading font-bold text-2xl mb-3">
            喜欢这篇文章？
          </h3>
          <p className="text-white/70 mb-6">订阅获取更多科技商业资讯</p>
          <Link
            href="/about"
            className="inline-block bg-primary text-white px-6 py-3 rounded font-heading font-semibold hover:bg-primary/90 transition-colors"
          >
            加入我们
          </Link>
        </div>
      </div>
    </div>
  );
}
