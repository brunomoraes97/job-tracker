import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { defaultDorkFields, dorkSites, dorkTemplates, recencyOptions } from '@/mocks/fixtures';
import type { DorkFields } from '@/types';
import { DorkBuilderForm } from './DorkBuilderForm';

const meta = {
  title: 'Organisms/DorkBuilderForm',
  component: DorkBuilderForm,
  args: { fields: defaultDorkFields, sites: dorkSites, templates: dorkTemplates, recencyOptions, onChange: fn(), onApplyTemplate: fn() },
  decorators: [(S) => <div style={{ width: 500 }}><S /></div>],
  render: function Render(args) {
    const [{ fields }, update] = useArgs<{ fields: DorkFields }>();
    return (
      <DorkBuilderForm
        {...args}
        fields={fields}
        onChange={(patch) => { args.onChange?.(patch); update({ fields: { ...fields, ...patch } }); }}
        onApplyTemplate={(t) => { args.onApplyTemplate?.(t); update({ fields: { ...fields, ...t.fields } }); }}
      />
    );
  },
} satisfies Meta<typeof DorkBuilderForm>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
