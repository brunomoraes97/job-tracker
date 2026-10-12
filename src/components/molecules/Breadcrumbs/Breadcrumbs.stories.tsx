import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Breadcrumbs } from './Breadcrumbs';

const meta = { title: 'Molecules/Breadcrumbs', component: Breadcrumbs, args: { items: [{ label: 'Novas vagas', href: '#jobs' }, { label: 'Lumen Freight — Senior Backend Engineer (Go)', href: '#job' }, { label: 'Estúdio' }], onNavigate: fn() } } satisfies Meta<typeof Breadcrumbs>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
