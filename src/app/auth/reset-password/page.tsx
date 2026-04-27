'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Lock, CheckCircle, AlertCircle } from 'lucide-react';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  
  const { updatePassword } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');

    if (!password) {
      setStatus('error');
      setMessage('请输入新密码');
      return;
    }

    if (password.length < 6) {
      setStatus('error');
      setMessage('密码至少需要 6 位');
      return;
    }

    if (password !== confirmPassword) {
      setStatus('error');
      setMessage('两次输入的密码不一致');
      return;
    }

    setStatus('loading');
    const { error } = await updatePassword(password);

    if (error) {
      setStatus('error');
      setMessage(error.message);
    } else {
      setStatus('success');
      setMessage('密码修改成功！');
      setTimeout(() => router.push('/'), 2000);
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
            <h1 className="font-heading font-bold text-2xl mb-3">密码已重置</h1>
            <p className="text-muted mb-6">{message}</p>
            <p className="text-sm text-muted">
              即将跳转到首页...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light py-16">
      <div className="max-w-md mx-auto px-4">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-primary" />
          </div>
          <h1 className="font-heading font-bold text-3xl mb-2">设置新密码</h1>
          <p className="text-muted">请输入您的新密码</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg flex items-start gap-3">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <p className="text-sm">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                新密码 <span className="text-primary">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                确认新密码 <span className="text-primary">*</span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-primary text-white py-3 rounded-lg font-heading font-semibold hover:bg-primary/90 transition-colors text-sm disabled:opacity-50"
            >
              {status === 'loading' ? '提交中...' : '确认修改'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
