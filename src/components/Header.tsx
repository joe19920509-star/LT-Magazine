"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { AuthButton } from "@/components/AuthButton";

const NAV_CATEGORIES = [
  { label: "Launch Issue", href: "/launch-issue" },
  { label: "Long Term & Short Term", href: "/category/long-term-short-term" },
  { label: "Fast & Slow", href: "/category/fast-slow" },
  { label: "Lab to Market", href: "/category/lab-to-market" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="bg-black text-white sticky top-0 z-50 border-b border-white/10">
      {/* Top bar */}
      <div className="bg-black">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="font-serif font-bold text-2xl md:text-3xl tracking-wider text-white">
                LT
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_CATEGORIES.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="text-xs font-medium tracking-widest uppercase hover:text-primary transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
              <Link
                href="/about"
                className="text-xs font-medium tracking-widest uppercase hover:text-primary transition-colors"
              >
                About
              </Link>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:text-primary transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <AuthButton />
              <button
                className="lg:hidden p-2"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-white/10 py-3 px-4">
            <div className="max-w-2xl mx-auto">
              <input
                type="search"
                placeholder="Search..."
                className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 text-sm placeholder:text-white/50 focus:outline-none focus:border-white/50"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="lg:hidden bg-black border-t border-white/10">
          <div className="px-4 py-4 flex flex-col gap-3">
            {NAV_CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="text-xs font-medium tracking-widest uppercase hover:text-primary transition-colors py-2 border-b border-white/10"
                onClick={() => setMenuOpen(false)}
              >
                {cat.label}
              </Link>
            ))}
            <Link
              href="/about"
              className="text-xs font-medium tracking-widest uppercase hover:text-primary transition-colors py-2 border-b border-white/10"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
