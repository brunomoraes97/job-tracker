import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { epicMeta } from '../harness/meta';
import { ASYNC, expectToast } from '../harness/play';
import type { PrototypeApp } from '../harness/PrototypeApp';

const meta = { ...epicMeta(6), title: 'Histórias de usuário/6 · Google Dorking' } satisfies Meta<typeof PrototypeApp>;
export default meta;
type Story = StoryObj<typeof meta>;

type Canvas = ReturnType<typeof within>;
const query = (canvas: Canvas) => canvas.getByRole('region', { name: 'Seu Google Dork' }).querySelector('code')!.textContent ?? '';
const field = (canvas: Canvas, name: string | RegExp) => canvas.getByRole('textbox', { name });

export const US_6_1: Story = {
  name: 'US-6.1 · Entender o que é Google Dorking',
  parameters: { userStory: 'US-6.1' },
  args: { initialRoute: 'dorking' },
  play: async ({ canvas, step }) => {
    const box = within(canvas.getByRole('region', { name: 'O que é?' }));
    await step('Explica o conceito, o uso para vagas e o uso responsável', async () => {
      await expect(box.getByText(/operadores avançados/)).toBeVisible();
      await expect(box.getByText(/sistemas de recrutamento/)).toBeVisible();
      await expect(box.getByText(/Use só em páginas públicas/)).toBeVisible();
    });
    await step('Tabela com os 7 operadores', async () => {
      const rows = within(box.getByRole('table')).getAllByRole('row').slice(1);
      await expect(rows.map((r) => r.firstElementChild!.textContent)).toEqual(['site:', '"frase"', 'OR', '-termo', 'intitle:', 'inurl:', 'after:']);
    });
  },
};

export const US_6_2: Story = {
  name: 'US-6.2 · Montar um dork preenchendo campos',
  parameters: { userStory: 'US-6.2' },
  args: { initialRoute: 'dorking' },
  play: async ({ canvas, userEvent, step }) => {
    await step('Cargos viram frases com OR; com “exigir no título”, intitle:', async () => {
      const roles = field(canvas, 'Cargos (qualquer um)');
      await userEvent.clear(roles);
      await userEvent.type(roles, 'Staff Engineer, Principal Engineer');
      await expect(query(canvas)).toContain('("Staff Engineer" OR "Principal Engineer")');
      await userEvent.click(canvas.getByRole('checkbox', { name: /Exigir o cargo no título/ }));
      await expect(query(canvas)).toContain('(intitle:"Staff Engineer" OR intitle:"Principal Engineer")');
    });
    await step('Sites viram site:, um só dispensa parênteses', async () => {
      await userEvent.click(canvas.getByRole('checkbox', { name: 'Lever' }));
      await userEvent.click(canvas.getByRole('checkbox', { name: 'Ashby' }));
      await expect(query(canvas).startsWith('site:boards.greenhouse.io ')).toBe(true);
    });
    await step('Exclusões viram -termo e partes vazias somem', async () => {
      const exclude = field(canvas, 'Excluir termos');
      await userEvent.clear(exclude);
      await userEvent.type(exclude, 'onsite, security clearance');
      await expect(query(canvas)).toContain('-onsite -"security clearance"');
      await userEvent.clear(field(canvas, /Palavras-chave obrigatórias/));
      await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'Publicadas' }), 'Qualquer data');
      await expect(query(canvas)).not.toContain('golang');
      await expect(query(canvas)).not.toContain('after:');
    });
  },
};

export const US_6_3: Story = {
  name: 'US-6.3 · Partir de um modelo',
  parameters: { userStory: 'US-6.3' },
  args: { initialRoute: 'dorking' },
  play: async ({ canvas, userEvent, step }) => {
    await step('Clicar num modelo preenche os campos e atualiza o dork', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Staff / Platform' }));
      await expect(field(canvas, 'Cargos (qualquer um)')).toHaveValue('Staff Engineer, Staff Platform Engineer, Principal Engineer');
      await expect(canvas.getByRole('checkbox', { name: /Exigir o cargo no título/ })).toBeChecked();
      await expect(query(canvas)).toContain('intitle:"Principal Engineer"');
      await expect(query(canvas)).toContain('-clearance');
    });
  },
};

export const US_6_4: Story = {
  name: 'US-6.4 · Ver, entender e usar o dork gerado',
  parameters: { userStory: 'US-6.4' },
  args: { initialRoute: 'dorking' },
  play: async ({ canvas, userEvent, step }) => {
    const result = () => within(canvas.getByRole('region', { name: 'Seu Google Dork' }));
    await step('Contador de palavras e alerta acima do limite', async () => {
      await expect(result().getByText(/^\d+ de 32 palavras$/)).toBeVisible();
      const kw = field(canvas, /Palavras-chave obrigatórias/);
      await userEvent.clear(kw);
      await userEvent.type(kw, Array.from({ length: 24 }, (_, i) => `t${i}`).join(', '));
      await expect(result().getByText(/Acima de 32 palavras/)).toBeVisible();
      await userEvent.clear(kw);
      await userEvent.type(kw, 'golang, AWS');
      await expect(result().queryByText(/Acima de 32 palavras/)).toBeNull();
    });
    await step('“Anatomia da busca” explica cada parte', async () => {
      const anatomy = within(canvas.getByRole('region', { name: 'Anatomia da busca' }));
      for (const label of ['Sites', 'Cargos', 'Palavras-chave', 'Localização', 'Exclusões', 'Data']) await expect(anatomy.getByText(label)).toBeVisible();
    });
    await step('Copiar confirma e salvar cria a busca automatizada', async () => {
      await userEvent.click(result().getByRole('button', { name: 'Copiar' }));
      await expect(result().getByRole('button', { name: 'Copiado' })).toBeVisible();
      await userEvent.click(result().getByRole('button', { name: 'Salvar como busca automatizada' }));
      await expectToast(canvas, 'Busca “Dork · Senior Backend Engineer” criada a partir do dork.');
      await expect(await canvas.findByRole('article', { name: 'Dork · Senior Backend Engineer' }, ASYNC)).toBeVisible();
    });
  },
};
