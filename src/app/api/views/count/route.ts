import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }

    // Lazy init Supabase
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase
      .from('article_views')
      .select('id')
      .eq('article_slug', slug);

    if (error) {
      console.error('Failed to get views:', error);
      return NextResponse.json({ views: 0, uniqueViews: 0 });
    }

    // Calculate unique views from distinct IPs
    const { data: uniqueData } = await supabase
      .from('article_views')
      .select('ip_address')
      .eq('article_slug', slug);

    const uniqueIps = new Set(uniqueData?.map(d => d.ip_address) || []);

    return NextResponse.json({
      views: data?.length || 0,
      uniqueViews: uniqueIps.size || 0,
    });
  } catch (err) {
    console.error('Views API error:', err);
    return NextResponse.json({ views: 0, uniqueViews: 0 });
  }
}
