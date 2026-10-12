import { cx } from '@/lib/cx';
import type { StageId } from '@/types';
import styles from './StatusDot.module.css';

export interface StatusDotProps {
  stage: StageId;
  size?: number;
}

export function StatusDot({ stage, size = 9 }: StatusDotProps) {
  return <span aria-hidden="true" className={cx(styles.dot, styles[stage])} style={{ width: size, height: size }} />;
}
