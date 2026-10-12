import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';

const meta = { title: 'Atoms/Tag', component: Tag, args: { children: 'PostgreSQL', variant: 'neutral' } } satisfies Meta<typeof Tag>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};
export const Hit: Story = { args: { variant: 'hit', children: 'AWS Lambda' } };
export const Miss: Story = { args: { variant: 'miss', children: 'Kafka — não está no seu CV' } };
export const Salary: Story = { args: { mono: true, size: 'md', children: 'US$ 110–140k' } };
