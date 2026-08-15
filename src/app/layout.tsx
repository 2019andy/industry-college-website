import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display, Noto_Serif_SC } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const notoserif = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-noto-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: '中跨数字贸易产业学院 | AI赋能产教融合 培育数字经济人才',
    template: '%s | 中跨数字贸易产业学院',
  },
  description: '中跨数字贸易产业学院是由高校与中跨集团深度共建的国家级现代产业学院，聚焦人工智能、AI应用开发、跨境电商、数字营销等方向，以AI技术赋能产教融合，培养符合数字经济时代产业发展需求的高素质应用型人才。',
  keywords: [
    '产教融合',
    '人工智能教育',
    'AI人才培养',
    '跨境电商专业',
    '数字贸易产业学院',
    '人工智能',
    'AI应用开发',
    '数字营销',
    '供应链管理',
    '现代产业学院',
    '校企合作',
    '教育科技',
  ],
  authors: [{ name: '中跨数字贸易产业学院' }],
  creator: '中跨数字贸易产业学院',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://zhongkuan.edu.cn',
    title: '中跨数字贸易产业学院 | AI赋能产教融合 培育数字经济人才',
    description: '国家级现代产业学院，聚焦人工智能与跨境电商，AI赋能产教融合，校企双主体协同育人。',
    siteName: '中跨数字贸易产业学院',
  },
  twitter: {
    card: 'summary_large_image',
    title: '中跨数字贸易产业学院 | AI赋能产教融合 培育数字经济人才',
    description: '国家级现代产业学院，聚焦人工智能与跨境电商人才培养。',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#161d4f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${playfair.variable} ${notoserif.variable}`}>
      <body className="min-h-screen bg-white text-dark-900 antialiased">
        {children}
      </body>
    </html>
  );
}
