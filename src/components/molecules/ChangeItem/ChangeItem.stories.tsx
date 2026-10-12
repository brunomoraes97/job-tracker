import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ChangeItem } from './ChangeItem';

const meta = { title: 'Molecules/ChangeItem', component: ChangeItem, args: { id: 'c1', kind: 'add', title: 'Resumo reescrito', description: 'Foco em Go na AWS e trabalho remoto com time dos EUA.', onUndo: fn() }, decorators: [(S) => <div style={{ width: 300 }}><S /></div>] } satisfies Meta<typeof ChangeItem>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Added: Story = {};
export const Moved: Story = { args: { kind: 'move', title: 'BamBams no topo', description: 'Bullets de ECS/Lambda/API Gateway primeiro.' } };
export const Cut: Story = { args: { kind: 'cut', title: 'Suporte condensado', description: '3 empresas agrupadas em uma linha.' } };
