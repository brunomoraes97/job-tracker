import type { MouseEvent, ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from '@/components/molecules/Breadcrumbs';
import styles from './PageHeader.module.css';

export interface PageHeaderProps {
  title: string;
  subtitle?: ReactNode;
  breadcrumbs?: Crumb[];
  /** Ações à direita (botões, seletor de visualização…). */
  actions?: ReactNode;
  onNavigate?: (href: string, event: MouseEvent<HTMLAnchorElement>) => void;
}

export function PageHeader({ title, subtitle, breadcrumbs, actions, onNavigate }: PageHeaderProps) {
  return (
    <div className={styles.wrap}>
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />}
      <header className={styles.header}>
        <div className={styles.text}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </header>
    </div>
  );
}
