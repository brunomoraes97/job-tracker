import type { ChangeEvent, ReactNode } from 'react';
import { cx } from '@/lib/cx';
import styles from './Checkbox.module.css';

export interface CheckboxProps {
  checked: boolean;
  label: ReactNode;
  /** Texto auxiliar à direita ou abaixo do rótulo. */
  description?: ReactNode;
  descriptionPosition?: 'inline' | 'below';
  disabled?: boolean;
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox({ checked, label, description, descriptionPosition = 'inline', disabled, onChange }: CheckboxProps) {
  return (
    <label className={cx(styles.row, disabled && styles.disabled)}>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange?.(e.target.checked, e)} className={styles.box} />
      {descriptionPosition === 'below' ? (
        <span className={styles.stack}>
          <span>{label}</span>
          {description && <span className={styles.desc}>{description}</span>}
        </span>
      ) : (
        <>
          <span className={styles.label}>{label}</span>
          {description && <span className={styles.desc}>{description}</span>}
        </>
      )}
    </label>
  );
}
