import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import styles from './Panel.module.css';

export interface PanelProps {
  /** Título do painel (vira um h2 e nomeia a região). */
  title?: ReactNode;
  /** Estilo do título. */
  titleVariant?: 'subheading' | 'heading' | 'overline';
  /** Conteúdo à direita do título (contadores, ações). */
  aside?: ReactNode;
  children: ReactNode;
  padding?: 'sm' | 'md' | 'lg';
  tone?: 'surface' | 'code' | 'sunken';
  /** Ocupa a altura disponível e empurra o último filho para baixo com `margin-top:auto`. */
  stretch?: boolean;
  as?: 'section' | 'aside' | 'div' | 'article';
}

export function Panel({ title, titleVariant = 'subheading', aside, children, padding = 'md', tone = 'surface', stretch, as = 'section' }: PanelProps) {
  const Tag = as;
  return (
    <Tag className={cx(styles.panel, styles[padding], styles[tone], stretch && styles.stretch)}>
      {(title || aside) && (
        <header className={styles.header}>
          {title && <h2 className={cx(styles.title, styles[titleVariant])}>{title}</h2>}
          {aside && <div className={styles.aside}>{aside}</div>}
        </header>
      )}
      {children}
    </Tag>
  );
}
