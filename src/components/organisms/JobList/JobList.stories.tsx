import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { jobs } from '@/mocks/fixtures';
import { JobList } from './JobList';

const meta = {
  title: 'Organisms/JobList',
  component: JobList,
  parameters: { layout: 'padded' },
  args: { jobs, selectedId: 'j1', totalLabel: '23 resultados', sortLabel: 'match com seu currículo', sourcesLabel: 'Fontes: LinkedIn, Greenhouse, Lever, Wellfound, Remote OK', onSelectJob: fn() },
  render: function Render(args) {
    const [, update] = useArgs();
    return <JobList {...args} onSelectJob={(id) => { args.onSelectJob?.(id); update({ selectedId: id }); }} />;
  },
} satisfies Meta<typeof JobList>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Empty: Story = { args: { jobs: [], totalLabel: '0 resultados' } };
