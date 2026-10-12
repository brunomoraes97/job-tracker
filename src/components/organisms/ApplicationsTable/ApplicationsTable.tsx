import { cx } from '@/lib/cx';
import type { Application, StageId } from '@/types';
import styles from './ApplicationsTable.module.css';

export type ApplicationSortKey = 'company' | 'appliedOn' | 'match';
export interface ApplicationSort {
  key: ApplicationSortKey;
  direction: 'asc' | 'desc';
}

export interface ApplicationsTableProps {
  applications: Application[];
  stageLabels: Record<StageId, string>;
  /** Ordenação atual — a ordenação dos dados é responsabilidade do pai. */
  sort: ApplicationSort;
  onSortChange?: (sort: ApplicationSort) => void;
  onOpenDocuments?: (id: string) => void;
}

const columns: Array<{ key: string; label: string; sortable?: ApplicationSortKey; align?: 'right' }> = [
  { key: 'company', label: 'Empresa', sortable: 'company' },
  { key: 'role', label: 'Cargo' },
  { key: 'stage', label: 'Status' },
  { key: 'appliedOn', label: 'Aplicada', sortable: 'appliedOn' },
  { key: 'source', label: 'Fonte' },
  { key: 'match', label: 'Match', sortable: 'match', align: 'right' },
  { key: 'documents', label: 'Documentos' },
  { key: 'next', label: 'Próximo passo' },
];

export function ApplicationsTable({ applications, stageLabels, sort, onSortChange, onOpenDocuments }: ApplicationsTableProps) {
  const toggle = (key: ApplicationSortKey) =>
    onSortChange?.({ key, direction: sort.key === key && sort.direction === 'desc' ? 'asc' : 'desc' });
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((c) => {
              const active = c.sortable && sort.key === c.sortable;
              return (
                <th key={c.key} scope="col" className={cx(c.align === 'right' && styles.right)} aria-sort={active ? (sort.direction === 'asc' ? 'ascending' : 'descending') : undefined}>
                  {c.sortable ? (
                    <button type="button" className={styles.sort} onClick={() => toggle(c.sortable!)}>
                      {c.label} <span aria-hidden="true">{active ? (sort.direction === 'asc' ? '↑' : '↓') : '↕'}</span>
                    </button>
                  ) : (
                    c.label
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {applications.map((a) => (
            <tr key={a.id}>
              <td className={styles.strong}>{a.company}</td>
              <td>{a.role}</td>
              <td><span className={cx(styles.pill, styles[a.stage])}>{stageLabels[a.stage]}</span></td>
              <td className={styles.mono}>{a.appliedOn ?? '—'}</td>
              <td className={styles.muted}>{a.source}</td>
              <td className={cx(styles.mono, styles.right)}>{a.match}%</td>
              <td>
                <button type="button" className={styles.link} onClick={() => onOpenDocuments?.(a.id)}>{a.documents.join(' + ')}</button>
              </td>
              <td className={cx(a.nextStepOverdue && styles.overdue)}>{a.nextStep}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
