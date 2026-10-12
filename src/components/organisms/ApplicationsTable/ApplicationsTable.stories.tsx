import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { applications } from '@/mocks/fixtures';
import { stageLabels } from '@/lib/stages';
import { ApplicationsTable, type ApplicationSort } from './ApplicationsTable';

const meta = {
  title: 'Organisms/ApplicationsTable',
  component: ApplicationsTable,
  parameters: { layout: 'padded' },
  args: { applications: applications.filter((a) => a.appliedOn), stageLabels, sort: { key: 'appliedOn', direction: 'desc' }, onSortChange: fn(), onOpenDocuments: fn() },
  render: function Render(args) {
    const [, update] = useArgs();
    return <ApplicationsTable {...args} onSortChange={(s: ApplicationSort) => { args.onSortChange?.(s); update({ sort: s }); }} />;
  },
} satisfies Meta<typeof ApplicationsTable>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
