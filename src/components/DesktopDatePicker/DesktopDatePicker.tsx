import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { useClickAway, useKey } from 'react-use';
import { useFocusOut } from './useFocusOut';
import { getMaxMonth, getMinMonth, noop } from './utils';

import styles from './DesktopDatePicker.module.scss';
import YearPicker from './components/YearPicker';
import MonthPicker from './components/MonthPicker';
import PickerTextField from './components/PickerTextField';
import PickerHeader from './components/PickerHeader';

interface Props {
  className?: string;
  value?: Date | null;
  minDate?: Date;
  maxDate?: Date;
  error?: string;
  name?: string;
  placeholder?: string;
  locale?: string;
  toggleLabel?: string;
  onChange?: (date: Date | null) => void;
  onBlur?: () => void;
}

const DEFAULT_CALC_DATE = new Date('2020-01-01');

export const DesktopDatePicker = forwardRef(
  (
    {
      error,
      name,
      placeholder,
      minDate,
      maxDate,
      value,
      className,
      locale = 'en',
      toggleLabel,
      onChange = noop,
      onBlur = noop,
    }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [yearStep, setYearStep] = useState(true);
    const rootRef = useRef(null);
    const [isOpen, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>();

    const close = () => {
      setYearStep(true);
      setSelectedDate(null);
      setOpen(false);
    };

    useClickAway(rootRef, () => {
      close();
      onBlur();
    });

    useFocusOut(rootRef, () => {
      close();
      onBlur();
    });

    useKey('Escape', close);

    const handleYearChange = (year: number) => {
      const newValue = value ? new Date(value) : DEFAULT_CALC_DATE;
      newValue.setFullYear(year);
      setSelectedDate(newValue);
      setYearStep(false);
    };

    const handleMonthChange = (month: number) => {
      const newValue = selectedDate
        ? new Date(selectedDate)
        : DEFAULT_CALC_DATE;

      newValue.setMonth(month);
      onChange(newValue);
      close();
    };

    const handleToggle = () => {
      setOpen((prevState) => !prevState);
    };

    const handleHeaderClick = (isYear: boolean) => {
      setYearStep(isYear);
    };

    const selectedYear = selectedDate?.getFullYear() ?? value?.getFullYear();
    const minMonth = getMinMonth(minDate, selectedYear);
    const maxMonth = getMaxMonth(maxDate, selectedYear);

    return (
      <div className={className}>
        <div className={styles.root} ref={rootRef}>
          <PickerTextField
            inputRef={ref}
            className={className}
            placeholder={placeholder}
            toggleLabel={toggleLabel}
            onToggle={handleToggle}
            onChange={onChange}
            locale={locale}
            onFocus={close}
            value={selectedDate ?? value}
            name={name}
            id={name}
            error={error}
          />

          {isOpen && (
            <div className={styles.pickers}>
              <PickerHeader
                date={selectedDate ?? value}
                isYearSelected={yearStep}
                onClick={handleHeaderClick}
                locale={locale}
              />

              {yearStep && (
                <YearPicker
                  value={value?.getFullYear()}
                  onChange={handleYearChange}
                  min={minDate?.getFullYear()}
                  max={maxDate?.getFullYear()}
                />
              )}

              {!yearStep && (
                <MonthPicker
                  value={selectedDate?.getMonth() ?? value?.getMonth()}
                  onChange={handleMonthChange}
                  min={minMonth}
                  max={maxMonth}
                  locale={locale}
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

DesktopDatePicker.displayName = 'DesktopDatePicker';
