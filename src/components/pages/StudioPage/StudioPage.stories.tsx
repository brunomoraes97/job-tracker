import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { coverLetter, documentBlocks, quickAdjustments, resumeChanges, resumeDocument, sidebarProps, templateOptions } from '@/mocks/fixtures';
import type { ResumeChange, ToggleOption } from '@/types';
import { StudioPage, type StudioPageProps } from './StudioPage';

const meta = {
  title: 'Pages/Estúdio de currículo',
  component: StudioPage,
  parameters: { layout: 'fullscreen' },
  args: {
    sidebar: { ...sidebarProps, activeId: 'studio', onNavigate: fn() },
    breadcrumbs: [{ label: 'Novas vagas', href: '#jobs' }, { label: 'Lumen Freight — Senior Backend Engineer (Go)', href: '#jobs/j1' }, { label: 'Estúdio' }],
    subtitle: 'Versão 3 · baseada no Currículo base v4 · 5 mudanças para esta vaga',
    versions: ['v1', 'v2', 'v3'], activeVersion: 'v3', document: 'resume',
    source: { sourceLabel: 'Currículo base v4', blocks: documentBlocks, keywordsCovered: 11, keywordsTotal: 13, template: 'classic', templateOptions, onOpenSource: fn(), onToggleBlock: fn(), onTemplateChange: fn() },
    changes: { changes: resumeChanges, quickAdjustments, adjustment: '', onUndo: fn(), onAdjustmentChange: fn(), onQuickAdjust: fn(), onSubmitAdjustment: fn() },
    resume: resumeDocument, coverLetter,
    onVersionChange: fn(), onDocumentChange: fn(), onAttach: fn(), onDownload: fn(),
  },
  render: function Render(args) {
    const [, update] = useArgs<StudioPageProps>();
    return (
      <StudioPage
        {...args}
        onVersionChange={(v) => { args.onVersionChange?.(v); update({ activeVersion: v }); }}
        onDocumentChange={(d) => { args.onDocumentChange?.(d); update({ document: d }); }}
        source={{ ...args.source, onToggleBlock: (id, c) => { args.source.onToggleBlock?.(id, c); update({ source: { ...args.source, blocks: args.source.blocks.map((b: ToggleOption) => (b.id === id ? { ...b, checked: c } : b)) } }); }, onTemplateChange: (t) => { args.source.onTemplateChange?.(t); update({ source: { ...args.source, template: t } }); } }}
        changes={{
          ...args.changes,
          onAdjustmentChange: (v) => { args.changes.onAdjustmentChange?.(v); update({ changes: { ...args.changes, adjustment: v } }); },
          onUndo: (id) => { args.changes.onUndo?.(id); update({ changes: { ...args.changes, changes: args.changes.changes.filter((c: ResumeChange) => c.id !== id) } }); },
        }}
      />
    );
  },
} satisfies Meta<typeof StudioPage>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Resume: Story = {};
export const CoverLetter: Story = { args: { document: 'coverLetter' } };
