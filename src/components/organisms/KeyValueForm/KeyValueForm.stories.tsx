import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { searchPreferences } from '@/mocks/fixtures';
import type { KeyValue } from '@/types';
import { KeyValueForm } from './KeyValueForm';

const meta = {
  title: 'Organisms/KeyValueForm',
  component: KeyValueForm,
  args: { label: 'Preferências de busca', items: searchPreferences, submitLabel: 'Salvar preferências', onChange: fn(), onSubmit: fn(), onCancel: fn() },
  decorators: [(S) => <div style={{ width: 384 }}><S /></div>],
  render: function Render(args) {
    const [, update] = useArgs();
    return <KeyValueForm {...args} onChange={(id, v) => { args.onChange?.(id, v); update({ items: args.items.map((i: KeyValue) => (i.id === id ? { ...i, value: v } : i)) }); }} />;
  },
} satisfies Meta<typeof KeyValueForm>;
export default meta;
export const Preferences: StoryObj<typeof meta> = {};
