import { BRAND_ABOUT_URL, BRAND_VIDEO, GINSENG_PROGRAM_URL } from '@/app/product-evidence';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import VideoEmbed from '@/components/ui/VideoEmbed';

const TEXT_LINK = 'sam-focus inline-flex min-h-11 w-fit items-center rounded-sam-sm text-sam-label font-semibold text-sam-action underline underline-offset-4 hover:text-sam-action-hover active:text-sam-action-active';

export default function SocialProof() {
  const video = URL.parse(process.env.NEXT_PUBLIC_INTRO_VIDEO_URL ?? '');
  const customVideoUrl = video && video.protocol === 'https:' ? video.href : null;
  const videoUrl = customVideoUrl ?? BRAND_VIDEO.embedUrl;
  const videoTitle = customVideoUrl ? 'Video giới thiệu của Trường Nhân' : BRAND_VIDEO.title;

  return (
    <Section id="reviews" aria-labelledby="reviews-title" className="bg-sam-paper">
      <div className="grid items-center gap-6 md:grid-cols-2">
        <SectionHeader
          titleId="reviews-title"
          title="Tìm hiểu về sâm Ngọc Linh"
          subtitle="Trường Nhân giới thiệu mình là thương hiệu tiếp nối kinh nghiệm làm dược liệu của Trường Sinh Group. Xem câu chuyện thương hiệu và chương trình phát triển sâm để hiểu thêm bối cảnh."
          align="start"
          className="mb-0 md:mb-0"
        >
          <ul>
            <li><a href={BRAND_ABOUT_URL} className={TEXT_LINK}>Đọc câu chuyện thương hiệu Trường Nhân</a></li>
            <li><a href={GINSENG_PROGRAM_URL} className={TEXT_LINK}>Xem Quyết định 611/QĐ-TTg về phát triển sâm Việt Nam</a></li>
            <li><a href="#tea-label-details" className={TEXT_LINK}>Xem cách pha trên nhãn</a></li>
          </ul>
        </SectionHeader>
        <figure className="min-w-0">
          <VideoEmbed url={videoUrl} title={videoTitle} />
          <figcaption className="sam-caption">
            <span>{videoTitle}</span>
            <a
              href={customVideoUrl ?? BRAND_VIDEO.watchUrl}
              target="_blank"
              rel="noopener"
              className={TEXT_LINK}
            >
              {customVideoUrl ? 'Mở nguồn video' : 'Xem trên YouTube'}
            </a>
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
