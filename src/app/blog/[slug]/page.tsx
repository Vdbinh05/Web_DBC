import type { Metadata } from 'next';
import type { StaticImageData } from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ChevronRight, ShieldCheck } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import MediaImage from '@/components/ui/MediaImage';
import { MASCOT_PORTRAITS } from '@/components/ui/mascot-portraits';
import SkipLink from '@/components/ui/SkipLink';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/features/CartDrawer';
import SamAIChatbot from '@/components/features/SamAIChatbot';
import { BLOG_POSTS, getBlogPostBySlug } from '@/data/blogPosts';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const BLOG_COVER_REPLACEMENTS: Partial<Record<string, StaticImageData>> = {
  '/images/products/combo-1.webp': MASCOT_PORTRAITS['tri-thuc'],
  '/images/products/combo-2.webp': MASCOT_PORTRAITS['tu-nhien'],
};

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Không tìm thấy bài viết | Trà Sâm Trường Nhân',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trasamtruongnhan.vn';
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const cover = BLOG_COVER_REPLACEMENTS[post.coverImage];

  return {
    title: `${post.title} | Blog Sống Khỏe Trường Nhân`,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: 'article',
      locale: 'vi_VN',
      url: postUrl,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: cover?.src ?? post.coverImage,
          width: cover?.width,
          height: cover?.height,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trasamtruongnhan.vn';
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const cover = BLOG_COVER_REPLACEMENTS[post.coverImage];

  // JSON-LD structured data for Google Article Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: new URL(cover?.src ?? post.coverImage, siteUrl).href,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Nhóm Zentrix',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  };

  const otherPosts = BLOG_POSTS.filter((entry) => entry.slug !== post.slug);
  const displayDate = new Intl.DateTimeFormat('vi-VN', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(post.publishedAt));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <SkipLink />
      <Navbar />

      <main id="main-content" tabIndex={-1} className="sam-anchor sam-container py-6 sm:py-10">
        <article className="mx-auto max-w-3xl">
          <nav aria-label="Đường dẫn bài viết" className="mb-5">
            <ol className="flex flex-wrap items-center gap-2 text-sam-label text-sam-muted">
              <li>
                <Link href="/" className="sam-focus inline-flex min-h-(--spacing-sam-touch) items-center rounded-sam-sm font-semibold text-sam-action underline underline-offset-4 hover:text-sam-action-hover active:text-sam-action-active">
                  Trang chủ
                </Link>
              </li>
              <li aria-hidden="true"><ChevronRight className="size-4" /></li>
              <li>Cẩm nang sống khỏe</li>
            </ol>
          </nav>

          <header>
            <h1 className="font-heading text-sam-heading font-semibold tracking-tight text-pretty text-sam-action">{post.title}</h1>
            <div className="mt-5 flex flex-wrap items-start justify-between gap-x-5 gap-y-2 border-y border-sam-line py-4 text-sam-label">
              <div>
                <p className="font-semibold text-sam-action">{post.author}</p>
                <p className="text-sam-muted">{post.authorRole}</p>
              </div>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sam-muted">
                <time dateTime={post.publishedAt}>{displayDate}</time>
                <span>{post.readingTime}</span>
              </p>
            </div>
          </header>

          <figure className="my-6">
            <div className="relative aspect-[16/9] overflow-hidden rounded-sam-lg bg-sam-paper">
              <MediaImage
                src={cover ?? post.coverImage}
                alt={`Ảnh minh họa bài viết ${post.title}`}
                sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 815px) calc(100vw - 3rem), 768px"
                preload
                className="object-contain p-2 sm:p-3"
              />
            </div>
            <figcaption className="sam-caption">Ảnh minh họa bài viết</figcaption>
          </figure>

          <div className="sam-prose mx-auto max-w-[70ch] text-sam-body text-sam-ink" dangerouslySetInnerHTML={{ __html: post.content }} />

          <ul aria-label="Chủ đề bài viết" className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => <li key={tag}><Badge>{tag}</Badge></li>)}
          </ul>

          <aside className="mt-6 flex items-start gap-3 rounded-sam-sm bg-sam-paper p-4 text-sam-label text-sam-ink">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-sam-action" aria-hidden="true" />
            <p>
              Thông tin trong bài dựa trên mẫu nhãn và bản tự công bố số 03/TRUONGNHAN/2026. Bạn có thể xem tỷ lệ thành phần, hướng dẫn bảo quản và ảnh tài liệu ở <Link href="/#usp" className="sam-focus rounded-sam-sm font-semibold text-sam-action underline underline-offset-4">Hồ sơ sản phẩm</Link>.
            </p>
          </aside>

          <section aria-labelledby="blog-combo-title" className="mt-8 grid items-start gap-4 rounded-sam-lg border border-sam-line bg-sam-surface p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-6">
            <div>
              <h2 id="blog-combo-title" className="font-heading text-sam-subheading font-semibold">Chọn combo theo cách bạn thưởng trà</h2>
              <p className="mt-2 text-sam-label text-sam-muted">Xem các combo Trà Sâm Trường Nhân.</p>
              <p className="mt-2 text-sam-label text-sam-ink">Đặt ngay Combo Chạy Deadline hoặc Combo Dưỡng Nhan để nhận ly giữ nhiệt và mật ong rừng miễn phí!</p>
            </div>
            <Link href="/#combos" className="sam-focus inline-flex min-h-12 w-fit items-center gap-2 rounded-sam-sm bg-sam-action px-4 py-2 text-sam-label font-semibold text-sam-on-action hover:bg-sam-action-hover active:bg-sam-action-active">
              Xem các combo <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            </Link>
          </section>

          {otherPosts.length > 0 && (
            <section aria-labelledby="related-title" className="mt-8 border-t border-sam-line pt-6">
              <h2 id="related-title" className="font-heading text-sam-subheading font-semibold">Bài viết cùng chủ đề</h2>
              <ul className="mt-3 divide-y divide-sam-line">
                {otherPosts.map((related) => (
                  <li key={related.slug} className="py-2">
                    <Link href={`/blog/${related.slug}`} className="sam-focus grid min-h-(--spacing-sam-touch) grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-sam-sm px-2 py-2 hover:bg-sam-paper active:bg-sam-disabled">
                      <div className="relative aspect-[4/3] w-16 shrink-0 overflow-hidden rounded-sam-sm bg-sam-paper sm:w-24">
                        <MediaImage src={BLOG_COVER_REPLACEMENTS[related.coverImage] ?? related.coverImage} alt="" sizes="(max-width: 639px) 64px, 96px" className="object-contain" />
                      </div>
                      <div>
                        <h3 className="font-sans text-sam-label font-semibold text-sam-action">{related.title}</h3>
                        <p className="mt-1 text-sam-label text-sam-muted">{related.readingTime}</p>
                      </div>
                      <ChevronRight className="size-4 shrink-0 text-sam-action" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </main>

      <Footer />
      <CartDrawer />
      <SamAIChatbot />
    </>
  );
}
