import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { jobs, languageOptions, templateOptions, toneOptions } from '@/mocks/fixtures';
import type { ToggleOption } from '@/types';
import { GenerationSettings } from './GenerationSettings';

const meta = {
  title: 'Organisms/GenerationSettings',
  component: GenerationSettings,
  args: {
    language: 'en', languageOptions, tone: 'direct', toneOptions, template: 'classic', templateOptions,
    experiences: [
      { id: 'x1', label: 'BamBams', description: 'Go · AWS', checked: true },
      { id: 'x2', label: 'Multilogin', description: 'Python · Java', checked: true },
      { id: 'x3', label: 'Saaspro', description: 'FastAPI', checked: true },
      { id: 'x4', label: 'Suporte & onboarding', description: 'agrupado', checked: true },
      { id: 'x5', label: 'Projetos de agentes de IA', description: 'opcional', checked: false },
    ],
    keywordsHit: jobs[0]!.keywordsHit!, keywordsMissing: jobs[0]!.keywordsMissing!,
    onLanguageChange: fn(), onToneChange: fn(), onTemplateChange: fn(), onToggleExperience: fn(), onReviewSkills: fn(), onRegenerate: fn(),
  },
  decorators: [(S) => <div style={{ width: 326, height: 900, display: 'flex' }}><S /></div>],
  render: function Render(args) {
    const [, update] = useArgs();
    return (
      <GenerationSettings
        {...args}
        onLanguageChange={(v) => { args.onLanguageChange?.(v); update({ language: v }); }}
        onToneChange={(v) => { args.onToneChange?.(v); update({ tone: v }); }}
        onTemplateChange={(v) => { args.onTemplateChange?.(v); update({ template: v }); }}
        onToggleExperience={(id, c) => { args.onToggleExperience?.(id, c); update({ experiences: args.experiences.map((e: ToggleOption) => (e.id === id ? { ...e, checked: c } : e)) }); }}
      />
    );
  },
} satisfies Meta<typeof GenerationSettings>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Regenerating: Story = { args: { regenerating: true } };
