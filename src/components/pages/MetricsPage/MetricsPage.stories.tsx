import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import type { ApplicationSort } from '@/components/organisms/ApplicationsTable';
import { stageLabels } from '@/lib/stages';
import { applications, events, funnel, kpis, sidebarProps } from '@/mocks/fixtures';
import type { Application } from '@/types';
import { MetricsPage } from './MetricsPage';

const views = [{ value: 'list', label: 'Lista' }, { value: 'kanban', label: 'Kanban' }, { value: 'table', label: 'Tabela' }, { value: 'calendar', label: 'Calendário' }];
const rows = applications.filter((a) => a.appliedOn);

/** Ordenação feita pelo "container" da story — a tabela só recebe o resultado. */
const sortRows = (list: Application[], s: ApplicationSort) => {
  const dir = s.direction === 'asc' ? 1 : -1;
  const key = (a: Application) => (s.key === 'appliedOn' ? (a.appliedOn ?? '').split('/').reverse().join('') : s.key === 'match' ? String(a.match).padStart(3, '0') : a.company);
  return [...list].sort((a, b) => key(a).localeCompare(key(b)) * dir);
};

const meta = {
  title: 'Pages/Tabela e métricas',
  component: MetricsPage,
  parameters: { layout: 'fullscreen' },
  args: {
    sidebar: { ...sidebarProps, activeId: 'metrics', onNavigate: fn() },
    subtitle: 'Últimos 30 dias · todas as fontes',
    view: 'table', viewOptions: views, kpis, funnel, events, applications: sortRows(rows, { key: 'appliedOn', direction: 'desc' }), stageLabels, sort: { key: 'appliedOn', direction: 'desc' },
    onViewChange: fn(), onSortChange: fn(), onOpenDocuments: fn(), onExport: fn(),
  },
  render: function Render(args) {
    const [, update] = useArgs();
    return <MetricsPage {...args} onSortChange={(s) => { args.onSortChange?.(s); update({ sort: s, applications: sortRows(rows, s) }); }} />;
  },
} satisfies Meta<typeof MetricsPage>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
