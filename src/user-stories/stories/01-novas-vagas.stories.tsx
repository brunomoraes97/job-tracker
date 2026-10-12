import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { epicMeta } from '../harness/meta';
import { ASYNC, expectToast, matchValues, sidebarNav } from '../harness/play';
import type { PrototypeApp } from '../harness/PrototypeApp';

const meta = { ...epicMeta(1), title: 'Histórias de usuário/1 · Novas vagas' } satisfies Meta<typeof PrototypeApp>;
export default meta;
type Story = StoryObj<typeof meta>;

export const US_1_1: Story = {
  name: 'US-1.1 · Ver as vagas novas ordenadas por match',
  parameters: { userStory: 'US-1.1' },
  args: { initialRoute: 'jobs' },
  play: async ({ canvas, userEvent, step }) => {
    const list = within(canvas.getByRole('region', { name: 'Lista de vagas' }));
    await step('A lista vem ordenada por match, com total e fontes', async () => {
      const values = matchValues(list);
      await expect(values).toEqual([...values].sort((a, b) => b - a));
      await expect(list.getByText(/^4 resultados/)).toBeVisible();
      await expect(list.getByText(/Fontes:/)).toBeVisible();
    });
    await step('Cada vaga mostra empresa, local, tags, salário, fonte e publicação', async () => {
      const first = within(list.getAllByRole('article')[0]!);
      await expect(first.getByText('Lumen Freight · Remoto · Américas')).toBeVisible();
      await expect(first.getByText('PostgreSQL')).toBeVisible();
      await expect(first.getByText('US$ 110–140k · Greenhouse · há 2 h')).toBeVisible();
    });
    await step('Vagas novas exibem o selo NOVA', async () => {
      await expect(list.getAllByText('NOVA').length).toBeGreaterThan(0);
    });
    await step('Sem vagas, aparece um estado vazio', async () => {
      const search = canvas.getByRole('searchbox', { name: 'Buscar vagas' });
      await userEvent.type(search, 'cobol mainframe');
      await expect(list.getByText('Nenhuma vaga com estes filtros.')).toBeVisible();
      await userEvent.clear(search);
      await expect(list.getAllByRole('article')).toHaveLength(4);
    });
  },
};

export const US_1_2: Story = {
  name: 'US-1.2 · Filtrar e buscar vagas',
  parameters: { userStory: 'US-1.2' },
  args: { initialRoute: 'jobs' },
  play: async ({ canvas, userEvent, step }) => {
    const filters = within(canvas.getByRole('group', { name: 'Filtros' }));
    const list = within(canvas.getByRole('region', { name: 'Lista de vagas' }));
    await step('Ligar “Go” e “AWS” recalcula a lista', async () => {
      const go = filters.getByRole('button', { name: 'Go' });
      await userEvent.click(go);
      await expect(go).toHaveAttribute('aria-pressed', 'true');
      await expect(list.getByText(/^3 resultados/)).toBeVisible();
      await userEvent.click(filters.getByRole('button', { name: 'AWS' }));
      await expect(list.getByText(/^2 resultados/)).toBeVisible();
    });
    await step('Desligar “Remoto” traz a vaga híbrida de volta', async () => {
      await userEvent.click(filters.getByRole('button', { name: 'AWS' }));
      await userEvent.click(filters.getByRole('button', { name: 'Go' }));
      const remote = filters.getByRole('button', { name: 'Remoto' });
      await userEvent.click(remote);
      await expect(remote).toHaveAttribute('aria-pressed', 'false');
      await expect(list.getByText(/^5 resultados/)).toBeVisible();
    });
    await step('A busca filtra por cargo, empresa ou stack', async () => {
      await userEvent.type(canvas.getByRole('searchbox', { name: 'Buscar vagas' }), 'langgraph');
      await expect(list.getByText(/^1 resultado/)).toBeVisible();
      await expect(list.getByRole('button', { name: 'Senior Software Engineer, AI Agents' })).toBeVisible();
    });
  },
};

export const US_1_3: Story = {
  name: 'US-1.3 · Entender por que uma vaga combina',
  parameters: { userStory: 'US-1.3' },
  args: { initialRoute: 'jobs' },
  play: async ({ canvas, userEvent, step }) => {
    const panel = () => within(canvas.getByRole('complementary', { name: 'Vaga selecionada' }));
    await step('Clicar em uma vaga abre o painel com os componentes do match', async () => {
      const title = canvas.getByRole('button', { name: 'Staff Software Engineer, Platform' });
      await userEvent.click(title);
      await expect(title).toHaveAttribute('aria-pressed', 'true');
      await expect(panel().getByRole('heading', { name: 'Staff Software Engineer, Platform' })).toBeVisible();
      await expect(panel().getByRole('progressbar', { name: 'Fuso / localização' })).toHaveAttribute('aria-valuenow', '95');
    });
    await step('Palavras-chave presentes e ausentes', async () => {
      const kw = within(panel().getByRole('list', { name: 'Palavras-chave da vaga' }));
      await expect(kw.getByText('Kubernetes — não está no seu CV')).toBeVisible();
      await expect(kw.getByText('Go')).toBeVisible();
    });
    await step('Também funciona pelo teclado', async () => {
      canvas.getByRole('button', { name: 'Backend Engineer, Payments' }).focus();
      await userEvent.keyboard('{Enter}');
      await expect(panel().getByRole('heading', { name: 'Backend Engineer, Payments' })).toBeVisible();
    });
    await step('Sem seleção visível, o painel mostra uma instrução', async () => {
      await userEvent.type(canvas.getByRole('searchbox', { name: 'Buscar vagas' }), 'northbeam');
      await expect(canvas.getByText('Selecione uma vaga para ver por que ela combina com você.')).toBeVisible();
    });
  },
};

