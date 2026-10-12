import type { ReactNode } from 'react';
import styles from './SplitLayout.module.css';

export interface SplitLayoutProps {
  main: ReactNode;
  aside: ReactNode;
  /** Lado da coluna fixa. */
  asideSide?: 'left' | 'right';
}

export function SplitLayout({ main, aside, asideSide = 'right' }: SplitLayoutProps) {
  return (
    <div className={styles.split}>
      {asideSide === 'left' && aside}
      <div className={styles.main}>{main}</div>
      {asideSide === 'right' && aside}
    </div>
  );
}
