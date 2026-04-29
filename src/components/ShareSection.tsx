'use client'

import { useState } from 'react'
import { Share2, Link2, X, MessageCircle } from 'lucide-react'

type ShareSectionProps = {
  title: string
  url: string
  coverImage?: string
}

export function ShareSection({ title, url, coverImage }: ShareSectionProps) {
  const [copied, setCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      const input = document.createElement('input')
      input.value = url
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const handleWeiboShare = () => {
    const weiboUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&pic=${encodeURIComponent(coverImage || '')}`
    window.open(weiboUrl, '_blank', 'width=600,height=500')
  }

  const handleXShare = () => {
    const xUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    window.open(xUrl, '_blank', 'width=600,height=400')
  }

  return (
    <>
      <div className="mt-12 pt-8 border-t border-gray-200">
        {/* 分隔标题 */}
        <div className="flex items-center gap-3 mb-6">
          <Share2 size={16} className="text-muted" />
          <span className="text-xs font-bold tracking-[0.12em] uppercase text-muted">
            分享这篇文章
          </span>
        </div>

        {/* 分享按钮组 */}
        <div className="flex flex-wrap items-center gap-3">
          {/* 微信朋友圈 */}
          <button
            onClick={() => setShowQR(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-body hover:border-[#07C160] hover:text-[#07C160] transition-colors cursor-pointer"
            title="分享到微信朋友圈"
          >
            <MessageCircle size={16} />
            微信朋友圈
          </button>

          {/* X (Twitter) */}
          <button
            onClick={handleXShare}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-body hover:border-gray-800 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <X size={16} />
            X / Twitter
          </button>

          {/* 微博 */}
          <button
            onClick={handleWeiboShare}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-body hover:border-orange-500 hover:text-orange-500 transition-colors cursor-pointer"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.866 1.793-.601.622.263.82.972.442 1.592zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.09-.313-.361-.177-.586.138-.227.436-.346.672-.24.239.09.315.36.194.573zm.176-2.719c-1.893-.493-4.033.45-4.857 2.118-.836 1.704-.026 3.591 1.886 4.21 1.983.64 4.318-.341 5.132-2.179.8-1.793-.201-3.642-2.161-4.149z"/>
            </svg>
            微博
          </button>

          {/* 复制链接 */}
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-body hover:border-primary hover:text-primary transition-colors cursor-pointer"
          >
            <Link2 size={16} />
            {copied ? '已复制！' : '复制链接'}
          </button>
        </div>
      </div>

      {/* 微信扫码弹窗 */}
      {showQR && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowQR(false)}
        >
          <div
            className="bg-white rounded-xl p-8 max-w-sm w-full mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-[#07C160] rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={24} className="text-white" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">分享到微信朋友圈</h3>
              <p className="text-sm text-muted mb-6">
                请用微信扫描下方二维码<br/>打开文章后点击右上角分享
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4 inline-block">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`}
                  alt="QR Code"
                  width={200}
                  height={200}
                  className="mx-auto"
                />
              </div>
              <p className="text-xs text-muted mb-4">或复制链接，在微信中打开</p>
              <div className="flex gap-3">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 bg-primary text-white py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  {copied ? '已复制！' : '复制链接'}
                </button>
                <button
                  onClick={() => setShowQR(false)}
                  className="flex-1 border border-gray-200 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
