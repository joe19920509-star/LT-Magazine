/**
 * Admin Dashboard Statistics API
 * GET /api/admin/stats
 * Requires logged-in user; optional ADMIN_EMAILS (comma-separated) for extra restriction.
 */
import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'
import { createClient } from '@/lib/supabase-server'
import { calculateAge, groupAgeRange } from '@/lib/geoip'
import { startOfTodayShanghaiISO } from '@/lib/date-tz'

export async function GET() {
  try {
    const sessionClient = await createClient()
    const {
      data: { user },
      error: sessionError
    } = await sessionClient.auth.getUser()

    if (sessionError || !user?.email) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 })
    }

    const adminEmails =
      process.env.ADMIN_EMAILS?.split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean) ?? []
    if (
      adminEmails.length > 0 &&
      !adminEmails.includes(user.email.toLowerCase())
    ) {
      return NextResponse.json({ error: '无权访问数据看板' }, { status: 403 })
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()) {
      return NextResponse.json(
        { error: '服务器未配置 SUPABASE_SERVICE_ROLE_KEY' },
        { status: 503 }
      )
    }

    const supabase = createAdminClient()

    const { data: profiles, error: profilesError } = await supabase
      .from('user_profiles')
      .select('*')

    if (profilesError) {
      return NextResponse.json(
        { error: '获取用户数据失败：' + profilesError.message },
        { status: 500 }
      )
    }

    const totalUsers = profiles?.length ?? 0

    const countryMap = new Map<string, number>()
    const provinceMap = new Map<string, number>()

    profiles?.forEach((p) => {
      if (p.country) {
        countryMap.set(p.country, (countryMap.get(p.country) || 0) + 1)
      }
      if (p.province) {
        provinceMap.set(p.province, (provinceMap.get(p.province) || 0) + 1)
      }
    })

    const genderMap = new Map<string, number>()
    genderMap.set('male', 0)
    genderMap.set('female', 0)
    genderMap.set('other', 0)
    genderMap.set('unknown', 0)

    profiles?.forEach((p) => {
      if (p.gender === 'male' || p.gender === 'female' || p.gender === 'other') {
        genderMap.set(p.gender, genderMap.get(p.gender)! + 1)
      } else {
        genderMap.set('unknown', genderMap.get('unknown')! + 1)
      }
    })

    const ageGroupMap = new Map<string, number>()
    const ageGroups = [
      '18岁以下',
      '18-24岁',
      '25-34岁',
      '35-44岁',
      '45-54岁',
      '55-64岁',
      '65岁及以上',
      '未知'
    ]
    ageGroups.forEach((g) => ageGroupMap.set(g, 0))

    profiles?.forEach((p) => {
      if (p.birth_date) {
        const age = calculateAge(p.birth_date)
        const group = groupAgeRange(age)
        ageGroupMap.set(group, ageGroupMap.get(group)! + 1)
      } else {
        ageGroupMap.set('未知', ageGroupMap.get('未知')! + 1)
      }
    })

    const todayStart = startOfTodayShanghaiISO()

    const { data: todayViews, error: viewsError } = await supabase
      .from('article_views')
      .select('article_slug, created_at')
      .gte('created_at', todayStart)

    if (viewsError) {
      return NextResponse.json(
        { error: '获取浏览量失败：' + viewsError.message },
        { status: 500 }
      )
    }

    const todayViewsMap = new Map<string, number>()
    ;(todayViews ?? []).forEach((v) => {
      if (v.article_slug) {
        todayViewsMap.set(
          v.article_slug,
          (todayViewsMap.get(v.article_slug) || 0) + 1
        )
      }
    })

    const todayViewsByArticle = Array.from(todayViewsMap.entries())
      .map(([slug, views]) => ({ slug, views }))
      .sort((a, b) => b.views - a.views)

    const { data: topArticle, error: topError } = await supabase
      .from('article_view_counts')
      .select('article_slug, total_views')
      .order('total_views', { ascending: false })
      .limit(1)

    if (topError) {
      return NextResponse.json(
        { error: '获取最高浏览量失败：' + topError.message },
        { status: 500 }
      )
    }

    const { data: allArticleViews, error: allViewsError } = await supabase
      .from('article_view_counts')
      .select('article_slug, total_views, unique_views')

    if (allViewsError) {
      return NextResponse.json(
        { error: '获取文章浏览量失败：' + allViewsError.message },
        { status: 500 }
      )
    }

    const allArticleViewsSorted = allArticleViews
      ? [...allArticleViews].sort((a, b) => b.total_views - a.total_views)
      : []

    const { count: activeSubscribers, error: subCountError } = await supabase
      .from('newsletter_subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true)

    if (subCountError) {
      return NextResponse.json(
        { error: '获取订阅数据失败：' + subCountError.message },
        { status: 500 }
      )
    }

    const now = Date.now()
    const ms7d = 7 * 24 * 60 * 60 * 1000
    const ms30d = 30 * 24 * 60 * 60 * 1000
    let activeLast7Days = 0
    let activeLast30Days = 0
    let neverSignedIn = 0
    let totalAuthUsers = 0

    let page = 1
    const perPage = 1000
    for (let i = 0; i < 50; i++) {
      const { data: pageData, error: listErr } =
        await supabase.auth.admin.listUsers({ page, perPage })
      if (listErr) {
        console.error('admin listUsers:', listErr.message)
        break
      }
      const batch = pageData?.users ?? []
      if (batch.length === 0) break

      totalAuthUsers += batch.length
      for (const u of batch) {
        const last = u.last_sign_in_at
          ? new Date(u.last_sign_in_at).getTime()
          : null
        if (last == null) {
          neverSignedIn++
        } else {
          if (now - last <= ms7d) activeLast7Days++
          if (now - last <= ms30d) activeLast30Days++
        }
      }

      if (batch.length < perPage) break
      page++
    }

    return NextResponse.json({
      users: {
        total: totalUsers,
        byCountry: Object.fromEntries(countryMap),
        byProvince: Object.fromEntries(provinceMap),
        byGender: Object.fromEntries(genderMap),
        byAgeGroup: Object.fromEntries(ageGroupMap),
        active: {
          totalAuthUsers,
          last7Days: activeLast7Days,
          last30Days: activeLast30Days,
          neverSignedIn
        }
      },
      newsletter: {
        activeSubscribers: activeSubscribers ?? 0
      },
      articles: {
        todayTotalViews: todayViews?.length ?? 0,
        todayByArticle: todayViewsByArticle,
        topArticle: topArticle?.[0] || null,
        allTime: allArticleViewsSorted
      },
      generatedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json(
      { error: '服务器错误，请重试' },
      { status: 500 }
    )
  }
}
