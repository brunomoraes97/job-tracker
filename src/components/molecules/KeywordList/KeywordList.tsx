import { Tag } from '@/components/atoms/Tag';
import styles from './KeywordList.module.css';

export interface KeywordListProps {
  /** Palavras-chave da vaga presentes no currículo base. */
  hits: string[];
  /** Palavras-chave da vaga ausentes no currículo base. */
  misses?: string[];
  /** Texto exibido após cada palavra ausente. */
  missSuffix?: string;
  label?: string;
}

export function KeywordList({ hits, misses = [], missSuffix = ' — não está no seu CV', label = 'Palavras-chave da vaga' }: KeywordListProps) {
  return (
    <ul className={styles.list} aria-label={label}>
      {hits.map((k) => (
        <li key={`h-${k}`}><Tag variant="hit">{k}</Tag></li>
      ))}
      {misses.map((k) => (
        <li key={`m-${k}`}><Tag variant="miss">{k}{missSuffix}</Tag></li>
      ))}
    </ul>
  );
}
