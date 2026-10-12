import type { Meta, StoryObj } from '@storybook/react-vite';
import { FitBar } from './FitBar';

const meta = { title: 'Molecules/FitBar', component: FitBar, args: { label: 'Stack técnica', value: 92 }, argTypes: { value: { control: { type: 'range', min: 0, max: 100 } } }, decorators: [(S) => <div style={{ width: 390 }}><S /></div>] } satisfies Meta<typeof FitBar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Inline: Story = {};
export const Stacked: Story = { args: { layout: 'stacked' } };
