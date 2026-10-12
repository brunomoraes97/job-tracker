import { cx } from '@/lib/cx';
import type { Application, Stage, StageId } from '@/types';
import styles from './ApplicationCard.module.css';

export interface ApplicationCardProps {
  application: Application;
  onOpen?: (id: string) => void;
  /** Etapas para onde o card pode ser movido. Sem elas, o seletor não aparece. */
  moveOptions?: Stage[];
  onMove?: (id: string, stage: StageId) => void;
}

export function ApplicationCard({ application: a, onOpen, moveOptions, onMove }: ApplicationCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <span className={styles.company}>{a.company}</span>
        {a.match != null && <span className={styles.match} aria-label={`${a.match}% de match`}>{a.match}%</span>}
      </div>
      <button type="button" className={styles.role} onClick={() => onOpen?.(a.id)}>{a.role}</button>
      <span className={styles.meta}>{a.meta}</span>
      <ul className={styles.docs} aria-label="Documentos">
        {a.documents.map((d) => <li key={d}>{d}</li>)}
      </ul>
      <span className={cx(styles.next, a.nextStepOverdue && styles.overdue)}>
        <span aria-hidden="true">{a.nextStepOverdue ? '●' : '→'}</span> {a.nextStep}
      </span>
      {moveOptions && moveOptions.length > 0 && (
        <select
          className={styles.move}
          aria-label={`Mover ${a.role} (${a.company}) para`}
          value={a.stage}
          onChange={(e) => onMove?.(a.id, e.target.value as StageId)}
        >
          {moveOptions.map((s) => <option key={s.id} value={s.id}>{s.id === a.stage ? `Etapa: ${s.label}` : `Mover para ${s.label}`}</option>)}
        </select>
      )}
    </article>
  );
}
