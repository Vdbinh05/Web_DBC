import type { ComponentPropsWithRef } from 'react';
import { LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

const variants = {
  primary: 'bg-sam-action text-sam-on-action enabled:hover:bg-sam-action-hover enabled:active:bg-sam-action-active',
  secondary: 'border-sam-control-line bg-sam-surface text-sam-action enabled:hover:bg-sam-paper enabled:active:bg-sam-disabled',
  ghost: 'text-sam-action enabled:hover:bg-sam-paper enabled:active:bg-sam-disabled',
};

const sizes = {
  sm: 'min-h-(--spacing-sam-touch) px-3 py-2',
  md: 'min-h-12 px-4 py-2.5',
  lg: 'min-h-13 px-5 py-3',
};

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  loading?: boolean;
  loadingText?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  loadingText = 'Đang xử lý…',
  disabled,
  type = 'button',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        'sam-focus inline-flex min-w-(--spacing-sam-touch) cursor-pointer items-center justify-center gap-2 rounded-(--radius-sam-sm) border border-transparent text-center text-(length:--text-sam-label)/(--text-sam-label--line-height) font-semibold',
        'motion-safe:transition-transform motion-safe:duration-(--sam-duration-feedback) motion-safe:ease-sam-out motion-safe:enabled:active:translate-y-px',
        variants[variant],
        sizes[size],
        'disabled:cursor-not-allowed disabled:border-transparent disabled:bg-sam-disabled disabled:text-sam-on-disabled',
        className,
      )}
    >
      {loading ? (
        <>
          <LoaderCircle className="size-4 shrink-0 motion-safe:animate-spin" aria-hidden="true" />
          {loadingText}
        </>
      ) : children}
    </button>
  );
}
