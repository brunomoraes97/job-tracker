import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { experiences } from '@/mocks/fixtures';
import { ExperienceCard } from './ExperienceCard';

const meta = { title: 'Organisms/ExperienceCard', component: ExperienceCard, args: { experience: experiences[0]!, onEdit: fn() }, decorators: [(S) => <div style={{ width: 720 }}><S /></div>] } satisfies Meta<typeof ExperienceCard>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
