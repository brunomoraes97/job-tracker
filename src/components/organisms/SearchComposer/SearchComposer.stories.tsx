import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { frequencyOptions, parsedCriteria, searchDescription, searchSources, thresholdOptions } from '@/mocks/fixtures';
import type { ToggleOption } from '@/types';
import { SearchComposer } from './SearchComposer';

const dork = '(site:boards.greenhouse.io OR site:jobs.lever.co OR site:jobs.ashbyhq.com) ("Senior Backend Engineer" OR "Platform Engineer") golang AWS (remote OR LATAM OR contractor) -hybrid -"security clearance"';

const meta = {
  title: 'Organisms/SearchComposer',
  component: SearchComposer,
  args: {
    description: searchDescription, criteria: parsedCriteria, dork, sources: searchSources,
    frequency: '6h', frequencyOptions, threshold: '80', thresholdOptions,
    onDescriptionChange: fn(), onConvertToDork: fn(), onLearnDorking: fn(), onOpenGenerator: fn(), onToggleSource: fn(), onFrequencyChange: fn(), onThresholdChange: fn(), onTest: fn(), onSave: fn(),
  },
  decorators: [(S) => <div style={{ width: 470, height: 1000, display: 'flex' }}><S /></div>],
  render: function Render(args) {
    const [, update] = useArgs();
    return (
      <SearchComposer
        {...args}
        onDescriptionChange={(v) => { args.onDescriptionChange?.(v); update({ description: v }); }}
        onToggleSource={(id, c) => { args.onToggleSource?.(id, c); update({ sources: args.sources.map((s: ToggleOption) => (s.id === id ? { ...s, checked: c } : s)) }); }}
        onFrequencyChange={(v) => { args.onFrequencyChange?.(v); update({ frequency: v }); }}
        onThresholdChange={(v) => { args.onThresholdChange?.(v); update({ threshold: v }); }}
      />
    );
  },
} satisfies Meta<typeof SearchComposer>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Interpreted: Story = {};
export const BeforeConversion: Story = { args: { criteria: [], dork: '' } };
export const Empty: Story = { args: { description: '', criteria: [], dork: '' } };
export const Converting: Story = { args: { criteria: [], dork: '', converting: true } };
