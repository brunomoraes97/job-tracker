import { ColorPalette, IconGallery, SpaceScale, TypeScale } from '@/design-system/docs/blocks';
import styles from './DesignSystemPreview.module.css';

/** Recorte do design system usado na visão da US-9.3 (a documentação completa fica em Design System). */
export function DesignSystemPreview() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Design system em uso</h1>
        <nav aria-label="Documentação do design system" className={styles.links}>
          <a href="./?path=/docs/design-system-visão-geral--documentação" target="_top">Visão geral do design system →</a>
          <a href="./?path=/docs/design-system-tokens-referência--documentação" target="_top">Tokens (referência completa) →</a>
        </nav>
      </header>
      <section aria-labelledby="ds-colors"><h2 id="ds-colors" className={styles.h2}>Cores de marca</h2><ColorPalette group="Marca" /></section>
      <section aria-labelledby="ds-type"><h2 id="ds-type" className={styles.h2}>Tipografia</h2><TypeScale /></section>
      <section aria-labelledby="ds-space"><h2 id="ds-space" className={styles.h2}>Espaçamento</h2><SpaceScale /></section>
      <section aria-labelledby="ds-icons"><h2 id="ds-icons" className={styles.h2}>Ícones</h2><IconGallery /></section>
    </main>
  );
}
