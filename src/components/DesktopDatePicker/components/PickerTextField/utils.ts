import { Locale, parse } from 'date-fns';
import { enUS, ru, uk } from 'date-fns/locale';

export const formatDate = (date: Date, locale: string) => {
  const month = date.toLocaleString(locale, { month: 'long' });
  return `${month} ${date.getFullYear()}`;
};

const DATE_FNS_LOCALES: Record<string, Locale> = { en: enUS, ru, uk };
const getDateFnsLocale = (locale: string) => DATE_FNS_LOCALES[locale] ?? enUS;

/**
 * Parses a string representation of a date. If the date is invalid returns null
 * @param str a string representation of a date
 * @param locale locale
 */
export const parseDateString = (str: string, locale: string) => {
  const date = parse(str, 'MMMM yyyy', new Date(), {
    locale: getDateFnsLocale(locale),
  });

  const isDateValid = !isNaN(date.getTime());
  return isDateValid ? date : null;
};
