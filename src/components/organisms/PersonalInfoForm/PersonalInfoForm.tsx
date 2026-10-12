import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';
import { FormField } from '@/components/molecules/FormField';
import { Panel } from '@/components/molecules/Panel';
import type { PersonalInfo } from '@/types';
import styles from './PersonalInfoForm.module.css';

export interface PersonalInfoFormProps {
  value: PersonalInfo;
  onFieldChange?: (field: keyof PersonalInfo, value: string) => void;
}

const fields: Array<{ key: Exclude<keyof PersonalInfo, 'summary'>; label: string; type?: string; placeholder?: string }> = [
  { key: 'name', label: 'Nome' },
  { key: 'title', label: 'Título' },
  { key: 'location', label: 'Localização' },
  { key: 'email', label: 'E-mail', type: 'email' },
  { key: 'linkedin', label: 'LinkedIn', type: 'url', placeholder: 'linkedin.com/in/[perfil]' },
  { key: 'github', label: 'GitHub', type: 'url', placeholder: 'github.com/[usuário]' },
];

export function PersonalInfoForm({ value, onFieldChange }: PersonalInfoFormProps) {
  return (
    <Panel title="Dados pessoais">
      <div className={styles.grid}>
        {fields.map((f) => (
          <FormField key={f.key} label={f.label}>
            <Input type={f.type} value={value[f.key]} placeholder={f.placeholder} onChange={(v) => onFieldChange?.(f.key, v)} />
          </FormField>
        ))}
      </div>
      <FormField label="Resumo profissional (base — adaptado a cada vaga)">
        <Textarea value={value.summary} onChange={(v) => onFieldChange?.('summary', v)} />
      </FormField>
    </Panel>
  );
}
