"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AuthButton } from "@/components/AuthButton";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-dark text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-primary font-heading font-bold text-2xl tracking-wider">
              LT
            </span>
            <span className="font-heading text-xl font-semibold hidden sm:block">
              Magazine
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-primary transition-colors font-heading text-sm tracking-wide uppercase">
              首页
            </Link>
            <Link href="/category/lab-to-market" className="hover:text-primary transition-colors font-heading text-sm tracking-wide uppercase">
              Lab to Market
            </Link>
            <Link href="/category/long-term-short-term" className="hover:text-primary transition-colors font-heading text-sm tracking-wide uppercase">
              Long Term & Short Term
            </Link>
            <Link href="/category/fast-slow" className="hover:text-primary transition-colors font-heading text-sm tracking-wide uppercase">
              Fast & Slow
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors font-heading text-sm tracking-wide uppercase">
              LT Launch Issue
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <AuthButton />
            <button
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            <Link href="/" className="hover:text-primary py-1 font-heading text-sm tracking-wide uppercase" onClick={() => setMenuOpen(false)}>
              首页
            </Link>
            <Link href="/category/lab-to-market" className="hover:text-primary py-1 font-heading text-sm tracking-wide uppercase" onClick={() => setMenuOpen(false)}>
              Lab to Market
            </Link>
            <Link href="/category/long-term-short-term" className="hover:text-primary py-1 font-heading text-sm tracking-wide uppercase" onClick={() => setMenuOpen(false)}>
              Long Term & Short Term
            </Link>
            <Link href="/category/fast-slow" className="hover:text-primary py-1 font-heading text-sm tracking-wide uppercase" onClick={() => setMenuOpen(false)}>
              Fast & Slow
            </Link>
            <Link href="/about" className="hover:text-primary py-1 font-heading text-sm tracking-wide uppercase" onClick={() => setMenuOpen(false)}>
              LT Launch Issue
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
