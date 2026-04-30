'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import {
  Users, Globe, BarChart3, PieChart as PieChartIcon,
  FileText, TrendingUp, MapPin, Gender, Calendar,
  RefreshCw, ExternalLink, Lock, AlertCircle, CheckCircle
} from 'lucide-react'

// Types
interface StatsData {
  users: {
    total: number
    byCountry: Record<string, number>
    byProvince: Record<string, number>
    byGender: Record<string, number>
    byAgeGroup: Record<string, number>
  }
  articles: {
    todayTotalViews: number
    todayByArticle: Array<{ slug: string; views: number }>
    topArticle: { article_slug: string; total_views: number } | null
    allTime: Array<{ article_slug: string; total_views: number; unique_views: number }>
  }
  generatedAt: string
}

// Chart components
function GenderPieChart({ data }: { data: Record<string, number> }) {
  const colors = { male: '#3B82F6', female: '#EC4899', other: '#8B5CF6', unknown: '#9CA3AF' }
  const labels = { male: '男', female: '女', other: '其他' }

  const total = Object.values(data).reduce((a, b) => a + b, 0) || 1

  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-2">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex items-center gap-1.5 text-xs">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[key as keyof typeof colors] || colors.unknown }} />
            <span className="text-gray-600">{labels[key as keyof typeof labels] || key}: {value}</span>
          </div>
        ))}
      </div>
      <div className="text-sm text-gray-500">
        总计: {total}
      </div>
    </div>
  )
}

