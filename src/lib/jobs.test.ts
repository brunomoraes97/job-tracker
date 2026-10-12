import { describe, expect, it } from 'vitest';
import { filterJobs } from './jobs';
import { jobs } from '@/mocks/fixtures';

const off = ['remote', 'go', 'aws', 'senior', 'tz', 'pj'].map((id) => ({ id, selected: false }));
const on = (...ids: string[]) => off.map((f) => ({ ...f, selected: ids.includes(f.id) }));

describe('filterJobs', () => {
  it('ordena por match decrescente', () => {
    const m = filterJobs([...jobs].reverse(), '', off).map((j) => j.match);
    expect(m).toEqual([...m].sort((a, b) => b - a));
  });
  it('combina filtros com E', () => {
    expect(filterJobs(jobs, '', on('remote')).map((j) => j.id)).toEqual(['j1', 'j2', 'j3', 'j4']);
    expect(filterJobs(jobs, '', on('remote', 'go', 'aws')).map((j) => j.id)).toEqual(['j1', 'j2']);
  });
  it('busca por cargo, empresa ou tag sem diferenciar maiúsculas', () => {
    expect(filterJobs(jobs, 'kiln', off).map((j) => j.id)).toEqual(['j3']);
    expect(filterJobs(jobs, 'langgraph', off).map((j) => j.id)).toEqual(['j4']);
  });
});
