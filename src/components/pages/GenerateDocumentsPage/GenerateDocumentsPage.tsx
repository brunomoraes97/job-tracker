import { Button } from '@/components/atoms/Button';
import type { Crumb } from '@/components/molecules/Breadcrumbs';
import { SegmentedControl } from '@/components/molecules/SegmentedControl';
import { DocumentPreview, type DocumentView } from '@/components/organisms/DocumentPreview';
import { GenerationSettings, type GenerationSettingsProps } from '@/components/organisms/GenerationSettings';
import { PageHeader } from '@/components/organisms/PageHeader';
import { Sidebar, type SidebarProps } from '@/components/organisms/Sidebar';
import { AppShell } from '@/components/templates/AppShell';
import { PageLayout } from '@/components/templates/PageLayout';
import { SplitLayout } from '@/components/templates/SplitLayout';
import type { CoverLetterData, ResumeDocumentData } from '@/types';
import styles from './GenerateDocumentsPage.module.css';

export interface GenerateDocumentsPageProps {
  sidebar: SidebarProps;
  breadcrumbs: Crumb[];
  subtitle: string;
  settings: GenerationSettingsProps;
  view: DocumentView;
  resume: ResumeDocumentData;
  coverLetter: CoverLetterData;
  downloading?: boolean;
  onViewChange?: (view: DocumentView) => void;
  onOpenStudio?: () => void;
  onAttach?: () => void;
  onDownload?: () => void;
}

const viewOptions = [
  { value: 'resume', label: 'Currículo' },
  { value: 'coverLetter', label: 'Cover letter' },
  { value: 'both', label: 'Lado a lado' },
];

export function GenerateDocumentsPage(p: GenerateDocumentsPageProps) {
  return (
    <AppShell sidebar={<Sidebar {...p.sidebar} />}>
      <PageLayout
        density="compact"
        header={
          <PageHeader
            title="Documentos para esta vaga"
            subtitle={p.subtitle}
            breadcrumbs={p.breadcrumbs}
            onNavigate={p.sidebar.onNavigate}
            actions={
              <>
                <Button onClick={p.onOpenStudio}>Abrir no Estúdio</Button>
                <Button onClick={p.onAttach}>Anexar ao tracker</Button>
                <Button variant="primary" iconLeft="download" loading={p.downloading} onClick={p.onDownload}>Baixar PDFs</Button>
              </>
            }
          />
        }
      >
        <SplitLayout
          asideSide="left"
          aside={<div className={styles.settings}><GenerationSettings {...p.settings} /></div>}
          main={
            <>
              <div className={styles.bar}>
                <SegmentedControl mode="tabs" label="Documento" value={p.view} options={viewOptions} onChange={(v) => p.onViewChange?.(v as DocumentView)} />
                <span className={styles.legend}><span className={styles.swatch} aria-hidden="true" />Trecho ajustado para esta vaga</span>
              </div>
              <DocumentPreview view={p.view} resume={p.resume} coverLetter={p.coverLetter} />
            </>
          }
        />
      </PageLayout>
    </AppShell>
  );
}
