'use client';

import { useState } from 'react';
import { Award, Clock, FileText, Leaf, Snowflake } from 'lucide-react';
import Button from '@/components/ui/Button';
import MediaImage from '@/components/ui/MediaImage';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import CertificateModal from '@/components/features/CertificateModal';
import farmImage from '@/components/ui/media/ngoc-linh-farm.webp';

const DETAILS = [
  {
    Icon: Clock,
    title: 'Ủ nhanh trong 3 phút',
    description: 'Túi lọc màng bắp sinh học tự phân hủy thân thiện môi trường, tối ưu tốc độ thẩm thấu dưỡng chất vào nước ấm chỉ sau đúng 3 phút.',
    note: 'Tiện lợi ngay tại bàn làm việc',
  },
  {
    Icon: Snowflake,
    title: 'Công nghệ sấy thăng hoa',
    description: 'Ứng dụng sấy lạnh chân không hiện đại, giữ nguyên vẹn 99% cấu trúc hoạt chất saponin cùng hương thơm thảo mộc tự nhiên vốn có của lá và củ sâm tươi.',
    note: 'Giữ trọn vị ngọt hậu thanh tao',
  },
  {
    Icon: Leaf,
    title: '100% không chất bảo quản',
    description: 'Cam kết 0 hương liệu hóa học, 0 phẩm màu tổng hợp và 0 đường tinh luyện. Vị ngọt hậu tự nhiên chuyển hóa dịu mát từ chính dưỡng chất của sâm.',
    note: 'Lành tính cho dạ dày & giấc ngủ',
  },
];

export default function BentoUSP() {
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  return (
    <>
      <Section id="usp" aria-labelledby="origin-title">
        <SectionHeader
          titleId="origin-title"
          title="Vì sao Trà Sâm Trường Nhân khác biệt?"
          subtitle="Hội tụ tinh hoa quốc bảo sâm Ngọc Linh với công nghệ chế biến hiện đại, đem lại trải nghiệm thưởng trà lành mạnh, chuẩn vị và giàu dưỡng chất."
          align="start"
        />

        <div className="grid items-center gap-x-10 gap-y-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <figure className="min-w-0">
            <div className="relative aspect-[8/5] overflow-hidden rounded-sam-lg bg-sam-paper">
              <MediaImage
                src={farmImage}
                alt="Hai người kiểm tra cây sâm trong vườn trồng dược liệu"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1100px) 45vw, 560px"
                className="object-cover"
              />
            </div>
            <figcaption className="sam-caption">
              <span>Vườn trồng dược liệu</span>
              <span className="font-normal text-sam-muted">Ảnh trong hồ sơ Trường Nhân</span>
            </figcaption>
          </figure>

          <article className="min-w-0">
            <h3 className="font-heading text-sam-subheading font-semibold">100% Sâm Ngọc Linh trên đỉnh 1.800m</h3>
            <p className="mt-3 max-w-[64ch] text-sam-body text-sam-ink">
              Thu hái từ những luống sâm sinh trưởng tự nhiên dưới tán rừng nguyên sinh già mù sương,
              nơi có thổ nhưỡng mùn đen độc nhất vô nhị. Chứa hơn 52 hợp chất saponin đa dạng,
              hỗ trợ tối đa quá trình bồi bổ cơ thể và phục hồi tinh thần.
            </p>
            <dl className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
              <div className="flex flex-col-reverse gap-1">
                <dt className="text-sam-label text-sam-muted">Hoạt chất saponin</dt>
                <dd className="font-heading text-sam-subheading font-semibold text-sam-action">52+</dd>
              </div>
              <div className="flex flex-col-reverse gap-1">
                <dt className="text-sam-label text-sam-muted">Độ cao khí hậu sương</dt>
                <dd className="font-heading text-sam-subheading font-semibold text-sam-action">&gt; 1.800m</dd>
              </div>
              <div className="flex flex-col-reverse gap-1">
                <dt className="text-sam-label text-sam-muted">Tuổi củ sâm thu hái</dt>
                <dd className="font-heading text-sam-subheading font-semibold text-sam-action">6 năm</dd>
              </div>
            </dl>
          </article>
        </div>

        <article className="mt-8 grid items-center gap-x-8 gap-y-4 rounded-sam-lg bg-sam-paper p-5 sm:p-7 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            <h3 className="flex items-start gap-3 font-heading text-sam-subheading font-semibold">
              <Award className="mt-0.5 size-6 shrink-0" aria-hidden="true" /> Đạt chuẩn OCOP 4 sao
            </h3>
            <p className="mt-1 text-sam-label font-semibold text-sam-action">Chứng nhận quốc gia</p>
            <p className="mt-3 max-w-[61ch] text-sam-body text-sam-ink">
              Vượt qua hàng loạt quy chuẩn kiểm định khắt khe về an toàn thực phẩm,
              dược tính và đóng gói. Đại diện cho niềm tự hào nông sản dược liệu cao cấp Việt Nam.
            </p>
          </div>
          <Button variant="secondary" className="w-fit max-w-64 text-start" aria-haspopup="dialog" onClick={() => setIsCertModalOpen(true)}>
            <FileText className="size-4 shrink-0" aria-hidden="true" />
            Xem hồ sơ chứng nhận và vùng trồng
          </Button>
        </article>

        <ul className="mt-9 divide-y divide-sam-line border-y border-sam-line">
          {DETAILS.map(({ Icon, title, description, note }) => (
            <li key={title} className="grid gap-2 py-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.65fr)] md:gap-5">
              <h3 className="flex items-start gap-3 font-heading text-sam-subheading font-semibold">
                <Icon className="mt-1 size-5 shrink-0" aria-hidden="true" /> {title}
              </h3>
              <div>
                <p className="max-w-[68ch] text-sam-body text-sam-ink">{description}</p>
                <p className="mt-1 text-sam-label font-semibold text-sam-muted">{note}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <CertificateModal isOpen={isCertModalOpen} onClose={() => setIsCertModalOpen(false)} />
    </>
  );
}
