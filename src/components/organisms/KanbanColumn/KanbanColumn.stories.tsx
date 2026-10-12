import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { applications, stages } from '@/mocks/fixtures';
import { KanbanColumn } from './KanbanColumn';

const meta = { title: 'Organisms/KanbanColumn', component: KanbanColumn, args: { stage: stages[1]!, applications: applications.filter((a) => a.stage === 'applied'), onOpenApplication: fn() } } satisfies Meta<typeof KanbanColumn>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Applied: Story = {};
export const Empty: Story = { args: { stage: stages[4]!, applications: [] } };
