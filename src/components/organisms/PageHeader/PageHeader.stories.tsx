import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '@/components/atoms/Button';
import { SegmentedControl } from '@/components/molecules/SegmentedControl';
import { viewOptions } from '@/mocks/fixtures';
import { PageHeader } from './PageHeader';

const meta = {
  title: 'Organisms/PageHeader',
  component: PageHeader,
  parameters: { layout: 'padded' },
  args: {
    title: 'Novas vagas',
    subtitle: '23 novas desde ontem · 7 com match acima de 80% · última varredura há 12 min',
    actions: (
      <>
        <SegmentedControl label="Visualização" value="list" options={viewOptions} onChange={fn()} />
        <Button iconLeft="bell" onClick={fn()}>Alertas diários</Button>
      </>
    ),
    onNavigate: fn(),
  },
} satisfies Meta<typeof PageHeader>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithBreadcrumbs: Story = { args: { title: 'Documentos para esta vaga', subtitle: 'Versão 2 de 2 · gerada há 1 min', breadcrumbs: [{ label: 'Novas vagas', href: '#jobs' }, { label: 'Lumen Freight — Senior Backend Engineer (Go)' }], actions: <Button variant="primary" iconLeft="download">Baixar PDFs</Button> } };
