import { Checkbox } from '@/components/atoms/Checkbox';
import { Chip } from '@/components/atoms/Chip';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { ChipGroup } from '@/components/molecules/ChipGroup';
import { FormField } from '@/components/molecules/FormField';
import { Panel } from '@/components/molecules/Panel';
import type { DorkFields, DorkSite, DorkTemplate, Recency, SelectOption } from '@/types';
import styles from './DorkBuilderForm.module.css';

export interface DorkBuilderFormProps {
  fields: DorkFields;
  sites: DorkSite[];
  templates: DorkTemplate[];
  recencyOptions: SelectOption[];
  /** Emitido com o trecho alterado; o pai mescla e recompila o dork. */
  onChange?: (patch: Partial<DorkFields>) => void;
  onApplyTemplate?: (template: DorkTemplate) => void;
}

export function DorkBuilderForm({ fields, sites, templates, recencyOptions, onChange, onApplyTemplate }: DorkBuilderFormProps) {
  const toggleSite = (id: string, on: boolean) =>
    onChange?.({ siteIds: on ? [...fields.siteIds, id] : fields.siteIds.filter((s) => s !== id) });
  return (
    <Panel title="Monte sua busca" aside="separe itens por vírgula" as="section">
      <div className={styles.templates}>
        <span className={styles.label}>Modelos:</span>
        {templates.map((t) => <Chip key={t.id} size="sm" label={t.label} selected={false} onToggle={() => onApplyTemplate?.(t)} />)}
      </div>
      <FormField label="Cargos (qualquer um)">
        <Input value={fields.roles} onChange={(v) => onChange?.({ roles: v })} />
      </FormField>
      <Checkbox
        checked={fields.requireInTitle}
        label={<>Exigir o cargo no título da página (<code>intitle:</code>) — menos resultados, mais precisos</>}
        onChange={(v) => onChange?.({ requireInTitle: v })}
      />
      <FormField label="Palavras-chave obrigatórias" hint="Dica: “golang” evita resultados sobre o jogo Go.">
        <Input value={fields.keywords} onChange={(v) => onChange?.({ keywords: v })} />
      </FormField>
      <FormField label="Localização / modalidade (qualquer uma)">
        <Input value={fields.location} onChange={(v) => onChange?.({ location: v })} />
      </FormField>
      <FormField label="Excluir termos">
        <Input value={fields.exclude} onChange={(v) => onChange?.({ exclude: v })} />
      </FormField>
      <div className={styles.sites}>
        <span className={styles.strong}>Onde buscar</span>
        <ChipGroup label="Onde buscar" kind="checkbox" items={sites.map((s) => ({ id: s.id, label: s.label, selected: fields.siteIds.includes(s.id) }))} onToggle={toggleSite} />
      </div>
      <FormField label="Publicadas">
        <Select value={fields.recency} options={recencyOptions} onChange={(v) => onChange?.({ recency: v as Recency })} />
      </FormField>
    </Panel>
  );
}
