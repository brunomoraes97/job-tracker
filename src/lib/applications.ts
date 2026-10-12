import type { Application, ApplicationDraft } from '@/types';

export type DraftErrors = Partial<Record<keyof ApplicationDraft, string>>;

/** Campos obrigatórios da candidatura manual. */
export function validateDraft(d: ApplicationDraft): DraftErrors {
  const e: DraftErrors = {};
  if (!d.company.trim()) e.company = 'Informe a empresa.';
  if (!d.role.trim()) e.role = 'Informe o cargo.';
  if (d.url.trim() && !/^https?:\/\/\S+\.\S+/.test(d.url.trim())) e.url = 'Use um link completo, começando com https://';
  return e;
}

const titleCase = (s: string) =>
  s
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w[0]!.toUpperCase() + w.slice(1))
    .join(' ');

/** Nome da empresa a partir do link de uma vaga em um ATS conhecido (ou do domínio). */
export function companyFromJobUrl(url: string): string | null {
  try {
    const u = new URL(url.trim());
    const [first] = u.pathname.split('/').filter(Boolean);
    if (/(greenhouse\.io|lever\.co|ashbyhq\.com|workable\.com|smartrecruiters\.com)$/.test(u.hostname) && first) return titleCase(first);
    const host = u.hostname.replace(/^(www|jobs|careers|boards)\./, '').split('.')[0];
    return host ? titleCase(host) : null;
  } catch {
    return null;
  }
}

/** "22/09" → "2026-09-22" (ano de referência configurável). */
export const ddmmToIso = (ddmm: string | undefined, year = 2026) => {
  const m = ddmm?.match(/^(\d{2})\/(\d{2})$/);
  return m ? `${year}-${m[2]}-${m[1]}` : '';
};

/** "2026-09-22" → "22/09". */
export const isoToDdmm = (iso: string) => {
  const m = iso.match(/^\d{4}-(\d{2})-(\d{2})$/);
  return m ? `${m[2]}/${m[1]}` : undefined;
};

/** Dias de atraso extraídos do próximo passo ("Follow-up atrasado 4 dias" → 4). */
export const overdueDays = (a: Application) => (a.nextStepOverdue ? Number(a.nextStep.match(/(\d+)/)?.[1] ?? 1) : 0);

/** Candidatura com o follow-up mais atrasado, ignorando as já dispensadas. */
export function mostOverdue(apps: Application[], dismissed: string[] = []) {
  return apps
    .filter((a) => a.nextStepOverdue && !dismissed.includes(a.id))
    .sort((a, b) => overdueDays(b) - overdueDays(a))[0];
}
