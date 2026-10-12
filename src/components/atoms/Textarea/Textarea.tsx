import type { ChangeEvent, TextareaHTMLAttributes } from 'react';
import { cx } from '@/lib/cx';
import styles from './Textarea.module.css';

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value'> {
  value: string;
  onChange?: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void;
  invalid?: boolean;
}

export function Textarea({ value, onChange, invalid, rows = 3, className, ...rest }: TextareaProps) {
  return (
    <textarea
      {...rest}
      rows={rows}
      value={value}
      aria-invalid={invalid || undefined}
      onChange={(e) => onChange?.(e.target.value, e)}
      className={cx(styles.textarea, invalid && styles.invalid, className)}
    />
  );
}
