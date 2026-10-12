import type { FormEvent } from 'react';
import { Button } from '@/components/atoms/Button';
import { Select } from '@/components/atoms/Select';
import { Switch } from '@/components/atoms/Switch';
import { FormField } from '@/components/molecules/FormField';
import { ToggleList } from '@/components/molecules/ToggleList';
import type { SelectOption, ToggleOption } from '@/types';
import styles from './AlertSettingsForm.module.css';

export interface AlertSettingsFormProps {
  enabled: boolean;
  frequency: string;
  frequencyOptions: SelectOption[];
  threshold: string;
  thresholdOptions: SelectOption[];
  channels: ToggleOption[];
  saving?: boolean;
  onEnabledChange?: (enabled: boolean) => void;
  onFrequencyChange?: (value: string) => void;
  onThresholdChange?: (value: string) => void;
  onToggleChannel?: (id: string, checked: boolean) => void;
  onSubmit?: () => void;
  onCancel?: () => void;
}

export function AlertSettingsForm(p: AlertSettingsFormProps) {
  const submit = (e: FormEvent) => {
    e.preventDefault();
    p.onSubmit?.();
  };
  return (
    <form className={styles.form} onSubmit={submit} aria-label="Alertas de vagas">
      <div className={styles.row}>
        <span className={styles.lead}>Receber alertas de vagas novas</span>
        <Switch checked={p.enabled} label="Alertas ativos" onChange={p.onEnabledChange} />
      </div>
      <fieldset className={styles.fieldset} disabled={!p.enabled}>
        <legend className={styles.hidden}>Configuração dos alertas</legend>
        <div className={styles.grid}>
          <FormField label="Frequência"><Select value={p.frequency} options={p.frequencyOptions} onChange={p.onFrequencyChange} /></FormField>
          <FormField label="Só vagas com match ≥"><Select value={p.threshold} options={p.thresholdOptions} onChange={p.onThresholdChange} /></FormField>
        </div>
        <ToggleList label="Canais" items={p.channels} onToggle={p.onToggleChannel} />
      </fieldset>
      <div className={styles.actions}>
        <Button onClick={p.onCancel}>Cancelar</Button>
        <Button type="submit" variant="primary" loading={p.saving} className={styles.submit}>Salvar alertas</Button>
      </div>
    </form>
  );
}
