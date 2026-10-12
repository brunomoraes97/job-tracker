import type { Meta, StoryObj } from '@storybook/react-vite';
import { buildDork } from '@/lib/dork';
import { defaultDorkFields, dorkSites } from '@/mocks/fixtures';
import { DorkQuery } from './DorkQuery';

const { parts } = buildDork(defaultDorkFields, dorkSites, new Date('2026-09-28T12:00:00Z'));

const meta = { title: 'Molecules/DorkQuery', component: DorkQuery, args: { parts }, decorators: [(S) => <div style={{ width: 640, padding: 20, background: '#1C1B19', borderRadius: 14 }}><S /></div>] } satisfies Meta<typeof DorkQuery>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Small: Story = { args: { size: 'sm' } };
export const Empty: Story = { args: { parts: [] } };
