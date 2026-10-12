import { StatusDot } from '@/components/atoms/StatusDot';
import type { Application, Stage } from '@/types';
import { ApplicationCard } from '../ApplicationCard';
import styles from './KanbanColumn.module.css';

export interface KanbanColumnProps {
  stage: Stage;
  applications: Application[];
  /** Total da etapa (pode ser maior que os cards exibidos). */
  count?: number;
  onOpenApplication?: (id: string) => void;
}

export function KanbanColumn({ stage, applications, count = applications.length, onOpenApplication }: KanbanColumnProps) {
  const headingId = `col-${stage.id}`;
  return (
    <section aria-labelledby={headingId} className={styles.column}>
      <header className={styles.head}>
        <span className={styles.title}>
          <StatusDot stage={stage.id} />
          <h2 id={headingId}>{stage.label}</h2>
        </span>
        <span className={styles.count}>{count}</span>
      </header>
      {applications.map((a) => <ApplicationCard key={a.id} application={a} onOpen={onOpenApplication} />)}
      {applications.length === 0 && <p className={styles.empty}>Nada aqui ainda.</p>}
    </section>
  );
}
