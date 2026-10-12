import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { emptyDraft, sourceOptions, stageOptions } from '@/mocks/fixtures';
import type { ApplicationDraft } from '@/types';
import { ApplicationForm } from './ApplicationForm';

const meta = {
  title: 'Organisms/ApplicationForm',
  component: ApplicationForm,
  args: { draft: emptyDraft, stageOptions, sourceOptions, onFieldChange: fn(), onImport: fn(), onSubmit: fn(), onCancel: fn() },
  decorators: [(S) => <div style={{ width: 384 }}><S /></div>],
  render: function Render(args) {
    const [{ draft }, update] = useArgs<{ draft: ApplicationDraft }>();
    return (
      <ApplicationForm
        {...args}
        draft={draft}
        onFieldChange={(field, value) => {
          args.onFieldChange?.(field, value);
          update({ draft: { ...draft, [field]: value } });
        }}
      />
    );
  },
} satisfies Meta<typeof ApplicationForm>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Empty: Story = {};
export const WithErrors: Story = { args: { errors: { company: 'Informe a empresa.', role: 'Informe o cargo.' } } };
export const Importing: Story = { args: { draft: { ...emptyDraft, url: 'https://jobs.lever.co/acme/123' }, importing: true } };
