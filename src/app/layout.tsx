import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/auth-context";

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

const siteUrl = 'https://ltmagazine.com';

export const metadata: Metadata = {
  title: {
    default: "LT Magazine — 科技商业深度媒体",
    template: "%s | LT Magazine",
  },
  description: "LT Magazine 连接科技与商业，提供 Long Term & Short Term、Fast & Slow、Lab to Market 三大栏目的深度报道，洞察科技趋势与商业变革。",
  keywords: [
    "LT Magazine", "科技媒体", "商业媒体", "科技商业", "深度报道",
    "Long Term Short Term", "Fast Slow", "Lab to Market",
    "科技趋势", "商业洞察", "行业分析", "医药科技", "能源危机",
    "护肤成分", "功能食品", "抗衰老", "外泌体", "GLP-1",
  ],
  authors: [{ name: "LT Magazine", url: siteUrl }],
  creator: "LT Magazine",
  publisher: "LT Magazine",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    siteName: "LT Magazine",
    title: "LT Magazine — 科技商业深度媒体",
    description: "连接科技与商业的桥梁。Long Term & Short Term、Fast & Slow、Lab to Market 三大栏目，深度报道科技趋势与商业变革。",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "LT Magazine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LT Magazine — 科技商业深度媒体",
    description: "连接科技与商业的桥梁。三大栏目深度报道科技趋势与商业变革。",
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
      name: 'LT Magazine',
      description: '连接科技与商业的桥梁，提供三大栏目的深度报道',
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
      name: 'LT Magazine',
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
    <html lang="zh-CN" className={`${playfair.variable} ${lora.variable}`}>
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
