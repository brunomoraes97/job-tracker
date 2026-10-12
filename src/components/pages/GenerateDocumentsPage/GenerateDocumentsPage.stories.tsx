import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { coverLetter, jobs, languageOptions, resumeDocument, sidebarProps, templateOptions, toneOptions } from '@/mocks/fixtures';
import { GenerateDocumentsPage } from './GenerateDocumentsPage';

const meta = {
  title: 'Pages/Gerar documentos',
  component: GenerateDocumentsPage,
  parameters: { layout: 'fullscreen' },
  args: {
    sidebar: { ...sidebarProps, activeId: 'studio', onNavigate: fn() },
    breadcrumbs: [{ label: 'Novas vagas', href: '#jobs' }, { label: 'Lumen Freight — Senior Backend Engineer (Go)' }],
    subtitle: 'Versão 2 de 2 · gerada há 1 min a partir do Currículo base v4 · 11 de 13 palavras-chave cobertas',
    settings: {
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
    view: 'both', resume: resumeDocument, coverLetter,
    onViewChange: fn(), onOpenStudio: fn(), onAttach: fn(), onDownload: fn(),
  },
  render: function Render(args) {
    const [, update] = useArgs();
    return <GenerateDocumentsPage {...args} onViewChange={(v) => { args.onViewChange?.(v); update({ view: v }); }} />;
  },
} satisfies Meta<typeof GenerateDocumentsPage>;
export default meta;
type Story = StoryObj<typeof meta>;
export const SideBySide: Story = {};
export const ResumeOnly: Story = { args: { view: 'resume' } };
