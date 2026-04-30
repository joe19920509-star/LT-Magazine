/**
 * Admin Dashboard Statistics API
 * GET /api/admin/stats
 * Returns all dashboard metrics
 * - Total registered users
 * - Map distribution (country/province)
 * - Gender distribution
 * - Age distribution
 * - Today's article views by article
 * - Most viewed article
 */
import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'
import { calculateAge, groupAgeRange } from '@/lib/geoip'

export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient()

    // Get all user profiles
    const { data: profiles, error: profilesError } = await supabase
      .from('user_profiles')
      .select('*')

    if (profilesError) {
      return NextResponse.json(
        { error: '获取用户数据失败：' + profilesError.message },
        { status: 500 }
      )
    }

    // Calculate user statistics
    const totalUsers = profiles.length

    // Map distribution by country/province
    const countryMap = new Map<string, number>()
    const provinceMap = new Map<string, number>()

    profiles.forEach(p => {
      if (p.country) {
        countryMap.set(p.country, (countryMap.get(p.country) || 0) + 1)
      }
      if (p.province) {
        provinceMap.set(p.province, (provinceMap.get(p.province) || 0) + 1)
      }
    })

    // Gender distribution
    const genderMap = new Map<string, number>()
    genderMap.set('male', 0)
    genderMap.set('female', 0)
    genderMap.set('other', 0)

    profiles.forEach(p => {
      if (p.gender && genderMap.has(p.gender)) {
        genderMap.set(p.gender, genderMap.get(p.gender)! + 1)
      }
    })

    // Age distribution
    const ageGroupMap = new Map<string, number>()
    const ageGroups = ['18岁以下', '18-24岁', '25-34岁', '35-44岁', '45-54岁', '55-64岁', '65岁及以上', '未知']

    ageGroups.forEach(g => ageGroupMap.set(g, 0))

    profiles.forEach(p => {
      if (p.birth_date) {
        const age = calculateAge(p.birth_date)
        const group = groupAgeRange(age)
        ageGroupMap.set(group, ageGroupMap.get(group)! + 1)
      } else {
        ageGroupMap.set('未知', ageGroupMap.get('未知')! + 1)
      }
    })

    // Get article views for today
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayISO = today.toISOString()

    const { data: todayViews, error: viewsError } = await supabase
      .from('article_views')
      .select('article_slug, created_at')
      .gte('created_at', todayISO)

    if (viewsError) {
      return NextResponse.json(
        { error: '获取浏览量失败：' + viewsError.message },
        { status: 500 }
      )
    }

    // Aggregate today's views by article
    const todayViewsMap = new Map<string, number>()

    todayViews.forEach(v => {
      if (v.article_slug) {
        todayViewsMap.set(v.article_slug, (todayViewsMap.get(v.article_slug) || 0) + 1)
      }
    })

    // Convert to array with slug
    const todayViewsByArticle = Array.from(todayViewsMap.entries())
      .map(([slug, views]) => ({ slug, views }))
      .sort((a, b) => b.views - a.views)

    // Get top article of all time
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

    // Get all article view counts for ranking
    const { data: allArticleViews, error: allViewsError } = await supabase
      .from('article_view_counts')
      .select('article_slug, total_views, unique_views')

    if (allViewsError) {
      return NextResponse.json(
        { error: '获取文章浏览量失败：' + allViewsError.message },
        { status: 500 }
      )
    }

    // Sort by total views
    const allArticleViewsSorted = allArticleViews
      ? [...allArticleViews].sort((a, b) => b.total_views - a.total_views)
      : []

    return NextResponse.json({
      // User statistics
      users: {
        total: totalUsers,
        byCountry: Object.fromEntries(countryMap),
        byProvince: Object.fromEntries(provinceMap),
        byGender: Object.fromEntries(genderMap),
        byAgeGroup: Object.fromEntries(ageGroupMap)
      },
      // Article statistics
      articles: {
        todayTotalViews: todayViews.length,
        todayByArticle: todayViewsByArticle,
        topArticle: topArticle?.[0] || null,
        allTime: allArticleViewsSorted
      },
      // Timestamps
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