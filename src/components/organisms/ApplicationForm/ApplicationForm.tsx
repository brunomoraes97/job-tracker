import type { FormEvent } from 'react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Radio } from '@/components/atoms/Radio';
import { Select } from '@/components/atoms/Select';
import { Textarea } from '@/components/atoms/Textarea';
import { FormField } from '@/components/molecules/FormField';
import type { ApplicationDraft, DocumentChoice, SelectOption } from '@/types';
import styles from './ApplicationForm.module.css';

export type ApplicationDraftErrors = Partial<Record<keyof ApplicationDraft, string>>;

export interface ApplicationFormProps {
  draft: ApplicationDraft;
  stageOptions: SelectOption[];
  sourceOptions: SelectOption[];
  errors?: ApplicationDraftErrors;
  /** Importação dos dados a partir do link em andamento. */
  importing?: boolean;
  submitting?: boolean;
  /** Emitido a cada campo alterado. */
  onFieldChange?: <K extends keyof ApplicationDraft>(field: K, value: ApplicationDraft[K]) => void;
  onImport?: (url: string) => void;
  onSubmit?: (draft: ApplicationDraft) => void;
  onCancel?: () => void;
}

const documentChoices: Array<{ value: DocumentChoice; label: string }> = [
  { value: 'generate', label: 'Gerar CV + cover letter para esta vaga' },
  { value: 'base', label: 'Usei o Currículo base (PDF padrão)' },
  { value: 'upload', label: 'Anexar arquivo que enviei' },
];

export function ApplicationForm({ draft, stageOptions, sourceOptions, errors = {}, importing, submitting, onFieldChange, onImport, onSubmit, onCancel }: ApplicationFormProps) {
  const set = <K extends keyof ApplicationDraft>(k: K) => (v: ApplicationDraft[K]) => onFieldChange?.(k, v);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(draft);
  };
  return (
    <form className={styles.form} onSubmit={submit} noValidate aria-label="Nova candidatura manual">
      <div className={styles.inline}>
        <FormField label="Link da vaga" error={errors.url}>
          <Input type="url" value={draft.url} placeholder="https://…" onChange={set('url')} invalid={!!errors.url} />
        </FormField>
        <Button variant="outline" loading={importing} onClick={() => onImport?.(draft.url)} disabled={!draft.url}>Importar</Button>
      </div>
      <div className={styles.grid}>
        <FormField label="Empresa" error={errors.company}><Input value={draft.company} placeholder="Ex.: Acme" onChange={set('company')} invalid={!!errors.company} /></FormField>
        <FormField label="Cargo" error={errors.role}><Input value={draft.role} placeholder="Ex.: Senior Backend" onChange={set('role')} invalid={!!errors.role} /></FormField>
        <FormField label="Status"><Select value={draft.stage} options={stageOptions} onChange={(v) => onFieldChange?.('stage', v as ApplicationDraft['stage'])} /></FormField>
        <FormField label="Data da candidatura"><Input type="date" value={draft.appliedOn} onChange={set('appliedOn')} /></FormField>
        <FormField label="Fonte"><Select value={draft.source} options={sourceOptions} onChange={set('source')} /></FormField>
        <FormField label="Faixa salarial"><Input value={draft.salary} placeholder="US$ [mín]–[máx]" onChange={set('salary')} /></FormField>
      </div>
      <FormField label="Contato (recrutador / indicação)"><Input value={draft.contact} placeholder="Nome · e-mail ou LinkedIn" onChange={set('contact')} /></FormField>
      <div className={styles.grid}>
        <FormField label="Próximo passo"><Input value={draft.nextStep} onChange={set('nextStep')} /></FormField>
        <FormField label="Lembrar em"><Input type="date" value={draft.remindOn} onChange={set('remindOn')} /></FormField>
      </div>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Documentos enviados</legend>
        {documentChoices.map((c) => (
          <Radio key={c.value} name="documents" value={c.value} label={c.label} checked={draft.documents === c.value} onSelect={() => onFieldChange?.('documents', c.value)} />
        ))}
      </fieldset>
      <FormField label="Notas"><Textarea value={draft.notes} placeholder="Stack, impressões, perguntas para a entrevista…" onChange={set('notes')} /></FormField>
      <div className={styles.actions}>
        <Button onClick={onCancel}>Cancelar</Button>
        <Button type="submit" variant="primary" loading={submitting} className={styles.submit}>Salvar candidatura</Button>
      </div>
    </form>
  );
}
