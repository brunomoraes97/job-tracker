import type { ChangeEvent, InputHTMLAttributes } from 'react';
import { cx } from '@/lib/cx';
import { Icon, type IconName } from '../Icon';
import styles from './Input.module.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'size'> {
  /** Valor controlado. */
  value: string;
  /** Emitido a cada alteração com o novo valor. */
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  /** Ícone à esquerda, dentro do campo. */
  icon?: IconName;
  invalid?: boolean;
  mono?: boolean;
  tone?: 'light' | 'dark';
}

export function Input({ value, onChange, icon, invalid, mono, tone = 'light', className, type = 'text', ...rest }: InputProps) {
  return (
    <span className={cx(styles.wrap, styles[tone], invalid && styles.invalid, className)}>
      {icon && <Icon name={icon} size={16} className={styles.icon} />}
      <input
        {...rest}
        type={type}
        value={value}
        aria-invalid={invalid || undefined}
        onChange={(e) => onChange?.(e.target.value, e)}
        className={cx(styles.input, mono && styles.mono)}
      />
    </span>
  );
}
