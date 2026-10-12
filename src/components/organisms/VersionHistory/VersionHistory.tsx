import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import styles from './VersionHistory.module.css';

export interface ResumeVersion {
  id: string;
  label: string;
  date: string;
  note: string;
  /** Quantos documentos foram gerados a partir desta versão. */
  documents: number;
  current?: boolean;
}

export interface VersionHistoryProps {
  versions: ResumeVersion[];
  restoringId?: string;
  onRestore?: (id: string) => void;
}

export function VersionHistory({ versions, restoringId, onRestore }: VersionHistoryProps) {
  return (
    <ol className={styles.list} aria-label="Versões do currículo base">
      {versions.map((v) => (
        <li key={v.id} className={styles.item}>
          <div className={styles.head}>
            <span className={styles.label}>{v.label}</span>
            {v.current && <Badge tone="primary" shape="pill">atual</Badge>}
            <span className={styles.date}>{v.date}</span>
          </div>
          <p className={styles.note}>{v.note}</p>
          <div className={styles.foot}>
            <span className={styles.meta}>{v.documents} documento{v.documents === 1 ? '' : 's'} gerado{v.documents === 1 ? '' : 's'}</span>
            {!v.current && (
              <Button size="sm" variant="outline" iconLeft="undo" loading={restoringId === v.id} onClick={() => onRestore?.(v.id)}>Restaurar {v.label}</Button>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
