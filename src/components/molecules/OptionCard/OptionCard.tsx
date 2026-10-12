import { cx } from '@/lib/cx';
import styles from './OptionCard.module.css';

export interface OptionCardProps {
  name: string;
  value: string;
  title: string;
  description?: string;
  checked: boolean;
  onSelect?: (value: string) => void;
}

/** Opção de escolha única em formato de cartão (radio). */
export function OptionCard({ name, value, title, description, checked, onSelect }: OptionCardProps) {
  return (
    <label className={cx(styles.card, checked && styles.checked)}>
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onSelect?.(value)} className={styles.radio} />
      <span className={styles.title}>{title}</span>
      {description && <span className={styles.desc}>{description}</span>}
    </label>
  );
}
