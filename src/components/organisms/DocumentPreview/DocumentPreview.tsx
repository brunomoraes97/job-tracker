import type { CoverLetterData, ResumeDocumentData } from '@/types';
import { CoverLetterDocument } from '../CoverLetterDocument';
import { ResumeDocument } from '../ResumeDocument';
import styles from './DocumentPreview.module.css';

export type DocumentView = 'resume' | 'coverLetter' | 'both';

export interface DocumentPreviewProps {
  view: DocumentView;
  resume: ResumeDocumentData;
  coverLetter: CoverLetterData;
  /** Largura de cada página em px. */
  pageWidth?: number;
  showHighlights?: boolean;
}

/** Área cinza de pré-visualização com uma ou duas páginas. */
export function DocumentPreview({ view, resume, coverLetter, pageWidth, showHighlights = true }: DocumentPreviewProps) {
  const width = pageWidth ?? (view === 'both' ? 380 : 480);
  return (
    <div className={styles.stage} role="region" aria-label="Pré-visualização dos documentos" tabIndex={0}>
      {view !== 'coverLetter' && <ResumeDocument data={resume} width={width} showHighlights={showHighlights} />}
      {view !== 'resume' && <CoverLetterDocument data={coverLetter} width={width} showHighlights={showHighlights} />}
    </div>
  );
}
