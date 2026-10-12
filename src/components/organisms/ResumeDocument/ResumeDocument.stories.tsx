import type { Meta, StoryObj } from '@storybook/react-vite';
import { resumeDocument } from '@/mocks/fixtures';
import { ResumeDocument } from './ResumeDocument';

const meta = { title: 'Organisms/ResumeDocument', component: ResumeDocument, args: { data: resumeDocument, width: 520, showHighlights: true }, argTypes: { width: { control: { type: 'range', min: 320, max: 800, step: 20 } } } } satisfies Meta<typeof ResumeDocument>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Highlighted: Story = {};
export const Clean: Story = { args: { showHighlights: false } };
