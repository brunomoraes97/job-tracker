import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './Text';

const meta = { title: 'Atoms/Text', component: Text, args: { children: '23 novas desde ontem · 7 com match acima de 80%', variant: 'body', color: 'muted' } } satisfies Meta<typeof Text>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Body: Story = {};
export const Mono: Story = { args: { variant: 'mono', children: 'US$ 110–140k · Greenhouse · há 2 h' } };
export const Metric: Story = { args: { variant: 'metric', color: 'primary', children: '94%' } };
