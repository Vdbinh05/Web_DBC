import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';

interface CardProps extends ComponentPropsWithoutRef<'div'> {
  as?: 'div' | 'article';
}

export default function Card({ as: Element = 'div', className, ...props }: CardProps) {
  return (
    <Element
      {...props}
      className={cn('min-w-0 rounded-(--radius-sam-lg) border border-sam-line bg-sam-surface p-4 text-sam-ink sm:p-6', className)}
    />
  );
}
