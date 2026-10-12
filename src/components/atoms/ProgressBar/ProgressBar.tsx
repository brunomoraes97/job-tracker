import { cx } from '@/lib/cx';
import styles from './ProgressBar.module.css';

export interface ProgressBarProps {
  /** 0–100 */
  value: number;
  /** Rótulo acessível. */
  label: string;
  tone?: 'primary' | 'match-high' | 'match-mid' | 'match-low';
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const clamp = (n: number) => Math.max(0, Math.min(100, n));

export function ProgressBar({ value, label, tone = 'primary', size = 'sm' }: ProgressBarProps) {
  const v = clamp(value);
  return (
    <div role="progressbar" aria-label={label} aria-valuenow={v} aria-valuemin={0} aria-valuemax={100} className={cx(styles.track, styles[size])}>
      <div className={cx(styles.fill, styles[tone])} style={{ width: `${v}%` }} />
    </div>
  );
}
