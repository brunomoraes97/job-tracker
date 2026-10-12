import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { experiences } from '@/mocks/fixtures';
import { ExperienceForm, type ExperienceDraft } from './ExperienceForm';

const x = experiences[0]!;
const draft: ExperienceDraft = { role: x.role, company: x.company, location: x.location, period: x.period, bullets: x.bullets.join('\n'), tags: x.tags.join(', ') };

const meta = {
  title: 'Organisms/ExperienceForm',
  component: ExperienceForm,
  args: { value: draft, mode: 'edit', onFieldChange: fn(), onSubmit: fn(), onCancel: fn(), onDelete: fn() },
  decorators: [(S) => <div style={{ width: 384 }}><S /></div>],
  render: function Render(args) {
    const [{ value }, update] = useArgs<{ value: ExperienceDraft }>();
    return <ExperienceForm {...args} value={value} onFieldChange={(f, v) => { args.onFieldChange?.(f, v); update({ value: { ...value, [f]: v } }); }} />;
  },
} satisfies Meta<typeof ExperienceForm>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Edit: Story = {};
export const Add: Story = { args: { mode: 'add', value: { role: '', company: '', location: '', period: '', bullets: '', tags: '' } } };
export const WithErrors: Story = { args: { mode: 'add', value: { role: '', company: '', location: '', period: '', bullets: '', tags: '' }, errors: { role: 'Informe o cargo.', company: 'Informe a empresa.' } } };
