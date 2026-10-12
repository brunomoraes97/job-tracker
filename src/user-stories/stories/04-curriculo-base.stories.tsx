import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { epicMeta } from '../harness/meta';
import { ASYNC, expectToast, sidebarNav } from '../harness/play';
import type { PrototypeApp } from '../harness/PrototypeApp';

const meta = { ...epicMeta(4), title: 'Histórias de usuário/4 · Currículo base' } satisfies Meta<typeof PrototypeApp>;
export default meta;
type Story = StoryObj<typeof meta>;

const dialog = (canvas: ReturnType<typeof within>, name: string) => within(canvas.getByRole('dialog', { name }));

export const US_4_1: Story = {
  name: 'US-4.1 · Manter um currículo base único',
  parameters: { userStory: 'US-4.1' },
  args: { initialRoute: 'profile' },
  play: async ({ canvas, userEvent, step }) => {
    await step('Dados pessoais e resumo são editáveis', async () => {
      const linkedin = canvas.getByRole('textbox', { name: 'LinkedIn' });
      await userEvent.type(linkedin, 'linkedin.com/in/matheus-moraes');
      await expect(linkedin).toHaveValue('linkedin.com/in/matheus-moraes');
    });
    await step('Adicionar experiência exige cargo e empresa', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Adicionar experiência' }));
      const form = dialog(canvas, 'Nova experiência');
      await userEvent.click(form.getByRole('button', { name: 'Adicionar experiência' }));
      await expect(form.getByText('Informe o cargo.')).toBeVisible();
      await userEvent.type(form.getByRole('textbox', { name: 'Cargo' }), 'Software Engineer');
      await userEvent.type(form.getByRole('textbox', { name: 'Empresa' }), 'CloudWalk');
      await userEvent.type(form.getByRole('textbox', { name: /Período/ }), 'mai 2023 – jun 2024');
      await userEvent.type(form.getByRole('textbox', { name: /Realizações/ }), 'API de decisões de fraude em Rust.');
      await userEvent.type(form.getByRole('textbox', { name: /Tecnologias/ }), 'Rust, Pagamentos');
      await userEvent.click(form.getByRole('button', { name: 'Adicionar experiência' }));
      await expectToast(canvas, 'Experiência “Software Engineer — CloudWalk” salva.');
      await expect(canvas.getByRole('heading', { name: 'Software Engineer — CloudWalk' })).toBeVisible();
    });
    await step('Editar abre o formulário preenchido', async () => {
      const card = canvas.getByRole('heading', { name: 'Senior Backend Software Engineer — BamBams' }).closest('article')!;
      await userEvent.click(within(card as HTMLElement).getByRole('button', { name: 'Editar' }));
      await expect(dialog(canvas, 'Editar experiência').getByRole('textbox', { name: 'Empresa' })).toHaveValue('BamBams');
      await userEvent.click(dialog(canvas, 'Editar experiência').getByRole('button', { name: 'Cancelar' }));
    });
    await step('Skills aparecem agrupadas', async () => {
      const skills = within(canvas.getByRole('region', { name: 'Skills' }));
      await expect(skills.getByRole('heading', { name: 'Linguagens' })).toBeVisible();
      await expect(skills.getByText('Bedrock AgentCore')).toBeVisible();
    });
  },
};

export const US_4_2: Story = {
  name: 'US-4.2 · Versionar o currículo base',
  parameters: { userStory: 'US-4.2' },
  args: { initialRoute: 'profile' },
  play: async ({ canvas, userEvent, step }) => {
    await step('“Salvar como v5” cria a versão e atualiza a navegação', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Salvar como v5' }));
      await expectToast(canvas, 'Currículo base salvo como v5.');
      await expect(sidebarNav(canvas).getByRole('link', { name: /Currículo base\s*v5/ })).toBeVisible();
      await expect(canvas.getByRole('button', { name: 'Salvar como v6' })).toBeVisible();
    });
    await step('O histórico lista as versões com data, nota e documentos', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Histórico de versões' }));
      const history = within(dialog(canvas, 'Histórico de versões').getByRole('list', { name: 'Versões do currículo base' }));
      await expect(history.getAllByRole('listitem')).toHaveLength(5);
      await expect(history.getByText('atual')).toBeVisible();
      await expect(history.getByText('11 documentos gerados')).toBeVisible();
    });
    await step('Versões antigas podem ser restauradas', async () => {
      await userEvent.click(dialog(canvas, 'Histórico de versões').getByRole('button', { name: 'Restaurar v3' }));
      await expectToast(canvas, 'v3 carregada como rascunho — salve para criar a v6.');
    });
  },
};

