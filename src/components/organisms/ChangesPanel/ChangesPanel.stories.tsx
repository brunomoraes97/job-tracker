import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { quickAdjustments, resumeChanges } from '@/mocks/fixtures';
import { ChangesPanel } from './ChangesPanel';

const meta = {
  title: 'Organisms/ChangesPanel',
  component: ChangesPanel,
  args: { changes: resumeChanges, quickAdjustments, adjustment: '', onUndo: fn(), onAdjustmentChange: fn(), onQuickAdjust: fn(), onSubmitAdjustment: fn() },
  decorators: [(S) => <div style={{ width: 300, height: 820, display: 'flex' }}><S /></div>],
  render: function Render(args) {
    const [, update] = useArgs();
    return <ChangesPanel {...args} onAdjustmentChange={(v) => { args.onAdjustmentChange?.(v); update({ adjustment: v }); }} />;
  },
} satisfies Meta<typeof ChangesPanel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const NoChanges: Story = { args: { changes: [] } };
