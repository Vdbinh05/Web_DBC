import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';

const tones = {
  neutral: 'bg-sam-paper text-sam-ink',
  brand: 'bg-sam-yellow text-sam-action',
  success: 'bg-sam-success-bg text-sam-success',
  warning: 'bg-sam-warning-bg text-sam-warning',
  error: 'bg-sam-error-bg text-sam-error',
  info: 'bg-sam-info-bg text-sam-info',
};

interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
  tone?: keyof typeof tones;
}

export default function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span
      {...props}
      className={cn('inline-flex max-w-full items-center gap-2 rounded-(--radius-sam-sm) px-2 py-1 text-(length:--text-sam-label)/(--text-sam-label--line-height) font-semibold wrap-break-word', tones[tone], className)}
    />
  );
}
