import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { frequencyOptions, parsedCriteria, savedSearches, searchDescription, searchSources, sidebarProps, thresholdOptions } from '@/mocks/fixtures';
import type { SavedSearch } from '@/types';
import { AutoSearchPage, type AutoSearchPageProps } from './AutoSearchPage';

const meta = {
  title: 'Pages/Buscas automatizadas',
  component: AutoSearchPage,
  parameters: { layout: 'fullscreen' },
  args: {
    sidebar: { ...sidebarProps, activeId: 'searches', onNavigate: fn() },
    subtitle: '5 buscas · 4 ativas · rodam sozinhas e alimentam Novas vagas',
    searches: savedSearches,
    composer: {
      description: searchDescription, criteria: parsedCriteria,
      dork: '(site:boards.greenhouse.io OR site:jobs.lever.co OR site:jobs.ashbyhq.com) ("Senior Backend Engineer" OR "Platform Engineer") golang AWS (remote OR LATAM OR contractor) -hybrid -"security clearance"',
      sources: searchSources, frequency: '6h', frequencyOptions, threshold: '80', thresholdOptions,
      onDescriptionChange: fn(), onConvertToDork: fn(), onLearnDorking: fn(), onOpenGenerator: fn(), onToggleSource: fn(), onFrequencyChange: fn(), onThresholdChange: fn(), onTest: fn(), onSave: fn(),
    },
    onOpenGenerator: fn(), onToggleActive: fn(), onViewResults: fn(), onEditDork: fn(), onRunNow: fn(),
  },
  render: function Render(args) {
    const [, update] = useArgs<AutoSearchPageProps>();
    return (
      <AutoSearchPage
        {...args}
        onToggleActive={(id, a) => { args.onToggleActive?.(id, a); update({ searches: args.searches.map((s: SavedSearch) => (s.id === id ? { ...s, active: a } : s)) }); }}
        composer={{ ...args.composer, onDescriptionChange: (v) => { args.composer.onDescriptionChange?.(v); update({ composer: { ...args.composer, description: v } }); } }}
      />
    );
  },
} satisfies Meta<typeof AutoSearchPage>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const FirstSearch: Story = { name: 'Primeira busca (vazio)', args: { searches: [], subtitle: 'Nenhuma busca ainda', composer: { ...meta.args.composer, description: '', criteria: [], dork: '' } } };
