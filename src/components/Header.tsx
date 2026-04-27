"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { AuthButton } from "@/components/AuthButton";

const NAV_CATEGORIES = [
  { label: "Home", href: "/" },
  { label: "Launch Issue", href: "/launch-issue" },
  { label: "Long Term & Short Term", href: "/category/long-term-short-term" },
  { label: "Fast & Slow", href: "/category/fast-slow" },
  { label: "Lab to Market", href: "/category/lab-to-market" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-black">
      {/* Top bar - WSJ masthead style */}
      <div className="border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-xs text-muted">
            <div className="flex items-center gap-4">
              <span>Monday, April 27, 2026</span>
            </div>
            <div className="flex items-center gap-4">
              <AuthButton />
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo - WSJ style masthead */}
          <Link href="/" className="group">
            <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-black hover:text-primary transition-colors">
              LT Magazine
            </h1>
            <p className="text-[10px] text-muted tracking-widest uppercase mt-0.5">
              From Lab to Market
            </p>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_CATEGORIES.map((cat, index) => (
              <div key={cat.href} className="flex items-center">
                {index > 0 && <span className="text-gray-300 mx-2">|</span>}
                <Link
                  href={cat.href}
                  className="text-xs font-medium tracking-wide uppercase hover:text-primary transition-colors py-2"
                >
                  {cat.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
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
        <div className="border-t border-gray-200 py-4 px-4 bg-gray-50">
          <div className="max-w-xl mx-auto">
            <input
              type="search"
              placeholder="Search articles..."
              className="w-full bg-white border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-black"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 flex flex-col">
            {NAV_CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="text-sm font-medium tracking-wide uppercase hover:text-primary transition-colors py-3 border-b border-gray-100"
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
