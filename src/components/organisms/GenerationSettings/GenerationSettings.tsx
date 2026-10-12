import { Button } from '@/components/atoms/Button';
import { KeywordList } from '@/components/molecules/KeywordList';
import { Panel } from '@/components/molecules/Panel';
import { SegmentedControl, type SegmentOption } from '@/components/molecules/SegmentedControl';
import { ToggleList } from '@/components/molecules/ToggleList';
import type { ToggleOption } from '@/types';
import styles from './GenerationSettings.module.css';

export interface GenerationSettingsProps {
  language: string;
  languageOptions: SegmentOption[];
  tone: string;
  toneOptions: SegmentOption[];
  template: string;
  templateOptions: SegmentOption[];
  experiences: ToggleOption[];
  keywordsHit: string[];
  keywordsMissing: string[];
  regenerating?: boolean;
  onLanguageChange?: (value: string) => void;
  onToneChange?: (value: string) => void;
  onTemplateChange?: (value: string) => void;
  onToggleExperience?: (id: string, checked: boolean) => void;
  onReviewSkills?: () => void;
  onRegenerate?: () => void;
}

export function GenerationSettings(p: GenerationSettingsProps) {
  const total = p.keywordsHit.length + p.keywordsMissing.length;
  return (
    <Panel title="Ajustes da geração" as="aside" stretch>
      <div className={styles.group}>
        <span className={styles.overline}>Idioma</span>
        <SegmentedControl label="Idioma" fullWidth value={p.language} options={p.languageOptions} onChange={p.onLanguageChange} />
      </div>
      <div className={styles.group}>
        <span className={styles.overline}>Tom da cover letter</span>
        <SegmentedControl label="Tom da cover letter" fullWidth value={p.tone} options={p.toneOptions} onChange={p.onToneChange} />
      </div>
      <ToggleList label="Experiências em destaque" items={p.experiences} onToggle={p.onToggleExperience} />
      <div className={styles.group}>
        <span className={styles.row}><span className={styles.overline}>Palavras-chave</span><span className={styles.count}>{p.keywordsHit.length}/{total}</span></span>
        <KeywordList hits={p.keywordsHit} misses={p.keywordsMissing} missSuffix="" />
        <p className={styles.note}>
          Faltantes só entram se você adicioná-las ao Currículo base.{' '}
          <button type="button" className={styles.link} onClick={p.onReviewSkills}>Revisar skills</button>
        </p>
      </div>
      <div className={styles.group}>
        <span className={styles.overline}>Template do PDF</span>
        <SegmentedControl label="Template do PDF" fullWidth value={p.template} options={p.templateOptions} onChange={p.onTemplateChange} />
      </div>
      <Button variant="outline" fullWidth loading={p.regenerating} onClick={p.onRegenerate}>Regenerar com estes ajustes</Button>
    </Panel>
  );
}
