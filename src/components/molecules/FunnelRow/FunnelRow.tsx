import { ProgressBar } from '@/components/atoms/ProgressBar';
import styles from './FunnelRow.module.css';

export interface FunnelRowProps {
  label: string;
  count: number;
  /** Total de referência (100% da barra). */
  total: number;
}

export function FunnelRow({ label, count, total }: FunnelRowProps) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <ProgressBar value={pct} label={`${label}: ${count}`} size="lg" />
      <span className={styles.count}>{count}</span>
    </div>
  );
}
