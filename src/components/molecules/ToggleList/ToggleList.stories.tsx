import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { documentBlocks, generationRules } from '@/mocks/fixtures';
import type { ToggleOption } from '@/types';
import { ToggleList } from './ToggleList';

const meta = {
  title: 'Molecules/ToggleList',
  component: ToggleList,
  args: { label: 'Blocos incluídos', items: documentBlocks, descriptionPosition: 'below', onToggle: fn() },
  decorators: [(S) => <div style={{ width: 300 }}><S /></div>],
  render: function Render(args) {
    const [, update] = useArgs();
    return <ToggleList {...args} onToggle={(id, checked) => { args.onToggle?.(id, checked); update({ items: args.items.map((i: ToggleOption) => (i.id === id ? { ...i, checked } : i)) }); }} />;
  },
} satisfies Meta<typeof ToggleList>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Blocks: Story = {};
export const Rules: Story = { args: { label: 'Regras de geração', hideLabel: true, items: generationRules, descriptionPosition: 'inline' }, decorators: [(S) => <div style={{ width: 340 }}><S /></div>] };
