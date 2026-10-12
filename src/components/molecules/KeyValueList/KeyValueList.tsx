import type { KeyValue } from '@/types';
import styles from './KeyValueList.module.css';

export interface KeyValueListProps {
  items: KeyValue[];
}

export function KeyValueList({ items }: KeyValueListProps) {
  return (
    <dl className={styles.list}>
      {items.map((kv) => (
        <div key={kv.id} className={styles.row}>
          <dt>{kv.label}</dt>
          <dd>{kv.value}</dd>
        </div>
      ))}
    </dl>
  );
}
