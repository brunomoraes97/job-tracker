import { cx } from '@/lib/cx';
import type { DorkPart } from '@/types';
import styles from './DorkQuery.module.css';

export interface DorkQueryProps {
  /** Partes já compiladas do dork (cada uma é colorida pelo seu tipo). */
  parts: DorkPart[];
  size?: 'sm' | 'md';
  /** Trunca em uma linha (listas). */
  truncate?: boolean;
  /** Placeholder quando não há partes. */
  emptyText?: string;
}

export function DorkQuery({ parts, size = 'md', truncate, emptyText = 'Preencha os campos para gerar a busca.' }: DorkQueryProps) {
  return (
    <code className={cx(styles.query, styles[size], truncate && styles.truncate)}>
      {parts.length === 0 && <span className={styles.empty}>{emptyText}</span>}
      {parts.map((p, i) => (
        <span key={p.kind}>
          <span className={styles[p.kind]}>{p.text}</span>
          {i < parts.length - 1 ? ' ' : ''}
        </span>
      ))}
    </code>
  );
}
