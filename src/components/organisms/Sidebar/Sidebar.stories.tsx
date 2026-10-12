import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { navItems, sidebarProps } from '@/mocks/fixtures';
import { Sidebar } from './Sidebar';

const meta = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  args: { ...sidebarProps, onNavigate: fn() },
  argTypes: { activeId: { control: 'select', options: navItems.map((n) => n.id) } },
  decorators: [(S) => <div style={{ height: 900, display: 'flex' }}><S /></div>],
} satisfies Meta<typeof Sidebar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithoutSavedSearches: Story = { args: { activeId: 'applications', savedSearches: [] } };
