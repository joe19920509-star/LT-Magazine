"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-dark text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-primary font-heading font-bold text-2xl tracking-wider">
              LT
            </span>
            <span className="font-heading text-xl font-semibold hidden sm:block">
              Magazine
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-primary transition-colors font-heading text-sm tracking-wide uppercase">
              首页
            </Link>
            <Link href="/category/tech" className="hover:text-primary transition-colors font-heading text-sm tracking-wide uppercase">
              科技
            </Link>
            <Link href="/category/business" className="hover:text-primary transition-colors font-heading text-sm tracking-wide uppercase">
              商业
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors font-heading text-sm tracking-wide uppercase">
              关于
            </Link>
            <Link
              href="/dashboard"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors font-heading text-sm tracking-wide"
            >
              用户中心
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            <Link href="/" className="hover:text-primary py-1 font-heading text-sm tracking-wide uppercase" onClick={() => setMenuOpen(false)}>
              首页
            </Link>
            <Link href="/category/tech" className="hover:text-primary py-1 font-heading text-sm tracking-wide uppercase" onClick={() => setMenuOpen(false)}>
              科技
            </Link>
            <Link href="/category/business" className="hover:text-primary py-1 font-heading text-sm tracking-wide uppercase" onClick={() => setMenuOpen(false)}>
              商业
            </Link>
            <Link href="/about" className="hover:text-primary py-1 font-heading text-sm tracking-wide uppercase" onClick={() => setMenuOpen(false)}>
              关于
            </Link>
            <Link href="/dashboard" className="bg-primary text-white px-4 py-2 rounded text-center font-heading text-sm tracking-wide" onClick={() => setMenuOpen(false)}>
              用户中心
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
