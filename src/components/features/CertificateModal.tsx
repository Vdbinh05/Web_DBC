'use client';

import { useState } from 'react';
import { ArrowUpRight, FileText } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Dialog from '@/components/ui/Dialog';
import MediaImage from '@/components/ui/MediaImage';
import farmImage from '@/components/ui/media/ngoc-linh-farm.webp';
import declaration from '@/components/ui/media/tea-self-declaration.webp';
import testReport from '@/components/ui/media/tea-test-report.webp';

const TABS = [
  { id: 'documents', label: 'Hồ sơ sản phẩm' },
  { id: 'ocop', label: 'OCOP 4 sao' },
  { id: 'origin', label: 'Chỉ dẫn địa lý' },
  { id: 'farm', label: 'Vườn sâm' },
] as const;

const DOCUMENTS = [
  {
    title: 'Bản tự công bố sản phẩm',
    reference: 'Số 03/TRUONGNHAN/2026',
    description: 'Trích trang 1, mục thông tin sản phẩm Trà Sâm Trường Nhân.',
    alt: 'Mục II ghi tên Trà Sâm Trường Nhân, thành phần, hạn sử dụng và quy cách đóng gói.',
    image: declaration,
  },
  {
    title: 'Phiếu kết quả thử nghiệm',
    reference: 'Kiểm nghiệm Việt Tín · 05/02/2026',
    description: 'Trích trang 1, phần thông tin mẫu Trà Sâm Trường Nhân và bảng kết quả của mẫu ghi trên phiếu.',
    alt: 'Trích phiếu thử nghiệm Việt Tín, ghi tên mẫu Trà Sâm Trường Nhân và bảng chỉ tiêu thử nghiệm.',
    image: testReport,
  },
];

const INFORMATION = {
  ocop: {
    title: 'Chứng nhận sản phẩm OCOP 4 sao',
    subtitle: 'Được UBND Tỉnh cấp chứng nhận xếp hạng 4 sao theo bộ tiêu chuẩn quốc gia',
    bullets: [
      'Đạt đầy đủ tiêu chuẩn vệ sinh an toàn thực phẩm khắt khe',
      'Nguồn gốc dược liệu tự nhiên minh bạch 100%',
      'Sản phẩm đặc sản thế mạnh đại diện vùng dược liệu Việt Nam',
    ],
  },
  origin: {
    title: 'Chứng nhận chỉ dẫn địa lý Sâm Ngọc Linh',
    subtitle: 'Xác thực nguồn sâm thu hái đúng vùng chỉ dẫn địa lý dãy núi Ngọc Linh',
    bullets: [
      'Kiểm định hàm lượng hoạt chất Saponin quý vượt trội',
      'Cấp mã định danh truy xuất nguồn gốc củ sâm',
      'Cam kết không pha tạp sâm ngoại lai hoặc chất kích thích tăng trưởng',
    ],
  },
  farm: {
    title: 'Vườn sâm nguyên sinh Trường Nhân (>1.800m)',
    subtitle: 'Mô hình bảo tồn và phát triển sâm dưới tán rừng nguyên sinh già',
    bullets: [
      'Độ cao lý tưởng trên 1.800m so với mực nước biển',
      'Đất mùn rừng già màu mỡ, khí hậu sương mù mát lạnh quanh năm',
      'Quy trình chăm sóc bán hoang dã, bảo tồn thảm thực vật bản địa',
    ],
  },
};

export default function CertificateModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]['id']>('documents');
  const information = activeTab === 'documents' ? null : INFORMATION[activeTab];

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      title="Hồ sơ chứng nhận và nguồn gốc dược liệu"
      closeLabel="Đóng cửa sổ chứng nhận"
      className="max-w-3xl"
    >
      {isOpen && (
        <>
          <div role="group" aria-label="Chọn mục hồ sơ" className="mb-4 flex flex-wrap gap-2">
            {TABS.map(({ id, label }) => (
              <Button
                key={id}
                size="sm"
                variant={activeTab === id ? 'primary' : 'secondary'}
                aria-pressed={activeTab === id}
                aria-controls="certificate-content"
                onClick={() => setActiveTab(id)}
              >
                {label}
              </Button>
            ))}
          </div>

          <div id="certificate-content">
            {activeTab === 'documents' ? (
              <>
                <h3 className="font-heading text-sam-subheading font-semibold">Tài liệu của Trà Sâm Trường Nhân</h3>
                <p className="mt-2 mb-4 text-sam-label text-sam-muted">Ảnh trích từ hồ sơ sản phẩm do Trường Nhân cung cấp.</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {DOCUMENTS.map(({ title, reference, description, alt, image }) => (
                    <Card as="article" key={title} className="flex min-w-0 flex-col gap-2 p-3 sm:p-4">
                      <div className="flex items-start gap-2 text-sam-action">
                        <FileText className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                        <h4 className="font-sans text-sam-label font-semibold">{title}</h4>
                      </div>
                      <p className="text-sam-label text-sam-muted">{reference}</p>
                      <figure className="grid gap-2">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-sam-sm border border-sam-line bg-sam-paper">
                          <MediaImage src={image} alt={alt} sizes="(max-width: 639px) calc(100vw - 6rem), 330px" className="object-contain" />
                        </div>
                        <figcaption className="sam-caption font-normal text-sam-muted">{description}</figcaption>
                      </figure>
                      <a
                        href={image.src}
                        target="_blank"
                        rel="noopener"
                        className="sam-focus mt-auto inline-flex min-h-(--spacing-sam-touch) w-fit items-center gap-1 rounded-sam-sm text-sam-label font-semibold text-sam-action underline underline-offset-4 hover:text-sam-action-hover active:text-sam-action-active"
                        aria-label={`Mở ảnh ${title.toLowerCase()} trong tab mới`}
                      >
                        Mở ảnh cỡ đầy đủ <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                      </a>
                    </Card>
                  ))}
                </div>
              </>
            ) : information && (
              <div className="space-y-3">
                {activeTab !== 'farm' && <Badge tone="warning">Chưa có ảnh bản cấp để đối chiếu</Badge>}
                <h3 className="font-heading text-sam-subheading font-semibold">{information.title}</h3>
                {activeTab !== 'farm' && <p className="text-sam-label font-semibold text-sam-muted">Thông tin đang công bố trên website</p>}
                <p className="text-sam-body text-sam-ink">{information.subtitle}</p>
                {activeTab === 'farm' && (
                  <figure>
                    <div className="relative aspect-[8/5] max-w-md overflow-hidden rounded-sam-sm bg-sam-paper">
                      <MediaImage src={farmImage} alt="Hai người kiểm tra cây sâm trong vườn trồng dược liệu" sizes="(max-width: 500px) calc(100vw - 4rem), 448px" className="object-cover" />
                    </div>
                    <figcaption className="sam-caption">Ảnh vườn trồng trong hồ sơ Trường Nhân</figcaption>
                  </figure>
                )}
                <ul className="list-disc space-y-1 ps-5 text-sam-label text-sam-ink">
                  {information.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
                {activeTab === 'farm' && (
                  <p className="border-t border-sam-line pt-3 text-sam-label">
                    <span className="text-sam-muted">Cam kết chất lượng Trường Nhân</span> · <strong>100% Sâm Ngọc Linh Thật</strong>
                  </p>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </Dialog>
  );
}
