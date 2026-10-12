import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatTile } from './StatTile';

const meta = { title: 'Molecules/StatTile', component: StatTile, args: { label: 'Taxa de resposta', value: '29%', hint: '7 de 24 responderam' }, decorators: [(S) => <div style={{ width: 260 }}><S /></div>] } satisfies Meta<typeof StatTile>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
