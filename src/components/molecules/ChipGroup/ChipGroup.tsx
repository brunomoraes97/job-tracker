import { Chip } from '@/components/atoms/Chip';
import styles from './ChipGroup.module.css';

export interface ChipGroupItem {
  id: string;
  label: string;
  selected: boolean;
}

export interface ChipGroupProps {
  items: ChipGroupItem[];
  /** Rótulo acessível do grupo (e legenda visível, se `showLabel`). */
  label: string;
  showLabel?: boolean;
  kind?: 'toggle' | 'checkbox';
  size?: 'sm' | 'md';
  /** Emitido quando um item muda — o pai decide o novo estado. */
  onToggle?: (id: string, selected: boolean) => void;
}

export function ChipGroup({ items, label, showLabel, kind = 'toggle', size = 'md', onToggle }: ChipGroupProps) {
  return (
    <div role="group" aria-label={label} className={styles.group}>
      {showLabel && <span className={styles.legend}>{label}</span>}
      {items.map((it) => (
        <Chip key={it.id} label={it.label} selected={it.selected} kind={kind} size={size} onToggle={(next) => onToggle?.(it.id, next)} />
      ))}
    </div>
  );
}
