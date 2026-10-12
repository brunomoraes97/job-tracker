import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { buildDork } from '@/lib/dork';
import { defaultDorkFields, dorkSites } from '@/mocks/fixtures';
import { DorkResultPanel } from './DorkResultPanel';

const now = new Date('2026-09-28T12:00:00Z');
const result = buildDork(defaultDorkFields, dorkSites, now);
const long = buildDork({ ...defaultDorkFields, keywords: Array.from({ length: 30 }, (_, i) => `termo${i}`).join(', ') }, dorkSites, now);

const meta = { title: 'Organisms/DorkResultPanel', component: DorkResultPanel, args: { result, copied: false, onCopy: fn(), onOpenGoogle: fn(), onSaveAsSearch: fn() }, decorators: [(S) => <div style={{ width: 640 }}><S /></div>] } satisfies Meta<typeof DorkResultPanel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Copied: Story = { args: { copied: true } };
export const OverLimit: Story = { args: { result: long } };
export const Empty: Story = { args: { result: { query: '', parts: [], wordCount: 0, overLimit: false, googleUrl: '' } } };
