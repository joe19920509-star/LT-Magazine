"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary font-heading font-bold text-2xl tracking-wider">LT</span>
              <span className="font-heading text-xl font-semibold">Magazine</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Follow Science, Find Money.<br />
              深度思考，锐利回报。
            </p>
          </div>
          <div>
            <h4 className="font-heading font-bold mb-4 text-sm uppercase tracking-wide">栏目</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/category/lab-to-market" className="hover:text-primary transition-colors">Lab to Market</Link></li>
              <li><Link href="/category/long-term-short-term" className="hover:text-primary transition-colors">Long Term & Short Term</Link></li>
              <li><Link href="/category/fast-slow" className="hover:text-primary transition-colors">Fast & Slow</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold mb-4 text-sm uppercase tracking-wide">关于</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/about" className="hover:text-primary transition-colors">LT Launch Issue</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">用户中心</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold mb-4 text-sm uppercase tracking-wide">LT Magazine</h4>
            <p className="text-white/60 text-sm leading-relaxed">
              科技与商业交叉点的深度报道。<br />
              让信息产生价值。
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-white/40 text-sm">
          <p>© 2026 LTMagazine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
