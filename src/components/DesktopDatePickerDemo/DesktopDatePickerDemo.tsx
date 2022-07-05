import { useState } from 'react';
import { InputLabel } from '@mui/material';
import { DesktopDatePicker } from '../DesktopDatePicker';
import styles from './DesktopDatePickerDemo.module.scss';

export const DesktopDatePickerDemo = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [date2, setDate2] = useState<Date | null>(new Date('2022-07-01'));
  const [date3, setDate3] = useState<Date | null>(new Date());

  return (
    <div className={styles.root}>
      <div className={styles.fieldset}>
        <DesktopDatePicker value={date} onChange={setDate} />
      </div>

      <div className={styles.fieldset}>
        <InputLabel>С ограничением по дате</InputLabel>
        <DesktopDatePicker
          value={date2}
          onChange={setDate2}
          maxDate={new Date('2022-07-01')}
        />
      </div>

      <div className={styles.fieldset}>
        <InputLabel>Вам русским языком говорят!</InputLabel>
        <DesktopDatePicker value={date3} locale="ru" onChange={setDate3} />
      </div>
    </div>
  );
};
