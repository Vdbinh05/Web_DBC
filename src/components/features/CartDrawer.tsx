'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Minus, Plus, QrCode, ShoppingBag, Trash2, Truck } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Dialog from '@/components/ui/Dialog';
import { Input, Textarea } from '@/components/ui/Field';
import MediaImage from '@/components/ui/MediaImage';
import { useCartStore } from '@/store/useCartStore';
import { trackCommerce } from '@/lib/commerce-analytics';
import { formatCurrency } from '@/lib/format';

const PHONE_REGEX = /^(0|\+84)\d{9}$/;
const BANK_ID = process.env.NEXT_PUBLIC_BANK_ID;
const BANK_ACCOUNT = process.env.NEXT_PUBLIC_BANK_ACCOUNT;
const ORDER_FORM_ID = 'order-form';
const RETRY_MESSAGE = 'Chưa thể xác nhận đơn hàng. Vui lòng thử lại.';

type PaymentMethod = 'cod' | 'banking';
type DeliveryErrors = Partial<Record<'fullName' | 'phone' | 'address', string>>;
type OrderConfirmation = { orderId: string; total: number; message: string; paymentMethod: PaymentMethod; phone: string };

export default function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const totalCount = useCartStore((state) => state.getTotalCount());

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [errors, setErrors] = useState<DeliveryErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState<OrderConfirmation | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const pending = useRef(false);
  const lastAttempt = useRef<{ payload: string; id: string } | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const emptyRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDListElement>(null);

  useEffect(() => {
    if (!isOpen || !orderConfirmation) return;
    const frame = requestAnimationFrame(() => successRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [isOpen, orderConfirmation]);

  const trimmedPhone = phone.trim();
  const validPhone = PHONE_REGEX.test(trimmedPhone);
  const qrConfigured = Boolean(BANK_ID && BANK_ACCOUNT);
  const qrUrl = qrConfigured && orderConfirmation?.paymentMethod === 'banking'
    ? `https://img.vietqr.io/image/${BANK_ID}-${BANK_ACCOUNT}-compact2.png?amount=${orderConfirmation.total}&addInfo=${encodeURIComponent('DBC ' + orderConfirmation.phone)}`
    : null;

  function validateForm() {
    const nextErrors: DeliveryErrors = {};
    if (!fullName.trim()) nextErrors.fullName = 'Nhập họ và tên người nhận.';
    if (!trimmedPhone) nextErrors.phone = 'Nhập số điện thoại nhận hàng.';
    else if (!validPhone) nextErrors.phone = 'Nhập số dạng 0912345678 hoặc +84912345678.';
    if (!address.trim()) nextErrors.address = 'Nhập địa chỉ giao hàng chi tiết.';
    setErrors(nextErrors);

    const firstInvalid = nextErrors.fullName ? nameRef : nextErrors.phone ? phoneRef : nextErrors.address ? addressRef : null;
    if (firstInvalid) requestAnimationFrame(() => firstInvalid.current?.focus());
    return !firstInvalid;
  }

  async function handleSubmitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current || items.length === 0 || !validateForm()) return;

    const submittedItems = items.map(({ product, quantity }) => ({ productId: product.id, quantity }))
      .sort((a, b) => a.productId.localeCompare(b.productId));
    const purchaseItems = items.map(({ product, quantity }) => ({
      item_id: product.id, item_name: product.name, price: product.price, quantity,
    }));
    const orderDetails = {
      customerName: fullName.trim(),
      phone: trimmedPhone,
      address: address.trim(),
      note: note.trim() || undefined,
      paymentMethod,
      items: submittedItems,
    };
    pending.current = true;
    setIsSubmitting(true);
    setErrorMessage('');
    summaryRef.current?.focus({ preventScroll: true });

    try {
      const payload = JSON.stringify(orderDetails);
      if (lastAttempt.current?.payload !== payload) {
        lastAttempt.current = { payload, id: crypto.randomUUID() };
      }
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...orderDetails, requestId: lastAttempt.current.id }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || data?.success !== true) {
        setErrorMessage(typeof data?.message === 'string' && data.message.trim() ? data.message : RETRY_MESSAGE);
        return;
      }

      setOrderConfirmation({
        orderId: data.orderId,
        total: data.total ?? totalPrice,
        message: data.message,
        paymentMethod,
        phone: trimmedPhone,
      });
      lastAttempt.current = null;
      const latestCart = useCartStore.getState();
      for (const { productId, quantity } of submittedItems) {
        const latestItem = latestCart.items.find(({ product }) => product.id === productId);
        if (latestItem) latestCart.updateQuantity(productId, latestItem.quantity - quantity);
      }
      trackCommerce('purchase', { transaction_id: data.orderId, value: data.total ?? totalPrice, items: purchaseItems });
    } catch {
      setErrorMessage(RETRY_MESSAGE);
    } finally {
      pending.current = false;
      setIsSubmitting(false);
    }
  }

  function finishOrder() {
    setOrderConfirmation(null);
    setFullName('');
    setPhone('');
    setAddress('');
    setNote('');
    closeCart();
  }

  function changeQuantity(productId: string, quantity: number) {
    if (quantity > 0) {
      updateQuantity(productId, quantity);
      return;
    }
    removeItem(productId);
    requestAnimationFrame(() => {
      const target = emptyRef.current ?? document.querySelector<HTMLHeadingElement>('#order-items-title');
      target?.focus();
    });
  }

  const showCheckout = isOpen && !orderConfirmation && items.length > 0;
  const footer = showCheckout ? (
    <div className="space-y-2">
      <dl ref={summaryRef} tabIndex={-1} aria-label="Tóm tắt đơn hàng" className="sam-focus grid gap-1 text-sam-label tabular-nums">
        <div className="flex flex-wrap justify-between gap-x-3 text-sam-muted">
          <dt>Tạm tính ({totalCount} món)</dt><dd>{formatCurrency(totalPrice)}</dd>
        </div>
        <div className="flex flex-wrap justify-between gap-x-3 text-sam-muted">
          <dt>Vận chuyển toàn quốc</dt><dd>Miễn phí (0đ)</dd>
        </div>
        <div className="flex flex-wrap justify-between gap-x-3 border-t border-sam-line pt-2 text-sam-action">
          <dt className="font-semibold">Tổng thanh toán</dt><dd className="font-semibold">{formatCurrency(totalPrice)}</dd>
        </div>
      </dl>
      <p role="alert" className={errorMessage ? 'wrap-anywhere text-sam-label font-medium text-sam-error' : 'sr-only'}>
        {errorMessage}
      </p>
      <p role="status" className="sr-only">{isSubmitting ? 'Đang gửi đơn hàng…' : ''}</p>
      <Button type="submit" form={ORDER_FORM_ID} loading={isSubmitting} loadingText="Đang gửi đơn hàng…" className="w-full">
        {errorMessage ? 'Thử gửi lại đơn hàng' : 'Xác nhận đặt hàng'}
        <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
      </Button>
    </div>
  ) : null;

  return (
    <Dialog
      open={isOpen}
      onClose={closeCart}
      title="Giỏ hàng của bạn"
      description={isOpen ? (orderConfirmation ? 'Hoàn tất đặt hàng' : `${totalCount} sản phẩm trong giỏ`) : undefined}
      closeLabel="Đóng giỏ hàng"
      variant="drawer"
      footer={footer}
    >
      {isOpen && (orderConfirmation ? (
        <div className="space-y-4 py-4">
          <CheckCircle2 className="size-8 text-sam-success" aria-hidden="true" />
          <h3 ref={successRef} tabIndex={-1} className="sam-focus font-heading text-sam-heading font-semibold">Đơn hàng đã được ghi nhận</h3>
          <p className="wrap-anywhere text-sam-body text-sam-ink">{orderConfirmation.message}</p>
          <Card className="p-4">
            <dl className="grid gap-2 text-sam-label tabular-nums">
              <div><dt className="text-sam-muted">Mã đơn</dt><dd className="wrap-anywhere font-semibold">#{orderConfirmation.orderId}</dd></div>
              <div><dt className="text-sam-muted">Tổng thanh toán</dt><dd className="font-semibold">{formatCurrency(orderConfirmation.total)}</dd></div>
              <div><dt className="text-sam-muted">Phương thức</dt><dd>{orderConfirmation.paymentMethod === 'banking' ? 'Chuyển khoản VietQR' : 'COD (Thanh toán khi nhận)'}</dd></div>
              <div><dt className="text-sam-muted">Vận chuyển</dt><dd>Giao hàng miễn phí toàn quốc</dd></div>
            </dl>
          </Card>
          {qrUrl && (
            <Card className="space-y-2 p-4" data-clarity-mask="True">
              <h3 className="font-sans text-sam-label font-semibold">Mã VietQR thanh toán</h3>
              <div className="relative aspect-square w-48 max-w-full rounded-sam-sm bg-sam-paper">
                {/* VietQR can redirect a PNG URL to an SVG image. */}
                <MediaImage src={qrUrl} alt="Mã VietQR thanh toán Trà Sâm Trường Nhân" sizes="192px" unoptimized referrerPolicy="no-referrer" className="object-contain" />
              </div>
              <dl className="space-y-1 text-sam-label">
                <div><dt className="inline text-sam-muted">Ngân hàng · </dt><dd className="inline font-semibold">{BANK_ID}</dd></div>
                <div><dt className="inline text-sam-muted">Số tài khoản · </dt><dd className="inline font-semibold tabular-nums">{BANK_ACCOUNT}</dd></div>
                <div><dt className="inline text-sam-muted">Nội dung · </dt><dd className="inline font-semibold tabular-nums">DBC {orderConfirmation.phone}</dd></div>
              </dl>
              <p className="text-sam-label text-sam-muted">Quét mã bằng ứng dụng ngân hàng. Đơn chuyển khoản sẽ được đối soát trước khi giao.</p>
            </Card>
          )}
          <Button onClick={finishOrder}>Tiếp tục xem trà</Button>
        </div>
      ) : !showCheckout ? (
        <div className="space-y-3 py-4">
          <ShoppingBag className="size-8 text-sam-action" aria-hidden="true" />
          <h3 ref={emptyRef} tabIndex={-1} className="sam-focus font-heading text-sam-subheading font-semibold">Giỏ hàng đang trống</h3>
          <p className="text-sam-body text-sam-muted">Chọn một combo trà sâm để bắt đầu.</p>
          <Link href="/#combos" onNavigate={closeCart} className="sam-focus inline-flex min-h-(--spacing-sam-touch) items-center gap-2 rounded-sam-sm text-sam-label font-semibold text-sam-action underline underline-offset-4 hover:text-sam-action-hover active:text-sam-action-active">
            Xem các combo <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <section aria-labelledby="order-items-title">
            <h3 id="order-items-title" tabIndex={-1} className="sam-focus mb-3 font-heading text-sam-subheading font-semibold">Sản phẩm trong giỏ</h3>
            <ul className="divide-y divide-sam-line border-y border-sam-line">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex items-start gap-3 py-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-sam-sm bg-sam-paper">
                    <MediaImage src={product.image} alt="" sizes="56px" className="object-contain" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-sans text-sam-label font-semibold">{product.name}</h4>
                    <p className="text-sam-label text-sam-muted tabular-nums">{formatCurrency(product.price)}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <Button size="sm" variant="secondary" className="px-2" disabled={isSubmitting} onClick={() => changeQuantity(product.id, quantity - 1)} aria-label={`Giảm số lượng ${product.name}`}>
                        <Minus className="size-4" aria-hidden="true" />
                      </Button>
                      <span className="min-w-6 text-center text-sam-label tabular-nums" aria-live="polite">{quantity}</span>
                      <Button size="sm" variant="secondary" className="px-2" disabled={isSubmitting} onClick={() => updateQuantity(product.id, quantity + 1)} aria-label={`Tăng số lượng ${product.name}`}>
                        <Plus className="size-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="shrink-0 px-2" disabled={isSubmitting} onClick={() => changeQuantity(product.id, 0)} aria-label={`Xóa ${product.name} khỏi giỏ`}>
                    <Trash2 className="size-4" aria-hidden="true" />
                  </Button>
                </li>
              ))}
            </ul>
          </section>

          <form id={ORDER_FORM_ID} onSubmit={handleSubmitOrder} noValidate>
            <fieldset disabled={isSubmitting} className="space-y-4">
              <legend className="mb-3 font-heading text-sam-subheading font-semibold text-sam-action">Thông tin nhận hàng</legend>
              <Input ref={nameRef} label="Họ và tên người nhận" name="name" autoComplete="name" value={fullName} required maxLength={120} error={errors.fullName} onChange={(e) => { setFullName(e.target.value); setErrors((current) => ({ ...current, fullName: undefined })); }} />
              <Input ref={phoneRef} label="Số điện thoại" type="tel" name="tel" inputMode="tel" autoComplete="tel" value={phone} required error={errors.phone} onChange={(e) => { setPhone(e.target.value); setErrors((current) => ({ ...current, phone: undefined })); }} />
              <Input ref={addressRef} label="Địa chỉ giao hàng chi tiết" name="street-address" autoComplete="street-address" value={address} required maxLength={500} error={errors.address} onChange={(e) => { setAddress(e.target.value); setErrors((current) => ({ ...current, address: undefined })); }} />
              <Textarea label="Ghi chú đơn hàng (không bắt buộc)" name="note" autoComplete="off" rows={2} maxLength={500} value={note} onChange={(e) => setNote(e.target.value)} />

              <div role="group" aria-labelledby="order-payment-label">
                <p id="order-payment-label" className="mb-2 text-sam-label font-semibold">Phương thức thanh toán</p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant={paymentMethod === 'cod' ? 'primary' : 'secondary'} aria-pressed={paymentMethod === 'cod'} onClick={() => setPaymentMethod('cod')}>
                    <Truck className="size-4 shrink-0" aria-hidden="true" /> COD (Nhận hàng)
                  </Button>
                  <Button size="sm" variant={paymentMethod === 'banking' ? 'primary' : 'secondary'} disabled={!qrConfigured} aria-pressed={paymentMethod === 'banking'} onClick={() => setPaymentMethod('banking')}>
                    <QrCode className="size-4 shrink-0" aria-hidden="true" /> Chuyển khoản QR
                  </Button>
                </div>
              </div>

              <p className="text-sam-label text-sam-muted">
                {!qrConfigured ? 'Hiện có thể thanh toán khi nhận hàng (COD).' : paymentMethod === 'banking' ? 'Mã VietQR xuất hiện sau khi đơn được ghi nhận.' : ''}
              </p>
              <p className="text-sam-label text-sam-muted">Thông tin liên hệ và địa chỉ được dùng để xác nhận và giao đơn hàng.</p>
            </fieldset>
          </form>
        </div>
      ))}
    </Dialog>
  );
}
