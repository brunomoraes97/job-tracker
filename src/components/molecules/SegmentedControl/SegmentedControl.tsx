import { cx } from '@/lib/cx';
import styles from './SegmentedControl.module.css';

export interface SegmentOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps {
  options: SegmentOption[];
  /** Valor selecionado (controlado). */
  value: string;
  /** Rótulo acessível do grupo. */
  label: string;
  /** `tabs` usa role="tablist"; `toggle` usa botões com aria-pressed. */
  mode?: 'toggle' | 'tabs';
  fullWidth?: boolean;
  onChange?: (value: string) => void;
}

export function SegmentedControl({ options, value, label, mode = 'toggle', fullWidth, onChange }: SegmentedControlProps) {
  return (
    <div role={mode === 'tabs' ? 'tablist' : 'group'} aria-label={label} className={cx(styles.group, fullWidth && styles.full)}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role={mode === 'tabs' ? 'tab' : undefined}
            aria-selected={mode === 'tabs' ? active : undefined}
            aria-pressed={mode === 'toggle' ? active : undefined}
            className={cx(styles.item, active && styles.active)}
            onClick={() => !active && onChange?.(o.value)}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
