'use server'

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'
import { getGeoLocation } from '@/lib/geoip'

/**
 * POST /api/auth/signup-with-profile
 * Creates user with profile (including geolocation)
 * Body: { email, password, name, gender?, birthDate? }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, gender, birthDate } = body

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: '缺少必填字段：email, password, name' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: '密码至少需要 6 位' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm for simplicity
      user_metadata: { name }
    })

    if (authError || !authData?.user) {
      return NextResponse.json(
        { error: '注册失败：' + (authError?.message || '未知错误') },
        { status: 500 }
      )
    }

    const authId = authData.user.id

    // Get client IP from headers
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim()
      || request.headers.get('x-real-ip')
      || request.headers.get('cf-connecting-ip') // Cloudflare
      || ''

    // Get geolocation from IP
    const geo = await getGeoLocation(clientIp)

    // Insert user profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        auth_id: authId,
        email,
        name,
        country: geo?.country || null,
        province: geo?.province || null,
        city: geo?.city || null,
        ip_address: geo?.ip || clientIp,
        gender: gender || null,
        birth_date: birthDate || null
      })

    if (profileError) {
      console.error('Profile insert error:', profileError)
      // Don't fail the registration, just log it
    }

    return NextResponse.json({
      success: true,
      message: '注册成功！',
      user: {
        id: authId,
        email,
        name
      },
      location: geo ? `${geo.country} ${geo.province} ${geo.city}` : '未知'
    })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: '服务器错误，请重试' },
      { status: 500 }
    )
  }
}