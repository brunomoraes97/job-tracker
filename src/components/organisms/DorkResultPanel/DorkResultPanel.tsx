import { Button } from '@/components/atoms/Button';
import { DorkQuery } from '@/components/molecules/DorkQuery';
import { Panel } from '@/components/molecules/Panel';
import { cx } from '@/lib/cx';
import { GOOGLE_WORD_LIMIT } from '@/lib/dork';
import type { DorkResult } from '@/types';
import styles from './DorkResultPanel.module.css';

export interface DorkResultPanelProps {
  result: DorkResult;
  /** Mostra confirmação "Copiado ✓". */
  copied?: boolean;
  onCopy?: (query: string) => void;
  onOpenGoogle?: (url: string) => void;
  onSaveAsSearch?: (query: string) => void;
}

export function DorkResultPanel({ result, copied, onCopy, onOpenGoogle, onSaveAsSearch }: DorkResultPanelProps) {
  const empty = !result.query;
  return (
    <Panel
      tone="code"
      title="Seu Google Dork"
      titleVariant="overline"
      aside={<span className={cx(styles.count, result.overLimit && styles.over)}>{result.wordCount} de {GOOGLE_WORD_LIMIT} palavras</span>}
    >
      <DorkQuery parts={result.parts} />
      <div aria-live="polite" className={styles.actions}>
        <Button variant="inverse" iconLeft={copied ? 'check' : 'copy'} disabled={empty} onClick={() => onCopy?.(result.query)}>{copied ? 'Copiado' : 'Copiar'}</Button>
        <Button variant="secondary" iconRight="external" disabled={empty} onClick={() => onOpenGoogle?.(result.googleUrl)}>Testar no Google</Button>
        <Button variant="primary" disabled={empty} onClick={() => onSaveAsSearch?.(result.query)} className={styles.save}>Salvar como busca automatizada</Button>
      </div>
      {result.overLimit && <p className={styles.warn}>Acima de {GOOGLE_WORD_LIMIT} palavras o Google ignora o excedente — remova termos ou sites.</p>}
    </Panel>
  );
}
