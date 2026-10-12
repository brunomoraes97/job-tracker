import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { alertChannels, frequencyOptions, thresholdOptions } from '@/mocks/fixtures';
import type { ToggleOption } from '@/types';
import { AlertSettingsForm } from './AlertSettingsForm';

const meta = {
  title: 'Organisms/AlertSettingsForm',
  component: AlertSettingsForm,
  args: { enabled: true, frequency: 'daily', frequencyOptions, threshold: '80', thresholdOptions, channels: alertChannels, onEnabledChange: fn(), onFrequencyChange: fn(), onThresholdChange: fn(), onToggleChannel: fn(), onSubmit: fn(), onCancel: fn() },
  decorators: [(S) => <div style={{ width: 384 }}><S /></div>],
  render: function Render(args) {
    const [, update] = useArgs();
    return (
      <AlertSettingsForm
        {...args}
        onEnabledChange={(v) => { args.onEnabledChange?.(v); update({ enabled: v }); }}
        onFrequencyChange={(v) => { args.onFrequencyChange?.(v); update({ frequency: v }); }}
        onThresholdChange={(v) => { args.onThresholdChange?.(v); update({ threshold: v }); }}
        onToggleChannel={(id, c) => { args.onToggleChannel?.(id, c); update({ channels: args.channels.map((ch: ToggleOption) => (ch.id === id ? { ...ch, checked: c } : ch)) }); }}
      />
    );
  },
} satisfies Meta<typeof AlertSettingsForm>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Enabled: Story = {};
export const Disabled: Story = { args: { enabled: false } };
