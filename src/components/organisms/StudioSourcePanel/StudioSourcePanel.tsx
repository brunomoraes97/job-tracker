import { ProgressBar } from '@/components/atoms/ProgressBar';
import { Panel } from '@/components/molecules/Panel';
import { SegmentedControl, type SegmentOption } from '@/components/molecules/SegmentedControl';
import { ToggleList } from '@/components/molecules/ToggleList';
import type { ToggleOption } from '@/types';
import styles from './StudioSourcePanel.module.css';

export interface StudioSourcePanelProps {
  /** Ex.: "Currículo base v4" */
  sourceLabel: string;
  blocks: ToggleOption[];
  keywordsCovered: number;
  keywordsTotal: number;
  template: string;
  templateOptions: SegmentOption[];
  onOpenSource?: () => void;
  onToggleBlock?: (id: string, included: boolean) => void;
  onTemplateChange?: (value: string) => void;
}

export function StudioSourcePanel(p: StudioSourcePanelProps) {
  const pct = p.keywordsTotal ? Math.round((p.keywordsCovered / p.keywordsTotal) * 100) : 0;
  return (
    <Panel as="aside" padding="sm" label="Fonte e blocos do documento">
      <div className={styles.group}>
        <span className={styles.overline}>Fonte</span>
        <button type="button" className={styles.source} onClick={p.onOpenSource}>{p.sourceLabel} ↗</button>
      </div>
      <ToggleList label="Blocos incluídos" items={p.blocks} descriptionPosition="below" onToggle={p.onToggleBlock} />
      <div className={styles.group}>
        <span className={styles.row}><span className={styles.overline}>Palavras-chave</span><span className={styles.count}>{p.keywordsCovered}/{p.keywordsTotal}</span></span>
        <ProgressBar value={pct} label="Palavras-chave cobertas" />
      </div>
      <div className={styles.group}>
        <span className={styles.overline}>Template</span>
        <SegmentedControl label="Template" fullWidth value={p.template} options={p.templateOptions} onChange={p.onTemplateChange} />
      </div>
    </Panel>
  );
}
