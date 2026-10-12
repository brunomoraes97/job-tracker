import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { applications, stages } from '@/mocks/fixtures';
import { KanbanBoard } from './KanbanBoard';

const meta = { title: 'Organisms/KanbanBoard', component: KanbanBoard, parameters: { layout: 'padded' }, args: { stages, applications, counts: { saved: 4, applied: 7, talking: 3, interview: 3, offer: 1 }, onOpenApplication: fn() } } satisfies Meta<typeof KanbanBoard>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
