import type { Metadata } from 'next';
import { Be_Vietnam_Pro, Fraunces } from 'next/font/google';
import SmoothScroll from '@/components/layout/SmoothScroll';
import teaBanner from '@/components/ui/media/tea-mascots-banner.webp';
import './globals.css';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-be-vietnam-pro',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://trasamtruongnhan.vn'),
  title: {
    default: 'Trà Sâm Trường Nhân – Trà túi lọc với lá sâm Ngọc Linh',
    template: '%s | Trà Sâm Trường Nhân',
  },
  description:
    'Tìm hiểu thành phần, bản tự công bố và cách pha Trà Sâm Trường Nhân. Công thức trà túi lọc có 3% lá sâm Ngọc Linh.',
  keywords: [
    'trà sâm',
    'sâm ngọc linh',
    'trà sâm ngọc linh',
    'trà túi lọc sâm',
    'sâm trường nhân',
    'trà sâm trường nhân',
    'quà tặng sức khỏe',
  ],
  authors: [{ name: 'Nhóm Zentrix' }],
  creator: 'Nhóm Zentrix',
  publisher: 'Nhóm Zentrix',
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
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: '/',
    siteName: 'Trà Sâm Trường Nhân',
    title: 'Trà Sâm Trường Nhân – Trà túi lọc với lá sâm Ngọc Linh',
    description:
      'Xem hồ sơ Trà Sâm Trường Nhân và cách pha một túi với khoảng 300 ml nước sôi, đậy nắp ủ 5–7 phút.',
    images: [
      {
        url: teaBanner.src,
        width: teaBanner.width,
        height: teaBanner.height,
        alt: 'Hộp trà túi lọc Trường Nhân và ba mascot',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="vi" suppressHydrationWarning className={`${beVietnamPro.variable} ${fraunces.variable}`}>
      <body suppressHydrationWarning className="min-h-dvh bg-sam-canvas font-sans text-sam-ink antialiased selection:bg-sam-yellow selection:text-sam-action">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
