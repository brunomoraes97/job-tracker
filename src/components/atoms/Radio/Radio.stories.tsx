import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Radio } from './Radio';

const meta = { title: 'Atoms/Radio', component: Radio, args: { name: 'docs', value: 'generate', checked: true, label: 'Gerar CV + cover letter para esta vaga', onSelect: fn() } } satisfies Meta<typeof Radio>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
