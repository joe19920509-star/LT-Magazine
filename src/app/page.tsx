import Link from "next/link";
import { getAllArticles, type Article } from "@/lib/articles";
import { ArrowRight } from "lucide-react";

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {article.coverImage && (
          <div className="aspect-video overflow-hidden">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-dark/10 text-dark text-xs font-heading font-semibold px-2 py-1 rounded uppercase tracking-wide">
              {article.column}
            </span>
            <span className="text-muted text-xs">{article.date}</span>
          </div>
          <h2 className="font-heading font-bold text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h2>
          <p className="text-body text-sm leading-relaxed line-clamp-3 mb-4">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-muted text-xs">{article.readTime}</span>
            <span className="text-primary text-sm font-heading font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              阅读全文 <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function HomePage() {
  const articles = getAllArticles();
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="min-h-screen bg-light">
      {/* Hero Section */}
      <section className="relative bg-dark text-white overflow-hidden">
        {featured?.coverImage && (
          <div className="absolute inset-0">
            <img
              src={featured.coverImage}
              alt=""
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-dark/60" />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-block bg-primary text-white text-xs font-heading font-semibold px-3 py-1 rounded uppercase tracking-wider mb-4">
              精选文章
            </span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
              {featured?.title || "LTMagazine"}
            </h1>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              {featured?.excerpt ||
                "连接科技与商业的桥梁，探索前沿趋势，洞察行业未来。"}
            </p>
            <Link
              href={featured ? `/articles/${featured.slug}` : "/"}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded font-heading font-semibold hover:bg-primary/90 transition-colors"
            >
              阅读全文 <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-heading font-bold text-3xl">最新文章</h2>
          <Link
            href="/category"
            className="text-primary font-heading text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
          >
            查看全部 <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {rest.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted text-lg">暂无更多文章</p>
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-3xl mb-4">
            订阅 LTMagazine
          </h2>
          <p className="text-white/70 mb-8 max-w-md mx-auto">
            获取每周精选科技商业资讯，洞察行业趋势
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded font-heading font-semibold hover:bg-primary/90 transition-colors"
          >
            立即注册 <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
