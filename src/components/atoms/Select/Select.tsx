import type { ChangeEvent, SelectHTMLAttributes } from 'react';
import { cx } from '@/lib/cx';
import type { SelectOption } from '@/types';
import styles from './Select.module.css';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'value'> {
  value: string;
  options: SelectOption[];
  onChange?: (value: string, event: ChangeEvent<HTMLSelectElement>) => void;
}

export function Select({ value, options, onChange, className, ...rest }: SelectProps) {
  return (
    <select {...rest} value={value} onChange={(e) => onChange?.(e.target.value, e)} className={cx(styles.select, className)}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
