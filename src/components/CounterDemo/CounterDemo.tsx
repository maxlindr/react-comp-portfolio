import { useEffect, useState } from 'react';
import { InputLabel } from '@mui/material';
import { Counter } from '../Counter';
import styles from './CounterDemo.module.scss';

const MIN = 0;
const MAX = 10;

export const CounterDemo = () => {
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);
  const [error2, setError2] = useState(false);

  const handleLimitedCounterBlur = () => {
    if (value2 > MAX) {
      setValue2(MAX);
    }
  };

  useEffect(() => {
    setError2(value2 > MAX || value2 < MIN);
  }, [value2]);

  return (
    <div>
      <div className={styles.fieldset}>
        <Counter className={styles.counter} value={value} onChange={setValue} />
      </div>

      <div className={styles.fieldset}>
        <InputLabel htmlFor="counter-2">
          Ограничения {MIN}…{MAX}
        </InputLabel>
        <Counter
          className={styles.counter}
          id="counter-2"
          value={value2}
          onChange={setValue2}
          min={0}
          max={10}
          onBlur={handleLimitedCounterBlur}
          error={error2}
        />
      </div>
    </div>
  );
};
