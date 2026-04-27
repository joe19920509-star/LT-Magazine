'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase-client';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');

    if (!email) {
      setStatus('error');
      setMessage('请输入邮箱地址');
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
    });

    if (error) {
      setStatus('error');
      setMessage(error.message);
    } else {
      setStatus('success');
      setMessage('密码重置链接已发送到您的邮箱，请查收');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h1 className="font-heading font-bold text-2xl mb-3">邮件已发送</h1>
            <p className="text-muted mb-6">{message}</p>
            <p className="text-sm text-muted mb-6">
              如果没有收到邮件，请检查垃圾邮件文件夹。
            </p>
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              <ArrowLeft size={16} />
              返回登录
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light py-16">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-heading font-bold text-3xl mb-2">找回密码</h1>
          <p className="text-muted">
            输入您的注册邮箱，我们会发送密码重置链接
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg text-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-body">
                邮箱地址
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-heading font-semibold hover:bg-primary/90 transition-colors text-sm tracking-wide"
            >
              发送重置链接
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            <Link
              href="/auth"
              className="inline-flex items-center gap-1 text-primary font-semibold hover:underline"
            >
              <ArrowLeft size={14} />
              返回登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
