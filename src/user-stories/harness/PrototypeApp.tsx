/**
 * Protótipo navegável: um "container" de aplicação que só existe no Storybook.
 * Guarda o estado, recebe os eventos das páginas e decide o próximo estado —
 * exatamente o papel que a camada de aplicação real terá na fase 2.
 * As páginas e componentes continuam 100% governados por props.
 */
import { useEffect, useMemo, useRef, useState, type MouseEvent, type ReactElement } from 'react';
import { Toast } from '@/components/molecules/Toast';
import { AlertSettingsForm } from '@/components/organisms/AlertSettingsForm';
import { Drawer } from '@/components/organisms/Drawer';
import { ExperienceForm } from '@/components/organisms/ExperienceForm';
import { ImportResumeForm } from '@/components/organisms/ImportResumeForm';
import { KeyValueForm } from '@/components/organisms/KeyValueForm';
import { VersionHistory } from '@/components/organisms/VersionHistory';
import { ApplicationsBoardPage } from '@/components/pages/ApplicationsBoardPage';
import { AutoSearchPage } from '@/components/pages/AutoSearchPage';
import { DorkingPage } from '@/components/pages/DorkingPage';
import { GenerateDocumentsPage } from '@/components/pages/GenerateDocumentsPage';
import { MetricsPage } from '@/components/pages/MetricsPage';
import { NewJobsPage } from '@/components/pages/NewJobsPage';
import { ProfilePage } from '@/components/pages/ProfilePage';
import { StudioPage } from '@/components/pages/StudioPage';
import type { SidebarProps } from '@/components/organisms/Sidebar';
import { companyFromJobUrl, ddmmToIso, isoToDdmm, mostOverdue, validateDraft } from '@/lib/applications';
import { buildDork } from '@/lib/dork';
import { filterJobs } from '@/lib/jobs';
import { stageLabels } from '@/lib/stages';
import * as fx from '@/mocks/fixtures';
import type { Application, ApplicationDraft, StageId } from '@/types';
import { createInitialState, emptyExperience, fieldsFromCriteria, navIdForRoute, routeFromHref, type AppState, type Route, type ToastState } from './state';

/** Duração das operações simuladas (gerar, importar, executar busca…). */
export const SIM_DELAY = 500;

export interface PrototypeAppProps {
  /** Tela inicial. */
  initialRoute?: Route;
  /** Ajusta o estado inicial para um cenário específico. */
  setup?: (state: AppState) => AppState;
  /** Recebe todo evento de intenção emitido pelas páginas (aparece no painel Actions). */
  onEvent?: (name: string, payload?: unknown) => void;
}

const boardViews = [
  { value: 'kanban', label: 'Kanban' },
  { value: 'table', label: 'Tabela' },
];
const jobViews = [
  { value: 'list', label: 'Lista' },
  { value: 'cards', label: 'Cards' },
];
const optionLabel = (opts: Array<{ value: string; label: string }>, v: string) => opts.find((o) => o.value === v)?.label ?? v;
const today = '2026-09-28';

