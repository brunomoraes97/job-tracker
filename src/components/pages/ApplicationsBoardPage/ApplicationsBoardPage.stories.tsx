import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { applications, emptyDraft, sidebarProps, sourceOptions, stageOptions, stages } from '@/mocks/fixtures';
import type { ApplicationDraft } from '@/types';
import { ApplicationsBoardPage, type ApplicationsBoardPageProps } from './ApplicationsBoardPage';

const views = [{ value: 'list', label: 'Lista' }, { value: 'kanban', label: 'Kanban' }, { value: 'table', label: 'Tabela' }, { value: 'calendar', label: 'Calendário' }];

const meta = {
  title: 'Pages/Candidaturas (kanban)',
  component: ApplicationsBoardPage,
  parameters: { layout: 'fullscreen' },
  args: {
    sidebar: { ...sidebarProps, activeId: 'applications', onNavigate: fn() },
    subtitle: '18 ativas · 3 entrevistas esta semana · 2 follow-ups atrasados',
    view: 'kanban', viewOptions: views, stages, applications, counts: { saved: 4, applied: 7, talking: 3, interview: 3, offer: 1 },
    formOpen: false, containedOverlay: true,
    form: { draft: emptyDraft, stageOptions, sourceOptions, onFieldChange: fn(), onImport: fn(), onSubmit: fn() },
    onViewChange: fn(), onOpenApplication: fn(), onNewApplication: fn(), onCloseForm: fn(),
  },
  render: function Render(args) {
    const [, update] = useArgs<ApplicationsBoardPageProps>();
    return (
      <ApplicationsBoardPage
        {...args}
        onNewApplication={() => { args.onNewApplication?.(); update({ formOpen: true }); }}
        onCloseForm={() => { args.onCloseForm?.(); update({ formOpen: false }); }}
        onViewChange={(v) => { args.onViewChange?.(v); update({ view: v }); }}
        form={{ ...args.form, onFieldChange: (f, v) => { args.form.onFieldChange?.(f, v); update({ form: { ...args.form, draft: { ...args.form.draft, [f]: v } as ApplicationDraft } }); } }}
      />
    );
  },
} satisfies Meta<typeof ApplicationsBoardPage>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Board: Story = {};
export const ManualApplication: Story = { name: 'Candidatura manual (drawer aberto)', args: { formOpen: true } };
