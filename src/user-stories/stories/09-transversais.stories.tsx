import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { epicMeta } from '../harness/meta';
import { expectToast, sidebarNav } from '../harness/play';
import type { PrototypeApp } from '../harness/PrototypeApp';
import { DesignSystemPreview } from '../harness/DesignSystemPreview';

const meta = { ...epicMeta(9), title: 'Histórias de usuário/9 · Transversais' } satisfies Meta<typeof PrototypeApp>;
export default meta;
type Story = StoryObj<typeof meta>;

export const US_9_1: Story = {
  name: 'US-9.1 · Navegar entre as seções',
  parameters: { userStory: 'US-9.1' },
  args: { initialRoute: 'jobs' },
  play: async ({ canvas, userEvent, step }) => {
    const nav = () => sidebarNav(canvas);
    await step('O item ativo é marcado', async () => {
      await expect(nav().getByRole('link', { name: /^Novas vagas/ })).toHaveAttribute('aria-current', 'page');
    });
    await step('Clicar troca de seção sem recarregar', async () => {
      for (const [link, heading] of [['Buscas automatizadas', 'Buscas automatizadas'], ['Google Dorking', 'Google Dorking'], ['Estúdio de currículo', 'Estúdio de currículo'], ['Candidaturas', 'Candidaturas']] as const) {
        await userEvent.click(nav().getByRole('link', { name: new RegExp(`^${link}`) }));
        await expect(canvas.getByRole('heading', { level: 1, name: heading })).toBeVisible();
        await expect(nav().getByRole('link', { name: new RegExp(`^${link}`) })).toHaveAttribute('aria-current', 'page');
      }
    });
    await step('Contadores refletem o estado', async () => {
      await expect(nav().getByRole('link', { name: /^Candidaturas/ })).toHaveTextContent('10');
      await userEvent.click(nav().getByRole('link', { name: /^Novas vagas/ }));
      await userEvent.click(canvas.getByRole('button', { name: 'Remoto' }));
      await userEvent.click(canvas.getByRole('button', { name: 'Backend Engineer (Java)' }));
      await userEvent.click(canvas.getByRole('button', { name: 'Salvar no tracker' }));
      await expectToast(canvas, /Vireo Commerce salva/);
      await expect(nav().getByRole('link', { name: /^Candidaturas/ })).toHaveTextContent('11');
    });
  },
};

export const US_9_2: Story = {
  name: 'US-9.2 · Usar o app só com teclado e leitor de tela',
  parameters: { userStory: 'US-9.2' },
  args: { initialRoute: 'jobs' },
  play: async ({ canvas, canvasElement, userEvent, step }) => {
    const search = canvas.getByRole('searchbox', { name: 'Buscar vagas' });
    await step('Tab percorre os controles até a busca, com foco visível', async () => {
      (canvasElement.ownerDocument.activeElement as HTMLElement | null)?.blur();
      let hops = 0;
      while (canvasElement.ownerDocument.activeElement !== search && hops < 40) {
        await userEvent.tab();
        hops++;
      }
      await expect(search).toHaveFocus();
      await userEvent.keyboard('kiln');
      await expect(canvas.getByText(/^1 resultado/)).toBeVisible();
      await userEvent.tab();
      const chip = canvas.getByRole('button', { name: 'Remoto' });
      await expect(chip).toHaveFocus();
      await expect(getComputedStyle(chip).boxShadow).not.toBe('none');
    });
    await step('Espaço aciona chips; Enter abre o drawer; Esc fecha', async () => {
      await userEvent.keyboard(' ');
      await expect(canvas.getByRole('button', { name: 'Remoto' })).toHaveAttribute('aria-pressed', 'false');
      canvas.getByRole('button', { name: 'Alertas diários' }).focus();
      await userEvent.keyboard('{Enter}');
      await expect(canvas.getByRole('dialog', { name: 'Alertas de vagas' })).toBeVisible();
      await userEvent.keyboard('{Escape}');
      await expect(canvas.queryByRole('dialog')).toBeNull();
    });
    await step('Controles com nome acessível (o addon a11y valida a tela inteira)', async () => {
      await expect(canvas.getByRole('button', { name: 'Alertas diários' })).toBeVisible();
      await expect(canvas.getByRole('navigation', { name: 'Principal' })).toBeVisible();
    });
  },
};

export const US_9_3: Story = {
  name: 'US-9.3 · Consultar o design system',
  parameters: { userStory: 'US-9.3', layout: 'fullscreen' },
  render: () => <DesignSystemPreview />,
  play: async ({ canvas, step }) => {
    await step('Cores, tipografia e ícones vêm dos tokens', async () => {
      await expect(canvas.getByText('#0E6B5E')).toBeVisible();
      await expect(canvas.getByText('--jt-color-primary')).toBeVisible();
      await expect(canvas.getAllByText('Novas vagas 94%').length).toBeGreaterThan(5);
      await expect(canvas.getByText('sparkSearch')).toBeVisible();
    });
    await step('Links para a referência completa e a documentação', async () => {
      const links = within(canvas.getByRole('navigation', { name: 'Documentação do design system' }));
      await expect(links.getByRole('link', { name: /Visão geral/ })).toHaveAttribute('href', expect.stringContaining('design-system-vis'));
      await expect(links.getByRole('link', { name: /Tokens/ })).toBeVisible();
    });
  },
};
