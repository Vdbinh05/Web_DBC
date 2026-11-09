import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { getAdminTraffic, type TrafficPeriod, type TrafficRank } from '@/lib/admin-analytics';
import { cn } from '@/lib/cn';

const numberFormat = new Intl.NumberFormat('vi-VN');
const periods = [7, 30] as const;

function Ranking({ title, label, unit, rows }: { title: string; label: string; unit: string; rows: TrafficRank[] }) {
  return (
    <Card className="space-y-3">
      <h3 className="font-sans text-base font-semibold">{title}</h3>
      {rows.length ? (
        <table aria-label={title} className="w-full table-fixed text-sam-label">
          <thead className="text-sam-muted">
            <tr className="border-b border-sam-line">
              <th scope="col" className="pb-2 text-start font-medium">{label}</th>
              <th scope="col" className="w-24 pb-2 text-end font-medium">{unit}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sam-line">
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="wrap-anywhere py-2.5 pe-2">{row.label}</td>
                <td className="py-2.5 text-end font-medium tabular-nums">{numberFormat.format(row.count)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <p className="text-sam-label text-sam-muted">Chưa có dữ liệu trong khoảng thời gian này.</p>}
    </Card>
  );
}

export default async function TrafficPanel({ path, days }: { path: string; days: TrafficPeriod }) {
  let traffic: Awaited<ReturnType<typeof getAdminTraffic>> | undefined;
  try {
    traffic = await getAdminTraffic(days);
  } catch {
    console.warn('Unable to load the admin GA4 report');
  }

  return (
    <section aria-labelledby="traffic-heading" className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          <h2 id="traffic-heading" className="font-sans text-xl font-semibold">Thống kê truy cập</h2>
          <p className="max-w-[65ch] text-sam-label text-sam-muted">GA4 tổng hợp dữ liệu từ khách đã bật đo lường trên web bán hàng.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <nav aria-label="Khoảng thời gian thống kê" className="flex rounded-sam-sm border border-sam-line bg-sam-surface p-0.5">
            {periods.map((period) => (
              <Link
                key={period}
                href={`${path}?tab=traffic&days=${period}`}
                prefetch={false}
                aria-current={days === period ? 'true' : undefined}
                className={cn(
                  'sam-focus inline-flex min-h-11 items-center rounded-sam-sm px-3 text-sam-label font-semibold',
                  days === period ? 'bg-sam-action text-sam-on-action' : 'text-sam-action hover:bg-sam-paper',
                )}
              >
                {period} ngày
              </Link>
            ))}
          </nav>
          {traffic !== null && (
            <form action={path} method="get">
              <input type="hidden" name="tab" value="traffic" />
              <input type="hidden" name="days" value={days} />
              <Button type="submit" variant="secondary" size="sm">Cập nhật</Button>
            </form>
          )}
        </div>
      </div>

      {traffic === null ? (
        <Card className="space-y-2">
          <h3 className="font-sans text-base font-semibold">Chưa kết nối Google Analytics</h3>
          <p className="max-w-[65ch] text-sam-label text-sam-muted">Thêm mã đo lường, mã thuộc tính GA4 và khóa tài khoản dịch vụ vào môi trường Production để xem số liệu ở đây.</p>
        </Card>
      ) : !traffic ? (
        <Card role="alert" className="space-y-2">
          <h3 className="font-sans text-base font-semibold">Chưa tải được báo cáo GA4</h3>
          <p className="max-w-[65ch] text-sam-label text-sam-muted">Bấm Cập nhật để thử lại. Nếu lỗi tiếp diễn, kiểm tra quyền đọc thuộc tính của tài khoản dịch vụ.</p>
        </Card>
      ) : (
        <>
          <Card className="p-0 sm:p-0">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[inherit] bg-sam-line lg:grid-cols-4">
              {[
                ['Khách hoạt động', traffic.activeUsers],
                ['Phiên truy cập', traffic.sessions],
                ['Lượt xem trang', traffic.views],
                ['Khách trong 30 phút qua', traffic.activeNow],
              ].map(([label, value]) => (
                <div key={label} className="min-w-0 space-y-2 bg-sam-surface p-4 sm:p-5">
                  <dt className="text-sam-label text-sam-muted">{label}</dt>
                  <dd className="font-sans text-2xl font-semibold tabular-nums text-sam-action">
                    {typeof value === 'number' ? numberFormat.format(value) : <span className="text-sam-label font-medium text-sam-muted">Chưa tải được</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
          <div className="grid items-start gap-4 lg:grid-cols-2">
            <Ranking title="Kênh truy cập" label="Kênh" unit="Số phiên" rows={traffic.sources} />
            <Ranking title="Trang được xem nhiều" label="Đường dẫn" unit="Lượt xem" rows={traffic.pages} />
          </div>
        </>
      )}
    </section>
  );
}
