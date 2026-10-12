import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { NavItem } from './NavItem';

const meta = {
  title: 'Molecules/NavItem',
  component: NavItem,
  args: { label: 'Novas vagas', href: '#jobs', badge: '23', active: true, onNavigate: fn() },
  globals: { backgrounds: { value: 'dark' } },
  decorators: [(S) => <div style={{ width: 240, padding: 16, background: '#1C1B19' }}><S /></div>],
} satisfies Meta<typeof NavItem>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Active: Story = {};
export const Idle: Story = { args: { active: false, label: 'Candidaturas', badge: '18' } };
export const SavedSearch: Story = { args: { active: false, variant: 'secondary', label: 'Senior Backend · Go · Remote', badge: '+14' } };
