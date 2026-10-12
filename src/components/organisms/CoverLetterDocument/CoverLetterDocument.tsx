import { renderRich } from '@/lib/richText';
import type { CoverLetterData } from '@/types';
import styles from './CoverLetterDocument.module.css';

export interface CoverLetterDocumentProps {
  data: CoverLetterData;
  width?: number;
  showHighlights?: boolean;
}

/** Página de cover letter (pré-visualização do PDF). */
export function CoverLetterDocument({ data, width = 480, showHighlights = true }: CoverLetterDocumentProps) {
  const mark = showHighlights ? styles.mark : styles.plain;
  return (
    <article aria-label="Cover letter" className={styles.page} style={{ width, height: Math.round(width * 1.414), fontSize: width / 49 }}>
      <header className={styles.sender}>
        <div className={styles.senderName}>{data.sender}</div>
        <div className={styles.muted}>{data.senderContact}</div>
      </header>
      <div className={styles.muted}>{data.date}</div>
      <div>{data.recipient}<br />Re: <strong>{data.subject}</strong></div>
      <div>{data.greeting}</div>
      {data.paragraphs.map((p, i) => <p key={i} className={styles.p}>{renderRich(p, mark)}</p>)}
      <div className={styles.closing}>{data.closing}</div>
    </article>
  );
}
