import Link from "next/link";
import { getAllArticles, type Article } from "@/lib/articles";
import { ArrowRight, Clock } from "lucide-react";
import { resolveMediaUrl } from "@/lib/site";

function FeaturedHero({ article }: { article: Article }) {
  const img = resolveMediaUrl(article.coverImage);
  return (
    <section className="border-b-2 border-wsj-navy">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-8 border-r-0 lg:border-r border-neutral-300">
            <Link href={`/articles/${article.slug}`} className="group block">
              <div className="relative aspect-[16/9] lg:aspect-auto lg:h-full min-h-[360px] overflow-hidden bg-neutral-100">
                <img
                  src={img}
                  alt={article.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </Link>
          </div>

          <div className="lg:col-span-4 flex flex-col bg-white">
            <Link
              href={`/articles/${article.slug}`}
              className="group block p-6 lg:p-8 border-b border-neutral-300 flex-1"
            >
              <span className="font-ui text-[10px] font-bold tracking-[0.2em] uppercase text-primary block mb-3">
                {article.column || "封面报道"}
              </span>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-wsj-navy mb-3 leading-[1.15] group-hover:text-primary transition-colors">
                {article.title}
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-4 font-serif">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-3 font-ui text-[11px] text-muted uppercase tracking-wide">
                <span>{article.date}</span>
                <span className="text-neutral-300">|</span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={12} />
                  {article.readTime}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArticleCard({ article }: { article: Article }) {
  const img = resolveMediaUrl(article.coverImage);
  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <article className="flex flex-col h-full">
        <div className="relative overflow-hidden bg-neutral-100 aspect-[4/3] mb-4 border border-neutral-200">
          <img
            src={img}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <span className="font-ui text-[10px] font-bold tracking-[0.18em] uppercase text-primary block mb-2">
            {article.column || "报道"}
          </span>
          <h3 className="font-heading font-bold text-lg text-wsj-navy mb-2 group-hover:text-primary transition-colors leading-snug">
            {article.title}
          </h3>
          <p className="text-muted text-sm leading-relaxed line-clamp-3 mb-3 font-serif">
            {article.excerpt}
          </p>
          <div className="mt-auto flex items-center gap-3 font-ui text-[11px] text-muted uppercase tracking-wide">
            <span>{article.date}</span>
            <span>|</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={12} />
              {article.readTime}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function SectionHeader({ title, en }: { title: string; en?: string }) {
  return (
    <div className="border-b-2 border-wsj-navy mb-6 pb-2 flex items-end justify-between gap-4">
      <h2 className="font-heading font-bold text-xl text-wsj-navy tracking-tight">
        {title}
      </h2>
      {en && (
        <span className="font-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-muted pb-0.5">
          {en}
        </span>
      )}
    </div>
  );
}

export default function HomePage() {
  const articles = getAllArticles();
  const featured = articles[0];
  const rest = articles.slice(1);
  const featuredRow = rest.slice(0, 3);
  const gridArticles = rest.slice(3);

  if (!featured) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center font-ui text-muted">
        暂无文章
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <FeaturedHero article={featured} />

      <section className="max-w-7xl mx-auto px-4 py-10 border-b border-neutral-200">
        <SectionHeader title="最新深度" en="Latest" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {featuredRow.map((article, index) => (
            <div
              key={article.slug}
              className={
                index < 2
                  ? "border-r-0 md:border-r border-neutral-200 pr-0 md:pr-8"
                  : ""
              }
            >
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </section>

      {gridArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            <div className="lg:col-span-8">
              <SectionHeader title="更多报道" en="More Stories" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
                {gridArticles.map((article, index) => (
                  <div
                    key={article.slug}
                    className={
                      index % 2 === 0
                        ? "border-r-0 sm:border-r border-neutral-200 pr-0 sm:pr-8"
                        : ""
                    }
                  >
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-4">
              <SectionHeader title="趋势阅读" en="Trending" />

              <div className="divide-y divide-neutral-200 border-t border-neutral-200">
                {gridArticles.slice(0, 6).map((article, index) => (
                  <div key={article.slug} className="flex gap-3 py-4">
                    <span className="font-heading font-bold text-2xl text-neutral-200 w-8 shrink-0 leading-none">
                      {index + 1}
                    </span>
                    <Link href={`/articles/${article.slug}`} className="group flex-1 min-w-0">
                      <h4 className="font-heading font-bold text-sm text-wsj-navy group-hover:text-primary transition-colors leading-snug line-clamp-4">
                        {article.title}
                      </h4>
                    </Link>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-neutral-50 border border-neutral-200">
                <h3 className="font-heading font-bold text-lg text-wsj-navy mb-1">
                  Newsletter
                </h3>
                <p className="font-ui text-xs text-muted mb-4 leading-relaxed uppercase tracking-wide">
                  每周精选推送 · 与 ltmagazine.com 同源更新
                </p>
                <Link
                  href="/auth"
                  className="inline-flex items-center gap-2 bg-wsj-navy text-white px-5 py-3 font-ui text-[11px] font-bold uppercase tracking-widest hover:bg-wsj-navy-mid transition-colors"
                >
                  订阅 <ArrowRight size={12} />
                </Link>
              </div>
            </aside>
          </div>
        </section>
      )}

      <section className="bg-wsj-navy text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-heading font-bold text-2xl mb-1 text-white">
                订阅 LT 财经
              </h2>
              <p className="font-ui text-white/60 text-xs uppercase tracking-widest max-w-md">
                免费通讯 · 深度稿件与配图与 LT Magazine（ltmagazine.com）同步
              </p>
            </div>
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 bg-wsj-gold text-wsj-navy px-8 py-4 font-ui text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors whitespace-nowrap"
            >
              立即订阅 <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
