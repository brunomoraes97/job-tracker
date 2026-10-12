import type { FormEvent } from 'react';
import { Chip } from '@/components/atoms/Chip';
import { IconButton } from '@/components/atoms/IconButton';
import { Input } from '@/components/atoms/Input';
import { ChangeItem } from '@/components/molecules/ChangeItem';
import { Panel } from '@/components/molecules/Panel';
import type { ResumeChange } from '@/types';
import styles from './ChangesPanel.module.css';

export interface ChangesPanelProps {
  changes: ResumeChange[];
  quickAdjustments: string[];
  /** Texto do pedido de ajuste (controlado). */
  adjustment: string;
  submitting?: boolean;
  onUndo?: (id: string) => void;
  onAdjustmentChange?: (value: string) => void;
  onQuickAdjust?: (label: string) => void;
  onSubmitAdjustment?: (value: string) => void;
}

export function ChangesPanel({ changes, quickAdjustments, adjustment, submitting, onUndo, onAdjustmentChange, onQuickAdjust, onSubmitAdjustment }: ChangesPanelProps) {
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (adjustment.trim()) onSubmitAdjustment?.(adjustment.trim());
  };
  return (
    <Panel as="aside" title="Mudanças vs. base" aside={<span className={styles.count}>{changes.length}</span>} padding="sm" stretch>
      <div className={styles.list}>
        {changes.map((c) => <ChangeItem key={c.id} {...c} onUndo={onUndo} />)}
        {changes.length === 0 && <p className={styles.empty}>Sem mudanças — o documento é idêntico ao currículo base.</p>}
      </div>
      <form className={styles.ask} onSubmit={submit}>
        <span className={styles.overline}>Pedir ajuste</span>
        <div className={styles.chips}>
          {quickAdjustments.map((q) => <Chip key={q} size="sm" label={q} selected={false} onToggle={() => onQuickAdjust?.(q)} />)}
        </div>
        <div className={styles.inputRow}>
          <Input value={adjustment} placeholder="Ex.: destaque CDK no resumo" aria-label="Descreva o ajuste" onChange={onAdjustmentChange} />
          <IconButton icon="arrowUp" variant="primary" label="Enviar ajuste" disabled={!adjustment.trim() || submitting} onClick={() => adjustment.trim() && onSubmitAdjustment?.(adjustment.trim())} />
        </div>
        <p className={styles.note}>Ajustes só reescrevem e reordenam o que está no Currículo base.</p>
      </form>
    </Panel>
  );
}
