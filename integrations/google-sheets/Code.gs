const SHEET_NAME = 'WebOrders';
const HEADERS = ['Mã đơn', 'Dấu vân tay đơn', 'Ngày tạo', 'Trạng thái', 'Khách hàng', 'Điện thoại', 'Tổng VND', 'Chi tiết JSON'];
const STATUSES = ['new', 'confirmed', 'shipping', 'completed', 'cancelled'];
const ORDER_ID = /^TN-[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/;
const PAGE_SIZE = 25;

function doPost(event) {
  try {
    const raw = event && event.postData && event.postData.contents;
    if (!raw || raw.length > 20000) return json({ ok: false, code: 'invalid' });
    const request = JSON.parse(raw);
    const properties = PropertiesService.getScriptProperties();
    const secret = properties.getProperty('WEBHOOK_SECRET');
    if (!request || !secret || secret.length < 32 || !sameSecret(request.secret, secret)) {
      return json({ ok: false, code: 'unauthorized' });
    }
    const sheetId = properties.getProperty('SPREADSHEET_ID');
    if (!sheetId) return json({ ok: false, code: 'unconfigured' });
    if (!['create', 'list', 'status'].includes(request.action)) return json({ ok: false, code: 'invalid' });

    const lock = LockService.getScriptLock();
    if (!lock.tryLock(3000)) return json({ ok: false, code: 'busy' });
    try {
      const spreadsheet = SpreadsheetApp.openById(sheetId);
      const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(HEADERS);
        sheet.setFrozenRows(1);
      } else if (sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0].join('\n') !== HEADERS.join('\n')) {
        return json({ ok: false, code: 'schema' });
      }
      if (request.action === 'list') return list(sheet, request.before);
      if (request.action === 'status') return changeStatus(sheet, request);
      return createOrder(sheet, request);
    } finally {
      try { SpreadsheetApp.flush(); } finally { lock.releaseLock(); }
    }
  } catch {
    return json({ ok: false, code: 'storage' });
  }
}

function sameSecret(value, secret) {
  if (typeof value !== 'string' || value.length !== secret.length) return false;
  let difference = 0;
  for (let i = 0; i < secret.length; i++) difference |= value.charCodeAt(i) ^ secret.charCodeAt(i);
  return difference === 0;
}

function findRow(sheet, orderId) {
  const count = sheet.getLastRow() - 1;
  return count > 0
    ? sheet.getRange(2, 1, count, 1).createTextFinder(orderId).matchEntireCell(true).findNext()
    : null;
}

function createOrder(sheet, request) {
  const order = request.order;
  if (!order || !ORDER_ID.test(order.orderId) || !/^[a-f0-9]{64}$/.test(request.fingerprint) ||
    !Number.isSafeInteger(order.total) || order.total <= 0 || !Array.isArray(order.items)) {
    return json({ ok: false, code: 'invalid' });
  }
  const existing = findRow(sheet, order.orderId);
  if (existing) {
    const row = sheet.getRange(existing.getRow(), 1, 1, HEADERS.length).getValues()[0];
    if (row[1] !== request.fingerprint) return json({ ok: false, code: 'conflict' });
    return json({ ok: true, created: false, orderId: row[0], total: row[6] });
  }
  // Store customer input as literal text to keep formulas and automatic number conversion out.
  sheet.appendRow([
    order.orderId, request.fingerprint, order.createdAt, 'new',
    "'" + order.customerName, "'" + order.phone, order.total, JSON.stringify(order),
  ]);
  return json({ ok: true, created: true, orderId: order.orderId, total: order.total });
}

function list(sheet, before) {
  const last = sheet.getLastRow();
  const end = Number.isSafeInteger(before) && before >= 3 ? Math.min(last, before - 1) : last;
  if (end < 2) return json({ ok: true, orders: [], nextBefore: null });
  const start = Math.max(2, end - PAGE_SIZE + 1);
  const rows = sheet.getRange(start, 1, end - start + 1, HEADERS.length).getValues().reverse();
  return json({
    ok: true,
    orders: rows.map((row) => ({ ...JSON.parse(row[7]), status: row[3] })),
    nextBefore: start > 2 ? start : null,
  });
}

function changeStatus(sheet, request) {
  if (!ORDER_ID.test(request.orderId) || !STATUSES.includes(request.status) || !STATUSES.includes(request.previousStatus)) {
    return json({ ok: false, code: 'invalid' });
  }
  const match = findRow(sheet, request.orderId);
  if (!match) return json({ ok: false, code: 'not_found' });
  const cell = sheet.getRange(match.getRow(), 4);
  const current = cell.getValue();
  if (current === request.status) return json({ ok: true });
  if (current !== request.previousStatus) return json({ ok: false, code: 'conflict' });
  cell.setValue(request.status);
  return json({ ok: true });
}

function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
