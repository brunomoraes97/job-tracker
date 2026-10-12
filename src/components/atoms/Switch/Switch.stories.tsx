import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Switch } from './Switch';

const meta = { title: 'Atoms/Switch', component: Switch, args: { checked: true, label: 'Ativa', showLabel: true, onChange: fn() } } satisfies Meta<typeof Switch>;
export default meta;
type Story = StoryObj<typeof meta>;
export const On: Story = {};
export const Off: Story = { args: { checked: false, label: 'Pausada' } };
