import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import styles from './Text.module.css';

export type TextVariant = 'bodyLg' | 'body' | 'small' | 'caption' | 'mono' | 'metric';
export type TextColor = 'default' | 'secondary' | 'muted' | 'primary' | 'warning' | 'inverse';

export interface TextProps {
  children: ReactNode;
  variant?: TextVariant;
  color?: TextColor;
  weight?: 'regular' | 'medium' | 'semibold';
  as?: 'p' | 'span' | 'div' | 'strong';
  italic?: boolean;
}

export function Text({ children, variant = 'body', color = 'default', weight, as = 'span', italic }: TextProps) {
  const Tag = as;
  return <Tag className={cx(styles.text, styles[variant], styles[`c-${color}`], weight && styles[`w-${weight}`], italic && styles.italic)}>{children}</Tag>;
}
