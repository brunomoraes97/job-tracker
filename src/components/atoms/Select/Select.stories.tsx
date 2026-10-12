import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Select } from './Select';

const meta = {
  title: 'Atoms/Select',
  component: Select,
  args: {
    value: '7',
    'aria-label': 'Publicadas',
    onChange: fn(),
    options: [
      { value: 'any', label: 'Qualquer data' },
      { value: '1', label: 'Últimas 24 horas' },
      { value: '7', label: 'Últimos 7 dias' },
      { value: '30', label: 'Últimos 30 dias' },
    ],
  },
  decorators: [(S) => <div style={{ width: 260 }}><S /></div>],
} satisfies Meta<typeof Select>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
