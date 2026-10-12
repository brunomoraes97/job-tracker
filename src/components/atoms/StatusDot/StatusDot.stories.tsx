import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusDot } from './StatusDot';

const meta = { title: 'Atoms/StatusDot', component: StatusDot, args: { stage: 'applied', size: 12 } } satisfies Meta<typeof StatusDot>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
