import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { OptionCard } from './OptionCard';

const meta = { title: 'Molecules/OptionCard', component: OptionCard, args: { name: 'docs', value: 'generate', title: 'Gerar agora', description: 'CV + carta sob medida, abre no Estúdio', checked: true, onSelect: fn() }, decorators: [(S) => <div style={{ width: 190 }}><S /></div>] } satisfies Meta<typeof OptionCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Checked: Story = {};
export const Unchecked: Story = { args: { checked: false, value: 'base', title: 'Currículo base', description: 'PDF padrão da v4' } };
