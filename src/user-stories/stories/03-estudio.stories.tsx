import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { epicMeta } from '../harness/meta';
import { ASYNC, expectToast } from '../harness/play';
import type { PrototypeApp } from '../harness/PrototypeApp';

const meta = { ...epicMeta(3), title: 'Histórias de usuário/3 · Estúdio de currículo' } satisfies Meta<typeof PrototypeApp>;
export default meta;
type Story = StoryObj<typeof meta>;

const changesPanel = (canvas: ReturnType<typeof within>) => within(canvas.getByRole('complementary', { name: 'Mudanças vs. base' }));

export const US_3_1: Story = {
  name: 'US-3.1 · Editar o documento gerado em um estúdio',
  parameters: { userStory: 'US-3.1' },
  args: { initialRoute: 'studio' },
  play: async ({ canvas, userEvent, step }) => {
    await step('Trilha até a vaga e versões com a ativa destacada', async () => {
      const trail = within(canvas.getByRole('navigation', { name: 'Trilha' }));
      await expect(trail.getByRole('link', { name: 'Novas vagas' })).toBeVisible();
      await expect(within(canvas.getByRole('group', { name: 'Versões' })).getByRole('button', { name: 'v3' })).toHaveAttribute('aria-pressed', 'true');
    });
    await step('Trocar de versão atualiza o subtítulo', async () => {
      await userEvent.click(within(canvas.getByRole('group', { name: 'Versões' })).getByRole('button', { name: 'v2' }));
      await expect(canvas.getByText(/^Versão 2 ·/)).toBeVisible();
    });
    await step('Alternar entre CV e cover letter', async () => {
      await userEvent.click(canvas.getByRole('tab', { name: 'Cover letter' }));
      await expect(canvas.getByRole('article', { name: 'Cover letter' })).toBeVisible();
      await expect(canvas.queryByRole('article', { name: 'Currículo' })).toBeNull();
    });
  },
};

export const US_3_2: Story = {
  name: 'US-3.2 · Escolher os blocos incluídos',
  parameters: { userStory: 'US-3.2' },
  args: { initialRoute: 'studio' },
  play: async ({ canvas, userEvent, step }) => {
    const source = within(canvas.getByRole('complementary', { name: 'Fonte e blocos do documento' }));
    await step('Cada bloco liga/desliga', async () => {
      const ai = source.getByRole('checkbox', { name: /Projetos de agentes de IA/ });
      await expect(ai).not.toBeChecked();
      await userEvent.click(ai);
      await expect(ai).toBeChecked();
      const support = source.getByRole('checkbox', { name: /Suporte & onboarding/ });
      await userEvent.click(support);
      await expect(support).not.toBeChecked();
    });
    await step('Cobertura de palavras-chave como barra e fração', async () => {
      await expect(source.getByRole('progressbar', { name: 'Palavras-chave cobertas' })).toHaveAttribute('aria-valuenow', '85');
      await expect(source.getByText('11/13')).toBeVisible();
    });
  },
};

export const US_3_3: Story = {
  name: 'US-3.3 · Ver e desfazer mudanças vs. a base',
  parameters: { userStory: 'US-3.3' },
  args: { initialRoute: 'studio' },
  play: async ({ canvas, userEvent, step }) => {
    await step('Cada mudança tem tipo, título e descrição', async () => {
      const panel = changesPanel(canvas);
      await expect(panel.getAllByLabelText('Adicionado').length).toBe(2);
      await expect(panel.getByLabelText('Movido')).toBeVisible();
      await expect(panel.getByText('3 empresas agrupadas em uma linha.')).toBeVisible();
    });
    await step('Desfazer remove a mudança e atualiza o contador', async () => {
      await userEvent.click(changesPanel(canvas).getByRole('button', { name: 'Desfazer: Suporte condensado' }));
      await expect(changesPanel(canvas).queryByText('Suporte condensado')).toBeNull();
      await expect(canvas.getByText(/4 mudanças para esta vaga/)).toBeVisible();
    });
    await step('Sem mudanças, aparece um estado vazio', async () => {
      for (const b of changesPanel(canvas).getAllByRole('button', { name: /^Desfazer:/ })) await userEvent.click(b);
      await expect(changesPanel(canvas).getByText(/Sem mudanças/)).toBeVisible();
    });
  },
};

export const US_3_4: Story = {
  name: 'US-3.4 · Pedir ajustes em linguagem natural',
  parameters: { userStory: 'US-3.4' },
  args: { initialRoute: 'studio' },
  play: async ({ canvas, userEvent, step }) => {
    await step('Atalhos aplicam ajustes prontos', async () => {
      await userEvent.click(changesPanel(canvas).getByRole('button', { name: 'Mais curto' }));
      await expectToast(canvas, 'Ajuste aplicado: Mais curto.');
      await expect(changesPanel(canvas).getByText('Mais curto', { selector: 'span' })).toBeVisible();
    });
    await step('O campo livre só envia com texto e mostra carregamento', async () => {
      const send = changesPanel(canvas).getByRole('button', { name: 'Enviar ajuste' });
      await expect(send).toBeDisabled();
      await userEvent.type(changesPanel(canvas).getByRole('textbox', { name: 'Descreva o ajuste' }), 'destaque CDK no resumo');
      await expect(send).toBeEnabled();
      await userEvent.click(send);
      await expect(send).toBeDisabled();
    });
    await step('O ajuste aparece na lista de mudanças', async () => {
      await expect(await changesPanel(canvas).findByText('destaque CDK no resumo', {}, ASYNC)).toBeVisible();
      await expect(changesPanel(canvas).getByRole('textbox', { name: 'Descreva o ajuste' })).toHaveValue('');
    });
  },
};
