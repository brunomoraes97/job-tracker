import type { Meta, StoryObj } from '@storybook/react-vite';
import { skillGroups } from '@/mocks/fixtures';
import { SkillsPanel } from './SkillsPanel';

const meta = { title: 'Organisms/SkillsPanel', component: SkillsPanel, args: { groups: skillGroups }, decorators: [(S) => <div style={{ width: 380 }}><S /></div>] } satisfies Meta<typeof SkillsPanel>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
