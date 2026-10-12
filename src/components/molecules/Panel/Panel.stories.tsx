import type { Meta, StoryObj } from '@storybook/react-vite';
import { Panel } from './Panel';

const meta = { title: 'Molecules/Panel', component: Panel, args: { title: 'Ajustes da geração', children: <p style={{ margin: 0 }}>Conteúdo do painel.</p> }, decorators: [(S) => <div style={{ width: 360 }}><S /></div>] } satisfies Meta<typeof Panel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Surface: Story = {};
export const WithAside: Story = { args: { title: 'Mudanças vs. base', aside: '5' } };
export const Code: Story = { args: { tone: 'code', titleVariant: 'overline', title: 'Seu Google Dork' } };
export const Heading: Story = { args: { titleVariant: 'heading', title: 'Nova busca' } };
