import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from './Heading';

const meta = { title: 'Atoms/Heading', component: Heading, args: { children: 'Novas vagas', level: 1 } } satisfies Meta<typeof Heading>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Display: Story = {};
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Heading level={1} variant="display">Display — Novas vagas</Heading>
      <Heading level={2} variant="title">Title — Nova candidatura</Heading>
      <Heading level={2} variant="heading">Heading — O que é?</Heading>
      <Heading level={3} variant="subheading">Subheading — Ajustes da geração</Heading>
      <Heading level={4} variant="overline">Overline — Por que combina</Heading>
    </div>
  ),
};
