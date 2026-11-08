import Link from 'next/link';
import { ArrowUpRight, Clock, Factory, FileText, Leaf } from 'lucide-react';
import { TEA_BREW_GUIDE, TEA_MANUFACTURER, TEA_PRODUCT_URL, TEA_RESPONSIBLE_COMPANY } from '@/app/product-evidence';
import ProductEvidenceButton from '@/components/features/ProductEvidenceButton';
import MediaImage from '@/components/ui/MediaImage';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import teaPackage from '@/components/ui/media/tea-package.webp';

const INGREDIENTS = [
  ['Táo đỏ', '25%'],
  ['Lá đinh lăng', '17%'],
  ['Đẳng sâm', '15%'],
  ['Cam thảo', '15%'],
  ['Kỷ tử', '15%'],
  ['Nhân sâm', '10%'],
  ['Lá sâm Ngọc Linh', '3%'],
] as const;

const NUTRITION = [
  ['Năng lượng', '240 kcal'],
  ['Chất đạm', '8,22 g'],
  ['Carbohydrat', '47,5 g'],
  ['Đường tổng số', '37,1 g'],
  ['Chất béo', '1,85 g'],
  ['Natri', '170 mg'],
] as const;

const DETAILS = [
  { label: 'Xuất xứ', value: 'Việt Nam' },
  { label: 'Nơi sản xuất', value: TEA_MANUFACTURER, note: 'Lô B1–B3, Khu công nghiệp Trà Đa, phường Pleiku, Gia Lai' },
  { label: 'Đơn vị chịu trách nhiệm về sản phẩm', value: TEA_RESPONSIBLE_COMPANY, note: '33A, ngõ 48 Nguyễn Chánh, phường Yên Hòa, Hà Nội' },
];

const TEXT_LINK = 'sam-focus inline-flex min-h-11 w-fit items-center gap-1 rounded-sam-sm text-sam-label font-semibold text-sam-action underline underline-offset-4 hover:text-sam-action-hover active:text-sam-action-active';

