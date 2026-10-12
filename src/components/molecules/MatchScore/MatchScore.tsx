import { cx } from '@/lib/cx';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import styles from './MatchScore.module.css';

export type MatchTier = 'high' | 'mid' | 'low';

/** ≥ 85 alto · 70–84 médio · < 70 baixo. */
export const matchTier = (value: number): MatchTier => (value >= 85 ? 'high' : value >= 70 ? 'mid' : 'low');

export interface MatchScoreProps {
  /** 0–100 */
  value: number;
  /** `stack` = número grande + barra (lista) · `inline` = só número (cabeçalhos). */
  layout?: 'stack' | 'inline';
  caption?: string;
}

export function MatchScore({ value, layout = 'stack', caption = 'match' }: MatchScoreProps) {
  const tier = matchTier(value);
  return (
    <div className={cx(styles.score, styles[layout], styles[tier])} aria-label={`${value}% de match`}>
      <span className={styles.value}>
        {value}
        <span className={styles.pct}>%</span>
      </span>
      {layout === 'stack' && (
        <>
          <span className={styles.caption}>{caption}</span>
          <span className={styles.bar}><ProgressBar value={value} label="Match" size="xs" tone={`match-${tier}`} /></span>
        </>
      )}
    </div>
  );
}