function AgeBarChart({ data }: { data: Record<string, number> }) {
  const groups = ['18岁以下', '18-24岁', '25-34岁', '35-44岁', '45-54岁', '55-64岁', '65岁及以上', '未知']
  const maxValue = Math.max(...Object.values(data), 1)

  return (
    <div className="flex items-end gap-1 h-24">
      {groups.map((group) => {
        const value = data[group] || 0
        const height = (value / maxValue) * 100
        return (
          <div key={group} className="flex flex-col items-center flex-1">
            <div className="text-xs text-gray-600 mb-1">{value}</div>
            <div
              className="w-full bg-primary/80 rounded-t transition-all"
              style={{ height: `${Math.max(height, 2)}%` }}
            />
            <div className="text-xs text-gray-500 mt-1 truncate max-w-full" title={group}>
              {group.replace('岁以下', '').replace('岁及以上', '+').replace('岁', '')}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function WorldMapPlaceholder({ data }: { data: Record<string, number> }) {
  // Simple placeholder - shows top 10 countries
  const sorted = Object.entries(data)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

  const maxValue = sorted[0]?.[1] || 1

  return (
    <div className="space-y-2">
      {sorted.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-4">暂无数据</p>
      ) : (
        sorted.map(([country, count]) => (
          <div key={country} className="flex items-center gap-2">
            <div className="w-20 text-xs text-gray-600 truncate">{country}</div>
            <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary/80 h-full rounded-full transition-all"
                style={{ width: `${(count / maxValue) * 100}%` }}
              />
            </div>
            <div className="w-8 text-xs text-gray-500 text-right">{count}</div>
          </div>
        ))
      )}
    </div>
  )
}

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      fetchStats()
    }
  }, [user])

  async function fetchStats() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/stats')
      if (!res.ok) throw new Error('获取数据失败')
      const data = await res.json()
      setStats(data)
      setLastRefresh(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">加载中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">LT</span>
              </div>
              <h1 className="font-heading font-bold text-xl">后台看版</h1>
            </div>
            <div className="flex items-center gap-4">
              {lastRefresh && (
                <span className="text-xs text-gray-400">
                  更新于 {lastRefresh.toLocaleTimeString('zh-CN')}
                </span>
              )}
              <button
                onClick={fetchStats}
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                刷新
              </button>
              <a
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900"
              >
                <ExternalLink size={14} />
                查看网站
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle size={20} className="text-red-500" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {loading && !stats ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-500">加载中...</div>
          </div>
        ) : stats ? (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users size={20} className="text-blue-600" />
                  </div>
                  <div className="text-xs text-gray-500">注册用户</div>
                </div>
                <div className="text-3xl font-bold text-gray-900">{stats.users.total}</div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Globe size={20} className="text-green-600" />
                  </div>
                  <div className="text-xs text-gray-500">覆盖国家</div>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {Object.keys(stats.users.byCountry).length}
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText size={20} className="text-purple-600" />
                  </div>
                  <div className="text-xs text-gray-500">今日浏览量</div>
                </div>
                <div className="text-3xl font-bold text-gray-900">{stats.articles.todayTotalViews}</div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <TrendingUp size={20} className="text-orange-600" />
                  </div>
                  <div className="text-xs text-gray-500">最高浏览量</div>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {stats.articles.topArticle?.total_views || 0}
                </div>
              </div>
            </div>

            {/* User Analytics Section */}
            <div className="mb-8">
              <h2 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                <Users size={18} />
                用户分析
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Map Distribution */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    地理分布 (Top 10 国家)
                  </h3>
                  <WorldMapPlaceholder data={stats.users.byCountry} />
                </div>

                {/* Gender & Age */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart3 size={16} className="text-gray-400" />
                    年龄分布
                  </h3>
                  <AgeBarChart data={stats.users.byAgeGroup} />
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Gender size={16} className="text-gray-400" />
                    性别比例
                  </h3>
                  <GenderPieChart data={stats.users.byGender} />
                </div>

                {/* Province Distribution */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    国内省份分布 (Top 10)
                  </h3>
                  {Object.keys(stats.users.byProvince).length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-4">暂无数据</p>
                  ) : (
                    <div className="space-y-2">
                      {Object.entries(stats.users.byProvince)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 10)
                        .map(([province, count]) => (
                          <div key={province} className="flex items-center gap-2">
                            <div className="w-20 text-xs text-gray-600 truncate">{province}</div>
                            <div className="flex-1 bg-gray-100 rounded-full h-2">
                              <div
                                className="bg-primary/80 h-full rounded-full"
                                style={{ width: `${(count / Math.max(...Object.values(stats.users.byProvince))) * 100}%` }}
                              />
                            </div>
                            <div className="w-8 text-xs text-gray-500 text-right">{count}</div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Article Analytics Section */}
            <div>
              <h2 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                <FileText size={18} />
                文章分析
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Today's Views by Article */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    今日浏览量 (按文章)
                  </h3>
                  {stats.articles.todayByArticle.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-8">今日暂无浏览记录</p>
                  ) : (
                    <div className="space-y-3">
                      {stats.articles.todayByArticle.map((item, index) => (
                        <div key={item.slug} className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium text-primary">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{item.slug}</p>
                          </div>
                          <div className="text-sm font-semibold text-gray-900">
                            {item.views}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Top Article */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    历史最高浏览量
                  </h3>
                  {stats.articles.topArticle ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="text-xs text-primary font-medium mb-1">TOP 文章</div>
                        <div className="font-heading font-bold text-gray-900">
                          {stats.articles.topArticle.article_slug}
                        </div>
                        <div className="text-3xl font-bold text-primary mt-2">
                          {stats.articles.topArticle.total_views.toLocaleString()}
                          <span className="text-sm font-normal text-gray-500 ml-1}>次浏览</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm text-center py-8">暂无数据</p>
                  )}
                </div>

                {/* All Time Ranking */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 lg:col-span-2">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    全站文章浏览量排行
                  </h3>
                  {stats.articles.allTime.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-8">暂无数据</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                            <th className="pb-3 font-medium">排名</th>
                            <th className="pb-3 font-medium">文章</th>
                            <th className="pb-3 font-medium text-right">总浏览</th>
                            <th className="pb-3 font-medium text-right">独立浏览</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stats.articles.allTime.slice(0, 10).map((article, index) => (
                            <tr key={article.article_slug} className="border-b border-gray-50">
                              <td className="py-3">
                                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                                  index === 0 ? 'bg-primary text-white' :
                                  index === 1 ? 'bg-primary/20 text-primary' :
                                  index === 2 ? 'bg-primary/10 text-primary' :
                                  'bg-gray-100 text-gray-600'
                                }`}>
                                  {index + 1}
                                </span>
                              </td>
                              <td className="py-3 text-sm text-gray-900">{article.article_slug}</td>
                              <td className="py-3 text-sm font-medium text-gray-900 text-right">
                                {article.total_views.toLocaleString()}
                              </td>
                              <td className="py-3 text-sm text-gray-500 text-right">
                                {article.unique_views.toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </main>
    </div>
  )
}