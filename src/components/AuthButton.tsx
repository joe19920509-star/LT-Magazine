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
        <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
          <User size={14} />
          <span className="text-sm font-medium max-w-[120px] truncate">
            {user.user_metadata?.name || user.email?.split('@')[0] || '用户'}
          </span>
        </div>
        <button
          onClick={signOut}
          className="flex items-center gap-1 text-white/70 hover:text-primary transition-colors text-sm"
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
      className="flex items-center gap-1.5 bg-primary text-white px-4 py-1.5 rounded-full text-sm font-heading font-semibold hover:bg-primary/90 transition-colors"
    >
      <LogIn size={14} />
      登录
    </Link>
  )
}
