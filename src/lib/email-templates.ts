/**
 * Email templates for newsletter
 */

export interface Article {
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
}

export function generateNewsletterEmail(articles: Article[]): string {
  const articleList = articles
    .map(
      (article) => `
      <tr>
        <td style="padding: 20px; border-bottom: 1px solid #eee;">
          <h3 style="margin: 0 0 8px; font-size: 18px; color: #333;">
            <a href="https://ltmagazine.com/articles/${article.slug}" style="color: #333; text-decoration: none;">
              ${article.title}
            </a>
          </h3>
          <p style="margin: 0 0 8px; color: #666; font-size: 14px;">
            ${article.excerpt}
          </p>
          <span style="display: inline-block; padding: 4px 12px; background: #f5f5f5; border-radius: 4px; font-size: 12px; color: #999;">
            ${article.category}
          </span>
        </td>
      </tr>
    `
    )
    .join('')

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #1a1a2e; padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; color: #ffffff; font-weight: 600;">
                LT Magazine
              </h1>
              <p style="margin: 8px 0 0; color: #aaa; font-size: 14px;">
                发现值得阅读的内容
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 20px; font-size: 20px; color: #333;">
                📬 本周精选文章
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${articleList}
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 24px 30px; text-align: center; border-top: 1px solid #eee;">
              <p style="margin: 0 0 12px; color: #666; font-size: 14px;">
                如果不想继续收到我们的邮件，<br>
                <a href="https://ltmagazine.com/unsubscribe?email={{email}}" style="color: #999; text-decoration: underline;">
                  点击此处取消订阅
                </a>
              </p>
              <p style="margin: 0; color: #999; font-size: 12px;">
                © 2026 LT Magazine. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export function generateWelcomeEmail(name?: string): string {
  const displayName = name || '读者'
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #1a1a2e; padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; color: #ffffff; font-weight: 600;">
                LT Magazine
              </h1>
              <p style="margin: 8px 0 0; color: #aaa; font-size: 14px;">
                欢迎加入我们
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 16px; font-size: 20px; color: #333;">
                欢迎，${displayName}！🎉
              </h2>
              <p style="margin: 0 0 16px; color: #666; font-size: 15px; line-height: 1.6;">
                感谢您注册 LT Magazine。您现在可以：
              </p>
              <ul style="margin: 0 0 20px; padding-left: 20px; color: #666; font-size: 15px; line-height: 2;">
                <li>阅读所有付费内容</li>
                <li>订阅我们的 Newsletter，每周精选文章直接发送到您的邮箱</li>
                <li>收藏和分享您喜欢的文章</li>
              </ul>
              <p style="margin: 0 0 20px; color: #666; font-size: 15px; line-height: 1.6;">
                我们专注于为您精选最有价值的商业、科技和创业洞察。
              </p>
              <p style="margin: 0; text-align: center;">
                <a href="https://ltmagazine.com" style="display: inline-block; padding: 12px 32px; background-color: #1a1a2e; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600;">
                  开始阅读 →
                </a>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 24px 30px; text-align: center; border-top: 1px solid #eee;">
              <p style="margin: 0 0 12px; color: #666; font-size: 14px;">
                如果不想继续收到我们的邮件，<br>
                <a href="https://ltmagazine.com/unsubscribe?email={{email}}" style="color: #999; text-decoration: underline;">
                  点击此处取消订阅
                </a>
              </p>
              <p style="margin: 0; color: #999; font-size: 12px;">
                © 2026 LT Magazine. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}
