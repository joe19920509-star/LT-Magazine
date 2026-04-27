import Link from "next/link";
import { getAllArticles, type Article } from "@/lib/articles";
import { ArrowRight, Clock } from "lucide-react";

function FeaturedHero({ article }: { article: Article }) {
  return (
    <section className="border-b-2 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Main story - 8 columns */}
          <div className="lg:col-span-8 border-r-0 lg:border-r border-gray-300">
            <Link href={`/articles/${article.slug}`} className="group block">
              <div className="relative aspect-[16/9] lg:aspect-auto lg:h-full min-h-[400px] overflow-hidden">
                <img
                  src={article.coverImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200"}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          </div>

          {/* Side stories - 4 columns */}
          <div className="lg:col-span-4 flex flex-col">
            <Link href={`/articles/${article.slug}`} className="group block p-6 border-b border-gray-300 flex-1">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-primary block mb-3">
                {article.column || "Featured"}
              </span>
              <h1 className="font-heading font-bold text-2xl md:text-3xl text-black mb-3 leading-tight group-hover:text-primary transition-colors">
                {article.title}
              </h1>
              <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs text-muted">
                <span>{article.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
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
  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <article className="flex flex-col h-full">
        {/* Image */}
        <div className="relative overflow-hidden bg-gray-100 aspect-[4/3] mb-4">
          <img
            src={article.coverImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600"}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        {/* Content */}
        <div className="flex-1 flex flex-col">
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary block mb-2">
            {article.column || "Article"}
          </span>
          <h3 className="font-heading font-bold text-lg text-black mb-2 group-hover:text-primary transition-colors leading-tight">
            {article.title}
          </h3>
          <p className="text-muted text-sm leading-relaxed line-clamp-2 mb-3">
            {article.excerpt}
          </p>
          <div className="mt-auto flex items-center gap-3 text-xs text-muted">
            <span>{article.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {article.readTime}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function ArticleListItem({ article }: { article: Article }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group block py-4 border-b border-gray-200">
      <article className="flex gap-4">
        {/* Image */}
        <div className="relative overflow-hidden bg-gray-100 w-24 h-24 flex-shrink-0">
          <img
            src={article.coverImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200"}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Content */}
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary block mb-1">
            {article.column || "Article"}
          </span>
          <h3 className="font-heading font-bold text-base text-black group-hover:text-primary transition-colors leading-tight line-clamp-2">
            {article.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-muted mt-2">
            <span>{article.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {article.readTime}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="border-b-2 border-black mb-6 pb-2">
      <h2 className="font-heading font-bold text-xl text-black tracking-tight">
        {title}
      </h2>
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
      {/* Hero Section - WSJ front page style */}
      <FeaturedHero article={featured} />

      {/* Three featured stories */}
      <section className="max-w-7xl mx-auto px-4 py-8 border-b border-gray-200">
        <SectionHeader title="Latest" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featuredRow.map((article, index) => (
            <div key={article.slug} className={index < 2 ? "border-r-0 md:border-r border-gray-200 pr-0 md:pr-6" : ""}>
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </section>

      {/* Two column layout - WSJ newspaper style */}
      {gridArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main content - 8 columns */}
            <div className="lg:col-span-8">
              <SectionHeader title="More Stories" />

              {/* Grid of article cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
                {gridArticles.map((article, index) => (
                  <div key={article.slug} className={index % 2 === 0 ? "border-r-0 sm:border-r border-gray-200 pr-0 sm:pr-8" : ""}>
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar - 4 columns */}
            <div className="lg:col-span-4">
              <SectionHeader title="Trending" />

              {/* List of trending articles */}
              <div className="divide-y divide-gray-200">
                {gridArticles.slice(0, 4).map((article, index) => (
                  <div key={article.slug} className="flex gap-3 py-3">
                    <span className="font-heading font-bold text-3xl text-gray-200 w-8 flex-shrink-0">
                      {index + 1}
                    </span>
                    <Link href={`/articles/${article.slug}`} className="group flex-1">
                      <h4 className="font-heading font-bold text-sm text-black group-hover:text-primary transition-colors leading-tight line-clamp-3">
                        {article.title}
                      </h4>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Newsletter signup */}
              <div className="mt-8 p-6 bg-gray-50 border border-gray-200">
                <h3 className="font-heading font-bold text-lg text-black mb-2">
                  Newsletter
                </h3>
                <p className="text-sm text-muted mb-4">
                  Get the latest stories delivered to your inbox every week.
                </p>
                <Link
                  href="/auth"
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 text-xs font-medium tracking-wide uppercase hover:bg-primary transition-colors"
                >
                  Subscribe <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA - WSJ black bar style */}
      <section className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-heading font-bold text-2xl mb-1">
                Subscribe to LT Magazine
              </h2>
              <p className="text-white/60 text-sm">
                Join our community of readers. Free newsletter every week.
              </p>
            </div>
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 font-medium text-sm tracking-wider uppercase hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Subscribe Now <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - WSJ style */}
      <footer className="border-t-2 border-black bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-heading font-bold text-sm uppercase tracking-wide mb-4">Sections</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><Link href="/category/long-term-short-term" className="hover:text-black">Long Term & Short Term</Link></li>
                <li><Link href="/category/fast-slow" className="hover:text-black">Fast & Slow</Link></li>
                <li><Link href="/category/lab-to-market" className="hover:text-black">Lab to Market</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm uppercase tracking-wide mb-4">About</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><Link href="/about" className="hover:text-black">About Us</Link></li>
                <li><Link href="/launch-issue" className="hover:text-black">Launch Issue</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm uppercase tracking-wide mb-4">Account</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><Link href="/auth" className="hover:text-black">Sign In</Link></li>
                <li><Link href="/auth" className="hover:text-black">Subscribe</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm uppercase tracking-wide mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><Link href="mailto:joe19920509@gmail.com" className="hover:text-black">Email Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-heading text-xl font-bold">LT Magazine</div>
            <p className="text-xs text-muted">© 2026 LT Magazine. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
