import Link from "next/link";

export const metadata = {
  title: "LT Launch Issue | LTMagazine",
  description: "LT Magazine 首期发布：Follow Science, Find Money",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-light">
      {/* Hero */}
      <div className="bg-dark text-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-primary font-heading font-bold text-sm tracking-widest uppercase mb-4 block">
            LT Magazine · Launch Issue
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-6xl mb-6 leading-tight">
            Follow Science.<br />Find Money.
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
            科技商业深度媒体。追踪前沿趋势，拆解商业逻辑，<br />
            只写值得花时间的内容。
          </p>
          <p className="text-white/40 text-sm mt-4">2026 年 4 月 21 日首发</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* What is LT */}
        <section className="mb-16">
          <h2 className="font-heading font-bold text-2xl mb-6 flex items-center gap-3">
            <span className="w-8 h-0.5 bg-primary inline-block" />
            我们是什么
          </h2>
          <div className="bg-white rounded-xl p-8 shadow-sm space-y-4">
            <p className="text-body text-lg leading-relaxed">
              LT Magazine 是一家科技商业深度媒体。我们相信，科技进步和商业创新是推动这个世界最重要的两股力量——而它们的交汇点，往往是最大机会的所在地。
            </p>
            <p className="text-body text-lg leading-relaxed">
              我们不为流量写东西。每篇文章都经过深度研究，每个观点都有数据和逻辑支撑。我们写的是我们自己愿意花时间读的内容。
            </p>
          </div>
        </section>

        {/* Columns */}
        <section className="mb-16">
          <h2 className="font-heading font-bold text-2xl mb-6 flex items-center gap-3">
            <span className="w-8 h-0.5 bg-primary inline-block" />
            三个栏目
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                slug: "lab-to-market",
                name: "Lab to Market",
                desc: "科技从实验室到商业化的完整链路。投资逻辑、创业机会、技术落地。",
              },
              {
                slug: "long-term-short-term",
                name: "Long Term & Short Term",
                desc: "长期趋势与短期信号的交叉分析。帮助你在噪音中分辨方向。",
              },
              {
                slug: "fast-slow",
                name: "Fast & Slow",
                desc: "快速反应的热点解读，配合深度慢思考。快中有慢，慢中有快。",
              },
            ].map((col) => (
              <Link
                key={col.slug}
                href={`/category/${col.slug}`}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 block"
              >
                <h3 className="font-heading font-bold text-dark text-lg mb-2">
                  {col.name}
                </h3>
                <p className="text-body text-sm leading-relaxed">{col.desc}</p>
                <span className="inline-block mt-4 text-primary text-sm font-heading font-semibold">
                  阅读 →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="font-heading font-bold text-2xl mb-6 flex items-center gap-3">
            <span className="w-8 h-0.5 bg-primary inline-block" />
            我们的立场
          </h2>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <ul className="space-y-4">
              {[
                "我们写我们真正相信的东西，不是甲方要求我们写的。",
                "数据 > 观点。我们相信数字，不相信直觉。",
                "不追逐热点。热点来了我们问的是：为什么现在会发生这件事？",
                "原创报道优先。如果引用，必标来源。",
                "写给愿意动脑子的读者。不喂结论，只给方法。",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-primary font-heading font-bold mt-0.5">{i + 1}.</span>
                  <span className="text-body">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-dark text-white rounded-xl p-8">
          <h2 className="font-heading font-bold text-2xl mb-6 flex items-center gap-3">
            <span className="w-8 h-0.5 bg-primary inline-block" />
            联系我们 & 投稿
          </h2>
          <div className="space-y-3 text-white/80 mb-6">
            <p>
              <strong className="text-white">商务合作：</strong> business@ltmagazine.com
            </p>
            <p>
              <strong className="text-white">投稿邮箱：</strong> editor@ltmagazine.com
            </p>
            <p>
              <strong className="text-white">网址：</strong> LTMagazine.com
            </p>
          </div>
          <p className="text-white/40 text-sm">
            如果你有科技商业领域的一手报道、深度分析或独特视角，欢迎联系我们。好的故事值得被更多人看到。
          </p>
        </section>
      </div>
    </div>
  );
}
