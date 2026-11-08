import type { Metadata } from 'next';
import { Be_Vietnam_Pro, Fraunces } from 'next/font/google';
import SmoothScroll from '@/components/layout/SmoothScroll';
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
    default: 'Trà Sâm Trường Nhân – Tinh Hoa Trà Sâm Ngọc Linh Chuẩn OCOP',
    template: '%s | Trà Sâm Trường Nhân',
  },
  description:
    'Trà Sâm Ngọc Linh túi lọc pha trong 3 phút, nguồn dược liệu chuẩn OCOP, 100% không chất bảo quản. Hỗ trợ tỉnh táo, giảm căng thẳng và tăng cường sinh lực.',
  keywords: [
    'trà sâm',
    'sâm ngọc linh',
    'trà sâm ngọc linh',
    'trà túi lọc sâm',
    'sâm trường nhân',
    'trà sâm trường nhân',
    'quà tặng sức khỏe',
    'chuẩn OCOP',
  ],
  authors: [{ name: 'Trà Sâm Trường Nhân' }],
  creator: 'Trà Sâm Trường Nhân',
  publisher: 'Công ty Cổ phần Sâm Trường Nhân',
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
    url: 'https://trasamtruongnhan.vn',
    siteName: 'Trà Sâm Trường Nhân',
    title: 'Trà Sâm Trường Nhân – Trà Sâm Ngọc Linh Túi Lọc Cao Cấp',
    description:
      'Thưởng thức tách trà sâm Ngọc Linh chuẩn vị núi rừng chỉ sau 3 phút. Hỗ trợ bồi bổ sức khỏe, tỉnh táo và tràn đầy năng lượng mỗi ngày.',
    images: [
      {
        url: '/images/products/combo-1.webp',
        width: 1200,
        height: 630,
        alt: 'Trà Sâm Trường Nhân - Trà Sâm Ngọc Linh',
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
