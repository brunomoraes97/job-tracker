import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { iconNames } from '../Icon';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  args: { children: 'Gerar CV + cover letter', variant: 'primary', size: 'md', onClick: fn() },
  argTypes: {
    iconLeft: { control: 'select', options: [undefined, ...iconNames] },
    iconRight: { control: 'select', options: [undefined, ...iconNames] },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { iconLeft: 'filePlus' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Salvar no tracker' } };
export const Outline: Story = { args: { variant: 'outline', children: 'Regenerar com estes ajustes' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Descartar' } };
export const Inverse: Story = { args: { variant: 'inverse', children: 'Copiar', iconLeft: 'copy' }, globals: { backgrounds: { value: 'dark' } } };
export const AsLink: Story = { args: { href: '#', children: 'Abrir no Estúdio', variant: 'secondary' } };
export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', gap: 12 }}>
          {(['primary', 'secondary', 'outline', 'ghost', 'inverse'] as const).map((v) => (
            <Button key={v} {...args} variant={v} size={size}>
              {v}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};
