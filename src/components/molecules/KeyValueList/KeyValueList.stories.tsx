import type { Meta, StoryObj } from '@storybook/react-vite';
import { searchPreferences } from '@/mocks/fixtures';
import { KeyValueList } from './KeyValueList';

const meta = { title: 'Molecules/KeyValueList', component: KeyValueList, args: { items: searchPreferences }, decorators: [(S) => <div style={{ width: 336 }}><S /></div>] } satisfies Meta<typeof KeyValueList>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
