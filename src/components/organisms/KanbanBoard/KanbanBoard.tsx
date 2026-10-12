import type { Application, Stage, StageId } from '@/types';
import { KanbanColumn } from '../KanbanColumn';
import styles from './KanbanBoard.module.css';

export interface KanbanBoardProps {
  stages: Stage[];
  applications: Application[];
  /** Totais por etapa (opcional — padrão: quantidade de cards). */
  counts?: Partial<Record<StageId, number>>;
  onOpenApplication?: (id: string) => void;
  /** Habilita o seletor "Mover para" em cada card. */
  movable?: boolean;
  onMoveApplication?: (id: string, stage: StageId) => void;
}

export function KanbanBoard({ stages, applications, counts, onOpenApplication, movable, onMoveApplication }: KanbanBoardProps) {
  return (
    <div className={styles.board}>
      {stages.map((s) => (
        <KanbanColumn key={s.id} stage={s} applications={applications.filter((a) => a.stage === s.id)} count={counts?.[s.id]} onOpenApplication={onOpenApplication} moveOptions={movable ? stages : undefined} onMoveApplication={onMoveApplication} />
      ))}
    </div>
  );
}