export const US_4_3: Story = {
  name: 'US-4.3 · Importar de PDF ou LinkedIn',
  parameters: { userStory: 'US-4.3' },
  args: { initialRoute: 'profile' },
  play: async ({ canvas, userEvent, step }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Importar de PDF ou LinkedIn' }));
    const form = () => dialog(canvas, 'Importar currículo');
    await step('“Importar” só habilita com arquivo ou URL', async () => {
      await expect(form().getByRole('button', { name: 'Importar' })).toBeDisabled();
      await userEvent.upload(form().getByLabelText('Arquivo do currículo (PDF)'), new File(['%PDF-1.7'], 'matheus-cv.pdf', { type: 'application/pdf' }));
      await expect(form().getByText('Selecionado: matheus-cv.pdf')).toBeVisible();
      await expect(form().getByRole('button', { name: 'Importar' })).toBeEnabled();
    });
    await step('Também aceita o perfil do LinkedIn', async () => {
      await userEvent.click(form().getByRole('radio', { name: /LinkedIn/ }));
      await expect(form().getByRole('button', { name: 'Importar' })).toBeDisabled();
      await userEvent.type(form().getByRole('textbox', { name: 'URL do perfil' }), 'https://linkedin.com/in/matheus-moraes');
    });
    await step('Ao terminar, mostra o que foi encontrado e pede revisão', async () => {
      await userEvent.click(form().getByRole('button', { name: 'Importar' }));
      await expect(await form().findByText('4 experiências, 1 formação e 14 skills encontradas.', {}, ASYNC)).toBeVisible();
      await userEvent.click(form().getByRole('button', { name: 'Revisar campos importados' }));
      await expectToast(canvas, /nada foi salvo ainda/);
    });
  },
};

export const US_4_4: Story = {
  name: 'US-4.4 · Definir regras de geração',
  parameters: { userStory: 'US-4.4' },
  args: { initialRoute: 'profile' },
  play: async ({ canvas, userEvent, step }) => {
    await step('Cada regra liga e desliga', async () => {
      const onePage = canvas.getByRole('checkbox', { name: 'Limitar o CV a 1 página quando possível' });
      await userEvent.click(onePage);
      await expect(onePage).toBeChecked();
      const highlight = canvas.getByRole('checkbox', { name: 'Destacar em verde os trechos reescritos para cada vaga' });
      await userEvent.click(highlight);
      await expect(highlight).not.toBeChecked();
    });
  },
};

export const US_4_5: Story = {
  name: 'US-4.5 · Definir preferências de busca',
  parameters: { userStory: 'US-4.5' },
  args: { initialRoute: 'profile' },
  play: async ({ canvas, userEvent, step }) => {
    const prefs = () => within(canvas.getByRole('region', { name: 'Preferências de busca' }));
    await step('Preferências aparecem como rótulo → valor', async () => {
      await expect(prefs().getByText('Contractor via PJ próprio')).toBeVisible();
    });
    await step('Editar e salvar atualiza a lista', async () => {
      await userEvent.click(prefs().getByRole('button', { name: 'Editar' }));
      const form = dialog(canvas, 'Preferências de busca');
      const salary = form.getByRole('textbox', { name: 'Remuneração mínima' });
      await userEvent.clear(salary);
      await userEvent.type(salary, 'US$ 120k/ano');
      await userEvent.click(form.getByRole('button', { name: 'Salvar preferências' }));
      await expectToast(canvas, 'Preferências salvas.');
      await expect(prefs().getByText('US$ 120k/ano')).toBeVisible();
    });
  },
};
