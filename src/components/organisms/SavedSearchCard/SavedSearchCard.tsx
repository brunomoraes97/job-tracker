import { cx } from '@/lib/cx';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Switch } from '@/components/atoms/Switch';
import type { SavedSearch } from '@/types';
import styles from './SavedSearchCard.module.css';

export interface SavedSearchCardProps {
  search: SavedSearch;
  running?: boolean;
  onToggleActive?: (id: string, active: boolean) => void;
  onViewResults?: (id: string) => void;
  onEditDork?: (id: string) => void;
  onRunNow?: (id: string) => void;
}

export function SavedSearchCard({ search: s, running, onToggleActive, onViewResults, onEditDork, onRunNow }: SavedSearchCardProps) {
  return (
    <article className={cx(styles.card, !s.active && styles.paused)} aria-labelledby={`ss-${s.id}`}>
      <header className={styles.head}>
        <div className={styles.titleRow}>
          <h2 id={`ss-${s.id}`} className={styles.name}>{s.name}</h2>
          {s.newCount > 0 && <Badge tone="primary" mono shape="pill">+{s.newCount} novas</Badge>}
        </div>
        <Switch checked={s.active} label={s.active ? 'Ativa' : 'Pausada'} showLabel onChange={(v) => onToggleActive?.(s.id, v)} />
      </header>
      <p className={styles.desc}>“{s.description}”</p>
      <code className={styles.dork} title={s.dork}>{s.dork}</code>
      <footer className={styles.foot}>
        <span className={styles.meta}>{s.meta}</span>
        <span className={styles.actions}>
          <Button size="sm" variant="ghost" onClick={() => onViewResults?.(s.id)}>Ver resultados</Button>
          <Button size="sm" variant="ghost" onClick={() => onEditDork?.(s.id)}>Editar dork</Button>
          <Button size="sm" variant="ghost" iconLeft="play" loading={running} onClick={() => onRunNow?.(s.id)}>Executar agora</Button>
        </span>
      </footer>
    </article>
  );
}
