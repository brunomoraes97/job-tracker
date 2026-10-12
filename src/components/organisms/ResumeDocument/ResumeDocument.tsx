import { renderRich } from '@/lib/richText';
import type { ResumeDocumentData } from '@/types';
import styles from './ResumeDocument.module.css';

export interface ResumeDocumentProps {
  data: ResumeDocumentData;
  /** Largura da página em px; a altura segue a proporção A4. */
  width?: number;
  /** Destaca os trechos ajustados para a vaga. */
  showHighlights?: boolean;
}

/** Página de currículo (pré-visualização do PDF). */
export function ResumeDocument({ data, width = 480, showHighlights = true }: ResumeDocumentProps) {
  const mark = showHighlights ? styles.mark : styles.plain;
  return (
    <article aria-label="Currículo" className={styles.page} style={{ width, height: Math.round(width * 1.414), fontSize: width / 56 }}>
      <header className={styles.header}>
        <div className={styles.name}>{data.name}</div>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.contact}>{data.contact}</div>
      </header>
      <section className={styles.section}>
        <h3 className={styles.h}>SUMMARY</h3>
        <p className={styles.p}>{renderRich(data.summary, mark)}</p>
      </section>
      <section className={styles.section}>
        <h3 className={styles.h}>EXPERIENCE</h3>
        {data.entries.map((e) => (
          <div key={e.id} className={styles.entry}>
            <div className={styles.entryHead}><span>{e.heading}</span><span className={styles.period}>{e.period}</span></div>
            {e.bullets.map((b, i) => <div key={i} className={styles.p}>• {renderRich(b, mark)}</div>)}
          </div>
        ))}
      </section>
      <section className={styles.section}>
        <h3 className={styles.h}>SKILLS</h3>
        <p className={styles.p}>{renderRich(data.skills, mark)}</p>
      </section>
      <section className={styles.section}>
        <h3 className={styles.h}>EDUCATION</h3>
        <p className={styles.p}>{data.education}</p>
      </section>
      <section className={styles.section}>
        <h3 className={styles.h}>LANGUAGES</h3>
        <p className={styles.p}>{data.languages}</p>
      </section>
    </article>
  );
}
