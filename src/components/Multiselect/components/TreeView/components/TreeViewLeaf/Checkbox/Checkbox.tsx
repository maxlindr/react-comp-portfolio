import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';
import { nanoid } from 'nanoid';
import cn from 'classnames';
import styles from './Checkbox.module.scss';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = forwardRef(
  (
    { id, className, label, ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const inputId = id ?? nanoid();

    return (
      <div className={cn(styles.root, className)}>
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          className={styles.input}
          {...props}
        />

        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
