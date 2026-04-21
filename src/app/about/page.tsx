export const metadata = {
  title: "关于我们 | LTMagazine",
  description: "了解 LTMagazine 的使命、团队和联系方式",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-light">
      {/* Hero */}
      <div className="bg-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            关于 LTMagazine
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            连接科技与商业的桥梁，致力于为读者提供有深度、有态度的科技商业内容
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Mission */}
        <section className="mb-16">
          <h2 className="font-heading font-bold text-2xl mb-6 flex items-center gap-3">
            <span className="w-8 h-0.5 bg-primary inline-block" />
            我们的使命
          </h2>
          <p className="text-body text-lg leading-relaxed mb-4">
            LTMagazine 诞生于对科技与商业交汇点的持续关注。在这个信息过载的时代，
            我们相信深度比广度更重要，洞察比报道更有价值。
          </p>
          <p className="text-body text-lg leading-relaxed">
            我们不为流量妥协，不为热点放弃原则。每篇文章都经过精心打磨，
            每个观点都有数据支撑，每份报道都以读者利益为先。
          </p>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="font-heading font-bold text-2xl mb-6 flex items-center gap-3">
            <span className="w-8 h-0.5 bg-primary inline-block" />
            核心价值
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "深度",
                desc: "不满足于表面报道，深入挖掘背后的逻辑和趋势",
              },
              {
                title: "独立",
                desc: "保持独立立场，不受利益方影响，坚持客观公正",
              },
              {
                title: "前瞻",
                desc: "着眼未来，帮助读者在变革中把握先机",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <h3 className="font-heading font-bold text-primary text-lg mb-2">
                  {v.title}
                </h3>
                <p className="text-body text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="font-heading font-bold text-2xl mb-6 flex items-center gap-3">
            <span className="w-8 h-0.5 bg-primary inline-block" />
            联系我们
          </h2>
          <div className="space-y-3 text-body">
            <p>
              <strong>商务合作：</strong> business@ltmagazine.com
            </p>
            <p>
              <strong>投稿邮箱：</strong> editor@ltmagazine.com
            </p>
            <p>
              <strong>网址：</strong> LTMagazine.com
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
