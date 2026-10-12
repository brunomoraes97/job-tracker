import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import type { ChipGroupItem } from '@/components/molecules/ChipGroup';
import { jobFilters, jobs, sidebarProps, user, viewOptions } from '@/mocks/fixtures';
import { NewJobsPage } from './NewJobsPage';

const meta = {
  title: 'Pages/Novas vagas',
  component: NewJobsPage,
  parameters: { layout: 'fullscreen' },
  args: {
    sidebar: { ...sidebarProps, activeId: 'jobs', onNavigate: fn() },
    subtitle: '23 novas desde ontem · 7 com match acima de 80% · última varredura há 12 min',
    view: 'list', viewOptions, query: '', filters: jobFilters, jobs, selectedJobId: 'j1',
    totalLabel: '23 resultados', sortLabel: 'match com seu currículo', sourcesLabel: 'Fontes: LinkedIn, Greenhouse, Lever, Wellfound, Remote OK', resumeLabel: user.resumeVersion,
    onViewChange: fn(), onQueryChange: fn(), onToggleFilter: fn(), onAddFilter: fn(), onOpenAlerts: fn(), onSelectJob: fn(), onGenerate: fn(), onSaveJob: fn(), onDiscardJob: fn(), onOpenDescription: fn(),
  },
  render: function Render(args) {
    const [, update] = useArgs();
    return (
      <NewJobsPage
        {...args}
        onSelectJob={(id) => { args.onSelectJob?.(id); update({ selectedJobId: id }); }}
        onQueryChange={(q) => { args.onQueryChange?.(q); update({ query: q }); }}
        onViewChange={(v) => { args.onViewChange?.(v); update({ view: v }); }}
        onToggleFilter={(id, s) => { args.onToggleFilter?.(id, s); update({ filters: args.filters.map((f: ChipGroupItem) => (f.id === id ? { ...f, selected: s } : f)) }); }}
      />
    );
  },
} satisfies Meta<typeof NewJobsPage>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const NothingSelected: Story = { args: { selectedJobId: undefined } };
export const Empty: Story = { args: { jobs: [], selectedJobId: undefined, totalLabel: '0 resultados', subtitle: 'Nenhuma vaga nova desde ontem' } };
