import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import styles from './Tag.module.css';

export type TagVariant = 'neutral' | 'hit' | 'miss' | 'outline';

export interface TagProps {
  children: ReactNode;
  /** `hit` = palavra-chave presente no CV · `miss` = pedida pela vaga e ausente no CV. */
  variant?: TagVariant;
  size?: 'sm' | 'md';
  /** Usa fonte mono (valores como salário). */
  mono?: boolean;
}

export function Tag({ children, variant = 'neutral', size = 'sm', mono }: TagProps) {
  return (
    <span className={cx(styles.tag, styles[variant], styles[size], mono && styles.mono)}>
      {variant === 'hit' && <span aria-hidden="true">✓ </span>}
      {children}
    </span>
  );
}
