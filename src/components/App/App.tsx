import { AppHeader } from '../AppHeader';
import { CounterDemo } from '../CounterDemo';
import { DesktopDatePickerDemo } from '../DesktopDatePickerDemo';
import { MultiselectDemo } from '../MultiselectDemo';
import { createTheme, ThemeProvider } from '@mui/material';
import styles from './App.module.scss';
import { AccordionDemo } from '../AccordionDemo';

const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          zIndex: -1,
        },
      },
    },
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.app}>
        <AppHeader />

        <main className={styles.main}>
          <h1 className="visually-hidden">Портфолио</h1>

          <div className={styles.container}>
            <p>
              Данные компоненты создавались исключительно в&nbsp;качестве
              демонстрации моих способностей и&nbsp;не&nbsp;предназначены для
              использования в&nbsp;ваших проектах.
            </p>

            <div className={styles.columns}>
              <div className={styles.column}>
                <section className={styles.section}>
                  <h2>Date picker</h2>
                  <DesktopDatePickerDemo />
                </section>

                <section className={styles.section}>
                  <h2>Counter</h2>
                  <CounterDemo />
                </section>
              </div>

              <div className={styles.column}>
                <section className={styles.section}>
                  <h2>Accordion</h2>
                  <AccordionDemo />
                </section>

                <section className={styles.section}>
                  <h2>Multiselect</h2>
                  <MultiselectDemo />
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};
