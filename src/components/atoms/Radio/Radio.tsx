import type { ChangeEvent, ReactNode } from 'react';
import styles from './Radio.module.css';

export interface RadioProps {
  name: string;
  value: string;
  checked: boolean;
  label: ReactNode;
  disabled?: boolean;
  /** Emitido quando este item é escolhido. */
  onSelect?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
}

export function Radio({ name, value, checked, label, disabled, onSelect }: RadioProps) {
  return (
    <label className={styles.row}>
      <input type="radio" name={name} value={value} checked={checked} disabled={disabled} onChange={(e) => e.target.checked && onSelect?.(value, e)} className={styles.dot} />
      {label}
    </label>
  );
}
