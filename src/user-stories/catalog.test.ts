import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { userStoryList } from './catalog';

describe('catálogo de histórias', () => {
  it('tem os mesmos IDs e títulos que docs/user-stories.md', () => {
    const md = readFileSync(fileURLToPath(new URL('../../docs/user-stories.md', import.meta.url)), 'utf8');
    const fromDoc = [...md.matchAll(/^### (US-\d+\.\d+) · (.+?) — ([MSC])$/gm)].map((m) => `${m[1]} ${m[2]} ${m[3]}`);
    const fromCatalog = userStoryList.map((s) => `${s.id} ${s.title} ${s.priority}`);
    expect(fromCatalog).toEqual(fromDoc);
  });
});
