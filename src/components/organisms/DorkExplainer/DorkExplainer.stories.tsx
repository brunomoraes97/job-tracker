import type { Meta, StoryObj } from '@storybook/react-vite';
import { dorkOperators } from '@/mocks/fixtures';
import { DorkExplainer } from './DorkExplainer';

const meta = { title: 'Organisms/DorkExplainer', component: DorkExplainer, parameters: { layout: 'padded' }, args: { operators: dorkOperators } } satisfies Meta<typeof DorkExplainer>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
