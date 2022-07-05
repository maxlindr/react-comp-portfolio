import logo from './logo.svg';
import styles from './AppHeader.module.scss';

export const AppHeader = () => {
  return (
    <header className={styles.appHeader}>
      <img src={logo} className={styles.appLogo} alt="logo" />

      <a
        className={styles.appLink}
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Sources on GitHub
      </a>
    </header>
  );
};
