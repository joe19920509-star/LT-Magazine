'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { LogIn, LogOut, User } from 'lucide-react'

export function AuthButton() {
  const { user, loading, signOut } = useAuth()

  if (loading) {
    return (
      <div className="w-8 h-8 rounded-full bg-dark/20 animate-pulse" />
    )
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white/10 rounded px-3 py-1.5 font-ui">
          <User size={14} />
          <span className="text-xs font-medium max-w-[120px] truncate">
            {user.user_metadata?.name || user.email?.split('@')[0] || '用户'}
          </span>
        </div>
        <button
          onClick={signOut}
          className="flex items-center gap-1 text-white/70 hover:text-wsj-gold transition-colors text-xs font-ui"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">退出</span>
        </button>
      </div>
    )
  }

  return (
    <Link
      href="/auth"
      className="flex items-center gap-1.5 bg-wsj-gold text-wsj-navy px-4 py-1.5 rounded text-xs font-ui font-bold uppercase tracking-wide hover:bg-white transition-colors"
    >
      <LogIn size={14} />
      登录
    </Link>
  )
}
