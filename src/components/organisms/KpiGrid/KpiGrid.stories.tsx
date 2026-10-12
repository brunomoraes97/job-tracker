import type { Meta, StoryObj } from '@storybook/react-vite';
import { kpis } from '@/mocks/fixtures';
import { KpiGrid } from './KpiGrid';

const meta = { title: 'Organisms/KpiGrid', component: KpiGrid, parameters: { layout: 'padded' }, args: { kpis } } satisfies Meta<typeof KpiGrid>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
