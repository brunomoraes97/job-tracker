import { useId, type ReactElement, type ReactNode, cloneElement } from 'react';
import { cx } from '@/lib/cx';
import styles from './FormField.module.css';

export interface FormFieldProps {
  label: ReactNode;
  /** Controle de formulário (Input, Select, Textarea…). Recebe `id` e `aria-describedby`. */
  children: ReactElement<{ id?: string; 'aria-describedby'?: string }>;
  hint?: ReactNode;
  error?: ReactNode;
  /** `strong` = rótulo em negrito escuro; `muted` = rótulo pequeno e discreto. */
  labelStyle?: 'strong' | 'muted';
}

export function FormField({ label, children, hint, error, labelStyle = 'strong' }: FormFieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const control = cloneElement(children, { id, 'aria-describedby': hint || error ? hintId : undefined });
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={cx(styles.label, styles[labelStyle])}>
        {label}
      </label>
      {control}
      {(error || hint) && (
        <span id={hintId} className={cx(styles.hint, Boolean(error) && styles.error)}>
          {error ?? hint}
        </span>
      )}
    </div>
  );
}
