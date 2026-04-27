import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { generateNewsletterEmail, Article } from '@/lib/email-templates'

export async function GET() {
  try {
    // Lazy initialize to avoid build-time errors
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    const resendApiKey = process.env.RESEND_API_KEY!

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: 'Missing Supabase configuration' }, { status: 500 })
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
    const resend = resendApiKey ? new Resend(resendApiKey) : null

    console.log('[Newsletter Cron] Starting newsletter send job...')

    // 1. Get recent articles (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    
    // Query articles from the articles table
    const { data: articles, error: articlesError } = await supabaseAdmin
      .from('articles')
      .select('slug, title, excerpt, category, published_at')
      .gte('published_at', sevenDaysAgo)
      .order('published_at', { ascending: false })
      .limit(5)

    if (articlesError) {
      console.error('[Newsletter] Error fetching articles:', articlesError)
      // Continue anyway - might be table doesn't exist yet
    }

    // Transform articles to our format
    const recentArticles: Article[] = articles?.map((a: any) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt || '',
      category: a.category || 'General',
      publishedAt: a.published_at
    })) || []

    // If no articles in DB, use a fallback message
    if (recentArticles.length === 0) {
      console.log('[Newsletter] No new articles found, skipping send.')
      return NextResponse.json({ 
        success: true, 
        message: 'No new articles to send',
        articlesCount: 0 
      })
    }

    // 2. Get all active subscribers
    const { data: subscribers, error: subscribersError } = await supabaseAdmin
      .from('newsletter_subscribers')
      .select('email, name')
      .eq('is_active', true)

    if (subscribersError) {
      console.error('[Newsletter] Error fetching subscribers:', subscribersError)
      return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 })
    }

    if (!subscribers || subscribers.length === 0) {
      console.log('[Newsletter] No subscribers found, skipping send.')
      return NextResponse.json({ 
        success: true, 
        message: 'No subscribers',
        articlesCount: 0 
      })
    }

    console.log(`[Newsletter] Sending to ${subscribers.length} subscribers, ${recentArticles.length} articles`)

    // 3. Generate email content
    const emailHtml = generateNewsletterEmail(recentArticles)

    // 4. Check if Resend is configured
    if (!resend || !resendApiKey || resendApiKey.startsWith('re_xxxx')) {
      console.log('[Newsletter] Resend not configured, skipping email send.')
      console.log('Subscribers would receive:', recentArticles.length, 'articles')
      return NextResponse.json({ 
        success: true, 
        message: 'Resend not configured - skipped',
        subscribersCount: subscribers.length,
        articlesCount: recentArticles.length
      })
    }

    // 5. Send emails - send to first subscriber with BCC to rest
    let successCount = 0
    let errorCount = 0

    // Send in smaller batches using regular send with BCC
    const batchSize = 10
    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize)
      
      // Send to first recipient with BCC to others (hides other emails)
      const toEmail = batch[0]?.email
      const bccEmails = batch.slice(1).map(s => s.email)
      
      const { error: sendError } = await resend.emails.send({
        from: 'LT Magazine <no-reply@ltmagazine.com>',
        to: toEmail,
        bcc: bccEmails.length > 0 ? bccEmails : undefined,
        subject: `📬 LT Magazine - 本周精选 ${recentArticles.length} 篇文章`,
        html: emailHtml.replace('{{email}}', encodeURIComponent(toEmail || ''))
      })

      if (sendError) {
        console.error(`[Newsletter] Error sending batch ${Math.floor(i/batchSize) + 1}:`, sendError)
        errorCount += batch.length
      } else {
        successCount += batch.length
        console.log(`[Newsletter] Sent batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(subscribers.length/batchSize)}`)
      }

      // Rate limit delay between batches
      await new Promise(resolve => setTimeout(resolve, 2000))
    }

    console.log(`[Newsletter] Done! Success: ${successCount}, Errors: ${errorCount}`)

    return NextResponse.json({ 
      success: true, 
      subscribersCount: subscribers.length,
      articlesCount: recentArticles.length,
      successCount,
      errorCount
    })
  } catch (error) {
    console.error('[Newsletter] Cron job failed:', error)
    return NextResponse.json({ error: 'Cron job failed' }, { status: 500 })
  }
}

// Also support POST for manual triggers
export async function POST() {
  return GET()
}
