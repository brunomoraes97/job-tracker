import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { savedSearches } from '@/mocks/fixtures';
import { SavedSearchCard } from './SavedSearchCard';

const meta = {
  title: 'Organisms/SavedSearchCard',
  component: SavedSearchCard,
  args: { search: savedSearches[0]!, onToggleActive: fn(), onViewResults: fn(), onEditDork: fn(), onRunNow: fn() },
  decorators: [(S) => <div style={{ width: 680 }}><S /></div>],
  render: function Render(args) {
    const [, update] = useArgs();
    return <SavedSearchCard {...args} onToggleActive={(id, active) => { args.onToggleActive?.(id, active); update({ search: { ...args.search, active } }); }} />;
  },
} satisfies Meta<typeof SavedSearchCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Active: Story = {};
export const Paused: Story = { args: { search: savedSearches[4]! } };
export const Running: Story = { args: { running: true } };
