import { Button } from '@/components/atoms/Button';
import { DorkAnatomy } from '@/components/organisms/DorkAnatomy';
import { DorkBuilderForm } from '@/components/organisms/DorkBuilderForm';
import { DorkExplainer } from '@/components/organisms/DorkExplainer';
import { DorkResultPanel } from '@/components/organisms/DorkResultPanel';
import { PageHeader } from '@/components/organisms/PageHeader';
import { Sidebar, type SidebarProps } from '@/components/organisms/Sidebar';
import { AppShell } from '@/components/templates/AppShell';
import { PageLayout } from '@/components/templates/PageLayout';
import type { DorkFields, DorkOperator, DorkResult, DorkSite, DorkTemplate, SelectOption } from '@/types';
import styles from './DorkingPage.module.css';

export interface DorkingPageProps {
  sidebar: SidebarProps;
  operators: DorkOperator[];
  fields: DorkFields;
  sites: DorkSite[];
  templates: DorkTemplate[];
  recencyOptions: SelectOption[];
  /** Resultado compilado pelo pai (ex.: `buildDork(fields, sites)`). */
  result: DorkResult;
  copied?: boolean;
  onFieldsChange?: (patch: Partial<DorkFields>) => void;
  onApplyTemplate?: (template: DorkTemplate) => void;
  onCopy?: (query: string) => void;
  onOpenGoogle?: (url: string) => void;
  onSaveAsSearch?: (query: string) => void;
  onOpenSearches?: () => void;
}

export function DorkingPage(p: DorkingPageProps) {
  return (
    <AppShell sidebar={<Sidebar {...p.sidebar} />}>
      <PageLayout
        header={
          <PageHeader
            title="Google Dorking"
            subtitle="Monte buscas avançadas para encontrar vagas direto na fonte — e transforme em busca automatizada."
            actions={<Button onClick={p.onOpenSearches}>Ver buscas automatizadas</Button>}
          />
        }
      >
        <DorkExplainer operators={p.operators} />
        <div className={styles.columns}>
          <div className={styles.form}>
            <DorkBuilderForm fields={p.fields} sites={p.sites} templates={p.templates} recencyOptions={p.recencyOptions} onChange={p.onFieldsChange} onApplyTemplate={p.onApplyTemplate} />
          </div>
          <div className={styles.result}>
            <DorkResultPanel result={p.result} copied={p.copied} onCopy={p.onCopy} onOpenGoogle={p.onOpenGoogle} onSaveAsSearch={p.onSaveAsSearch} />
            <DorkAnatomy parts={p.result.parts} />
          </div>
        </div>
      </PageLayout>
    </AppShell>
  );
}
