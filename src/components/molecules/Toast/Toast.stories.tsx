import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Toast } from './Toast';

const meta = { title: 'Molecules/Toast', component: Toast, args: { message: 'Vaga salva no tracker em “Salvas”.', tone: 'success', actionLabel: 'Ver candidaturas', onAction: fn(), onDismiss: fn() } } satisfies Meta<typeof Toast>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Success: Story = {};
export const Info: Story = { args: { tone: 'info', message: 'Documentos regenerados (v3).', actionLabel: undefined } };
export const Reminder: Story = { args: { tone: 'warning', message: 'Follow-up atrasado: Kiln Pay — 1 dia.', actionLabel: 'Marcar como feito' } };
