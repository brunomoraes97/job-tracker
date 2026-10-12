import { useId, type ChangeEvent } from 'react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { FormField } from '@/components/molecules/FormField';
import { OptionCard } from '@/components/molecules/OptionCard';
import styles from './ImportResumeForm.module.css';

export type ImportSource = 'pdf' | 'linkedin';
export type ImportStatus = 'idle' | 'importing' | 'done' | 'error';

export interface ImportResumeFormProps {
  source: ImportSource;
  fileName?: string;
  linkedinUrl: string;
  status: ImportStatus;
  /** Resumo do que foi extraído (status = done) ou mensagem de erro. */
  message?: string;
  onSourceChange?: (source: ImportSource) => void;
  onFileChange?: (file: File | null) => void;
  onUrlChange?: (url: string) => void;
  onImport?: () => void;
  onReview?: () => void;
  onCancel?: () => void;
}

export function ImportResumeForm(p: ImportResumeFormProps) {
  const fileId = useId();
  const ready = p.source === 'pdf' ? !!p.fileName : p.linkedinUrl.trim().length > 0;
  return (
    <div className={styles.form}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>De onde importar</legend>
        <div className={styles.cards}>
          <OptionCard name="import-source" value="pdf" title="Arquivo PDF" description="Seu currículo atual" checked={p.source === 'pdf'} onSelect={() => p.onSourceChange?.('pdf')} />
          <OptionCard name="import-source" value="linkedin" title="LinkedIn" description="Perfil público" checked={p.source === 'linkedin'} onSelect={() => p.onSourceChange?.('linkedin')} />
        </div>
      </fieldset>
      {p.source === 'pdf' ? (
        <div className={styles.file}>
          <label htmlFor={fileId} className={styles.fileLabel}>Arquivo do currículo (PDF)</label>
          <input id={fileId} type="file" accept="application/pdf" className={styles.fileInput} onChange={(e: ChangeEvent<HTMLInputElement>) => p.onFileChange?.(e.target.files?.[0] ?? null)} />
          {p.fileName && <span className={styles.fileName}>Selecionado: {p.fileName}</span>}
        </div>
      ) : (
        <FormField label="URL do perfil" hint="Ex.: linkedin.com/in/seu-perfil">
          <Input type="url" icon="link" value={p.linkedinUrl} onChange={p.onUrlChange} />
        </FormField>
      )}
      {p.status === 'done' && p.message && (
        <div role="status" className={styles.done}>
          <span>{p.message}</span>
          <Button size="sm" variant="outline" onClick={p.onReview}>Revisar campos importados</Button>
        </div>
      )}
      {p.status === 'error' && p.message && <p role="alert" className={styles.error}>{p.message}</p>}
      <p className={styles.note}>Nada é salvo antes da sua revisão — a importação só preenche um rascunho.</p>
      <div className={styles.actions}>
        <Button onClick={p.onCancel}>Cancelar</Button>
        <Button variant="primary" iconLeft="download" disabled={!ready} loading={p.status === 'importing'} onClick={p.onImport} className={styles.submit}>Importar</Button>
      </div>
    </div>
  );
}
