import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import styles from './Heading.module.css';

export type HeadingLevel = 1 | 2 | 3 | 4;
export type HeadingVariant = 'display' | 'title' | 'heading' | 'subheading' | 'overline';

export interface HeadingProps {
  children: ReactNode;
  /** Nível semântico (h1–h4). */
  level?: HeadingLevel;
  /** Estilo visual — independente do nível semântico. */
  variant?: HeadingVariant;
  id?: string;
}

const defaultVariant: Record<HeadingLevel, HeadingVariant> = { 1: 'display', 2: 'heading', 3: 'subheading', 4: 'overline' };

export function Heading({ children, level = 2, variant, id }: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag id={id} className={cx(styles.heading, styles[variant ?? defaultVariant[level]])}>
      {children}
    </Tag>
  );
}