export const US_1_4: Story = {
  name: 'US-1.4 · Agir sobre uma vaga',
  parameters: { userStory: 'US-1.4' },
  args: { initialRoute: 'jobs' },
  play: async ({ canvas, userEvent, step }) => {
    await step('Salvar no tracker cria a candidatura em “Salvas”', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Remoto' }));
      await userEvent.click(canvas.getByRole('button', { name: 'Backend Engineer (Java)' }));
      await userEvent.click(canvas.getByRole('button', { name: 'Salvar no tracker' }));
      const toast = await expectToast(canvas, 'Vireo Commerce salva em “Salvas”.');
      await userEvent.click(toast.getByRole('button', { name: 'Ver candidaturas' }));
      const saved = within(canvas.getByRole('region', { name: 'Salvas' }));
      await expect(saved.getByRole('button', { name: 'Backend Engineer (Java)' })).toBeVisible();
    });
    await step('Descartar remove a vaga e permite desfazer', async () => {
      await userEvent.click(sidebarNav(canvas).getByRole('link', { name: /^Novas vagas/ }));
      await userEvent.click(canvas.getByRole('button', { name: 'Senior Backend Engineer (Go)' }));
      await userEvent.click(canvas.getByRole('button', { name: 'Descartar' }));
      const toast = await expectToast(canvas, /descartada/);
      await expect(canvas.queryByRole('button', { name: 'Senior Backend Engineer (Go)' })).toBeNull();
      await userEvent.click(toast.getByRole('button', { name: 'Desfazer' }));
      await expect(await canvas.findByRole('button', { name: 'Senior Backend Engineer (Go)' }, ASYNC)).toBeVisible();
    });
    await step('Gerar CV + cover letter abre os documentos da vaga', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Gerar CV + cover letter' }));
      await expect(canvas.getByRole('heading', { level: 1, name: 'Documentos para esta vaga' })).toBeVisible();
      await expect(canvas.getByText('Lumen Freight — Senior Backend Engineer (Go)')).toBeVisible();
    });
  },
};

export const US_1_5: Story = {
  name: 'US-1.5 · Alternar visualizações',
  parameters: { userStory: 'US-1.5' },
  args: { initialRoute: 'jobs' },
  play: async ({ canvas, userEvent, step }) => {
    const views = within(canvas.getByRole('group', { name: 'Visualização' }));
    const layout = () => getComputedStyle(canvas.getByRole('region', { name: 'Lista de vagas' }).querySelector('article')!.parentElement!).display;
    await step('“Cards” mostra as vagas em grade', async () => {
      await userEvent.click(views.getByRole('button', { name: 'Cards' }));
      await expect(views.getByRole('button', { name: 'Cards' })).toHaveAttribute('aria-pressed', 'true');
      await expect(layout()).toBe('grid');
    });
    await step('“Lista” volta para uma coluna', async () => {
      await userEvent.click(views.getByRole('button', { name: 'Lista' }));
      await expect(layout()).toBe('flex');
    });
  },
};

export const US_1_6: Story = {
  name: 'US-1.6 · Configurar alertas',
  parameters: { userStory: 'US-1.6' },
  args: { initialRoute: 'jobs' },
  play: async ({ canvas, userEvent, step }) => {
    await step('“Alertas diários” abre o painel de alertas', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Alertas diários' }));
      await expect(canvas.getByRole('dialog', { name: 'Alertas de vagas' })).toBeVisible();
    });
    const dialog = () => within(canvas.getByRole('dialog', { name: 'Alertas de vagas' }));
    await step('Desativar bloqueia os demais campos', async () => {
      await userEvent.click(dialog().getByRole('switch', { name: 'Alertas ativos' }));
      await expect(dialog().getByLabelText('Frequência')).toBeDisabled();
      await userEvent.click(dialog().getByRole('switch', { name: 'Alertas ativos' }));
      await expect(dialog().getByLabelText('Frequência')).toBeEnabled();
    });
    await step('Salvar fecha o painel e confirma', async () => {
      await userEvent.selectOptions(dialog().getByLabelText('Frequência'), 'A cada 12 horas');
      await userEvent.click(dialog().getByRole('checkbox', { name: /Slack/ }));
      await userEvent.click(dialog().getByRole('button', { name: 'Salvar alertas' }));
      await expectToast(canvas, 'Alertas salvos: A cada 12 horas, match ≥ 80%.');
      await expect(canvas.queryByRole('dialog')).toBeNull();
    });
  },
};
