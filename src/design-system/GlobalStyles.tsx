import { flattenTokens } from './tokens';

const base = `
*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  background: var(--jt-color-canvas);
  color: var(--jt-color-text);
  font-family: var(--jt-text-body-family);
  font-size: var(--jt-text-body-size);
  line-height: var(--jt-text-body-line-height);
  -webkit-font-smoothing: antialiased;
}
button, input, select, textarea { font: inherit; color: inherit; }
a { color: var(--jt-color-primary); text-decoration: none; }
a:hover { color: var(--jt-color-primary-hover); }
:focus-visible { outline: none; box-shadow: var(--jt-shadow-focus); border-radius: var(--jt-radius-sm); }
code, kbd { font-family: var(--jt-font-mono); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition-duration: 0ms !important; animation-duration: 0ms !important; }
}
`;

/** CSS gerado a partir dos tokens. Exportado para testes e para o app. */
export const tokensCss = `:root {\n${flattenTokens()
  .map(([k, v]) => `  ${k}: ${v};`)
  .join('\n')}\n}\n${base}`;

/** Injeta tokens e estilos base. Deve envolver a aplicação (e é o decorator global do Storybook). */
export function GlobalStyles() {
  return <style data-jt-tokens="">{tokensCss}</style>;
}
