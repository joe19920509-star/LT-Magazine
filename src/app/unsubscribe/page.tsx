'use client'

import { Suspense } from 'react'
import UnsubscribeContent from './unsubscribe-content'

function LoadingState() {
  return (
    <div className="min-h-screen bg-light flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <h1 className="font-heading font-bold text-2xl mb-3">加载中...</h1>
          <p className="text-muted">请稍候</p>
        </div>
      </div>
    </div>
  )
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <UnsubscribeContent />
    </Suspense>
  )
}
