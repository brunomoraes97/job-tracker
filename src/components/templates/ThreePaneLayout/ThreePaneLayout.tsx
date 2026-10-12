import type { ReactNode } from 'react';
import styles from './ThreePaneLayout.module.css';

export interface ThreePaneLayoutProps {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
  leftWidth?: number;
  rightWidth?: number;
}

export function ThreePaneLayout({ left, center, right, leftWidth = 268, rightWidth = 300 }: ThreePaneLayoutProps) {
  return (
    <div className={styles.grid} style={{ gridTemplateColumns: `${leftWidth}px minmax(0, 1fr) ${rightWidth}px` }}>
      <div className={styles.pane}>{left}</div>
      <div className={styles.pane}>{center}</div>
      <div className={styles.pane}>{right}</div>
    </div>
  );
}
