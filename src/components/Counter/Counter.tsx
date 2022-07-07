import { FocusEvent, useRef, useState } from 'react';
import cn from 'classnames';
import { useInputValue } from './useInputValue';
import { noop } from './utils';

import styles from './Counter.module.scss';
import { Button } from './Button';

interface SX {
  root?: {
    height?: number;
  };
}

interface Props {
  id?: string;
  name?: string;
  value: number;
  onChange?: (value: number) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  fullwidth?: boolean;
  className?: string;
  sx?: SX;
  error?: boolean;
}

export const Counter = ({
  id,
  name,
  value,
  onChange = noop,
  onBlur = noop,
  min,
  max,
  disabled,
  fullwidth,
  sx,
  className,
  error,
}: Props) => {
  const [dirty, setDirty] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const inputValue = useInputValue(ref, value, dirty);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setDirty(true);
    onChange(Number(value));
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.select();
  };

  const handlePlusClick = () => {
    onChange(value + 1);
    setDirty(true);
  };

  const handleMinusClick = () => {
    onChange(value - 1);
    setDirty(true);
  };

  const rootHeight = sx?.root?.height;
  const rootStyle = rootHeight ? { height: rootHeight } : undefined;

  return (
    <div
      className={cn(
        styles.root,
        className,
        fullwidth && styles.fullwidth,
        error && styles.rootInvalid
      )}
      style={rootStyle}
    >
      <Button
        variant="minus"
        onClick={handleMinusClick}
        disabled={disabled || (min != undefined && value <= min)}
      />

      <input
        ref={ref}
        className={styles.input}
        id={id}
        name={name}
        value={inputValue == null ? '' : String(inputValue)}
        type="number"
        min={min}
        max={max}
        onChange={handleChange}
        onClick={handleClick}
        onBlur={onBlur}
        disabled={disabled}
      />

      <Button
        variant="plus"
        onClick={handlePlusClick}
        disabled={disabled || (max != undefined && value >= max)}
      />
    </div>
  );
};
