import 'server-only';

export const ORDER_STATUSES = {
  new: 'Mới',
  confirmed: 'Đã xác nhận',
  shipping: 'Đang giao',
  completed: 'Hoàn tất',
  cancelled: 'Đã hủy',
} as const;

export type OrderStatus = keyof typeof ORDER_STATUSES;

export interface StoredOrder {
  orderId: string;
  createdAt: string;
  customerName: string;
  phone: string;
  address: string;
  note: string;
  paymentMethod: 'cod' | 'banking';
  total: number;
  items: { id: string; name: string; quantity: number; price: number }[];
  status: OrderStatus;
}

export const ORDER_ID_PATTERN = /^TN-[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/;

export function isOrderStatus(value: unknown): value is OrderStatus {
  return typeof value === 'string' && Object.hasOwn(ORDER_STATUSES, value);
}

function storageConfig() {
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  const url = URL.parse(process.env.GOOGLE_SHEETS_WEBHOOK_URL ?? '');
  if (!secret || secret.length < 32 || !url || url.origin !== 'https://script.google.com' ||
    !/^\/macros\/s\/[\w-]+\/exec$/.test(url.pathname) || url.username || url.password || url.search || url.hash) return null;
  return { secret, url };
}

export function orderStorageConfigured() {
  return storageConfig() !== null;
}

export class OrderStorageError extends Error {
  constructor(public readonly code: string) {
    super('Google Sheets order storage failed');
  }
}

type SheetAction =
  | { action: 'create'; order: StoredOrder; fingerprint: string }
  | { action: 'list'; before: number | null }
  | { action: 'status'; orderId: string; status: OrderStatus; previousStatus: OrderStatus };

async function callSheet<T>(action: SheetAction): Promise<T> {
  const config = storageConfig();
  if (!config) throw new OrderStorageError('unconfigured');

  // Apps Script ContentService returns a 302 to a temporary, signed content URL.
  const options = { cache: 'no-store', redirect: 'manual', signal: AbortSignal.timeout(8500) } as const;
  let response = await fetch(config.url, {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...action, secret: config.secret }),
  });
  if (response.status === 302 || response.status === 303) {
    const contentUrl = URL.parse(response.headers.get('location') ?? '');
    if (!contentUrl || contentUrl.origin !== 'https://script.googleusercontent.com' || contentUrl.pathname !== '/macros/echo') {
      throw new OrderStorageError('redirect');
    }
    response = await fetch(contentUrl, options);
  }
  if (!response.ok) throw new OrderStorageError('http');
  const result = await response.json();
  if (result?.ok !== true) throw new OrderStorageError(result?.code === 'conflict' ? 'conflict' : 'upstream');
  return result as T;
}

export async function saveOrder(order: StoredOrder, fingerprint: string) {
  const result = await callSheet<{ orderId?: unknown; total?: unknown; created?: unknown }>({ action: 'create', order, fingerprint });
  if (result.orderId !== order.orderId || typeof result.total !== 'number' || !Number.isSafeInteger(result.total) ||
    result.total <= 0 || typeof result.created !== 'boolean' || (result.created && result.total !== order.total)) {
    throw new OrderStorageError('invalid_receipt');
  }
  return { created: result.created, total: result.total };
}

export async function listOrders(before: number | null) {
  const result = await callSheet<{ orders: StoredOrder[]; nextBefore: number | null }>({ action: 'list', before });
  if (!Array.isArray(result.orders) || result.orders.length > 25 ||
    result.orders.some((order) => !order || !ORDER_ID_PATTERN.test(order.orderId) || !isOrderStatus(order.status) || !Array.isArray(order.items)) ||
    (result.nextBefore !== null && (!Number.isSafeInteger(result.nextBefore) || result.nextBefore < 3))) {
    throw new OrderStorageError('invalid_list');
  }
  return result;
}

export async function updateOrderStatus(orderId: string, status: OrderStatus, previousStatus: OrderStatus) {
  await callSheet({ action: 'status', orderId, status, previousStatus });
}
