'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'
import { Mail, Lock, User, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { signIn, signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    if (!email || !password) {
      setError('请填写邮箱和密码')
      setLoading(false)
      return
    }

    if (!isLogin) {
      if (!name) {
        setError('请填写姓名')
        setLoading(false)
        return
      }
      if (password.length < 6) {
        setError('密码至少需要 6 位')
        setLoading(false)
        return
      }
      if (password !== confirmPassword) {
        setError('两次输入的密码不一致')
        setLoading(false)
        return
      }
    }

    try {
      if (isLogin) {
        const { error: signInError } = await signIn(email, password)
        if (signInError) {
          setError('登录失败：' + signInError.message)
        } else {
          setSuccess('登录成功！')
          setTimeout(() => router.push('/'), 1000)
        }
      } else {
        const { error: signUpError } = await signUp(email, password, name)
        if (signUpError) {
          setError('注册失败：' + signUpError.message)
        } else {
          // Subscribe to newsletter if checked
          if (subscribeNewsletter) {
            await fetch('/api/newsletter/subscribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, name })
            })
          }
          setSuccess('注册成功！请查收验证邮件')
          setTimeout(() => setIsLogin(true), 2000)
        }
      }
    } catch {
      setError('操作失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="max-w-md mx-auto px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-8">
          <ArrowLeft size={16} /> 返回首页
        </Link>

        <div className="text-center mb-8">
          <h1 className="font-heading font-bold text-3xl mb-2">{isLogin ? '登录' : '注册'}</h1>
          <p className="text-muted">{isLogin ? '欢迎回来' : '加入我们，阅读完整内容'}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          {success && (
            <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg flex items-start gap-3">
              <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
              <p className="text-sm">{success}</p>
            </div>
          )}

          {error && !success && (
            <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg flex items-start gap-3">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-1.5">姓名 <span className="text-primary">*</span></label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="请输入姓名"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1.5">邮箱 <span className="text-primary">*</span></label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">密码 <span className="text-primary">*</span></label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm" />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-1.5">确认密码 <span className="text-primary">*</span></label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm" />
                </div>
              </div>
            )}

            {!isLogin && (
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={subscribeNewsletter}
                  onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="newsletter" className="text-sm text-muted cursor-pointer">
                  订阅 Newsletter，新文章第一时间通知我
                </label>
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-heading font-semibold hover:bg-primary/90 transition-colors text-sm disabled:opacity-50">
              {loading ? '处理中...' : isLogin ? '登录' : '注册'}
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            {isLogin ? '还没有账号？' : '已有账号？'}
            <button onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }}
              className="text-primary font-semibold ml-1 hover:underline">
              {isLogin ? '立即注册' : '登录'}
            </button>
          </p>

          {isLogin && (
            <p className="text-center text-sm mt-4">
              <Link href="/auth/forgot-password" className="text-muted hover:text-primary transition-colors">
                忘记密码？
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
