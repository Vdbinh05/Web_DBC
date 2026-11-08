import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check, MessageCircle, ShieldCheck, TriangleAlert } from 'lucide-react';
import { ZENTRIX_FACEBOOK_URL, ZENTRIX_MESSENGER_URL } from '@/app/dbc-contact';
import brandMark from '@/components/ui/media/truong-nhan-mark.webp';
import PublicAnalytics from './PublicAnalytics';

const FOOTER_LINKS = [
  { href: '/#story', label: 'Câu chuyện thương hiệu' },
  { href: '/#mascots', label: 'Bộ ba mascot Sâm Ngọc Linh' },
  { href: '/#usp', label: 'Hồ sơ sản phẩm và nguồn gốc' },
  { href: '/#combos', label: 'Chương trình ưu đãi combo' },
  { href: '/blog/vi-sao-gen-z-chon-tra-sam-ngoc-linh', label: 'Cẩm nang thưởng trà' },
];

const LABEL_FACTS = [
  'Công thức có 3% lá sâm Ngọc Linh',
  'Pha một túi với khoảng 300 ml nước sôi',
  'Đậy nắp và ủ 5–7 phút',
];

const CONTACT_LINK_CLASS = 'sam-focus inline-flex min-h-(--spacing-sam-touch) w-fit items-center gap-2 rounded-sam-sm underline underline-offset-4 hover:text-sam-yellow';

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
                <span className="block text-sam-label text-sam-yellow">Trà Sâm Ngọc Linh túi lọc</span>
              </div>
            </div>
            <div className="mb-3 max-w-[50ch] text-sam-label">
              <p className="font-semibold">Nhóm Zentrix</p>
              <p className="mt-1">Website của nhóm Zentrix tại cuộc thi DBC.</p>
            </div>
            <ul className="text-sam-label">
              <li>
                <a href={ZENTRIX_FACEBOOK_URL} target="_blank" rel="noopener" className={CONTACT_LINK_CLASS}>
                  <ArrowUpRight className="size-4 shrink-0 text-sam-yellow" aria-hidden="true" />
                  Facebook nhóm Zentrix
                </a>
              </li>
              <li>
                <a href={ZENTRIX_MESSENGER_URL} target="_blank" rel="noopener" className={CONTACT_LINK_CLASS}>
                  <MessageCircle className="size-4 shrink-0 text-sam-yellow" aria-hidden="true" />
                  Nhắn Messenger cho nhóm Zentrix
                </a>
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
              <ShieldCheck className="size-5 shrink-0" aria-hidden="true" /> Thông tin trên nhãn
            </h2>
            <ul className="grid gap-3 text-sam-label">
              {LABEL_FACTS.map((item) => (
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
          <p>© 2026 Nhóm Zentrix.</p>
          <p>Được phát triển với niềm tự hào dược liệu Việt</p>
        </div>
        <PublicAnalytics />
      </div>
    </footer>
  );
}
