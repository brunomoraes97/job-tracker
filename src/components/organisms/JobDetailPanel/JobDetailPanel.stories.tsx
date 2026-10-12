import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { jobs } from '@/mocks/fixtures';
import { JobDetailPanel } from './JobDetailPanel';

const meta = { title: 'Organisms/JobDetailPanel', component: JobDetailPanel, args: { job: jobs[0]!, resumeLabel: 'Currículo base v4', onGenerate: fn(), onSave: fn(), onDiscard: fn(), onOpenDescription: fn() } } satisfies Meta<typeof JobDetailPanel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Minimal: Story = { args: { job: jobs[2]! } };
