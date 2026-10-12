import { describe, expect, it } from 'vitest';
import { companyFromJobUrl, ddmmToIso, isoToDdmm, mostOverdue, validateDraft } from './applications';
import { applications, emptyDraft } from '@/mocks/fixtures';

describe('applications', () => {
  it('exige empresa e cargo e valida o link', () => {
    expect(validateDraft(emptyDraft)).toEqual({ company: 'Informe a empresa.', role: 'Informe o cargo.' });
    expect(validateDraft({ ...emptyDraft, company: 'A', role: 'B', url: 'lever' }).url).toBeDefined();
    expect(validateDraft({ ...emptyDraft, company: 'A', role: 'B', url: 'https://jobs.lever.co/acme/1' })).toEqual({});
  });
  it('extrai a empresa do link do ATS', () => {
    expect(companyFromJobUrl('https://jobs.lever.co/acme-robotics/123')).toBe('Acme Robotics');
    expect(companyFromJobUrl('https://boards.greenhouse.io/lumenfreight/jobs/9')).toBe('Lumenfreight');
    expect(companyFromJobUrl('https://careers.northbeam.io/x')).toBe('Northbeam');
    expect(companyFromJobUrl('nada')).toBeNull();
  });
  it('converte datas', () => {
    expect(ddmmToIso('22/09')).toBe('2026-09-22');
    expect(isoToDdmm('2026-09-22')).toBe('22/09');
  });
  it('acha o follow-up mais atrasado', () => {
    expect(mostOverdue(applications)?.company).toBe('Quill Data');
    expect(mostOverdue(applications, ['a5'])?.company).toBe('Kiln Pay');
  });
});
