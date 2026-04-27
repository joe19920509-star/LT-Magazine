import Link from "next/link";

export default function LaunchIssuePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <h1 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-8 leading-tight">
          LT Magazine
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-bold">
          从实验室到市场，是这个时代最重要的叙事。
        </p>
      </section>

      {/* Launch Issue */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="border-t-2 border-black pt-12">
          <h2 className="font-serif text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">
            Launch Issue
          </h2>
          <div className="text-gray-700 leading-relaxed space-y-6">
            <p className="font-serif italic text-lg text-gray-600">
              发刊词 · LT Magazine
            </p>
            <p>
              你有没有想过，一支 mRNA 疫苗从实验室到覆盖十亿人，需要走过多少路？
            </p>
            <p>
              CRO、临床试验、监管审批、规模化生产、全球分发——每一步都是不同的游戏规则，每一步都有不同的玩家和资本在背后押注。
            </p>
            <p>
              这是科学的故事。也是金钱的故事。更是权力和时间的博弈。
            </p>
            <p>
              但在中国，没有一本杂志专门讲这件事。我们想做的，就是这件事。
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-serif text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-6">
              我们是谁
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                我们三个人。一个见过太多资本游戏，一个见过太多好故事不会讲，一个见过太多科学家不知道自己的研究值多少钱。
              </p>
              <p>
                我们没有 BBC 的资金，没有 Bloomberg 的终端，没有时尚杂志的豪华团队。
              </p>
              <p>
                但我们有别人没有的东西——我们真的知道实验室里发生了什么，也知道这些东西怎么变成你股票账户里的数字。
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-serif text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-6">
              我们为什么做这件事
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                因为中国正处在一个特殊的节点。生物医药、人工智能、新材料、消费品牌——每一个领域都在发生科学到商业的转化。这是过去三十年从未有过的密度。
              </p>
              <p>
                科技媒体在追大厂，人工智能媒体在追热点，财经媒体在看股价。没有人专门盯着那条路——从实验室到市场，那条长长的、不确定的、但真正创造价值的路。
              </p>
              <p className="font-bold text-gray-900">
                我们决定专门做这件事。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-black text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-serif text-sm font-bold tracking-[0.2em] uppercase text-white/60 mb-6">
            我们怎么做
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif font-bold text-xl mb-4">我们不是谁</h3>
              <div className="text-white/70 space-y-3 text-sm leading-relaxed">
                <p>
                  <span className="text-white font-medium">我们不是科普媒体。</span>
                  我们不教你什么是 mRNA。我们告诉你，谁在 mRNA 上押了几十亿，以及他为什么押注。
                </p>
                <p>
                  <span className="text-white font-medium">我们不是财经媒体。</span>
                  我们不给你每日行情。我们给你一个框架，帮你理解下一个十年的资金会流向哪里。
                </p>
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-serif font-bold text-xl mb-4">我们只做一件事</h3>
              <div className="text-white/70 space-y-3 text-sm leading-relaxed">
                <p>
                  从实验室到市场，把那条路讲清楚。
                </p>
                <p>
                  如果这件事值得，有人需要——你现在订阅的，是我们出品的第一个故事。
                </p>
                <p className="text-white font-medium mt-4">
                  而它只会越来越好。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
        <p className="font-serif font-bold text-3xl md:text-4xl text-gray-900 mb-4">
          LT
        </p>
        <p className="text-xl text-gray-600 font-serif">
          Follow Science, Find Money
        </p>
        <p className="text-lg text-gray-500 mt-2">
          从实验室到市场
        </p>
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
