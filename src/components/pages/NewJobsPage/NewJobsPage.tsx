import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { ChipGroup, type ChipGroupItem } from '@/components/molecules/ChipGroup';
import { SegmentedControl, type SegmentOption } from '@/components/molecules/SegmentedControl';
import { JobDetailPanel } from '@/components/organisms/JobDetailPanel';
import { JobList } from '@/components/organisms/JobList';
import { PageHeader } from '@/components/organisms/PageHeader';
import { Sidebar, type SidebarProps } from '@/components/organisms/Sidebar';
import { AppShell } from '@/components/templates/AppShell';
import { PageLayout } from '@/components/templates/PageLayout';
import { SplitLayout } from '@/components/templates/SplitLayout';
import type { Job } from '@/types';
import styles from './NewJobsPage.module.css';

export interface NewJobsPageProps {
  sidebar: SidebarProps;
  subtitle: string;
  view: string;
  viewOptions: SegmentOption[];
  query: string;
  filters: ChipGroupItem[];
  jobs: Job[];
  selectedJobId?: string;
  totalLabel: string;
  sortLabel: string;
  sourcesLabel?: string;
  resumeLabel: string;
  /** Layout da lista (Lista = `list`, Cards = `grid`). */
  listLayout?: 'list' | 'grid';
  onViewChange?: (view: string) => void;
  onQueryChange?: (query: string) => void;
  onToggleFilter?: (id: string, selected: boolean) => void;
  onAddFilter?: () => void;
  onOpenAlerts?: () => void;
  onSelectJob?: (id: string) => void;
  onGenerate?: (jobId: string) => void;
  onSaveJob?: (jobId: string) => void;
  onDiscardJob?: (jobId: string) => void;
  onOpenDescription?: (jobId: string) => void;
}

export function NewJobsPage(p: NewJobsPageProps) {
  const selected = p.jobs.find((j) => j.id === p.selectedJobId);
  return (
    <AppShell sidebar={<Sidebar {...p.sidebar} />}>
      <PageLayout
        header={
          <PageHeader
            title="Novas vagas"
            subtitle={p.subtitle}
            actions={
              <>
                <SegmentedControl label="Visualização" value={p.view} options={p.viewOptions} onChange={p.onViewChange} />
                <Button iconLeft="bell" onClick={p.onOpenAlerts}>Alertas diários</Button>
              </>
            }
          />
        }
      >
        <div className={styles.toolbar}>
          <Input className={styles.search} type="search" icon="search" value={p.query} placeholder="Cargo, empresa ou stack" aria-label="Buscar vagas" onChange={p.onQueryChange} />
          <ChipGroup label="Filtros" items={p.filters} onToggle={p.onToggleFilter} />
          <Button variant="ghost" size="sm" iconLeft="plus" onClick={p.onAddFilter}>Filtro</Button>
        </div>
        <SplitLayout
          main={<JobList jobs={p.jobs} selectedId={p.selectedJobId} totalLabel={p.totalLabel} sortLabel={p.sortLabel} sourcesLabel={p.sourcesLabel} layout={p.listLayout} onSelectJob={p.onSelectJob} />}
          aside={
            selected ? (
              <JobDetailPanel job={selected} resumeLabel={p.resumeLabel} onGenerate={p.onGenerate} onSave={p.onSaveJob} onDiscard={p.onDiscardJob} onOpenDescription={p.onOpenDescription} />
            ) : (
              <div className={styles.placeholder}>Selecione uma vaga para ver por que ela combina com você.</div>
            )
          }
        />
      </PageLayout>
    </AppShell>
  );
}
