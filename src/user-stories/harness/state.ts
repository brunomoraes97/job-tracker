/**
 * Estado do protótipo navegável usado nas visões de histórias de usuário.
 * Vive só no Storybook: faz o papel da futura camada de aplicação (roteador + store),
 * para que as páginas — que são apenas apresentação — possam ser exercitadas de ponta a ponta.
 */
import type { ToastTone } from '@/components/molecules/Toast';
import type { ApplicationSort } from '@/components/organisms/ApplicationsTable';
import type { ExperienceDraft, ExperienceDraftErrors } from '@/components/organisms/ExperienceForm';
import type { ImportSource, ImportStatus } from '@/components/organisms/ImportResumeForm';
import type { ResumeVersion } from '@/components/organisms/VersionHistory';
import type { DraftErrors } from '@/lib/applications';
import * as fx from '@/mocks/fixtures';
import type {
  Application,
  ApplicationDraft,
  DorkFields,
  Experience,
  Job,
  KeyValue,
  ParsedCriterion,
  PersonalInfo,
  ResumeChange,
  SavedSearch,
  ToggleOption,
} from '@/types';

export type Route = 'jobs' | 'generate' | 'studio' | 'profile' | 'searches' | 'dorking' | 'applications' | 'metrics';
export type DrawerKind = 'alerts' | 'application' | 'experience' | 'history' | 'import' | 'preferences' | null;

export type ToastAction =
  | { type: 'goto'; route: Route }
  | { type: 'undoDiscard'; job: Job; index: number }
  | { type: 'followupDone'; appId: string };

export interface ToastState {
  message: string;
  tone: ToastTone;
  actionLabel?: string;
  action?: ToastAction;
}

export interface AppState {
  route: Route;
  drawer: DrawerKind;
  toast: ToastState | null;

  jobs: {
    items: Job[];
    query: string;
    filters: Array<{ id: string; label: string; selected: boolean }>;
    selectedId?: string;
    view: 'list' | 'cards';
    focusId: string;
  };
  alerts: { enabled: boolean; frequency: string; threshold: string; channels: ToggleOption[]; saving: boolean };

  docs: {
    version: number;
    view: 'resume' | 'coverLetter' | 'both';
    language: string;
    tone: string;
    template: string;
    experiences: ToggleOption[];
    regenerating: boolean;
  };
  studio: {
    activeVersion: number;
    document: 'resume' | 'coverLetter';
    blocks: ToggleOption[];
    template: string;
    changes: ResumeChange[];
    adjustment: string;
    submitting: boolean;
  };

  profile: {
    version: number;
    info: PersonalInfo;
    experiences: Experience[];
    rules: ToggleOption[];
    preferences: KeyValue[];
    preferencesDraft: KeyValue[];
    versions: ResumeVersion[];
    saving: boolean;
    restoringId?: string;
    editingExperienceId?: string;
    experienceDraft: ExperienceDraft;
    experienceErrors: ExperienceDraftErrors;
    import: { source: ImportSource; fileName?: string; url: string; status: ImportStatus; message?: string };
  };

  searches: {
    items: SavedSearch[];
    runningId?: string;
    composer: {
      description: string;
      criteria: ParsedCriterion[];
      dork: string;
      sources: ToggleOption[];
      frequency: string;
      threshold: string;
      converting: boolean;
    };
  };
  dork: { fields: DorkFields; copied: boolean };

  applications: {
    items: Application[];
    editingId?: string;
    draft: ApplicationDraft;
    errors: DraftErrors;
    importing: boolean;
    dismissedReminders: string[];
  };
  metrics: { sort: ApplicationSort };
}

export const emptyExperience: ExperienceDraft = { role: '', company: '', location: '', period: '', bullets: '', tags: '' };

/** Estado inicial: os mesmos dados de exemplo das stories de páginas. */
export function createInitialState(route: Route = 'jobs'): AppState {
  return {
    route,
    drawer: null,
    toast: null,
    jobs: {
      items: fx.jobs,
      query: '',
      filters: fx.jobFilters.map((f) => ({ ...f, selected: f.id === 'remote' })),
      selectedId: 'j1',
      view: 'list',
      focusId: 'j1',
    },
    alerts: { enabled: true, frequency: 'daily', threshold: '80', channels: fx.alertChannels, saving: false },
    docs: {
      version: 3,
      view: 'both',
      language: 'en',
      tone: 'direct',
      template: 'classic',
      experiences: [
        { id: 'x1', label: 'BamBams', description: 'Go · AWS', checked: true },
        { id: 'x2', label: 'Multilogin', description: 'Python · Java', checked: true },
        { id: 'x3', label: 'Saaspro', description: 'FastAPI', checked: true },
        { id: 'x4', label: 'Suporte & onboarding', description: 'agrupado', checked: true },
        { id: 'x5', label: 'Projetos de agentes de IA', description: 'opcional', checked: false },
      ],
      regenerating: false,
    },
    studio: { activeVersion: 3, document: 'resume', blocks: fx.documentBlocks, template: 'classic', changes: fx.resumeChanges, adjustment: '', submitting: false },
    profile: {
      version: 4,
      info: fx.personalInfo,
      experiences: fx.experiences,
      rules: fx.generationRules,
      preferences: fx.searchPreferences,
      preferencesDraft: fx.searchPreferences,
      versions: fx.resumeVersions,
      saving: false,
      experienceDraft: emptyExperience,
      experienceErrors: {},
      import: { source: 'pdf', url: '', status: 'idle' },
    },
    searches: {
      items: fx.savedSearches,
      composer: { description: '', criteria: [], dork: '', sources: fx.searchSources, frequency: '6h', threshold: '80', converting: false },
    },
    dork: { fields: fx.defaultDorkFields, copied: false },
    applications: { items: fx.applications, draft: fx.emptyDraft, errors: {}, importing: false, dismissedReminders: [] },
    metrics: { sort: { key: 'appliedOn', direction: 'desc' } },
  };
}

/** Campos do gerador correspondentes aos critérios interpretados de uma descrição. */
export const fieldsFromCriteria = (criteria: ParsedCriterion[]): DorkFields => {
  const get = (label: string) => criteria.find((c) => c.label === label)?.values ?? [];
  const siteIds = fx.dorkSites.filter((s) => get('Sites').includes(s.label)).map((s) => s.id);
  return {
    roles: get('Cargos').join(', '),
    requireInTitle: false,
    keywords: get('Stack').join(', '),
    location: get('Local').join(', '),
    exclude: get('Excluir').join(', '),
    siteIds,
    recency: '7',
  };
};

export const routeFromHref = (href: string): Route => {
  const key = href.replace(/^#/, '').split('/')[0];
  const map: Record<string, Route> = {
    jobs: 'jobs',
    generate: 'generate',
    studio: 'studio',
    profile: 'profile',
    searches: 'searches',
    dorking: 'dorking',
    applications: 'applications',
    metrics: 'metrics',
  };
  return map[key ?? ''] ?? 'jobs';
};

export const navIdForRoute: Record<Route, string> = {
  jobs: 'jobs',
  generate: 'jobs',
  studio: 'studio',
  profile: 'profile',
  searches: 'searches',
  dorking: 'dorking',
  applications: 'applications',
  metrics: 'metrics',
};
