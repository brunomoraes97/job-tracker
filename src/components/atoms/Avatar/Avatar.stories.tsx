import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta = { title: 'Atoms/Avatar', component: Avatar, args: { name: 'Matheus Bruno de Moraes' } } satisfies Meta<typeof Avatar>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
