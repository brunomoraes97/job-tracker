import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { SegmentedControl } from './SegmentedControl';

const meta = {
  title: 'Molecules/SegmentedControl',
  component: SegmentedControl,
  args: {
    label: 'Visualização',
    value: 'list',
    onChange: fn(),
    options: [
      { value: 'list', label: 'Lista' },
      { value: 'cards', label: 'Cards' },
      { value: 'kanban', label: 'Kanban' },
      { value: 'table', label: 'Tabela' },
    ],
  },
  render: function Render(args) {
    const [, update] = useArgs();
    return <SegmentedControl {...args} onChange={(v) => { args.onChange?.(v); update({ value: v }); }} />;
  },
} satisfies Meta<typeof SegmentedControl>;
export default meta;
type Story = StoryObj<typeof meta>;
export const ViewSwitch: Story = {};
export const Tabs: Story = { args: { mode: 'tabs', label: 'Documento', value: 'cv', options: [{ value: 'cv', label: 'Currículo' }, { value: 'cl', label: 'Cover letter' }, { value: 'both', label: 'Lado a lado' }] } };
export const FullWidth: Story = { args: { fullWidth: true, label: 'Idioma', value: 'en', options: [{ value: 'en', label: 'English' }, { value: 'pt', label: 'Português' }, { value: 'es', label: 'Español' }] }, decorators: [(S) => <div style={{ width: 300 }}><S /></div>] };
