import { StatTile } from '@/components/molecules/StatTile';
import type { Kpi } from '@/types';
import styles from './KpiGrid.module.css';

export interface KpiGridProps {
  kpis: Kpi[];
}

export function KpiGrid({ kpis }: KpiGridProps) {
  return (
    <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${Math.max(1, kpis.length)}, minmax(0, 1fr))` }}>
      {kpis.map((k) => <StatTile key={k.id} label={k.label} value={k.value} hint={k.hint} />)}
    </div>
  );
}
