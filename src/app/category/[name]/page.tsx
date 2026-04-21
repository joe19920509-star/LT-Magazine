import { getAllArticles, COLUMN_MAP } from "@/lib/articles";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function ColumnPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const column = COLUMN_MAP[name];

  if (!column) {
    return (
      <div className="min-h-screen bg-light">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-heading font-bold text-dark mb-4">栏目不存在</h1>
          <Link href="/" className="text-primary hover:underline">返回首页</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const articles = getAllArticles().filter(
    (a) =>
      a.column?.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") === name
  );

  return (
    <div className="min-h-screen bg-light">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/category" className="text-primary text-sm hover:underline">← 全部栏目</Link>
          <h1 className="text-4xl font-heading font-bold text-dark mt-2">{column.label}</h1>
        </div>

        {articles.length === 0 ? (
          <p className="text-gray-500 text-center py-20">暂无文章</p>
        ) : (
          <div className="space-y-6">
            {articles.map((a) => (
              <article key={a.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow flex">
                {a.coverImage && (
                  <div className="w-64 flex-shrink-0">
                    <img
                      src={a.coverImage}
                      alt={a.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                      <span>{a.date}</span>
                      <span>·</span>
                      <span>{a.readTime}</span>
                    </div>
                    <Link href={`/articles/${a.slug}`}>
                      <h2 className="text-2xl font-heading font-bold text-dark hover:text-primary transition-colors">
                        {a.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 mt-2">{a.excerpt}</p>
                  </div>
                  <div className="mt-4">
                    <Link
                      href={`/articles/${a.slug}`}
                      className="text-primary font-heading text-sm hover:underline"
                    >
                      阅读全文 →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
