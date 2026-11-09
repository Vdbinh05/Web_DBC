import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { LockKeyhole, Package } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Input, Select } from '@/components/ui/Field';
import { adminAuthenticated, adminConfigured, adminPath } from '@/lib/admin-session';
import { cn } from '@/lib/cn';
import { formatCurrency } from '@/lib/format';
import { listOrders, orderStorageConfigured, ORDER_STATUSES, type StoredOrder } from '@/lib/order-storage';
import { changeStatus, login, logout } from './actions';
import TrafficPanel from './TrafficPanel';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Quản trị cửa hàng',
  robots: { index: false, follow: false },
};

const orderDate = new Intl.DateTimeFormat('vi-VN', {
  dateStyle: 'short', timeStyle: 'short', timeZone: 'Asia/Ho_Chi_Minh',
});
const notices = {
  saved: 'Đã lưu trạng thái đơn hàng.',
  invalid: 'Trạng thái đơn không hợp lệ.',
  unavailable: 'Chưa lưu được trạng thái. Vui lòng thử lại.',
  conflict: 'Đơn vừa được cập nhật ở phiên khác. Kiểm tra trạng thái hiện tại trước khi lưu.',
};

const linkStyle = 'sam-focus inline-flex min-h-11 items-center rounded-sam-sm px-2 text-sam-label font-semibold text-sam-action underline underline-offset-4 hover:bg-sam-paper active:bg-sam-disabled';

