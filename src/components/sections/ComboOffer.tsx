'use client';

import { useEffect, useState } from 'react';
import { Clock, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { useCartStore } from '@/store/useCartStore';
import { formatCurrency } from '@/lib/format';
import { trackCommerce } from '@/lib/commerce-analytics';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import MediaImage from '@/components/ui/MediaImage';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

const OFFER_END = Date.parse(process.env.NEXT_PUBLIC_OFFER_ENDS_AT ?? '');

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState('');
  useEffect(() => {
    if (!Number.isFinite(OFFER_END)) return;
    function updateCountdown() {
      const diff = OFFER_END - Date.now();
      if (diff <= 0) { setTimeLeft(''); return false; }
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft([hours, minutes, seconds].map((unit) => String(unit).padStart(2, '0')).join(':'));
      return true;
    }

    if (!updateCountdown()) return;
    const interval = setInterval(() => { if (!updateCountdown()) clearInterval(interval); }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return null;
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sam-label text-sam-ink">
      <Clock className="size-4 shrink-0 text-sam-action" aria-hidden="true" />
      <span>Thời gian còn lại của ưu đãi</span>
      <span role="timer" className="rounded-sam-sm bg-sam-paper px-2 py-1 font-semibold tabular-nums text-sam-action">
        {timeLeft}
      </span>
    </p>
  );
}

export default function ComboOffer() {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <Section id="combos" aria-labelledby="combo-title">
      <SectionHeader
        titleId="combo-title"
        title="Bộ sưu tập combo trà sâm đặc quyền"
        subtitle="Tiết kiệm tới 21% cùng quà tặng phụ kiện thưởng trà cao cấp. Tất cả sản phẩm đều đạt chuẩn OCOP 4 sao và áp dụng miễn phí vận chuyển toàn quốc."
        align="start"
      >
        <CountdownTimer />
      </SectionHeader>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product) => (
          <Card
            as="article"
            key={product.id}
            aria-labelledby={product.id}
            className="flex flex-col gap-4 md:row-span-6 md:grid md:grid-rows-subgrid"
          >
            <div className="relative aspect-[5/4] overflow-hidden rounded-sam-md bg-sam-paper">
              <MediaImage
                src={product.image}
                alt={`Minh họa ${product.name}`}
                sizes="(max-width: 767px) calc(100vw - 4rem), (max-width: 1023px) 44vw, 360px"
                className="object-contain p-2"
              />
            </div>
            <div>
              <div className="mb-2 flex flex-wrap gap-2">
                <Badge>Giảm {product.discountPercent}%</Badge>
                {product.isBestSeller && <Badge tone="brand">Được chọn nhiều nhất</Badge>}
              </div>
              <h3 id={product.id} className="font-heading text-sam-subheading font-semibold text-sam-action">{product.name}</h3>
              <p className="mt-1 text-sam-label text-sam-muted">{product.subtitle}</p>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 tabular-nums">
              <span className="text-sam-subheading font-semibold text-sam-action">{formatCurrency(product.price)}</span>
              <del className="text-sam-label text-sam-muted"><span className="sr-only">Giá gốc </span>{formatCurrency(product.originalPrice)}</del>
            </div>
            <div className="space-y-2 border-t border-sam-line pt-3">
              <p className="text-sam-label font-semibold text-sam-action">Hộp quà bao gồm</p>
              <ul className="list-disc space-y-1 ps-5 text-sam-label text-sam-ink marker:text-sam-action">
                {product.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="space-y-2 border-t border-sam-line pt-3">
              <p className="text-sam-label font-semibold text-sam-action">Công dụng hỗ trợ</p>
              <ul className="list-disc space-y-1 ps-5 text-sam-label text-sam-ink marker:text-sam-action">
                {product.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
              </ul>
            </div>
            <div className="mt-auto pt-1">
              <Button
                className="w-full"
                onClick={() => {
                  addItem(product);
                  trackCommerce('add_to_cart', {
                    value: product.price,
                    items: [{ item_id: product.id, item_name: product.name, price: product.price, quantity: 1 }],
                  });
                }}
                aria-label={`Thêm ${product.name} vào giỏ hàng`}
              >
                <ShoppingBag className="size-4 shrink-0" aria-hidden="true" /> Thêm vào giỏ hàng
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
