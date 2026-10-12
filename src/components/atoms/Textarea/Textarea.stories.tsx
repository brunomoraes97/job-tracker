import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Textarea } from './Textarea';

const meta = { title: 'Atoms/Textarea', component: Textarea, args: { value: '', placeholder: 'Stack, impressões, perguntas para a entrevista…', onChange: fn(), 'aria-label': 'Notas' }, decorators: [(S) => <div style={{ width: 380 }}><S /></div>] } satisfies Meta<typeof Textarea>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Empty: Story = {};
export const Filled: Story = { args: { rows: 5, value: 'Vagas remotas de Senior Backend ou Platform Engineer com Go e AWS, que aceitem contractor da América Latina.' } };
