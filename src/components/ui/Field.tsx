import { useId, type ComponentPropsWithRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface FieldCopy {
  label: string;
  hint?: string;
  error?: string;
}

interface FieldProps extends FieldCopy {
  id?: string;
  required?: boolean;
  describedBy?: string;
  children: (attributes: { id: string; 'aria-describedby'?: string; 'aria-invalid'?: true }) => ReactNode;
}

const controlClassName = 'sam-focus block min-h-(--spacing-sam-touch) w-full min-w-0 rounded-(--radius-sam-sm) border border-sam-control-line bg-sam-surface px-3 py-2 text-base leading-relaxed text-sam-ink placeholder:text-sam-muted [&:enabled:hover:not([aria-invalid=true])]:border-sam-action aria-invalid:border-sam-error disabled:cursor-not-allowed disabled:border-sam-line disabled:bg-sam-disabled disabled:text-sam-on-disabled';

function Field({ id, label, hint, error, required, describedBy, children }: FieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;
  const descriptions = [describedBy, hint && hintId, error && errorId].filter(Boolean).join(' ');

  return (
    <div className="min-w-0">
      <label htmlFor={fieldId} className="mb-1 block text-(length:--text-sam-label)/(--text-sam-label--line-height) font-semibold text-sam-ink">
        {label}
        {required && <span className="ms-1 text-sam-error" aria-hidden="true">*</span>}
      </label>
      {children({
        id: fieldId,
        'aria-describedby': descriptions || undefined,
        'aria-invalid': error ? true : undefined,
      })}
      {hint && <p id={hintId} className="mt-1 text-(length:--text-sam-label)/(--text-sam-label--line-height) text-sam-muted">{hint}</p>}
      <p id={errorId} aria-live="polite" className={cn('text-(length:--text-sam-label)/(--text-sam-label--line-height) font-medium text-sam-error', error && 'mt-1')}>
        {error}
      </p>
    </div>
  );
}

type InputProps = ComponentPropsWithRef<'input'> & FieldCopy;
type TextareaProps = ComponentPropsWithRef<'textarea'> & FieldCopy;
type SelectProps = ComponentPropsWithRef<'select'> & FieldCopy;

export function Input({ id, label, hint, error, required, className, 'aria-describedby': describedBy, ...props }: InputProps) {
  return (
    <Field {...{ id, label, hint, error, required, describedBy }}>
      {(attributes) => (
        <input {...props} {...attributes} aria-invalid={attributes['aria-invalid'] ?? props['aria-invalid']} required={required} className={cn(controlClassName, className)} />
      )}
    </Field>
  );
}

export function Textarea({ id, label, hint, error, required, className, 'aria-describedby': describedBy, rows = 3, ...props }: TextareaProps) {
  return (
    <Field {...{ id, label, hint, error, required, describedBy }}>
      {(attributes) => (
        <textarea {...props} {...attributes} aria-invalid={attributes['aria-invalid'] ?? props['aria-invalid']} rows={rows} required={required} className={cn(controlClassName, 'resize-y', className)} />
      )}
    </Field>
  );
}

export function Select({ id, label, hint, error, required, className, 'aria-describedby': describedBy, ...props }: SelectProps) {
  return (
    <Field {...{ id, label, hint, error, required, describedBy }}>
      {(attributes) => (
        <select {...props} {...attributes} aria-invalid={attributes['aria-invalid'] ?? props['aria-invalid']} required={required} className={cn(controlClassName, className)} />
      )}
    </Field>
  );
}
