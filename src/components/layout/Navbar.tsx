'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Menu, ShoppingBag, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import brandMark from '@/components/ui/media/truong-nhan-mark.webp';
import { useCartStore } from '@/store/useCartStore';
import { useHydrated } from '@/lib/useHydrated';

const NAV_LINKS = [
  { href: '/#story', label: 'Câu chuyện sâm' },
  { href: '/#mascots', label: '3 mascot' },
  { href: '/#usp', label: 'Hồ sơ sản phẩm' },
  { href: '/#reviews', label: 'Giới thiệu' },
  { href: '/#combos', label: 'Combo' },
  { href: '/blog/vi-sao-gen-z-chon-tra-sam-ngoc-linh', label: 'Cẩm nang thưởng trà' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const isMounted = useHydrated();
  const openCart = useCartStore((state) => state.openCart);
  const totalCount = useCartStore((state) => state.getTotalCount());
  const count = isMounted ? totalCount : 0;

  function navigate(href: string) {
    setMenuOpen(false);
    if (window.location.pathname === '/' && href.startsWith('/#')) {
      requestAnimationFrame(() => document.getElementById(href.slice(2))?.focus({ preventScroll: true }));
    }
  }

  return (
    <header
      className="sticky top-0 z-(--sam-z-floating) border-b-(length:--sam-navbar-border) border-sam-line bg-sam-canvas"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && menuOpen) {
          setMenuOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <div className="sam-container flex min-h-(--spacing-sam-navbar) items-center justify-between gap-2 py-2 sm:gap-4">
        <Link
          href="/"
          className="sam-focus flex min-h-(--spacing-sam-touch) min-w-0 items-center gap-2 rounded-sam-sm text-sam-action hover:text-sam-action-hover active:text-sam-action-active sm:gap-3"
          aria-label="Trang chủ Trà Sâm Trường Nhân"
          translate="no"
        >
          <Image src={brandMark} alt="" width={36} height={36} sizes="36px" className="size-9 shrink-0" />
          <span className="min-w-0">
            <span className="block font-heading text-xl leading-tight font-semibold">Trường Nhân</span>
            <span className="block text-xs leading-normal font-medium text-sam-muted">Trà Sâm Ngọc Linh</span>
          </span>
        </Link>

        <nav aria-label="Điều hướng chính" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onNavigate={() => navigate(link.href)}
              className="sam-focus inline-flex min-h-(--spacing-sam-touch) items-center rounded-sam-sm px-2 text-sam-label font-semibold whitespace-nowrap text-sam-ink hover:bg-sam-paper hover:text-sam-action active:bg-sam-disabled xl:px-3"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="px-2 sm:px-3"
            onClick={() => {
              setMenuOpen(false);
              openCart();
            }}
            aria-label={`Giỏ hàng có ${count} sản phẩm`}
          >
            <ShoppingBag className="size-5 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">Giỏ hàng</span>
            {count > 0 && (
              <span aria-hidden="true" className="rounded-sam-sm bg-sam-paper px-1.5 text-xs font-semibold tabular-nums">
                {count > 99 ? '99+' : count}
              </span>
            )}
          </Button>
          <Button
            ref={menuButton}
            size="sm"
            variant="ghost"
            className="px-2 lg:hidden"
            aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </Button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Điều hướng chính"
        hidden={!menuOpen}
        className="border-t border-sam-line lg:hidden"
      >
        <div className="sam-container max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain py-2" data-lenis-prevent>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onNavigate={() => navigate(link.href)}
              className="sam-focus flex min-h-(--spacing-sam-touch) items-center justify-between gap-3 rounded-sam-sm px-3 py-2 text-sam-label font-semibold text-sam-ink hover:bg-sam-paper active:bg-sam-disabled"
            >
              {link.label}
              <ArrowRight className="size-4 text-sam-action" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
