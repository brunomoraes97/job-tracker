import type { ChangeEvent, MouseEvent } from 'react';
import { cx } from '@/lib/cx';
import styles from './Chip.module.css';

export interface ChipProps {
  label: string;
  /** Estado controlado de seleção. */
  selected: boolean;
  /**
   * `toggle` = botão com aria-pressed (filtros) ·
   * `checkbox` = rótulo com checkbox visível (sites, fontes).
   */
  kind?: 'toggle' | 'checkbox';
  size?: 'sm' | 'md';
  disabled?: boolean;
  /** Emitido com o novo estado desejado. */
  onToggle?: (next: boolean, event: MouseEvent<HTMLElement> | ChangeEvent<HTMLInputElement>) => void;
}

export function Chip({ label, selected, kind = 'toggle', size = 'md', disabled, onToggle }: ChipProps) {
  const cls = cx(styles.chip, styles[size], selected && styles.selected, kind === 'checkbox' && styles.withBox);
  if (kind === 'checkbox') {
    return (
      <label className={cls} aria-disabled={disabled || undefined}>
        <input
          type="checkbox"
          checked={selected}
          disabled={disabled}
          onChange={(e) => onToggle?.(e.target.checked, e)}
          className={styles.box}
        />
        {label}
      </label>
    );
  }
  return (
    <button type="button" aria-pressed={selected} disabled={disabled} className={cls} onClick={(e) => onToggle?.(!selected, e)}>
      {label}
    </button>
  );
}
