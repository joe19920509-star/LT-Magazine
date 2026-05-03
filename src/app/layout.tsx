import type { Metadata } from "next";
import { Playfair_Display, Lora, Libre_Franklin } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/auth-context";
import { PUBLIC_SITE_URL } from "@/lib/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-lora",
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-libre",
  display: "swap",
});

const siteUrl = PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: {
    default: "LT 财经 — 深度财经与科技商业",
    template: "%s | LT 财经",
  },
  description:
    "LT 财经（ltmagazine.cn）呈现来自 LT Magazine 的深度稿件与配图，聚焦市场、科技与商业交叉议题；含 Lab to Market、Long Term & Short Term、Fast & Slow 等栏目。",
  keywords: [
    "LT 财经",
    "ltmagazine.cn",
    "LT Magazine",
    "财经",
    "科技商业",
    "深度报道",
    "Long Term Short Term",
    "Fast Slow",
    "Lab to Market",
    "市场",
    "商业洞察",
  ],
  authors: [{ name: "LT 财经", url: siteUrl }],
  creator: "LT 财经",
  publisher: "LT 财经",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    siteName: "LT 财经",
    title: "LT 财经 — 深度财经与科技商业",
    description:
      "深度财经与科技商业资讯。内容与配图源自 LT Magazine（ltmagazine.com）。",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "LT 财经",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LT 财经 — 深度财经与科技商业",
    description: "深度财经与科技商业资讯；内容源自 LT Magazine。",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // 添加搜索引擎验证（用户后续可填入验证码）
    // google: 'xxx',
    // bing: 'xxx',
  },
};

// JSON-LD 结构化数据 - Website Schema
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'LT 财经',
      description: '深度财经与科技商业；内容与配图来自 LT Magazine',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
      inLanguage: 'zh-CN',
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'LT 财经',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
        width: 200,
        height: 200,
      },
      sameAs: [],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${playfair.variable} ${lora.variable} ${libreFranklin.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-serif antialiased bg-white text-black">
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
