'use client';

import { useState } from 'react';
import { ArrowUpRight, FileText } from 'lucide-react';
import { FACTORY_SOURCE_URL, GI_RECORD_URL, GI_UPDATE_URL, TEA_MANUFACTURER, TEA_PRODUCT_URL } from '@/app/product-evidence';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Dialog from '@/components/ui/Dialog';
import MediaImage from '@/components/ui/MediaImage';
import farmImage from '@/components/ui/media/ngoc-linh-farm.webp';
import declaration from '@/components/ui/media/tea-self-declaration.webp';
import testReport from '@/components/ui/media/tea-test-report.webp';
import labelImage from '@/components/ui/media/tea-label.webp';
import factoryImage from '@/components/ui/media/tea-factory.webp';

const TABS = [
  { id: 'documents', label: 'Hồ sơ sản phẩm' },
  { id: 'origin', label: 'Nguồn gốc sâm' },
  { id: 'factory', label: 'Nhà máy' },
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
  {
    title: 'Mẫu nhãn sản phẩm',
    reference: 'Trang 2 · Bản tự công bố',
    description: 'Trích mục III, gồm thành phần, cách dùng, đơn vị sản xuất và bảng dinh dưỡng.',
    alt: 'Mẫu nhãn Trà Sâm Trường Nhân ghi thành phần, hướng dẫn pha, thông tin doanh nghiệp và dinh dưỡng trên 100 g.',
    image: labelImage,
  },
];

const SOURCES = {
  origin: {
    title: 'Chỉ dẫn địa lý “Ngọc Linh”',
    description: 'Đăng ký số 00049 của Cục Sở hữu trí tuệ có phạm vi là sâm củ. Lá sâm Ngọc Linh là thành phần ghi trong bản tự công bố của Trà Sâm Trường Nhân.',
    image: farmImage,
    alt: 'Hai người kiểm tra cây sâm trong vườn trồng dược liệu',
    caption: 'Vườn trồng dược liệu',
    links: [
      { href: GI_RECORD_URL, label: 'Mở công báo đăng ký số 00049 (PDF)' },
      { href: GI_UPDATE_URL, label: 'Xem thông tin cập nhật từ Cục Sở hữu trí tuệ' },
    ],
  },
  factory: {
    title: 'Đơn vị sản xuất ghi trên hồ sơ',
    description: `Bản tự công bố ghi Trà Sâm Trường Nhân được sản xuất tại ${TEA_MANUFACTURER}, Khu công nghiệp Trà Đa, Gia Lai.`,
    image: factoryImage,
    alt: 'Dãy bồn thiết bị bằng thép không gỉ trong nhà máy',
    caption: 'Thiết bị tại nhà máy',
    links: [
      { href: FACTORY_SOURCE_URL, label: 'Xem nhà máy và vùng trồng trên trang Trường Nhân' },
    ],
  },
};

const SOURCE_LINK_CLASS = 'sam-focus inline-flex min-h-(--spacing-sam-touch) w-fit items-center gap-1 rounded-sam-sm text-sam-label font-semibold text-sam-action underline underline-offset-4 hover:text-sam-action-hover active:text-sam-action-active';

export default function CertificateModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]['id']>('documents');
  const source = activeTab === 'documents' ? null : SOURCES[activeTab];

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      title="Hồ sơ trà và nguồn gốc dược liệu"
      closeLabel="Đóng hồ sơ sản phẩm"
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
            {source === null ? (
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
                        className={`mt-auto ${SOURCE_LINK_CLASS}`}
                        aria-label={`Mở ảnh ${title.toLowerCase()} trong tab mới`}
                      >
                        Mở ảnh cỡ đầy đủ <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                      </a>
                    </Card>
                  ))}
                </div>
                <a href={TEA_PRODUCT_URL} target="_blank" rel="noopener" className={`mt-3 ${SOURCE_LINK_CLASS}`}>
                  Đối chiếu thông tin trên trang Trường Nhân <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                </a>
              </>
            ) : (
              <div className="space-y-3">
                <h3 className="font-heading text-sam-subheading font-semibold">{source.title}</h3>
                <p className="text-sam-body text-sam-ink">{source.description}</p>
                <figure>
                  <div className="relative aspect-[8/5] max-w-md overflow-hidden rounded-sam-sm bg-sam-paper">
                    <MediaImage src={source.image} alt={source.alt} sizes="(max-width: 500px) calc(100vw - 4rem), 448px" className="object-cover" />
                  </div>
                  <figcaption className="sam-caption">{source.caption}</figcaption>
                </figure>
                <ul>
                  {source.links.map(({ href, label }) => (
                    <li key={href}>
                      <a href={href} target="_blank" rel="noopener" className={SOURCE_LINK_CLASS}>
                        {label} <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </Dialog>
  );
}
