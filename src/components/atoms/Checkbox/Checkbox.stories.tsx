import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Checkbox } from './Checkbox';

const meta = { title: 'Atoms/Checkbox', component: Checkbox, args: { checked: true, label: 'BamBams', description: 'Go · AWS', onChange: fn() }, decorators: [(S) => <div style={{ width: 280 }}><S /></div>] } satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Checked: Story = {};
export const Unchecked: Story = { args: { checked: false, label: 'Projetos de agentes de IA', description: 'opcional' } };
export const DescriptionBelow: Story = { args: { descriptionPosition: 'below', description: 'reescrito para a vaga', label: 'Resumo' } };
