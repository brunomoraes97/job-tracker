import type { MouseEvent } from 'react';
import { Avatar } from '@/components/atoms/Avatar';
import { NavItem } from '@/components/molecules/NavItem';
import type { NavItem as NavItemData, SavedSearchSummary } from '@/types';
import styles from './Sidebar.module.css';

export interface SidebarProps {
  items: NavItemData[];
  /** id do item ativo. */
  activeId: string;
  savedSearches?: SavedSearchSummary[];
  /** Link de cada busca salva (recebe o id). */
  savedSearchHref?: (id: string) => string;
  user: { name: string; displayName?: string; subtitle: string; href: string };
  brand?: { name: string; tagline: string };
  onNavigate?: (href: string, event: MouseEvent<HTMLAnchorElement>) => void;
}

export function Sidebar({
  items,
  activeId,
  savedSearches,
  savedSearchHref = (id) => `#searches/${id}`,
  user,
  brand = { name: 'Radar', tagline: 'vagas · documentos · candidaturas' },
  onNavigate,
}: SidebarProps) {
  return (
    <aside className={styles.sidebar} aria-label="Navegação lateral">
      <div className={styles.brand}>
        <span className={styles.name}>{brand.name}</span>
        <span className={styles.tagline}>{brand.tagline}</span>
      </div>
      <nav aria-label="Principal" className={styles.nav}>
        {items.map((it) => (
          <NavItem key={it.id} label={it.label} href={it.href} badge={it.badge} active={it.id === activeId} onNavigate={onNavigate} />
        ))}
      </nav>
      {savedSearches && savedSearches.length > 0 && (
        <div className={styles.section}>
          <span className={styles.sectionTitle}>Buscas salvas</span>
          {savedSearches.map((s) => (
            <NavItem key={s.id} variant="secondary" label={s.label} href={savedSearchHref(s.id)} badge={`+${s.newCount}`} onNavigate={onNavigate} />
          ))}
        </div>
      )}
      <a href={user.href} className={styles.user} onClick={(e) => onNavigate?.(user.href, e)}>
        <Avatar name={user.name} />
        <span className={styles.userText}>
          <span className={styles.userName}>{user.displayName ?? user.name}</span>
          <span className={styles.userSub}>{user.subtitle}</span>
        </span>
      </a>
    </aside>
  );
}
