import { AppHeader } from '../AppHeader';
import styles from './App.module.scss';

export const App = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.main}></main>
    </>
  );
}
