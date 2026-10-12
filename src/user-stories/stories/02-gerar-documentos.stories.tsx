import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { epicMeta } from '../harness/meta';
import { ASYNC, expectToast } from '../harness/play';
import type { PrototypeApp } from '../harness/PrototypeApp';

const meta = { ...epicMeta(2), title: 'Histórias de usuário/2 · Gerar CV e cover letter' } satisfies Meta<typeof PrototypeApp>;
export default meta;
type Story = StoryObj<typeof meta>;

export const US_2_1: Story = {
  name: 'US-2.1 · Gerar documentos sob medida a partir do currículo base',
  parameters: { userStory: 'US-2.1' },
  args: { initialRoute: 'generate' },
  play: async ({ canvas, userEvent, step }) => {
    const preview = () => within(canvas.getByRole('region', { name: 'Pré-visualização dos documentos' }));
    await step('CV e cover letter lado a lado, com versão e cobertura', async () => {
      await expect(preview().getByRole('article', { name: 'Currículo' })).toBeVisible();
      await expect(preview().getByRole('article', { name: 'Cover letter' })).toBeVisible();
      await expect(canvas.getByText(/Versão 3 · .* 8 de 10 palavras-chave cobertas/)).toBeVisible();
    });
    await step('Trechos reescritos aparecem destacados', async () => {
      await expect(canvas.getByRole('region', { name: 'Pré-visualização dos documentos' }).querySelectorAll('mark').length).toBeGreaterThan(3);
    });
    await step('Dados ausentes viram marcadores, nunca números inventados', async () => {
      await expect(preview().getByRole('article', { name: 'Currículo' }).textContent).toContain('[resultado mensurável]');
    });
    await step('Ver só o CV ou só a carta', async () => {
      const tabs = within(canvas.getByRole('tablist', { name: 'Documento' }));
      await userEvent.click(tabs.getByRole('tab', { name: 'Cover letter' }));
      await expect(preview().queryByRole('article', { name: 'Currículo' })).toBeNull();
      await userEvent.click(tabs.getByRole('tab', { name: 'Currículo' }));
      await expect(preview().queryByRole('article', { name: 'Cover letter' })).toBeNull();
    });
  },
};

export const US_2_2: Story = {
  name: 'US-2.2 · Ajustar a geração',
  parameters: { userStory: 'US-2.2' },
  args: { initialRoute: 'generate' },
  play: async ({ canvas, userEvent, step }) => {
    const settings = within(canvas.getByRole('complementary', { name: 'Ajustes da geração' }));
    await step('Idioma, tom e template são escolhas únicas', async () => {
      for (const [group, option] of [['Idioma', 'Português'], ['Tom da cover letter', 'Formal'], ['Template do PDF', 'Moderno']] as const) {
        const g = within(settings.getByRole('group', { name: group }));
        await userEvent.click(g.getByRole('button', { name: option }));
        await expect(g.getByRole('button', { name: option })).toHaveAttribute('aria-pressed', 'true');
      }
    });
    await step('Experiências em destaque são checkboxes', async () => {
      const ai = settings.getByRole('checkbox', { name: /Projetos de agentes de IA/ });
      await userEvent.click(ai);
      await expect(ai).toBeChecked();
    });
    await step('Regenerar mostra carregamento e cria uma nova versão', async () => {
      await userEvent.click(settings.getByRole('button', { name: 'Regenerar com estes ajustes' }));
      await expect(settings.getByRole('button', { name: 'Aguarde…' })).toBeDisabled();
      await expectToast(canvas, 'Documentos regenerados (v4).');
      await expect(canvas.getByText(/^Versão 4 ·/)).toBeVisible();
    });
    await step('“Revisar skills” leva ao currículo base', async () => {
      await userEvent.click(settings.getByRole('button', { name: 'Revisar skills' }));
      await expect(await canvas.findByRole('heading', { level: 1, name: 'Currículo base' }, ASYNC)).toBeVisible();
    });
  },
};

export const US_2_3: Story = {
  name: 'US-2.3 · Baixar e anexar',
  parameters: { userStory: 'US-2.3' },
  args: { initialRoute: 'generate' },
  play: async ({ canvas, userEvent, step }) => {
    await step('“Baixar PDFs” confirma o download', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Baixar PDFs' }));
      await expectToast(canvas, 'PDFs da v3 baixados.');
    });
    await step('“Abrir no Estúdio” leva ao editor completo', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Abrir no Estúdio' }));
      await expect(canvas.getByRole('heading', { level: 1, name: 'Estúdio de currículo' })).toBeVisible();
      await userEvent.click(within(canvas.getByRole('navigation', { name: 'Trilha' })).getByRole('link', { name: 'Lumen Freight — Senior Backend Engineer (Go)' }));
    });
    await step('“Anexar ao tracker” registra a versão na candidatura', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Anexar ao tracker' }));
      const toast = await expectToast(canvas, 'CV v3 + cover letter anexados à candidatura Lumen Freight.');
      await userEvent.click(toast.getByRole('button', { name: 'Ver candidaturas' }));
      const card = canvas.getByRole('button', { name: 'Senior Backend Engineer (Go)' }).closest('article')!;
      await expect(within(card as HTMLElement).getByText('CV v3')).toBeVisible();
    });
  },
};
