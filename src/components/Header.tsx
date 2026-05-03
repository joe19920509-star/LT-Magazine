"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Menu, X, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthButton } from "@/components/AuthButton";
import { MarketStrip } from "@/components/MarketStrip";
import { PUBLIC_SITE_URL } from "@/lib/site";

const NAV = [
  { label: "首页", href: "/" },
  { label: "市场", href: "/#market" },
  { label: "Long Term & Short Term", href: "/category/long-term-short-term" },
  { label: "Fast & Slow", href: "/category/fast-slow" },
  { label: "Lab to Market", href: "/category/lab-to-market" },
  { label: "创刊号", href: "/launch-issue" },
  { label: "关于", href: "/about" },
  { label: "数据看板", href: "/admin" },
];

function chinaPaperDate() {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const dateLine = useMemo(() => chinaPaperDate(), []);

  function onSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-300 shadow-sm">
      {/* Utility rail — WSJ top band */}
      <div className="bg-wsj-navy text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-1.5 text-[11px] font-ui tracking-wide">
            <div className="flex items-center gap-4 text-white/85">
              <span className="hidden sm:inline">{dateLine}</span>
              <span className="text-wsj-gold/90 font-medium">
                {PUBLIC_SITE_URL.replace(/^https:\/\//, "")}
              </span>
            </div>
            <div className="flex items-center gap-4 text-white/90">
              <a
                href="https://ltmagazine.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-wsj-gold transition-colors"
              >
                内容来源 · ltmagazine.com
              </a>
              <AuthButton />
            </div>
          </div>
        </div>
      </div>

      <MarketStrip />

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between gap-4 py-4 border-b border-neutral-200">
          <Link href="/" className="group min-w-0">
            <p className="font-ui text-[10px] font-semibold tracking-[0.35em] uppercase text-wsj-navy mb-1">
              Markets · Tech · Policy
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-wsj-navy group-hover:text-primary transition-colors leading-none">
              LT 财经
            </h1>
            <p className="font-ui text-xs text-muted mt-1.5 tracking-wide">
              深度报道 · 全球视野 · 中文阅读
            </p>
          </Link>

          <nav className="hidden xl:flex items-end gap-0 pb-0.5">
            {NAV.map((item, i) => (
              <div key={item.href} className="flex items-center">
                {i > 0 && (
                  <span className="text-neutral-300 mx-2 select-none" aria-hidden>
                    |
                  </span>
                )}
                <Link
                  href={item.href}
                  className="font-ui text-[11px] font-semibold uppercase tracking-wide text-wsj-navy hover:text-primary transition-colors py-1"
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 text-wsj-navy hover:text-primary transition-colors"
              aria-label="搜索"
            >
              <Search size={20} />
            </button>
            <button
              type="button"
              className="xl:hidden p-2.5 text-wsj-navy"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="菜单"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-neutral-200 bg-neutral-50 py-4 px-4">
          <form
            onSubmit={onSearchSubmit}
            className="max-w-xl mx-auto flex gap-2"
          >
            <input
              name="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="搜索标题或摘要…"
              className="flex-1 bg-white border border-neutral-300 px-4 py-2.5 text-sm font-ui focus:outline-none focus:border-wsj-navy"
              autoFocus
            />
            <button
              type="submit"
              className="bg-wsj-navy text-white px-5 py-2.5 text-xs font-ui font-semibold uppercase tracking-wide hover:bg-wsj-navy-mid transition-colors"
            >
              搜索
            </button>
          </form>
        </div>
      )}

      {menuOpen && (
        <nav className="xl:hidden border-t border-neutral-200 bg-white font-ui">
          <div className="px-4 py-3 flex flex-col">
            {NAV.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="text-sm font-semibold uppercase tracking-wide text-wsj-navy hover:text-primary py-3 border-b border-neutral-100"
                onClick={() => setMenuOpen(false)}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
