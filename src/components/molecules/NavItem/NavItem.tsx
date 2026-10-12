import type { MouseEvent } from 'react';
import { cx } from '@/lib/cx';
import styles from './NavItem.module.css';

export interface NavItemProps {
  label: string;
  href: string;
  badge?: string;
  active?: boolean;
  /** `primary` = item de navegação principal · `secondary` = item compacto (buscas salvas). */
  variant?: 'primary' | 'secondary';
  onNavigate?: (href: string, event: MouseEvent<HTMLAnchorElement>) => void;
}

export function NavItem({ label, href, badge, active, variant = 'primary', onNavigate }: NavItemProps) {
  return (
    <a
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cx(styles.item, styles[variant], active && styles.active)}
      onClick={(e) => onNavigate?.(href, e)}
    >
      <span>{label}</span>
      {badge && <span className={styles.badge}>{badge}</span>}
    </a>
  );
}
