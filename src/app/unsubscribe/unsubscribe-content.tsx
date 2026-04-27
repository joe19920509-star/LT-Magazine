'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Mail, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react'

export default function UnsubscribeContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (email) {
      handleUnsubscribe()
    } else {
      setStatus('error')
      setMessage('缺少邮箱参数')
    }
  }, [email])

  const handleUnsubscribe = async () => {
    try {
      const response = await fetch(`/api/newsletter/subscribe?email=${encodeURIComponent(email!)}`, {
        method: 'DELETE'
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setStatus('success')
        setMessage('已成功取消订阅 Newsletter')
      } else {
        setStatus('error')
        setMessage(data.error || '取消订阅失败')
      }
    } catch {
      setStatus('error')
      setMessage('网络错误，请重试')
    }
  }

  return (
    <div className="min-h-screen bg-light flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Link href="/" className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-8">
          <ArrowLeft size={16} /> 返回首页
        </Link>

        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          {status === 'loading' && (
            <>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail size={28} className="text-primary animate-pulse" />
              </div>
              <h1 className="font-heading font-bold text-2xl mb-3">正在处理...</h1>
              <p className="text-muted">请稍候</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h1 className="font-heading font-bold text-2xl mb-3">退订成功</h1>
              <p className="text-muted mb-6">{message}</p>
              <p className="text-sm text-gray-500">
                您仍然可以登录网站阅读内容，只是不会再收到 Newsletter 邮件。
              </p>
              <div className="mt-6">
                <Link href="/" className="text-primary font-semibold hover:underline">
                  返回首页 →
                </Link>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={32} className="text-red-600" />
              </div>
              <h1 className="font-heading font-bold text-2xl mb-3">出错了</h1>
              <p className="text-muted mb-6">{message}</p>
              <div className="mt-6">
                <Link href="/" className="text-primary font-semibold hover:underline">
                  返回首页 →
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
