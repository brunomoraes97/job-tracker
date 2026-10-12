import { expect, waitFor, within } from 'storybook/test';

type Canvas = ReturnType<typeof within>;

/** Tempo máximo para operações simuladas (SIM_DELAY + folga). */
export const ASYNC = { timeout: 3000 };

export const sidebarNav = (canvas: Canvas) => within(canvas.getByRole('navigation', { name: 'Principal' }));

/** Espera o aviso (toast) com o texto informado. */
export async function expectToast(canvas: Canvas, text: RegExp | string) {
  const toast = await waitFor(() => {
    const el = canvas.getAllByRole('status').find((s: HTMLElement) => (typeof text === 'string' ? s.textContent?.includes(text) : text.test(s.textContent ?? '')));
    if (!el) throw new Error(`Aviso não encontrado: ${String(text)}`);
    return el;
  }, ASYNC);
  await expect(toast).toBeVisible();
  return within(toast);
}

/** Valores de match na ordem exibida. */
export const matchValues = (scope: Canvas) => scope.getAllByLabelText(/% de match$/).map((el: HTMLElement) => Number(el.getAttribute('aria-label')!.split('%')[0]));
