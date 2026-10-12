import { Button } from '@/components/atoms/Button';
import { SegmentedControl, type SegmentOption } from '@/components/molecules/SegmentedControl';
import { ApplicationForm, type ApplicationFormProps } from '@/components/organisms/ApplicationForm';
import { Drawer } from '@/components/organisms/Drawer';
import { KanbanBoard } from '@/components/organisms/KanbanBoard';
import { PageHeader } from '@/components/organisms/PageHeader';
import { Sidebar, type SidebarProps } from '@/components/organisms/Sidebar';
import { AppShell } from '@/components/templates/AppShell';
import { PageLayout } from '@/components/templates/PageLayout';
import type { Application, Stage, StageId } from '@/types';

export interface ApplicationsBoardPageProps {
  sidebar: SidebarProps;
  subtitle: string;
  view: string;
  viewOptions: SegmentOption[];
  stages: Stage[];
  applications: Application[];
  counts?: Partial<Record<StageId, number>>;
  /** Drawer de candidatura manual aberto. */
  formOpen: boolean;
  form: ApplicationFormProps;
  /** Posiciona o drawer dentro da página (Storybook). */
  containedOverlay?: boolean;
  onViewChange?: (view: string) => void;
  onOpenApplication?: (id: string) => void;
  onNewApplication?: () => void;
  onCloseForm?: () => void;
  /** Título do drawer (padrão: nova candidatura). */
  formTitle?: string;
  formSubtitle?: string;
  movable?: boolean;
  onMoveApplication?: (id: string, stage: StageId) => void;
}

export function ApplicationsBoardPage(p: ApplicationsBoardPageProps) {
  return (
    <AppShell
      sidebar={<Sidebar {...p.sidebar} />}
      overlay={
        <Drawer open={p.formOpen} contained={p.containedOverlay} title={p.formTitle ?? 'Nova candidatura'} subtitle={p.formSubtitle ?? 'Para vagas que você achou fora do Radar.'} onClose={p.onCloseForm}>
          <ApplicationForm {...p.form} onCancel={p.form.onCancel ?? p.onCloseForm} />
        </Drawer>
      }
    >
      <PageLayout
        header={
          <PageHeader
            title="Candidaturas"
            subtitle={p.subtitle}
            actions={
              <>
                <SegmentedControl label="Visualização" value={p.view} options={p.viewOptions} onChange={p.onViewChange} />
                <Button variant="primary" iconLeft="plus" onClick={p.onNewApplication}>Candidatura manual</Button>
              </>
            }
          />
        }
      >
        <KanbanBoard stages={p.stages} applications={p.applications} counts={p.counts} onOpenApplication={p.onOpenApplication} movable={p.movable} onMoveApplication={p.onMoveApplication} />
      </PageLayout>
    </AppShell>
  );
}
