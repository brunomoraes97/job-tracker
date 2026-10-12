import type { ReactNode } from 'react';
import styles from './AppShell.module.css';

export interface AppShellProps {
  /** Navegação lateral (normalmente `<Sidebar />`). */
  sidebar: ReactNode;
  children: ReactNode;
  /** Camada sobreposta (drawer, modal). */
  overlay?: ReactNode;
}

export function AppShell({ sidebar, children, overlay }: AppShellProps) {
  return (
    <div className={styles.shell}>
      {sidebar}
      <main className={styles.main}>{children}</main>
      {overlay}
    </div>
  );
}
