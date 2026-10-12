import { cx } from '@/lib/cx';
import { Panel } from '@/components/molecules/Panel';
import type { DorkPart } from '@/types';
import styles from './DorkAnatomy.module.css';

export interface DorkAnatomyProps {
  parts: DorkPart[];
}

/** Legenda de cada parte do dork, com a mesma cor usada na consulta. */
export function DorkAnatomy({ parts }: DorkAnatomyProps) {
  return (
    <Panel title="Anatomia da busca">
      <dl className={styles.list}>
        {parts.map((p) => (
          <div key={p.kind} className={styles.row}>
            <dt className={styles.term}><span className={cx(styles.swatch, styles[p.kind])} aria-hidden="true" />{p.label}</dt>
            <dd className={styles.why}>{p.explanation}</dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}