export function PrototypeApp({ initialRoute = 'jobs', setup, onEvent }: PrototypeAppProps) {
  const [s, setState] = useState<AppState>(() => {
    const base = createInitialState(initialRoute);
    const st = setup ? setup(base) : base;
    return st.route === 'applications' && !st.toast ? withReminder(st) : st;
  });
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);
  const later = (fn: () => void, ms = SIM_DELAY) => timers.current.push(window.setTimeout(fn, ms));
  const set = (fn: (st: AppState) => AppState) => setState(fn);
  const emit = (name: string, payload?: unknown) => onEvent?.(name, payload);
  const toast = (t: ToastState) => set((st) => ({ ...st, toast: t }));

  // ——— Navegação ———
  const goto = (route: Route) => {
    emit('navigate', route);
    set((st) => {
      const next = { ...st, route, drawer: null, toast: null };
      return route === 'applications' ? withReminder(next) : next;
    });
  };
  const onNavigate = (href: string, e?: MouseEvent<HTMLAnchorElement>) => {
    e?.preventDefault();
    goto(routeFromHref(href));
  };
  const openDrawer = (drawer: AppState['drawer']) => set((st) => ({ ...st, drawer, toast: null }));
  const closeDrawer = () => set((st) => ({ ...st, drawer: null }));

  const runToastAction = () => {
    const a = s.toast?.action;
    emit('toastAction', a);
    if (!a) return;
    if (a.type === 'goto') return goto(a.route);
    if (a.type === 'undoDiscard') {
      return set((st) => {
        const items = [...st.jobs.items];
        items.splice(a.index, 0, a.job);
        return { ...st, toast: null, jobs: { ...st.jobs, items, selectedId: a.job.id } };
      });
    }
    if (a.type === 'followupDone') {
      return set((st) => ({
        ...st,
        toast: { message: 'Follow-up marcado como feito.', tone: 'success' },
        applications: { ...st.applications, items: st.applications.items.map((x) => (x.id === a.appId ? { ...x, nextStepOverdue: false, nextStep: 'Follow-up enviado hoje' } : x)) },
      }));
    }
  };

  // ——— Derivados ———
  const visibleJobs = useMemo(() => filterJobs(s.jobs.items, s.jobs.query, s.jobs.filters), [s.jobs]);
  const focusJob = s.jobs.items.find((j) => j.id === s.jobs.focusId) ?? fx.jobs[0]!;
  const activeApps = s.applications.items.filter((a) => a.stage !== 'closed');
  const sidebar: SidebarProps = {
    items: fx.navItems.map((n) => ({
      ...n,
      badge: n.id === 'jobs' ? String(s.jobs.items.length) : n.id === 'applications' ? String(activeApps.length) : n.id === 'searches' ? String(s.searches.items.length) : n.id === 'profile' ? `v${s.profile.version}` : n.badge,
    })),
    activeId: navIdForRoute[s.route],
    savedSearches: s.searches.items.filter((x) => x.active && x.newCount > 0).slice(0, 3).map((x) => ({ id: x.id, label: x.name, newCount: x.newCount })),
    user: { name: fx.user.name, displayName: fx.user.shortName, subtitle: `Currículo base v${s.profile.version}`, href: '#profile' },
    onNavigate,
  };
  const dorkResult = useMemo(() => buildDork(s.dork.fields, fx.dorkSites), [s.dork.fields]);
  const jobCrumb = { label: `${focusJob.company.name} — ${focusJob.title}`, href: '#generate' };

  // ——— Páginas ———
  let page: ReactElement;
  switch (s.route) {
    case 'jobs':
      page = (
        <NewJobsPage
          sidebar={sidebar}
          subtitle={`${s.jobs.items.filter((j) => j.isNew).length} novas desde ontem · ${s.jobs.items.filter((j) => j.match >= 80).length} com match acima de 80% · última varredura há 12 min`}
          view={s.jobs.view}
          viewOptions={jobViews}
          listLayout={s.jobs.view === 'cards' ? 'grid' : 'list'}
          query={s.jobs.query}
          filters={s.jobs.filters}
          jobs={visibleJobs}
          selectedJobId={s.jobs.selectedId}
          totalLabel={`${visibleJobs.length} ${visibleJobs.length === 1 ? 'resultado' : 'resultados'}`}
          sortLabel="match com seu currículo"
          sourcesLabel="Fontes: LinkedIn, Greenhouse, Lever, Wellfound, Remote OK"
          resumeLabel={`Currículo base v${s.profile.version}`}
          onViewChange={(v) => { emit('jobs.viewChange', v); set((st) => ({ ...st, jobs: { ...st.jobs, view: v as 'list' | 'cards' } })); }}
          onQueryChange={(q) => { emit('jobs.queryChange', q); set((st) => ({ ...st, jobs: { ...st.jobs, query: q } })); }}
          onToggleFilter={(id, selected) => { emit('jobs.toggleFilter', { id, selected }); set((st) => ({ ...st, jobs: { ...st.jobs, filters: st.jobs.filters.map((f) => (f.id === id ? { ...f, selected } : f)) } })); }}
          onAddFilter={() => { emit('jobs.addFilter'); toast({ message: 'Filtros avançados chegam na fase 2.', tone: 'info' }); }}
          onOpenAlerts={() => { emit('jobs.openAlerts'); openDrawer('alerts'); }}
          onSelectJob={(id) => { emit('jobs.select', id); set((st) => ({ ...st, jobs: { ...st.jobs, selectedId: id } })); }}
          onGenerate={(id) => { emit('jobs.generate', id); set((st) => ({ ...st, route: 'generate', toast: null, jobs: { ...st.jobs, focusId: id } })); }}
          onSaveJob={(id) => {
            emit('jobs.save', id);
            set((st) => {
              const job = st.jobs.items.find((j) => j.id === id)!;
              const exists = st.applications.items.some((a) => a.company === job.company.name);
              const app: Application = { id: `a-${id}`, company: job.company.name, role: job.title, stage: 'saved', meta: `Salva hoje · ${job.source}`, source: job.source, match: job.match, documents: ['Sem documentos'], nextStep: 'Gerar documentos' };
              return {
                ...st,
                applications: exists ? st.applications : { ...st.applications, items: [app, ...st.applications.items] },
                toast: { message: exists ? `${job.company.name} já está no tracker.` : `${job.company.name} salva em “Salvas”.`, tone: 'success', actionLabel: 'Ver candidaturas', action: { type: 'goto', route: 'applications' } },
              };
            });
          }}
          onDiscardJob={(id) => {
            emit('jobs.discard', id);
            set((st) => {
              const index = st.jobs.items.findIndex((j) => j.id === id);
              const job = st.jobs.items[index]!;
              const items = st.jobs.items.filter((j) => j.id !== id);
              const next = filterJobs(items, st.jobs.query, st.jobs.filters)[0]?.id;
              return { ...st, jobs: { ...st.jobs, items, selectedId: next }, toast: { message: `Vaga da ${job.company.name} descartada.`, tone: 'info', actionLabel: 'Desfazer', action: { type: 'undoDiscard', job, index } } };
            });
          }}
          onOpenDescription={(id) => { emit('jobs.openDescription', id); toast({ message: 'Abriria a descrição original da vaga em uma nova aba.', tone: 'info' }); }}
        />
      );
      break;

    case 'generate': {
      const hits = focusJob.keywordsHit ?? fx.jobs[0]!.keywordsHit!;
      const misses = focusJob.keywordsMissing ?? fx.jobs[0]!.keywordsMissing!;
      page = (
        <GenerateDocumentsPage
          sidebar={sidebar}
          breadcrumbs={[{ label: 'Novas vagas', href: '#jobs' }, { label: jobCrumb.label }]}
          subtitle={`Versão ${s.docs.version} · gerada a partir do Currículo base v${s.profile.version} · ${hits.length} de ${hits.length + misses.length} palavras-chave cobertas`}
          view={s.docs.view}
          resume={fx.resumeDocument}
          coverLetter={fx.coverLetter}
          settings={{
            language: s.docs.language, languageOptions: fx.languageOptions, tone: s.docs.tone, toneOptions: fx.toneOptions, template: s.docs.template, templateOptions: fx.templateOptions,
            experiences: s.docs.experiences, keywordsHit: hits, keywordsMissing: misses, regenerating: s.docs.regenerating,
            onLanguageChange: (v) => { emit('docs.language', v); set((st) => ({ ...st, docs: { ...st.docs, language: v } })); },
            onToneChange: (v) => { emit('docs.tone', v); set((st) => ({ ...st, docs: { ...st.docs, tone: v } })); },
            onTemplateChange: (v) => { emit('docs.template', v); set((st) => ({ ...st, docs: { ...st.docs, template: v } })); },
            onToggleExperience: (id, c) => { emit('docs.toggleExperience', { id, c }); set((st) => ({ ...st, docs: { ...st.docs, experiences: st.docs.experiences.map((x) => (x.id === id ? { ...x, checked: c } : x)) } })); },
            onReviewSkills: () => goto('profile'),
            onRegenerate: () => {
              emit('docs.regenerate');
              set((st) => ({ ...st, docs: { ...st.docs, regenerating: true } }));
              later(() => set((st) => ({ ...st, docs: { ...st.docs, regenerating: false, version: st.docs.version + 1 }, studio: { ...st.studio, activeVersion: st.docs.version + 1 }, toast: { message: `Documentos regenerados (v${st.docs.version + 1}).`, tone: 'success' } })));
            },
          }}
          onViewChange={(v) => { emit('docs.view', v); set((st) => ({ ...st, docs: { ...st.docs, view: v } })); }}
          onOpenStudio={() => goto('studio')}
          onAttach={() => {
            emit('docs.attach', focusJob.id);
            set((st) => {
              const docs = [`CV v${st.docs.version}`, 'Cover letter'];
              const found = st.applications.items.find((a) => a.company === focusJob.company.name);
              const items = found
                ? st.applications.items.map((a) => (a === found ? { ...a, documents: docs } : a))
                : [{ id: `a-${focusJob.id}`, company: focusJob.company.name, role: focusJob.title, stage: 'saved' as StageId, meta: `Salva hoje · ${focusJob.source}`, source: focusJob.source, match: focusJob.match, documents: docs, nextStep: 'Aplicar' }, ...st.applications.items];
              return { ...st, applications: { ...st.applications, items }, toast: { message: `CV v${st.docs.version} + cover letter anexados à candidatura ${focusJob.company.name}.`, tone: 'success', actionLabel: 'Ver candidaturas', action: { type: 'goto', route: 'applications' } } };
            });
          }}
          onDownload={() => { emit('docs.download'); toast({ message: `PDFs da v${s.docs.version} baixados.`, tone: 'success' }); }}
        />
      );
      break;
    }

    case 'studio':
      page = (
        <StudioPage
          sidebar={sidebar}
          breadcrumbs={[{ label: 'Novas vagas', href: '#jobs' }, jobCrumb, { label: 'Estúdio' }]}
          subtitle={`Versão ${s.studio.activeVersion} · baseada no Currículo base v${s.profile.version} · ${s.studio.changes.length} ${s.studio.changes.length === 1 ? 'mudança' : 'mudanças'} para esta vaga`}
          versions={Array.from({ length: s.docs.version }, (_, i) => `v${i + 1}`)}
          activeVersion={`v${s.studio.activeVersion}`}
          document={s.studio.document}
          resume={fx.resumeDocument}
          coverLetter={fx.coverLetter}
          onVersionChange={(v) => { emit('studio.version', v); set((st) => ({ ...st, studio: { ...st.studio, activeVersion: Number(v.slice(1)) } })); }}
          onDocumentChange={(d) => { emit('studio.document', d); set((st) => ({ ...st, studio: { ...st.studio, document: d } })); }}
          onAttach={() => { emit('studio.attach'); toast({ message: `v${s.studio.activeVersion} anexada à candidatura ${focusJob.company.name}.`, tone: 'success' }); }}
          onDownload={() => { emit('studio.download'); toast({ message: `PDF da v${s.studio.activeVersion} baixado.`, tone: 'success' }); }}
          source={{
            sourceLabel: `Currículo base v${s.profile.version}`,
            blocks: s.studio.blocks,
            keywordsCovered: 11,
            keywordsTotal: 13,
            template: s.studio.template,
            templateOptions: fx.templateOptions,
            onOpenSource: () => goto('profile'),
            onToggleBlock: (id, c) => { emit('studio.toggleBlock', { id, c }); set((st) => ({ ...st, studio: { ...st.studio, blocks: st.studio.blocks.map((b) => (b.id === id ? { ...b, checked: c } : b)) } })); },
            onTemplateChange: (t) => { emit('studio.template', t); set((st) => ({ ...st, studio: { ...st.studio, template: t } })); },
          }}
          changes={{
            changes: s.studio.changes,
            quickAdjustments: fx.quickAdjustments,
            adjustment: s.studio.adjustment,
            submitting: s.studio.submitting,
            onUndo: (id) => { emit('studio.undo', id); set((st) => ({ ...st, studio: { ...st.studio, changes: st.studio.changes.filter((c) => c.id !== id) } })); },
            onAdjustmentChange: (v) => set((st) => ({ ...st, studio: { ...st.studio, adjustment: v } })),
            onQuickAdjust: (label) => {
              emit('studio.quickAdjust', label);
              set((st) => ({ ...st, studio: { ...st.studio, changes: [{ id: `q-${st.studio.changes.length}-${label}`, kind: 'add', title: label, description: 'Ajuste rápido aplicado pelo Estúdio.' }, ...st.studio.changes] }, toast: { message: `Ajuste aplicado: ${label}.`, tone: 'success' } }));
            },
            onSubmitAdjustment: (text) => {
              emit('studio.submitAdjustment', text);
              set((st) => ({ ...st, studio: { ...st.studio, submitting: true } }));
              later(() => set((st) => ({ ...st, studio: { ...st.studio, submitting: false, adjustment: '', changes: [{ id: `a-${st.studio.changes.length}`, kind: 'add', title: text.length > 42 ? `${text.slice(0, 40)}…` : text, description: 'Pedido em linguagem natural.' }, ...st.studio.changes] }, toast: { message: 'Ajuste aplicado ao documento.', tone: 'success' } })));
            },
          }}
        />
      );
      break;

    case 'profile':
      page = (
        <ProfilePage
          sidebar={sidebar}
          subtitle={`Versão ${s.profile.version} · fonte única para todo CV e cover letter gerados`}
          nextVersionLabel={`v${s.profile.version + 1}`}
          personalInfo={s.profile.info}
          experiences={s.profile.experiences}
          education={fx.education}
          languages={fx.languages}
          skills={fx.skillGroups}
          preferences={s.profile.preferences}
          rules={s.profile.rules}
          saving={s.profile.saving}
          onPersonalInfoChange={(f, v) => { emit('profile.field', { f, v }); set((st) => ({ ...st, profile: { ...st.profile, info: { ...st.profile.info, [f]: v } } })); }}
          onToggleRule={(id, c) => { emit('profile.rule', { id, c }); set((st) => ({ ...st, profile: { ...st.profile, rules: st.profile.rules.map((r) => (r.id === id ? { ...r, checked: c } : r)) } })); }}
          onAddExperience={() => { emit('profile.addExperience'); set((st) => ({ ...st, drawer: 'experience', toast: null, profile: { ...st.profile, editingExperienceId: undefined, experienceDraft: emptyExperience, experienceErrors: {} } })); }}
          onEditExperience={(id) => {
            emit('profile.editExperience', id);
            set((st) => {
              const x = st.profile.experiences.find((e) => e.id === id)!;
              return { ...st, drawer: 'experience', toast: null, profile: { ...st.profile, editingExperienceId: id, experienceErrors: {}, experienceDraft: { role: x.role, company: x.company, location: x.location, period: x.period, bullets: x.bullets.join('\n'), tags: x.tags.join(', ') } } };
            });
          }}
          onEditPreferences={() => { emit('profile.editPreferences'); set((st) => ({ ...st, drawer: 'preferences', toast: null, profile: { ...st.profile, preferencesDraft: st.profile.preferences } })); }}
          onImport={() => { emit('profile.import'); set((st) => ({ ...st, drawer: 'import', toast: null, profile: { ...st.profile, import: { source: 'pdf', url: '', status: 'idle' } } })); }}
          onOpenHistory={() => { emit('profile.history'); openDrawer('history'); }}
          onSave={() => {
            emit('profile.save');
            set((st) => ({ ...st, profile: { ...st.profile, saving: true } }));
            later(() =>
              set((st) => {
                const v = st.profile.version + 1;
                return {
                  ...st,
                  profile: { ...st.profile, saving: false, version: v, versions: [{ id: `v${v}`, label: `v${v}`, date: 'hoje', note: 'Salva pelo editor do currículo base.', documents: 0, current: true }, ...st.profile.versions.map((x) => ({ ...x, current: false }))] },
                  toast: { message: `Currículo base salvo como v${v}.`, tone: 'success' },
                };
              }),
            );
          }}
        />
      );
      break;

    case 'searches':
      page = (
        <AutoSearchPage
          sidebar={sidebar}
          subtitle={`${s.searches.items.length} buscas · ${s.searches.items.filter((x) => x.active).length} ativas · rodam sozinhas e alimentam Novas vagas`}
          searches={s.searches.items}
          runningId={s.searches.runningId}
          onOpenGenerator={() => goto('dorking')}
          onToggleActive={(id, active) => { emit('searches.toggle', { id, active }); set((st) => ({ ...st, searches: { ...st.searches, items: st.searches.items.map((x) => (x.id === id ? { ...x, active } : x)) } })); }}
          onViewResults={(id) => { emit('searches.viewResults', id); goto('jobs'); }}
          onEditDork={(id) => { emit('searches.editDork', id); set((st) => ({ ...st, route: 'dorking', toast: null, dork: { fields: fx.defaultDorkFields, copied: false } })); }}
          onRunNow={(id) => {
            emit('searches.runNow', id);
            set((st) => ({ ...st, searches: { ...st.searches, runningId: id } }));
            later(() =>
              set((st) => {
                const target = st.searches.items.find((x) => x.id === id)!;
                return {
                  ...st,
                  searches: { ...st.searches, runningId: undefined, items: st.searches.items.map((x) => (x.id === id ? { ...x, newCount: x.newCount + 2, meta: x.meta.replace(/rodou[^·]*$|pausada[^·]*$|ainda não rodou$/, 'rodou agora') } : x)) },
                  toast: { message: `2 vagas novas em “${target.name}”.`, tone: 'success', actionLabel: 'Ver vagas', action: { type: 'goto', route: 'jobs' } },
                };
              }),
            );
          }}
          composer={{
            ...s.searches.composer,
            frequencyOptions: fx.frequencyOptions,
            thresholdOptions: fx.thresholdOptions,
            onDescriptionChange: (v) => set((st) => ({ ...st, searches: { ...st.searches, composer: { ...st.searches.composer, description: v } } })),
            onConvertToDork: (d) => {
              emit('searches.convert', d);
              set((st) => ({ ...st, searches: { ...st.searches, composer: { ...st.searches.composer, converting: true } } }));
              later(() => set((st) => ({ ...st, searches: { ...st.searches, composer: { ...st.searches.composer, converting: false, criteria: fx.parsedCriteria, dork: buildDork(fieldsFromCriteria(fx.parsedCriteria), fx.dorkSites).query } } })));
            },
            onLearnDorking: () => goto('dorking'),
            onOpenGenerator: () => { emit('searches.openGenerator'); set((st) => ({ ...st, route: 'dorking', toast: null, dork: { fields: fieldsFromCriteria(st.searches.composer.criteria), copied: false } })); },
            onToggleSource: (id, c) => set((st) => ({ ...st, searches: { ...st.searches, composer: { ...st.searches.composer, sources: st.searches.composer.sources.map((x) => (x.id === id ? { ...x, checked: c } : x)) } } })),
            onFrequencyChange: (v) => set((st) => ({ ...st, searches: { ...st.searches, composer: { ...st.searches.composer, frequency: v } } })),
            onThresholdChange: (v) => set((st) => ({ ...st, searches: { ...st.searches, composer: { ...st.searches.composer, threshold: v } } })),
            onTest: () => { emit('searches.test'); toast({ message: 'Prévia: 9 vagas encontradas nos últimos 7 dias.', tone: 'info' }); },
            onSave: () => {
              emit('searches.save');
              set((st) => {
                const cmp = st.searches.composer;
                const roles = cmp.criteria.find((x) => x.label === 'Cargos')?.values ?? [];
                const stack = cmp.criteria.find((x) => x.label === 'Stack')?.values ?? [];
                const name = roles.length ? [roles[0], ...stack].join(' · ') : cmp.description.length > 38 ? `${cmp.description.slice(0, 36)}…` : cmp.description;
                const sources = cmp.sources.filter((x) => x.checked).map((x) => x.label.replace(' (dork)', '').replace(' Jobs', '')).join(' + ');
                const item = { id: `ss-new-${st.searches.items.length}`, name, description: cmp.description, dork: cmp.dork || '(converta a descrição para gerar o dork)', meta: `${optionLabel(fx.frequencyOptions, cmp.frequency)} · ${sources} · ainda não rodou`, newCount: 0, active: true };
                return { ...st, searches: { ...st.searches, items: [item, ...st.searches.items], composer: { ...createInitialState().searches.composer } }, toast: { message: `Busca “${name}” salva e ativada.`, tone: 'success' } };
              });
            },
          }}
        />
      );
      break;

    case 'dorking':
      page = (
        <DorkingPage
          sidebar={sidebar}
          operators={fx.dorkOperators}
          fields={s.dork.fields}
          sites={fx.dorkSites}
          templates={fx.dorkTemplates}
          recencyOptions={fx.recencyOptions}
          result={dorkResult}
          copied={s.dork.copied}
          onFieldsChange={(patch) => { emit('dork.change', patch); set((st) => ({ ...st, dork: { fields: { ...st.dork.fields, ...patch }, copied: false } })); }}
          onApplyTemplate={(t) => { emit('dork.template', t.id); set((st) => ({ ...st, dork: { fields: { ...st.dork.fields, ...t.fields }, copied: false } })); }}
          onCopy={(q) => { emit('dork.copy', q); void navigator.clipboard?.writeText(q).catch(() => {}); set((st) => ({ ...st, dork: { ...st.dork, copied: true } })); }}
          onOpenGoogle={(url) => { emit('dork.openGoogle', url); window.open(url, '_blank', 'noopener,noreferrer'); }}
          onSaveAsSearch={(q) => {
            emit('dork.saveAsSearch', q);
            set((st) => {
              const role = st.dork.fields.roles.split(',')[0]?.trim() || 'Busca';
              const item = { id: `ss-dork-${st.searches.items.length}`, name: `Dork · ${role}`, description: 'Criada no gerador de Google Dorks.', dork: q, meta: 'A cada 6 h · Google · ainda não rodou', newCount: 0, active: true };
              return { ...st, route: 'searches', searches: { ...st.searches, items: [item, ...st.searches.items] }, toast: { message: `Busca “${item.name}” criada a partir do dork.`, tone: 'success' } };
            });
          }}
          onOpenSearches={() => goto('searches')}
        />
      );
      break;

    case 'applications': {
      const editing = s.applications.items.find((a) => a.id === s.applications.editingId);
      page = (
        <ApplicationsBoardPage
          sidebar={sidebar}
          subtitle={`${activeApps.length} ativas · ${s.applications.items.filter((a) => a.stage === 'interview').length} em entrevistas · ${s.applications.items.filter((a) => a.nextStepOverdue).length} follow-ups atrasados`}
          view="kanban"
          viewOptions={boardViews}
          onViewChange={(v) => v === 'table' && goto('metrics')}
          stages={fx.stages}
          applications={s.applications.items}
          movable
          onMoveApplication={(id, stage) => {
            emit('applications.move', { id, stage });
            set((st) => ({ ...st, applications: { ...st.applications, items: st.applications.items.map((a) => (a.id === id ? { ...a, stage } : a)) }, toast: { message: `Movida para “${stageLabels[stage]}”.`, tone: 'success' } }));
          }}
          formOpen={s.drawer === 'application'}
          formTitle={editing ? 'Editar candidatura' : 'Nova candidatura'}
          formSubtitle={editing ? `${editing.company} · ${editing.role}` : 'Para vagas que você achou fora do Radar.'}
          onNewApplication={() => { emit('applications.new'); set((st) => ({ ...st, drawer: 'application', toast: null, applications: { ...st.applications, editingId: undefined, draft: { ...fx.emptyDraft, appliedOn: today }, errors: {} } })); }}
          onOpenApplication={(id) => {
            emit('applications.open', id);
            set((st) => {
              const a = st.applications.items.find((x) => x.id === id)!;
              const source = fx.sourceOptions.find((o) => o.label.toLowerCase() === a.source.toLowerCase())?.value ?? 'company';
              const draft: ApplicationDraft = { ...fx.emptyDraft, company: a.company, role: a.role, stage: a.stage, appliedOn: ddmmToIso(a.appliedOn), source, nextStep: a.nextStep, documents: 'base' };
              return { ...st, drawer: 'application', toast: null, applications: { ...st.applications, editingId: id, draft, errors: {} } };
            });
          }}
          onCloseForm={closeDrawer}
          form={{
            draft: s.applications.draft,
            errors: s.applications.errors,
            importing: s.applications.importing,
            stageOptions: fx.stageOptions,
            sourceOptions: fx.sourceOptions,
            onFieldChange: (field, value) => set((st) => ({ ...st, applications: { ...st.applications, draft: { ...st.applications.draft, [field]: value }, errors: { ...st.applications.errors, [field]: undefined } } })),
            onImport: (url) => {
              emit('applications.import', url);
              set((st) => ({ ...st, applications: { ...st.applications, importing: true } }));
              later(() =>
                set((st) => {
                  const company = companyFromJobUrl(url);
                  if (!company) return { ...st, applications: { ...st.applications, importing: false, errors: { ...st.applications.errors, url: 'Não reconheci este link — preencha os campos à mão.' } } };
                  return { ...st, applications: { ...st.applications, importing: false, errors: {}, draft: { ...st.applications.draft, company, role: st.applications.draft.role || 'Senior Backend Engineer', source: 'company' } } };
                }),
              );
            },
            onSubmit: (draft) => {
              emit('applications.submit', draft);
              const errors = validateDraft(draft);
              if (Object.keys(errors).length) return set((st) => ({ ...st, applications: { ...st.applications, errors } }));
              set((st) => {
                const docs = draft.documents === 'generate' ? ['CV + carta (gerar)'] : draft.documents === 'base' ? ['CV base'] : ['Arquivo próprio'];
                const sourceLabel = optionLabel(fx.sourceOptions, draft.source);
                const fields = { company: draft.company.trim(), role: draft.role.trim(), stage: draft.stage, appliedOn: isoToDdmm(draft.appliedOn), source: sourceLabel, nextStep: draft.nextStep || '—' };
                const editingId = st.applications.editingId;
                const items = editingId
                  ? st.applications.items.map((a) => (a.id === editingId ? { ...a, ...fields, nextStepOverdue: false } : a))
                  : [{ id: `a-new-${st.applications.items.length}`, ...fields, meta: draft.stage === 'saved' ? 'Salva hoje · manual' : `${stageLabels[draft.stage]} ${fields.appliedOn ?? ''} · manual`, documents: docs }, ...st.applications.items];
                return {
                  ...st,
                  drawer: null,
                  applications: { ...st.applications, items, editingId: undefined, errors: {} },
                  toast: {
                    message: `${fields.company} ${editingId ? 'atualizada' : 'salva'} em “${stageLabels[draft.stage]}”.`,
                    tone: 'success',
                    ...(draft.documents === 'generate' && !editingId ? { actionLabel: 'Gerar documentos', action: { type: 'goto' as const, route: 'generate' as Route } } : {}),
                  },
                };
              });
            },
          }}
        />
      );
      break;
    }

    case 'metrics': {
      const rows = s.applications.items
        .filter((a) => a.appliedOn)
        .sort((a, b) => {
          const dir = s.metrics.sort.direction === 'asc' ? 1 : -1;
          const k = (x: Application) => (s.metrics.sort.key === 'appliedOn' ? ddmmToIso(x.appliedOn) : s.metrics.sort.key === 'match' ? String(x.match ?? 0).padStart(3, '0') : x.company);
          return k(a).localeCompare(k(b)) * dir;
        });
      page = (
        <MetricsPage
          sidebar={sidebar}
          subtitle="Últimos 30 dias · todas as fontes"
          view="table"
          viewOptions={boardViews}
          onViewChange={(v) => v === 'kanban' && goto('applications')}
          kpis={fx.kpis}
          funnel={fx.funnel}
          events={fx.events}
          applications={rows}
          stageLabels={stageLabels}
          sort={s.metrics.sort}
          onSortChange={(sort) => { emit('metrics.sort', sort); set((st) => ({ ...st, metrics: { sort } })); }}
          onOpenDocuments={(id) => { emit('metrics.openDocuments', id); goto('studio'); }}
          onExport={() => {
            emit('metrics.export');
            downloadCsv(rows);
            toast({ message: `CSV exportado com ${rows.length} candidaturas.`, tone: 'success' });
          }}
        />
      );
      break;
    }
  }

  // ——— Camadas (drawers + aviso) ———
  const p = s.profile;
  const drawer = (() => {
    switch (s.drawer) {
      case 'alerts':
        return (
          <Drawer open title="Alertas de vagas" subtitle="Avisos quando aparecerem vagas com match alto." onClose={closeDrawer}>
            <AlertSettingsForm
              {...s.alerts}
              frequencyOptions={fx.frequencyOptions}
              thresholdOptions={fx.thresholdOptions}
              onEnabledChange={(v) => set((st) => ({ ...st, alerts: { ...st.alerts, enabled: v } }))}
              onFrequencyChange={(v) => set((st) => ({ ...st, alerts: { ...st.alerts, frequency: v } }))}
              onThresholdChange={(v) => set((st) => ({ ...st, alerts: { ...st.alerts, threshold: v } }))}
              onToggleChannel={(id, c) => set((st) => ({ ...st, alerts: { ...st.alerts, channels: st.alerts.channels.map((x) => (x.id === id ? { ...x, checked: c } : x)) } }))}
              onCancel={closeDrawer}
              onSubmit={() => {
                emit('alerts.save', s.alerts);
                set((st) => ({ ...st, alerts: { ...st.alerts, saving: true } }));
                later(() => set((st) => ({ ...st, drawer: null, alerts: { ...st.alerts, saving: false }, toast: { message: st.alerts.enabled ? `Alertas salvos: ${optionLabel(fx.frequencyOptions, st.alerts.frequency)}, match ≥ ${st.alerts.threshold}%.` : 'Alertas desativados.', tone: 'success' } })));
              }}
            />
          </Drawer>
        );
      case 'experience':
        return (
          <Drawer open title={p.editingExperienceId ? 'Editar experiência' : 'Nova experiência'} onClose={closeDrawer}>
            <ExperienceForm
              mode={p.editingExperienceId ? 'edit' : 'add'}
              value={p.experienceDraft}
              errors={p.experienceErrors}
              onFieldChange={(f, v) => set((st) => ({ ...st, profile: { ...st.profile, experienceDraft: { ...st.profile.experienceDraft, [f]: v }, experienceErrors: { ...st.profile.experienceErrors, [f]: undefined } } }))}
              onCancel={closeDrawer}
              onDelete={() => set((st) => ({ ...st, drawer: null, profile: { ...st.profile, experiences: st.profile.experiences.filter((x) => x.id !== st.profile.editingExperienceId) }, toast: { message: 'Experiência removida.', tone: 'info' } }))}
              onSubmit={() => {
                const d = p.experienceDraft;
                const errors = { ...(d.role.trim() ? {} : { role: 'Informe o cargo.' }), ...(d.company.trim() ? {} : { company: 'Informe a empresa.' }) };
                if (Object.keys(errors).length) return set((st) => ({ ...st, profile: { ...st.profile, experienceErrors: errors } }));
                emit('profile.saveExperience', d);
                set((st) => {
                  const x = { id: st.profile.editingExperienceId ?? `x-new-${st.profile.experiences.length}`, role: d.role.trim(), company: d.company.trim(), location: d.location, period: d.period, bullets: d.bullets.split('\n').map((b) => b.trim()).filter(Boolean), tags: d.tags.split(',').map((t) => t.trim()).filter(Boolean) };
                  const experiences = st.profile.editingExperienceId ? st.profile.experiences.map((e) => (e.id === x.id ? x : e)) : [x, ...st.profile.experiences];
                  return { ...st, drawer: null, profile: { ...st.profile, experiences }, toast: { message: `Experiência “${x.role} — ${x.company}” salva.`, tone: 'success' } };
                });
              }}
            />
          </Drawer>
        );
      case 'preferences':
        return (
          <Drawer open title="Preferências de busca" subtitle="Usadas no cálculo de match e nas buscas." onClose={closeDrawer}>
            <KeyValueForm
              label="Preferências de busca"
              submitLabel="Salvar preferências"
              items={p.preferencesDraft}
              onChange={(id, v) => set((st) => ({ ...st, profile: { ...st.profile, preferencesDraft: st.profile.preferencesDraft.map((kv) => (kv.id === id ? { ...kv, value: v } : kv)) } }))}
              onCancel={closeDrawer}
              onSubmit={() => { emit('profile.savePreferences', p.preferencesDraft); set((st) => ({ ...st, drawer: null, profile: { ...st.profile, preferences: st.profile.preferencesDraft }, toast: { message: 'Preferências salvas.', tone: 'success' } })); }}
            />
          </Drawer>
        );
      case 'history':
        return (
          <Drawer open title="Histórico de versões" subtitle="Cada documento gerado registra a versão de origem." onClose={closeDrawer}>
            <VersionHistory
              versions={p.versions}
              restoringId={p.restoringId}
              onRestore={(id) => {
                emit('profile.restore', id);
                set((st) => ({ ...st, profile: { ...st.profile, restoringId: id } }));
                later(() => set((st) => ({ ...st, drawer: null, profile: { ...st.profile, restoringId: undefined }, toast: { message: `${id} carregada como rascunho — salve para criar a v${st.profile.version + 1}.`, tone: 'info' } })));
              }}
            />
          </Drawer>
        );
      case 'import':
        return (
          <Drawer open title="Importar currículo" subtitle="Preenche um rascunho para você revisar." onClose={closeDrawer}>
            <ImportResumeForm
              source={p.import.source}
              fileName={p.import.fileName}
              linkedinUrl={p.import.url}
              status={p.import.status}
              message={p.import.message}
              onSourceChange={(source) => set((st) => ({ ...st, profile: { ...st.profile, import: { ...st.profile.import, source, status: 'idle' } } }))}
              onFileChange={(file) => set((st) => ({ ...st, profile: { ...st.profile, import: { ...st.profile.import, fileName: file?.name, status: 'idle' } } }))}
              onUrlChange={(url) => set((st) => ({ ...st, profile: { ...st.profile, import: { ...st.profile.import, url, status: 'idle' } } }))}
              onCancel={closeDrawer}
              onImport={() => {
                emit('profile.runImport', p.import);
                set((st) => ({ ...st, profile: { ...st.profile, import: { ...st.profile.import, status: 'importing' } } }));
                later(() => set((st) => ({ ...st, profile: { ...st.profile, import: { ...st.profile.import, status: 'done', message: '4 experiências, 1 formação e 14 skills encontradas.' } } })));
              }}
              onReview={() => { emit('profile.reviewImport'); set((st) => ({ ...st, drawer: null, toast: { message: 'Campos importados prontos para revisão — nada foi salvo ainda.', tone: 'info' } })); }}
            />
          </Drawer>
        );
      default:
        return null;
    }
  })();

  return (
    <>
      {page}
      {drawer}
      {s.toast && (
        <Toast
          floating
          message={s.toast.message}
          tone={s.toast.tone}
          actionLabel={s.toast.actionLabel}
          onAction={runToastAction}
          onDismiss={() => set((st) => ({ ...st, toast: null }))}
        />
      )}
    </>
  );
}

/** Mostra o lembrete do follow-up mais atrasado ao entrar em Candidaturas. */
function withReminder(st: AppState): AppState {
  const late = mostOverdue(st.applications.items, st.applications.dismissedReminders);
  if (!late) return st;
  return {
    ...st,
    applications: { ...st.applications, dismissedReminders: [...st.applications.dismissedReminders, late.id] },
    toast: { message: `Follow-up atrasado: ${late.company} — ${late.role}.`, tone: 'warning', actionLabel: 'Marcar como feito', action: { type: 'followupDone', appId: late.id } },
  };
}

function downloadCsv(rows: Application[]) {
  const head = ['Empresa', 'Cargo', 'Status', 'Aplicada', 'Fonte', 'Match', 'Próximo passo'];
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const body = rows.map((a) => [a.company, a.role, stageLabels[a.stage], a.appliedOn ?? '', a.source, a.match == null ? '' : String(a.match), a.nextStep].map(esc).join(','));
  try {
    const url = URL.createObjectURL(new Blob([[head.join(','), ...body].join('\n')], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'candidaturas.csv';
    a.click();
    URL.revokeObjectURL(url);
  } catch {
    /* ambiente sem suporte a download */
  }
}
