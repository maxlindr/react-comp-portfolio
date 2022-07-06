import { useEffect, useRef } from 'react';
import styles from './FilterInput.module.scss';
import cn from 'classnames';

interface Props {
  onInputChange: (value: string) => void;
  onOpen: () => void;
  onFocus?: () => void;
  open: boolean;
  placeholder?: string;
  error?: boolean;
  autoFocus?: boolean;
  value: string;
}

const FilterInput = ({
  onInputChange,
  open,
  onOpen,
  onFocus,
  placeholder,
  error,
  autoFocus,
  value,
}: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) ref.current?.focus();
  }, [autoFocus]);

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    onInputChange(value);
  };

  const handleResetClick = () => {
    onInputChange('');
  };

  const handleInputFocus = () => {
    onFocus && onFocus();

    if (!open) {
      onOpen();
    }
  };

  const isValueNotEmpty = value !== '';

  return (
    <div className={styles.wrapper}>
      <input
        ref={ref}
        className={cn(styles.input, {
          [styles.open]: open,
          [styles.error]: !open && error,
        })}
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder={placeholder}
      />

      <div className={styles.buttonsContainer}>
        {isValueNotEmpty && (
          <button
            className={styles.xBtn}
            type="button"
            onClick={handleResetClick}
          />
        )}
        <button
          className={cn(styles.openBtn, open && styles.hidden)}
          type="button"
          onClick={onOpen}
          onFocus={onOpen}
        />
      </div>
    </div>
  );
};

export default FilterInput;
