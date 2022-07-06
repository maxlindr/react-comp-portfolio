import { useState } from 'react';
import { InputLabel } from '@mui/material';
import { Multiselect } from '../Multiselect';
import { data } from './data';

import styles from './MultiselectDemo.module.scss';

export const MultiselectDemo = () => {
  const [checked, setChecked] = useState<string[]>([]);

  return (
    <div className={styles.root}>
      <div className={styles.fieldset}>
        <InputLabel>Коктейли для ценителей</InputLabel>
        <Multiselect
          data={data}
          dropboxHeight={240}
          selected={checked}
          onChange={setChecked}
          placeholder="Ваш выбор"
        />
      </div>
    </div>
  );
};
