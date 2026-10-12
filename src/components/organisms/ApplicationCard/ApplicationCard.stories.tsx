import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { applications, stages } from '@/mocks/fixtures';
import { ApplicationCard } from './ApplicationCard';

const meta = { title: 'Organisms/ApplicationCard', component: ApplicationCard, args: { application: applications[0]!, onOpen: fn() }, decorators: [(S) => <div style={{ width: 212 }}><S /></div>] } satisfies Meta<typeof ApplicationCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Overdue: Story = { args: { application: applications[2]! } };
export const Movable: Story = { args: { moveOptions: stages, onMove: fn() } };