export default function BentoUSP() {
  return (
    <Section id="usp" aria-labelledby="origin-title">
      <SectionHeader
        titleId="origin-title"
        title="Hồ sơ và nguồn gốc Trà Sâm Trường Nhân"
        subtitle="Đọc thành phần, quy cách, cách pha và lưu ý bảo quản. Xem tài liệu gốc để đối chiếu thông tin trên nhãn."
        align="start"
      />

      <div className="grid items-center gap-x-10 gap-y-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <figure className="min-w-0">
          <div className="relative aspect-[8/5] overflow-hidden rounded-sam-lg bg-sam-paper">
            <MediaImage
              src={teaPackage}
              alt="Hộp trà Trường Nhân mở nắp, bên trong có các gói trà túi lọc"
              sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1100px) 45vw, 560px"
              className="object-cover"
            />
          </div>
          <figcaption className="sam-caption">
            <span>Ảnh bao bì trà túi lọc</span>
          </figcaption>
        </figure>

        <article className="min-w-0">
          <h3 className="font-heading text-sam-subheading font-semibold">Quy cách và hạn dùng</h3>
          <p className="mt-3 max-w-[64ch] text-sam-body text-sam-ink">
            Trang Trường Nhân giới thiệu hộp 30 g gồm 15 túi. Bản tự công bố cũng liệt kê hộp 40 g gồm 20 túi. Mỗi túi ở hai quy cách này nặng 2 g.
            Xem số túi và quà kèm ở <a href="#combos" className="sam-focus rounded-sam-sm font-semibold text-sam-action underline underline-offset-4">từng combo</a>.
          </p>
          <dl className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
            <div className="flex flex-col-reverse gap-1">
              <dt className="text-sam-label text-sam-muted">Hạn dùng từ ngày sản xuất</dt>
              <dd className="font-heading text-sam-subheading font-semibold text-sam-action">12 tháng</dd>
            </div>
            <div className="flex flex-col-reverse gap-1">
              <dt className="text-sam-label text-sam-muted">Ngày sản xuất</dt>
              <dd className="font-heading text-sam-subheading font-semibold text-sam-action">In trên bao bì</dd>
            </div>
          </dl>
        </article>
      </div>

      <article className="mt-8 grid items-center gap-x-8 gap-y-4 rounded-sam-lg bg-sam-paper p-5 sm:p-7 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="min-w-0">
          <h3 className="flex items-start gap-3 font-heading text-sam-subheading font-semibold">
            <FileText className="mt-0.5 size-6 shrink-0" aria-hidden="true" /> Bản tự công bố và phiếu thử nghiệm
          </h3>
          <p className="mt-1 text-sam-label font-semibold text-sam-action">Bản tự công bố số 03/TRUONGNHAN/2026</p>
          <p className="mt-3 max-w-[61ch] text-sam-body text-sam-ink">
            Đối chiếu tên sản phẩm, thành phần trên nhãn và kết quả thử nghiệm của mẫu ghi trên phiếu.
          </p>
        </div>
        <ProductEvidenceButton />
      </article>

      <div className="mt-9 grid gap-x-10 gap-y-7 border-y border-sam-line py-6 md:grid-cols-2">
        <div className="min-w-0">
          <h3 className="flex items-start gap-3 font-heading text-sam-subheading font-semibold">
            <Leaf className="mt-1 size-5 shrink-0" aria-hidden="true" /> Thành phần trên nhãn
          </h3>
          <dl className="mt-3 divide-y divide-sam-line text-sam-label">
            {INGREDIENTS.map(([name, amount]) => (
              <div key={name} className="flex justify-between gap-4 py-2">
                <dt>{name}</dt>
                <dd className="font-semibold tabular-nums text-sam-action">{amount}</dd>
              </div>
            ))}
          </dl>
          <details className="mt-3 border-t border-sam-line">
            <summary className="sam-focus min-h-11 cursor-pointer rounded-sam-sm py-3 text-sam-label font-semibold text-sam-action">
              Giá trị dinh dưỡng trên 100 g sản phẩm
            </summary>
            <p className="mb-2 text-sam-label text-sam-muted">Hàm lượng ghi trên mẫu nhãn (±20%).</p>
            <dl className="divide-y divide-sam-line text-sam-label">
              {NUTRITION.map(([name, amount]) => (
                <div key={name} className="flex justify-between gap-4 py-2">
                  <dt>{name}</dt>
                  <dd className="font-semibold tabular-nums">{amount}</dd>
                </div>
              ))}
            </dl>
          </details>
        </div>

        <div id="tea-label-details" className="sam-anchor min-w-0">
          <h3 className="flex items-start gap-3 font-heading text-sam-subheading font-semibold">
            <Clock className="mt-1 size-5 shrink-0" aria-hidden="true" /> Cách pha và bảo quản
          </h3>
          <p className="mt-3 max-w-[62ch] text-sam-body">{TEA_BREW_GUIDE}</p>
          <ul className="mt-3 list-disc space-y-2 ps-5 text-sam-label text-sam-ink marker:text-sam-action">
            <li>Dùng mỗi túi một lần và dùng trà đã pha trong ngày.</li>
            <li>Để hộp ở nơi khô thoáng, tránh ánh nắng chiếu trực tiếp.</li>
            <li>Kiểm tra hạn dùng trước khi pha. Bỏ trà có dấu hiệu mốc hoặc mùi vị bất thường.</li>
            <li>Tránh dùng nếu dị ứng với bất kỳ thành phần nào trên nhãn.</li>
          </ul>
          <Link href="/blog/bi-quyet-pha-tra-sam-tui-loc-3-phut-chuan-vi" className={`mt-2 ${TEXT_LINK}`}>
            Đọc hướng dẫn pha từng bước
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="flex items-start gap-3 font-heading text-sam-subheading font-semibold">
          <Factory className="mt-1 size-5 shrink-0" aria-hidden="true" /> Thông tin đơn vị trên nhãn
        </h3>
        <dl className="mt-3 grid gap-x-8 gap-y-4 text-sam-label md:grid-cols-[0.6fr_1fr_1.15fr]">
          {DETAILS.map(({ label, value, note }) => (
            <div key={label} className="min-w-0">
              <dt className="text-sam-muted">{label}</dt>
              <dd className="font-semibold">{value}</dd>
              {note && <dd className="text-sam-muted">{note}</dd>}
            </div>
          ))}
        </dl>
        <a href={TEA_PRODUCT_URL} className={`mt-3 ${TEXT_LINK}`}>
          Đối chiếu trên trang sản phẩm Trường Nhân <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
        </a>
      </div>
    </Section>
  );
}
