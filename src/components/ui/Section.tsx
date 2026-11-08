import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';

interface SectionProps extends ComponentPropsWithoutRef<'section'> {
  containerClassName?: string;
}

export default function Section({
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      tabIndex={props.id ? -1 : undefined}
      {...props}
      className={cn(
        'sam-anchor relative w-full border-b border-sam-line py-(--spacing-sam-section) md:py-(--spacing-sam-section-wide)',
        className
      )}
    >
      <div className={cn('sam-container relative z-(--sam-z-content) min-w-0', containerClassName)}>
        {children}
      </div>
    </section>
  );
}
