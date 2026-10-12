import { cx } from '@/lib/cx';
import { Badge } from '@/components/atoms/Badge';
import { Monogram } from '@/components/atoms/Monogram';
import { Tag } from '@/components/atoms/Tag';
import { MatchScore } from '@/components/molecules/MatchScore';
import type { Job } from '@/types';
import styles from './JobCard.module.css';

export interface JobCardProps {
  job: Job;
  /** Vaga aberta no painel de detalhe. */
  selected?: boolean;
  /** Clique no cartão ou no título: abrir a vaga no painel de detalhe. */
  onSelect?: (id: string) => void;
}

export function JobCard({ job, selected, onSelect }: JobCardProps) {
  return (
    <article
      className={cx(styles.card, selected && styles.selected)}
      aria-current={selected || undefined}
      onClick={() => onSelect?.(job.id)}
    >
      <Monogram letters={job.company.monogram} tint={job.company.tint} />
      <div className={styles.main}>
        <div className={styles.titleRow}>
          <button
            type="button"
            className={styles.title}
            aria-pressed={selected}
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.(job.id);
            }}
          >
            {job.title}
          </button>
          {job.isNew && <Badge tone="dark">NOVA</Badge>}
        </div>
        <span className={styles.meta}>
          {job.company.name} · {job.location}
        </span>
        <div className={styles.tags}>
          {job.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <span className={styles.foot}>{[job.salary, job.source, job.postedLabel].filter(Boolean).join(' · ')}</span>
      </div>
      <MatchScore value={job.match} />
    </article>
  );
}
