import Link from "next/link";
import { getAllArticles, type Article } from "@/lib/articles";
import { ArrowRight, Clock } from "lucide-react";

function FeaturedHero({ article }: { article: Article }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group block relative h-[80vh] min-h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={article.coverImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920"}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-16 md:pb-24">
          <div className="max-w-3xl">
            <span className="inline-block text-white/80 text-xs font-bold tracking-[0.2em] uppercase mb-4 border border-white/40 px-3 py-1">
              {article.column || "Feature"}
            </span>
            <h1 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-4 leading-[1.1] group-hover:text-white/90 transition-colors">
              {article.title}
            </h1>
            <p className="text-white/70 text-base md:text-lg lg:text-xl leading-relaxed mb-6 line-clamp-2 md:line-clamp-3">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-6 text-white/60 text-sm">
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {article.readTime}
              </span>
              <span>{article.date}</span>
              <span className="text-primary font-medium">Read More →</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <article className="overflow-hidden">
        {/* Image */}
        <div className={`relative overflow-hidden bg-gray-100 ${featured ? "aspect-[4/3]" : "aspect-[3/4]"}`}>
          <img
            src={article.coverImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600"}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        {/* Content */}
        <div className="pt-4 pb-2">
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-500 block mb-2">
            {article.column || "Article"}
          </span>
          <h2 className={`font-serif font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors leading-tight ${featured ? "text-xl md:text-2xl" : "text-base md:text-lg"}`}>
            {article.title}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3 hidden sm:block">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>{article.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {article.readTime}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-10 md:mb-14">
      <h2 className="font-serif font-bold text-2xl md:text-3xl text-gray-900 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-500 mt-2 text-sm md:text-base">{subtitle}</p>
      )}
      <div className="mt-4 w-12 h-0.5 bg-primary mx-auto"></div>
    </div>
  );
}

export default function HomePage() {
  const articles = getAllArticles();
  const featured = articles[0];
  const rest = articles.slice(1);
  
  // Take first 3 articles for featured row
  const featuredRow = rest.slice(0, 3);
  const gridArticles = rest.slice(3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <FeaturedHero article={featured} />

      {/* Featured Stories Row */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 border-b border-gray-200">
        <SectionHeader 
          title="Latest Stories" 
          subtitle="Essential reading for today"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {featuredRow.map((article) => (
            <ArticleCard key={article.slug} article={article} featured />
          ))}
        </div>
      </section>

      {/* More Stories Grid - Masonry-like */}
      {gridArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <SectionHeader title="More Stories" />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {gridArticles.map((article, index) => (
              <ArticleCard 
                key={article.slug} 
                article={article}
                featured={index === 0}
              />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="bg-black text-white py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4 tracking-tight">
            Subscribe to LT Magazine
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Get the latest stories delivered to your inbox. Join our community of readers.
          </p>
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 font-medium text-sm tracking-wider hover:bg-white/90 transition-colors"
          >
            Subscribe Now <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white/60 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-serif text-xl text-white">LT Magazine</div>
            <p className="text-sm">© 2026 LT Magazine. All rights reserved.</p>
            <div className="flex gap-6 text-xs">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/unsubscribe" className="hover:text-white transition-colors">Unsubscribe</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
