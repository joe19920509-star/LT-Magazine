"use client";

import Link from "next/link";
import { PUBLIC_SITE_URL } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-white border-t-2 border-wsj-navy text-wsj-navy">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="font-heading font-bold text-2xl tracking-tight mb-3">
              LT 财经
            </div>
            <p className="font-ui text-xs text-muted leading-relaxed uppercase tracking-wide">
              深度财经与科技商业资讯站
              <br />
              <span className="normal-case mt-2 block text-[13px]">
                正文与图片来源于{" "}
                <a
                  href="https://ltmagazine.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:underline"
                >
                  ltmagazine.com
                </a>
              </span>
            </p>
            <p className="font-ui text-[10px] text-muted mt-3 tracking-wider">
              {PUBLIC_SITE_URL.replace(/^https:\/\//, "")}
            </p>
          </div>
          <div>
            <h4 className="font-ui font-bold mb-4 text-[11px] uppercase tracking-[0.2em] text-wsj-navy">
              栏目
            </h4>
            <ul className="space-y-2 font-ui text-sm text-muted">
              <li>
                <Link
                  href="/category/lab-to-market"
                  className="hover:text-primary transition-colors"
                >
                  Lab to Market
                </Link>
              </li>
              <li>
                <Link
                  href="/category/long-term-short-term"
                  className="hover:text-primary transition-colors"
                >
                  Long Term & Short Term
                </Link>
              </li>
              <li>
                <Link
                  href="/category/fast-slow"
                  className="hover:text-primary transition-colors"
                >
                  Fast & Slow
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-ui font-bold mb-4 text-[11px] uppercase tracking-[0.2em]">
              账户与工具
            </h4>
            <ul className="space-y-2 font-ui text-sm text-muted">
              <li>
                <Link href="/auth" className="hover:text-primary transition-colors">
                  登录 / 注册
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors">
                  用户中心
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-primary transition-colors">
                  数据看板
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-ui font-bold mb-4 text-[11px] uppercase tracking-[0.2em]">
              关于
            </h4>
            <ul className="space-y-2 font-ui text-sm text-muted">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  关于我们
                </Link>
              </li>
              <li>
                <Link href="/launch-issue" className="hover:text-primary transition-colors">
                  创刊号
                </Link>
              </li>
              <li>
                <a
                  href="mailto:joe19920509@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  联系编辑部
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-ui text-[11px] text-muted uppercase tracking-wide">
          <span>© {new Date().getFullYear()} LT 财经 · 保留所有权利</span>
          <span className="normal-case">Follow Science, Find Money.</span>
        </div>
      </div>
    </footer>
  );
}
