import type { MouseEvent } from 'react';
import styles from './Breadcrumbs.module.css';

export interface Crumb {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: Crumb[];
  onNavigate?: (href: string, event: MouseEvent<HTMLAnchorElement>) => void;
}

export function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
  return (
    <nav aria-label="Trilha" className={styles.nav}>
      <ol className={styles.list}>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${c.label}-${i}`} className={styles.item}>
              {c.href && !last ? (
                <a href={c.href} onClick={(e) => onNavigate?.(c.href!, e)}>{c.label}</a>
              ) : (
                <span aria-current={last ? 'page' : undefined}>{c.label}</span>
              )}
              {!last && <span aria-hidden="true" className={styles.sep}>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
