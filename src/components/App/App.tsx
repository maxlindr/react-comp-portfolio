import { AppHeader } from '../AppHeader';
import { CounterDemo } from '../CounterDemo';
import { DesktopDatePickerDemo } from '../DesktopDatePickerDemo';
import { MultiselectDemo } from '../MultiselectDemo';
import styles from './App.module.scss';

export const App = () => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <section className={styles.section}>
          <h2>Date picker</h2>
          <DesktopDatePickerDemo />
        </section>

        <section className={styles.section}>
          <h2>Multiselect</h2>
          <MultiselectDemo />
        </section>

        <section className={styles.section}>
          <h2>Counter</h2>
          <CounterDemo />
        </section>
      </main>
    </div>
  );
};
