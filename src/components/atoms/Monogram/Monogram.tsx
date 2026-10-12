import { cx } from '@/lib/cx';
import type { TintName } from '@/types';
import styles from './Monogram.module.css';

export interface MonogramProps {
  /** 1–3 letras que representam a empresa. */
  letters: string;
  tint?: TintName;
  size?: 'sm' | 'md' | 'lg';
}

export function Monogram({ letters, tint = 'stone', size = 'md' }: MonogramProps) {
  return (
    <span className={cx(styles.mono, styles[tint], styles[size])} aria-hidden="true">
      {letters}
    </span>
  );
}
