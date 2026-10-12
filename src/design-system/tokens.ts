/**
 * Radar Design Tokens — fonte única de verdade.
 *
 * Todos os valores visuais do produto vivem aqui. `GlobalStyles` converte este
 * objeto em CSS custom properties (`--jt-*`) e os componentes consomem apenas
 * essas variáveis — nunca valores soltos.
 *
 * Convenção de nomes: caminho do token em kebab-case com prefixo `jt`.
 *   color.primarySoft      → --jt-color-primary-soft
 *   status.applied.bg      → --jt-status-applied-bg
 */

export const color = {
  // Superfícies
  canvas: '#F5F3EE',
  canvasDeep: '#E7E3DA',
  surface: '#FFFFFF',
  surfaceSunken: '#F7F5F0',
  surfaceChip: '#F1EEE7',
  track: '#EAE6DD',
  column: '#ECE8E0',

  // Bordas
  border: '#E3DED4',
  borderStrong: '#D5CFC3',
  borderSoft: '#EEEAE2',

  // Texto
  text: '#1C1B19',
  textSecondary: '#3A3833',
  textMuted: '#5E5A52',
  textSubtle: '#8A857B',
  textInverse: '#FFFFFF',

  // Marca
  primary: '#0E6B5E',
  primaryHover: '#0A4F45',
  primarySoft: '#E1EFEA',
  primaryHighlight: '#D3EAE2',
  primaryBorder: '#B7D8CD',
  onPrimary: '#FFFFFF',

  // Feedback
  warning: '#9A5412',
  warningStrong: '#7A4210',
  warningBorder: '#B9894F',
  warningSoft: '#FBEBD3',
  danger: '#B4442F',
  dangerStrong: '#8A2F1E',
  dangerSoft: '#F8E3DE',
  info: '#4B6FA8',
  infoStrong: '#2F4F80',
  infoSoft: '#E3EAF5',

  // Navegação lateral (superfície escura)
  sidebarBg: '#1C1B19',
  sidebarRaised: '#2A2825',
  sidebarActive: '#33312D',
  sidebarText: '#EDEAE3',
  sidebarTextMuted: '#D6D2C8',
  sidebarTextSubtle: '#A8A399',
  sidebarAccent: '#7FD1BF',

  // Código / dork
  codeBg: '#1C1B19',
  codeText: '#EDEAE3',
  codeBorder: '#4A4742',
  codeRaised: '#2A2825',

  scrim: 'rgba(28, 27, 25, 0.32)',
} as const;

/** Etapas do funil de candidaturas. Diferem em luminosidade, não só em matiz. */
export const status = {
  saved: { dot: '#A8A399', bg: '#EEEAE2', fg: '#5E5A52' },
  applied: { dot: '#4B6FA8', bg: '#E3EAF5', fg: '#2F4F80' },
  talking: { dot: '#0E6B5E', bg: '#DCEBE6', fg: '#0A4F45' },
  interview: { dot: '#6A4FA8', bg: '#E8E2F4', fg: '#4B3F8A' },
  offer: { dot: '#2F7A3E', bg: '#1F5C2E', fg: '#FFFFFF' },
  closed: { dot: '#8A857B', bg: '#EEEAE2', fg: '#5E5A52' },
} as const;

/** Tons para monogramas de empresas. */
export const tint = {
  teal: { bg: '#DCEBE6', fg: '#0E6B5E' },
  amber: { bg: '#EFE3D3', fg: '#8A4B10' },
  violet: { bg: '#E4E1F0', fg: '#4B3F8A' },
  stone: { bg: '#E8E6E1', fg: '#3A3833' },
} as const;

/** Cores das partes de um Google Dork (dark = sobre fundo de código, light = legenda). */
export const dork = {
  sites: { dark: '#7FD1BF', light: '#0E6B5E' },
  roles: { dark: '#F5C77E', light: '#B8741A' },
  keywords: { dark: '#B7C8FF', light: '#4B6FA8' },
  location: { dark: '#D8B4FE', light: '#6A4FA8' },
  exclusions: { dark: '#FF9C8A', light: '#B4442F' },
  date: { dark: '#C9C4B8', light: '#8A857B' },
} as const;

export const font = {
  display: "'Fraunces Variable', Georgia, serif",
  sans: "'IBM Plex Sans', system-ui, -apple-system, sans-serif",
  serif: "'IBM Plex Serif', Georgia, serif",
  mono: "'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace",
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
} as const;

