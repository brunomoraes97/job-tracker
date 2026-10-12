import type { FormEvent } from 'react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { FormField } from '@/components/molecules/FormField';
import type { KeyValue } from '@/types';
import styles from './KeyValueForm.module.css';

export interface KeyValueFormProps {
  items: KeyValue[];
  /** Rótulo acessível do formulário. */
  label: string;
  submitLabel?: string;
  onChange?: (id: string, value: string) => void;
  onSubmit?: () => void;
  onCancel?: () => void;
}

/** Edição genérica de uma lista rótulo → valor (ex.: preferências de busca). */
export function KeyValueForm({ items, label, submitLabel = 'Salvar', onChange, onSubmit, onCancel }: KeyValueFormProps) {
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };
  return (
    <form className={styles.form} onSubmit={submit} aria-label={label}>
      {items.map((kv) => (
        <FormField key={kv.id} label={kv.label}>
          <Input value={kv.value} onChange={(v) => onChange?.(kv.id, v)} />
        </FormField>
      ))}
      <div className={styles.actions}>
        <Button onClick={onCancel}>Cancelar</Button>
        <Button type="submit" variant="primary" className={styles.submit}>{submitLabel}</Button>
      </div>
    </form>
  );
}
