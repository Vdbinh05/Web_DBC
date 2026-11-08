import Link from 'next/link';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import VideoEmbed from '@/components/ui/VideoEmbed';

export default function SocialProof() {
  const video = URL.parse(process.env.NEXT_PUBLIC_INTRO_VIDEO_URL ?? '');
  const videoUrl = video && video.protocol === 'https:' ? video.href : null;

  return (
    <Section id="reviews" aria-labelledby="reviews-title" className="bg-sam-paper">
      <div className={videoUrl ? 'grid items-center gap-6 md:grid-cols-2' : undefined}>
        <SectionHeader
          titleId="reviews-title"
          title="Hành trình mang quốc bảo sâm vào túi lọc 3 phút"
          align="start"
          className="mb-0 md:mb-0"
        >
          <Link
            href="/blog/bi-quyet-pha-tra-sam-tui-loc-3-phut-chuan-vi"
            className="sam-focus inline-flex min-h-11 w-fit items-center rounded-sam-sm text-sam-label font-semibold text-sam-action underline underline-offset-4 hover:text-sam-action-hover active:text-sam-action-active"
          >
            Đọc cách pha trà
          </Link>
        </SectionHeader>
        {videoUrl && <VideoEmbed url={videoUrl} />}
      </div>
    </Section>
  );
}
