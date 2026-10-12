import { cx } from '@/lib/cx';
import { IconButton } from '@/components/atoms/IconButton';
import type { ChangeKind } from '@/types';
import styles from './ChangeItem.module.css';

const symbol: Record<ChangeKind, string> = { add: '+', move: '↑', cut: '−' };
const kindLabel: Record<ChangeKind, string> = { add: 'Adicionado', move: 'Movido', cut: 'Reduzido' };

export interface ChangeItemProps {
  id: string;
  kind: ChangeKind;
  title: string;
  description: string;
  onUndo?: (id: string) => void;
}

export function ChangeItem({ id, kind, title, description, onUndo }: ChangeItemProps) {
  return (
    <div className={styles.item}>
      <span className={cx(styles.sym, styles[kind])} aria-label={kindLabel[kind]}>{symbol[kind]}</span>
      <span className={styles.body}>
        <span className={styles.title}>{title}</span>
        <span className={styles.desc}>{description}</span>
      </span>
      <IconButton icon="undo" label={`Desfazer: ${title}`} size="sm" onClick={() => onUndo?.(id)} />
    </div>
  );
}
