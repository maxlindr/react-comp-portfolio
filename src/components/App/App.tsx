import { AppHeader } from '../AppHeader';
import { DesktopDatePickerDemo } from '../DesktopDatePickerDemo';
import { MultiselectDemo } from '../MultiselectDemo';
import styles from './App.module.scss';

export const App = () => {
  return (
    <>
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
      </main>
    </>
  );
};
