'use client';

import { useEffect, useId, useRef, type KeyboardEvent, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { pauseLenis, resumeLenis } from '@/components/layout/SmoothScroll';
import { cn } from '@/lib/cn';
import Button from './Button';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  closeLabel?: string;
  variant?: 'modal' | 'drawer';
  className?: string;
  footer?: ReactNode;
  children: ReactNode;
}

function wrapTabFocus(event: KeyboardEvent<HTMLDialogElement>) {
  if (event.key !== 'Tab' || event.defaultPrevented) return;

  const stops = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
    'a[href], button, input, select, textarea, summary, iframe, [tabindex], [contenteditable="true"]',
  )).filter((element) => (
    (element.tabIndex >= 0 || (element.isContentEditable && !element.hasAttribute('tabindex'))) &&
    !element.matches(':disabled') &&
    !element.closest('[inert]') &&
    element.getClientRects().length > 0 &&
    getComputedStyle(element).visibility === 'visible'
  ));
  const first = stops[0];
  const last = stops.at(-1);
  const boundary = event.shiftKey ? first : last;
  if (document.activeElement !== boundary) return;

  event.preventDefault();
  (event.shiftKey ? last : first)?.focus();
}

export default function Dialog({
  open,
  onClose,
  title,
  description,
  closeLabel = 'Đóng',
  variant = 'modal',
  className,
  footer,
  children,
}: DialogProps) {
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;

    const previousFocus = document.activeElement;
    dialog.showModal();
    pauseLenis();

    return () => {
      dialog.close();
      if (!document.querySelector('.sam-dialog[open]')) resumeLenis();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected && document.activeElement === document.body) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      data-lenis-prevent
      data-clarity-mask="True"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      aria-describedby={description ? `${id}-description` : undefined}
      onKeyDown={wrapTabFocus}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={cn(
        'sam-dialog fixed overflow-hidden bg-sam-canvas text-sam-ink shadow-sam-overlay z-(--sam-z-overlay)',
        variant === 'drawer'
          ? 'inset-y-0 start-auto end-0 m-0 h-dvh max-h-dvh w-full max-w-md [--sam-dialog-enter-x:1rem] [--sam-dialog-enter-y:0px]'
          : 'inset-0 m-auto w-[calc(100%_-_2rem)] max-w-2xl max-h-[calc(100dvh_-_2rem)] rounded-(--radius-sam-lg)',
        className,
      )}
    >
      <div className={cn('flex min-h-0 flex-col', variant === 'drawer' ? 'h-full' : 'max-h-[calc(100dvh_-_2rem)]')}>
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-sam-line px-4 py-3 sm:px-6">
          <div className="min-w-0 self-center">
            <h2 id={`${id}-title`} className="font-heading text-(length:--text-sam-subheading)/(--text-sam-subheading--line-height) font-semibold wrap-break-word">
              {title}
            </h2>
            {description && <p id={`${id}-description`} className="mt-1 text-(length:--text-sam-label)/(--text-sam-label--line-height) text-sam-muted">{description}</p>}
          </div>
          <Button type="button" variant="ghost" size="sm" className="shrink-0 px-2" aria-label={closeLabel} onClick={onClose}>
            <X className="size-5" aria-hidden="true" />
          </Button>
        </div>
        <div
          data-lenis-prevent
          tabIndex={0}
          role="region"
          aria-label="Nội dung"
          className="sam-focus min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 focus-visible:-outline-offset-2 sm:px-6"
        >
          {children}
        </div>
        {footer && <div className="shrink-0 border-t border-sam-line bg-sam-surface px-4 py-3 sm:px-6">{footer}</div>}
      </div>
    </dialog>
  );
}
