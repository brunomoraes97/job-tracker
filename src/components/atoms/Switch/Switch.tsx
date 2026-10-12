import type { MouseEvent } from 'react';
import { cx } from '@/lib/cx';
import styles from './Switch.module.css';

export interface SwitchProps {
  checked: boolean;
  /** Rótulo acessível (pode ficar visível com `showLabel`). */
  label: string;
  showLabel?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean, event: MouseEvent<HTMLButtonElement>) => void;
}

export function Switch({ checked, label, showLabel, disabled, onChange }: SwitchProps) {
  return (
    <span className={styles.wrap}>
      {showLabel && <span className={styles.text}>{label}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        className={cx(styles.track, checked && styles.on)}
        onClick={(e) => onChange?.(!checked, e)}
      >
        <span className={styles.thumb} />
      </button>
    </span>
  );
}
