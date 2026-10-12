import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { personalInfo } from '@/mocks/fixtures';
import type { PersonalInfo } from '@/types';
import { PersonalInfoForm } from './PersonalInfoForm';

const meta = {
  title: 'Organisms/PersonalInfoForm',
  component: PersonalInfoForm,
  args: { value: personalInfo, onFieldChange: fn() },
  decorators: [(S) => <div style={{ width: 760 }}><S /></div>],
  render: function Render(args) {
    const [{ value }, update] = useArgs<{ value: PersonalInfo }>();
    return <PersonalInfoForm {...args} value={value} onFieldChange={(f, v) => { args.onFieldChange?.(f, v); update({ value: { ...value, [f]: v } }); }} />;
  },
} satisfies Meta<typeof PersonalInfoForm>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
