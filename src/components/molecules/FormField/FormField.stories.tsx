import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { FormField } from './FormField';

const meta = {
  title: 'Molecules/FormField',
  component: FormField,
  decorators: [(S) => <div style={{ width: 380 }}><S /></div>],
  args: { label: 'Palavras-chave obrigatórias', hint: 'Dica: “golang” evita resultados sobre o jogo Go.', children: <Input value="golang, AWS" onChange={fn()} /> },
} satisfies Meta<typeof FormField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const WithHint: Story = {};
export const WithError: Story = { args: { label: 'Empresa', hint: undefined, error: 'Informe a empresa.', children: <Input value="" invalid onChange={fn()} /> } };
export const MutedLabel: Story = { args: { label: 'Fonte', labelStyle: 'muted', hint: undefined, children: <Select value="linkedin" options={[{ value: 'linkedin', label: 'LinkedIn' }]} onChange={fn()} /> } };
