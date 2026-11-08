import { createHash } from 'node:crypto';
import { calculateOrderTotal } from '@/data/products';
import { formatCurrency } from '@/lib/format';
import { ORDER_ID_PATTERN, OrderStorageError, orderStorageConfigured, saveOrder, type StoredOrder } from '@/lib/order-storage';

const PHONE_REGEX = /^(0|\+84)\d{9}$/;

function fail(status: number, message: string) {
  return Response.json({ success: false, message }, { status, headers: { 'Cache-Control': 'no-store' } });
}

async function notifyTelegram(order: StoredOrder) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `Đơn mới #${order.orderId}\nTổng tiền: ${formatCurrency(order.total)}\nMở /admin để xem thông tin giao hàng.`,
      }),
      signal: AbortSignal.timeout(2000),
    });
    if (!response.ok || (await response.json()).ok !== true) console.warn('Telegram order notification failed');
  } catch {
    console.warn('Telegram order notification failed');
  }
}

export async function POST(request: Request) {
  if (!orderStorageConfigured()) return fail(503, 'Đặt hàng trực tuyến đang tạm dừng. Bạn có thể nhắn nhóm Zentrix để được hỗ trợ.');

  let body;
  try {
    if (Number(request.headers.get('content-length')) > 8192) return fail(413, 'Dữ liệu đơn hàng quá dài.');
    const raw = await request.text();
    if (raw.length > 8192) return fail(413, 'Dữ liệu đơn hàng quá dài.');
    body = JSON.parse(raw);
  } catch {
    return fail(400, 'Dữ liệu đơn hàng không hợp lệ.');
  }
  if (!body || typeof body !== 'object') return fail(400, 'Dữ liệu đơn hàng không hợp lệ.');

  const { requestId, paymentMethod, items } = body;
  const customerName = typeof body.customerName === 'string' ? body.customerName.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const address = typeof body.address === 'string' ? body.address.trim() : '';
  const note = typeof body.note === 'string' ? body.note.trim() : '';
  if (!customerName || customerName.length > 120) return fail(400, 'Nhập họ tên người nhận, tối đa 120 ký tự.');
  if (!PHONE_REGEX.test(phone)) return fail(400, 'Số điện thoại nhận hàng không hợp lệ.');
  if (!address || address.length > 500 || note.length > 500) return fail(400, 'Kiểm tra địa chỉ và ghi chú giao hàng.');
  if (typeof requestId !== 'string' || !ORDER_ID_PATTERN.test(`TN-${requestId}`)) {
    return fail(400, 'Phiên đặt hàng không hợp lệ. Vui lòng tải lại trang.');
  }
  if (paymentMethod !== 'cod') return fail(400, 'Đơn mới áp dụng thanh toán khi nhận hàng (COD). Vui lòng tải lại trang.');
  if (!Array.isArray(items) || !items.length || items.length > 20 ||
    items.some((item) => !item || typeof item.productId !== 'string' ||
      !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) ||
    new Set(items.map(({ productId }) => productId)).size !== items.length) {
    return fail(400, 'Kiểm tra sản phẩm và số lượng trong giỏ hàng.');
  }

  const { total, verifiedItems } = calculateOrderTotal(items);
  if (verifiedItems.length !== items.length || total <= 0) return fail(400, 'Giỏ có sản phẩm không khả dụng.');

  const order: StoredOrder = {
    orderId: `TN-${requestId}`,
    createdAt: new Date().toISOString(),
    customerName, phone, address, note, paymentMethod, total,
    status: 'new',
    items: verifiedItems.map(({ product, quantity }) => ({
      id: product.id, name: product.name, quantity, price: product.price,
    })).sort((a, b) => a.id.localeCompare(b.id)),
  };
  const fingerprint = createHash('sha256').update(JSON.stringify([
    customerName, phone, address, note, paymentMethod, order.items.map(({ id, quantity }) => [id, quantity]),
  ])).digest('hex');

  try {
    const { created, total: savedTotal } = await saveOrder(order, fingerprint);
    if (created) await notifyTelegram(order);
    return Response.json({
      success: true,
      orderId: order.orderId,
      total: savedTotal,
      message: 'Đơn hàng đã được ghi nhận. Nhóm Zentrix sẽ liên hệ để xác nhận.',
    }, { status: created ? 201 : 200, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof OrderStorageError && error.code === 'conflict') {
      return fail(409, 'Mã đơn đã dùng cho một đơn khác. Vui lòng kiểm tra và thử lại.');
    }
    return fail(503, 'Chưa xác nhận được đơn. Hãy bấm gửi lại để kiểm tra cùng một đơn.');
  }
}