/** Estilos de texto nomeados. Cada um vira um conjunto de variáveis e uma variante de `<Text>`/`<Heading>`. */
export const textStyle = {
  display: { family: 'display', size: '36px', lineHeight: '1.1', weight: '600', tracking: '-0.6px' },
  title: { family: 'display', size: '28px', lineHeight: '1.15', weight: '600', tracking: '-0.4px' },
  heading: { family: 'display', size: '22px', lineHeight: '1.25', weight: '600', tracking: '-0.3px' },
  subheading: { family: 'sans', size: '16px', lineHeight: '1.4', weight: '600', tracking: '0' },
  bodyLg: { family: 'sans', size: '16px', lineHeight: '1.55', weight: '400', tracking: '0' },
  body: { family: 'sans', size: '14px', lineHeight: '1.55', weight: '400', tracking: '0' },
  small: { family: 'sans', size: '13px', lineHeight: '1.45', weight: '400', tracking: '0' },
  caption: { family: 'sans', size: '12px', lineHeight: '1.4', weight: '400', tracking: '0' },
  overline: { family: 'sans', size: '12px', lineHeight: '1.3', weight: '600', tracking: '0.8px' },
  mono: { family: 'mono', size: '12px', lineHeight: '1.5', weight: '400', tracking: '0' },
  metric: { family: 'display', size: '30px', lineHeight: '1', weight: '600', tracking: '-0.5px' },
} as const;

/** Escala de espaçamento em base 4px. */
export const space = {
  '0': '0px',
  '0-5': '2px',
  '1': '4px',
  '1-5': '6px',
  '2': '8px',
  '2-5': '10px',
  '3': '12px',
  '3-5': '14px',
  '4': '16px',
  '4-5': '18px',
  '5': '20px',
  '6': '24px',
  '7': '28px',
  '8': '32px',
  '9': '36px',
  '10': '40px',
  '12': '48px',
  '16': '64px',
} as const;

export const radius = {
  xs: '5px',
  sm: '6px',
  md: '8px',
  lg: '10px',
  xl: '12px',
  '2xl': '14px',
  pill: '999px',
} as const;

export const shadow = {
  sm: '0 1px 2px rgba(28, 27, 25, 0.12)',
  md: '0 6px 20px rgba(28, 27, 25, 0.14)',
  drawer: '-12px 0 32px rgba(28, 27, 25, 0.18)',
  focus: '0 0 0 3px rgba(14, 107, 94, 0.35)',
} as const;

export const size = {
  controlSm: '32px',
  controlMd: '40px',
  controlLg: '48px',
  touchMin: '44px',
  sidebar: '240px',
  drawer: '440px',
  detailPanel: '440px',
} as const;

export const motion = {
  fast: '120ms',
  base: '200ms',
  slow: '320ms',
  easing: 'cubic-bezier(0.2, 0, 0, 1)',
} as const;

export const zIndex = {
  base: '0',
  sticky: '10',
  overlay: '40',
  drawer: '50',
  toast: '60',
} as const;

export const tokens = {
  color,
  status,
  tint,
  dork,
  font,
  fontWeight,
  textStyle,
  space,
  radius,
  shadow,
  size,
  motion,
  zIndex,
} as const;

export type Tokens = typeof tokens;

const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

/** Nome da CSS custom property de um caminho de token. `cssVarName(['color','primary'])` → `--jt-color-primary`. */
export const cssVarName = (path: string[]) => `--jt-${path.map(kebab).join('-')}`;

/** Referência `var(--jt-…)` pronta para usar em estilos inline. */
export const cssVar = (...path: string[]) => `var(${cssVarName(path)})`;

/** Achata os tokens em pares [variável, valor]. Estilos de texto resolvem a família para a pilha de fontes. */
export function flattenTokens(): Array<[string, string]> {
  const out: Array<[string, string]> = [];
  const walk = (node: unknown, path: string[]) => {
    if (typeof node === 'string') {
      out.push([cssVarName(path), node]);
      return;
    }
    if (node && typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) walk(v, [...path, k]);
    }
  };
  const { textStyle: ts, ...rest } = tokens;
  walk(rest, []);
  for (const [name, style] of Object.entries(ts)) {
    out.push([cssVarName(['text', name, 'family']), font[style.family]]);
    out.push([cssVarName(['text', name, 'size']), style.size]);
    out.push([cssVarName(['text', name, 'line-height']), style.lineHeight]);
    out.push([cssVarName(['text', name, 'weight']), style.weight]);
    out.push([cssVarName(['text', name, 'tracking']), style.tracking]);
  }
  return out;
}
