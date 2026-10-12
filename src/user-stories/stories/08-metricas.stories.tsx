import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { epicMeta } from '../harness/meta';
import { expectToast } from '../harness/play';
import type { PrototypeApp } from '../harness/PrototypeApp';

const meta = { ...epicMeta(8), title: 'Histórias de usuário/8 · Tabela e métricas' } satisfies Meta<typeof PrototypeApp>;
export default meta;
type Story = StoryObj<typeof meta>;

export const US_8_1: Story = {
  name: 'US-8.1 · Ver indicadores do meu funil',
  parameters: { userStory: 'US-8.1' },
  args: { initialRoute: 'metrics' },
  play: async ({ canvas, step }) => {
    await step('Quatro indicadores com valor e contexto', async () => {
      for (const [label, value] of [['Candidaturas', '24'], ['Taxa de resposta', '29%'], ['Entrevistas', '5'], ['Tempo até 1ª resposta', '6 d']]) {
        const tile = canvas.getAllByText(label, { selector: 'span' }).map((el) => el.parentElement!).find((p) => within(p).queryByText(value));
        await expect(tile).toBeDefined();
      }
    });
  },
};

export const US_8_2: Story = {
  name: 'US-8.2 · Ver o funil e os próximos compromissos',
  parameters: { userStory: 'US-8.2' },
  args: { initialRoute: 'metrics' },
  play: async ({ canvas, step }) => {
    await step('O funil usa a primeira etapa como 100%', async () => {
      const funnel = within(canvas.getByRole('region', { name: 'Funil de candidaturas' }));
      await expect(funnel.getByRole('progressbar', { name: 'Aplicadas: 24' })).toHaveAttribute('aria-valuenow', '100');
      await expect(funnel.getByRole('progressbar', { name: 'Com resposta: 7' })).toHaveAttribute('aria-valuenow', '29');
    });
    await step('Compromissos mostram dia, título e detalhe', async () => {
      const events = within(canvas.getByRole('region', { name: 'Próximos 7 dias' }));
      await expect(events.getByLabelText('SEG 28')).toBeVisible();
      await expect(events.getByText('Fernway · tech screen')).toBeVisible();
      await expect(events.getByText('14:00 BRT · Google Meet')).toBeVisible();
    });
  },
};

export const US_8_3: Story = {
  name: 'US-8.3 · Ordenar e exportar a tabela de candidaturas',
  parameters: { userStory: 'US-8.3' },
  args: { initialRoute: 'metrics' },
  play: async ({ canvas, userEvent, step }) => {
    const table = () => within(canvas.getByRole('table'));
    const firstCompany = () => table().getAllByRole('row')[1]!.firstElementChild!.textContent;
    await step('Ordenação por coluna com direção no cabeçalho', async () => {
      await expect(table().getByRole('columnheader', { name: /Aplicada/ })).toHaveAttribute('aria-sort', 'descending');
      await userEvent.click(table().getByRole('button', { name: /Empresa/ }));
      await expect(table().getByRole('columnheader', { name: /Empresa/ })).toHaveAttribute('aria-sort', 'descending');
      await expect(firstCompany()).toBe('Tessera Health');
      await userEvent.click(table().getByRole('button', { name: /Empresa/ }));
      await expect(table().getByRole('columnheader', { name: /Empresa/ })).toHaveAttribute('aria-sort', 'ascending');
      await expect(firstCompany()).toBe('Arcadia Logistics');
    });
    await step('Status aparece como pill da etapa', async () => {
      await expect(table().getByText('Oferta')).toBeVisible();
      await expect(table().getAllByText('Entrevista')).toHaveLength(2);
    });
    await step('“Exportar CSV” confirma a exportação', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Exportar CSV' }));
      await expectToast(canvas, 'CSV exportado com 9 candidaturas.');
    });
  },
};
