import { ChangeEvent, useEffect, useState } from 'react';
import {
  IconButton,
  InputAdornment,
  SvgIcon,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { ReactComponent as CalendarSvg } from './calendar.svg';
import { formatDate, parseDateString } from './utils';
import { noop } from '../../utils';
import styles from './PickerTextField.module.scss';

type Props = Omit<TextFieldProps, 'value' | 'onChange' | 'error'> & {
  value?: Date | null;
  locale?: string;
  toggleLabel?: string;
  error?: string;
  onToggle?: () => void;
  onChange?: (date: Date) => void;
};

const PickerTextField = ({
  value,
  placeholder,
  error,
  locale = 'en',
  toggleLabel,
  onToggle = noop,
  onChange = noop,
  ...rest
}: Props) => {
  const [dateString, setDateString] = useState(
    value ? formatDate(value, locale) : ''
  );

  const handleTextChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputText = evt.target.value;
    setDateString(inputText);
    const date = parseDateString(inputText, locale);

    if (date) {
      onChange(date);
    }
  };

  const handleTextFieldBlur = () => {
    if (value) {
      setDateString(formatDate(value, locale));
    }
  };

  useEffect(() => {
    const formattedDate = value ? formatDate(value, locale) : '';
    setDateString(formattedDate);
  }, [locale, value]);

  return (
    <TextField
      {...rest}
      value={dateString}
      onChange={handleTextChange}
      onBlur={handleTextFieldBlur}
      autoComplete="off"
      fullWidth
      inputProps={{
        placeholder,
        className: styles.input,
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label={toggleLabel}
              onClick={onToggle}
              className={styles.button}
            >
              <SvgIcon viewBox="0 0 24 24" fill="none">
                <CalendarSvg />
              </SvgIcon>
            </IconButton>
          </InputAdornment>
        ),
      }}
      error={!!error}
      helperText={error}
    />
  );
};

export default PickerTextField;
