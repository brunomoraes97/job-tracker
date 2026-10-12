import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { buildDork } from '@/lib/dork';
import { defaultDorkFields, dorkOperators, dorkSites, dorkTemplates, recencyOptions, sidebarProps } from '@/mocks/fixtures';
import type { DorkFields } from '@/types';
import { DorkingPage, type DorkingPageProps } from './DorkingPage';

const meta = {
  title: 'Pages/Google Dorking',
  component: DorkingPage,
  parameters: { layout: 'fullscreen', docs: { description: { component: 'Story interativa: o “container” recompila o dork com `buildDork` a cada evento `onFieldsChange` — a página só apresenta.' } } },
  args: {
    sidebar: { ...sidebarProps, activeId: 'dorking', onNavigate: fn() },
    operators: dorkOperators, fields: defaultDorkFields, sites: dorkSites, templates: dorkTemplates, recencyOptions,
    result: buildDork(defaultDorkFields, dorkSites), copied: false,
    onFieldsChange: fn(), onApplyTemplate: fn(), onCopy: fn(), onOpenGoogle: fn(), onSaveAsSearch: fn(), onOpenSearches: fn(),
  },
  render: function Render(args) {
    const [, update] = useArgs<DorkingPageProps>();
    const apply = (fields: DorkFields) => update({ fields, result: buildDork(fields, args.sites), copied: false });
    return (
      <DorkingPage
        {...args}
        onFieldsChange={(patch) => { args.onFieldsChange?.(patch); apply({ ...args.fields, ...patch }); }}
        onApplyTemplate={(t) => { args.onApplyTemplate?.(t); apply({ ...args.fields, ...t.fields }); }}
        onCopy={(q) => { args.onCopy?.(q); void navigator.clipboard?.writeText(q).catch(() => {}); update({ copied: true }); }}
      />
    );
  },
} satisfies Meta<typeof DorkingPage>;
export default meta;
export const Interactive: StoryObj<typeof meta> = {};
