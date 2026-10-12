import type { RichText } from '@/types';

/** Renderiza `RichText` com os trechos destacados em `<mark>`. */
export function renderRich(rich: RichText, markClassName?: string) {
  return rich.map((part, i) =>
    typeof part === 'string' ? (
      <span key={i}>{part}</span>
    ) : (
      <mark key={i} className={markClassName}>
        {part.text}
      </mark>
    ),
  );
}
