import Link from "next/link";
import { getArticlesByCategory, type Article } from "@/lib/articles";
import { ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  return [
    { name: "tech" },
    { name: "business" },
    { name: "科技" },
    { name: "商业" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const labels: Record<string, string> = {
    tech: "科技",
    Tech: "科技",
    business: "商业",
    Business: "商业",
    科技: "科技",
    商业: "商业",
  };
  return {
    title: `${labels[name] || name} | LTMagazine`,
    description: `浏览 LTMagazine 上所有 ${labels[name] || name} 类文章`,
  };
}

function ArticleRow({ article }: { article: Article }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <article className="flex gap-6 py-6 border-b border-gray-200 hover:bg-white/50 -mx-4 px-4 rounded transition-colors">
        {article.coverImage && (
          <div className="w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>
        )}
        <div>
          <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-muted text-sm line-clamp-2 mb-2">
            {article.excerpt}
          </p>
          <span className="text-muted text-xs">{article.date}</span>
        </div>
      </article>
    </Link>
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const labels: Record<string, string> = {
    tech: "科技",
    business: "商业",
    科技: "科技",
    商业: "商业",
  };
  const label = labels[name] || name;
  const articles = getArticlesByCategory(name);

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <div className="bg-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-primary font-heading text-sm uppercase tracking-wider">
            分类
          </span>
          <h1 className="font-heading font-bold text-4xl mt-2">{label}</h1>
          <p className="text-white/60 mt-2">
            共 {articles.length} 篇文章
          </p>
        </div>
      </div>

      {/* Article List */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleRow key={article.slug} article={article} />
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-muted text-lg mb-6">暂无 {label} 类文章</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary font-heading hover:gap-3 transition-all"
            >
              返回首页 <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
