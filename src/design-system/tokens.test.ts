import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { cssVar, cssVarName, flattenTokens } from './tokens';

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((f: string) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

describe('tokens', () => {
  const names = new Set(flattenTokens().map(([k]) => k));

  it('gera nomes em kebab-case com prefixo jt', () => {
    expect(cssVarName(['color', 'primarySoft'])).toBe('--jt-color-primary-soft');
    expect(cssVar('status', 'applied', 'bg')).toBe('var(--jt-status-applied-bg)');
    expect(names.has('--jt-text-display-size')).toBe(true);
  });

  it('todas as variáveis --jt-* usadas nos componentes existem', () => {
    const files = walk(fileURLToPath(new URL('..', import.meta.url))).filter((f) => /\.(module\.css|tsx)$/.test(f));
    const missing: string[] = [];
    for (const f of files) {
      for (const m of readFileSync(f, 'utf8').matchAll(/var\((--jt-[a-z0-9-]+)/g)) {
        if (!names.has(m[1]!)) missing.push(`${m[1]} em ${f}`);
      }
    }
    expect(missing).toEqual([]);
  });
});
