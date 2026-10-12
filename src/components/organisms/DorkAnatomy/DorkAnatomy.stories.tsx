import type { Meta, StoryObj } from '@storybook/react-vite';
import { buildDork } from '@/lib/dork';
import { defaultDorkFields, dorkSites } from '@/mocks/fixtures';
import { DorkAnatomy } from './DorkAnatomy';

const meta = { title: 'Organisms/DorkAnatomy', component: DorkAnatomy, args: { parts: buildDork(defaultDorkFields, dorkSites).parts }, decorators: [(S) => <div style={{ width: 640 }}><S /></div>] } satisfies Meta<typeof DorkAnatomy>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
