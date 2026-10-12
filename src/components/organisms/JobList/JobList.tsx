import type { Job } from '@/types';
import { JobCard } from '../JobCard';
import styles from './JobList.module.css';

export interface JobListProps {
  jobs: Job[];
  selectedId?: string;
  /** Ex.: "23 resultados" */
  totalLabel: string;
  /** Ex.: "match com seu currículo" */
  sortLabel: string;
  sourcesLabel?: string;
  emptyText?: string;
  /** `list` = uma coluna · `grid` = cards em duas colunas. */
  layout?: 'list' | 'grid';
  onSelectJob?: (id: string) => void;
}

export function JobList({ jobs, selectedId, totalLabel, sortLabel, sourcesLabel, emptyText = 'Nenhuma vaga com estes filtros.', layout = 'list', onSelectJob }: JobListProps) {
  return (
    <section aria-label="Lista de vagas" className={styles.list}>
      <div className={styles.head}>
        <span>
          {totalLabel} · ordenado por <strong>{sortLabel}</strong>
        </span>
        {sourcesLabel && <span>{sourcesLabel}</span>}
      </div>
      {jobs.length === 0 && <p className={styles.empty}>{emptyText}</p>}
      <div className={layout === 'grid' ? styles.grid : styles.stack}>
        {jobs.map((j) => (
          <JobCard key={j.id} job={j} selected={j.id === selectedId} onSelect={onSelectJob} />
        ))}
      </div>
    </section>
  );
}
