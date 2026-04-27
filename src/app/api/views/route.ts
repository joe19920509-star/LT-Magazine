import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json();
    
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }

    // Lazy init Supabase to avoid build-time errors
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const userAgent = request.headers.get('user-agent') || '';
    const referrer = request.headers.get('referer') || '';

    const { error } = await supabase
      .from('article_views')
      .insert({
        article_slug: slug,
        ip_address: ip,
        user_agent: userAgent,
        referrer: referrer,
      });

    if (error) {
      console.error('Failed to record view:', error);
      return NextResponse.json({ error: 'Failed to record view' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('View API error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
