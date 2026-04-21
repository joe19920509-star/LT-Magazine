import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary font-heading font-bold text-2xl">LT</span>
              <span className="font-heading text-xl font-semibold">Magazine</span>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              连接科技与商业的桥梁。<br />
              探索前沿趋势，洞察行业未来。
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm tracking-wide uppercase mb-4">
              快速链接
            </h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted hover:text-primary text-sm">首页</Link></li>
              <li><Link href="/category/tech" className="text-muted hover:text-primary text-sm">科技</Link></li>
              <li><Link href="/category/business" className="text-muted hover:text-primary text-sm">商业</Link></li>
              <li><Link href="/about" className="text-muted hover:text-primary text-sm">关于我们</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm tracking-wide uppercase mb-4">
              联系我们
            </h4>
            <p className="text-muted text-sm">contact@ltmagazine.com</p>
            <p className="text-muted text-sm mt-1">LTMagazine.com</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted text-xs">
            &copy; {new Date().getFullYear()} LTMagazine. All rights reserved.
          </p>
          <p className="text-muted text-xs">
            Powered by Next.js + Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
