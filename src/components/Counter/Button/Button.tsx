import { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import { ReactComponent as MinusSvg } from './minus.svg';
import { ReactComponent as PlusSvg } from './plus.svg';
import styles from './Button.module.scss';

interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant: 'minus' | 'plus';
}

export const Button = ({ className, variant, onClick, ...props }: Props) => (
  <button {...props} className={cn(styles.button, className)} onClick={onClick}>
    {variant === 'minus' ? <MinusSvg /> : <PlusSvg />}
  </button>
);
