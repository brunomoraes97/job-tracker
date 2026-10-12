import { Button } from '@/components/atoms/Button';
import { Monogram } from '@/components/atoms/Monogram';
import { Tag } from '@/components/atoms/Tag';
import { FitBar } from '@/components/molecules/FitBar';
import { KeywordList } from '@/components/molecules/KeywordList';
import { matchTier } from '@/components/molecules/MatchScore';
import type { Job } from '@/types';
import styles from './JobDetailPanel.module.css';

export interface JobDetailPanelProps {
  job: Job;
  /** Ex.: "Currículo base v4" — de onde os documentos serão gerados. */
  resumeLabel: string;
  onGenerate?: (jobId: string) => void;
  onSave?: (jobId: string) => void;
  onDiscard?: (jobId: string) => void;
  onOpenDescription?: (jobId: string) => void;
}

export function JobDetailPanel({ job, resumeLabel, onGenerate, onSave, onDiscard, onOpenDescription }: JobDetailPanelProps) {
  return (
    <aside aria-label="Vaga selecionada" className={styles.panel}>
      <div className={styles.head}>
        <Monogram letters={job.company.monogram} tint={job.company.tint} size="lg" />
        <div className={styles.headText}>
          <span className={styles.meta}>{job.company.name} · {job.source} · {job.postedLabel}</span>
          <h2 className={styles.title}>{job.title}</h2>
        </div>
      </div>
      {job.highlights && (
        <div className={styles.chips}>
          {job.highlights.map((h) => <Tag key={h} size="md">{h}</Tag>)}
        </div>
      )}
      {job.fit && (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h3 className={styles.overline}>Por que combina</h3>
            <span className={styles.score} data-tier={matchTier(job.match)}>{job.match}%</span>
          </div>
          {job.fit.map((f) => <FitBar key={f.label} label={f.label} value={f.value} />)}
        </section>
      )}
      {job.keywordsHit && (
        <section className={styles.section}>
          <h3 className={styles.overline}>Palavras-chave da vaga</h3>
          <KeywordList hits={job.keywordsHit} misses={job.keywordsMissing} />
        </section>
      )}
      {job.summary && (
        <section className={styles.section}>
          <h3 className={styles.overline}>Resumo da vaga</h3>
          <p className={styles.summary}>{job.summary}</p>
          <Button variant="ghost" size="sm" iconRight="external" onClick={() => onOpenDescription?.(job.id)}>Ver descrição completa</Button>
        </section>
      )}
      <div className={styles.actions}>
        <Button variant="primary" size="lg" iconLeft="filePlus" fullWidth onClick={() => onGenerate?.(job.id)}>Gerar CV + cover letter</Button>
        <div className={styles.row}>
          <Button fullWidth onClick={() => onSave?.(job.id)}>Salvar no tracker</Button>
          <Button variant="ghost" fullWidth onClick={() => onDiscard?.(job.id)}>Descartar</Button>
        </div>
        <p className={styles.note}>Documentos gerados a partir do {resumeLabel} — nada é inventado.</p>
      </div>
    </aside>
  );
}
