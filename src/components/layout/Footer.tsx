import Image from 'next/image';
import Link from 'next/link';
import { Check, Mail, MapPin, Phone, ShieldCheck, TriangleAlert } from 'lucide-react';
import brandMark from '@/components/ui/media/truong-nhan-mark.webp';
import PublicAnalytics from './PublicAnalytics';

const FOOTER_LINKS = [
  { href: '/#story', label: 'Câu chuyện thương hiệu' },
  { href: '/#mascots', label: 'Bộ ba mascot Sâm Ngọc Linh' },
  { href: '/#usp', label: 'Tiêu chuẩn OCOP 4 sao' },
  { href: '/#combos', label: 'Chương trình ưu đãi combo' },
  { href: '/blog/vi-sao-gen-z-chon-tra-sam-ngoc-linh', label: 'Cẩm nang sống khỏe và bài viết' },
];

const COMMITMENTS = [
  '100% Sâm Ngọc Linh tự nhiên trên độ cao 1.800m',
  'Ủ nhanh 3 phút tiện lợi cho công việc văn phòng',
  'Không chất bảo quản, phẩm màu, phụ gia hóa học',
];

export default function Footer() {
  return (
    <footer className="bg-sam-action pt-12 pb-24 text-sam-on-action [--sam-focus-ring:var(--color-sam-yellow)] md:pt-16">
      <div className="sam-container">
        <div className="grid gap-x-10 gap-y-8 border-b border-sam-on-action/25 pb-10 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr]">
          <div>
            <div className="mb-4 flex items-center gap-3" translate="no">
              <Image src={brandMark} alt="" width={36} height={36} sizes="36px" className="size-9 shrink-0" />
              <div>
                <span className="block font-heading text-2xl leading-tight font-semibold">Trường Nhân</span>
                <span className="block text-sam-label text-sam-yellow">Trà Sâm Ngọc Linh Chuẩn OCOP</span>
              </div>
            </div>
            <p className="mb-5 max-w-[50ch] text-sam-label">
              Sứ mệnh mang quốc bảo Sâm Ngọc Linh đại ngàn vào từng túi trà túi lọc tiện dụng 3 phút.
              Đồng hành cùng sức khỏe và sự tập trung bền bỉ của thế hệ trẻ Việt Nam.
            </p>
            <ul className="grid gap-2 text-sam-label">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-sam-yellow" aria-hidden="true" />
                <span>Vườn sâm nguyên sinh: Huyện Tu Mơ Rông / Nam Trà My, Kon Tum - Quảng Nam</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 size-4 shrink-0 text-sam-yellow" aria-hidden="true" />
                <span>Hotline tư vấn: 1900 6868 (8:00 - 21:00 hàng ngày)</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 size-4 shrink-0 text-sam-yellow" aria-hidden="true" />
                <span className="min-w-0 wrap-break-word">Email: trasamtruongnhan@gmail.com</span>
              </li>
            </ul>
          </div>

          <nav aria-label="Liên kết cuối trang">
            <h2 className="mb-2 font-sans text-sam-label font-semibold text-sam-yellow">Khám phá website</h2>
            <ul>
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="sam-focus inline-flex min-h-(--spacing-sam-touch) items-center rounded-sam-sm text-sam-label hover:text-sam-yellow hover:underline active:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2 lg:col-span-1">
            <h2 className="mb-4 flex items-center gap-2 font-sans text-sam-label font-semibold text-sam-yellow">
              <ShieldCheck className="size-5 shrink-0" aria-hidden="true" /> Cam kết chất lượng
            </h2>
            <ul className="grid gap-3 text-sam-label">
              {COMMITMENTS.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-sam-yellow" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-start gap-3 border-b border-sam-on-action/25 py-5">
          <TriangleAlert className="mt-0.5 size-5 shrink-0 text-sam-yellow" aria-hidden="true" />
          <p className="max-w-[72ch] text-sam-label">
            <strong>Lưu ý:</strong> Sản phẩm không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.
            Mọi thông tin trên website mang tính chất tham khảo hướng dẫn lối sống lành mạnh.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap justify-between gap-x-8 gap-y-2 text-sam-label">
          <p>© 2026 Trà Sâm Trường Nhân. Đạt chuẩn OCOP Việt Nam. All rights reserved.</p>
          <p>Được phát triển với niềm tự hào dược liệu Việt</p>
        </div>
        <PublicAnalytics />
      </div>
    </footer>
  );
}
