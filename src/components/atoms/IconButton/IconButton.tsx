import type { MouseEvent } from 'react';
import { cx } from '@/lib/cx';
import { Icon, type IconName } from '../Icon';
import styles from './IconButton.module.css';

export interface IconButtonProps {
  icon: IconName;
  /** Rótulo acessível obrigatório (não há texto visível). */
  label: string;
  size?: 'sm' | 'md';
  variant?: 'outline' | 'ghost' | 'primary';
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function IconButton({ icon, label, size = 'md', variant = 'outline', disabled, onClick }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cx(styles.button, styles[size], styles[variant])}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon name={icon} size={size === 'sm' ? 14 : 16} />
    </button>
  );
}
