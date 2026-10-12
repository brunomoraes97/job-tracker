import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { jobs } from '@/mocks/fixtures';
import { JobCard } from './JobCard';

const meta = { title: 'Organisms/JobCard', component: JobCard, args: { job: jobs[0]!, selected: true, onSelect: fn() }, decorators: [(S) => <div style={{ width: 680 }}><S /></div>] } satisfies Meta<typeof JobCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Selected: Story = {};
export const Default: Story = { args: { job: jobs[1]!, selected: false } };
export const LowMatch: Story = { args: { job: jobs[4]!, selected: false } };
