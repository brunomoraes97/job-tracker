import type { Meta, StoryObj } from '@storybook/react-vite';
import { FunnelRow } from './FunnelRow';

const meta = { title: 'Molecules/FunnelRow', component: FunnelRow, args: { label: 'Com resposta', count: 7, total: 24 }, decorators: [(S) => <div style={{ width: 520 }}><S /></div>] } satisfies Meta<typeof FunnelRow>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
