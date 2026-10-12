import { useEffect, type ReactNode } from 'react';
import { IconButton } from '@/components/atoms/IconButton';
import styles from './Drawer.module.css';

export interface DrawerProps {
  /** Controlado pelo pai. */
  open: boolean;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  /** Emitido no botão fechar, no clique fora e na tecla Esc. */
  onClose?: () => void;
  /** Renderiza em posição absoluta dentro do contêiner pai (útil em layouts e no Storybook). */
  contained?: boolean;
}

export function Drawer({ open, title, subtitle, children, footer, onClose, contained }: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  const pos = contained ? styles.contained : styles.fixed;
  return (
    <>
      <div className={`${styles.scrim} ${pos}`} onClick={onClose} aria-hidden="true" />
      <div role="dialog" aria-modal="true" aria-labelledby="drawer-title" className={`${styles.panel} ${pos}`}>
        <header className={styles.header}>
          <div className={styles.titles}>
            <h2 id="drawer-title" className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          <IconButton icon="close" label="Fechar" onClick={onClose} />
        </header>
        <div className={styles.body}>{children}</div>
        {footer && <footer className={styles.footer}>{footer}</footer>}
      </div>
    </>
  );
}
