import { getAllArticles, COLUMN_MAP } from "@/lib/articles";
import Link from "next/link";
import { resolveMediaUrl } from "@/lib/site";

export default async function ColumnPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const column = COLUMN_MAP[name];

  if (!column) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-heading font-bold text-wsj-navy mb-4">
          栏目不存在
        </h1>
        <Link
          href="/"
          className="font-ui text-sm font-semibold text-primary hover:underline uppercase tracking-wide"
        >
          返回首页
        </Link>
      </div>
    );
  }

  const articles = getAllArticles().filter(
    (a) =>
      a.column?.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") === name
  );

  return (
    <div className="bg-neutral-50 min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-10">
          <Link
            href="/"
            className="font-ui text-xs font-semibold text-primary hover:underline uppercase tracking-widest"
          >
            ← 返回首页
          </Link>
          <h1 className="font-heading text-4xl font-bold text-wsj-navy mt-4">
            {column.label}
          </h1>
          <p className="font-ui text-xs text-muted mt-2 uppercase tracking-wide">
            LT 财经 · 栏目
          </p>
        </div>

        {articles.length === 0 ? (
          <p className="text-center text-muted font-serif py-20">暂无文章</p>
        ) : (
          <div className="space-y-6">
            {articles.map((a) => (
              <article
                key={a.slug}
                className="bg-white border border-neutral-200 overflow-hidden hover:border-wsj-navy/30 transition-colors flex flex-col sm:flex-row"
              >
                <div className="w-full sm:w-72 shrink-0 bg-neutral-100 border-b sm:border-b-0 sm:border-r border-neutral-200">
                  <Link href={`/articles/${a.slug}`} className="block aspect-[16/10] sm:aspect-auto sm:h-full sm:min-h-[200px]">
                    <img
                      src={resolveMediaUrl(a.coverImage)}
                      alt={a.title}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </div>
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-3 font-ui text-[10px] uppercase tracking-widest text-muted mb-2">
                      <span>{a.date}</span>
                      <span>|</span>
                      <span>{a.readTime}</span>
                    </div>
                    <Link href={`/articles/${a.slug}`}>
                      <h2 className="font-heading text-2xl font-bold text-wsj-navy hover:text-primary transition-colors leading-snug">
                        {a.title}
                      </h2>
                    </Link>
                    <p className="text-muted mt-3 font-serif text-sm leading-relaxed line-clamp-3">
                      {a.excerpt}
                    </p>
                  </div>
                  <div className="mt-5">
                    <Link
                      href={`/articles/${a.slug}`}
                      className="font-ui text-[11px] font-bold uppercase tracking-widest text-wsj-navy hover:text-primary"
                    >
                      阅读全文 →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
