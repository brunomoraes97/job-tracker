import { ProgressBar } from '@/components/atoms/ProgressBar';
import styles from './FitBar.module.css';

export interface FitBarProps {
  label: string;
  /** 0–100 */
  value: number;
  /** `inline` = rótulo, barra e valor em linha · `stacked` = rótulo e valor acima da barra. */
  layout?: 'inline' | 'stacked';
}

export function FitBar({ label, value, layout = 'inline' }: FitBarProps) {
  if (layout === 'stacked') {
    return (
      <div className={styles.stacked}>
        <div className={styles.head}><span>{label}</span><span className={styles.value}>{value}</span></div>
        <ProgressBar value={value} label={label} size="xs" />
      </div>
    );
  }
  return (
    <div className={styles.inline}>
      <span className={styles.label}>{label}</span>
      <ProgressBar value={value} label={label} />
      <span className={styles.value}>{value}</span>
    </div>
  );
}
