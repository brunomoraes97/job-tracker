import { Button } from '@/components/atoms/Button';
import { PageHeader } from '@/components/organisms/PageHeader';
import { SavedSearchCard } from '@/components/organisms/SavedSearchCard';
import { SearchComposer, type SearchComposerProps } from '@/components/organisms/SearchComposer';
import { Sidebar, type SidebarProps } from '@/components/organisms/Sidebar';
import { AppShell } from '@/components/templates/AppShell';
import { PageLayout } from '@/components/templates/PageLayout';
import { SplitLayout } from '@/components/templates/SplitLayout';
import type { SavedSearch } from '@/types';
import styles from './AutoSearchPage.module.css';

export interface AutoSearchPageProps {
  sidebar: SidebarProps;
  subtitle: string;
  searches: SavedSearch[];
  /** id da busca em execução manual. */
  runningId?: string;
  composer: SearchComposerProps;
  onOpenGenerator?: () => void;
  onToggleActive?: (id: string, active: boolean) => void;
  onViewResults?: (id: string) => void;
  onEditDork?: (id: string) => void;
  onRunNow?: (id: string) => void;
}

export function AutoSearchPage(p: AutoSearchPageProps) {
  return (
    <AppShell sidebar={<Sidebar {...p.sidebar} />}>
      <PageLayout header={<PageHeader title="Buscas automatizadas" subtitle={p.subtitle} actions={<Button onClick={p.onOpenGenerator}>Abrir gerador de dorks</Button>} />}>
        <SplitLayout
          main={
            <section aria-label="Suas buscas" className={styles.list}>
              {p.searches.map((s) => (
                <SavedSearchCard key={s.id} search={s} running={p.runningId === s.id} onToggleActive={p.onToggleActive} onViewResults={p.onViewResults} onEditDork={p.onEditDork} onRunNow={p.onRunNow} />
              ))}
              {p.searches.length === 0 && <p className={styles.empty}>Você ainda não tem buscas automatizadas. Descreva a primeira ao lado.</p>}
            </section>
          }
          aside={<div className={styles.composer}><SearchComposer {...p.composer} /></div>}
        />
      </PageLayout>
    </AppShell>
  );
}
