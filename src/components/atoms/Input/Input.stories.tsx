import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Input } from './Input';

const meta = { title: 'Atoms/Input', component: Input, args: { value: '', placeholder: 'Ex.: Acme', onChange: fn(), 'aria-label': 'Empresa' }, decorators: [(S) => <div style={{ width: 340 }}><S /></div>] } satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Empty: Story = {};
export const Filled: Story = { args: { value: 'Senior Backend Engineer, Backend Engineer' } };
export const WithIcon: Story = { args: { icon: 'search', placeholder: 'Cargo, empresa ou stack', type: 'search' } };
export const Url: Story = { args: { icon: 'link', mono: true, value: 'https://jobs.example.com/[vaga]', type: 'url' } };
export const Invalid: Story = { args: { invalid: true, value: 'abc' } };
export const Date: Story = { args: { type: 'date', value: '2026-09-26' } };
