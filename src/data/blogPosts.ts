import { TEA_BREW_GUIDE, TEA_PRODUCT_URL } from '@/app/product-evidence';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTime: string;
  author: string;
  authorRole: string;
  coverImage: string;
  tags: string[];
  content: string; // HTML or Markdown formatted content
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'vi-sao-gen-z-chon-tra-sam-ngoc-linh',
    title: 'Một tách Trà Sâm Trường Nhân giữa giờ học và làm việc',
    description:
      'Tìm hiểu thành phần Trà Sâm Trường Nhân và cách pha một tách trà túi lọc cho giờ nghỉ giữa buổi.',
    publishedAt: '2026-03-15',
    readingTime: '2 phút đọc',
    author: 'Trường Nhân R&D',
    authorRole: 'Đội ngũ Nghiên cứu & Phát triển',
    coverImage: '/images/products/combo-1.webp',
    tags: ['Trà Túi Lọc', 'Sâm Ngọc Linh', 'Giờ Nghỉ'],
    content: `
      <h2>Trong túi trà có gì?</h2>
      <p>Trà Sâm Trường Nhân phối <strong>3% lá sâm Ngọc Linh</strong> cùng táo đỏ, lá đinh lăng, đẳng sâm, cam thảo, kỷ tử và nhân sâm. Tỷ lệ từng thành phần có trên mẫu nhãn trong bản tự công bố số 03/TRUONGNHAN/2026.</p>
      <p><a href="${TEA_PRODUCT_URL}">Đối chiếu thành phần trên trang Trường Nhân</a>.</p>

      <h2>Pha trà ngay trong giờ nghỉ</h2>
      <p>Chuẩn bị một ly hoặc bình có nắp, chịu được nước sôi. ${TEA_BREW_GUIDE} Nếu thích vị ngọt nhẹ, bạn có thể thêm một ít mật ong sau khi ủ rồi nếm để điều chỉnh.</p>
      <p><a href="/blog/bi-quyet-pha-tra-sam-tui-loc-3-phut-chuan-vi">Xem cách pha và bảo quản theo mẫu nhãn</a>.</p>
    `,
  },
  {
    slug: 'bi-quyet-pha-tra-sam-tui-loc-3-phut-chuan-vi',
    title: 'Cách pha Trà Sâm Trường Nhân theo hướng dẫn trên nhãn',
    description:
      'Dùng một túi trà, khoảng 300 ml nước sôi và ủ 5–7 phút. Xem thêm lưu ý sử dụng và bảo quản trên nhãn.',
    publishedAt: '2026-03-20',
    readingTime: '2 phút đọc',
    author: 'Dược sĩ Hương Giang',
    authorRole: 'Cố vấn Dược liệu Thảo mộc',
    coverImage: '/images/products/combo-2.webp',
    tags: ['Cẩm Nang Pha Trà', 'Trà Sâm Túi Lọc'],
    content: `
      <h2>Ba bước pha một túi trà</h2>
      <ol>
        <li>Đặt <strong>1 túi trà</strong> vào ly hoặc bình.</li>
        <li>Rót khoảng <strong>300 ml nước sôi</strong>.</li>
        <li>Đậy nắp và ủ <strong>5–7 phút</strong>.</li>
      </ol>
      <p>Cách pha được ghi trên mẫu nhãn trong bản tự công bố. <a href="${TEA_PRODUCT_URL}">Xem hướng dẫn trên trang Trường Nhân</a>.</p>

      <h2>Sử dụng và bảo quản</h2>
      <p>Mỗi túi dùng một lần. Dùng trà trong ngày và bảo quản các túi chưa mở ở nơi khô thoáng, tránh ánh nắng trực tiếp. Kiểm tra hạn dùng và thành phần trên hộp trước khi pha.</p>
      <p><a href="/#usp">Xem ảnh mẫu nhãn trong hồ sơ sản phẩm</a>.</p>
    `,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
