import type { Meta, StoryObj } from '@storybook/react-vite';
import { coverLetter, resumeDocument } from '@/mocks/fixtures';
import { DocumentPreview } from './DocumentPreview';

const meta = { title: 'Organisms/DocumentPreview', component: DocumentPreview, parameters: { layout: 'padded' }, args: { view: 'both', resume: resumeDocument, coverLetter } } satisfies Meta<typeof DocumentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const SideBySide: Story = {};
export const ResumeOnly: Story = { args: { view: 'resume' } };
export const CoverLetterOnly: Story = { args: { view: 'coverLetter' } };
