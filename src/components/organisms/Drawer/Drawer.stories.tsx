import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '@/components/atoms/Button';
import { Drawer } from './Drawer';

const meta = {
  title: 'Organisms/Drawer',
  component: Drawer,
  parameters: { layout: 'fullscreen' },
  args: { open: true, contained: true, title: 'Nova candidatura', subtitle: 'Para vagas que você achou fora do Radar.', children: <p>Conteúdo</p>, footer: <Button variant="primary" fullWidth>Salvar</Button>, onClose: fn() },
  decorators: [(S) => <div style={{ position: 'relative', height: 640 }}><S /></div>],
} satisfies Meta<typeof Drawer>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Open: Story = {};
export const Closed: Story = { args: { open: false } };
