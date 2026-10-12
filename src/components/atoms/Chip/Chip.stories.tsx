import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Chip } from './Chip';

const meta = { title: 'Atoms/Chip', component: Chip, args: { label: 'Remoto', selected: true, onToggle: fn() } } satisfies Meta<typeof Chip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {};
export const Unselected: Story = { args: { selected: false, label: 'Fuso EUA/Europa' } };
export const Checkbox: Story = { args: { kind: 'checkbox', label: 'Greenhouse' } };
export const Small: Story = { args: { size: 'sm', selected: false, label: 'Mais curto' } };
