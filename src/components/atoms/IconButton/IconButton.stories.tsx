import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { iconNames } from '../Icon';
import { IconButton } from './IconButton';

const meta = {
  title: 'Atoms/IconButton',
  component: IconButton,
  args: { icon: 'close', label: 'Fechar', onClick: fn() },
  argTypes: { icon: { control: 'select', options: iconNames } },
} satisfies Meta<typeof IconButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Outline: Story = {};
export const Ghost: Story = { args: { variant: 'ghost', icon: 'undo', label: 'Desfazer', size: 'sm' } };
export const Primary: Story = { args: { variant: 'primary', icon: 'arrowUp', label: 'Enviar ajuste' } };
