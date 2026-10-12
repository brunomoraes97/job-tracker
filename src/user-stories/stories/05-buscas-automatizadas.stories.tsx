import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { epicMeta } from '../harness/meta';
import { ASYNC, expectToast, sidebarNav } from '../harness/play';
import type { PrototypeApp } from '../harness/PrototypeApp';

const meta = { ...epicMeta(5), title: 'Histórias de usuário/5 · Buscas automatizadas' } satisfies Meta<typeof PrototypeApp>;
export default meta;
type Story = StoryObj<typeof meta>;

const composer = (canvas: ReturnType<typeof within>) => within(canvas.getByRole('complementary', { name: 'Nova busca' }));
const describeField = (canvas: ReturnType<typeof within>) => composer(canvas).getByRole('textbox', { name: /Descreva o que você procura/ });

export const US_5_1: Story = {
  name: 'US-5.1 · Ver minhas buscas automatizadas',
  parameters: { userStory: 'US-5.1' },
  args: { initialRoute: 'searches' },
  play: async ({ canvas, step }) => {
    const list = within(canvas.getByRole('region', { name: 'Suas buscas' }));
    await step('Cada busca mostra descrição, dork, frequência, fontes e vagas novas', async () => {
      await expect(list.getAllByRole('article')).toHaveLength(5);
      const first = within(list.getByRole('article', { name: 'Senior Backend · Go · Remote' }));
      await expect(first.getByText('+14 novas')).toBeVisible();
      await expect(first.getByText(/Backend sênior com Go e AWS/)).toBeVisible();
      await expect(first.getByText(/^\(site:boards\.greenhouse\.io/)).toBeVisible();
      await expect(first.getByText('A cada 6 h · Google + LinkedIn · rodou há 12 min')).toBeVisible();
    });
    await step('Buscas pausadas aparecem diferenciadas', async () => {
      const paused = within(list.getByRole('article', { name: 'Staff Engineer · fusos dos EUA' }));
      await expect(paused.getByRole('switch', { name: 'Pausada' })).toHaveAttribute('aria-checked', 'false');
    });
  },
};

export const US_5_2: Story = {
  name: 'US-5.2 · Pausar, executar e editar uma busca',
  parameters: { userStory: 'US-5.2' },
  args: { initialRoute: 'searches' },
  play: async ({ canvas, userEvent, step }) => {
    const card = (name: string) => within(canvas.getByRole('article', { name }));
    await step('O interruptor alterna Ativa/Pausada', async () => {
      await userEvent.click(card('AI Agents · Python').getByRole('switch', { name: 'Ativa' }));
      await expect(card('AI Agents · Python').getByRole('switch', { name: 'Pausada' })).toHaveAttribute('aria-checked', 'false');
    });
    await step('“Executar agora” mostra carregamento e atualiza o contador', async () => {
      await userEvent.click(card('Platform · AWS · Europa').getByRole('button', { name: 'Executar agora' }));
      await expect(card('Platform · AWS · Europa').getByRole('button', { name: 'Aguarde…' })).toBeDisabled();
      await expectToast(canvas, '2 vagas novas em “Platform · AWS · Europa”.');
      await expect(card('Platform · AWS · Europa').getByText('+8 novas')).toBeVisible();
      await expect(card('Platform · AWS · Europa').getByText(/rodou agora/)).toBeVisible();
    });
    await step('“Editar dork” abre o gerador e “Ver resultados” abre o feed', async () => {
      await userEvent.click(card('Senior Backend · Go · Remote').getByRole('button', { name: 'Editar dork' }));
      await expect(canvas.getByRole('heading', { level: 1, name: 'Google Dorking' })).toBeVisible();
      await userEvent.click(sidebarNav(canvas).getByRole('link', { name: /^Buscas automatizadas/ }));
      await userEvent.click(card('Senior Backend · Go · Remote').getByRole('button', { name: 'Ver resultados' }));
      await expect(canvas.getByRole('heading', { level: 1, name: 'Novas vagas' })).toBeVisible();
    });
  },
};

export const US_5_3: Story = {
  name: 'US-5.3 · Criar uma busca descrevendo em texto livre',
  parameters: { userStory: 'US-5.3' },
  args: { initialRoute: 'searches' },
  play: async ({ canvas, userEvent, step }) => {
    await step('Sem descrição, não dá para salvar', async () => {
      await expect(composer(canvas).getByRole('button', { name: 'Salvar e ativar' })).toBeDisabled();
    });
    await step('Descrever e salvar coloca a busca no topo da lista', async () => {
      await userEvent.type(describeField(canvas), 'Backend sênior com Rust e Go, remoto para a Europa');
      await userEvent.click(composer(canvas).getByRole('button', { name: 'Salvar e ativar' }));
      await expectToast(canvas, /salva e ativada/);
      const list = within(canvas.getByRole('region', { name: 'Suas buscas' }));
      await expect(list.getAllByRole('article')).toHaveLength(6);
      await expect(list.getAllByRole('article')[0]).toHaveAccessibleName('Backend sênior com Rust e Go, remoto…');
      await expect(describeField(canvas)).toHaveValue('');
    });
  },
};

export const US_5_4: Story = {
  name: 'US-5.4 · Converter a descrição em Google Dork (recomendado)',
  parameters: { userStory: 'US-5.4' },
  args: { initialRoute: 'searches' },
  play: async ({ canvas, userEvent, step }) => {
    await step('Um destaque recomenda dorking', async () => {
      await expect(composer(canvas).getByText('Altamente recomendado: usar Google Dorking')).toBeVisible();
      await expect(composer(canvas).getByRole('button', { name: 'O que é isso?' })).toBeVisible();
    });
    await step('Converter mostra como foi entendido e o dork', async () => {
      await userEvent.type(describeField(canvas), 'Vagas remotas de Senior Backend ou Platform Engineer com Go e AWS, contractor LATAM, em Greenhouse, Lever ou Ashby. Nada híbrido.');
      await userEvent.click(composer(canvas).getByRole('button', { name: 'Converter descrição em dork' }));
      await expect(await composer(canvas).findByText('Como entendemos', { exact: false }, ASYNC)).toBeVisible();
      for (const label of ['Cargos', 'Stack', 'Local', 'Excluir', 'Sites']) await expect(composer(canvas).getByText(label, { selector: 'dt' })).toBeVisible();
      await expect(composer(canvas).getByText(/site:boards\.greenhouse\.io OR site:jobs\.lever\.co/)).toBeVisible();
    });
    await step('Ajustar no gerador abre os campos preenchidos', async () => {
      await userEvent.click(composer(canvas).getByRole('button', { name: /Ajustar campo a campo no gerador/ }));
      await expect(canvas.getByRole('textbox', { name: 'Cargos (qualquer um)' })).toHaveValue('Senior Backend Engineer, Platform Engineer');
    });
  },
};

export const US_5_5: Story = {
  name: 'US-5.5 · Escolher fontes, frequência e limite de aviso',
  parameters: { userStory: 'US-5.5' },
  args: { initialRoute: 'searches' },
  play: async ({ canvas, userEvent, step }) => {
    await step('Fontes, frequência e limite', async () => {
      const wellfound = composer(canvas).getByRole('checkbox', { name: 'Wellfound' });
      await userEvent.click(wellfound);
      await expect(wellfound).toBeChecked();
      await userEvent.selectOptions(composer(canvas).getByRole('combobox', { name: 'Frequência' }), 'Semanal');
      await userEvent.selectOptions(composer(canvas).getByRole('combobox', { name: 'Avisar quando match ≥' }), '90%');
    });
    await step('“Testar agora” mostra uma prévia do volume', async () => {
      await userEvent.click(composer(canvas).getByRole('button', { name: 'Testar agora' }));
      await expectToast(canvas, /Prévia: 9 vagas/);
    });
    await step('A busca salva usa a frequência e as fontes escolhidas', async () => {
      await userEvent.type(describeField(canvas), 'Go remoto Europa');
      await userEvent.click(composer(canvas).getByRole('button', { name: 'Salvar e ativar' }));
      await expect(await canvas.findByText('Semanal · Google + LinkedIn + Wellfound · ainda não rodou', {}, ASYNC)).toBeVisible();
    });
  },
};
