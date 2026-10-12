import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar';

const meta = { title: 'Atoms/ProgressBar', component: ProgressBar, args: { value: 85, label: 'Palavras-chave cobertas', size: 'sm' }, argTypes: { value: { control: { type: 'range', min: 0, max: 100 } } }, decorators: [(S) => <div style={{ width: 280 }}><S /></div>] } satisfies Meta<typeof ProgressBar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Funnel: Story = { args: { size: 'lg', value: 29 } };
export const LowMatch: Story = { args: { tone: 'match-low', value: 58 } };
