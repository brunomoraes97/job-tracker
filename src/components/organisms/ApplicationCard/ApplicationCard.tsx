import { cx } from '@/lib/cx';
import type { Application } from '@/types';
import styles from './ApplicationCard.module.css';

export interface ApplicationCardProps {
  application: Application;
  onOpen?: (id: string) => void;
}

export function ApplicationCard({ application: a, onOpen }: ApplicationCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <span className={styles.company}>{a.company}</span>
        <span className={styles.match} aria-label={`${a.match}% de match`}>{a.match}%</span>
      </div>
      <button type="button" className={styles.role} onClick={() => onOpen?.(a.id)}>{a.role}</button>
      <span className={styles.meta}>{a.meta}</span>
      <ul className={styles.docs} aria-label="Documentos">
        {a.documents.map((d) => <li key={d}>{d}</li>)}
      </ul>
      <span className={cx(styles.next, a.nextStepOverdue && styles.overdue)}>
        <span aria-hidden="true">{a.nextStepOverdue ? '●' : '→'}</span> {a.nextStep}
      </span>
    </article>
  );
}
