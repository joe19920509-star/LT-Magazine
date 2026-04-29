import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug, markdownToHtml } from "@/lib/articles";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { ContentGate } from "@/components/ContentGate";
import { ShareSection } from "@/components/ShareSection";

const siteUrl = 'https://ltmagazine.com';

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

  const ogImage = article.coverImage || `${siteUrl}/og-image.png`;

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: article.author || "LT Magazine" }],
    openGraph: {
      type: "article",
      locale: "zh_CN",
      url: `${siteUrl}/articles/${article.slug}`,
      title: article.title,
      description: article.excerpt,
      siteName: "LTMagazine",
      publishedTime: article.date,
      modifiedTime: article.date,
      authors: [article.author || "LT Magazine"],
      section: article.column || "Article",
      tags: [article.column, article.category, "LT Magazine"].filter(Boolean),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [ogImage],
    },
    alternates: {
      canonical: `${siteUrl}/articles/${article.slug}`,
    },
    other: {
      "weixin:timeline_title": article.title,
      "weixin:timeline_desc": article.excerpt,
    },
  };
}

// JSON-LD Article Schema
function ArticleJsonLd({ article }: { article: NonNullable<ReturnType<typeof getArticleBySlug>> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage || `${siteUrl}/og-image.png`,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Organization',
      name: article.author || 'LT Magazine',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'LT Magazine',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/articles/${article.slug}`,
    },
    articleSection: article.column || 'Article',
    inLanguage: 'zh-CN',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
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
    <div className="min-h-screen bg-white">
      <ArticleJsonLd article={article} />

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
      {article.coverImage && (
        <div className="w-full">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-[50vh] md:h-[60vh] object-cover"
          />
        </div>
      )}

      {/* Article Header - WSJ style */}
      <div className="max-w-3xl mx-auto px-4 pt-8 md:pt-12">
        {/* Category & Date line */}
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-primary">
            {article.column || "Article"}
          </span>
          <span className="text-xs text-muted">{article.category}</span>
        </div>

        {/* Headline */}
        <h1 className="font-heading font-bold text-3xl md:text-5xl text-black mb-6 leading-[1.1] tracking-tight">
          {article.title}
        </h1>

        {/* Deck/Subheadline */}
        {article.excerpt && (
          <p className="text-xl md:text-2xl text-muted leading-relaxed mb-6 font-serif">
            {article.excerpt}
          </p>
        )}

        {/* Byline with View Counter */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted py-6 border-t border-b border-gray-200 mb-8">
          <span className="font-medium text-black">
            {article.author || "LT Magazine"}
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

      {/* 分享区块 */}
      <div className="max-w-3xl mx-auto px-4">
        <ShareSection
          title={article.title}
          url={`${siteUrl}/articles/${article.slug}`}
          coverImage={article.coverImage}
        />
      </div>

      {/* CTA - WSJ style */}
      <div className="border-t border-gray-200 mt-8">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <h3 className="font-heading font-bold text-2xl mb-3">
            喜欢这篇文章？
          </h3>
          <p className="text-muted mb-6 max-w-md mx-auto">
            订阅 LT Magazine，每周获取最新科技商业深度报道。
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
