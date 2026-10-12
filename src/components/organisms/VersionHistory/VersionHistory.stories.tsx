import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { resumeVersions } from '@/mocks/fixtures';
import { VersionHistory } from './VersionHistory';

const meta = { title: 'Organisms/VersionHistory', component: VersionHistory, args: { versions: resumeVersions, onRestore: fn() }, decorators: [(S) => <div style={{ width: 384 }}><S /></div>] } satisfies Meta<typeof VersionHistory>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Restoring: Story = { args: { restoringId: 'v3' } };
