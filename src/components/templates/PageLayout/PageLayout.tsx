import type { ReactNode } from 'react';
import styles from './PageLayout.module.css';

export interface PageLayoutProps {
  /** Cabeçalho da página (normalmente `<PageHeader />`). */
  header: ReactNode;
  children: ReactNode;
  density?: 'comfortable' | 'compact';
}

export function PageLayout({ header, children, density = 'comfortable' }: PageLayoutProps) {
  return (
    <div className={`${styles.page} ${styles[density]}`}>
      {header}
      {children}
    </div>
  );
}
