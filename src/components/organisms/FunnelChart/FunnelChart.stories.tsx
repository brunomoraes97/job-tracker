import type { Meta, StoryObj } from '@storybook/react-vite';
import { funnel } from '@/mocks/fixtures';
import { FunnelChart } from './FunnelChart';

const meta = { title: 'Organisms/FunnelChart', component: FunnelChart, args: { steps: funnel }, decorators: [(S) => <div style={{ width: 700 }}><S /></div>] } satisfies Meta<typeof FunnelChart>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
