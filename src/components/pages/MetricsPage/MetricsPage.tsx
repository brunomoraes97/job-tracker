import { Button } from '@/components/atoms/Button';
import { SegmentedControl, type SegmentOption } from '@/components/molecules/SegmentedControl';
import { ApplicationsTable, type ApplicationSort } from '@/components/organisms/ApplicationsTable';
import { FunnelChart } from '@/components/organisms/FunnelChart';
import { KpiGrid } from '@/components/organisms/KpiGrid';
import { PageHeader } from '@/components/organisms/PageHeader';
import { Sidebar, type SidebarProps } from '@/components/organisms/Sidebar';
import { UpcomingEvents } from '@/components/organisms/UpcomingEvents';
import { AppShell } from '@/components/templates/AppShell';
import { PageLayout } from '@/components/templates/PageLayout';
import type { Application, CalendarEvent, FunnelStep, Kpi, StageId } from '@/types';
import styles from './MetricsPage.module.css';

export interface MetricsPageProps {
  sidebar: SidebarProps;
  subtitle: string;
  view: string;
  viewOptions: SegmentOption[];
  kpis: Kpi[];
  funnel: FunnelStep[];
  events: CalendarEvent[];
  applications: Application[];
  stageLabels: Record<StageId, string>;
  sort: ApplicationSort;
  onViewChange?: (view: string) => void;
  onSortChange?: (sort: ApplicationSort) => void;
  onOpenDocuments?: (id: string) => void;
  onExport?: () => void;
}

export function MetricsPage(p: MetricsPageProps) {
  return (
    <AppShell sidebar={<Sidebar {...p.sidebar} />}>
      <PageLayout
        header={
          <PageHeader
            title="Tabela & métricas"
            subtitle={p.subtitle}
            actions={
              <>
                <SegmentedControl label="Visualização" value={p.view} options={p.viewOptions} onChange={p.onViewChange} />
                <Button iconLeft="download" onClick={p.onExport}>Exportar CSV</Button>
              </>
            }
          />
        }
      >
        <KpiGrid kpis={p.kpis} />
        <div className={styles.row}>
          <div className={styles.grow}><FunnelChart steps={p.funnel} /></div>
          <div className={styles.side}><UpcomingEvents events={p.events} /></div>
        </div>
        <ApplicationsTable applications={p.applications} stageLabels={p.stageLabels} sort={p.sort} onSortChange={p.onSortChange} onOpenDocuments={p.onOpenDocuments} />
      </PageLayout>
    </AppShell>
  );
}
