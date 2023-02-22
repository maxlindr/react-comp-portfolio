import { useState } from 'react';
import { findNodeById } from '../Multiselect/components/TreeView/utils';
import { InputLabel } from '@mui/material';
import { Multiselect } from '../Multiselect';
import { data } from './data';

import styles from './MultiselectDemo.module.scss';

export const MultiselectDemo = () => {
  const [checked, setChecked] = useState<string[]>([]);
  const checkedItems = checked.map(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    (id) => findNodeById(id, data)!
  );

  return (
    <div className={styles.root}>
      <ul className={styles.list}>
        {checkedItems.map((item) => (
          <li key={item.id} className={styles.item}>
            {item.name}
          </li>
        ))}
      </ul>

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
