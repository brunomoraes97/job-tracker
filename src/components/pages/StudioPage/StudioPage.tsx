import { Button } from '@/components/atoms/Button';
import type { Crumb } from '@/components/molecules/Breadcrumbs';
import { SegmentedControl } from '@/components/molecules/SegmentedControl';
import { ChangesPanel, type ChangesPanelProps } from '@/components/organisms/ChangesPanel';
import { DocumentPreview } from '@/components/organisms/DocumentPreview';
import { PageHeader } from '@/components/organisms/PageHeader';
import { Sidebar, type SidebarProps } from '@/components/organisms/Sidebar';
import { StudioSourcePanel, type StudioSourcePanelProps } from '@/components/organisms/StudioSourcePanel';
import { AppShell } from '@/components/templates/AppShell';
import { PageLayout } from '@/components/templates/PageLayout';
import { ThreePaneLayout } from '@/components/templates/ThreePaneLayout';
import type { CoverLetterData, ResumeDocumentData } from '@/types';
import styles from './StudioPage.module.css';

export type StudioDocument = 'resume' | 'coverLetter';

export interface StudioPageProps {
  sidebar: SidebarProps;
  breadcrumbs: Crumb[];
  subtitle: string;
  versions: string[];
  activeVersion: string;
  document: StudioDocument;
  source: StudioSourcePanelProps;
  changes: ChangesPanelProps;
  resume: ResumeDocumentData;
  coverLetter: CoverLetterData;
  downloading?: boolean;
  onVersionChange?: (version: string) => void;
  onDocumentChange?: (doc: StudioDocument) => void;
  onAttach?: () => void;
  onDownload?: () => void;
}

export function StudioPage(p: StudioPageProps) {
  return (
    <AppShell sidebar={<Sidebar {...p.sidebar} />}>
      <PageLayout
        density="compact"
        header={
          <PageHeader
            title="Estúdio de currículo"
            subtitle={p.subtitle}
            breadcrumbs={p.breadcrumbs}
            onNavigate={p.sidebar.onNavigate}
            actions={
              <>
                <SegmentedControl label="Versões" value={p.activeVersion} options={p.versions.map((v) => ({ value: v, label: v }))} onChange={p.onVersionChange} />
                <Button onClick={p.onAttach}>Anexar ao tracker</Button>
                <Button variant="primary" iconLeft="download" loading={p.downloading} onClick={p.onDownload}>Baixar PDF</Button>
              </>
            }
          />
        }
      >
        <ThreePaneLayout
          left={<StudioSourcePanel {...p.source} />}
          center={
            <>
              <div className={styles.bar}>
                <SegmentedControl mode="tabs" label="Documento" value={p.document} options={[{ value: 'resume', label: 'Currículo' }, { value: 'coverLetter', label: 'Cover letter' }]} onChange={(v) => p.onDocumentChange?.(v as StudioDocument)} />
                <span className={styles.legend}><span className={styles.swatch} aria-hidden="true" />Ajustado para a vaga</span>
              </div>
              <DocumentPreview view={p.document} resume={p.resume} coverLetter={p.coverLetter} pageWidth={480} />
            </>
          }
          right={<ChangesPanel {...p.changes} />}
        />
      </PageLayout>
    </AppShell>
  );
}
