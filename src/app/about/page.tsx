import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <h1 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-8 leading-tight">
          LT Magazine
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
          从实验室到市场，是这个时代最重要的叙事。
        </p>
      </section>

      {/* Editor's Note */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="border-t-2 border-black pt-12">
          <h2 className="font-serif text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">
            Editor's Note
          </h2>
          <h3 className="font-serif font-bold text-2xl md:text-3xl text-gray-900 mb-8">
            我们为什么需要一本讲「从实验室到市场」的杂志
          </h3>
          <div className="text-gray-700 leading-relaxed space-y-6">
            <p className="font-serif italic text-lg text-gray-600">
              主编说 · LT Magazine
            </p>
            <p>
              三年前我从媒体去做投资。不是转行，是去看看钱到底怎么想的。
            </p>
            <p>
              看了三年，看明白了：科学家和投资人，说的是两种语言。一个讲分子，一个讲回报。中间隔着CRO、临床、监管、IPO——一条长长的路，没人专门讲过。
            </p>
            <p>
              也看烦了。BP里全是数据，没有故事。路演的PPT丑得让我想哭。最可怕的是，好项目死在路上，不是因为科学不行，是因为没人知道怎么把它讲成有人愿意听的故事。
            </p>
            <p>
              所以我回来做媒体。
            </p>
            <p>
              <strong>LT Magazine 不做科普，不做财经。</strong>我们只做一件事：把从实验室到市场的路，讲成一个好故事。
            </p>
            <p>
              Fast & Slow、Long Term & Short Term、Lab to Market——三个栏目，三种节奏。快的时候追热点，慢的时候做深度。短看这周发生了什么，长看十年后什么值钱。
            </p>
            <p>
              我们做这本杂志，是因为相信：科学值得被好好讲述。而钱，只会流向那些被讲好的故事。
            </p>
          </div>
          {/* Signature */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <p className="font-bold text-xl text-gray-900">
              Follow Science, Find Money.
            </p>
            <p className="font-serif italic text-xl text-gray-700 mt-4" style={{ fontFamily: "'Noto Serif SC', 'STSong', serif" }}>
              Jon Zhou
            </p>
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="bg-black text-white py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-serif font-bold text-2xl md:text-3xl mb-4">
            加入 LT Magazine
          </h2>
          <p className="text-white/60 mb-8">
            订阅获取最新文章和深度分析
          </p>
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 font-medium text-sm tracking-wider hover:bg-white/90 transition-colors"
          >
            立即订阅 →
          </Link>
        </div>
      </section>
    </div>
  );
}
