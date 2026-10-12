import { Button } from '@/components/atoms/Button';
import { Tag } from '@/components/atoms/Tag';
import type { Experience } from '@/types';
import styles from './ExperienceCard.module.css';

export interface ExperienceCardProps {
  experience: Experience;
  onEdit?: (id: string) => void;
}

export function ExperienceCard({ experience: x, onEdit }: ExperienceCardProps) {
  return (
    <article className={styles.card}>
      <header className={styles.head}>
        <div className={styles.titles}>
          <h3 className={styles.role}>{x.role} — {x.company}</h3>
          <span className={styles.where}>{x.location}</span>
        </div>
        <span className={styles.period}>{x.period}</span>
      </header>
      <ul className={styles.bullets}>
        {x.bullets.map((b) => <li key={b}>{b}</li>)}
      </ul>
      <div className={styles.foot}>
        <div className={styles.tags}>{x.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
        {onEdit && <Button size="sm" variant="ghost" onClick={() => onEdit(x.id)}>Editar</Button>}
      </div>
    </article>
  );
}
