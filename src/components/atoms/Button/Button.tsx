import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { Icon, type IconName } from '../Icon';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'inverse';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'children'> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Ícone antes do rótulo. */
  iconLeft?: IconName;
  /** Ícone depois do rótulo. */
  iconRight?: IconName;
  /** Ocupa toda a largura do contêiner. */
  fullWidth?: boolean;
  /** Quando informado, renderiza um link `<a>` com aparência de botão. */
  href?: string;
  /** Desabilita e mostra estado de carregamento. */
  loading?: boolean;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

export function Button({
  children,
  variant = 'secondary',
  size = 'md',
  iconLeft,
  iconRight,
  fullWidth,
  href,
  loading,
  disabled,
  onClick,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  const cls = cx(styles.button, styles[variant], styles[size], fullWidth && styles.full, className);
  const iconSize = size === 'lg' ? 18 : 16;
  const content = (
    <>
      {iconLeft && <Icon name={iconLeft} size={iconSize} />}
      <span>{loading ? 'Aguarde…' : children}</span>
      {iconRight && <Icon name={iconRight} size={iconSize} />}
    </>
  );
  if (href && !disabled) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <button
      type={type}
      className={cls}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
}
