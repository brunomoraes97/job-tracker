import { describe, expect, it } from 'vitest';
import { buildDork, countWords, splitList } from './dork';
import type { DorkFields, DorkSite } from '@/types';

const sites: DorkSite[] = [
  { id: 'gh', label: 'Greenhouse', domain: 'boards.greenhouse.io' },
  { id: 'lever', label: 'Lever', domain: 'jobs.lever.co' },
];
const base: DorkFields = {
  roles: 'Senior Backend Engineer, Backend Engineer',
  requireInTitle: false,
  keywords: 'golang, AWS',
  location: 'remote, LATAM',
  exclude: 'hybrid, security clearance',
  siteIds: ['gh', 'lever'],
  recency: '7',
};
const now = new Date('2026-09-28T12:00:00Z');

describe('buildDork', () => {
  it('compila todas as partes na ordem certa', () => {
    expect(buildDork(base, sites, now).query).toBe(
      '(site:boards.greenhouse.io OR site:jobs.lever.co) ("Senior Backend Engineer" OR "Backend Engineer") golang AWS (remote OR LATAM) -hybrid -"security clearance" after:2026-09-21',
    );
  });

  it('usa intitle: quando o cargo é exigido no título', () => {
    const r = buildDork({ ...base, roles: 'Staff Engineer', requireInTitle: true }, sites, now);
    expect(r.query).toContain('intitle:"Staff Engineer"');
    expect(r.query).not.toContain('(intitle');
  });

  it('omite partes vazias e a data quando recency = any', () => {
    const r = buildDork({ ...base, keywords: '', exclude: ' , ', siteIds: [], recency: 'any' }, sites, now);
    expect(r.parts.map((p) => p.kind)).toEqual(['roles', 'location']);
  });

  it('marca quando passa do limite de 32 palavras', () => {
    const many = Array.from({ length: 40 }, (_, i) => `k${i}`).join(', ');
    expect(buildDork({ ...base, keywords: many }, sites, now).overLimit).toBe(true);
  });

  it('gera URL do Google codificada', () => {
    expect(buildDork(base, sites, now).googleUrl).toMatch(/^https:\/\/www\.google\.com\/search\?q=%28site%3A/);
  });
});

describe('helpers', () => {
  it('splitList ignora itens vazios', () => expect(splitList(' a, ,b ,')).toEqual(['a', 'b']));
  it('countWords ignora OR e agrupamento', () => expect(countWords('(a OR b) "c d" -e')).toBe(5));
});
