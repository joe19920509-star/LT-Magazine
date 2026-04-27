import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

    const { email, name } = await request.json()

    if (!email) {
      return NextResponse.json({ error: '邮箱不能为空' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: '邮箱格式不正确' }, { status: 400 })
    }

    // Subscribe the user
    const { data, error } = await supabaseAdmin.rpc('subscribe_newsletter', {
      user_email: email,
      user_name: name || null
    })

    if (error) {
      console.error('Subscribe error:', error)
      return NextResponse.json({ error: '订阅失败，请重试' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: '订阅成功！',
      data 
    })
  } catch (error) {
    console.error('Newsletter subscribe error:', error)
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json({ error: '邮箱不能为空' }, { status: 400 })
    }

    const { error } = await supabaseAdmin.rpc('unsubscribe_newsletter', {
      user_email: email
    })

    if (error) {
      console.error('Unsubscribe error:', error)
      return NextResponse.json({ error: '取消订阅失败' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: '已取消订阅' })
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error)
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json({ error: '邮箱不能为空' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin.rpc('check_subscription', {
      user_email: email
    })

    if (error) {
      console.error('Check subscription error:', error)
      return NextResponse.json({ error: '查询失败' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Newsletter check error:', error)
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}
