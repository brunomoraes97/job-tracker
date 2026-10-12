import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { dorkSites, jobFilters } from '@/mocks/fixtures';
import { ChipGroup, type ChipGroupItem } from './ChipGroup';

const meta = {
  title: 'Molecules/ChipGroup',
  component: ChipGroup,
  args: { label: 'Filtros', items: jobFilters, onToggle: fn() },
  render: function Render(args) {
    const [, update] = useArgs();
    return (
      <ChipGroup
        {...args}
        onToggle={(id, selected) => {
          args.onToggle?.(id, selected);
          update({ items: args.items.map((i: ChipGroupItem) => (i.id === id ? { ...i, selected } : i)) });
        }}
      />
    );
  },
} satisfies Meta<typeof ChipGroup>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Filters: Story = {};
export const Sites: Story = { args: { label: 'Onde buscar', kind: 'checkbox', items: dorkSites.map((s, i) => ({ id: s.id, label: s.label, selected: i < 3 })) }, decorators: [(S) => <div style={{ width: 460 }}><S /></div>] };
