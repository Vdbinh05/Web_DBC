import type { Metadata } from 'next';
import Link from 'next/link';
import { LockKeyhole, Package } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Input, Select } from '@/components/ui/Field';
import { adminAuthenticated, adminConfigured } from '@/lib/admin-session';
import { formatCurrency } from '@/lib/format';
import { listOrders, ORDER_STATUSES, type StoredOrder } from '@/lib/order-storage';
import { changeStatus, login, logout } from './actions';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Quản lý đơn hàng',
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
          <h2 className="font-heading text-sam-subheading font-semibold">{order.customerName}</h2>
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

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ before?: string; notice?: string }> }) {
  const query = await searchParams;
  const requested = Number(query.before);
  const before = Number.isSafeInteger(requested) && requested >= 3 ? requested : null;
  const signedIn = await adminAuthenticated();
  let results: Awaited<ReturnType<typeof listOrders>> | null = null;
  if (signedIn) {
    try { results = await listOrders(before); } catch { /* Render the retry state below. */ }
  }
  const notice = query.notice && Object.hasOwn(notices, query.notice) ? notices[query.notice as keyof typeof notices] : '';

  return (
    <main className="sam-container py-8 sm:py-12" data-clarity-mask="True">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-sam-line pb-4">
        <div>
          <Link href="/" prefetch={false} className={linkStyle}>Trà Sâm Trường Nhân</Link>
          <h1 className="font-heading text-sam-heading font-semibold">Quản lý đơn hàng</h1>
        </div>
        {signedIn && <form action={logout}><Button type="submit" variant="secondary" size="sm">Đăng xuất</Button></form>}
      </header>

      {!signedIn ? (
        <Card className="max-w-md space-y-4">
          <LockKeyhole className="size-6 text-sam-action" aria-hidden="true" />
          <h2 className="font-heading text-sam-subheading font-semibold">Đăng nhập quản trị</h2>
          {adminConfigured() ? (
            <form action={login} className="grid gap-4">
              <Input name="password" label="Mật khẩu quản trị" type="password" autoComplete="current-password" required maxLength={256} error={query.notice === 'login' ? 'Mật khẩu không đúng.' : undefined} />
              <Button type="submit">Đăng nhập</Button>
            </form>
          ) : <p className="text-sam-label text-sam-muted">Khu vực quản trị đang chờ thiết lập.</p>}
        </Card>
      ) : (
        <>
          {notice && <p role="status" className="mb-4 text-sam-label font-semibold">{notice}</p>}
          {!results ? (
            <Card className="max-w-lg">
              <p role="alert">Chưa tải được đơn hàng từ Google Sheets.</p>
              <Link href={before ? `/admin?before=${before}` : '/admin'} prefetch={false} className={linkStyle}>Thử tải lại</Link>
            </Card>
          ) : results.orders.length ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {results.orders.map((order) => <OrderCard key={order.orderId} order={order} before={before} />)}
            </div>
          ) : (
            <Card className="max-w-lg space-y-2">
              <Package className="size-6 text-sam-action" aria-hidden="true" />
              <h2 className="font-heading text-sam-subheading font-semibold">Chưa có đơn ở trang này</h2>
              <p className="text-sam-label text-sam-muted">Đơn mới xuất hiện ở đầu danh sách sau khi được ghi vào Google Sheets.</p>
            </Card>
          )}
          {(before || results?.nextBefore) && (
            <nav aria-label="Phân trang đơn hàng" className="mt-5 flex flex-wrap gap-4">
              {before && <Link href="/admin" prefetch={false} className={linkStyle}>Về đơn mới nhất</Link>}
              {results?.nextBefore && <Link href={`/admin?before=${results.nextBefore}`} prefetch={false} className={linkStyle}>Xem đơn cũ hơn</Link>}
            </nav>
          )}
        </>
      )}
    </main>
  );
}