function OrderCard({ order, before }: { order: StoredOrder; before: number | null }) {
  return (
    <Card as="article" id={order.orderId} className="sam-anchor space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-sans text-lg font-semibold">{order.customerName}</h3>
          <p className="wrap-anywhere text-sam-label text-sam-muted">{order.orderId}</p>
          <time dateTime={order.createdAt} className="text-sam-label text-sam-muted">{orderDate.format(new Date(order.createdAt))}</time>
        </div>
        <Badge tone={order.status === 'completed' ? 'success' : order.status === 'cancelled' ? 'error' : 'neutral'}>{ORDER_STATUSES[order.status]}</Badge>
      </div>

      <dl className="grid gap-3 border-y border-sam-line py-3 text-sam-label sm:grid-cols-2">
        <div>
          <dt className="text-sam-muted">Điện thoại</dt>
          <dd><a href={`tel:${order.phone}`} className={linkStyle}>{order.phone}</a></dd>
        </div>
        <div><dt className="text-sam-muted">Địa chỉ giao hàng</dt><dd className="wrap-anywhere">{order.address}</dd></div>
        {order.note && <div className="sm:col-span-2"><dt className="text-sam-muted">Ghi chú</dt><dd className="wrap-anywhere whitespace-pre-wrap">{order.note}</dd></div>}
      </dl>

      <ul className="space-y-1 text-sam-label">
        {order.items.map((item) => <li key={item.id}>{item.quantity} × {item.name} · {formatCurrency(item.price)}</li>)}
      </ul>
      <p className="text-sam-body font-semibold tabular-nums text-sam-action">{formatCurrency(order.total)}</p>
      <p className="text-sam-label text-sam-muted">
        {order.paymentMethod === 'cod' ? 'COD · Thu tiền khi giao' : 'VietQR · Đối soát giao dịch trước khi giao'}
      </p>

      <form action={changeStatus} className="grid items-end gap-2 sm:grid-cols-[1fr_auto]">
        <input type="hidden" name="orderId" value={order.orderId} />
        <input type="hidden" name="previousStatus" value={order.status} />
        <input type="hidden" name="before" value={before ?? ''} />
        <Select label="Trạng thái xử lý" name="status" defaultValue={order.status} key={order.status}>
          {Object.entries(ORDER_STATUSES).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </Select>
        <Button type="submit" variant="secondary" size="sm">Lưu trạng thái</Button>
      </form>
    </Card>
  );
}

async function OrdersPanel({ before, notice, path }: { before: number | null; notice: string; path: string }) {
  const configured = orderStorageConfigured();
  let results: Awaited<ReturnType<typeof listOrders>> | null = null;
  if (configured) {
    try { results = await listOrders(before); } catch { /* Render the retry state below. */ }
  }

  return (
    <section aria-labelledby="orders-heading" className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          <h2 id="orders-heading" className="font-sans text-xl font-semibold">Đơn hàng</h2>
          <p className="text-sam-label text-sam-muted">Xem người đặt, địa chỉ giao và cập nhật tiến độ xử lý.</p>
        </div>
        {results && <Badge tone="neutral">{results.orders.length} đơn trên trang</Badge>}
      </div>
      {notice && <p role="status" className="text-sam-label font-semibold">{notice}</p>}
      {!configured ? (
        <Card className="space-y-2">
          <h3 className="font-sans text-base font-semibold">Chưa kết nối Google Sheets</h3>
          <p className="text-sam-label text-sam-muted">Cấu hình webhook Google Sheets để nhận đơn mới và xem đơn đã lưu.</p>
        </Card>
      ) : !results ? (
        <Card className="max-w-lg">
          <p role="alert">Chưa tải được đơn hàng từ Google Sheets.</p>
          <Link href={before ? `${path}?before=${before}` : path} prefetch={false} className={linkStyle}>Thử tải lại</Link>
        </Card>
      ) : results.orders.length ? (
        <div className="grid items-start gap-4 lg:grid-cols-2">
          {results.orders.map((order) => <OrderCard key={order.orderId} order={order} before={before} />)}
        </div>
      ) : (
        <Card className="max-w-lg space-y-2">
          <Package className="size-6 text-sam-action" aria-hidden="true" />
          <h3 className="font-sans text-base font-semibold">Chưa có đơn ở trang này</h3>
          <p className="text-sam-label text-sam-muted">Đơn mới xuất hiện ở đầu danh sách sau khi được ghi vào Google Sheets.</p>
        </Card>
      )}
      {(before || results?.nextBefore) && (
        <nav aria-label="Phân trang đơn hàng" className="flex flex-wrap gap-4">
          {before && <Link href={path} prefetch={false} className={linkStyle}>Về đơn mới nhất</Link>}
          {results?.nextBefore && <Link href={`${path}?before=${results.nextBefore}`} prefetch={false} className={linkStyle}>Xem đơn cũ hơn</Link>}
        </nav>
      )}
    </section>
  );
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ before?: string; notice?: string; tab?: string; days?: string }> }) {
  const [query, signedIn, path] = await Promise.all([searchParams, adminAuthenticated(), adminPath()]);
  const requested = typeof query.before === 'string' ? Number(query.before) : 0;
  const before = Number.isSafeInteger(requested) && requested >= 3 ? requested : null;
  const storefront = path === '/' ? (process.env.NEXT_PUBLIC_SITE_URL || 'https://zentrix.id.vn') : '/';
  const notice = typeof query.notice === 'string' && Object.hasOwn(notices, query.notice)
    ? notices[query.notice as keyof typeof notices]
    : '';
  const showTraffic = query.tab === 'traffic';
  const days = query.days === '30' ? 30 : 7;

  return (
    <main className="sam-container py-8 sm:py-12" data-clarity-mask="True">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-sam-line pb-4">
        <div>
          <Link href={storefront} prefetch={false} className={linkStyle}>Trà Sâm Trường Nhân</Link>
          <h1 className="font-sans text-2xl font-semibold tracking-tight sm:text-3xl">Quản trị cửa hàng</h1>
        </div>
        {signedIn && <form action={logout}><Button type="submit" variant="secondary" size="sm">Đăng xuất</Button></form>}
      </header>

      {!signedIn ? (
        <Card className="max-w-md space-y-4">
          <LockKeyhole className="size-6 text-sam-action" aria-hidden="true" />
          <h2 className="font-sans text-xl font-semibold">Đăng nhập quản trị</h2>
          {adminConfigured() ? (
            <form action={login} className="grid gap-4">
              <Input name="password" label="Mật khẩu quản trị" type="password" autoComplete="current-password" required maxLength={256} error={query.notice === 'login' ? 'Mật khẩu không đúng.' : undefined} />
              <Button type="submit">Đăng nhập</Button>
            </form>
          ) : <p className="text-sam-label text-sam-muted">Khu vực quản trị đang chờ thiết lập.</p>}
        </Card>
      ) : (
        <>
          <nav aria-label="Khu vực quản trị" className="mb-6 flex flex-wrap gap-1 border-b border-sam-line">
            {[
              { href: path, label: 'Đơn hàng', current: !showTraffic },
              { href: `${path}?tab=traffic&days=${days}`, label: 'Thống kê truy cập', current: showTraffic },
            ].map(({ href, label, current }) => (
              <Link
                key={label}
                href={href}
                prefetch={false}
                aria-current={current ? 'page' : undefined}
                className={cn(
                  'sam-focus inline-flex min-h-11 items-center border-b-2 px-3 text-sam-label font-semibold hover:bg-sam-paper',
                  current ? 'border-sam-action text-sam-action' : 'border-transparent text-sam-muted',
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
          <Suspense key={showTraffic ? `traffic-${days}` : `orders-${before}`} fallback={
            <Card role="status" className="text-sam-label text-sam-muted">
              {showTraffic ? 'Đang tải báo cáo truy cập…' : 'Đang tải đơn hàng…'}
            </Card>
          }>
            {showTraffic ? <TrafficPanel path={path} days={days} /> : <OrdersPanel before={before} notice={notice} path={path} />}
          </Suspense>
        </>
      )}
    </main>
  );
}
