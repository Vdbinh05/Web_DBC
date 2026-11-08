import { ArrowRight, Clock, Mountain, ShieldCheck } from 'lucide-react';
import MediaImage from '@/components/ui/MediaImage';
import Section from '@/components/ui/Section';
import teaPackage from '@/components/ui/media/tea-package.webp';

export default function HeroSection() {
  return (
    <Section
      id="story"
      aria-labelledby="hero-title"
      className="pt-8 pb-10 md:py-14 lg:py-20"
    >
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
        <div className="min-w-0">
          <h1 id="hero-title" className="font-heading text-sam-display font-semibold tracking-tight text-balance text-sam-action">
            Trà Sâm Ngọc Linh
          </h1>
          <p className="mt-3 max-w-[36ch] text-sam-subheading font-medium text-pretty text-sam-action">
            Tỉnh táo tự nhiên, tràn đầy năng lượng
          </p>
          <p className="mt-4 max-w-[56ch] text-sam-body text-sam-ink">
            Giải pháp chăm sóc sức khỏe chủ động cho Gen Z và giới văn phòng.
            Túi lọc tiện lợi ủ nhanh trong <strong>3 phút</strong>, hỗ trợ giảm bớt cảm giác căng thẳng trí não,
            duy trì sự tỉnh táo bền bỉ và bồi bổ thể lực suốt ngày dài, 100% không chất bảo quản.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href="#combos"
              className="sam-focus inline-flex min-h-13 items-center justify-center gap-2 rounded-sam-sm bg-sam-action px-5 py-3 text-sam-label font-semibold text-sam-on-action hover:bg-sam-action-hover active:bg-sam-action-active"
            >
              Xem các combo <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            </a>
            <a
              href="#mascots"
              className="sam-focus inline-flex min-h-(--spacing-sam-touch) items-center rounded-sam-sm text-sam-label font-semibold text-sam-action underline decoration-sam-control-line underline-offset-4 hover:decoration-current active:text-sam-action-active"
            >
              Gặp 3 mascot
            </a>
          </div>
        </div>

        <figure className="min-w-0">
          <div className="relative aspect-[8/5] overflow-hidden rounded-sam-lg bg-sam-paper">
            <MediaImage
              src={teaPackage}
              alt="Hộp Trà Sâm Trường Nhân mở, bên trong có các gói trà"
              sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 43vw, 520px"
              preload
              className="object-cover"
            />
          </div>
          <figcaption className="sam-caption">
            <span>Trà sâm túi lọc 3 phút</span>
            <span className="font-normal text-sam-muted">Bao bì Trà Sâm Trường Nhân</span>
          </figcaption>
        </figure>
      </div>

      <ul className="mt-7 flex flex-wrap gap-x-7 gap-y-3 border-t border-sam-line pt-5 text-sam-label text-sam-ink md:mt-9">
        <li className="flex items-start gap-2">
          <Clock className="mt-0.5 size-4 shrink-0 text-sam-action" aria-hidden="true" />
          <span>Pha nhanh 3 phút tại bàn làm việc</span>
        </li>
        <li className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-sam-action" aria-hidden="true" />
          <span>Đạt chuẩn OCOP 4 sao</span>
        </li>
        <li className="flex items-start gap-2">
          <Mountain className="mt-0.5 size-4 shrink-0 text-sam-action" aria-hidden="true" />
          <span>Núi Ngọc Linh, trên 1.800m</span>
        </li>
      </ul>
    </Section>
  );
}
