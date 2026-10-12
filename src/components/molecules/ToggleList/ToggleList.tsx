import { Checkbox } from '@/components/atoms/Checkbox';
import type { ToggleOption } from '@/types';
import styles from './ToggleList.module.css';

export interface ToggleListProps {
  items: ToggleOption[];
  /** Legenda do grupo. */
  label: string;
  hideLabel?: boolean;
  descriptionPosition?: 'inline' | 'below';
  onToggle?: (id: string, checked: boolean) => void;
}

export function ToggleList({ items, label, hideLabel, descriptionPosition = 'inline', onToggle }: ToggleListProps) {
  return (
    <fieldset className={styles.set}>
      <legend className={hideLabel ? styles.hidden : styles.legend}>{label}</legend>
      {items.map((it) => (
        <Checkbox key={it.id} checked={it.checked} label={it.label} description={it.description} descriptionPosition={descriptionPosition} onChange={(c) => onToggle?.(it.id, c)} />
      ))}
    </fieldset>
  );
}
