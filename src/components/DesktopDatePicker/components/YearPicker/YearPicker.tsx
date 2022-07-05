import { MouseEvent, useEffect, useRef } from 'react';
import { findElementByDataId, generateNumbers, scrollCenter } from './utils';
import cn from 'classnames';
import styles from './YearPicker.module.scss';

interface Props {
  className?: string;
  value?: number | null;
  min?: number;
  max?: number;
  onChange: (year: number) => void;
}

const YearPicker = ({
  className,
  value,
  min = 1900,
  max = 2050,
  onChange,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const years = generateNumbers(min, max);

  useEffect(() => {
    const centerValue = value ?? new Date().getFullYear();
    const container = containerRef.current;

    if (!container) return;

    scrollCenter(container, centerValue);

    const centeredEl = findElementByDataId(container, centerValue);

    if (centeredEl instanceof HTMLElement) {
      centeredEl.focus();
    }
  }, [value]);

  const handleBtnClick = (evt: MouseEvent<HTMLButtonElement>) => {
    onChange(Number(evt.currentTarget.dataset.id));
  };

  return (
    <div className={className} data-testid="year-picker">
      <div className={styles.container} ref={containerRef}>
        {years.map((year) => (
          <button
            key={year}
            type="button"
            data-id={year}
            data-testid="year-picker-item"
            className={cn(styles.btn, year === value && styles.selected)}
            onClick={handleBtnClick}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};

export default YearPicker;
