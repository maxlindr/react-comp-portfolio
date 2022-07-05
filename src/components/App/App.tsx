import { AppHeader } from '../AppHeader';
import { DesktopDatePickerDemo } from '../DesktopDatePickerDemo';
import styles from './App.module.scss';

export const App = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <DesktopDatePickerDemo />
      </main>
    </>
  );
};
