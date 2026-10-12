import type { FormEvent } from 'react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';
import { FormField } from '@/components/molecules/FormField';
import styles from './ExperienceForm.module.css';

/** Rascunho editável: bullets uma por linha, tags separadas por vírgula. */
export interface ExperienceDraft {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string;
  tags: string;
}

export type ExperienceDraftErrors = Partial<Record<keyof ExperienceDraft, string>>;

export interface ExperienceFormProps {
  value: ExperienceDraft;
  errors?: ExperienceDraftErrors;
  mode: 'add' | 'edit';
  onFieldChange?: (field: keyof ExperienceDraft, value: string) => void;
  onSubmit?: () => void;
  onCancel?: () => void;
  onDelete?: () => void;
}

export function ExperienceForm({ value, errors = {}, mode, onFieldChange, onSubmit, onCancel, onDelete }: ExperienceFormProps) {
  const set = (k: keyof ExperienceDraft) => (v: string) => onFieldChange?.(k, v);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };
  return (
    <form className={styles.form} onSubmit={submit} noValidate aria-label={mode === 'add' ? 'Nova experiência' : 'Editar experiência'}>
      <div className={styles.grid}>
        <FormField label="Cargo" error={errors.role}><Input value={value.role} invalid={!!errors.role} onChange={set('role')} /></FormField>
        <FormField label="Empresa" error={errors.company}><Input value={value.company} invalid={!!errors.company} onChange={set('company')} /></FormField>
        <FormField label="Local / modalidade"><Input value={value.location} onChange={set('location')} /></FormField>
        <FormField label="Período" hint="Ex.: jun 2024 – atual"><Input value={value.period} onChange={set('period')} /></FormField>
      </div>
      <FormField label="Realizações (uma por linha)" hint="Use números reais; se não tiver, deixe [resultado mensurável].">
        <Textarea rows={5} value={value.bullets} onChange={set('bullets')} />
      </FormField>
      <FormField label="Tecnologias e temas (separe por vírgula)"><Input value={value.tags} onChange={set('tags')} /></FormField>
      <div className={styles.actions}>
        {mode === 'edit' && onDelete && <Button variant="ghost" iconLeft="trash" onClick={onDelete}>Remover</Button>}
        <Button onClick={onCancel}>Cancelar</Button>
        <Button type="submit" variant="primary" className={styles.submit}>{mode === 'add' ? 'Adicionar experiência' : 'Salvar experiência'}</Button>
      </div>
    </form>
  );
}
