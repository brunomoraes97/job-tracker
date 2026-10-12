import type { DorkFields, DorkPart, DorkResult, DorkSite } from '@/types';

/** Limite de palavras que o Google considera numa busca. */
export const GOOGLE_WORD_LIMIT = 32;

export const splitList = (value: string) =>
  value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

const quoteIfNeeded = (term: string) => (/\s/.test(term) ? `"${term}"` : term);
const anyOf = (items: string[]) => (items.length > 1 ? `(${items.join(' OR ')})` : (items[0] ?? ''));

/** Conta palavras como o Google: operadores `OR` e pontuação de agrupamento não contam. */
export function countWords(query: string) {
  return query
    .replace(/[()"]/g, ' ')
    .split(/\s+/)
    .filter((w) => w && w !== 'OR').length;
}

/** Data ISO (YYYY-MM-DD) `days` dias antes de `now`, para o operador `after:`. */
export function afterDate(days: number, now: Date) {
  return new Date(now.getTime() - days * 86_400_000).toISOString().slice(0, 10);
}

/**
 * Compila os campos do formulário num Google Dork.
 * Função pura: mesma entrada → mesma saída (passe `now` para datas determinísticas).
 */
export function buildDork(fields: DorkFields, sites: DorkSite[], now: Date = new Date()): DorkResult {
  const selected = sites.filter((s) => fields.siteIds.includes(s.id));
  const roles = splitList(fields.roles).map((r) => (fields.requireInTitle ? `intitle:"${r}"` : `"${r}"`));

  const parts: DorkPart[] = [
    {
      kind: 'sites',
      label: 'Sites',
      text: anyOf(selected.map((s) => `site:${s.domain}`)),
      explanation: 'Restringe aos sistemas de recrutamento escolhidos — só páginas de vaga, sem agregadores.',
    },
    {
      kind: 'roles',
      label: 'Cargos',
      text: anyOf(roles),
      explanation: fields.requireInTitle
        ? 'Aspas exigem a frase exata; intitle: exige que ela esteja no título da vaga.'
        : 'Aspas exigem a frase exata; OR aceita qualquer um dos cargos.',
    },
    {
      kind: 'keywords',
      label: 'Palavras-chave',
      text: splitList(fields.keywords).map(quoteIfNeeded).join(' '),
      explanation: 'Todas precisam aparecer na página (o Google trata espaço como “E”).',
    },
    {
      kind: 'location',
      label: 'Localização',
      text: anyOf(splitList(fields.location).map(quoteIfNeeded)),
      explanation: 'Pelo menos um destes termos de modalidade ou região.',
    },
    {
      kind: 'exclusions',
      label: 'Exclusões',
      text: splitList(fields.exclude)
        .map((t) => `-${quoteIfNeeded(t)}`)
        .join(' '),
      explanation: 'O sinal de menos remove páginas que mencionam esses termos.',
    },
    {
      kind: 'date',
      label: 'Data',
      text: fields.recency === 'any' ? '' : `after:${afterDate(Number(fields.recency), now)}`,
      explanation: 'after: filtra pela data em que o Google indexou a página (aproximado).',
    },
  ].filter((p): p is DorkPart => p.text.length > 0) as DorkPart[];

  const query = parts.map((p) => p.text).join(' ');
  const wordCount = query ? countWords(query) : 0;
  return {
    query,
    parts,
    wordCount,
    overLimit: wordCount > GOOGLE_WORD_LIMIT,
    googleUrl: `https://www.google.com/search?${new URLSearchParams({ q: query }).toString()}`,
  };
}
