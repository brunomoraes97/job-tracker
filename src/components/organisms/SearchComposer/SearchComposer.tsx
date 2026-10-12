import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Select } from '@/components/atoms/Select';
import { Textarea } from '@/components/atoms/Textarea';
import { ChipGroup } from '@/components/molecules/ChipGroup';
import { FormField } from '@/components/molecules/FormField';
import { Panel } from '@/components/molecules/Panel';
import { cx } from '@/lib/cx';
import type { ParsedCriterion, SelectOption, ToggleOption } from '@/types';
import styles from './SearchComposer.module.css';

export interface SearchComposerProps {
  /** Descrição em texto livre (controlada). */
  description: string;
  /** Critérios extraídos da descrição. */
  criteria: ParsedCriterion[];
  /** Dork resultante da conversão (vazio = ainda não convertido). */
  dork: string;
  sources: ToggleOption[];
  frequency: string;
  frequencyOptions: SelectOption[];
  threshold: string;
  thresholdOptions: SelectOption[];
  converting?: boolean;
  saving?: boolean;
  onDescriptionChange?: (value: string) => void;
  onConvertToDork?: (description: string) => void;
  onLearnDorking?: () => void;
  onOpenGenerator?: () => void;
  onToggleSource?: (id: string, checked: boolean) => void;
  onFrequencyChange?: (value: string) => void;
  onThresholdChange?: (value: string) => void;
  onTest?: () => void;
  onSave?: () => void;
}

export function SearchComposer(p: SearchComposerProps) {
  return (
    <Panel as="aside" title="Nova busca" titleVariant="heading" stretch>
      <FormField label="1 · Descreva o que você procura, em texto livre">
        <Textarea rows={5} value={p.description} placeholder="Ex.: vagas remotas de backend sênior com Go…" onChange={p.onDescriptionChange} />
      </FormField>

      <div className={styles.callout}>
        <Icon name="sparkSearch" size={20} className={styles.calloutIcon} />
        <div className={styles.calloutBody}>
          <strong className={styles.calloutTitle}>Altamente recomendado: usar Google Dorking</strong>
          <span className={styles.calloutText}>
            Operadores como <code>site:</code>, <code>intitle:</code> e <code>-termo</code> acham vagas direto nos ATS, muitas vezes antes do LinkedIn.
          </span>
          <span className={styles.calloutActions}>
            <Button size="sm" variant="primary" loading={p.converting} disabled={!p.description.trim()} onClick={() => p.onConvertToDork?.(p.description)}>Converter descrição em dork</Button>
            <button type="button" className={styles.link} onClick={p.onLearnDorking}>O que é isso?</button>
          </span>
        </div>
      </div>

      {p.criteria.length > 0 && (
        <div className={styles.section}>
          <span className={styles.step}>2 · Como entendemos</span>
          <dl className={styles.criteria}>
            {p.criteria.map((c) => (
              <div key={c.id} className={styles.criterion}>
                <dt>{c.label}</dt>
                <dd>{c.values.map((v) => <span key={v} className={cx(styles.value, styles[c.tone])}>{v}</span>)}</dd>
              </div>
            ))}
          </dl>
          {p.dork && <code className={styles.dork}>{p.dork}</code>}
          <button type="button" className={styles.link} onClick={p.onOpenGenerator}>Ajustar campo a campo no gerador →</button>
        </div>
      )}

      <div className={styles.section}>
        <span className={styles.step}>3 · Onde e quando rodar</span>
        <ChipGroup label="Fontes" kind="checkbox" size="sm" items={p.sources.map((s) => ({ id: s.id, label: s.label, selected: s.checked }))} onToggle={p.onToggleSource} />
        <div className={styles.grid}>
          <FormField label="Frequência"><Select value={p.frequency} options={p.frequencyOptions} onChange={p.onFrequencyChange} /></FormField>
          <FormField label="Avisar quando match ≥"><Select value={p.threshold} options={p.thresholdOptions} onChange={p.onThresholdChange} /></FormField>
        </div>
      </div>

      <div className={styles.actions}>
        <Button onClick={p.onTest}>Testar agora</Button>
        <Button variant="primary" loading={p.saving} disabled={!p.description.trim()} onClick={p.onSave} className={styles.save}>Salvar e ativar</Button>
      </div>
    </Panel>
  );
}
