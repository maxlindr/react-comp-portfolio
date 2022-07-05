import { MouseEvent } from 'react';
import { MONTH_INDEXES, monthIndexToName } from './utils';
import cn from 'classnames';
import styles from './MonthPicker.module.scss';

interface Props {
  value?: number | null;
  className?: string;
  locale?: string;
  min?: number;
  max?: number;
  onChange: (year: number) => void;
}

const MonthPicker = ({
  className,
  value,
  locale = 'en',
  min,
  max,
  onChange,
}: Props) => {
  const handleBtnClick = (evt: MouseEvent<HTMLButtonElement>) => {
    onChange(Number(evt.currentTarget.dataset.id));
  };

  return (
    <div className={className} data-testid="month-picker">
      <div className={styles.container}>
        {MONTH_INDEXES.map((monthIndex) => (
          <button
            key={monthIndex}
            type="button"
            data-id={monthIndex}
            data-testid="month-picker-item"
            className={cn(styles.btn, monthIndex === value && styles.selected)}
            disabled={
              (min != null && monthIndex < min) ||
              (max != null && monthIndex > max)
            }
            onClick={handleBtnClick}
          >
            {monthIndexToName(monthIndex, locale)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MonthPicker;
