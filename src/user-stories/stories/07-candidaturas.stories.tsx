import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { epicMeta } from '../harness/meta';
import { ASYNC, expectToast, sidebarNav } from '../harness/play';
import type { PrototypeApp } from '../harness/PrototypeApp';

const meta = { ...epicMeta(7), title: 'Histórias de usuário/7 · Candidaturas' } satisfies Meta<typeof PrototypeApp>;
export default meta;
type Story = StoryObj<typeof meta>;

type Canvas = ReturnType<typeof within>;
const column = (canvas: Canvas, name: string) => within(canvas.getByRole('region', { name }));
const form = (canvas: Canvas, name = 'Nova candidatura') => within(canvas.getByRole('dialog', { name }));

export const US_7_1: Story = {
  name: 'US-7.1 · Acompanhar candidaturas em kanban',
  parameters: { userStory: 'US-7.1' },
  args: { initialRoute: 'applications' },
  play: async ({ canvas, userEvent, step }) => {
    await step('Colunas por etapa com total', async () => {
      for (const [name, n] of [['Salvas', 2], ['Aplicadas', 3], ['Em conversa', 2], ['Entrevistas', 2], ['Oferta', 1]] as const) {
        const col = column(canvas, name);
        await expect(col.queryAllByRole('article')).toHaveLength(n);
        await expect(col.getByText(String(n), { selector: 'header span' })).toBeVisible();
      }
    });
    await step('Cards mostram empresa, match, contexto, documentos e próximo passo', async () => {
      const card = within(column(canvas, 'Em conversa').getAllByRole('article')[0]!);
      await expect(card.getByText('Tessera Health')).toBeVisible();
      await expect(card.getByLabelText('88% de match')).toBeVisible();
      await expect(card.getByText('CV v3')).toBeVisible();
      await expect(card.getByText(/Enviar disponibilidade/)).toBeVisible();
    });
    await step('Clicar no cargo abre a candidatura para edição', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Staff SWE, Platform' }));
      const edit = form(canvas, 'Editar candidatura');
      await expect(edit.getByRole('textbox', { name: 'Empresa' })).toHaveValue('Tessera Health');
      const next = edit.getByRole('textbox', { name: 'Próximo passo' });
      await userEvent.clear(next);
      await userEvent.type(next, 'Entrevista técnica marcada');
      await userEvent.click(edit.getByRole('button', { name: 'Salvar candidatura' }));
      await expectToast(canvas, 'Tessera Health atualizada em “Em conversa”.');
      await expect(column(canvas, 'Em conversa').getByText(/Entrevista técnica marcada/)).toBeVisible();
    });
  },
};

export const US_7_2: Story = {
  name: 'US-7.2 · Registrar uma candidatura manual',
  parameters: { userStory: 'US-7.2' },
  args: { initialRoute: 'applications' },
  play: async ({ canvas, userEvent, step }) => {
    await step('O drawer abre e fecha no × e com Esc', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Candidatura manual' }));
      await expect(canvas.getByRole('dialog', { name: 'Nova candidatura' })).toBeVisible();
      await userEvent.keyboard('{Escape}');
      await expect(canvas.queryByRole('dialog')).toBeNull();
      await userEvent.click(canvas.getByRole('button', { name: 'Candidatura manual' }));
      await userEvent.click(form(canvas).getByRole('button', { name: 'Fechar' }));
      await expect(canvas.queryByRole('dialog')).toBeNull();
    });
    await step('Empresa e cargo são obrigatórios', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Candidatura manual' }));
      await userEvent.click(form(canvas).getByRole('button', { name: 'Salvar candidatura' }));
      await expect(form(canvas).getByText('Informe a empresa.')).toBeVisible();
      await expect(form(canvas).getByRole('textbox', { name: 'Empresa' })).toHaveAttribute('aria-invalid', 'true');
    });
    await step('“Importar” preenche os dados a partir do link', async () => {
      await userEvent.type(form(canvas).getByRole('textbox', { name: 'Link da vaga' }), 'https://jobs.lever.co/acme-robotics/4821');
      await userEvent.click(form(canvas).getByRole('button', { name: 'Importar' }));
      await expect(await form(canvas).findByDisplayValue('Acme Robotics', {}, ASYNC)).toBeVisible();
      await expect(form(canvas).getByRole('textbox', { name: 'Cargo' })).toHaveValue('Senior Backend Engineer');
    });
    await step('Salvar adiciona o card na etapa escolhida', async () => {
      await userEvent.selectOptions(form(canvas).getByRole('combobox', { name: 'Status' }), 'Em conversa');
      await userEvent.click(form(canvas).getByRole('button', { name: 'Salvar candidatura' }));
      await expectToast(canvas, 'Acme Robotics salva em “Em conversa”.');
      await expect(column(canvas, 'Em conversa').getByText('Acme Robotics')).toBeVisible();
    });
  },
};

export const US_7_3: Story = {
  name: 'US-7.3 · Mover candidaturas entre etapas',
  parameters: { userStory: 'US-7.3' },
  args: { initialRoute: 'applications' },
  play: async ({ canvas, userEvent, step }) => {
    await step('Mover leva o card para a coluna escolhida', async () => {
      await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'Mover Backend Engineer, Payments (Kiln Pay) para' }), 'Mover para Entrevistas');
      await expectToast(canvas, 'Movida para “Entrevista”.');
      await expect(column(canvas, 'Entrevistas').getByRole('button', { name: 'Backend Engineer, Payments' })).toBeVisible();
      await expect(column(canvas, 'Aplicadas').queryByRole('button', { name: 'Backend Engineer, Payments' })).toBeNull();
      await expect(column(canvas, 'Entrevistas').getAllByRole('article')).toHaveLength(3);
    });
  },
};

export const US_7_4: Story = {
  name: 'US-7.4 · Ser lembrado de follow-ups',
  parameters: { userStory: 'US-7.4' },
  args: { initialRoute: 'applications' },
  play: async ({ canvas, userEvent, step }) => {
    await step('Ao abrir Candidaturas, o aviso mostra o follow-up mais atrasado', async () => {
      const toast = await expectToast(canvas, 'Follow-up atrasado: Quill Data — Backend Engineer.');
      await expect(column(canvas, 'Aplicadas').getByText(/Follow-up atrasado 4 dias/)).toBeVisible();
      await userEvent.click(toast.getByRole('button', { name: 'Marcar como feito' }));
    });
    await step('“Marcar como feito” limpa o atraso do card', async () => {
      await expectToast(canvas, 'Follow-up marcado como feito.');
      await expect(column(canvas, 'Aplicadas').getByText(/Follow-up enviado hoje/)).toBeVisible();
    });
    await step('Voltando à tela, aparece o próximo follow-up atrasado', async () => {
      await userEvent.click(sidebarNav(canvas).getByRole('link', { name: /^Novas vagas/ }));
      await userEvent.click(sidebarNav(canvas).getByRole('link', { name: /^Candidaturas/ }));
      await expectToast(canvas, 'Follow-up atrasado: Kiln Pay — Backend Engineer, Payments.');
    });
  },
};
