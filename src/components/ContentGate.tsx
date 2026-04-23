'use client'

import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'
import { Lock, ArrowRight } from 'lucide-react'

type ContentGateProps = {
  previewContent: string
  fullContent: string
}

export function ContentGate({ previewContent, fullContent }: ContentGateProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
      </div>
    )
  }

  // 已登录用户显示完整内容
  if (user) {
    return (
      <div 
        className="article-content"
        dangerouslySetInnerHTML={{ __html: fullContent }}
      />
    )
  }

  // 未登录用户只显示预览
  return (
    <div>
      <div 
        className="article-content"
        dangerouslySetInnerHTML={{ __html: previewContent }}
      />
      
      {/* 付费墙提示 */}
      <div className="relative mt-8">
        {/* 渐变遮罩 */}
        <div className="absolute inset-x-0 -top-24 h-24 bg-gradient-to-t from-white to-transparent"></div>
        
        <div className="bg-light border border-gray-200 rounded-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Lock size={28} className="text-primary" />
          </div>
          
          <h3 className="font-heading font-bold text-xl mb-2">
            登录阅读完整内容
          </h3>
          <p className="text-muted mb-6 max-w-md mx-auto">
            注册成为 LTMagazine 会员，即可阅读所有文章的完整内容，获取更多科技商业资讯。
          </p>
          
          <Link 
            href="/auth"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-heading font-semibold hover:bg-primary/90 transition-colors"
          >
            立即登录 <ArrowRight size={16} />
          </Link>
          
          <p className="text-xs text-muted mt-4">
            注册即表示同意我们的服务条款和隐私政策
          </p>
        </div>
      </div>
    </div>
  )
}
