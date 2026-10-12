/**
 * Blocos de documentação do design system — leem os valores direto de `tokens.ts`,
 * então a documentação nunca diverge do código.
 */
import type { CSSProperties, ReactNode } from 'react';
import { Icon, iconNames } from '@/components/atoms/Icon';
import { color, cssVarName, dork, font, motion, radius, shadow, size, space, status, textStyle, tint, zIndex, flattenTokens } from '../tokens';

const mono: CSSProperties = { fontFamily: font.mono, fontSize: 12 };
const muted: CSSProperties = { color: color.textMuted };

function hexToRgb(hex: string) {
  const m = hex.replace('#', '');
  if (m.length !== 6) return null;
  return [0, 2, 4].map((i) => parseInt(m.slice(i, i + 2), 16) / 255);
}
function luminance(hex: string) {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const [r, g, b] = rgb.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
/** Razão de contraste WCAG entre duas cores hex. */
export function contrast(a: string, b: string) {
  const la = luminance(a);
  const lb = luminance(b);
  if (la == null || lb == null) return null;
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

const Grid = ({ children, min = 180 }: { children: ReactNode; min?: number }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))`, gap: 12, margin: '16px 0 28px' }}>{children}</div>
);

function Swatch({ name, value, path }: { name: string; value: string; path: string[] }) {
  const onWhite = contrast(value, '#FFFFFF');
  const onInk = contrast(value, color.text);
  return (
    <div style={{ border: `1px solid ${color.border}`, borderRadius: 10, overflow: 'hidden', background: '#fff' }}>
      <div style={{ height: 64, background: value, borderBottom: `1px solid ${color.borderSoft}` }} />
      <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <strong style={{ fontSize: 13 }}>{name}</strong>
        <code style={mono}>{value}</code>
        <code style={{ ...mono, ...muted, fontSize: 11 }}>{cssVarName(path)}</code>
        {onWhite && (
          <span style={{ ...muted, fontSize: 11 }}>
            vs branco {onWhite.toFixed(1)}:1 · vs tinta {onInk!.toFixed(1)}:1
          </span>
        )}
      </div>
    </div>
  );
}

const groups: Record<string, Array<keyof typeof color>> = {
  Marca: ['primary', 'primaryHover', 'primarySoft', 'primaryHighlight', 'primaryBorder', 'onPrimary'],
  Superfícies: ['canvas', 'canvasDeep', 'surface', 'surfaceSunken', 'surfaceChip', 'track', 'column'],
  Bordas: ['border', 'borderStrong', 'borderSoft'],
  Texto: ['text', 'textSecondary', 'textMuted', 'textSubtle', 'textInverse'],
  Feedback: ['warning', 'warningStrong', 'warningBorder', 'warningSoft', 'danger', 'dangerStrong', 'dangerSoft', 'info', 'infoStrong', 'infoSoft'],
  'Navegação lateral': ['sidebarBg', 'sidebarRaised', 'sidebarActive', 'sidebarText', 'sidebarTextMuted', 'sidebarTextSubtle', 'sidebarAccent'],
  'Código e sobreposição': ['codeBg', 'codeText', 'codeBorder', 'codeRaised', 'scrim'],
};

export function ColorPalette({ group }: { group: keyof typeof groups }) {
  return (
    <Grid>
      {groups[group]!.map((k) => <Swatch key={k} name={k} value={color[k]} path={['color', k]} />)}
    </Grid>
  );
}

const stageNames: Record<keyof typeof status, string> = { saved: 'Salva', applied: 'Aplicada', talking: 'Em conversa', interview: 'Entrevista', offer: 'Oferta', closed: 'Encerrada' };

export function StatusPalette() {
  return (
    <Grid min={200}>
      {(Object.keys(status) as Array<keyof typeof status>).map((k) => (
        <div key={k} style={{ border: `1px solid ${color.border}`, borderRadius: 10, padding: 12, background: '#fff', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: 14 }}>
            <span style={{ width: 10, height: 10, borderRadius: 5, background: status[k].dot }} />
            {stageNames[k]} <code style={{ ...mono, ...muted }}>{k}</code>
          </span>
          <span style={{ alignSelf: 'flex-start', padding: '3px 9px', borderRadius: 999, fontSize: 12, fontWeight: 500, background: status[k].bg, color: status[k].fg }}>{stageNames[k]}</span>
          <code style={{ ...mono, ...muted, fontSize: 11 }}>--jt-status-{k}-dot | -bg | -fg</code>
        </div>
      ))}
    </Grid>
  );
}

export function TintPalette() {
  return (
    <Grid min={150}>
      {(Object.keys(tint) as Array<keyof typeof tint>).map((k) => (
        <div key={k} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ width: 44, height: 44, borderRadius: 10, display: 'grid', placeItems: 'center', fontWeight: 600, background: tint[k].bg, color: tint[k].fg }}>LF</span>
          <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 13 }}>{k}</strong><code style={{ ...mono, ...muted, fontSize: 11 }}>--jt-tint-{k}-*</code></span>
        </div>
      ))}
    </Grid>
  );
}

export function DorkPalette() {
  return (
    <div style={{ background: color.codeBg, color: color.codeText, borderRadius: 14, padding: 20, margin: '16px 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {(Object.keys(dork) as Array<keyof typeof dork>).map((k) => (
        <div key={k} style={{ display: 'flex', gap: 14, alignItems: 'center', ...mono, fontSize: 13 }}>
          <span style={{ width: 120, color: dork[k].dark }}>{k}</span>
          <span style={{ width: 14, height: 14, borderRadius: 3, background: dork[k].light }} />
          <span style={{ color: '#A8A399' }}>dark {dork[k].dark} · light {dork[k].light}</span>
        </div>
      ))}
    </div>
  );
}

export function FontFamilies() {
  const samples: Record<keyof typeof font, string> = {
    display: 'Fraunces — títulos e números de destaque',
    sans: 'IBM Plex Sans — interface, rótulos e corpo de texto',
    serif: 'IBM Plex Serif — corpo da cover letter e nome no CV',
    mono: 'IBM Plex Mono — contagens, salários, dorks e código',
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: '16px 0 28px' }}>
      {(Object.keys(font) as Array<keyof typeof font>).map((k) => (
        <div key={k} style={{ display: 'flex', gap: 20, alignItems: 'baseline', borderBottom: `1px solid ${color.borderSoft}`, paddingBottom: 12 }}>
          <code style={{ ...mono, width: 120, flexShrink: 0 }}>font.{k}</code>
          <span style={{ fontFamily: font[k], fontSize: 22 }}>{samples[k]}</span>
        </div>
      ))}
    </div>
  );
}

export function TypeScale() {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0 28px' }}>
      <thead>
        <tr style={{ textAlign: 'left', ...muted, fontSize: 12 }}>
          <th style={{ padding: 8 }}>Estilo</th><th style={{ padding: 8 }}>Exemplo</th><th style={{ padding: 8 }}>Família</th><th style={{ padding: 8 }}>Tamanho / altura</th><th style={{ padding: 8 }}>Peso</th>
        </tr>
      </thead>
      <tbody>
        {(Object.keys(textStyle) as Array<keyof typeof textStyle>).map((k) => {
          const s = textStyle[k];
          return (
            <tr key={k} style={{ borderTop: `1px solid ${color.borderSoft}` }}>
              <td style={{ padding: 8 }}><code style={mono}>{k}</code></td>
              <td style={{ padding: 8, fontFamily: font[s.family], fontSize: s.size, lineHeight: s.lineHeight, fontWeight: Number(s.weight), letterSpacing: s.tracking, textTransform: k === 'overline' ? 'uppercase' : undefined }}>Novas vagas 94%</td>
              <td style={{ padding: 8, ...mono }}>{s.family}</td>
              <td style={{ padding: 8, ...mono }}>{s.size} / {s.lineHeight}</td>
              <td style={{ padding: 8, ...mono }}>{s.weight}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function SpaceScale() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '16px 0 28px' }}>
      {(Object.keys(space) as Array<keyof typeof space>).sort((a, b) => parseFloat(space[a]) - parseFloat(space[b])).map((k) => (
        <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <code style={{ ...mono, width: 140 }}>--jt-space-{k}</code>
          <code style={{ ...mono, ...muted, width: 48 }}>{space[k]}</code>
          <span style={{ height: 14, width: space[k], background: color.primary, borderRadius: 2 }} />
        </div>
      ))}
    </div>
  );
}

export function RadiusScale() {
  return (
    <Grid min={120}>
      {(Object.keys(radius) as Array<keyof typeof radius>).map((k) => (
        <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
          <span style={{ width: 88, height: 56, background: color.surface, border: `1px solid ${color.borderStrong}`, borderRadius: radius[k] }} />
          <code style={mono}>{k} · {radius[k]}</code>
        </div>
      ))}
    </Grid>
  );
}

export function ShadowScale() {
  return (
    <Grid min={180}>
      {(Object.keys(shadow) as Array<keyof typeof shadow>).map((k) => (
        <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ height: 72, background: color.surface, borderRadius: 12, boxShadow: shadow[k] }} />
          <code style={mono}>--jt-shadow-{k}</code>
          <code style={{ ...mono, ...muted, fontSize: 11 }}>{shadow[k]}</code>
        </div>
      ))}
    </Grid>
  );
}

export function SimpleTokenTable({ group }: { group: 'size' | 'motion' | 'zIndex' }) {
  const src = { size, motion, zIndex }[group] as Record<string, string>;
  return (
    <table style={{ borderCollapse: 'collapse', margin: '12px 0 28px', minWidth: 420 }}>
      <tbody>
        {Object.entries(src).map(([k, v]) => (
          <tr key={k} style={{ borderTop: `1px solid ${color.borderSoft}` }}>
            <td style={{ padding: '6px 16px 6px 0' }}><code style={mono}>{cssVarName([group, k])}</code></td>
            <td style={{ padding: '6px 0' }}><code style={{ ...mono, ...muted }}>{v}</code></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function IconGallery() {
  return (
    <Grid min={110}>
      {iconNames.map((n) => (
        <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 14, border: `1px solid ${color.border}`, borderRadius: 10, background: '#fff' }}>
          <Icon name={n} size={22} />
          <code style={{ ...mono, fontSize: 11 }}>{n}</code>
        </div>
      ))}
    </Grid>
  );
}

/** Todas as CSS custom properties geradas, com filtro por prefixo. */
export function AllTokens({ prefix = '' }: { prefix?: string }) {
  const rows = flattenTokens().filter(([k]) => k.startsWith(`--jt-${prefix}`));
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', margin: '12px 0 28px' }}>
      <thead><tr style={{ textAlign: 'left', ...muted, fontSize: 12 }}><th style={{ padding: 6 }}>Variável</th><th style={{ padding: 6 }}>Valor</th><th style={{ padding: 6 }} /></tr></thead>
      <tbody>
        {rows.map(([k, v]) => (
          <tr key={k} style={{ borderTop: `1px solid ${color.borderSoft}` }}>
            <td style={{ padding: 6 }}><code style={mono}>{k}</code></td>
            <td style={{ padding: 6 }}><code style={{ ...mono, ...muted }}>{v}</code></td>
            <td style={{ padding: 6, width: 40 }}>{/^#|^rgba/.test(v) && <span style={{ display: 'inline-block', width: 22, height: 22, borderRadius: 6, background: v, border: `1px solid ${color.border}` }} />}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function MotionDemo() {
  return <p style={{ ...muted, fontSize: 13 }}>Transições usam <code style={mono}>{motion.base} {motion.easing}</code>; com <code style={mono}>prefers-reduced-motion</code> todas as durações vão a zero.</p>;
}
