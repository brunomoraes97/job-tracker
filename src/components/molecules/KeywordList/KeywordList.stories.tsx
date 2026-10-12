import type { Meta, StoryObj } from '@storybook/react-vite';
import { jobs } from '@/mocks/fixtures';
import { KeywordList } from './KeywordList';

const meta = { title: 'Molecules/KeywordList', component: KeywordList, args: { hits: jobs[0]!.keywordsHit!, misses: jobs[0]!.keywordsMissing }, decorators: [(S) => <div style={{ width: 400 }}><S /></div>] } satisfies Meta<typeof KeywordList>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Compact: Story = { args: { missSuffix: '' } };
