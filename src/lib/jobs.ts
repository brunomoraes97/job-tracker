import type { Job } from '@/types';

export interface JobFilterState {
  id: string;
  selected: boolean;
}

/** Predicados dos chips de filtro do feed. */
export const jobFilterPredicates: Record<string, (j: Job) => boolean> = {
  remote: (j) => /remoto/i.test(j.location),
  go: (j) => j.tags.includes('Go'),
  aws: (j) => j.tags.some((t) => t.startsWith('AWS')),
  senior: (j) => /senior|staff|principal|sênior/i.test(j.title),
  tz: (j) => /eua|américas|americas/i.test(j.location),
  pj: (j) => (j.highlights ?? []).some((h) => /contractor|pj/i.test(h)),
};

/** Aplica busca textual + filtros ligados e ordena por match (maior primeiro). */
export function filterJobs(jobs: Job[], query: string, filters: JobFilterState[]) {
  const q = query.trim().toLowerCase();
  const active = filters.filter((f) => f.selected && jobFilterPredicates[f.id]);
  return jobs
    .filter((j) => !q || [j.title, j.company.name, ...j.tags].some((t) => t.toLowerCase().includes(q)))
    .filter((j) => active.every((f) => jobFilterPredicates[f.id]!(j)))
    .sort((a, b) => b.match - a.match);
}
