import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { documentBlocks, templateOptions } from '@/mocks/fixtures';
import { StudioSourcePanel } from './StudioSourcePanel';

const meta = { title: 'Organisms/StudioSourcePanel', component: StudioSourcePanel, args: { sourceLabel: 'Currículo base v4', blocks: documentBlocks, keywordsCovered: 11, keywordsTotal: 13, template: 'classic', templateOptions, onOpenSource: fn(), onToggleBlock: fn(), onTemplateChange: fn() }, decorators: [(S) => <div style={{ width: 268 }}><S /></div>] } satisfies Meta<typeof StudioSourcePanel>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
