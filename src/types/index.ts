/** Tipos de domínio compartilhados pelos componentes de apresentação. */

export type TintName = 'teal' | 'amber' | 'violet' | 'stone';
export type Tone = 'neutral' | 'primary' | 'info' | 'warning' | 'danger' | 'violet' | 'dark';

export interface Company {
  name: string;
  monogram: string;
  tint: TintName;
}

export interface FitScore {
  label: string;
  /** 0–100 */
  value: number;
}

export interface Job {
  id: string;
  title: string;
  company: Company;
  location: string;
  tags: string[];
  salary?: string;
  source: string;
  postedLabel: string;
  /** 0–100 */
  match: number;
  isNew?: boolean;
  summary?: string;
  highlights?: string[];
  keywordsHit?: string[];
  keywordsMissing?: string[];
  fit?: FitScore[];
}

export type StageId = 'saved' | 'applied' | 'talking' | 'interview' | 'offer' | 'closed';

export interface Stage {
  id: StageId;
  label: string;
}

export interface Application {
  id: string;
  company: string;
  role: string;
  stage: StageId;
  /** Texto curto exibido no card: "Aplicada 22 set · LinkedIn" */
  meta: string;
  appliedOn?: string;
  source: string;
  match: number;
  documents: string[];
  nextStep: string;
  nextStepOverdue?: boolean;
}

export interface Kpi {
  id: string;
  label: string;
  value: string;
  hint?: string;
}

export interface FunnelStep {
  id: string;
  label: string;
  count: number;
}

export interface CalendarEvent {
  id: string;
  weekday: string;
  day: string;
  title: string;
  subtitle: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
}

export interface SavedSearchSummary {
  id: string;
  label: string;
  newCount: number;
}

export interface SavedSearch {
  id: string;
  name: string;
  description: string;
  dork: string;
  meta: string;
  newCount: number;
  active: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  tags: string[];
}

export interface SkillGroup {
  id: string;
  label: string;
  items: string[];
}

export interface KeyValue {
  id: string;
  label: string;
  value: string;
}

export interface ToggleOption {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  summary: string;
}

/** Texto com trechos destacados (ajustados para a vaga). */
export type RichText = Array<string | { text: string; highlight: true }>;

export interface ResumeEntry {
  id: string;
  heading: string;
  period: string;
  bullets: RichText[];
}

export interface ResumeDocumentData {
  name: string;
  title: string;
  contact: string;
  summary: RichText;
  entries: ResumeEntry[];
  skills: RichText;
  education: string;
  languages: string;
}

export interface CoverLetterData {
  sender: string;
  senderContact: string;
  date: string;
  recipient: string;
  subject: string;
  greeting: string;
  paragraphs: RichText[];
  closing: string;
}

export type ChangeKind = 'add' | 'move' | 'cut';

export interface ResumeChange {
  id: string;
  kind: ChangeKind;
  title: string;
  description: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export type DocumentChoice = 'generate' | 'base' | 'upload';

export interface ApplicationDraft {
  url: string;
  company: string;
  role: string;
  stage: StageId;
  appliedOn: string;
  source: string;
  salary: string;
  contact: string;
  nextStep: string;
  remindOn: string;
  documents: DocumentChoice;
  notes: string;
}

export interface ParsedCriterion {
  id: string;
  label: string;
  values: string[];
  tone: Tone;
}

// ——— Google Dorking ———

export type Recency = 'any' | '1' | '7' | '30';

export interface DorkSite {
  id: string;
  label: string;
  domain: string;
}

export interface DorkFields {
  roles: string;
  requireInTitle: boolean;
  keywords: string;
  location: string;
  exclude: string;
  siteIds: string[];
  recency: Recency;
}

export type DorkPartKind = 'sites' | 'roles' | 'keywords' | 'location' | 'exclusions' | 'date';

export interface DorkPart {
  kind: DorkPartKind;
  label: string;
  text: string;
  explanation: string;
}

export interface DorkResult {
  query: string;
  parts: DorkPart[];
  wordCount: number;
  overLimit: boolean;
  googleUrl: string;
}

export interface DorkOperator {
  operator: string;
  description: string;
  example: string;
}

export interface DorkTemplate {
  id: string;
  label: string;
  fields: Partial<DorkFields>;
}
