import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = { title: 'Atoms/Badge', component: Badge, args: { children: 'NOVA', tone: 'dark' } } satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const New: Story = {};
export const NewCount: Story = { args: { children: '+14 novas', tone: 'primary', mono: true, shape: 'pill' } };
export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      {(['neutral', 'primary', 'info', 'warning', 'danger', 'violet', 'dark'] as const).map((t) => (
        <Badge key={t} tone={t}>{t}</Badge>
      ))}
    </div>
  ),
};
