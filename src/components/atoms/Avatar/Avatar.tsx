import { cx } from '@/lib/cx';
import styles from './Avatar.module.css';

export interface AvatarProps {
  /** Nome completo — as iniciais são derivadas dele. */
  name: string;
  size?: 'sm' | 'md';
}

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .filter((_, i, all) => i === 0 || i === all.length - 1)
    .map((p) => p[0]!.toUpperCase())
    .join('');

export function Avatar({ name, size = 'md' }: AvatarProps) {
  return (
    <span className={cx(styles.avatar, styles[size])} aria-hidden="true">
      {initials(name)}
    </span>
  );
}
