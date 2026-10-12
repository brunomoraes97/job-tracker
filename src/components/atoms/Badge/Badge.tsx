import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import type { Tone } from '@/types';
import styles from './Badge.module.css';

export interface BadgeProps {
  children: ReactNode;
  /** `dark` = selo "NOVA"; demais tons = rótulos suaves. */
  tone?: Tone;
  /** Usa fonte mono (contagens, valores). */
  mono?: boolean;
  shape?: 'rounded' | 'pill';
}

export function Badge({ children, tone = 'neutral', mono, shape = 'rounded' }: BadgeProps) {
  return <span className={cx(styles.badge, styles[tone], mono && styles.mono, styles[shape])}>{children}</span>;
}
