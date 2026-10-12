import type { Meta, StoryObj } from '@storybook/react-vite';
import { Monogram } from './Monogram';

const meta = { title: 'Atoms/Monogram', component: Monogram, args: { letters: 'LF', tint: 'teal', size: 'md' } } satisfies Meta<typeof Monogram>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Tints: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      {(['teal', 'amber', 'violet', 'stone'] as const).map((t) => <Monogram key={t} {...args} tint={t} />)}
    </div>
  ),
};
