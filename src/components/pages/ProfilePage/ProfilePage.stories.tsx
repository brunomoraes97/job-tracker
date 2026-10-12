import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { education, experiences, generationRules, languages, personalInfo, searchPreferences, sidebarProps, skillGroups } from '@/mocks/fixtures';
import type { ToggleOption } from '@/types';
import { ProfilePage } from './ProfilePage';

const meta = {
  title: 'Pages/Currículo base',
  component: ProfilePage,
  parameters: { layout: 'fullscreen' },
  args: {
    sidebar: { ...sidebarProps, activeId: 'profile', onNavigate: fn() },
    subtitle: 'Versão 4 · editada em 12 set · fonte única para todo CV e cover letter gerados',
    nextVersionLabel: 'v5', personalInfo, experiences, education, languages, skills: skillGroups, preferences: searchPreferences, rules: generationRules,
    onPersonalInfoChange: fn(), onAddExperience: fn(), onEditExperience: fn(), onToggleRule: fn(), onEditPreferences: fn(), onImport: fn(), onOpenHistory: fn(), onSave: fn(),
  },
  render: function Render(args) {
    const [, update] = useArgs();
    return (
      <ProfilePage
        {...args}
        onPersonalInfoChange={(f, v) => { args.onPersonalInfoChange?.(f, v); update({ personalInfo: { ...args.personalInfo, [f]: v } }); }}
        onToggleRule={(id, c) => { args.onToggleRule?.(id, c); update({ rules: args.rules.map((r: ToggleOption) => (r.id === id ? { ...r, checked: c } : r)) }); }}
      />
    );
  },
} satisfies Meta<typeof ProfilePage>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
