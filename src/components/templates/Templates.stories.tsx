import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Sidebar } from '@/components/organisms/Sidebar';
import { PageHeader } from '@/components/organisms/PageHeader';
import { sidebarProps } from '@/mocks/fixtures';
import { AppShell } from './AppShell';
import { PageLayout } from './PageLayout';
import { SplitLayout } from './SplitLayout';
import { ThreePaneLayout } from './ThreePaneLayout';

const Box = ({ label, h = 420 }: { label: string; h?: number }) => (
  <div style={{ flex: 1, minHeight: h, display: 'grid', placeItems: 'center', border: '1px dashed #B9B3A6', borderRadius: 14, color: '#5E5A52', fontSize: 13, background: 'rgba(255,255,255,.5)' }}>{label}</div>
);

const meta = {
  title: 'Templates/Layouts',
  component: AppShell,
  parameters: { layout: 'fullscreen' },
  args: { sidebar: <Sidebar {...sidebarProps} onNavigate={fn()} />, children: null },
} satisfies Meta<typeof AppShell>;
export default meta;
type Story = StoryObj<typeof meta>;

export const ShellWithSplit: Story = {
  name: 'AppShell + PageLayout + SplitLayout',
  args: {
    children: (
      <PageLayout header={<PageHeader title="Título da página" subtitle="Subtítulo com contexto" />}>
        <SplitLayout main={<Box label="main" />} aside={<div style={{ width: 440, display: 'flex' }}><Box label="aside 440px" /></div>} />
      </PageLayout>
    ),
  },
};

export const ShellWithThreePanes: Story = {
  name: 'AppShell + PageLayout + ThreePaneLayout',
  args: {
    children: (
      <PageLayout density="compact" header={<PageHeader title="Estúdio" />}>
        <ThreePaneLayout left={<Box label="left 268px" />} center={<Box label="center" />} right={<Box label="right 300px" />} />
      </PageLayout>
    ),
  },
};
