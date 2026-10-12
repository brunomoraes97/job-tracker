import type { Meta, StoryObj } from '@storybook/react-vite';
import { coverLetter } from '@/mocks/fixtures';
import { CoverLetterDocument } from './CoverLetterDocument';

const meta = { title: 'Organisms/CoverLetterDocument', component: CoverLetterDocument, args: { data: coverLetter, width: 520 } } satisfies Meta<typeof CoverLetterDocument>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
