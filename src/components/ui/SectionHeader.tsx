import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionHeaderProps {
  title: ReactNode;
  titleId?: string;
  subtitle?: ReactNode;
  align?: 'start' | 'center';
  className?: string;
  children?: ReactNode;
}

export default function SectionHeader({
  title,
  titleId,
  subtitle,
  align = 'center',
  className,
  children,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-7 min-w-0 max-w-3xl md:mb-9', align === 'center' && 'mx-auto text-center', className)}>
      <h2 id={titleId} className="font-heading text-sam-heading font-semibold tracking-tight text-balance wrap-break-word text-sam-action">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-sam-body wrap-break-word text-sam-muted">
          {subtitle}
        </p>
      )}

      {children && <div className={cn('mt-5 flex flex-col', align === 'center' && 'items-center')}>{children}</div>}
    </div>
  );
}
