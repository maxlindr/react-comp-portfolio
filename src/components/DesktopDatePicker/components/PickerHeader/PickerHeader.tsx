import styles from './PickerHeader.module.scss';
import cn from 'classnames';

interface Props {
  className?: string;
  date?: Date | null;
  onClick(isYear: boolean): void;
  isYearSelected: boolean;
  locale?: string;
}

const getMonth = (date: Date, locale: string) =>
  date.toLocaleString(locale, { month: 'long' });

const PickerHeader = ({
  className,
  date,
  isYearSelected,
  locale = 'en',
  onClick,
}: Props) => {
  return (
    <div className={cn(styles.root, className)}>
      <button
        className={cn(styles.year, isYearSelected && styles.selected)}
        onClick={() => onClick(true)}
        type="button"
      >
        {date ? date.getFullYear() : 'Year'}
      </button>

      <button
        className={cn(styles.month, !isYearSelected && styles.selected)}
        onClick={() => onClick(false)}
        type="button"
      >
        {date ? getMonth(date, locale) : 'Month'}
      </button>
    </div>
  );
};

export default PickerHeader;
