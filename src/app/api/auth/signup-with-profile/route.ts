import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'
import { getGeoLocation } from '@/lib/geoip'

function mapAuthErrorMessage(message: string, status?: number): { text: string; http: number } {
  const m = message.toLowerCase()
  if (m.includes('already been registered') || m.includes('already registered') || m.includes('user already')) {
    return { text: '该邮箱已被注册，请直接登录或更换邮箱', http: 409 }
  }
  if (m.includes('invalid email') || m.includes('unable to validate email')) {
    return { text: '邮箱格式无效', http: 400 }
  }
  if (m.includes('password') && (m.includes('weak') || m.includes('short') || m.includes('least'))) {
    return { text: message, http: 400 }
  }
  if (status === 422) {
    return { text: message || '注册信息不符合要求', http: 400 }
  }
  return { text: message || '未知错误', http: 500 }
}

/**
 * POST /api/auth/signup-with-profile
 * Creates user with profile (including geolocation)
 * Body: { email, password, name, gender?, birthDate? }
 */
export async function POST(request: NextRequest) {
  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()) {
      console.error('signup-with-profile: SUPABASE_SERVICE_ROLE_KEY is not set')
      return NextResponse.json(
        { error: '服务器未配置完成，无法注册。请在 Vercel 环境变量中设置 SUPABASE_SERVICE_ROLE_KEY（Supabase Dashboard → Settings → API → service_role）。' },
        { status: 503 }
      )
    }

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

    const normalizedGender =
      gender === 'male' || gender === 'female' || gender === 'other' ? gender : null

    const supabase = createAdminClient()

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: String(email).trim(),
      password,
      email_confirm: true,
      user_metadata: { name: String(name).trim() }
    })

    if (authError || !authData?.user) {
      const mapped = mapAuthErrorMessage(authError?.message || '', authError?.status)
      console.error('signup-with-profile createUser:', authError?.message, authError?.status)
      return NextResponse.json(
        { error: '注册失败：' + mapped.text },
        { status: mapped.http }
      )
    }

    const authId = authData.user.id

    // Get client IP from headers (Vercel / proxies)
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') ||
      ''

    const geo = await getGeoLocation(clientIp || undefined)

    const { error: profileError } = await supabase.from('user_profiles').insert({
      auth_id: authId,
      email: String(email).trim(),
      name: String(name).trim(),
      country: geo?.country || null,
      province: geo?.province || null,
      city: geo?.city || null,
      ip_address: geo?.ip || clientIp || null,
      gender: normalizedGender,
      birth_date: birthDate || null
    })

    if (profileError) {
      console.error('Profile insert error:', profileError)
      await supabase.auth.admin.deleteUser(authId)
      return NextResponse.json(
        { error: '注册失败：用户资料保存失败，请稍后重试或联系管理员' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: '注册成功！',
      user: {
        id: authId,
        email: String(email).trim(),
        name: String(name).trim()
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