import { ArrowRight, Clock, Mountain, ShieldCheck } from 'lucide-react';
import MediaImage from '@/components/ui/MediaImage';
import Section from '@/components/ui/Section';
import teaBanner from '@/components/ui/media/tea-mascots-banner.webp';

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
            Trà túi lọc phối lá sâm Ngọc Linh và thảo mộc
          </p>
          <p className="mt-4 max-w-[56ch] text-sam-body text-sam-ink">
            Một tách trà cho giờ nghỉ giữa buổi. Pha một túi lọc với khoảng 300 ml nước sôi
            và ủ <strong>5–7 phút</strong> theo hướng dẫn trên nhãn.
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
          <div className="relative aspect-video overflow-hidden rounded-sam-lg bg-sam-paper">
            <MediaImage
              src={teaBanner}
              alt="Hộp trà túi lọc bên cạnh Sâm Tự Nhiên, Sâm Tri Thức và Sâm Dũng Sĩ"
              sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 43vw, 520px"
              preload
              className="sam-hero-image object-contain"
            />
          </div>
          <figcaption className="sam-caption">
            <span>Trà sâm túi lọc</span>
          </figcaption>
        </figure>
      </div>

      <ul className="mt-7 flex flex-wrap gap-x-7 gap-y-3 border-t border-sam-line pt-5 text-sam-label text-sam-ink md:mt-9">
        <li className="flex items-start gap-2">
          <Clock className="mt-0.5 size-4 shrink-0 text-sam-action" aria-hidden="true" />
          <span>Ủ 5–7 phút</span>
        </li>
        <li className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-sam-action" aria-hidden="true" />
          <span>Có bản tự công bố và phiếu thử nghiệm</span>
        </li>
        <li className="flex items-start gap-2">
          <Mountain className="mt-0.5 size-4 shrink-0 text-sam-action" aria-hidden="true" />
          <span>Lá sâm Ngọc Linh 3%</span>
        </li>
      </ul>
    </Section>
  );
}
