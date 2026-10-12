import { cx } from '@/lib/cx';
import { Icon } from '@/components/atoms/Icon';
import { IconButton } from '@/components/atoms/IconButton';
import styles from './Toast.module.css';

export type ToastTone = 'success' | 'info' | 'warning';

export interface ToastProps {
  message: string;
  tone?: ToastTone;
  /** Ação opcional ("Desfazer", "Ver candidaturas"…). */
  actionLabel?: string;
  /** Fixa no canto inferior direito da tela. */
  floating?: boolean;
  onAction?: () => void;
  onDismiss?: () => void;
}

const icon = { success: 'check', info: 'bell', warning: 'calendar' } as const;

export function Toast({ message, tone = 'success', actionLabel, floating, onAction, onDismiss }: ToastProps) {
  return (
    <div role="status" aria-live="polite" className={cx(styles.toast, styles[tone], floating && styles.floating)}>
      <span className={styles.icon}><Icon name={icon[tone]} size={16} /></span>
      <span className={styles.message}>{message}</span>
      {actionLabel && (
        <button type="button" className={styles.action} onClick={onAction}>{actionLabel}</button>
      )}
      {onDismiss && <IconButton icon="close" size="sm" variant="ghost" label="Fechar aviso" onClick={onDismiss} />}
    </div>
  );
}
