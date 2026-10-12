import type { Meta, StoryObj } from '@storybook/react-vite';
import { MatchScore } from './MatchScore';

const meta = { title: 'Molecules/MatchScore', component: MatchScore, args: { value: 94 }, argTypes: { value: { control: { type: 'range', min: 0, max: 100 } } } } satisfies Meta<typeof MatchScore>;
export default meta;
type Story = StoryObj<typeof meta>;
export const High: Story = {};
export const Mid: Story = { args: { value: 76 } };
export const Low: Story = { args: { value: 58 } };
export const Inline: Story = { args: { layout: 'inline' } };
